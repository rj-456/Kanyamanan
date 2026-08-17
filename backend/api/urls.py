from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RestaurantViewSet, MunicipalityViewSet,
    ChangeRequestViewSet, TouristAccountViewSet, TouristItineraryViewSet,
    authenticate_user, register_tourist
)

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet, basename='restaurant')
router.register(r'municipalities', MunicipalityViewSet, basename='municipality')
router.register(r'change-requests', ChangeRequestViewSet, basename='change-request')
router.register(r'tourist-accounts', TouristAccountViewSet, basename='tourist-account')
router.register(r'itineraries', TouristItineraryViewSet, basename='itinerary')

urlpatterns = [
    path('auth/login/', authenticate_user, name='api-login'),
    path('auth/register-tourist/', register_tourist, name='api-register-tourist'),
    path('', include(router.urls)),
]
