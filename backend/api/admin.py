from django.contrib import admin
from django.db.models import Q
from .models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary

class BranchInline(admin.TabularInline):
    model = Branch
    extra = 1

class MenuItemInline(admin.TabularInline):
    model = MenuItem
    extra = 1

class MultiBranchMunicipalityFilter(admin.SimpleListFilter):
    title = 'Municipality / City'
    parameter_name = 'municipality'

    def lookups(self, request, model_admin):
        municipalities = Municipality.objects.all().values_list('name', flat=True)
        return [(m, m) for m in municipalities]

    def queryset(self, request, queryset):
        if self.value():
            val = self.value().strip()
            return queryset.filter(
                Q(municipality__iexact=val) |
                Q(branches__municipality__iexact=val)
            ).distinct()
        return queryset

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_municipalities', 'username', 'password', 'operating_hours', 'price_tier')
    search_fields = ('name', 'municipality', 'username', 'description', 'address', 'branches__municipality', 'branches__address')
    list_filter = (MultiBranchMunicipalityFilter, 'price_tier')
    ordering = ('name',)
    inlines = [BranchInline, MenuItemInline]

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

@admin.register(TouristAccount)
class TouristAccountAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'created_at')
    search_fields = ('username', 'email')
    ordering = ('username',)

@admin.register(TouristItinerary)
class TouristItineraryAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_account_key', 'is_finished', 'updated_at')
    search_fields = ('name', 'user_account_key')
    list_filter = ('is_finished', 'updated_at')
    ordering = ('user_account_key', 'name')

@admin.register(Municipality)
class MunicipalityAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)

@admin.register(ChangeRequest)
class ChangeRequestAdmin(admin.ModelAdmin):
    list_display = ('request_id', 'restaurant_name', 'requested_by', 'status', 'date_submitted')
    list_filter = ('status', 'date_submitted')
    ordering = ('restaurant_name',)
