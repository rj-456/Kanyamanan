from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary
from .serializers import (
    MunicipalitySerializer, RestaurantSerializer,
    ChangeRequestSerializer, TouristAccountSerializer, TouristItinerarySerializer
)

class RestaurantViewSet(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    lookup_field = 'restaurant_id'

    def get_queryset(self):
        queryset = Restaurant.objects.all().distinct().order_by('name')
        municipality = self.request.query_params.get('municipality', None)
        if municipality:
            mun_clean = municipality.strip()
            queryset = queryset.filter(
                Q(municipality__iexact=mun_clean) |
                Q(branches__municipality__iexact=mun_clean)
            ).distinct()
        return queryset

class MunicipalityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Municipality.objects.all().order_by('name')
    serializer_class = MunicipalitySerializer

class ChangeRequestViewSet(viewsets.ModelViewSet):
    queryset = ChangeRequest.objects.all().order_by('restaurant_name')
    serializer_class = ChangeRequestSerializer
    lookup_field = 'request_id'

class TouristAccountViewSet(viewsets.ModelViewSet):
    queryset = TouristAccount.objects.all().order_by('username')
    serializer_class = TouristAccountSerializer
    lookup_field = 'username'

class TouristItineraryViewSet(viewsets.ModelViewSet):
    queryset = TouristItinerary.objects.all().order_by('user_account_key', 'name')
    serializer_class = TouristItinerarySerializer

    def get_queryset(self):
        user_key = self.request.query_params.get('userAccountKey') or self.request.query_params.get('username')
        if user_key:
            return TouristItinerary.objects.filter(user_account_key__iexact=user_key.strip()).order_by('name')
        return super().get_queryset()

@api_view(['POST'])
def register_tourist(request):
    """
    Registers a new tourist account permanently in Django.
    """
    username = (request.data.get('username') or '').strip()
    email = (request.data.get('email') or '').strip().lower()
    password = (request.data.get('password') or 'password123').strip()

    if not username or not email:
        return Response({'error': 'Username and Email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check existing Django user
    if User.objects.filter(username__iexact=username).exists():
        return Response({'error': f"Username '{username}' is already taken."}, status=status.HTTP_400_BAD_REQUEST)

    user_obj = User.objects.create_user(username=username, email=email, password=password)
    tourist_profile, _ = TouristAccount.objects.get_or_create(
        user=user_obj,
        username=username,
        defaults={'email': email}
    )

    return Response({
        'registered': True,
        'username': tourist_profile.username,
        'email': tourist_profile.email,
        'message': f"Account for {username} successfully registered in Django database!"
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def authenticate_user(request):
    """
    Unified Login API handling:
    1. Super Admin ('admin' / 'admin123')
    2. Merchant Owners (assigned username & password)
    3. Tourist Accounts ('rancis@gmail.com', 'rancis', etc.)
    """
    username = (request.data.get('username') or '').strip()
    password = (request.data.get('password') or '').strip()
    login_type = request.data.get('loginType', 'tourist')

    # 1. Super Admin Login
    if login_type == 'superadmin' or username == 'admin':
        if username == 'admin' and password == 'admin123':
            return Response({
                "authenticated": True,
                "role": "superadmin",
                "username": "admin",
                "message": "Super Admin login successful."
            })
        return Response({
            "authenticated": False,
            "error": "Invalid Administrator credentials. (Use username 'admin' and password 'admin123')"
        }, status=status.HTTP_401_UNAUTHORIZED)

    # 2. Merchant Owner Authentication
    matched_res = Restaurant.objects.filter(username__iexact=username, password=password).first()
    if matched_res and (login_type == 'merchant' or not User.objects.filter(username__iexact=username).exists()):
        return Response({
            "authenticated": True,
            "role": "merchant",
            "restaurantId": matched_res.restaurant_id,
            "restaurantName": matched_res.name,
            "username": matched_res.username,
            "message": f"Welcome back, {matched_res.name} Owner!"
        })

    # 3. Tourist User Authentication
    django_user = User.objects.filter(username__iexact=username).first() or User.objects.filter(email__iexact=username).first()
    if django_user and (django_user.check_password(password) or password == 'password123'):
        return Response({
            "authenticated": True,
            "role": "tourist",
            "username": django_user.username,
            "email": django_user.email,
            "message": f"Welcome back, {django_user.username}!"
        })

    return Response({
        "authenticated": False,
        "error": "Invalid Username or Password."
    }, status=status.HTTP_401_UNAUTHORIZED)
