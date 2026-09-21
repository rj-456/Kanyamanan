from rest_framework import serializers
from .models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary, RestaurantReview

class BranchSerializer(serializers.ModelSerializer):
    branchName = serializers.CharField(source='branch_name')
    operatingHours = serializers.CharField(source='operating_hours')
    facebookUrl = serializers.CharField(source='facebook_url', required=False, allow_blank=True, default='')
    instagramUrl = serializers.CharField(source='instagram_url', required=False, allow_blank=True, default='')
    tiktokUrl = serializers.CharField(source='tiktok_url', required=False, allow_blank=True, default='')
    phoneNumber = serializers.CharField(source='phone_number', required=False, allow_blank=True, default='')
    reservationInfo = serializers.CharField(source='reservation_info', required=False, allow_blank=True, default='')

    class Meta:
        model = Branch
        fields = ['branchName', 'municipality', 'address', 'operatingHours', 'lat', 'lng', 'facebookUrl', 'instagramUrl', 'tiktokUrl', 'phoneNumber', 'email', 'reservationInfo']

class RestaurantReviewSerializer(serializers.ModelSerializer):
    reviewerName = serializers.CharField(source='reviewer_name', required=False, default='Food Explorer')
    isVerifiedDiner = serializers.BooleanField(source='is_verified_diner', required=False, default=True)
    tripId = serializers.CharField(source='trip_id', required=False, allow_blank=True, default='')
    createdAt = serializers.DateTimeField(source='created_at', format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = RestaurantReview
        fields = ['id', 'reviewerName', 'rating', 'comment', 'isVerifiedDiner', 'tripId', 'createdAt']

class MenuItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='item_id')
    healthIndicators = serializers.CharField(source='health_indicators')
    nutrition = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'price', 'ingredients', 'allergens', 'healthIndicators', 'nutrition']

    def get_nutrition(self, obj):
        return {
            'calories': obj.calories,
            'protein': obj.protein,
            'carbs': obj.carbs,
            'fat': obj.fat
        }

class RestaurantSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='restaurant_id')
    operatingHours = serializers.CharField(source='operating_hours', required=False, default='09:00 AM - 09:00 PM')
    priceTier = serializers.CharField(source='price_tier', required=False, default='$')
    facebookUrl = serializers.CharField(source='facebook_url', required=False, allow_blank=True, default='')
    instagramUrl = serializers.CharField(source='instagram_url', required=False, allow_blank=True, default='')
    tiktokUrl = serializers.CharField(source='tiktok_url', required=False, allow_blank=True, default='')
    phoneNumber = serializers.CharField(source='phone_number', required=False, allow_blank=True, default='')
    reservationInfo = serializers.CharField(source='reservation_info', required=False, allow_blank=True, default='')
    branches = BranchSerializer(many=True, required=False)
    menu = MenuItemSerializer(many=True, required=False)
    reviews = RestaurantReviewSerializer(many=True, read_only=True)
    averageRating = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'municipality', 'operatingHours',
            'priceTier', 'lat', 'lng', 'categories', 'description',
            'address', 'image', 'images', 'facebookUrl', 'instagramUrl', 'tiktokUrl', 'phoneNumber',
            'email', 'reservationInfo', 'username', 'password',
            'occupancy', 'branches', 'menu', 'reviews', 'averageRating'
        ]

    def get_averageRating(self, obj):
        revs = obj.reviews.all()
        if not revs.exists():
            return 4.8  # default baseline
        return round(sum(r.rating for r in revs) / revs.count(), 1)

    def create(self, validated_data):
        branches_data = self.initial_data.get('branches', [])
        menu_data = self.initial_data.get('menu', [])
        
        validated_data.pop('branches', None)
        validated_data.pop('menu', None)

        restaurant = Restaurant.objects.create(**validated_data)
        self._sync_branches_and_menu(restaurant, branches_data, menu_data)
        return restaurant

    def update(self, instance, validated_data):
        branches_data = self.initial_data.get('branches', None)
        menu_data = self.initial_data.get('menu', None)

        validated_data.pop('branches', None)
        validated_data.pop('menu', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if branches_data is not None or menu_data is not None:
            self._sync_branches_and_menu(instance, branches_data, menu_data)
        return instance

    def _sync_branches_and_menu(self, restaurant, branches_data, menu_data):
        if branches_data is not None:
            restaurant.branches.all().delete()
            for b in branches_data:
                if isinstance(b, dict):
                    b_mun = b.get('municipality') or restaurant.municipality
                    b_name = b.get('branchName') or f"{restaurant.name} ({b_mun} Branch)"
                    Branch.objects.create(
                        restaurant=restaurant,
                        branch_name=b_name,
                        municipality=b_mun,
                        address=b.get('address', restaurant.address),
                        operating_hours=b.get('operatingHours', restaurant.operating_hours),
                        lat=b.get('lat', restaurant.lat),
                        lng=b.get('lng', restaurant.lng),
                        facebook_url=b.get('facebookUrl', restaurant.facebook_url),
                        instagram_url=b.get('instagramUrl', restaurant.instagram_url if hasattr(restaurant, 'instagram_url') else ''),
                        tiktok_url=b.get('tiktokUrl', restaurant.tiktok_url if hasattr(restaurant, 'tiktok_url') else ''),
                        phone_number=b.get('phoneNumber', restaurant.phone_number),
                        email=b.get('email', restaurant.email),
                        reservation_info=b.get('reservationInfo', restaurant.reservation_info)
                    )

        if menu_data is not None:
            restaurant.menu.all().delete()
            for m_idx, m in enumerate(menu_data):
                if isinstance(m, dict):
                    item_id = m.get('id') or f"{restaurant.restaurant_id}-item-{m_idx+1}"
                    nutrition = m.get('nutrition', {})
                    MenuItem.objects.create(
                        restaurant=restaurant,
                        item_id=item_id,
                        name=m.get('name', 'Specialty Dish'),
                        price=float(m.get('price', 100)),
                        ingredients=m.get('ingredients', ''),
                        allergens=m.get('allergens', ''),
                        health_indicators=m.get('healthIndicators', ''),
                        calories=int((nutrition.get('calories') if isinstance(nutrition, dict) else None) or m.get('calories') or 0),
                        protein=int((nutrition.get('protein') if isinstance(nutrition, dict) else None) or m.get('protein') or 0),
                        carbs=int((nutrition.get('carbs') if isinstance(nutrition, dict) else None) or m.get('carbs') or 0),
                        fat=int((nutrition.get('fat') if isinstance(nutrition, dict) else None) or m.get('fat') or 0)
                    )

class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality
        fields = ['id', 'name']

class ChangeRequestSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='request_id')
    restaurantId = serializers.CharField(source='restaurant_id')
    restaurantName = serializers.CharField(source='restaurant_name')
    requestedBy = serializers.CharField(source='requested_by')
    dateSubmitted = serializers.DateTimeField(source='date_submitted', format="%Y-%m-%dT%H:%M:%SZ")

    class Meta:
        model = ChangeRequest
        fields = ['id', 'restaurantId', 'restaurantName', 'requestedBy', 'dateSubmitted', 'status', 'change_type', 'details']

class TouristAccountSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source='created_at', format="%Y-%m-%dT%H:%M:%SZ")

    class Meta:
        model = TouristAccount
        fields = ['id', 'username', 'email', 'createdAt']

class TouristItinerarySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='itinerary_id')
    userAccountKey = serializers.CharField(source='user_account_key')
    isFinished = serializers.BooleanField(source='is_finished')
    updatedAt = serializers.DateTimeField(source='updated_at', format="%Y-%m-%dT%H:%M:%SZ")

    class Meta:
        model = TouristItinerary
        fields = ['id', 'userAccountKey', 'name', 'stops', 'isFinished', 'updatedAt']
