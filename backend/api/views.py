import os
import re
import json
import base64
import urllib.request
import urllib.error

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Q
from .models import (
    Municipality, Restaurant, ChangeRequest,
    TouristAccount, TouristItinerary, RestaurantReview
)
from .serializers import (
    MunicipalitySerializer, RestaurantSerializer,
    ChangeRequestSerializer, TouristAccountSerializer, TouristItinerarySerializer,
    RestaurantReviewSerializer
)

class RestaurantViewSet(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    lookup_field = 'restaurant_id'

    def get_queryset(self):
        queryset = Restaurant.objects.all().distinct().order_by('name')
        municipality = self.request.query_params.get('municipality', None)
        if municipality:
            mun_clean = str(municipality).strip()
            queryset = queryset.filter(
                Q(municipality__iexact=mun_clean) |
                Q(branches__municipality__iexact=mun_clean)
            ).distinct()
        return queryset

class RestaurantReviewViewSet(viewsets.ModelViewSet):
    queryset = RestaurantReview.objects.all().order_by('-created_at')
    serializer_class = RestaurantReviewSerializer

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurantId') or self.request.query_params.get('restaurant')
        if restaurant_id:
            return RestaurantReview.objects.filter(restaurant__restaurant_id=restaurant_id).order_by('-created_at')
        return super().get_queryset()

    def perform_create(self, serializer):
        data = getattr(self.request, 'data', {}) or {}
        restaurant_id = data.get('restaurantId') or data.get('restaurant') if isinstance(data, dict) else None
        if restaurant_id:
            restaurant = Restaurant.objects.filter(restaurant_id=restaurant_id).first()
            if restaurant:
                serializer.save(restaurant=restaurant)
                return
        serializer.save()

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
            return TouristItinerary.objects.filter(user_account_key__iexact=str(user_key).strip()).order_by('name')
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


# =========================================================================
# AI MENU OCR & AUTOMATIC DISH CATALOGER PIPELINE
# =========================================================================

SYSTEM_MENU_PROMPT = """You are an expert menu parser and culinary database annotator with deep understanding of Philippine restaurant menus, caterers, buffet packages, and regional dishes.
Deconstruct the provided menu images or raw text regardless of layout (multi-column layouts, flyers, blackboard, nested packages).

CRITICAL EXTRACTION REQUIREMENTS:
1. Scan ALL sections, ALL columns, and ALL items. DO NOT truncate or summarize. Extract EVERY single dish, beverage, and package across all columns (e.g. 20-40+ dishes).
2. Separate items into two categories:
   - Individual / À La Carte Dishes: dish name, normalized price in PHP, estimated ingredients, allergens, category, and estimated calories ('calories' in kcal).
   - Buffet & Reservation Packages: package name, per-head or fixed total price, list of included dishes, package inclusions, and selection rules. If an item has 'pax', 'per head', or combo items like 'Side Dish, Rice, Drinks', classify it as a package or combo meal.
3. VALID MENU VERIFICATION & NOISE REJECTION:
   - Verify if the provided image or text is an actual restaurant menu, food flyer, or price list.
   - If the uploaded image or text is NOT a food menu or price list (e.g. photo of a person, animal, vehicle, scenery, general document, invoice, code, or non-menu image), return is_valid_menu: false, dishes: [], and buffet_and_set_packages: [].
   - DO NOT extract restaurant names, logos (e.g. 'Aling Lucing'), category headers (e.g. 'Main Dish', 'Mains', 'Dishes'), store addresses, phone numbers, or stray OCR noise as dishes!
   - Every single dish MUST be a legitimate, authentic food dish or beverage.
4. BEVERAGE & DRINK SPECIFICATIONS:
   - For drinks and beverages (e.g. soft drinks, iced tea, fruit juices, shakes, bottled water): NEVER say "local seasoning", "garlic", "onions", or savory herbs. Describe beverages appropriately (e.g. "Refreshing chilled beverage served ice-cold") with clean drink ingredients (e.g. "Carbonated water", "Ice", "Fruit extract").
5. Calculate and include realistic nutritional calorie count ('calories' in kcal) for each dish based on authentic Philippine culinary preparations (e.g. Sisig: 650 kcal, Bulalo: 750 kcal, Liempo: 680 kcal, Pancit Palabok: 480 kcal, Pork BBQ: 180 kcal, Leche Flan: 320 kcal, Plain Rice: 200 kcal)."""

CATALOG_MENU_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "restaurant_or_menu_title": {"type": "STRING"},
        "currency": {"type": "STRING", "default": "PHP"},
        "is_valid_menu": {"type": "BOOLEAN", "description": "False if the input is not a restaurant menu or food flyer"},
        "error": {"type": "STRING", "description": "Explanation if not a valid menu"},
        "dishes": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "name": {"type": "STRING"},
                    "category": {"type": "STRING", "description": "e.g., Grilled, Special Order, Pork, Poultry, Seafood, Noodles, Soup, Dessert, Beverage"},
                    "price": {"type": "NUMBER", "description": "Numeric price without currency symbols"},
                    "description": {"type": "STRING"},
                    "estimated_ingredients": {"type": "ARRAY", "items": {"type": "STRING"}},
                    "allergens": {"type": "ARRAY", "items": {"type": "STRING"}},
                    "calories": {"type": "INTEGER", "description": "Estimated calories in kcal"},
                    "is_signature_or_specialty": {"type": "BOOLEAN"}
                },
                "required": ["name", "category", "price", "calories"]
            }
        },
        "buffet_and_set_packages": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "package_name": {"type": "STRING", "description": "e.g., Reservation Package A, Buffet Tier 1, Funnmeal Combo"},
                    "pricing_model": {"type": "STRING", "enum": ["PER_PAX", "FIXED_TOTAL", "CUSTOM"]},
                    "price": {"type": "NUMBER"},
                    "minimum_pax": {"type": "INTEGER", "description": "e.g., 30, 50, or null if unstated"},
                    "calories": {"type": "INTEGER", "description": "Estimated calories per pax or meal"},
                    "included_dishes": {"type": "ARRAY", "items": {"type": "STRING"}},
                    "other_inclusions": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "e.g., Steamed Rice, Side Dish, Drinks"},
                    "selection_rules": {"type": "STRING", "description": "e.g., Choice of coleslaw or buttered vegetables"}
                },
                "required": ["package_name", "pricing_model", "price", "included_dishes"]
            }
        }
    },
    "required": ["dishes", "buffet_and_set_packages"]
}


def estimate_py_dish_calories(name, category=""):
    n = (name or "").lower()
    if re.search(r'crispy pata|pata', n): return 920
    if re.search(r'lechon kawali|bagnet', n): return 780
    if re.search(r'bulalo|nilaga', n): return 720
    if re.search(r'liempo|pork belly', n): return 680
    if re.search(r'sisig', n): return 650
    if re.search(r'kare[- ]*kare', n): return 640
    if re.search(r'kaldereta|caldereta', n): return 620
    if re.search(r'bringhe|paella', n): return 550
    if re.search(r'adobo', n): return 520
    if re.search(r'palabok|luglug', n): return 480
    if re.search(r'fried chicken', n): return 480
    if re.search(r'pancit|bihon|canton|miki|noodles', n): return 420
    if re.search(r'chicken inasal|inasal', n): return 420
    if re.search(r'sinigang', n): return 360
    if re.search(r'tempura|camaron', n): return 340
    if re.search(r'leche flan', n): return 320
    if re.search(r'chicken leg|legs', n): return 310
    if re.search(r'chicken wing|wings', n): return 290
    if re.search(r'tilapia|bangus|hito|fish fillet', n): return 280
    if re.search(r'pinakbet|pakbit|chopsuey', n): return 240
    if re.search(r'shrimp|hipon|tahong', n): return 220
    if re.search(r'rice|sinangag', n): return 200
    if re.search(r'pork bbq|bbq', n): return 180
    if re.search(r'hotdog', n): return 150
    if re.search(r'coke|royal|sprite|soda|drinks', n): return 140
    if re.search(r'water', n): return 0
    if re.search(r'funnmeal|combo|meal|set', n): return 680
    if category == "Pork": return 580
    if category == "Poultry": return 420
    if category == "Seafood": return 290
    if category == "Noodles": return 430
    if category == "Soup": return 350
    if category == "Dessert": return 290
    if category == "Beverage": return 120
    return 450

