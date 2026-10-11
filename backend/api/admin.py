from typing import Any
from django.contrib import admin
from django.db.models import Q
from .models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary, RestaurantReview, Attraction, AttractionReview, DeletedRestaurant

class BranchInline(admin.TabularInline):
    model = Branch
    extra = 1

class MenuItemInline(admin.TabularInline):
    model = MenuItem
    extra = 1

class RestaurantReviewInline(admin.TabularInline):
    model = RestaurantReview
    extra = 0
    readonly_fields = ('created_at',)

class AttractionReviewInline(admin.TabularInline):
    model = AttractionReview
    extra = 0
    readonly_fields = ('created_at',)

class MultiBranchMunicipalityFilter(admin.SimpleListFilter):
    title = 'Municipality / City'
    parameter_name = 'municipality'

    def lookups(self, request, model_admin):
        municipalities = Municipality.objects.all().values_list('name', flat=True)
        return [(m, m) for m in municipalities]

    def queryset(self, request, queryset):
        val = self.value()
        if val:
            val_clean = str(val).strip()
            return queryset.filter(
                Q(municipality__iexact=val_clean) |
                Q(branches__municipality__iexact=val_clean)
            ).distinct()
        return queryset

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display: Any = ('name', 'display_municipalities', 'operating_hours', 'price_tier', 'phone_number')
    search_fields = ('name', 'municipality', 'username', 'description', 'address', 'branches__municipality', 'branches__address')
    list_filter = (MultiBranchMunicipalityFilter, 'price_tier')
    ordering = ('name',)
    inlines: Any = (BranchInline, MenuItemInline, RestaurantReviewInline)

    @admin.display(description='Municipality / Cities', ordering='municipality')
    def display_municipalities(self, obj):
        branches = obj.branches.all()
        if len(branches) > 1:
            muns = []
            for b in branches:
                if b.municipality and b.municipality not in muns:
                    muns.append(b.municipality)
            if muns:
                return " • ".join(muns)
        return obj.municipality

@admin.register(RestaurantReview)
class RestaurantReviewAdmin(admin.ModelAdmin):
    list_display: Any = ('reviewer_name', 'restaurant', 'rating', 'is_verified_diner', 'created_at')
    list_filter = ('rating', 'is_verified_diner', 'created_at')
    search_fields = ('reviewer_name', 'comment', 'restaurant__name')
    ordering = ('-created_at',)

@admin.register(TouristAccount)
class TouristAccountAdmin(admin.ModelAdmin):
    list_display: Any = ('username', 'email', 'created_at')
    search_fields = ('username', 'email')
    ordering = ('username',)

@admin.register(TouristItinerary)
class TouristItineraryAdmin(admin.ModelAdmin):
    list_display: Any = ('name', 'user_account_key', 'is_finished', 'updated_at')
    search_fields = ('name', 'user_account_key')
    list_filter = ('is_finished', 'updated_at')
    ordering = ('user_account_key', 'name')

@admin.register(Municipality)
class MunicipalityAdmin(admin.ModelAdmin):
    list_display: Any = ('name',)
    ordering = ('name',)

@admin.register(ChangeRequest)
class ChangeRequestAdmin(admin.ModelAdmin):
    list_display: Any = ('request_id', 'restaurant_name', 'requested_by', 'status', 'date_submitted')
    list_filter = ('status', 'date_submitted')
    ordering = ('restaurant_name',)

@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display: Any = ('name', 'municipality', 'attraction_type', 'is_festival', 'event_date')
    search_fields = ('name', 'municipality', 'description', 'address')
    list_filter = ('municipality', 'attraction_type', 'is_festival')
    ordering = ('name',)
    inlines: Any = (AttractionReviewInline,)

@admin.register(AttractionReview)
class AttractionReviewAdmin(admin.ModelAdmin):
    list_display: Any = ('reviewer_name', 'attraction', 'rating', 'is_verified_visitor', 'created_at')
    list_filter = ('rating', 'is_verified_visitor', 'created_at')
    search_fields = ('reviewer_name', 'comment', 'attraction__name')
    ordering = ('-created_at',)

@admin.register(DeletedRestaurant)
class DeletedRestaurantAdmin(admin.ModelAdmin):
    list_display: Any = ('restaurant_id', 'name', 'deleted_at')
    search_fields = ('restaurant_id', 'name')
    readonly_fields = ('deleted_at',)
    ordering = ('-deleted_at',)

