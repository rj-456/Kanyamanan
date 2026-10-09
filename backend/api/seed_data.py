import os
import sys
import json
import django
import django.apps

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kanyamanan_backend.settings')
try:
    if not django.apps.apps.ready:
        django.setup()
except Exception:
    django.setup()

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from api.models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary, Attraction

ADMIN_PASSWORD_HASH = make_password('admin123', salt='KanyamananAdminSalt2026', hasher='pbkdf2_sha256')

def seed_attractions():
    attractions_json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'extracted_attractions.json')
    if not os.path.exists(attractions_json_path):
        alt_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'extracted_attractions.json')
        if os.path.exists(alt_path):
            attractions_json_path = alt_path

    if os.path.exists(attractions_json_path):
        with open(attractions_json_path, 'r', encoding='utf-8') as f:
            attractions_data = json.load(f)
        for a in attractions_data:
            if not a.get('id'):
                continue
            Attraction.objects.update_or_create(
                attraction_id=a['id'],
                defaults={
                    'name': a.get('name', ''),
                    'municipality': a.get('municipality', ''),
                    'address': a.get('address', ''),
                    'lat': a.get('lat', 15.0320),
                    'lng': a.get('lng', 120.6860),
                    'attraction_type': a.get('type', '📍 Cultural Landmark'),
                    'is_festival': bool(a.get('isFestival', False)),
                    'event_date': a.get('eventDate', ''),
                    'event_month': a.get('eventMonth', ''),
                    'active_months': a.get('activeMonths', []),
                    'sample_active_date': a.get('sampleActiveDate', ''),
                    'schedule_note': a.get('scheduleNote', ''),
                    'announcement_note': a.get('announcementNote', ''),
                    'description': a.get('description', ''),
                    'details': a.get('details', ''),
                    'image': a.get('image', ''),
                    'operating_hours': a.get('operatingHours', ''),
                    'opening_time': a.get('openingTime', ''),
                    'closing_time': a.get('closingTime', ''),
                    'is_24_hours': bool(a.get('is24Hours', False))
                }
            )
        print(f"  - Seeded {len(attractions_data)} Tourist Destinations / Attractions")

def seed_missing_restaurants():
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'extracted_restaurants.json')
    if not os.path.exists(json_path):
        alt_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'extracted_restaurants.json')
        if os.path.exists(alt_path):
            json_path = alt_path

    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        existing_ids = set(Restaurant.objects.values_list('restaurant_id', flat=True))
        existing_names = set(Restaurant.objects.values_list('name', flat=True))

        created_count = 0
        for r in data:
            rid = r.get('id')
            rname = r.get('name')
            if not rid or not rname:
                continue
            if rid not in existing_ids and rname not in existing_names:
                resto = Restaurant.objects.create(
                    restaurant_id=rid,
                    name=rname,
                    municipality=r.get('municipality', ''),
                    operating_hours=r.get('operatingHours', '09:00 AM - 08:00 PM'),
                    price_tier=r.get('priceTier', '$'),
                    lat=r.get('lat', 15.0320),
                    lng=r.get('lng', 120.6860),
                    categories=r.get('categories', []),
                    description=r.get('description', ''),
                    address=r.get('address', ''),
                    image=r.get('image', ''),
                    images=r.get('images', []),
                    facebook_url=r.get('facebookUrl', '') or r.get('facebook_url', ''),
                    instagram_url=r.get('instagramUrl', '') or r.get('instagram_url', ''),
                    tiktok_url=r.get('tiktokUrl', '') or r.get('tiktok_url', ''),
                    phone_number=r.get('phoneNumber', '') or r.get('phone_number', ''),
                    email=r.get('email', ''),
                    reservation_info=r.get('reservationInfo', '') or r.get('reservation_info', ''),
                    username=r.get('username', rid[:18]),
                    password=r.get('password', 'password123'),
                    occupancy=r.get('occupancy', [])
                )
                Branch.objects.create(
                    restaurant=resto,
                    branch_name=f"{rname} (Main Branch)",
                    municipality=resto.municipality,
                    address=resto.address,
                    operating_hours=resto.operating_hours,
                    lat=resto.lat,
                    lng=resto.lng
                )
                created_count += 1
        if created_count > 0:
            print(f"  - Seeded {created_count} missing restaurants")