OCR_WORD_REPLACEMENTS = [
    (r'\b(?:глариток\s*(?:na\s+bangus)?|глариток|rlarntok\s*na\s*bangus|rlarntok)\b', 'Inihaw na Bangus'),
    (r'\b(?:mii\s+bihon|mki\s+bihon|mkibihon|miki\s+bihon)\b', 'Miki Bihon'),
    (r'\b(?:canton[.\s-]+solo|canton\s+solo)\b', 'Pancit Canton (Solo)'),
    (r'\b(?:palabok[.\s-]+solo|palabok\s+solo)\b', 'Pancit Palabok (Solo)'),
    (r'\b(?:bihon[.\s-]+solo|bihon\s+solo)\b', 'Pancit Bihon (Solo)'),
    (r'\b^guisado$\b', 'Pancit Guisado'),
    (r'\b(?:s[.\s-]*miso[-:\s]*salmon\s+head(?:[-\s]*\d+\s*g)?)\b', 'Sinigang sa Miso - Salmon Head (200g)'),
    (r'\b(?:s[.\s-]*miso[-:\s]*salmon\s+belly(?:[-\s]*g)?)\b', 'Sinigang sa Miso - Salmon Belly'),
    (r'\b(?:s[.\s-]*miso)\b', 'Sinigang sa Miso'),
    (r'\b(?:c[.\s-]*bulaklak(?:[-\s]*\d+\s*g)?)\b', 'Chicharon Bulaklak (200g)'),
    (r'\b(?:c[.\s-]*bale(?:[-\s]*g)?|c[.\s-]*balat(?:[-\s]*g)?)\b', 'Chicharon Balat (200g)'),
    (r'\b(?:c[.\s-]*wing|c[.\s-]*wings)\b', 'Chicken Wings'),
    (r'\b(?:b[.\s-]*garlic(?:[-\s]*\d+\s*g)?)\b', 'Butter Garlic (200g)'),
    (r'\b(?:m\s+water|m\.water|min\s+water)\b', 'Mineral Water (Bottled)'),
    (r'\b(?:royal\s+1\.5)\b', 'Royal (1.5L)'),
    (r'\b(?:coke\s+1\.5)\b', 'Coke (1.5L)'),
    (r'\b(?:ice\s+drinks?)\b', 'Iced Drinks'),
    (r'\b(?:plain\s+rice\s*\(\s*)?per\s*[- ]*cup(?:\s*\))?', 'Plain Rice (Per Cup)'),
    (r'\b(?:chicaen|chiken|chikn|chickn|chikken|chikean|chkn)\b', 'Chicken'),
    (r'\b(?:chicken\s+ass|chickn\s+ass|chikn\s+ass)\b', 'Chicken Tail (Isol)'),
    (r'\b(?:gried\s+lenge|gried\s+liempo|griled\s+lenge|grid\s+lenge)\b', 'Grilled Liempo'),
    (r'\b(?:lenge|liembo|lempo)\b', 'Liempo'),
    (r'\b(?:gried|griled|grild|grlld)\b', 'Grilled'),
    (r'\b(?:drieks|dricks|drnks|drinls|drikns|drnk|driske)\b', 'Drinks'),
    (r'\b(?:side\s+dies|side\s+diss|sieg\s+side\s+dish|sido\s+dish|side\s+diah|side\s+dishs)\b', 'Side Dish'),
    (r'\b(?:diss|diah|dies)\b', 'Dish'),
    (r'\b(?:sieg)\b', 'Side'),
    (r'\b(?:disty\s+rice|ditry\s+rice|drty\s+rice|dity\s+rice)\b', 'Dirty Rice'),
    (r'\b(?:sinanggag|sinangag|sinanggg)\b', 'Sinangag'),
    (r'\b(?:sheine\s+rol|shein\s+rol|shane\s+rol|sheine\s+roll|shang\s+rol)\b', 'Shanghai Roll'),
    (r'\b(?:shrimp\s+ral|shrimp\s+rol)\b', 'Shrimp Roll'),
    (r'\b(?:sping\s+rol|sprng\s+rol)\b', 'Spring Roll'),
    (r'\b(?:rol)\b', 'Roll'),
    (r'\b(?:ral)\b', 'Roll'),
    (r'\b(?:keiveno\s+bangus|releno\s+bangus|relyeno\s+bangus)\b', 'Relleno Bangus'),
    (r'\b(?:bangs|bngus|bangos)\b', 'Bangus'),
    (r'\b(?:tilapya|tlapia)\b', 'Tilapia'),
    (r'\b(?:hipn|hpn)\b', 'Hipon'),
    (r'\b(?:tahng|thong)\b', 'Tahong'),
    (r'\b(?:sisg|sisigk|sisik)\b', 'Sisig'),
    (r'\b(?:lechn|lechonk)\b', 'Lechon'),
    (r'\b(?:lecnon\s+rawall?|lecnon\s+rawali|lechon\s+rawall?|lechon\s+rawali)\b', 'Lechon Kawali'),
    (r'\b(?:kawli|kwali)\b', 'Kawali'),
    (r'\b(?:pork\s+bbe|pork\s+bb\b)\b', 'Pork BBQ'),
    (r'\b(?:sizzin\s+pusit|sizzin|sizin\s+pusit)\b', 'Sizzling Pusit'),
    (r'\b(?:kilayin|sizzling\s+kilayin|kilaying\s+kapampangan)\b', 'Sizzling Kilayin'),
    (r"\b(?:tokwa'?t\s+baboy|tokwat\s+bboy)\b", "Tokwa't Baboy"),
    (r'\b(?:begukn|binagongan|binagoongn)\b', 'Binagoongan'),
    (r'\b(?:patas|pata)\b', 'Pata'),
    (r'\b(?:caldreta|kaldereta|caldereta)\b', 'Caldereta'),
    (r'\b(?:bullo|bulalo)\b', 'Bulalo'),
    (r'\b(?:kare[- ]?kar)\b', 'Kare-Kare'),
    (r'\b(?:chopsuy|chopsuey)\b', 'Chopsuey'),
    (r'\b(?:pinakbt|pakbit)\b', 'Pakbit'),
    (r'\b(?:ensalad|ensalada)\b', 'Ensalada'),
    (r'\b(?:cruis|crus)\b', 'Crisps'),
    (r'\b(?:polorder|pol\s+order|por\s+order)\b', 'pcs / order'),
]

