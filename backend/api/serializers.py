from rest_framework import serializers
from .models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary

class BranchSerializer(serializers.ModelSerializer):
    branchName = serializers.CharField(source='branch_name')
    operatingHours = serializers.CharField(source='operating_hours')

    class Meta:
        model = Branch
        fields = ['branchName', 'municipality', 'address', 'operatingHours', 'lat', 'lng']

class MenuItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='item_id')
    healthIndicators = serializers.CharField(source='health_indicators')
    nutrition = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'price', 'ingredients', 'allergens', 'healthIndicators', 'nutrition', 'image']

    def get_nutrition(self, obj):
        return {
            'calories': obj.calories,
            'protein': obj.protein,
            'carbs': obj.carbs,
            'fat': obj.fat
        }

class RestaurantSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='restaurant_id')
    operatingHours = serializers.CharField(source='operating_hours')
    priceTier = serializers.CharField(source='price_tier')
    branches = BranchSerializer(many=True, read_only=True)
    menu = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'municipality', 'operatingHours',
            'priceTier', 'lat', 'lng', 'categories', 'description',
            'address', 'image', 'images', 'username', 'password',
            'occupancy', 'branches', 'menu'
        ]

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