def seed():
    print("[+] Seeding Complete Kanyamanan Database...")
    seed_attractions()
    seed_missing_restaurants()

    # 1. Superuser (Deterministic across all lambda containers)
    admin_user = User.objects.filter(username='admin').first()
    if not admin_user:
        admin_user = User(
            id=1,
            username='admin',
            email='admin@kanyamanan.ph',
            is_staff=True,
            is_superuser=True,
            is_active=True,
            password=ADMIN_PASSWORD_HASH
        )
        admin_user.save()
        print("  - Created Super Admin account (admin / admin123)")
    else:
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.is_active = True
        if admin_user.password != ADMIN_PASSWORD_HASH:
            admin_user.password = ADMIN_PASSWORD_HASH
            admin_user.save()

    # 2. Municipalities
    municipalities = [
        'Angeles City', 'Apalit', 'Arayat', 'Bacolor', 'Candaba',
        'City of San Fernando', 'Floridablanca', 'Guagua', 'Lubao',
        'Mabalacat City', 'Macabebe', 'Magalang', 'Masantol', 'Mexico',
        'Minalin', 'Porac', 'San Luis', 'San Simon', 'Santa Ana',
        'Santa Rita', 'Santo Tomas', 'Sasmuan'
    ]
    for m in municipalities:
        Municipality.objects.get_or_create(name=m)

    # 3. Load extracted 41 Restaurants & Menus & Branches
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'extracted_restaurants.json')
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            restaurants_data = json.load(f)

        used_usernames = set()
        for res_idx, r in enumerate(restaurants_data):
            if not isinstance(r, dict):
                continue
            res_id = r.get('id') or f"res-{res_idx}"
            raw_username = (r.get('username') or f"owner_{res_idx+1}").strip()
            username = raw_username
            if username in used_usernames:
                username = f"{raw_username}_{res_idx}"
            used_usernames.add(username)
            password = make_password(r.get('password') or 'password123')
            
            restaurant_obj, _ = Restaurant.objects.update_or_create(
                restaurant_id=res_id,
                defaults={
                    'name': r.get('name', 'Restaurant'),
                    'municipality': r.get('municipality', 'City of San Fernando'),
                    'operating_hours': r.get('operatingHours', '09:00 AM - 09:00 PM'),
                    'price_tier': r.get('priceTier', '$'),
                    'lat': r.get('lat', 15.0320),
                    'lng': r.get('lng', 120.6860),
                    'categories': r.get('categories', []),
                    'description': r.get('description', ''),
                    'address': r.get('address', ''),
                    'image': r.get('image', ''),
                    'images': r.get('images', []),
                    'facebook_url': r.get('facebookUrl', '') or r.get('facebook_url', ''),
                    'instagram_url': r.get('instagramUrl', '') or r.get('instagram_url', ''),
                    'tiktok_url': r.get('tiktokUrl', '') or r.get('tiktok_url', ''),
                    'phone_number': r.get('phoneNumber', '') or r.get('phone_number', ''),
                    'email': r.get('email', ''),
                    'reservation_info': r.get('reservationInfo', '') or r.get('reservation_info', ''),
                    'username': username,
                    'password': password,
                    'occupancy': r.get('occupancy', [])
                }
            )

            # Clear old seeded branches & menus before re-seeding to prevent duplicates
            restaurant_obj.branches.all().delete()
            restaurant_obj.menu.all().delete()

            # Seed branches if any
            branches = r.get('branches', [])
            if branches:
                for idx, b in enumerate(branches):
                    b_mun = b.get('municipality') or restaurant_obj.municipality
                    b_name = b.get('branchName') or f"{restaurant_obj.name} ({b_mun} Branch)"
                    Branch.objects.create(
                        restaurant=restaurant_obj,
                        branch_name=b_name,
                        municipality=b_mun,
                        address=b.get('address', restaurant_obj.address),
                        operating_hours=b.get('operatingHours', restaurant_obj.operating_hours),
                        lat=b.get('lat', restaurant_obj.lat),
                        lng=b.get('lng', restaurant_obj.lng),
                        facebook_url=b.get('facebookUrl', '') or b.get('facebook_url', '') or restaurant_obj.facebook_url,
                        instagram_url=b.get('instagramUrl', '') or b.get('instagram_url', '') or restaurant_obj.instagram_url,
                        tiktok_url=b.get('tiktokUrl', '') or b.get('tiktok_url', '') or restaurant_obj.tiktok_url,
                        phone_number=b.get('phoneNumber', '') or b.get('phone_number', '') or restaurant_obj.phone_number,
                        email=b.get('email', '') or restaurant_obj.email,
                        reservation_info=b.get('reservationInfo', '') or b.get('reservation_info', '') or restaurant_obj.reservation_info
                    )
            else:
                Branch.objects.create(
                    restaurant=restaurant_obj,
                    branch_name=f"{restaurant_obj.name} (Main Branch)",
                    municipality=restaurant_obj.municipality,
                    address=restaurant_obj.address,
                    operating_hours=restaurant_obj.operating_hours,
                    lat=restaurant_obj.lat,
                    lng=restaurant_obj.lng,
                    facebook_url=restaurant_obj.facebook_url,
                    instagram_url=restaurant_obj.instagram_url,
                    tiktok_url=restaurant_obj.tiktok_url,
                    phone_number=restaurant_obj.phone_number,
                    email=restaurant_obj.email,
                    reservation_info=restaurant_obj.reservation_info
                )

            # Seed menu items
            menu_items = r.get('menu', [])
            for m_idx, m in enumerate(menu_items):
                item_id = m.get('id') or f"{res_id}-item-{m_idx+1}"
                nutrition = m.get('nutrition', {})
                MenuItem.objects.update_or_create(
                    restaurant=restaurant_obj,
                    item_id=item_id,
                    defaults={
                        'name': m.get('name', 'Specialty Dish'),
                        'price': float(m.get('price', 100)),
                        'ingredients': m.get('ingredients', ''),
                        'allergens': m.get('allergens', ''),
                        'health_indicators': m.get('healthIndicators', ''),
                        'calories': int(nutrition.get('calories', 0) if isinstance(nutrition, dict) else 0),
                        'protein': int(nutrition.get('protein', 0) if isinstance(nutrition, dict) else 0),
                        'carbs': int(nutrition.get('carbs', 0) if isinstance(nutrition, dict) else 0),
                        'fat': int(nutrition.get('fat', 0) if isinstance(nutrition, dict) else 0)
                    }
                )

        print(f"  - Successfully seeded all {len(restaurants_data)} pre-seeded restaurants with menus & merchant accounts!")

    # 4. Tourist Accounts & Travel History (including 'rancis@gmail.com')
    tourist_accounts = [
        {'username': 'rancis', 'email': 'rancis@gmail.com', 'user_account_key': 'rancis_gmail_com'},
        {'username': 'rancis_pampanga_gov_ph', 'email': 'rancis@pampanga.gov.ph', 'user_account_key': 'rancis_pampanga_gov_ph'},
        {'username': 'maria_clara', 'email': 'maria@kanyamanan.ph', 'user_account_key': 'maria_clara'},
        {'username': 'juan_delacruz', 'email': 'juan@kanyamanan.ph', 'user_account_key': 'juan_delacruz'},
        {'username': 'guest_explorer', 'email': 'guest@kanyamanan.ph', 'user_account_key': 'guest_explorer'}
    ]

    for t in tourist_accounts:
        user_obj, _ = User.objects.get_or_create(
            username=t['username'],
            defaults={'email': t['email']}
        )
        if not user_obj.check_password('password123'):
            user_obj.set_password('password123')
            user_obj.save()

        TouristAccount.objects.get_or_create(
            username=t['username'],
            defaults={'email': t['email']}
        )
        print(f"  - Created/Updated Tourist Account: {t['username']} ({t['email']})")

    # Real Tourist Itineraries & Travel History
    itineraries_sample = [
        {
            'user_account_key': 'rancis_gmail_com',
            'itinerary_id': 'trail-rancis-gmail-1',
            'name': 'Rancis Pampanga Culinary Heritage Tour',
            'stops': ["Everybody's Cafe", "Aling Lucing's Sisig", "Kabigting's Halo-Halo"],
            'is_finished': True
        },
        {
            'user_account_key': 'rancis_gmail_com',
            'itinerary_id': 'trail-rancis-gmail-2',
            'name': 'San Fernando & Angeles Gourmet Expedition',
            'stops': ["Atching Lillian's Ancestral Kitchen", "Apung Oting's Heritage Restaurant"],
            'is_finished': False
        },
        {
            'user_account_key': 'rancis',
            'itinerary_id': 'trail-rancis-1',
            'name': 'Pampanga Heritage & Gourmet Expedition',
            'stops': ["Everybody's Cafe", "Aling Lucing's Sisig", "Kabigting's Halo-Halo"],
            'is_finished': True
        },
        {
            'user_account_key': 'maria_clara',
            'itinerary_id': 'trail-maria-1',
            'name': 'San Fernando Heritage Food Trail',
            'stops': ["Everybody's Cafe", "Santo Tomas Palayok Kitchen"],
            'is_finished': True
        },
        {
            'user_account_key': 'juan_delacruz',
            'itinerary_id': 'trail-juan-1',
            'name': 'Angeles City Authentic Sisig Hop',
            'stops': ["Aling Lucing's Sisig", "Atching Lillian's Ancestral Kitchen"],
            'is_finished': False
        },
        {
            'user_account_key': 'guest_explorer',
            'itinerary_id': 'trail-guest-1',
            'name': 'Pampanga Desserts & Halo-Halo Tour',
            'stops': ["Kabigting's Halo-Halo", "Apung Oting's Heritage Restaurant"],
            'is_finished': False
        }
    ]

    for itin in itineraries_sample:
        user_obj = User.objects.filter(username=itin['user_account_key']).first() or User.objects.filter(username='rancis').first()
        TouristItinerary.objects.get_or_create(
            user_account_key=itin['user_account_key'],
            itinerary_id=itin['itinerary_id'],
            defaults={
                'user': user_obj,
                'name': itin['name'],
                'stops': itin['stops'],
                'is_finished': itin['is_finished']
            }
        )
    print("  - Seeded Per-Account Tourist Itineraries & Travel History for rancis and other accounts")
    print("[+] Complete database seeding finished successfully!")

if __name__ == '__main__':
    seed()

