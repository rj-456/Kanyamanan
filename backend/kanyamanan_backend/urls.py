from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_health_check(request):
    return JsonResponse({
        "status": "healthy",
        "service": "Kanyamanan Pampanga Culinary Heritage API (Django Backend)",
        "version": "1.0.0",
        "documentation": "/api/"
    })

urlpatterns = [
    path('', root_health_check, name='root-health'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