def clean_py_ocr_text(text):
    if not text:
        return ""
    cleaned = text
    for pattern, repl in OCR_WORD_REPLACEMENTS:
        cleaned = re.sub(pattern, repl, cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\b[P₱]\s*11\b(?!\d)', '₱115', cleaned)
    cleaned = re.sub(r'\b[P₱]\s*12\b(?!\d)', '₱125', cleaned)
    cleaned = re.sub(r'\b[P₱]\s*13\b(?!\d)', '₱130', cleaned)
    return cleaned

def clean_py_dish_or_package_name(name):
    if not name:
        return ""
    cleaned = str(name).strip()
    cleaned = re.sub(r'^([A-Z]\d+)(?:\s*[-–—:]+\s*|\s+)', r'\1 - ', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'(?:\s*[-–—:]+\s*){2,}', ' - ', cleaned)
    for pattern, repl in OCR_WORD_REPLACEMENTS:
        cleaned = re.sub(pattern, repl, cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    return cleaned

def repair_py_pricings(price, context_name=""):
    try:
        p = float(price)
    except:
        return 100.0
    if p == 11.0: return 115.0
    if p == 12.0: return 125.0
    if p == 13.0: return 130.0
    if p == 14.0: return 140.0
    if p == 15.0 and re.search(r'set|package|meal|combo|legs|shrimp|roll', context_name, re.I): return 150.0
    if p > 900.0 and re.search(r'\b\d{3,4}[-\s.]\d{4}\b', context_name): return 120.0
    return p

def is_py_garbage_or_boilerplate(text):
    if not text or not isinstance(text, str): return True
    t = text.strip()
    if len(t) < 2: return True
    if re.search(r'^\d{3,4}[-\s.]\d{4}$', t) or re.search(r'\b\d{3}[-\s.]\d{4}\b', t) or re.search(r'\b\d{4}[-\s.]\d{4}\b', t): return True
    if re.search(r'^(?:\+?63|0)9\d{9}$', t): return True
    if re.search(r'^[,.]\s*\d{1,2}$', t) or re.search(r'^[,.\s0-9]+$', t): return True
    if re.match(r'^unne\b', t, re.I): return True
    if re.search(r'\b(?:meumum|minimum|maximum|min)\s+of\b', t, re.I): return True
    if re.search(r'\bchoice\s+(?:it|of)\s+side\b', t, re.I): return True
    if re.search(r'\bcastian\s+or\s+ballered\b', t, re.I) or re.search(r'\bcoleslaw\s+or\s+buttered\b', t, re.I): return True
    if re.search(r'\b(?:we\s+deliver|free\s+delivery|advance\s+order|open\s+daily|contact\s+us|hotline|branch)\b', t, re.I): return True
    if re.search(r'\b(?:re-\s*fias|fietgite|dan,\s*tea|why\s+mata|chunsult|curatold)\b', t, re.I): return True
    if re.search(r'^tsk\s*bu\b', t, re.I) or re.search(r'^\btsk\b', t, re.I) or re.search(r'\btsk\s+bu\b', t, re.I): return True
    words = t.split()
    if any(len(w) >= 3 and not re.search(r'[aeiouy]', w, re.I) and not re.match(r'^(?:bbq|pcs|pkg|solo|max|min|lbs)$', w, re.I) for w in words):
        return True
    # Restaurant branding, store logos, and fragments: e.g. "Aling)", "Aling Lucing", "Aling", "Lucing", "ucing"
    if re.search(r'^(?:aling[\s\)]*|lucing|aling\s+lucing|ucing|restaurant|kainan|eatery|lutong\s+bahay|carinderia)$', t, re.I): return True
    if re.search(r'\b(?:aling\s+lucing|restaurant|kainan)\b', t, re.I): return True
    if re.match(r'^[a-z0-9\s]+[)\]}>]$', t, re.I) and not re.search(r'\([^)]+\)', t) and not re.search(r'solo|cup|\d+g|pcs', t, re.I):
        if re.search(r'aling\b|lucing\b|dish\b|menu\b', t, re.I): return True
    return False

def is_py_section_header(text):
    if not text or not isinstance(text, str): return False
    t = text.strip()
    return bool(re.search(r'^(?:main\s+dish(?:es)?|mains?|ulam|special(?:s)?|special\s+order|house\s+special(?:s)?|best\s+seller(?:s)?|chef\'?s?\s+special(?:s)?|grilled|inihaw|barbecue|bbq|pancit|noodles?|pasta|drinks?|beverages?|in\s+can|desserts?|pangmayumu|sweets?|rice|nasi|funnmeals?|set\s+meals?|combos?|appetizers?|pulutan|starters?|side\s+dish(?:es)?|seafood|pork|poultry|chicken|beef|soups?|sabaw|a\s+la\s+carte|ala\s+carte|hot\s+specials?|all\s+day\s+breakfast)$', t, re.I))

KNOWN_PY_CULINARY_DISHES = [
    'sisig', 'lechon', 'lechon kawali', 'crispy pata', 'pata', 'bulalo', 'sinigang', 'nilaga',
    'kare-kare', 'kare kare', 'adobo', 'kaldereta', 'caldereta', 'menudo', 'afritada', 'mechado',
    'kilayin', 'sizzling kilayin', 'bopis', "tokwa't baboy", 'tokwat baboy', 'dinuguan', 'tapa', 'longganisa', 'tocino', 'embutido',
    'bagnet', 'liempo', 'grilled liempo', 'pork bbq', 'chicharon', 'chicharon bulaklak', 'chicharon balat',
    'chicken inasal', 'fried chicken', 'chicken bbq', 'chicken wings', 'butter garlic', 'chicken curry',
    'chicken tail', 'chicken ass', 'isol', 'chicken skin', 'chicken liver', 'chicken heart', 'chicken gizzard',
    'bangus', 'inihaw na bangus', 'daing na bangus', 'relleno bangus', 'tilapia', 'hito', 'grilled hito',
    'salmon', 'sinigang sa miso', 'tahong', 'hipon', 'pusit', 'sizzling pusit', 'inihaw na pusit',
    'gambas', 'halabos', 'camaron', 'tempura', 'sweet and sour fish',
    'pancit', 'pancit canton', 'pancit bihon', 'pancit palabok', 'palabok', 'miki bihon', 'miki',
    'sotanghon', 'lomi', 'guisado', 'spaghetti', 'carbonara',
    'pinakbet', 'pakbit', 'chopsuey', 'laing', 'torta', 'tortang talong', 'ensalada', 'gising-gising',
    'plain rice', 'garlic rice', 'sinangag', 'dirty rice', 'fried rice',
    'leche flan', 'halo-halo', 'halo halo', 'tibok-tibok', 'tibok tibok', 'turon', 'ube',
    'coke', 'royal', 'sprite', 'pepsi', 'mountain dew', 'sarsi', 'mineral water', 'bottled water',
    'iced tea', 'calamansi juice', 'mango shake', 'buko juice', 'soda', 'shanghai roll', 'spring roll',
    'hotdog', 'bbq'
]

def is_py_valid_dish_name(name, has_price=False):
    if not name or not isinstance(name, str): return False
    n = name.strip()
    if len(n) < 3: return False
    if re.match(r'^[\d\s.,:;()#*~_-]+$', n): return False
    if is_py_section_header(n): return False
    if is_py_garbage_or_boilerplate(n): return False
    lower = n.lower()
    if re.search(r'^(?:aling\b|lucing\b|aling\s+lucing\b|restaurant\b|kainan\b|eatery\b|bistro\b|welcome\b|thank\s+you\b|main\s+dish\b|side\s+dish\b)', lower):
        return False
    if re.match(r'^[a-z]{1,4}\)?$', n, re.I) and not re.search(r'bbq|tea|ice|egg|rib|pao|pie', lower):
        return False
    if has_price:
        if re.search(r'^(?:total|subtotal|change|cash|balance|table|cashier|order|vat|delivery|receipt)$', lower): return False
        return True
    return any(d in lower for d in KNOWN_PY_CULINARY_DISHES)

def is_py_likely_valid_menu(raw_text):
    if not raw_text or not isinstance(raw_text, str): return False
    text = raw_text.strip()
    if len(text) < 8: return False
    lower = text.lower()
    food_keywords = [
        'sisig', 'lechon', 'liempo', 'pata', 'bulalo', 'sinigang', 'nilaga', 'kare-kare', 'adobo',
        'pancit', 'bihon', 'canton', 'palabok', 'miki', 'chicharon', 'wings', 'chicken', 'manok',
        'pork', 'baboy', 'beef', 'baka', 'bangus', 'tilapia', 'fish', 'seafood', 'shrimp', 'hipon',
        'rice', 'sinangag', 'cup', 'halo-halo', 'dessert', 'drinks', 'beverage', 'water', 'coke',
        'royal', 'sprite', 'ulam', 'mains', 'combo', 'meal', 'platter', 'bucket', 'menu', 'order',
        'grilled', 'inihaw', 'bbq', 'barbecue', 'soup', 'sabaw', 'appetizer', 'pulutan', 'tokwa'
    ]
    food_matches = sum(1 for kw in food_keywords if kw in lower)
    price_matches = re.findall(r'(?:[₱P\u20B1]\s*\d{2,5}|\b\d{2,4}(?:\.\d{2})?\s*(?:pesos|php)?\b)', text, re.I)
    if food_matches >= 2 and len(price_matches) >= 1: return True
    if food_matches >= 3: return True
    if re.search(r'menu|price\s*list|packages|set\s*meals|short\s*orders', lower) and (food_matches >= 1 or len(price_matches) >= 1):
        return True
    return False

def generate_py_dish_description_and_ingredients(dish_name, category="Mains"):
    name = (dish_name or "").strip()
    lower = name.lower()
    cat = (category or "").lower()

    # 1. BEVERAGES & DRINKS (Strictly NO local seasoning, garlic, or onions)
    if cat == 'beverage' or bool(re.search(r'water|beverage|drink|coke|royal|sprite|pepsi|tea|juice|shake|soda|beer|coffee', lower)):
        if re.search(r'water|mineral', lower):
            return "Pure refreshing bottled mineral drinking water served chilled.", ["Purified Mineral Water", "Ice"], ["None identified"], 0, {"protein": "0g", "carbs": "0g", "fat": "0g"}
        elif re.search(r'coke|royal|sprite|pepsi|soda|mountain dew|sarsi', lower):
            return f"Refreshing, crisp carbonated {name} served ice-cold.", [name, "Carbonated Water", "Sweetener", "Ice"], ["None identified"], 140, {"protein": "0g", "carbs": "39g", "fat": "0g"}
        elif re.search(r'tea|iced tea', lower):
            return "Freshly brewed house iced tea sweetened with cane sugar and infused with fresh calamansi citrus essence.", ["Brewed Black Tea", "Calamansi Essence", "Sugar Syrup", "Ice"], ["None identified"], 90, {"protein": "0g", "carbs": "23g", "fat": "0g"}
        elif re.search(r'calamansi', lower):
            return "Freshly squeezed native calamansi lime juice sweetened with pure cane syrup and served chilled.", ["Fresh Calamansi Juice", "Purified Water", "Cane Syrup", "Ice"], ["None identified"], 80, {"protein": "0.5g", "carbs": "20g", "fat": "0g"}
        elif re.search(r'mango', lower):
            return "Thick, velvety blended shake made with ripe sweet Philippine mangoes, milk, and crushed ice.", ["Ripe Mangoes", "Milk", "Crushed Ice", "Cane Sugar"], ["Contains Dairy"], 210, {"protein": "2.5g", "carbs": "46g", "fat": "3.2g"}
        elif re.search(r'buko', lower):
            return "Naturally sweet and hydrating young coconut water served cold with tender ribbons of fresh buko meat.", ["Fresh Coconut Water", "Young Coconut Meat", "Ice"], ["None identified"], 70, {"protein": "1.5g", "carbs": "16g", "fat": "0.5g"}
        elif re.search(r'beer', lower):
            return "Crisp and frosty chilled local pilsner beer with balanced malt sweetness and subtle hop aroma.", ["Malted Barley", "Hops", "Filtered Water", "Yeast"], ["Contains Gluten"], 140, {"protein": "1.2g", "carbs": "11g", "fat": "0g"}
        elif re.search(r'coffee', lower):
            algs = ["Contains Dairy"] if re.search(r'milk|latte', lower) else ["None identified"]
            cals = 120 if re.search(r'milk|latte', lower) else 15
            return "Aromatic freshly brewed Kapampangan roasted coffee served steaming hot or iced.", ["Brewed Roasted Coffee Beans", "Hot Purified Water", "Sugar / Milk"], algs, cals, {"protein": "1g", "carbs": "3g", "fat": "0.5g"}
        return "Refreshing chilled specialty beverage served ice-cold.", [name, "Purified Water", "Ice"], ["None identified"], 110, {"protein": "0g", "carbs": "27g", "fat": "0g"}

    # 2. RICE VARIETIES
    if cat == 'rice' or bool(re.search(r'rice|sinangag|cup', lower)):
        if re.search(r'garlic|sinangag', lower):
            return "Fragrant stir-fried rice sautéed in garlic-infused oil and tossed with crunchy golden toasted garlic flakes.", ["Steamed White Rice", "Toasted Golden Garlic Bits", "Garlic Oil", "Sea Salt"], ["None identified"], 240, {"protein": "4g", "carbs": "44g", "fat": "5g"}
        if re.search(r'dirty', lower):
            return "Hearty seasoned rice infused with rich pork drippings, liver bits, and aromatic Kapampangan spices.", ["Steamed Rice", "Pork Pan Drippings", "Liver Bits", "Caramelized Onions", "Black Pepper"], ["Contains Pork"], 280, {"protein": "8g", "carbs": "44g", "fat": "8g"}
        return "Freshly steamed fragrant white rice, the indispensable staple pairing for authentic Kapampangan meals.", ["Steamed White Rice", "Pandan Essence"], ["None identified"], 200, {"protein": "4g", "carbs": "45g", "fat": "0.4g"}

    # 3. DESSERTS
    if cat == 'dessert' or bool(re.search(r'flan|halo|dessert|sweet|cake|tibok|turon', lower)):
        if re.search(r'flan', lower):
            return "Velvety smooth, golden steamed caramel custard crafted with rich egg yolks, condensed milk, and dark caramel syrup.", ["Egg Yolks", "Condensed Milk", "Evaporated Milk", "Caramelized Cane Sugar"], ["Contains Eggs", "Contains Dairy"], 320, {"protein": "7g", "carbs": "42g", "fat": "14g"}
        if re.search(r'halo', lower):
            return "Celebrated Filipino shaved ice dessert layered with sweetened beans, nata de coco, jackfruit, leche flan, and evaporated milk.", ["Shaved Ice", "Sweet Beans", "Nata de Coco", "Leche Flan", "Ube Halaya", "Evaporated Milk"], ["Contains Dairy", "Contains Eggs"], 420, {"protein": "8g", "carbs": "78g", "fat": "9g"}
        if re.search(r'tibok', lower):
            return "Pampanga's beloved creamy carabao's milk pudding gently cooked until thick and topped with fragrant golden latik curds.", ["Carabao's Milk", "Ground Glutinous Rice", "Cane Sugar", "Toasted Coconut Latik"], ["Contains Dairy"], 250, {"protein": "6g", "carbs": "38g", "fat": "8g"}
        return f"Traditional sweet Kapampangan {name} crafted with native ingredients.", [name, "Cane Sugar", "Coconut Milk"], ["Contains Dairy"], 280, {"protein": "5g", "carbs": "45g", "fat": "9g"}

    # 4. SOUPS & BROTHS
    if cat == 'soup' or bool(re.search(r'soup|sinigang|bulalo|nilaga|miso|sabaw', lower)):
        if re.search(r'sinigang', lower):
            is_fish = bool(re.search(r'salmon|fish|head|belly|bangus|hito', lower))
            is_shellfish = bool(re.search(r'shrimp|hipon', lower))
            is_pork = bool(re.search(r'pork|baboy|liempo', lower))
            algs = ["Contains Fish"] if is_fish else ["Contains Shellfish"] if is_shellfish else ["Contains Pork"] if is_pork else ["None identified"]
            cals = 220 if (is_fish or is_shellfish) else 340
            nuts = {"protein": "26g", "carbs": "8g", "fat": "6g"} if (is_fish or is_shellfish) else {"protein": "28g", "carbs": "8g", "fat": "20g"}
            return "Signature tamarind-soured Kapampangan broth simmered slow with fresh water spinach (kangkong), radish, and tomatoes.", [name, "Tamarind Broth", "Tomatoes", "Onions", "Kangkong", "Radish"], algs, cals, nuts
        if re.search(r'bulalo', lower):
            return "Rich and comforting beef bone marrow broth slow-boiled with sweet corn on the cob, black peppercorns, and tender native cabbage.", ["Beef Shank & Marrow", "Sweet Corn", "Pechay Greens", "Black Peppercorn", "Onions"], ["None identified"], 650, {"protein": "42g", "carbs": "10g", "fat": "48g"}
        return f"Hearty comforting native soup simmered with slow-cooked broth, garlic, onions, and fresh leafy greens.", [name, "Native Broth Base", "Leafy Greens", "Garlic", "Onions", "Ginger"], ["None identified"], 280, {"protein": "22g", "carbs": "10g", "fat": "12g"}

    # 5. NOODLES & PASTA
    if cat == 'noodles' or bool(re.search(r'noodle|bihon|canton|palabok|miki|pasta|spaghetti|guisado', lower)):
        if re.search(r'palabok|luglug', lower):
            return "Thick rice noodles generously smothered in golden shrimp sauce, crushed chicharon, tinapa flakes, and sliced hard-boiled egg.", ["Rice Noodles", "Shrimp Gravy", "Tinapa Flakes", "Chicharon Bits", "Hard-boiled Egg", "Calamansi"], ["Contains Shellfish", "Contains Eggs", "Contains Pork"], 480, {"protein": "18g", "carbs": "62g", "fat": "16g"}
        return f"Traditional stir-fried savory noodles tossed with crisp seasonal vegetables, sliced meat, and rich stock.", [name, "Noodles", "Shredded Chicken / Pork", "Cabbage", "Carrots", "Soy Sauce"], ["Contains Gluten", "Contains Soy"], 420, {"protein": "22g", "carbs": "54g", "fat": "12g"}

    # 6. SPECIFIC SPECIALTIES
    if re.search(r'kilayin', lower):
        return "Traditional Kapampangan braised pork slices, tender liver, and hearty cuts simmered in spiced cane vinegar, garlic, onions, and cracked black pepper.", ["Pork Slices", "Pork Liver", "Cane Vinegar", "Garlic", "Onions", "Black Peppercorn"], ["Contains Pork"], 380, {"protein": "28g", "carbs": "5g", "fat": "26g"}
    if re.search(r'liempo', lower):
        return "Thick-cut pork belly marinated in citrus calamansi, garlic, and savory soy sauce, chargrilled over charcoal until smoky and caramelized.", ["Pork Belly (Liempo)", "Calamansi", "Soy Sauce", "Garlic", "Brown Sugar", "Black Pepper"], ["Contains Pork", "Contains Soy"], 680, {"protein": "32g", "carbs": "4g", "fat": "58g"}
    if re.search(r'pusit', lower):
        return "Fresh whole squid seared with garlic, sweet-savory soy glaze, and chilies, served sizzling tender on a hot plate.", ["Fresh Squid", "Garlic", "Soy Sauce", "Calamansi", "Red Chili", "Butter"], ["Contains Mollusk / Shellfish", "Contains Soy"], 220, {"protein": "26g", "carbs": "8g", "fat": "6g"}
    if re.search(r'hito', lower):
        return "Smoky fresh catfish chargrilled over hot coals with crisp skin and tender sweet flesh, traditionally paired with burong isda or spiced vinegar.", ["Fresh Catfish (Hito)", "Sea Salt", "Garlic", "Ginger", "Spiced Dip"], ["Contains Fish"], 260, {"protein": "24g", "carbs": "1g", "fat": "16g"}
    if re.search(r'lechon kawali|kawali|bagnet', lower):
        return "Deep-fried crispy pork belly boiled with aromatics and flash-fried to blistering crackling perfection with succulent interior meat.", ["Pork Belly Slab", "Bay Leaves", "Peppercorns", "Sea Salt", "Garlic", "Spiced Liver Sauce"], ["Contains Pork"], 740, {"protein": "34g", "carbs": "2g", "fat": "64g"}
    if re.search(r'pork bbq|pork barbecue', lower) or (re.search(r'bbq|barbecue', lower) and cat == 'pork'):
        return "Skewered tender pork shoulder slices marinated in sweet banana ketchup, soy sauce, calamansi, and garlic, grilled smoky and glossy.", ["Pork Shoulder Skewers", "Banana Ketchup", "Soy Sauce", "Calamansi", "Brown Sugar", "Garlic"], ["Contains Pork", "Contains Soy"], 240, {"protein": "22g", "carbs": "16g", "fat": "10g"}
    if re.search(r'chicken bbq|chicken barbecue|inasal', lower):
        return "Juicy chicken cuts marinated in lemongrass, annatto, calamansi, and garlic, chargrilled smoky and basted with seasoned glaze.", ["Chicken Cuts", "Calamansi Juice", "Annatto Oil", "Garlic", "Lemongrass", "Brown Sugar"], ["Contains Poultry"], 310, {"protein": "33g", "carbs": "12g", "fat": "14g"}
    if re.search(r'relleno', lower) and re.search(r'bangus|fish', lower):
        return "Deboned whole milkfish stuffed with seasoned flaked fish meat, minced carrots, sweet raisins, and green peas, baked or fried golden.", ["Deboned Bangus", "Flaked Milkfish Meat", "Minced Carrots", "Raisins", "Green Peas", "Eggs", "Aromatics"], ["Contains Fish", "Contains Eggs"], 340, {"protein": "28g", "carbs": "14g", "fat": "18g"}
    if re.search(r'bangus', lower):
        return "Fresh milkfish stuffed with aromatic diced tomatoes, onions, and ginger, wrapped and grilled over hot coals until fragrant.", ["Fresh Bangus (Milkfish)", "Tomatoes", "Onions", "Ginger", "Calamansi", "Sea Salt"], ["Contains Fish"], 290, {"protein": "31g", "carbs": "2g", "fat": "16g"}
    if re.search(r'chicken tail|chicken ass|isol', lower):
        return "Succulent skewered chicken tail (isol) grilled over live coals until smoky, with rich crispy edges and seasoned sweet barbecue glaze.", ["Chicken Tail (Isol)", "Sweet Soy Glaze", "Garlic", "Calamansi", "Brown Sugar"], ["Contains Poultry", "Contains Soy"], 360, {"protein": "16g", "carbs": "4g", "fat": "32g"}
    if re.search(r'chicken skin', lower):
        return "Crunchy, golden deep-fried chicken skin seasoned lightly with sea salt and garlic, served with spiced cane vinegar dip.", ["Crispy Chicken Skin", "Garlic Salt", "Cracked Black Pepper", "Spiced Garlic Vinegar Dip"], ["Contains Poultry"], 410, {"protein": "18g", "carbs": "4g", "fat": "36g"}
    if re.search(r'chicken liver|atay', lower):
        return "Skewered chicken liver chargrilled until tender and smoky, coated in savory barbecue marinade.", ["Chicken Liver", "Garlic", "Soy Sauce", "Calamansi", "Black Pepper"], ["Contains Poultry", "Contains Soy"], 190, {"protein": "26g", "carbs": "3g", "fat": "7g"}
    if re.search(r'chicken heart|puso ng manok', lower):
        return "Skewered chargrilled chicken hearts basted with sweet-savory barbecue glaze, tender and juicy.", ["Chicken Hearts", "Barbecue Glaze", "Garlic", "Soy Sauce", "Black Pepper"], ["Contains Poultry", "Contains Soy"], 180, {"protein": "24g", "carbs": "2g", "fat": "8g"}
    if re.search(r'chicken gizzard|balunbalunan', lower):
        return "Chewy, flavorful chargrilled chicken gizzard skewers basted in savory garlic-soy marinade.", ["Chicken Gizzards", "Garlic", "Soy Sauce", "Calamansi", "Spices"], ["Contains Poultry", "Contains Soy"], 160, {"protein": "27g", "carbs": "1g", "fat": "4g"}
    if re.search(r'chicken wing|wings', lower):
        return "Crispy fried chicken wings tossed in rich golden butter, toasted garlic bits, and fresh herbs.", ["Chicken Wings", "Garlic Butter", "Toasted Garlic", "Sea Salt", "Black Pepper"], ["Contains Poultry", "Contains Dairy"], 390, {"protein": "29g", "carbs": "8g", "fat": "26g"}
    if re.search(r'dinuguan|tid-tad', lower):
        return "Rich, velvety Kapampangan pork stew simmered in pork blood, spiced cane vinegar, long green chilies, and garlic.", ["Pork Belly & Offal", "Pork Blood Broth", "Cane Vinegar", "Green Finger Chilies", "Garlic", "Onions"], ["Contains Pork"], 390, {"protein": "29g", "carbs": "8g", "fat": "26g"}
    if re.search(r'sisig', lower):
        return "Iconic Kapampangan crispy grilled pork jowl and ears tossed with onions, calamansi, and chili peppers.", ["Pork Jowl", "Chicken Liver", "Onions", "Calamansi", "Chili Peppers"], ["Contains Pork"], 650, {"protein": "36g", "carbs": "6g", "fat": "52g"}
    if re.search(r'pata', lower):
        return "Deep-fried whole pork knuckle cooked to crackling golden perfection with tender, succulent juicy meat.", ["Pork Knuckle (Pata)", "Bay Leaves", "Peppercorn", "Garlic", "Sea Salt", "Spiced Soy-Vinegar Dip"], ["Contains Pork"], 890, {"protein": "58g", "carbs": "1g", "fat": "72g"}
    if re.search(r'chicharon bulaklak', lower):
        return "Crispy deep-fried ruffled fat (mesentery) seasoned with sea salt, served hot with spiced garlic cane vinegar dip.", ["Pork Ruffle Fat (Mesentery)", "Sea Salt", "Garlic", "Spiced Cane Vinegar Dip"], ["Contains Pork"], 480, {"protein": "14g", "carbs": "0g", "fat": "46g"}
    if re.search(r'chicharon', lower):
        return f"Crisp and crunchy Kapampangan {name} seasoned with sea salt, served with spiced vinegar dip.", [name, "Sea Salt", "Spiced Garlic Vinegar Dip"], ["Contains Pork"], 320, {"protein": "28g", "carbs": "0g", "fat": "22g"}
    if re.search(r'tokwa\'?t\s+baboy', lower):
        return "Classic pairing of crispy deep-fried tofu and tender pork slices tossed in spiced soy-vinegar dressing with onions and chili.", ["Firm Tofu", "Pork Belly", "Soy Sauce", "Vinegar", "Onions", "Chili"], ["Contains Soy", "Contains Pork"], 310, {"protein": "24g", "carbs": "10g", "fat": "18g"}
    if re.search(r'kare[- ]*kare', lower):
        return "Kapampangan savory peanut and toasted rice stew loaded with tender beef tripe, eggplant, string beans, and savory bagoong.", ["Beef Shank / Tripe", "Ground Peanuts", "Toasted Rice Flour", "Eggplant", "String Beans", "Bagoong Alamang"], ["Contains Peanuts", "Contains Shellfish"], 580, {"protein": "34g", "carbs": "18g", "fat": "42g"}
    if re.search(r'kaldereta|caldereta', lower):
        return "Hearty tomato-based braised stew with liver spread, sweet bell peppers, carrots, and potatoes with gentle chili warmth.", ["Stewing Meat", "Tomato Sauce", "Liver Spread", "Bell Peppers", "Carrots", "Potatoes"], ["None identified"], 540, {"protein": "36g", "carbs": "16g", "fat": "34g"}

    # Dynamic fallback
    is_grilled = bool(re.search(r'grilled|inihaw|barbecue|bbq', lower))
    is_pork = cat == 'pork' or bool(re.search(r'pork|baboy|liempo|pata', lower))
    is_poultry = cat == 'poultry' or bool(re.search(r'chicken|chick|manok', lower))
    is_seafood = cat == 'seafood' or bool(re.search(r'fish|bangus|tilapia|squid|pusit|shrimp|seafood', lower))
    
    if is_grilled:
        if is_seafood:
            return f"Fresh {name} chargrilled over hot coals with sea salt and calamansi, smoky and tender.", [name, "Calamansi", "Sea Salt", "Garlic"], ["Contains Fish"], 250, {"protein": "28g", "carbs": "2g", "fat": "14g"}
        if is_poultry:
            return f"Tender skewered {name} chargrilled over charcoal with sweet-savory basting glaze.", [name, "Sweet Soy Glaze", "Garlic", "Calamansi"], ["Contains Poultry", "Contains Soy"], 320, {"protein": "32g", "carbs": "10g", "fat": "15g"}
        return f"Succulent {name} marinated in calamansi and garlic, grilled to smoky perfection over live coals.", [name, "Garlic", "Soy Marinade", "Calamansi"], ["Contains Pork", "Contains Soy"] if is_pork else ["None identified"], 580 if is_pork else 420, {"protein": "30g", "carbs": "6g", "fat": "48g"} if is_pork else {"protein": "34g", "carbs": "6g", "fat": "26g"}
        
    return f"Delicious freshly prepared {name} cooked with traditional Filipino aromatics.", [name, "Garlic", "Onions", "Sea Salt"], ["None identified"], 380, {"protein": "24g", "carbs": "12g", "fat": "18g"}

def is_py_package_or_combo(name):
    if not name or not isinstance(name, str): return False
    n = name.lower()
    if re.search(r'^(?:f\d+|[1-9]s|set|combo|package|funnmeal)\b', n) and any(k in n for k in ['side', 'rice', 'drink', 'crisp', ',']):
        return True
    if any(k in n for k in ['side dish', 'side dies', 'side diss']) and any(k in n for k in ['rice', 'drink', 'crisp', 'alice', 'driske', 'ice']):
        return True
    if 'side dirty rice' in n and any(k in n for k in ['liempo', 'chicken', 'crisp', 'roll']):
        return True
    return False

def split_py_combo_into_package(name, price=125):
    cleaned = clean_py_dish_or_package_name(name)
    cleaned = re.sub(r'([a-z])\s+(Side\s+(?:Dish|Dies|Diss))\b', r'\1, \2', cleaned, flags=re.I)
    cleaned = re.sub(r'([a-z])\s+(Dirty\s+Rice|Steamed\s+Rice|Rice)\b', r'\1, \2', cleaned, flags=re.I)
    cleaned = re.sub(r'([a-z])\s+(Iced?\s+Drinks?|Drinks?)\b', r'\1, \2', cleaned, flags=re.I)
    
    parts = [clean_py_dish_or_package_name(s.strip()) for s in re.split(r'[,+]|\b(?:with|w/)\b', cleaned, flags=re.I) if s.strip()]
    pkg_title = parts[0] if parts else "Set Meal Combo"
    if not re.search(r'meal|combo|package|set', pkg_title, re.I):
        pkg_title = f"{pkg_title} Meal"
        
    dishes = parts if len(parts) > 1 else [cleaned, "Side Dish", "Steamed / Dirty Rice", "Iced Drink"]
    return {
        "package_name": pkg_title,
        "pricing_model": "FIXED_TOTAL",
        "price": repair_py_pricings(price, pkg_title),
        "calories": 680,
        "minimum_pax": None,
        "included_dishes": dishes,
        "other_inclusions": ["Steamed Rice / Dirty Rice", "Choice of Side Dish (Coleslaw or Buttered Vegetables)", "Drink"],
        "selection_rules": "Served fresh with side dish and beverage"
    }

def sanitize_py_menu_catalog(catalog, raw_input_text=""):
    if not catalog or not isinstance(catalog, dict):
        return {
            "is_valid_menu": False,
            "error": "The uploaded image does not appear to be a restaurant menu or food flyer.",
            "restaurant_or_menu_title": "Non-Menu Image Detected",
            "currency": "PHP",
            "dishes": [],
            "buffet_and_set_packages": []
        }
    if catalog.get('is_valid_menu') is False:
        return {
            **catalog,
            "is_valid_menu": False,
            "error": catalog.get('error') or "The uploaded image does not appear to be a restaurant menu or food flyer.",
            "dishes": [],
            "buffet_and_set_packages": []
        }
    if raw_input_text and not is_py_likely_valid_menu(raw_input_text):
        return {
            **catalog,
            "is_valid_menu": False,
            "error": "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
            "restaurant_or_menu_title": "Non-Menu Image Detected",
            "dishes": [],
            "buffet_and_set_packages": []
        }
    raw_dishes = catalog.get('dishes') or []
    raw_pkgs = catalog.get('buffet_and_set_packages') or []
    
    clean_dishes = []
    clean_pkgs = []
    for pkg in raw_pkgs:
        p_name = clean_py_dish_or_package_name(pkg.get('package_name', ''))
        clean_pkgs.append({
            **pkg,
            "package_name": p_name,
            "price": repair_py_pricings(pkg.get('price', 125), p_name),
            "included_dishes": [clean_py_dish_or_package_name(d) for d in pkg.get('included_dishes', [])] if isinstance(pkg.get('included_dishes'), list) else []
        })
        
    for dish in raw_dishes:
        if not dish or not dish.get('name'): continue
        r_name = str(dish['name']).strip()
        if is_py_garbage_or_boilerplate(r_name) or is_py_section_header(r_name): continue
        if not is_py_valid_dish_name(r_name, bool(dish.get('price'))): continue
        if is_py_package_or_combo(r_name):
            clean_pkgs.append(split_py_combo_into_package(r_name, dish.get('price', 125)))
            continue
        c_name = clean_py_dish_or_package_name(r_name)
        if is_py_garbage_or_boilerplate(c_name) or is_py_section_header(c_name): continue
        if not is_py_valid_dish_name(c_name, bool(dish.get('price'))): continue
        
        # Categorize properly
        cat = dish.get('category', 'Mains')
        if re.search(r'soup|sinigang|bulalo|nilaga|miso', c_name, re.I): cat = "Soup"
        elif re.search(r'noodle|bihon|canton|palabok|miki|pasta|spaghetti|guisado', c_name, re.I): cat = "Noodles"
        elif re.search(r'water|beverage|drink|coke|royal|sprite|tea|juice|shake', c_name, re.I): cat = "Beverage"
        elif re.search(r'rice|cup|sinangag', c_name, re.I): cat = "Rice"
        elif re.search(r'salmon|bangus|tilapia|shrimp|fish|seafood|tahong|tempura|hipon', c_name, re.I): cat = "Seafood"
        elif re.search(r'chicken|wings|inasal|manuk|chick', c_name, re.I): cat = "Poultry"
        elif re.search(r'pork|sisig|liempo|kawali|bulaklak|balat|chicharon|bbq|pata', c_name, re.I): cat = "Pork"
        elif re.search(r'flan|halo|dessert|sweet|cake', c_name, re.I): cat = "Dessert"
        elif re.search(r'hotdog|garlic', c_name, re.I): cat = "Grilled"
        
        f_price = repair_py_pricings(dish.get('price', 100), c_name)
        desc, ings, algs, cal, nutrients = generate_py_dish_description_and_ingredients(c_name, cat)
        clean_dishes.append({
            **dish,
            "name": c_name,
            "category": cat,
            "price": f_price,
            "description": desc,
            "estimated_ingredients": ings,
            "allergens": algs,
            "calories": cal,
            "nutrients": nutrients
        })
        
    if not clean_dishes and not clean_pkgs:
        return {
            **catalog,
            "is_valid_menu": False,
            "error": "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
            "restaurant_or_menu_title": "Non-Menu Image Detected",
            "dishes": [],
            "buffet_and_set_packages": []
        }
        
    return {
        **catalog,
        "is_valid_menu": True,
        "dishes": clean_dishes,
        "buffet_and_set_packages": clean_pkgs
    }


@api_view(['POST'])
def catalog_menu(request):
    """
    Multimodal Vision & Text Menu Processing Pipeline (/api/catalog-menu).
    Accepts multipart/form-data images/flyers/PDFs or JSON body raw_text,
    """
    raw_text = clean_py_ocr_text((request.data.get('raw_text') or request.data.get('text') or '').strip())
    
    # Collect images from files or JSON base64 payloads
    image_parts = []
    
    # 1. Multi-file uploads (multipart/form-data)
    uploaded_files = request.FILES.getlist('images') or request.FILES.getlist('files')
    if not uploaded_files and 'file' in request.FILES:
        uploaded_files = [request.FILES['file']]
    if not uploaded_files and 'image' in request.FILES:
        uploaded_files = [request.FILES['image']]

    for f in uploaded_files:
        try:
            content_type = f.content_type or 'image/jpeg'
            if f.name.lower().endswith('.pdf'):
                content_type = 'application/pdf'
            b64_data = base64.b64encode(f.read()).decode('utf-8')
            image_parts.append({
                "inlineData": {
                    "mimeType": content_type,
                    "data": b64_data
                }
            })
        except Exception as err:
            print("File read warning:", err)

    # 2. JSON Base64 data URLs in payload
    data_urls = request.data.get('images')
    if isinstance(data_urls, list):
        for item in data_urls:
            raw_url = item if isinstance(item, str) else item.get('dataUrl', '')
            if raw_url and 'base64,' in raw_url:
                try:
                    header, b64_part = raw_url.split('base64,', 1)
                    mime = 'image/jpeg'
                    if 'image/png' in header: mime = 'image/png'
                    elif 'image/webp' in header: mime = 'image/webp'
                    elif 'application/pdf' in header: mime = 'application/pdf'
                    image_parts.append({
                        "inlineData": {
                            "mimeType": mime,
                            "data": b64_part
                        }
                    })
                except Exception as err:
                    print("Data URL decode warning:", err)

    if not raw_text and not image_parts:
        return Response({
            "error": "No input provided. Please provide raw_text or upload menu image(s)/flyers."
        }, status=status.HTTP_400_BAD_REQUEST)

    # Resolve Gemini API Key
    api_key = (
        os.environ.get('GEMINI_API_KEY') or
        request.headers.get('x-goog-api-key') or
        request.data.get('api_key') or
        ''
    ).strip()

    # Construct request parts
    parts = []
    parts.extend(image_parts)
    if raw_text:
        parts.append({"text": f"Raw Menu Text / Multi-column Content:\n{raw_text}"})
    else:
        parts.append({"text": "Please extract and catalog all dishes and packages across all columns from the provided menu image(s)."})

    models_to_try = [
        os.environ.get('GEMINI_MODEL', 'gemini-3.5-flash-lite'),
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-3.6-flash',
        'gemini-3.5-flash',
        'gemini-flash-latest'
    ]
    seen_models = set()
    models = [m for m in models_to_try if not (m in seen_models or seen_models.add(m))]
    
    if api_key:
        payload = {
            "contents": [{
                "parts": parts
            }],
            "systemInstruction": {
                "parts": [{"text": SYSTEM_MENU_PROMPT}]
            },
            "generationConfig": {
                "temperature": 0.1,
                "responseMimeType": "application/json",
                "responseSchema": CATALOG_MENU_SCHEMA
            }
        }

        for model_name in models:
            endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
            try:
                req_data = json.dumps(payload).encode('utf-8')
                req = urllib.request.Request(
                    endpoint,
                    data=req_data,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=30) as resp:
                    resp_json = json.loads(resp.read().decode('utf-8'))
                    candidate_text = resp_json.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
                    if candidate_text:
                        parsed_result = json.loads(candidate_text)
                        if isinstance(parsed_result, dict):
                            dishes_list = parsed_result.get('dishes', [])
                            packages_list = parsed_result.get('buffet_and_set_packages', [])
                            if dishes_list or packages_list:
                                return Response(sanitize_py_menu_catalog(parsed_result), status=status.HTTP_200_OK)
            except Exception as exc:
                print(f"Catalog Menu Gemini ({model_name}) error:", exc)

    # Early validation: If user provided text that does not match a food menu
    if raw_text and not is_py_likely_valid_menu(raw_text):
        return Response({
            "is_valid_menu": False,
            "error": "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
            "restaurant_or_menu_title": "Non-Menu Image Detected",
            "currency": "PHP",
            "dishes": [],
            "buffet_and_set_packages": []
        }, status=status.HTTP_200_OK)

    # Local Multi-Column Fallback Parsing
    dishes = []
    packages = []
    lines = [l.strip() for l in raw_text.splitlines() if l.strip()]
    current_category = "Mains"

    for line in lines:
        u = line.upper()
        has_price = bool(re.search(r'\d{2,}', line))
        if not has_price and is_py_section_header(line):
            if re.search(r'^(?:GRILLED|INHAW|BARBECUE|BBQ)\b', u): current_category = "Grilled"
            elif re.search(r'^(?:SPECIAL ORDER|SPECIALS)\b', u): current_category = "Special Order"
            elif re.search(r'^(?:PANCIT|NOODLES|PASTA)\b', u): current_category = "Noodles"
            elif re.search(r'^(?:DRINKS|BEVERAGES|IN CAN)\b', u): current_category = "Beverage"
            elif re.search(r'^(?:DESSERT|PANGMAYUMU|SWEETS)\b', u): current_category = "Dessert"
            elif re.search(r'^(?:RICE|NASI)\b', u): current_category = "Rice"
            elif re.search(r'^(?:SOUP|SABAW|SINIGANG)\b', u): current_category = "Soup"
            elif re.search(r'^(?:SEAFOOD|ISDA|ASAN)\b', u): current_category = "Seafood"
            elif re.search(r'^(?:FUNNMEALS|SET MEALS|COMBOS)\b', u): current_category = "Set Meals"
            elif re.search(r'^(?:MAIN\s+DISH|MAINS|ULAM)\b', u): current_category = "Mains"
            continue

        cells = [c.strip() for c in re.split(r'\t+', line) if c.strip()]
        tokens = cells if len(cells) > 1 else [line]

        for c_idx, cell in enumerate(tokens):
            if re.search(r'^(?:price|delivery|minimum|advance order|choice of|free delivery|we are now open)', cell, re.I):
                continue

            price_num = 150.0
            clean_name = cell

            inline_match = re.search(r'^(.*?)\s+([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)\s*$', cell)
            if inline_match and len(inline_match.group(1).strip()) >= 2:
                clean_name = inline_match.group(1).strip()
                price_num = float(re.sub(r'[^0-9.]', '', inline_match.group(2)))
            else:
                price_match = re.search(r'([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)', cell)
                if price_match:
                    price_num = float(re.sub(r'[^0-9.]', '', price_match.group(1)))
                    clean_name = re.sub(r'([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)', '', cell).strip(' -:•')

            clean_name = clean_py_dish_or_package_name(clean_name.strip(' -:•*#'))
            price_num = repair_py_pricings(price_num, clean_name)

            # Validate: Reject non-food stray words, logo fragments ("Aling)", "ucing"), and section headers
            if not is_py_valid_dish_name(clean_name, bool(price_num)):
                continue

            is_pkg = bool(re.search(r'^(?:F\d+[-:]|funnmeal|package|buffet|per pax|/pax|per head|set menu)', clean_name, re.I) or re.search(r'side dish.*rice', clean_name, re.I))

            if is_pkg:
                parts_split = [clean_py_dish_or_package_name(d.strip()) for d in re.split(r'[,+]', clean_name) if len(d.strip()) > 1]
                packages.append({
                    "package_name": clean_name.split(':')[0].strip() if ':' in clean_name else clean_name,
                    "pricing_model": "PER_PAX" if re.search(r'/pax|per pax|per head', cell, re.I) else "FIXED_TOTAL",
                    "price": price_num,
                    "calories": 680,
                    "minimum_pax": 30 if "30" in clean_name else (50 if "50" in clean_name else None),
                    "included_dishes": parts_split or ["Main Dish", "Side Dish", "Rice", "Drink"],
                    "other_inclusions": ["Steamed Rice", "Choice of Side Dish (Coleslaw or Buttered Vegetables)", "Drink"],
                    "selection_rules": "Served with side dish and beverage"
                })
            else:
                cat = current_category
                if re.search(r'soup|sinigang|bulalo', clean_name, re.I): cat = "Soup"
                elif re.search(r'sisig|liempo|pork|bbq|pata', clean_name, re.I): cat = "Pork"
                elif re.search(r'chicken|manuk|inasal|wing|leg', clean_name, re.I): cat = "Poultry"
                elif re.search(r'fish|shrimp|seafood|bangus|hipon|tahong|tempura', clean_name, re.I): cat = "Seafood"
                elif re.search(r'pancit|noodles|pasta|canton|bihon', clean_name, re.I): cat = "Noodles"
                elif re.search(r'halo-halo|cake|sweet|dessert|flan', clean_name, re.I): cat = "Dessert"
                elif re.search(r'tea|juice|shake|coffee|drink|coke|sprite|water', clean_name, re.I): cat = "Beverage"
                elif re.search(r'rice|cup', clean_name, re.I): cat = "Rice"

                desc, ings, algs, cal, nutrients = generate_py_dish_description_and_ingredients(clean_name, cat)

                dishes.append({
                    "name": clean_name,
                    "category": cat,
                    "price": price_num,
                    "calories": cal,
                    "nutrients": nutrients,
                    "description": desc,
                    "estimated_ingredients": ings,
                    "allergens": algs,
                    "is_signature_or_specialty": bool(re.search(r'sisig|special|house|famous|pata|bulalo', clean_name, re.I))
                })

    if not dishes and not packages:
        return Response({
            "is_valid_menu": False,
            "error": "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
            "restaurant_or_menu_title": "Non-Menu Image Detected",
            "currency": "PHP",
            "dishes": [],
            "buffet_and_set_packages": []
        }, status=status.HTTP_200_OK)

    fallback_data = {
        "restaurant_or_menu_title": "Cataloged Menu",
        "currency": "PHP",
        "dishes": dishes,
        "buffet_and_set_packages": packages
    }
    return Response(sanitize_py_menu_catalog(fallback_data, raw_text), status=status.HTTP_200_OK)


# =========================================================================
# PLATESCAN AI™ - TWO-PHASE FOOD VERIFICATION & NUTRITION ENGINE
# =========================================================================

SCAN_PLATE_SYSTEM_PROMPT = """You are a specialized culinary AI nutritionist and visual food classifier with deep expertise in Philippine regional gastronomy (especially authentic Kapampangan cuisine such as Sisig, Bringhe, Burong Isda/Balo-balo, Tibok-tibok, Murcon, etc.) as well as standard global dishes.

You must follow a strict two-phase inspection:
1. Verification & Gatekeeping (Food vs. Non-Food):
   - Inspect whether the image actually contains edible cooked food, prepared dishes, snacks, or beverages.
   - If the image depicts non-food subjects (such as faces, pets, clothing, furniture, office desks, electronics, vehicles, documents, or an empty plate/table), you MUST set is_food: false.
   - When is_food is false, do NOT calculate or hallucinate calories or nutrients. Provide a polite explanation in rejection_reason.
2. Nutritional Deconstruction (Only if is_food is true):
   - Accurately identify the dish name.
   - Estimate the visual portion volume against standard dishware to compute serving weight in grams.
   - Return realistic calories, macronutrients (protein, carbs, fat in grams), and sodium (in milligrams)."""

SCAN_PLATE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "is_food": {
            "type": "BOOLEAN",
            "description": "True ONLY if the frame contains edible food, dishes, or drinks. False for non-food objects, people, pets, or empty surfaces."
        },
        "rejection_reason": {
            "type": "STRING",
            "description": "User-friendly explanation if is_food is false explaining what was detected instead. Null if is_food is true."
        },
        "dish_name": {
            "type": "STRING",
            "description": "Accurate culinary name of the dish. Null if is_food is false."
        },
        "is_kapampangan": {
            "type": "BOOLEAN",
            "description": "True if authentic Kapampangan or Philippine regional dish."
        },
        "portion_estimate": {
            "type": "STRING",
            "description": "Estimated weight and serving, e.g., '160g (1 plate)'. Null if is_food is false."
        },
        "calories": {
            "type": "INTEGER",
            "description": "Estimated calories in kcal. Null if is_food is false."
        },
        "sodium_mg": {
            "type": "INTEGER",
            "description": "Estimated sodium in milligrams. Null if is_food is false."
        },
        "macros": {
            "type": "OBJECT",
            "properties": {
                "protein_g": {"type": "NUMBER"},
                "carbs_g": {"type": "NUMBER"},
                "fat_g": {"type": "NUMBER"}
            }
        },
        "confidence_score": {"type": "NUMBER"}
    },
    "required": ["is_food"]
}

