from django.db import models
from django.contrib.auth.models import User

class Municipality(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Municipalities"
        ordering = ['name']

    def __str__(self):
        return self.name

class Restaurant(models.Model):
    PRICE_TIER_CHOICES = [
        ('$', '$ (Budget)'),
        ('$$', '$$ (Moderate)'),
        ('$$$', '$$$ (Premium)'),
        ('$$$$', '$$$$ (Fine Degustation)'),
    ]

    restaurant_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=200)
    municipality = models.CharField(max_length=100)
    operating_hours = models.CharField(max_length=100, default='09:00 AM - 08:00 PM')
    price_tier = models.CharField(max_length=10, choices=PRICE_TIER_CHOICES, default='$')
    lat = models.FloatField(default=15.0320)
    lng = models.FloatField(default=120.6860)
    categories = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True, default='')
    address = models.CharField(max_length=300, blank=True, default='')
    image = models.URLField(max_length=1000, blank=True, default='')
    images = models.JSONField(default=list, blank=True)
    
    # Merchant Account Credentials
    username = models.CharField(max_length=100, unique=True, default='owner')
    password = models.CharField(max_length=100, default='password123')
    
    # Occupancy Heatmap Data (hourly occupancy levels 0-100)
    occupancy = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.municipality})"

class Branch(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='branches', on_delete=models.CASCADE)
    branch_name = models.CharField(max_length=200)
    municipality = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    operating_hours = models.CharField(max_length=100, default='09:00 AM - 08:00 PM')
    lat = models.FloatField(default=15.0320)
    lng = models.FloatField(default=120.6860)

    class Meta:
        ordering = ['branch_name']

    def __str__(self):
        return f"{self.branch_name} - {self.municipality}"

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='menu', on_delete=models.CASCADE)
    item_id = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    price = models.FloatField(default=0.0)
    ingredients = models.TextField(blank=True, default='')
    allergens = models.CharField(max_length=200, blank=True, default='')
    health_indicators = models.CharField(max_length=200, blank=True, default='')
    calories = models.IntegerField(default=0)
    protein = models.IntegerField(default=0)
    carbs = models.IntegerField(default=0)
    fat = models.IntegerField(default=0)
    image = models.URLField(max_length=1000, blank=True, default='')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - ₱{self.price}"

class ChangeRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    request_id = models.CharField(max_length=100, primary_key=True)
    restaurant_id = models.CharField(max_length=100)
    restaurant_name = models.CharField(max_length=200)
    requested_by = models.CharField(max_length=100, default='Merchant')
    date_submitted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    change_type = models.CharField(max_length=100, default='Menu / Info Update')
    details = models.JSONField(default=dict)

    class Meta:
        ordering = ['restaurant_name']

    def __str__(self):
        return f"Request #{self.request_id} for {self.restaurant_name} ({self.status})"

class TouristAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tourist_profile', null=True, blank=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['username']

    def __str__(self):
        return f"{self.username} ({self.email})"

class TouristItinerary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='itineraries', null=True, blank=True)
    user_account_key = models.CharField(max_length=150, db_index=True, help_text="Tourist username or email identifier")
    itinerary_id = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    stops = models.JSONField(default=list)
    is_finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Tourist Itineraries"
        unique_together = ('user_account_key', 'itinerary_id')
        ordering = ['user_account_key', 'name']

    def __str__(self):
        return f"Itinerary '{self.name}' ({self.user_account_key})"
