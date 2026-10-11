from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RestaurantViewSet, MunicipalityViewSet,
    ChangeRequestViewSet, TouristAccountViewSet, TouristItineraryViewSet,
    RestaurantReviewViewSet, AttractionViewSet, AttractionReviewViewSet,
    authenticate_user, register_tourist, catalog_menu, scan_plate,
    deleted_restaurants_list
)

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet, basename='restaurant')
router.register(r'reviews', RestaurantReviewViewSet, basename='review')
router.register(r'attractions', AttractionViewSet, basename='attraction')
router.register(r'attraction-reviews', AttractionReviewViewSet, basename='attraction-review')
router.register(r'destination-reviews', AttractionReviewViewSet, basename='destination-review')
router.register(r'municipalities', MunicipalityViewSet, basename='municipality')
router.register(r'change-requests', ChangeRequestViewSet, basename='change-request')
router.register(r'tourist-accounts', TouristAccountViewSet, basename='tourist-account')
router.register(r'itineraries', TouristItineraryViewSet, basename='itinerary')

urlpatterns = [
    path('deleted-restaurants/', deleted_restaurants_list, name='api-deleted-restaurants'),
    path('deleted-restaurants', deleted_restaurants_list),
    path('catalog-menu/', catalog_menu, name='api-catalog-menu'),
    path('catalog-menu', catalog_menu),
    path('scan-plate/', scan_plate, name='api-scan-plate'),
    path('scan-plate', scan_plate),
    path('auth/login/', authenticate_user, name='api-login'),
    path('auth/register-tourist/', register_tourist, name='api-register-tourist'),
    path('', include(router.urls)),
]