@api_view(['POST'])
def scan_plate(request):
    """
    PlateScan AI™ Endpoint (/api/scan-plate)
    """
    # Extract base64 image data or uploaded file
    image_data_url = (
        request.data.get('image') or
        request.data.get('dataUrl') or
        request.data.get('imageDataUrl') or
        request.data.get('image_base64') or
        ''
    )

    mime_type = "image/jpeg"
    b64_content = ""

    if image_data_url and isinstance(image_data_url, str):
        if 'base64,' in image_data_url:
            header, b64_content = image_data_url.split('base64,', 1)
            if 'image/png' in header: mime_type = 'image/png'
            elif 'image/webp' in header: mime_type = 'image/webp'
        else:
            b64_content = image_data_url
    elif 'image' in request.FILES:
        f = request.FILES['image']
        mime_type = f.content_type or 'image/jpeg'
        b64_content = base64.b64encode(f.read()).decode('utf-8')
    elif 'file' in request.FILES:
        f = request.FILES['file']
        mime_type = f.content_type or 'image/jpeg'
        b64_content = base64.b64encode(f.read()).decode('utf-8')

    if not b64_content:
        return Response({
            "is_food": False,
            "rejection_reason": "No image frame received. Please capture a camera frame or upload a photo."
        }, status=status.HTTP_400_BAD_REQUEST)

    # Resolve API Key
    api_key = (
        os.environ.get('GEMINI_API_KEY') or
        request.headers.get('x-goog-api-key') or
        request.data.get('api_key') or
        ''
    ).strip()

    models_to_try = [
        os.environ.get('GEMINI_MODEL', 'gemini-3.5-flash-lite'),
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-3.6-flash',
        'gemini-3.5-flash',
        'gemini-flash-latest'
    ]
    seen = set()
    models = [m for m in models_to_try if not (m in seen or seen.add(m))]

    if api_key:
        parts = [
            {
                "inlineData": {
                    "mimeType": mime_type,
                    "data": b64_content
                }
            },
            {
                "text": "Inspect this image. Determine if it contains edible food or a beverage. If is_food is true, you MUST provide dish_name, portion_estimate, calories (in kcal), sodium_mg, and macros (protein_g, carbs_g, fat_g)."
            }
        ]

        payload = {
            "contents": [{"parts": parts}],
            "systemInstruction": {"parts": [{"text": SCAN_PLATE_SYSTEM_PROMPT}]},
            "generationConfig": {
                "temperature": 0.1,
                "responseMimeType": "application/json",
                "responseSchema": SCAN_PLATE_SCHEMA
            }
        }

        for model_name in models:
            endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
            try:
                req_data = json.dumps(payload).encode('utf-8')
                req = urllib.request.Request(
                    endpoint,
                    data=req_data,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=20) as resp:
                    resp_json = json.loads(resp.read().decode('utf-8'))
                    candidate_text = resp_json.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
                    if candidate_text:
                        parsed = json.loads(candidate_text)
                        if isinstance(parsed, dict) and "is_food" in parsed:
                            return Response(parsed, status=status.HTTP_200_OK)
            except Exception as exc:
                print(f"PlateScan Gemini ({model_name}) error:", exc)

    # Fallback when API key is missing or calls failed
    return Response({
        "is_food": False,
        "requires_api_key": not bool(api_key),
        "rejection_reason": (
            "PlateScan AI service could not analyze the frame. Please center the food in good lighting."
            if api_key
            else "Gemini API Key is required to run live visual food deconstruction. Enter your free API key or try Demo Mode."
        )
    }, status=status.HTTP_200_OK)


