import os
import sys
import json
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kanyamanan_backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Municipality, Restaurant, Branch, MenuItem, ChangeRequest, TouristAccount, TouristItinerary

def seed():
    print("[+] Seeding Complete Kanyamanan Database...")

    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@kanyamanan.ph', 'admin123')
        print("  - Created Super Admin account (admin / admin123)")

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

        for res_idx, r in enumerate(restaurants_data):
            if not isinstance(r, dict):
                continue
            res_id = r.get('id') or f"res-{res_idx}"
            username = r.get('username') or f"owner_{res_idx+1}"
            password = r.get('password') or 'password123'
            
            restaurant_obj, created = Restaurant.objects.get_or_create(
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
                        lng=b.get('lng', restaurant_obj.lng)
                    )
            else:
                Branch.objects.create(
                    restaurant=restaurant_obj,
                    branch_name=f"{restaurant_obj.name} (Main Branch)",
                    municipality=restaurant_obj.municipality,
                    address=restaurant_obj.address,
                    operating_hours=restaurant_obj.operating_hours,
                    lat=restaurant_obj.lat,
                    lng=restaurant_obj.lng
                )

            # Seed menu items
            menu_items = r.get('menu', [])
            for m_idx, m in enumerate(menu_items):
                item_id = m.get('id') or f"{res_id}-item-{m_idx+1}"
                nutrition = m.get('nutrition', {})
                MenuItem.objects.get_or_create(
                    restaurant=restaurant_obj,
                    item_id=item_id,
                    defaults={
                        'name': m.get('name', 'Specialty Dish'),
                        'price': float(m.get('price', 100)),
                        'ingredients': m.get('ingredients', ''),
                        'allergens': m.get('allergens', ''),
                        'health_indicators': m.get('healthIndicators', ''),
                        'calories': int(nutrition.get('calories', 0)),
                        'protein': int(nutrition.get('protein', 0)),
                        'carbs': int(nutrition.get('carbs', 0)),
                        'fat': int(nutrition.get('fat', 0)),
                        'image': m.get('image', '')
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
