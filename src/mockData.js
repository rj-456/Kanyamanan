// High-Fidelity Pre-seeded Culinary Database for Pampanga (Kanyamanan Core)

export const TRAVEL_CORRIDORS = [
  { id: 'NLEX', name: 'NLEX Corridor', route: 'North Luzon Expressway' },
  { id: 'MacArthur', name: 'MacArthur Highway Line', route: 'MacArthur Highway' },
  { id: 'JASA', name: 'Jose Abad Santos Avenue (JASA) Line', route: 'Jose Abad Santos Avenue' }
];

export const MUNICIPALITIES = [
  'Angeles City',
  'Apalit',
  'Arayat',
  'Bacolor',
  'Candaba',
  'City of San Fernando',
  'Floridablanca',
  'Guagua',
  'Lubao',
  'Mabalacat City',
  'Macabebe',
  'Magalang',
  'Masantol',
  'Mexico',
  'Minalin',
  'Porac',
  'San Luis',
  'San Simon',
  'Santa Ana',
  'Santa Rita',
  'Santo Tomas',
  'Sasmuan'
];

export const PRESEEDED_RESTAURANTS = [
  {
    id: 'res-kabigtings-halo-halo',
    name: "Kabigting's Halo-Halo",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '08:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 15.1480,
    lng: 120.7690,
    categories: ['🍧 Halo-Halo & Desserts', '🏛️ Heritage Institution'],
    description: 'Iconic Kapampangan dessert institution famed for creamy halo-halo with carabao milk, pastillas, halo-halo beans, and native halo-halo sweet ingredients.',
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      { branchName: "Kabigting's Halo-Halo Arayat Main Branch", municipality: 'Arayat', address: 'Poblacion, Arayat, Pampanga', operatingHours: '08:00 AM - 08:00 PM', lat: 15.1480, lng: 120.7690 },
      { branchName: "Kabigting's Halo-Halo San Fernando Branch", municipality: 'City of San Fernando', address: 'MacArthur Highway, City of San Fernando, Pampanga', operatingHours: '09:00 AM - 08:00 PM', lat: 15.0320, lng: 120.6860 },
      { branchName: "Kabigting's Halo-Halo Floridablanca Branch", municipality: 'Floridablanca', address: 'National Highway, Floridablanca, Pampanga', operatingHours: '09:00 AM - 08:00 PM', lat: 14.9740, lng: 120.5290 }
    ],
    username: 'kabigtings_owner',
    password: 'password123',
    occupancy: [15, 30, 50, 80, 95, 90, 60, 40, 60, 80, 95, 75, 45, 20, 10],
    menu: [
      { id: 'kabigting-1', name: "Special Kabigting's Halo-Halo", price: 110, ingredients: 'Carabao milk, pastillas, sweet beans, halayang ube', allergens: 'Contains Dairy', healthIndicators: 'Moderate Calorie', nutrition: { calories: 340, protein: 8, carbs: 54, fat: 10 }, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
      { id: 'kabigting-2', name: 'Kapampangan Palabok', price: 120, ingredients: 'Rice noodles, shrimp sauce, crushed chicharon, boiled egg', allergens: 'Contains Eggs, Crustaceans', healthIndicators: 'High Protein', nutrition: { calories: 420, protein: 18, carbs: 48, fat: 16 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }
    ]
  },,
  {
    id: 'res-apung-otings-floridablanca',
    name: "Apung Oting's Heritage Restaurant",
    municipality: 'Floridablanca',
    corridor: 'Mount Arayat Line',
    operatingHours: '10:00 AM - 09:00 PM',
    priceTier: '$',
    lat: 14.9750,
    lng: 120.5310,
    categories: ['🏛️ Ancestral Kitchen', '🔥 Heritage Sisig'],
    description: 'Traditional Floridablanca ancestral kitchen celebrated for authentic heirloom Pork Sisig, Asadong Babi, and slow-cooked Bringhe.',
    address: 'Valdez, Floridablanca, Pampanga',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: "Apung Oting's Floridablanca Main", municipality: 'Floridablanca', address: 'Valdez, Floridablanca, Pampanga', operatingHours: '10:00 AM - 09:00 PM', lat: 14.9750, lng: 120.5310 }],
    username: 'apung_oting_owner',
    password: 'password123',
    occupancy: [10, 20, 45, 75, 90, 85, 55, 35, 55, 75, 90, 70, 40, 20, 10],
    menu: [
      { id: 'oting-1', name: "Apung Oting's Pork Sisig", price: 240, ingredients: 'Grilled pork snout, ears, calamansi, chili, onion', allergens: 'Contains Pork', healthIndicators: 'High Lipids', nutrition: { calories: 650, protein: 26, carbs: 6, fat: 58 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' },
      { id: 'oting-2', name: 'Asadong Babi Matua', price: 280, ingredients: 'Braised pork belly, kalamansi, tomatoes, soy reduction', allergens: 'Contains Pork, Soy', healthIndicators: 'Rich Flavor', nutrition: { calories: 590, protein: 30, carbs: 12, fat: 46 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'res-bariotik-kitchen-floridablanca',
    name: 'Bariotik Kitchen and Garden',
    municipality: 'Floridablanca',
    corridor: 'Mount Arayat Line',
    operatingHours: '10:00 AM - 08:30 PM',
    priceTier: '$',
    lat: 14.9780,
    lng: 120.5350,
    categories: ['🌿 Eco-Dining & Farm', '🍖 Buffet & Grill'],
    description: 'Scenic farm garden buffet destination offering unlimited Kapampangan fiesta spreads, grilled specialties, and refreshing farm juices.',
    address: 'Bariotik Garden, Floridablanca, Pampanga',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: 'Bariotik Kitchen Floridablanca Main', municipality: 'Floridablanca', address: 'Bariotik Garden, Floridablanca, Pampanga', operatingHours: '10:00 AM - 08:30 PM', lat: 14.9780, lng: 120.5350 }],
    username: 'bariotik_owner',
    password: 'password123',
    occupancy: [20, 35, 60, 85, 95, 90, 65, 40, 60, 85, 95, 80, 50, 25, 10],
    menu: [
      { id: 'bariotik-1', name: 'Bariotik Unlimited Heritage Buffet', price: 349, ingredients: 'Sisig, Lechon Kawali, Kare-Kare, Biringhe, Drinks', allergens: 'Contains Pork, Peanuts, Eggs', healthIndicators: 'Unlimited Feast', nutrition: { calories: 880, protein: 42, carbs: 65, fat: 50 }, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'res-bale-lubao',
    name: 'Bale Lubao Heritage Kitchen',
    municipality: 'Lubao',
    corridor: 'MacArthur Highway Line',
    operatingHours: '10:00 AM - 09:00 PM',
    priceTier: '$',
    lat: 14.9360,
    lng: 120.6010,
    categories: ['🏛️ Ancestral Kitchen', '🐟 Local Seafood'],
    description: 'Rustic heritage restaurant in Lubao serving signature Crispy Pata, Inihaw na Tilapia with Buro, and traditional Pancit Luglug.',
    address: 'San Nicolas 1st, Lubao, Pampanga',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: 'Bale Lubao Main Branch', municipality: 'Lubao', address: 'San Nicolas 1st, Lubao, Pampanga', operatingHours: '10:00 AM - 09:00 PM', lat: 14.9360, lng: 120.6010 }],
    username: 'balelubao_owner',
    password: 'password123',
    occupancy: [15, 25, 50, 80, 90, 85, 60, 40, 60, 80, 90, 75, 45, 20, 10],
    menu: [
      { id: 'balelubao-1', name: 'Bale Lubao Crispy Pata', price: 580, ingredients: 'Crispy deep fried pork knuckle, soy vinegar dip', allergens: 'Contains Pork, Soy', healthIndicators: 'High Lipids', nutrition: { calories: 920, protein: 55, carbs: 8, fat: 74 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
      { id: 'balelubao-2', name: 'Inihaw na Tilapia with Buru', price: 240, ingredients: 'Char-grilled tilapia fish, fermented rice fish paste, fresh veggies', allergens: 'Contains Fish', healthIndicators: 'High Protein', nutrition: { calories: 380, protein: 34, carbs: 14, fat: 18 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80' }
    ]
  },,
  {
    id: 'res-alviz-farm-santa-rita',
    name: 'Alviz Farm Heritage Kitchen & Experience',
    municipality: 'Santa Rita',
    corridor: 'MacArthur Highway Line',
    operatingHours: '09:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 15.0020,
    lng: 120.6140,
    categories: ['🌿 Eco-Dining & Farm', '🏛️ Heritage Institution'],
    description: 'Famous Santa Rita heritage farm offering interactive Suman & Barquillos making workshops and an authentic Kapampangan fiesta buffet feast.',
    address: 'San Agustin, Santa Rita, Pampanga',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: 'Alviz Farm Santa Rita Main', municipality: 'Santa Rita', address: 'San Agustin, Santa Rita, Pampanga', operatingHours: '09:00 AM - 08:00 PM', lat: 15.0020, lng: 120.6140 }],
    username: 'alvizfarm_owner',
    password: 'password123',
    occupancy: [20, 40, 65, 90, 95, 90, 65, 45, 65, 90, 95, 80, 50, 25, 10],
    menu: [
      { id: 'alviz-1', name: 'Buro Platter with Fried Hito', price: 350, ingredients: 'Fermented rice fish paste, fried catfish, fresh mustard leaves, eggplant', allergens: 'Contains Fish', healthIndicators: 'High Probiotics', nutrition: { calories: 420, protein: 32, carbs: 28, fat: 18 }, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80' },
      { id: 'alviz-2', name: 'Asadu Matua', price: 380, ingredients: 'Traditional braised pork belly, calamansi, tomatoes, spices', allergens: 'Contains Pork', healthIndicators: 'Rich Heirloom', nutrition: { calories: 640, protein: 34, carbs: 14, fat: 50 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
      { id: 'alviz-3', name: 'Suman with Suklati Batirol', price: 120, ingredients: 'Glutinous rice suman, rich cacao batirol hot chocolate', allergens: 'Contains Dairy', healthIndicators: 'Native Sweet', nutrition: { calories: 310, protein: 6, carbs: 48, fat: 10 }, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' }
    ]
  },,
  {
    id: 'res-fat-grille-santa-rita',
    name: 'Fat Grille Restaurant',
    municipality: 'Santa Rita',
    corridor: 'MacArthur Highway Line',
    operatingHours: '11:00 AM - 10:00 PM',
    priceTier: '$',
    lat: 15.0040,
    lng: 120.6170,
    categories: ['🍖 Barbecue & Grill', '🔥 Heritage Sisig'],
    description: 'Popular Santa Rita grill destination serving Crispy Pata, Crispy Ulo, Sizzling Sisig, and Lechon Kawali Kare-Kare.',
    address: 'San Vicente, Santa Rita, Pampanga',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: 'Fat Grille Santa Rita Main', municipality: 'Santa Rita', address: 'San Vicente, Santa Rita, Pampanga', operatingHours: '11:00 AM - 10:00 PM', lat: 15.0040, lng: 120.6170 }],
    username: 'fatgrille_owner',
    password: 'password123',
    occupancy: [15, 30, 55, 80, 95, 90, 65, 40, 65, 85, 95, 75, 45, 20, 10],
    menu: [
      { id: 'fatgrille-1', name: 'Fat Grille Crispy Pata', price: 598, ingredients: 'Crispy deep-fried pork knuckle with soy-vinegar garlic dip', allergens: 'Contains Pork, Soy', healthIndicators: 'High Lipids', nutrition: { calories: 950, protein: 58, carbs: 6, fat: 78 }, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
      { id: 'fatgrille-2', name: 'Sizzling Pork Sisig', price: 238, ingredients: 'Chopped pork mask, ear, liver, calamansi, chili, onion', allergens: 'Contains Pork', healthIndicators: 'High Lipids', nutrition: { calories: 660, protein: 28, carbs: 5, fat: 59 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }
    ]
  },
  {
    id: 'res-ernestos-santa-ana',
    name: "Ernesto's Kitchen & Bar",
    municipality: 'Santa Ana',
    corridor: 'Mount Arayat Line',
    operatingHours: '11:00 AM - 10:00 PM',
    priceTier: '$',
    lat: 15.0970,
    lng: 120.7690,
    categories: ['🏛️ Ancestral Kitchen', '🍖 Barbecue & Grill'],
    description: "Santa Ana's favorite dining kitchen famed for Ernesto's Signature Sisig, Sizzling Beef Tapa, and Crispy Pata.",
    address: 'San Joaquin, Santa Ana, Pampanga',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: "Ernesto's Kitchen Santa Ana Main", municipality: 'Santa Ana', address: 'San Joaquin, Santa Ana, Pampanga', operatingHours: '11:00 AM - 10:00 PM', lat: 15.0970, lng: 120.7690 }],
    username: 'ernestos_owner',
    password: 'password123',
    occupancy: [15, 25, 50, 75, 90, 85, 60, 35, 55, 75, 90, 70, 40, 20, 10],
    menu: [
      { id: 'ernesto-1', name: "Ernesto's Signature Sisig", price: 260, ingredients: 'Crispy pork mask, chicken liver, calamansi, native chili', allergens: 'Contains Pork', healthIndicators: 'High Lipids', nutrition: { calories: 640, protein: 27, carbs: 6, fat: 56 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }
    ]
  },,
  {
    id: 'res-bala-kayu-sasmuan',
    name: 'Bala Kayu Silogan Atbp.',
    municipality: 'Sasmuan',
    corridor: 'MacArthur Highway Line',
    operatingHours: '06:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 14.9390,
    lng: 120.6150,
    categories: ['🍚 Rice Bowls & Silog', '🏛️ Ancestral Kitchen'],
    description: 'Budget-friendly Sasmuan silogan serving Combisilog, Lechon Kawali Ala Carte, and Special Pork & Tuna Sisig.',
    address: 'San Nicolas 2nd, Sasmuan, Pampanga',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'],
    branches: [{ branchName: 'Bala Kayu Sasmuan Main', municipality: 'Sasmuan', address: 'San Nicolas 2nd, Sasmuan, Pampanga', operatingHours: '06:00 AM - 08:00 PM', lat: 14.9390, lng: 120.6150 }],
    username: 'balakayu_owner',
    password: 'password123',
    occupancy: [20, 40, 65, 85, 95, 80, 55, 35, 55, 80, 90, 70, 40, 20, 10],
    menu: [
      { id: 'balakayu-1', name: 'Combisilog (Tapa & Tosino)', price: 68, ingredients: 'Marinated beef tapa, sweet pork tocino, fried egg, garlic rice', allergens: 'Contains Pork, Eggs', healthIndicators: 'High Energy', nutrition: { calories: 520, protein: 24, carbs: 54, fat: 22 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' },
      { id: 'balakayu-2', name: 'Special Pork & Tuna Sisig', price: 120, ingredients: 'Sizzling pork and tuna flakes, calamansi, onions', allergens: 'Contains Pork, Fish', healthIndicators: 'High Protein', nutrition: { calories: 450, protein: 28, carbs: 8, fat: 34 }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80' }
    ]
  },,
{
  "id": "san-fernando-bale-capampangan",
  "name": "Bale Capampangan",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "10:00 AM - 09:00 PM",
  "priceTier": "$",
  "lat": 15.0298,
  "lng": 120.6902,
  "categories": [
    "🏛️ Ancestral Kitchen",
    "🪵 Wood-Fired Traditional"
  ],
  "branches": [
    {
        "branchName": "San Fernando Dolores Branch",
        "municipality": "City of San Fernando",
        "address": "Dolores, City of San Fernando, Pampanga",
        "lat": 15.0298,
        "lng": 120.6902,
        "operatingHours": "10:00 AM - 09:00 PM",
        "occupancy": [
            20,
            35,
            60,
            90,
            98,
            92,
            70,
            60,
            80,
            95,
            99,
            90,
            60,
            30,
            15
        ]
    },
    {
        "branchName": "Bacolor Megadike Branch",
        "municipality": "Bacolor",
        "address": "Megadike Access Road, Bacolor, Pampanga",
        "lat": 14.998,
        "lng": 120.645,
        "operatingHours": "10:00 AM - 09:00 PM",
        "occupancy": [
            15,
            30,
            50,
            85,
            95,
            85,
            65,
            55,
            75,
            90,
            95,
            80,
            50,
            25,
            10
        ]
    }
],
  "description": "Famous Kapampangan eat-all-you-can buffet and heritage restaurant serving authentic native Kapampangan fiesta specialties, carabao beef bistig damulag, adobo balot, and kilayin.",
  "occupancy": [
    20,
    35,
    60,
    90,
    98,
    92,
    70,
    60,
    80,
    95,
    99,
    90,
    60,
    30,
    15
  ],
  "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg",
  "images": [
    "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
  ],
  "address": "Dolores, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 626 5790",
  "contactEmail": "balecapampangan@gmail.com",
  "username": "balecapampangan",
  "password": "bale123",
  "branches": [
    {
      "municipality": "Bacolor",
      "address": "Megadike Access Road, Bacolor, Pampanga"
    }
  ],
  "menu": [
    {
      "id": "bc-buffet-lunch",
      "name": "All-You-Can-Eat Lunch Buffet (Adults)",
      "price": 599,
      "ingredients": "Unlimited access to 25+ native Kapampangan dishes, lechon kawali, sisig babi, kilayin, adobo balot, bistig damulag, desserts & drinks",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Beef, Poultry, Eggs, Shellfish, and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Diverse Traditional Heritage Buffet Feast.",
      "nutrition": {
        "calories": 1250,
        "protein": 65,
        "carbs": 110,
        "fat": 58
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-buffet-dinner",
      "name": "All-You-Can-Eat Dinner Promo (Adults & Kids)",
      "price": 399,
      "ingredients": "Special evening promo buffet with unlimited native dishes, pork sisig, kare-kare, and dessert bar (4PM-8PM)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Peanuts, and Eggs.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Budget Friendly Evening Heritage Buffet.",
      "nutrition": {
        "calories": 1100,
        "protein": 55,
        "carbs": 95,
        "fat": 50
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-bistig-damulag",
      "name": "Bistig Damulag (Carabao Beef Steak)",
      "price": 395,
      "ingredients": "Tender native carabao beef marinated in calamansi lime, soy sauce, garlic, and caramelized white onions",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Carabao Beef and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Lean Protein, Iron Rich Heritage Special.",
      "nutrition": {
        "calories": 480,
        "protein": 45,
        "carbs": 12,
        "fat": 26
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-adobo-balot",
      "name": "Adobo Balot",
      "price": 385,
      "ingredients": "Fertilized duck eggs simmered in rich Kapampangan adobo garlic vinegar sauce and toasted garlic chips",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Duck Eggs and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Ultra High Protein & Calcium.",
      "nutrition": {
        "calories": 410,
        "protein": 32,
        "carbs": 8,
        "fat": 28
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-kilayin-babi",
      "name": "Kilayin Babi",
      "price": 365,
      "ingredients": "Traditional Kapampangan pork meat and liver stewed in natural vinegar, garlic, black peppercorns, and lard",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork and Liver (Purines).",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Iron, Low Sugar Heritage Stew.",
      "nutrition": {
        "calories": 520,
        "protein": 38,
        "carbs": 6,
        "fat": 36
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-sisig-babi",
      "name": "Sisig Babi (Kapampangan Pork Sisig)",
      "price": 365,
      "ingredients": "Charcoal-grilled pig ears and belly, onions, calamansi, green chili peppers",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat & Cholesterol.",
      "nutrition": {
        "calories": 680,
        "protein": 36,
        "carbs": 5,
        "fat": 56
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    },
    {
      "id": "bc-kare-kare",
      "name": "Kare-Kare Baka",
      "price": 395,
      "ingredients": "Tender beef shank and tripe cooked in rich peanut sauce, banana blossoms, eggplant, string beans, bagoong alamang",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Peanuts, Beef, and Crustaceans (Bagoong).",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: Rich Caloric Content & Nut Fats.",
      "nutrition": {
        "calories": 750,
        "protein": 42,
        "carbs": 18,
        "fat": 55
      },
      "image": "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
    }
  ]
},
{
  "id": "san-fernando-bubusuk-goto-anne",
  "name": "Bubusuk (Goto Anne Corner)",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "08:00 AM - 10:00 PM",
  "priceTier": "$",
  "lat": 15.034,
  "lng": 120.684,
  "categories": [
    "🪵 Wood-Fired Traditional",
    "🔥 Comfort Lugawan"
  ],
  "description": "Popular San Fernando comfort food hub famous for Special Goto Overload, sizzling bulalo steak, beef pares, and affordable fiesta reservation packages.",
  "occupancy": [
    15,
    20,
    35,
    70,
    85,
    75,
    55,
    60,
    75,
    85,
    90,
    75,
    45,
    20,
    10
  ],
  "image": "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg",
  "images": [
    "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
  ],
  "address": "Dolores, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 961 1701",
  "contactEmail": "bubusukgotoanne@gmail.com",
  "username": "bubusuk",
  "password": "bubusuk123",
  "menu": [
    {
      "id": "bub-goto-overload",
      "name": "Special Goto Overload (Goto Anne)",
      "price": 120,
      "ingredients": "Hot rice porridge, ox tripe, chicharon cracklings, hard-boiled egg, toasted garlic, scallions",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef Offal, Pork (Chicharon), and Egg.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Comforting Warm Rice Porridge.",
      "nutrition": {
        "calories": 410,
        "protein": 24,
        "carbs": 48,
        "fat": 14
      },
      "image": "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
    },
    {
      "id": "bub-bulalo-steak",
      "name": "Sizzling Bulalo Steak",
      "price": 280,
      "ingredients": "Beef shank cutlet served on hot sizzling plate with garlic butter gravy and mushroom peppers",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef, Soy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat & Caloric Content.",
      "nutrition": {
        "calories": 720,
        "protein": 48,
        "carbs": 12,
        "fat": 52
      },
      "image": "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
    },
    {
      "id": "bub-beef-pares",
      "name": "Beef Pares Special",
      "price": 150,
      "ingredients": "Tender braised beef brisket simmered in sweet anise soy broth, garlic fried rice, clear beef soup",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Protein Energy Meal.",
      "nutrition": {
        "calories": 580,
        "protein": 36,
        "carbs": 65,
        "fat": 18
      },
      "image": "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
    },
    {
      "id": "bub-pkg-a",
      "name": "Reservation Package A (Per Pax)",
      "price": 265,
      "ingredients": "Sizzling chicken, pork sisig, sweet & sour fish fillet, fried veggie lumpia, pancit guisado, rice, iced tea, buko pandan",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Fish, Soy, Gluten, and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Complete Feast Course Package.",
      "nutrition": {
        "calories": 980,
        "protein": 48,
        "carbs": 110,
        "fat": 38
      },
      "image": "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
    }
  ]
},
{
  "id": "san-fernando-holidayland",
  "name": "Holidayland Restaurant",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "10:00 AM - 10:00 PM",
  "priceTier": "$",
  "lat": 15.036,
  "lng": 120.688,
  "categories": [
    "🏛️ Ancestral Kitchen",
    "🌿 Farm-to-Table"
  ],
  "description": "Historic San Fernando grand buffet venue offering unlimited Kapampangan feast spread including pork sisig, lechon kawali, bringhe, bbq ribs, and halo-halo bar.",
  "occupancy": [
    25,
    40,
    65,
    95,
    99,
    90,
    75,
    65,
    80,
    95,
    99,
    90,
    60,
    35,
    20
  ],
  "image": "/restaurants/san_fernando/Holidayland buffet pricing (just search for typical menu).jpg",
  "images": [
    "/restaurants/san_fernando/Holidayland buffet pricing (just search for typical menu).jpg"
  ],
  "address": "Jose Abad Santos Ave, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 961 2345",
  "contactEmail": "holidaylandpampanga@gmail.com",
  "username": "holidayland",
  "password": "holiday123",
  "menu": [
    {
      "id": "hol-unli-weekday",
      "name": "Weekday Walk-in Unli Buffet (Mon-Thu)",
      "price": 328,
      "ingredients": "Unlimited Kapampangan feast spread: pork sisig, lechon kawali, bringhe, chopsuey, BBQ ribs, soup & halo-halo bar",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Eggs, Soy, Peanuts, and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Complete Value Heritage Unli Buffet.",
      "nutrition": {
        "calories": 1150,
        "protein": 58,
        "carbs": 105,
        "fat": 54
      },
      "image": "/restaurants/san_fernando/Holidayland buffet pricing (just search for typical menu).jpg"
    },
    {
      "id": "hol-unli-weekend",
      "name": "Weekend & Holiday Unli Buffet (Fri-Sun)",
      "price": 348,
      "ingredients": "Grand weekend unlimited buffet spread featuring roasted meats, seafood specials, bringhe, and dessert station",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Seafood, Eggs, Soy, and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Weekend Celebration Feast Spread.",
      "nutrition": {
        "calories": 1200,
        "protein": 62,
        "carbs": 112,
        "fat": 58
      },
      "image": "/restaurants/san_fernando/Holidayland buffet pricing (just search for typical menu).jpg"
    }
  ]
},
{
  "id": "san-fernando-lola-ima",
  "name": "Lola Ima Buffet & Catering",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "10:30 AM - 09:00 PM",
  "priceTier": "$",
  "lat": 15.038,
  "lng": 120.6855,
  "categories": [
    "🏛️ Ancestral Kitchen"
  ],
  "description": "Traditional Kapampangan buffet serving heritage stews, batchoy, ginataang kuhol snails, adobong balot, biringhe sticky rice, and house desserts.",
  "occupancy": [
    15,
    30,
    55,
    85,
    95,
    85,
    65,
    55,
    75,
    90,
    95,
    80,
    50,
    25,
    10
  ],
  "image": "/restaurants/san_fernando/Lola Ima buffet.jpg LUNCH BUFFET for only P315 DINNER BUFFET for only P349   KIDS (4-7 y_o) - P175.jpg",
  "images": [
    "/restaurants/san_fernando/Lola Ima buffet.jpg LUNCH BUFFET for only P315 DINNER BUFFET for only P349   KIDS (4-7 y_o) - P175.jpg"
  ],
  "address": "MacArthur Highway, Dolores, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 455 1234",
  "contactEmail": "lolaimabuffet@gmail.com",
  "username": "lolaima",
  "password": "lolaima123",
  "menu": [
    {
      "id": "li-lunch-buffet",
      "name": "Lola Ima Lunch Buffet Special",
      "price": 315,
      "ingredients": "Unlimited batchoy, corn soup, fish fillet, ginataang kuhol snails, pork kare-kare, pititchan chicharon, kaldereta ribs, rice, desserts & drinks",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Snails/Shellfish, Peanuts, and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Authentic Ancestral Kapampangan Buffet.",
      "nutrition": {
        "calories": 1080,
        "protein": 52,
        "carbs": 98,
        "fat": 50
      },
      "image": "/restaurants/san_fernando/Lola Ima buffet.jpg LUNCH BUFFET for only P315 DINNER BUFFET for only P349   KIDS (4-7 y_o) - P175.jpg"
    },
    {
      "id": "li-dinner-buffet",
      "name": "Lola Ima Dinner Buffet Special",
      "price": 349,
      "ingredients": "Unlimited pork sisig, biringhe sticky rice, adobong balot, pork lengua, horno baked roast, sampelut, lelut mais, drinks",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Duck Eggs, Soy, and Glutinous Rice.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Premium Heritage Dinner Buffet Selection.",
      "nutrition": {
        "calories": 1180,
        "protein": 58,
        "carbs": 108,
        "fat": 56
      },
      "image": "/restaurants/san_fernando/Lola Ima buffet.jpg LUNCH BUFFET for only P315 DINNER BUFFET for only P349   KIDS (4-7 y_o) - P175.jpg"
    }
  ]
},
{
  "id": "san-fernando-pipanganan",
  "name": "Pipanganan Capampangan Restaurant & Catering",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "09:00 AM - 09:00 PM",
  "priceTier": "$",
  "lat": 15.031,
  "lng": 120.682,
  "categories": [
    "🏛️ Ancestral Kitchen",
    "🌿 Farm-to-Table"
  ],
  "description": "Renowned San Fernando catering and dining kitchen specializing in roast beef, pastel de lengua, prawn thermidor, grilled salmon steak, and gourmet party trays.",
  "occupancy": [
    10,
    25,
    45,
    80,
    90,
    80,
    60,
    50,
    70,
    85,
    90,
    75,
    40,
    20,
    10
  ],
  "image": "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg",
  "images": [
    "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg"
  ],
  "address": "San Agustin, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 963 8888",
  "contactEmail": "pipanganan.catering@gmail.com",
  "username": "pipanganan",
  "password": "pipanganan123",
  "menu": [
    {
      "id": "pip-roast-beef",
      "name": "Slow Roasted Beef Tray (10 pax)",
      "price": 1200,
      "ingredients": "Tender slow-roasted beef brisket, rich brown mushroom gravy, caramelized onions",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef and Gluten.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Premium High Protein Catering Special.",
      "nutrition": {
        "calories": 620,
        "protein": 48,
        "carbs": 10,
        "fat": 42
      },
      "image": "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg"
    },
    {
      "id": "pip-prawn-thermidor",
      "name": "Prawn Thermidor Tray (10 pax)",
      "price": 1300,
      "ingredients": "Fresh prawns baked in rich cream sauce, white wine, garlic, and melted cheese",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Crustaceans (Prawns) and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Gourmet Seafood Specialty.",
      "nutrition": {
        "calories": 540,
        "protein": 42,
        "carbs": 8,
        "fat": 36
      },
      "image": "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg"
    },
    {
      "id": "pip-salmon-steak",
      "name": "Grilled Salmon Steak Tray (10 pax)",
      "price": 1500,
      "ingredients": "Fresh salmon fillets grilled with lemon butter garlic glaze and herbs",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Fish and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Cardioprotective Omega-3 Fatty Acids.",
      "nutrition": {
        "calories": 480,
        "protein": 44,
        "carbs": 4,
        "fat": 32
      },
      "image": "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg"
    }
  ]
},
{
  "id": "san-fernando-souq",
  "name": "SOUQ Pampanga",
  "username": "souqpampanga",
  "password": "souq123",
  "municipality": "City of San Fernando",
  "branches": [
    { "municipality": "City of San Fernando", "address": "Lazatin Blvd, Dolores, City of San Fernando, Pampanga" },
    { "municipality": "Mexico", "address": "Jose Abad Santos Ave, Parian, Mexico, Pampanga" }
  ],
  "name": "SOUQ Pampanga",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "11:00 AM - 10:00 PM",
  "priceTier": "$$",
  "lat": 15.0355,
  "lng": 120.6895,
  "categories": [
    "🏛️ Ancestral Kitchen",
    "🌿 Farm-to-Table"
  ],
  "description": "Rustic-chic fusion dining destination in San Fernando famous for Pasta sa Taba ng Alimango, Crispy Liempo Kare-Kare, Pizza Negra, and artisanal Buko Pie.",
  "occupancy": [
    20,
    35,
    60,
    90,
    98,
    95,
    75,
    65,
    80,
    95,
    99,
    90,
    60,
    35,
    20
  ],
  "image": "/restaurants/san_fernando/Souq Pampanga Menu.jpg",
  "images": [
    "/restaurants/san_fernando/Souq Pampanga Menu.jpg"
  ],
  "address": "Lazatin Blvd, Dolores, City of San Fernando, Pampanga",
  "contactPhone": "+63 925 827 2730",
  "contactEmail": "souqpampanga@gmail.com",
  "username": "souqpampanga",
  "password": "souq123",
  "menu": [
    {
      "id": "souq-pasta-crab",
      "name": "Pasta sa Taba ng Alimango",
      "price": 290,
      "ingredients": "Al dente fettuccine tossed in rich Kapampangan crab fat (taba ng alimango), garlic, calamansi juice, and crispy chicharon",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Crustaceans (Crab Fat), Gluten, and Pork.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Cholesterol Crab Fat. Rich Flavor Profile.",
      "nutrition": {
        "calories": 680,
        "protein": 22,
        "carbs": 64,
        "fat": 38
      },
      "image": "/restaurants/san_fernando/Souq Pampanga Menu.jpg"
    },
    {
      "id": "souq-liempo-karekare",
      "name": "Crispy Liempo Kare-Kare",
      "price": 490,
      "ingredients": "Crispy deep-fried pork belly served over creamy roasted peanut sauce, eggplant, string beans, and homemade bagoong",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Peanuts, Pork, and Crustaceans (Bagoong).",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Caloric Nut Fats & Pork Belly.",
      "nutrition": {
        "calories": 880,
        "protein": 46,
        "carbs": 22,
        "fat": 68
      },
      "image": "/restaurants/san_fernando/Souq Pampanga Menu.jpg"
    },
    {
      "id": "souq-pizza-negra",
      "name": "Pizza Negra",
      "price": 490,
      "ingredients": "Artisanal squid-ink black pizza crust, mozzarella cheese, sautéed squid, garlic, and olive oil glaze",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Mollusks (Squid Ink), Gluten, and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Unique Gourmet Seafood Pizza.",
      "nutrition": {
        "calories": 720,
        "protein": 34,
        "carbs": 75,
        "fat": 30
      },
      "image": "/restaurants/san_fernando/Souq Pampanga Menu.jpg"
    },
    {
      "id": "souq-buko-pie",
      "name": "Fresh Artisanal Buko Pie (Medium)",
      "price": 190,
      "ingredients": "Flaky baked pastry crust filled with soft young coconut meat and cream custard",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Coconut, Gluten, Dairy, and Eggs.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Traditional Fresh Coconut Dessert.",
      "nutrition": {
        "calories": 340,
        "protein": 5,
        "carbs": 42,
        "fat": 17
      },
      "image": "/restaurants/san_fernando/Souq Pampanga Menu.jpg"
    }
  ]
},
{
  "id": "san-fernando-susies-cuisine",
  "name": "Susie's Cuisine",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "07:00 AM - 08:00 PM",
  "priceTier": "$",
  "lat": 15.0325,
  "lng": 120.685,
  "categories": [
    "🏛️ Ancestral Kitchen"
  ],
  "branches": [
    {
        "branchName": "San Fernando Main Branch",
        "municipality": "City of San Fernando",
        "address": "McArthur Highway, San Fernando, Pampanga",
        "lat": 15.0325,
        "lng": 120.685,
        "operatingHours": "07:00 AM - 08:00 PM",
        "occupancy": [
            30,
            45,
            70,
            95,
            99,
            90,
            75,
            70,
            85,
            95,
            98,
            85,
            55,
            30,
            15
        ]
    },
    {
        "branchName": "Angeles Nepo Mart Branch",
        "municipality": "Angeles City",
        "address": "Nepo Mart Complex, Angeles City, Pampanga",
        "lat": 15.1378,
        "lng": 120.5902,
        "operatingHours": "07:00 AM - 08:00 PM",
        "occupancy": [
            25,
            40,
            65,
            90,
            95,
            85,
            70,
            65,
            80,
            90,
            95,
            80,
            50,
            25,
            10
        ]
    },
    {
        "branchName": "Mabalacat Dau Branch",
        "municipality": "Mabalacat",
        "address": "Dau Highway, Mabalacat, Pampanga",
        "lat": 15.1785,
        "lng": 120.589,
        "operatingHours": "07:00 AM - 08:00 PM",
        "occupancy": [
            20,
            35,
            60,
            85,
            90,
            80,
            65,
            60,
            75,
            85,
            90,
            75,
            45,
            20,
            10
        ]
    }
],
  "description": "The Best in Kapangan Kapampangan since 1972. Home of the famous Pancit Palabok, Tibok-Tibok carabao milk pudding, Moche, Mami, and authentic native kakanin.",
  "occupancy": [
    30,
    45,
    70,
    95,
    99,
    90,
    75,
    70,
    85,
    95,
    98,
    85,
    55,
    30,
    15
  ],
  "image": "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg",
  "images": [
    "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
  ],
  "address": "McArthur Highway, San Fernando, Pampanga",
  "contactPhone": "+63 45 961 2222",
  "contactEmail": "susiescuisine.ph@gmail.com",
  "username": "susiescuisine",
  "password": "susies123",
  "branches": [
    {
      "municipality": "Angeles City",
      "address": "Nepo Mart, Angeles City, Pampanga"
    },
    {
      "municipality": "Mabalacat City",
      "address": "Dau Highway, Mabalacat, Pampanga"
    }
  ],
  "menu": [
    {
      "id": "susie-palabok",
      "name": "Signature Pancit Palabok (Solo)",
      "price": 120,
      "ingredients": "Rice noodles topped with thick yellow garlic shrimp sauce, crushed chicharon, hard-boiled egg, tinapa flakes, calamansi",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Shellfish/Shrimp, Eggs, Pork (Chicharon), and Fish.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Iconic Kapampangan Heritage Noodle.",
      "nutrition": {
        "calories": 450,
        "protein": 18,
        "carbs": 62,
        "fat": 14
      },
      "image": "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
    },
    {
      "id": "susie-tibok-tibok",
      "name": "Tibok-Tibok (Carabao Milk Pudding)",
      "price": 30,
      "ingredients": "Pure fresh carabao milk, cornstarch, sugar, topped with aromatic toasted latik coconut curds",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pure Carabao Milk (Lactose) and Coconut.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Calcium, Authentic Carabao Milk Sweet.",
      "nutrition": {
        "calories": 180,
        "protein": 6,
        "carbs": 22,
        "fat": 8
      },
      "image": "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
    },
    {
      "id": "susie-moche",
      "name": "Moche in Coconut Milk (5 pcs)",
      "price": 50,
      "ingredients": "Glutinous rice dumplings filled with sweet mung bean paste, served warm in thick coconut milk sauce",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Coconut and Legumes (Mung Bean).",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Traditional Ancestral Kakanin Dessert.",
      "nutrition": {
        "calories": 240,
        "protein": 5,
        "carbs": 44,
        "fat": 6
      },
      "image": "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
    },
    {
      "id": "susie-halo-halo",
      "name": "Special Kapampangan Halo-Halo",
      "price": 110,
      "ingredients": "Fine shaved ice, carabao milk, leche flan, sweet beans, macapuno, ube, sago, pinipig",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Dairy (Milk, Flan) and Coconut.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Famous Refreshing Dessert.",
      "nutrition": {
        "calories": 360,
        "protein": 8,
        "carbs": 65,
        "fat": 9
      },
      "image": "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
    }
  ]
},
{
  "id": "san-fernando-imang-nene",
  "name": "Imang Nene Kapampangan Cuisine",
  "municipality": "City of San Fernando",
  "corridor": "MacArthur Highway Line",
  "operatingHours": "08:00 AM - 09:00 PM",
  "priceTier": "$",
  "lat": 15.037,
  "lng": 120.6835,
  "categories": [
    "🏛️ Ancestral Kitchen"
  ],
  "description": "Authentic home-style Kapampangan heirloom cooking famous for Begukan Lechon Kawali, Sisig Carbonara, Lagat Pusu banana blossom, Aligue Pasta, and food trays.",
  "occupancy": [
    15,
    25,
    50,
    80,
    90,
    85,
    65,
    55,
    75,
    85,
    90,
    75,
    45,
    20,
    10
  ],
  "image": "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu1.jpg",
  "images": [
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu1.jpg",
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu2.jpg",
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu3.jpg"
  ],
  "address": "Dolores, City of San Fernando, Pampanga",
  "contactPhone": "+63 45 435 9424",
  "contactEmail": "imangnenecuisine@gmail.com",
  "username": "imangnene",
  "password": "imang123",
  "menu": [
    {
      "id": "in-begukan-liempo",
      "name": "Begukan Lechon Kawali",
      "price": 295,
      "ingredients": "Crispy fried pork belly sautéed in rich fermented shrimp bagoong, eggplant slices, and green chilis",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Crustaceans (Bagoong) and Pork.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat & Sodium Bagoong.",
      "nutrition": {
        "calories": 710,
        "protein": 38,
        "carbs": 8,
        "fat": 58
      },
      "image": "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu2.jpg"
    },
    {
      "id": "in-sisig-carbonara",
      "name": "Sisig Carbonara",
      "price": 220,
      "ingredients": "Creamy fettuccine pasta topped with crispy sizzled Kapampangan pork sisig and toasted parmesan",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Dairy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Calorie Fusion Pasta.",
      "nutrition": {
        "calories": 690,
        "protein": 28,
        "carbs": 58,
        "fat": 38
      },
      "image": "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu3.jpg"
    },
    {
      "id": "in-lagat-pusu",
      "name": "Lagat Pusu (Banana Blossom Stew)",
      "price": 210,
      "ingredients": "Fresh shredded banana blossoms stewed in natural cane vinegar, garlic, onions, and ground pork",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Dietary Fiber & Natural Vinegar Digestion.",
      "nutrition": {
        "calories": 280,
        "protein": 14,
        "carbs": 22,
        "fat": 16
      },
      "image": "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu3.jpg"
    },
    {
      "id": "in-aligue-pasta",
      "name": "Aligue Pasta with Prawns",
      "price": 240,
      "ingredients": "Spaghetti noodles sautéed in fresh crab fat aligue, garlic, butter, and fresh prawns",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Shellfish/Crustaceans (Crab Fat, Prawns), Dairy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Cholesterol Seafood Pasta.",
      "nutrition": {
        "calories": 640,
        "protein": 26,
        "carbs": 55,
        "fat": 34
      },
      "image": "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu3.jpg"
    }
  ]
},
{
  "id": "candaba-b-farm-cafe",
  "name": "B Farm Cafe By Alexa's Kitchen",
  "municipality": "Candaba",
  "corridor": "NLEX Corridor",
  "operatingHours": "09:00 AM - 09:00 PM",
  "priceTier": "$",
  "lat": 15.0935,
  "lng": 120.8268,
  "categories": [
    "🏛️ Ancestral Kitchen",
    "🌿 Farm-to-Table"
  ],
  "description": "Scenic Candaba garden farm cafe famous for traditional Kapampangan feast set meals, Serkele bloodless pork offal stew, liempo kare-kare, and fresh buttered garlic prawns.",
  "occupancy": [
    15,
    25,
    40,
    75,
    90,
    85,
    60,
    50,
    70,
    85,
    95,
    80,
    50,
    25,
    10
  ],
  "image": "/restaurants/candaba/b_farm_menu1.jpg",
  "images": [
    "/restaurants/candaba/b_farm_menu1.jpg",
    "/restaurants/candaba/b_farm_menu2.jpg"
  ],
  "address": "Poblacion, Candaba, Pampanga",
  "contactPhone": "+63 917 890 1234",
  "contactEmail": "bfarmcafe@candaba.ph",
  "menu": [
    {
      "id": "bfarm-set1",
      "name": "Set Meal 1 (Pansit Bihon, Chicken Basket, Shanghai, Rice, Iced Tea)",
      "price": 958,
      "ingredients": "Pansit bihon noodles, deep-fried chicken, pork lumpia shanghai, steamed rice, iced tea (Serves 3-5 pax)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Soy, Gluten, Pork, and Eggs.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Balanced Family Feast, High Protein.",
      "nutrition": {
        "calories": 1450,
        "protein": 65,
        "carbs": 140,
        "fat": 58
      },
      "image": "/restaurants/candaba/b_farm_menu1.jpg"
    },
    {
      "id": "bfarm-set2",
      "name": "Set Meal 2 (Pansit Canton, Chicken Basket, Sisig Tofu, Rice, Iced Tea)",
      "price": 958,
      "ingredients": "Pansit canton noodles, crispy fried chicken, sizzling sisig tofu, steamed rice, iced tea (Serves 3-5 pax)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Soy, Tofu, Gluten, and Eggs.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Low-Fat Tofu Protein Option Included.",
      "nutrition": {
        "calories": 1380,
        "protein": 60,
        "carbs": 135,
        "fat": 52
      },
      "image": "/restaurants/candaba/b_farm_menu1.jpg"
    },
    {
      "id": "bfarm-set3",
      "name": "Set Meal 3 (Pansit Canton, Chicken, Pork Sisig, Shanghai, Rice, Iced Tea)",
      "price": 1588,
      "ingredients": "Pansit canton, fried chicken basket, sizzling pork sisig, lumpia shanghai, steamed rice, iced tea (Serves 4-6 pax)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Soy, Gluten, and Eggs.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat and Sodium.",
      "nutrition": {
        "calories": 1850,
        "protein": 85,
        "carbs": 165,
        "fat": 82
      },
      "image": "/restaurants/candaba/b_farm_menu1.jpg"
    },
    {
      "id": "bfarm-set4",
      "name": "Set Meal 4 (Liempo Kare-Kare, Pansit, Chicken, Sisig, 12pcs BBQ, 1.5L Coke)",
      "price": 1988,
      "ingredients": "Crispy liempo kare-kare in peanut sauce, pansit canton, chicken basket, pork sisig, 12pcs pork BBQ, rice, Coke (Serves 6-8 pax)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Peanuts, Pork, Soy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: Rich Peanut Sauce & High Calorie Feast.",
      "nutrition": {
        "calories": 2450,
        "protein": 110,
        "carbs": 210,
        "fat": 115
      },
      "image": "/restaurants/candaba/b_farm_menu1.jpg"
    },
    {
      "id": "bfarm-set5",
      "name": "Set Meal 5 (3 Serkele, Pansit Bihon, 2 Chicken, Pinakbet, Sinigang, 12pcs BBQ, Coke)",
      "price": 2989,
      "ingredients": "Candaba Serkele bloodless pork stew, pansit bihon, 2 chicken baskets, pinakbet veggies, sinigang broth, 12pcs BBQ, rice (Serves 8-10 pax)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Soy, Gluten, and Shrimp paste.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Authentic Ancestral Stew & Fiber-Rich Pinakbet.",
      "nutrition": {
        "calories": 3100,
        "protein": 145,
        "carbs": 280,
        "fat": 135
      },
      "image": "/restaurants/candaba/b_farm_menu2.jpg"
    },
    {
      "id": "bfarm-serkele",
      "name": "Candaba Serkele (Bloodless Pork Offal Stew)",
      "price": 240,
      "ingredients": "Authentic Candaba heritage bloodless pork internal organs, green chili peppers, garlic, onion, local vinegar",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork Offal & Purines.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Iron, Low Sugar, Traditional Heritage Recipe.",
      "nutrition": {
        "calories": 420,
        "protein": 34,
        "carbs": 6,
        "fat": 28
      },
      "image": "/restaurants/candaba/b_farm_menu2.jpg"
    },
    {
      "id": "bfarm-karekare",
      "name": "Liempo Kare-Kare",
      "price": 380,
      "ingredients": "Crispy deep-fried pork liempo, roasted ground peanuts, banana blossoms, eggplant, string beans, bagoong alamang",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Peanuts, Crustaceans (Bagoong), and Pork.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: Rich Caloric Content & Nut Fats.",
      "nutrition": {
        "calories": 780,
        "protein": 42,
        "carbs": 18,
        "fat": 58
      },
      "image": "/restaurants/candaba/b_farm_menu2.jpg"
    },
    {
      "id": "bfarm-prawns",
      "name": "Buttered Garlic Prawns",
      "price": 420,
      "ingredients": "Fresh Candaba freshwater prawns, butter, minced garlic, parsley, lemon juice",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Shellfish/Crustaceans (Prawns) and Dairy (Butter).",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Protein, Low Carbohydrates, Rich Omega-3.",
      "nutrition": {
        "calories": 390,
        "protein": 36,
        "carbs": 4,
        "fat": 25
      },
      "image": "/restaurants/candaba/b_farm_menu2.jpg"
    }
  ]
},
{
  "id": "candaba-ver-rea-steak",
  "name": "Ver & Rea Sizzling Steak House",
  "municipality": "Candaba",
  "corridor": "NLEX Corridor",
  "operatingHours": "10:00 AM - 10:00 PM",
  "priceTier": "$",
  "lat": 15.0945,
  "lng": 120.828,
  "categories": [
    "🪵 Wood-Fired Traditional",
    "🔥 Sizzling Steakhouse"
  ],
  "description": "Popular Candaba sizzling steakhouse famous for Unlimited Rice & Unlimited Gravy, sizzling T-bone steak, porterhouse, kalderetang itik native duck stew, and fresh buko halo-halo.",
  "occupancy": [
    20,
    30,
    50,
    80,
    95,
    90,
    70,
    60,
    75,
    90,
    98,
    85,
    55,
    30,
    15
  ],
  "image": "/restaurants/candaba/ver_rea_menu.jpg",
  "images": [
    "/restaurants/candaba/ver_rea_menu.jpg"
  ],
  "address": "Macabebe-Candaba Road, Candaba, Pampanga",
  "contactPhone": "+63 918 234 5678",
  "contactEmail": "verandreasteak@candaba.ph",
  "menu": [
    {
      "id": "vr-tbone",
      "name": "S1: Sizzling T-Bone Steak (Unli Rice & Gravy)",
      "price": 179,
      "ingredients": "Sizzling grilled T-bone beef steak, savory house mushroom gravy, garlic corn butter, unlimited steamed rice",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef. Gravy contains Gluten and Dairy.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Protein, High Sodium & Saturated Fat.",
      "nutrition": {
        "calories": 720,
        "protein": 48,
        "carbs": 55,
        "fat": 38
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-porksteak",
      "name": "S2: Sizzling Pork Steak (Unli Rice & Gravy)",
      "price": 139,
      "ingredients": "Grilled pork steak chop, savory brown gravy, garlic rice",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork, Gluten, and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Budget High Protein Sizzling Meal.",
      "nutrition": {
        "calories": 640,
        "protein": 42,
        "carbs": 55,
        "fat": 30
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-porter",
      "name": "S3: Porter Steak (Porterhouse Steak Unli Rice)",
      "price": 199,
      "ingredients": "Premium thick porterhouse beef steak, brown garlic butter gravy, unlimited rice",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef, Dairy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Caloric Protein Feast.",
      "nutrition": {
        "calories": 810,
        "protein": 55,
        "carbs": 55,
        "fat": 44
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-ribeye",
      "name": "S4: Ribeye Steak (Unli Rice & Gravy)",
      "price": 249,
      "ingredients": "Thick-cut sizzling ribeye beef steak, house gravy, unlimited steamed rice",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef, Dairy, and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat & Protein.",
      "nutrition": {
        "calories": 890,
        "protein": 58,
        "carbs": 55,
        "fat": 52
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-kalderetang-itik",
      "name": "V2: Kalderetang Itik (Candaba Native Duck Stew)",
      "price": 149,
      "ingredients": "Authentic Candaba native duck (itik), liver spread, tomato sauce, bell peppers, green peas, chili peppers",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Duck meat, Liver spread, and Solanaceae (peppers).",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Iron, Rich Regional Heritage Stew.",
      "nutrition": {
        "calories": 520,
        "protein": 38,
        "carbs": 12,
        "fat": 36
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-sisig",
      "name": "V3: Sizzling Pork Sisig",
      "price": 139,
      "ingredients": "Chopped grilled pork ears and belly, onions, calamansi, green chili",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork and Soy.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Cholesterol and Saturated Fat.",
      "nutrition": {
        "calories": 680,
        "protein": 36,
        "carbs": 6,
        "fat": 58
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-pakalangkang",
      "name": "V4: Pakalangkang (Braised Candaba Duck)",
      "price": 249,
      "ingredients": "Native Candaba duck stewed in aromatic ginger, garlic, soy sauce, and local spices",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Duck Meat and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Protein, Rich Kapampangan Flavor Profile.",
      "nutrition": {
        "calories": 610,
        "protein": 44,
        "carbs": 8,
        "fat": 42
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-bulalo",
      "name": "V6: Sizzling Beef Bulalo",
      "price": 249,
      "ingredients": "Beef marrow shank, sweet corn on the cob, cabbage, peppercorns, garlic gravy",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Beef Marrow and Gluten.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Cholesterol Marrow & Purines.",
      "nutrition": {
        "calories": 860,
        "protein": 50,
        "carbs": 14,
        "fat": 66
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    },
    {
      "id": "vr-halo-halo",
      "name": "Buko Halo-Halo Special",
      "price": 109,
      "ingredients": "Shaved ice served inside fresh coconut shell, coconut meat, sweet red beans, leche flan, ube halaya, sago, pinipig",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Dairy (Milk, Leche Flan) and Coconut.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Cooling Heritage Refreshment.",
      "nutrition": {
        "calories": 380,
        "protein": 8,
        "carbs": 68,
        "fat": 10
      },
      "image": "/restaurants/candaba/ver_rea_menu.jpg"
    }
  ]
},
{
  "id": "candaba-funnside-ningnangan",
  "name": "FunnsiDe Ningnangan",
  "username": "ningnangan",
  "password": "ningnangan123",
  "municipality": "Candaba",
  "corridor": "NLEX Corridor",
  "operatingHours": "10:00 AM - 11:00 PM",
  "priceTier": "$",
  "lat": 15.092,
  "lng": 120.825,
  "branches": [
    {
        "branchName": "Candaba Main Branch",
        "municipality": "Candaba",
        "address": "Poblacion Highway, Candaba, Pampanga",
        "lat": 15.092,
        "lng": 120.825,
        "operatingHours": "10:00 AM - 11:00 PM",
        "occupancy": [
            25,
            35,
            55,
            85,
            98,
            95,
            75,
            65,
            80,
            95,
            99,
            90,
            60,
            35,
            20
        ]
    },
    {
        "branchName": "City of San Fernando Branch",
        "municipality": "City of San Fernando",
        "address": "Gapan-Olongapo Road, City of San Fernando, Pampanga",
        "lat": 15.0345,
        "lng": 120.687,
        "operatingHours": "10:00 AM - 11:00 PM",
        "occupancy": [
            30,
            45,
            70,
            95,
            99,
            90,
            75,
            65,
            85,
            95,
            98,
            85,
            50,
            30,
            15
        ]
    },
    {
        "branchName": "Angeles City Branch",
        "municipality": "Angeles City",
        "address": "Fil-Am Friendship Highway, Angeles City, Pampanga",
        "lat": 15.1432,
        "lng": 120.578,
        "operatingHours": "10:00 AM - 11:00 PM",
        "occupancy": [
            20,
            35,
            60,
            90,
            95,
            85,
            65,
            55,
            75,
            90,
            95,
            80,
            45,
            25,
            10
        ]
    },
    {
        "branchName": "Santo Tomas Branch",
        "municipality": "Santo Tomas",
        "address": "MacArthur Highway, Santo Tomas, Pampanga",
        "lat": 15.011,
        "lng": 120.7175,
        "operatingHours": "10:00 AM - 10:30 PM",
        "occupancy": [
            15,
            25,
            45,
            80,
            90,
            80,
            60,
            50,
            70,
            85,
            90,
            75,
            40,
            20,
            10
        ]
    }
],
  "categories": [
    "🪵 Wood-Fired Traditional",
    "🐟 Fresh Seafood Grill"
  ],
  "description": "Open-air native Kapampangan ihaw-ihaw restaurant specializing in fresh grilled seafoods, inihaw na liempo, paco fern salad, cajun seafood buckets, and fried Candaba itik.",
  "occupancy": [
    25,
    35,
    55,
    85,
    98,
    95,
    75,
    65,
    80,
    95,
    99,
    90,
    60,
    35,
    20
  ],
  "image": "/restaurants/candaba/ningnangan_menu.jpg",
  "images": [
    "/restaurants/candaba/ningnangan_menu.jpg"
  ],
  "address": "Poblacion Highway, Candaba, Pampanga",
  "contactPhone": "+63 919 345 6789",
  "contactEmail": "ningnangancandaba@gmail.com",
  "menu": [
    {
      "id": "ning-liempo",
      "name": "Inihaw na Liempo (Grilled Pork Belly)",
      "price": 255,
      "ingredients": "Charcoal-grilled thick pork belly marinated in garlic, soy sauce, calamansi, and banana ketchup (85 pesos / 100g)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork and Soy sauce.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat & Charcoal Grill Proteins.",
      "nutrition": {
        "calories": 650,
        "protein": 32,
        "carbs": 6,
        "fat": 55
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-paco",
      "name": "Paco Enselada (Fresh Fern Salad)",
      "price": 85,
      "ingredients": "Freshly harvested Kapampangan pako wild fern leaves, sliced tomatoes, red onions, salted duck egg, vinegarette dressing",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Duck Eggs.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: Cardioprotective, Low Calories, Very High Fiber & Antioxidants.",
      "nutrition": {
        "calories": 140,
        "protein": 7,
        "carbs": 12,
        "fat": 7
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-fried-itik",
      "name": "Fried Candaba Itik (Whole Native Duck)",
      "price": 330,
      "ingredients": "Crispy deep-fried Candaba native duck seasoned with garlic, ginger, and green chilis",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Poultry/Duck Meat.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Iron, High Protein Regional Specialty.",
      "nutrition": {
        "calories": 710,
        "protein": 52,
        "carbs": 4,
        "fat": 54
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-sisig",
      "name": "Sizzling Kapampangan Pork Sisig",
      "price": 155,
      "ingredients": "Charcoal-grilled pig cheeks and liver, onions, calamansi, green chilis",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Pork and Liver.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat and Purines.",
      "nutrition": {
        "calories": 620,
        "protein": 38,
        "carbs": 5,
        "fat": 50
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-karekare",
      "name": "Crispy Pork Kare-Kare",
      "price": 329,
      "ingredients": "Crispy lechon kawali pork, rich peanut sauce, eggplant, string beans, pechay, bagoong alamang",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Peanuts, Crustaceans (Bagoong), and Pork.",
      "healthIndicators": "⚠️ LIFESTYLE COMPLIANCE: Rich Caloric Nut Fats & Fried Pork.",
      "nutrition": {
        "calories": 820,
        "protein": 44,
        "carbs": 20,
        "fat": 62
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-hito",
      "name": "Inihaw na Hito (Charcoal Grilled Catfish)",
      "price": 150,
      "ingredients": "Fresh Candaba freshwater catfish grilled over charcoal with soy-garlic glaze (50 pesos / 100g)",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Fish and Soy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Protein, Low Saturated Fat, Healthy Omega Oils.",
      "nutrition": {
        "calories": 310,
        "protein": 38,
        "carbs": 3,
        "fat": 16
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    },
    {
      "id": "ning-cajun",
      "name": "Classic Cajun Seafood Bucket (Chili Garlic)",
      "price": 2399,
      "ingredients": "Fresh Candaba crabs, prawns, mussels, sweet corn, sausage, cajun garlic butter chili sauce",
      "allergens": "⚠️ ALLERGEN WARNING: Contains Shellfish/Crustaceans (Crab, Prawns, Mussels) and Dairy.",
      "healthIndicators": "🟢 LIFESTYLE COMPLIANCE: High Protein, Seafood Feast.",
      "nutrition": {
        "calories": 1850,
        "protein": 140,
        "carbs": 45,
        "fat": 120
      },
      "image": "/restaurants/candaba/ningnangan_menu.jpg"
    }
  ]
},
  {
    id: 'everybodys-cafe',
    name: "Everybody's Cafe",
    municipality: 'City of San Fernando',
    corridor: 'MacArthur Highway Line',
    operatingHours: '07:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.0315,
    lng: 120.6865,
    categories: ['🏛️ Ancestral Kitchen'],
    
    branches: [
    {
        "branchName": "San Fernando Heritage Branch",
        "municipality": "City of San Fernando",
        "address": "McArthur Highway, San Fernando, Pampanga",
        "lat": 15.0315,
        "lng": 120.6865,
        "operatingHours": "07:00 AM - 09:00 PM",
        "occupancy": [
            15,
            25,
            45,
            85,
            95,
            60,
            40,
            55,
            80,
            90,
            75,
            40,
            20,
            10,
            5
        ]
    },
    {
        "branchName": "Angeles Nepo Quad Branch",
        "municipality": "Angeles City",
        "address": "Nepo Quad, Plaridel St, Angeles City, Pampanga",
        "lat": 15.1365,
        "lng": 120.5915,
        "operatingHours": "08:00 AM - 09:00 PM",
        "occupancy": [
            10,
            20,
            40,
            80,
            90,
            75,
            50,
            45,
            70,
            85,
            90,
            70,
            35,
            15,
            5
        ]
    }
],
    description: 'A legendary post-war heritage restaurant serving authentic Kapampangan home-cooked dishes since the 1940s. Famous for keeping ancestral kitchen methods alive.',
    occupancy: [15, 25, 45, 85, 95, 60, 40, 55, 80, 90, 75, 40, 20, 10, 5],
    menu: [
      {
        id: 'ec-morcon',
        name: 'Kapampangan Morcon',
        price: 450,
        ingredients: 'Ground beef, pork fat, chorizo de bilbao, duck egg yolks, cheese, lard',
        allergens: '⚠️ ALLERGEN WARNING: Contains Eggs, Dairy, and traces of Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Saturated Fats and Sodium Detected. Consume in moderation.',
        nutrition: { calories: 720, protein: 42, carbs: 12, fat: 55 }
      },
      {
        id: 'ec-kamaru',
        name: 'Adobong Kamaru (Rice Field Crickets)',
        price: 320,
        ingredients: 'Mole crickets, garlic, vinegar, soy sauce, tomatoes',
        allergens: '⚠️ ALLERGEN WARNING: Shellfish/Chitin-like insect proteins. Potential allergen for sensitive individuals.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: High Protein, Low Saturated Fats, Organic Source.',
        nutrition: { calories: 280, protein: 38, carbs: 6, fat: 12 }
      }
    ]
  },
  {
    id: 'aling-lucing-sisig',
    name: "Aling Lucing's Sisig",
    municipality: 'Angeles City',
    corridor: 'MacArthur Highway Line',
    operatingHours: '09:00 AM - 10:00 PM',
    priceTier: '$',
    lat: 15.1328,
    lng: 120.5976,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'The birth site of modern Sisig. Lucia "Aling Lucing" Cunanan revolutionized Kapampangan cuisine here by grilling and serving chopped pig ears, cheeks, and snout.',
    occupancy: [10, 20, 35, 70, 95, 99, 85, 65, 75, 95, 98, 80, 50, 30, 15],
    menu: [
      {
        id: 'al-sisig',
        name: 'Original Sizzling Sisig',
        price: 280,
        ingredients: 'Grilled pig ears, cheeks, snout, chicken liver, calamansi, onions, chili',
        allergens: '⚠️ ALLERGEN WARNING: Traces of Poultry (Chicken liver) and Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: Very High Saturated Fats and Purines. High Cholesterol Trigger.',
        nutrition: { calories: 840, protein: 48, carbs: 4, fat: 72 }
      },
      {
        id: 'al-tokwat-baboy',
        name: "Mila's Style Tokwa't Baboy",
        price: 180,
        ingredients: 'Deep fried tofu, boiled pork snout, soy-vinegar sauce, local celery',
        allergens: '⚠️ ALLERGEN WARNING: Contains Soy and Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: Moderate Saturated Fats, Soy Isoflavones present.',
        nutrition: { calories: 450, protein: 28, carbs: 14, fat: 31 }
      }
    ]
  },
  {
    id: 'apalit-lechon',
    name: 'Apag Apalit Lechon & Grill',
    municipality: 'Apalit',
    corridor: 'MacArthur Highway Line',
    operatingHours: '09:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 14.9654,
    lng: 120.7602,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Famous for Apalit-style charcoal spit-roasted pork with a rich liver gravy base, cooked over red clay brick ovens.',
    occupancy: [10, 15, 30, 75, 90, 85, 50, 45, 60, 80, 90, 70, 40, 20, 10],
    menu: [
      {
        id: 'ap-lechon',
        name: 'Apalit Charcoal Lechon Plate',
        price: 380,
        ingredients: 'Whole roasted pig, lemongrass, garlic, native vinegar liver sauce',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork. Liver sauce contains Gluten.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Saturated Fats and Purines.',
        nutrition: { calories: 690, protein: 38, carbs: 5, fat: 50 }
      },
      {
        id: 'ap-alanganin',
        name: 'Pancit Alanganin Apalit',
        price: 180,
        ingredients: 'Local noodles, creamy pork bone marrow broth, dynamic cabbage, chicharon',
        allergens: '⚠️ ALLERGEN WARNING: Contains Gluten, Soy, and Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sodium. Carbohydrate dense.',
        nutrition: { calories: 510, protein: 20, carbs: 65, fat: 18 }
      }
    ]
  },
  {
    id: 'arayat-kitchen',
    name: 'Kusina nang Mt. Arayat',
    municipality: 'Arayat',
    corridor: 'NLEX Corridor',
    operatingHours: '08:00 AM - 10:00 PM',
    priceTier: '$$',
    lat: 15.1504,
    lng: 120.7698,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'A rustic garden setting at the foot of Mt. Arayat serving mountain-plucked herbs, wild boar stews, and freshwater catfish.',
    occupancy: [5, 10, 25, 65, 80, 75, 55, 40, 50, 70, 85, 80, 50, 20, 5],
    menu: [
      {
        id: 'ay-tilapia',
        name: 'Ginataang Tilapia sa Laya',
        price: 290,
        ingredients: 'Freshwater tilapia, coconut cream, ginger root, wild spinach',
        allergens: '⚠️ ALLERGEN WARNING: Contains Fish and Coconut Milk.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Healthy Fats (Medium-Chain Triglycerides), High Protein.',
        nutrition: { calories: 420, protein: 32, carbs: 8, fat: 28 }
      },
      {
        id: 'ay-babi',
        name: 'Adobong Babi Matua (Old Style Pork Adobo)',
        price: 340,
        ingredients: 'Pork belly chunks, garlic, vinegar, rock salt (no soy sauce)',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Saturated Fats.',
        nutrition: { calories: 600, protein: 28, carbs: 2, fat: 54 }
      }
    ]
  },
  {
    id: 'bacolor-tamales',
    name: 'Kusina San Guillermo',
    municipality: 'Bacolor',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '09:00 AM - 08:00 PM',
    priceTier: '$$',
    lat: 15.0003,
    lng: 120.6508,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Located near the historic sunken church of Bacolor. Known for preserving the authentic pre-hispanic Pampanga Tamales recipe.',
    occupancy: [15, 30, 50, 85, 90, 70, 45, 55, 75, 85, 80, 55, 30, 10, 0],
    menu: [
      {
        id: 'ba-tamales',
        name: 'Bacolor Tamales (Bobotu)',
        price: 150,
        ingredients: 'Ground rice flour, coconut milk, peanut paste, chicken strips, salted duck egg',
        allergens: '⚠️ ALLERGEN WARNING: Contains Peanuts, Eggs, and Coconut.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Moderate Fats, Gluten-Free alternative meal.',
        nutrition: { calories: 380, protein: 14, carbs: 45, fat: 18 }
      },
      {
        id: 'ba-cookies',
        name: 'Panecillos de San Nicolas',
        price: 200,
        ingredients: 'Arrowroot starch, egg yolks, coconut milk, sugar, butter',
        allergens: '⚠️ ALLERGEN WARNING: Contains Eggs, Dairy, and Coconut.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: Simple Sugars. Calorie-dense dessert.',
        nutrition: { calories: 280, protein: 4, carbs: 42, fat: 10 }
      }
    ]
  },
  {
    id: 'candaba-swamp',
    name: 'Swamp Wild Duck Grill',
    municipality: 'Candaba',
    corridor: 'NLEX Corridor',
    operatingHours: '10:00 AM - 09:00 PM',
    priceTier: '$$$',
    lat: 15.0901,
    lng: 120.8245,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'An open-air dining lodge overlooking the Candaba wetlands. Specializes in smoked wild duck and wetland fish.',
    occupancy: [0, 5, 15, 60, 85, 90, 60, 35, 45, 70, 90, 80, 45, 15, 0],
    menu: [
      {
        id: 'ca-itik',
        name: 'Pinatisang Itik (Stewed Duck)',
        price: 420,
        ingredients: 'Candaba wild duck, native fish sauce (patis), ginger, green chilis',
        allergens: '⚠️ ALLERGEN WARNING: Contains Poultry and Fish Sauce (Seafood trace).',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sodium. Rich lean protein source.',
        nutrition: { calories: 580, protein: 45, carbs: 3, fat: 42 }
      }
    ]
  },
  {
    id: 'floridablanca-sugar',
    name: 'Floridablanca Sugar Trail Resto',
    municipality: 'Floridablanca',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '08:00 AM - 08:00 PM',
    priceTier: '$$',
    lat: 14.9752,
    lng: 120.5012,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Celebrating Floridablanca’s agricultural history, this kitchen infuses heritage sugar-curing methods into wood-fired pork and sweet native puddings.',
    occupancy: [10, 20, 40, 80, 95, 80, 50, 45, 60, 80, 85, 70, 40, 15, 5],
    menu: [
      {
        id: 'fl-tocino',
        name: 'Sugar-Glazed Pork Tocino (Pindang)',
        price: 240,
        ingredients: 'Pork loin slices, raw sugar cane juice, sea salt, garlic',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sugars and Saturated Fats.',
        nutrition: { calories: 530, protein: 30, carbs: 28, fat: 32 }
      }
    ]
  },
  {
    id: 'guagua-matua',
    name: 'Guagua Kusina Matua',
    municipality: 'Guagua',
    corridor: 'MacArthur Highway Line',
    operatingHours: '07:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 14.9982,
    lng: 120.6275,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Guagua’s legendary ancestral recipe vault. Serving thick peanut sauce noodles and traditional shaved ice puddings since 1968.',
    occupancy: [20, 30, 45, 80, 90, 85, 60, 65, 75, 85, 90, 75, 45, 20, 5],
    menu: [
      {
        id: 'gu-luglug',
        name: 'Pancit Luglug Guagua',
        price: 160,
        ingredients: 'Thick rice noodles, shrimp heads sauce, egg slices, crushed pork rinds, calamansi',
        allergens: '⚠️ ALLERGEN WARNING: Contains Seafood (Shrimp) and Pork (Chicharon).',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: Moderate Sodium. High Carbohydrates.',
        nutrition: { calories: 480, protein: 22, carbs: 68, fat: 12 }
      }
    ]
  },
  {
    id: 'abag-marangle-lubao',
    name: 'Apag Marangle',
    municipality: 'Lubao',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '10:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 14.9452,
    lng: 120.5982,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'An eco-restaurant styled like a nipa hut over water, offering traditional farmer dishes cooked over fire and served in clay pots (palayok).',
    occupancy: [8, 15, 30, 65, 80, 60, 45, 50, 75, 85, 70, 50, 25, 10, 5],
    menu: [
      {
        id: 'am-pidpid',
        name: 'Pidpid (Stuffed Catfish)',
        price: 390,
        ingredients: 'Freshwater catfish, ground pork filling, lemongrass, ginger, vinegar basting',
        allergens: '⚠️ ALLERGEN WARNING: Fish and Pork allergen.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Lean Protein, healthy fish lipids (omega-3). Low Carb.',
        nutrition: { calories: 380, protein: 35, carbs: 5, fat: 22 }
      }
    ]
  },
  {
    id: 'mabalacat-bibingka',
    name: 'Mabalacat Native Treats & Claypot',
    municipality: 'Mabalacat City',
    corridor: 'NLEX Corridor',
    operatingHours: '09:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.2212,
    lng: 120.5794,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Specializes in coal-fired bibingka cake lined with charred banana leaves, offering a smoky, buttery bite.',
    occupancy: [10, 25, 40, 60, 75, 70, 55, 60, 70, 85, 90, 70, 40, 20, 10],
    menu: [
      {
        id: 'ma-bibingka',
        name: 'Mabalacat Claypot Bibingka',
        price: 180,
        ingredients: 'Rice galapong, carabao cheese, salted egg, butter, grated coconut',
        allergens: '⚠️ ALLERGEN WARNING: Contains Dairy, Eggs, and Coconut.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Carbohydrates and Sugars.',
        nutrition: { calories: 420, protein: 10, carbs: 58, fat: 16 }
      }
    ]
  },
  {
    id: 'macabebe-seafood',
    name: 'Macabebe Delta Seafood Grill',
    municipality: 'Macabebe',
    corridor: 'MacArthur Highway Line',
    operatingHours: '09:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 14.9082,
    lng: 120.7121,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Macabebe sits at the delta of the Pampanga River. This grill cooks fresh catches caught hourly by local fishermen.',
    occupancy: [5, 10, 20, 65, 80, 85, 55, 40, 50, 75, 90, 80, 50, 20, 5],
    menu: [
      {
        id: 'mb-crabcakes',
        name: 'Macabebe Blue Crab Cakes',
        price: 320,
        ingredients: 'Fresh blue crab meat, garlic, native green onion, egg binder, flour breading',
        allergens: '⚠️ ALLERGEN WARNING: Contains Crustaceans, Gluten, and Eggs.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Rich in Zinc, High Lean Protein.',
        nutrition: { calories: 310, protein: 28, carbs: 12, fat: 15 }
      }
    ]
  },
  {
    id: 'magalang-kitchen',
    name: "Atching Lillian's Ancestral Kitchen",
    municipality: 'Magalang',
    corridor: 'NLEX Corridor',
    operatingHours: '10:00 AM - 05:00 PM',
    priceTier: '$$$$',
    lat: 15.2215,
    lng: 120.6612,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'The culinary shrine of Lillian Borromeo, Pampanga’s culinary historian. Offers pre-booked ancestral cooking demos and authentic pastillas.',
    occupancy: [5, 5, 20, 80, 100, 100, 70, 40, 20, 10, 0, 0, 0, 0, 0],
    menu: [
      {
        id: 'ml-pistu',
        name: 'Pistu (Heritage Egg Hash)',
        price: 380,
        ingredients: 'Egg custard batter, minced beef, pork bits, raisins, peas, butter, native spices',
        allergens: '⚠️ ALLERGEN WARNING: Contains Eggs, Dairy, Beef, and Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Cholesterol and Sodium.',
        nutrition: { calories: 490, protein: 32, carbs: 10, fat: 36 }
      }
    ]
  },
  {
    id: 'masantol-crabs',
    name: 'Masantol Mangrove Crab House',
    municipality: 'Masantol',
    corridor: 'MacArthur Highway Line',
    operatingHours: '10:00 AM - 10:00 PM',
    priceTier: '$$$',
    lat: 14.8987,
    lng: 120.7042,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Located in the coastal mangrove swamps of Masantol. Famous for giant mud crabs stewed in traditional coconut vinegar.',
    occupancy: [0, 10, 20, 50, 75, 80, 60, 45, 55, 75, 95, 90, 65, 30, 10],
    menu: [
      {
        id: 'ms-crabs',
        name: 'Masantol Buttered Mud Crabs',
        price: 650,
        ingredients: 'Mangrove mud crabs, garlic butter, local chili, coconut vinegar reduction',
        allergens: '⚠️ ALLERGEN WARNING: Contains Crustaceans (Crabs) and Dairy.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sodium. Rich in healthy marine lipids.',
        nutrition: { calories: 520, protein: 42, carbs: 6, fat: 34 }
      }
    ]
  },
  {
    id: 'souq-pampanga-mexico',
    name: 'Souq Pampanga',
    municipality: 'Mexico',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '11:00 AM - 10:00 PM',
    priceTier: '$$$',
    lat: 15.0612,
    lng: 120.7231,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'An eclectic dining spot in Mexico town combining industrial interior design with elevated Kapampangan roots.',
    occupancy: [0, 10, 25, 55, 70, 60, 45, 55, 80, 95, 90, 75, 50, 30, 15],
    menu: [
      {
        id: 'sq-chicharon',
        name: 'Pork Belly Chicharon with Pinakurat',
        price: 290,
        ingredients: 'Double fried pork belly rind, garlic, spiced cane vinegar',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: Critical Saturated Fats & Triglycerides trigger.',
        nutrition: { calories: 650, protein: 30, carbs: 2, fat: 58 }
      },
      {
        id: 'sq-pako',
        name: 'Pako Salad (Local Fern Salad)',
        price: 240,
        ingredients: 'Fresh river fern, salted eggs, tomatoes, onions, sweet vinaigrette',
        allergens: '⚠️ ALLERGEN WARNING: Contains Eggs (Salted Duck Egg).',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Rich in Dietary Fiber, Low Fat.',
        nutrition: { calories: 140, protein: 6, carbs: 12, fat: 8 }
      }
    ]
  },
  {
    id: 'minalin-eggs',
    name: 'Minalin Egg Farm Cafe',
    municipality: 'Minalin',
    corridor: 'MacArthur Highway Line',
    operatingHours: '07:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 14.9812,
    lng: 120.6903,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Located in the egg capital of Central Luzon. Serves organic breakfasts highlighting local duck eggs and chicken layers.',
    occupancy: [25, 45, 60, 70, 80, 65, 45, 50, 60, 75, 80, 50, 20, 5, 0],
    menu: [
      {
        id: 'mi-omelette',
        name: 'Triple Salted Egg Omelette',
        price: 190,
        ingredients: 'Salted duck eggs, fresh chicken eggs, tomatoes, red onions, garlic',
        allergens: '⚠️ ALLERGEN WARNING: Contains Eggs.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sodium from salted curing process.',
        nutrition: { calories: 340, protein: 18, carbs: 5, fat: 26 }
      }
    ]
  },
  {
    id: 'porac-mountain',
    name: 'Porac Mountain Grill & Indigenous Kitchen',
    municipality: 'Porac',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '08:00 AM - 06:00 PM',
    priceTier: '$$',
    lat: 15.0487,
    lng: 120.5281,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'Features ancestral culinary methods of the Aeta highlands. Cooked over open mountain pits using bamboo poles and wild honey.',
    occupancy: [5, 15, 30, 60, 80, 75, 40, 30, 45, 60, 75, 50, 20, 5, 0],
    menu: [
      {
        id: 'po-ribs',
        name: 'Wild Honey Glazed Pork Ribs',
        price: 380,
        ingredients: 'Pork ribs, mountain wild honey, ginger, calamansi glaze',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Sugars and Fat. Low Sodium.',
        nutrition: { calories: 610, protein: 32, carbs: 22, fat: 42 }
      }
    ]
  },
  {
    id: 'san-luis-river',
    name: 'San Luis River Delta Eatery',
    municipality: 'San Luis',
    corridor: 'NLEX Corridor',
    operatingHours: '08:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 15.0452,
    lng: 120.7901,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'San Luis is situated along the Pampanga River. This eatery is famous for sour guava broths and claypot river ducks.',
    occupancy: [10, 20, 35, 65, 80, 70, 45, 50, 60, 75, 85, 65, 30, 10, 0],
    menu: [
      {
        id: 'sl-paksiw',
        name: 'Paksiw na Bangus sa Bayabas',
        price: 210,
        ingredients: 'Fresh milkfish, native guavas, vinegar, ginger, finger chilies',
        allergens: '⚠️ ALLERGEN WARNING: Contains Fish.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: High in Vitamin C, healthy omega-3 fatty acids.',
        nutrition: { calories: 290, protein: 24, carbs: 10, fat: 16 }
      }
    ]
  },
  {
    id: 'san-simon-bulalo',
    name: 'San Simon Expressway Diner',
    municipality: 'San Simon',
    corridor: 'NLEX Corridor',
    operatingHours: '24 Hours',
    priceTier: '$$',
    lat: 14.9991,
    lng: 120.7854,
    categories: ['🪵 Wood-Fired Traditional'],
    description: 'A 24/7 rest-stop diner near the San Simon NLEX exit. Known for hot wood-fire boiled beef shanks served in iron cauldrons.',
    occupancy: [30, 40, 50, 70, 90, 85, 65, 60, 70, 80, 95, 90, 75, 60, 40],
    menu: [
      {
        id: 'ss-bulalo',
        name: 'San Simon Sizzling Bulalo',
        price: 490,
        ingredients: 'Beef shank, bone marrow, garlic mushroom gravy, green beans',
        allergens: '⚠️ ALLERGEN WARNING: Contains Beef. Gravy contains Gluten.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Saturated Fat, High Cholesterol.',
        nutrition: { calories: 880, protein: 55, carbs: 10, fat: 68 }
      }
    ]
  },
  {
    id: 'santa-ana-claypot',
    name: 'Santa Ana Claypot Grill',
    municipality: 'Santa Ana',
    corridor: 'NLEX Corridor',
    operatingHours: '09:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.0995,
    lng: 120.7698,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Traditional slow-cooking in clay pot palayoks. Famous for serving turmeric-stained chicken rice on banana leaves.',
    occupancy: [10, 15, 30, 70, 85, 75, 45, 50, 60, 80, 90, 75, 40, 15, 0],
    menu: [
      {
        id: 'sn-bringhe',
        name: 'Santa Ana Claypot Bringhe',
        price: 280,
        ingredients: 'Glutinous rice, coconut milk, organic chicken, turmeric ginger, raisins',
        allergens: '⚠️ ALLERGEN WARNING: Contains Coconut. Traces of chicken.',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Carbohydrates. Energy dense.',
        nutrition: { calories: 510, protein: 18, carbs: 66, fat: 18 }
      }
    ]
  },
  {
    id: 'santa-rita-turrones',
    name: 'Ocampo-Lansang Turrones & Cafe',
    municipality: 'Santa Rita',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '08:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 15.0012,
    lng: 120.6125,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'The historic home of Santa Rita’s cashew turrones. The recipe utilizes wafer paper (oblato) wrapping unchanged since 1920.',
    occupancy: [15, 25, 45, 70, 85, 70, 50, 60, 75, 80, 60, 40, 20, 10, 0],
    menu: [
      {
        id: 'sr-turrones',
        name: 'Santa Rita Turrones de Casuy',
        price: 120,
        ingredients: 'Cashew nuts, honey, egg whites, wafer paper wrapping',
        allergens: '⚠️ ALLERGEN WARNING: Contains Tree Nuts (Cashews) and Egg Whites.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: Low Sodium. Natural fructose and healthy nut oils.',
        nutrition: { calories: 220, protein: 6, carbs: 24, fat: 12 }
      }
    ]
  },
  {
    id: 'santo-tomas-lechon',
    name: 'Santo Tomas Palayok Kitchen',
    municipality: 'Santo Tomas',
    corridor: 'MacArthur Highway Line',
    operatingHours: '10:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.0118,
    lng: 120.7182,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Santo Tomas is known for pottery and lechon. This kitchen combines both by cooking slow pork stews in native clay pots.',
    occupancy: [5, 10, 25, 70, 90, 80, 50, 45, 60, 80, 95, 80, 40, 20, 10],
    menu: [
      {
        id: 'st-sisig',
        name: 'Santo Tomas Lechon Head Sisig',
        price: 310,
        ingredients: 'Chopped lechon head, onions, calamansi, liver sauce seasoning',
        allergens: '⚠️ ALLERGEN WARNING: Contains Pork. Trace of poultry (liver).',
        healthIndicators: '⚠️ LIFESTYLE COMPLIANCE: High Cholesterol, High Saturated Fats.',
        nutrition: { calories: 790, protein: 40, carbs: 5, fat: 68 }
      }
    ]
  },
  {
    id: 'sasmuan-polvoron',
    name: 'Sasmuan Coastal Seafood & Cafe',
    municipality: 'Sasmuan',
    corridor: 'Jose Abad Santos Avenue (JASA) Line',
    operatingHours: '09:00 AM - 08:00 PM',
    priceTier: '$',
    lat: 14.9381,
    lng: 120.6202,
    categories: ['🏛️ Ancestral Kitchen'],
    description: 'Located in coastal Sasmuan. Best known for combining fresh garlic butter prawns with classic Sasmuan toasted rice polvoron cakes.',
    occupancy: [10, 20, 35, 65, 80, 70, 50, 55, 65, 75, 80, 60, 30, 15, 0],
    menu: [
      {
        id: 'sa-shrimp',
        name: 'Sasmuan Garlic Butter Shrimp',
        price: 340,
        ingredients: 'Coastal brackish shrimp, butter, roasted garlic, native lime',
        allergens: '⚠️ ALLERGEN WARNING: Contains Crustaceans (Shrimp) and Dairy.',
        healthIndicators: '🟢 LIFESTYLE COMPLIANCE: High Protein, Low Carb, healthy minerals.',
        nutrition: { calories: 320, protein: 29, carbs: 4, fat: 20 }
      }
    ]
  }
];

// Dynamic enrichment of preseeded restaurants with images, addresses, and dish images

// Dynamic enrichment of preseeded restaurants with images, addresses, and dish images
const RESTAURANT_IMAGES = [
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581349485608-947ab4a53e5e?auto=format&fit=crop&w=800&q=80'
];

const DISH_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80'
];

const BRGYS = ['Santo Rosario', 'San Jose', 'Santa Lucia', 'San Agustin', 'Del Pilar', 'Lourdes', 'Sto. Niño', 'San Nicolas'];


PRESEEDED_RESTAURANTS.forEach((res, resIdx) => {
  res.images = [
    RESTAURANT_IMAGES[resIdx % RESTAURANT_IMAGES.length],
    RESTAURANT_IMAGES[(resIdx + 1) % RESTAURANT_IMAGES.length],
    RESTAURANT_IMAGES[(resIdx + 2) % RESTAURANT_IMAGES.length],
    RESTAURANT_IMAGES[(resIdx + 3) % RESTAURANT_IMAGES.length]
  ];
  res.image = res.images[0];
  const brgy = BRGYS[resIdx % BRGYS.length];
  res.address = `Barangay ${brgy}, ${res.municipality}, Pampanga`;
  
  // Establish default claim states: first 3 restaurants are pre-claimed, others are unclaimed initially
  res.isClaimed = resIdx < 3;
  res.reservationsEnabled = true;
  res.preOrdersEnabled = true;
  res.deliveryEnabled = resIdx % 2 === 0; // Toggle delivery option by default
  
  // Direct contact vs Dashboard booking preference options
  res.reservationsMode = resIdx === 1 ? 'contact' : 'dashboard'; // Angeles Sisig uses direct contact booking
  res.deliveryMode = 'dashboard';
  res.contactNumber = `+63 917 ${200 + resIdx} ${5000 + resIdx}`;
  res.contactEmail = `info@${res.id.replace(/-+/g, '')}.gov.ph`;

  if (res.menu && res.menu.length > 0) {
    res.menu.forEach((dish, dishIdx) => {
      dish.image = DISH_IMAGES[(resIdx * 3 + dishIdx) % DISH_IMAGES.length];
    });
  }
});


export const PRESEEDED_ATTRACTIONS = [
  {
    "id": "parish-angeles",
    "name": "Holy Rosary Parish Church (Santo Rosario Church)",
    "municipality": "Angeles City",
    "lat": 15.1365,
    "lng": 120.5902,
    "type": "🏛️ Historic Parish Church",
    "description": "National Historical Landmark built in 1877 during the Spanish era using polo y servicio forced labor. Witnessed historic Philippine-American war events.",
    "details": "Features dual bell towers and magnificent stained glass windows overlooking Santo Rosario heritage district.",
    "image": "/attractions/holy_rosary_angeles.jpg"
  },
  {
    "id": "parish-apalit",
    "name": "St. Peter the Apostle Parish Church (Apalit Church)",
    "municipality": "Apalit",
    "lat": 14.9497,
    "lng": 120.7583,
    "type": "🏛️ Historic Parish Church",
    "description": "Heritage parish founded in 1590, famous for the annual June Libad fluvial river procession honoring Apung Iru (St. Peter).",
    "details": "Built with thick brick masonry walls and features classical ceiling paintings.",
    "image": "/attractions/apalit_church.jpg"
  },
  {
    "id": "parish-arayat",
    "name": "Santa Catalina de Alejandria Parish Church (Arayat Church)",
    "municipality": "Arayat",
    "lat": 15.1492,
    "lng": 120.7694,
    "type": "🏛️ Historic Parish Church",
    "description": "Colonial Augustinian parish established in 1590 at the foot of Mount Arayat under the patronage of St. Catherine of Alexandria.",
    "details": "Features a classic Renaissance-style facade and century-old brick bell tower.",
    "image": "/attractions/mt_arayat_park.jpg"
  },
  {
    "id": "parish-bacolor",
    "name": "San Guillermo Parish Church (Half-Buried Sunken Church)",
    "municipality": "Bacolor",
    "lat": 14.998,
    "lng": 120.645,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic 16th-century church half-buried by 6-meter lahar mudflows from the 1991 Mt. Pinatubo eruption.",
    "details": "Visitors enter through the original upper window arches. Houses a fully restored gilded baroque retablo.",
    "image": "/attractions/san_guillermo_bacolor.jpg"
  },
  {
    "id": "parish-candaba",
    "name": "San Nicolas de Tolentino Parish Church (Candaba Church)",
    "municipality": "Candaba",
    "lat": 15.0933,
    "lng": 120.8265,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic Augustinian parish constructed in 1575, standing as the spiritual landmark of Candaba town center.",
    "details": "Features Neoclassical facade masonry and an octagonal multi-tiered belfry.",
    "image": "/attractions/candaba_church.jpg"
  },
  {
    "id": "parish-sanfernando",
    "name": "Metropolitan Cathedral of San Fernando (San Fernando Cathedral)",
    "municipality": "City of San Fernando",
    "lat": 15.032,
    "lng": 120.6885,
    "type": "🏛️ Historic Parish Church / Cathedral",
    "description": "Seat of the Archdiocese of San Fernando, established in 1755.",
    "details": "Features a monumental dome and neo-classical stone facade overlooking the central municipal plaza.",
    "image": "/attractions/san_fernando_cathedral.jpg"
  },
  {
    "id": "parish-floridablanca",
    "name": "San Jose Obrero Parish Church (Floridablanca Church)",
    "municipality": "Floridablanca",
    "lat": 14.9733,
    "lng": 120.5361,
    "type": "🏛️ Historic Parish Church",
    "description": "Heritage 19th-century parish church founded in 1823 under the patronage of Saint Joseph the Worker.",
    "details": "Built with traditional stone brick facade walls and a graceful octagonal bell tower.",
    "image": "/attractions/floridablanca_church.jpg"
  },
  {
    "id": "parish-guagua",
    "name": "Betis Church - St. James the Apostle Parish Church",
    "municipality": "Guagua",
    "lat": 14.9647,
    "lng": 120.6385,
    "type": "🏛️ Historic Parish Church",
    "description": "National Cultural Treasure known as the 'Sistine Chapel of the Philippines' for its stunning hand-painted wooden ceiling frescoes.",
    "details": "Built in 1660, features exquisite woodcarvings, ornate retablo, and historic belfry.",
    "image": "/attractions/betis_church_guagua.jpg"
  },
  {
    "id": "parish-lubao",
    "name": "San Agustin Parish Church (Lubao Church)",
    "municipality": "Lubao",
    "lat": 14.9408,
    "lng": 120.5975,
    "type": "🏛️ Historic Parish Church",
    "description": "The oldest church in Pampanga and Central Luzon, constructed in 1572 using brick, stone, and egg whites.",
    "details": "Important Cultural Property built by Fr. Antonio Herrera with massive 2-meter thick earthquake-proof walls.",
    "image": "/attractions/lubao_church.jpg"
  },
  {
    "id": "parish-mabalacat",
    "name": "Our Lady of Grace Parish Church (Mabalacat Church)",
    "municipality": "Mabalacat City",
    "lat": 15.2185,
    "lng": 120.58,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic Augustinian parish established in 1712, known for its distinct bell tower and brick entrance arches.",
    "details": "Preserves century-old wooden religious statues and Spanish-era parish records.",
    "image": "/attractions/mabalacat_church.jpg"
  },
  {
    "id": "parish-macabebe",
    "name": "San Nicolas de Tolentino Parish Church (Macabebe Church)",
    "municipality": "Macabebe",
    "lat": 14.9072,
    "lng": 120.7139,
    "type": "🏛️ Historic Parish Church",
    "description": "Colonial Augustinian parish founded in 1575, featuring classic red brick facade masonry.",
    "details": "Renowned for its historic Spanish-era belfry overlooking coastal river delta routes.",
    "image": "/attractions/macabebe_church.jpg"
  },
  {
    "id": "parish-magalang",
    "name": "San Bartolome Parish Church (Magalang Church)",
    "municipality": "Magalang",
    "lat": 15.2178,
    "lng": 120.6603,
    "type": "🏛️ Historic Parish Church",
    "description": "Heritage parish church established in 1605 at the foot of Mount Arayat.",
    "details": "Features a grand symmetrical stone facade and historic baroque altarpiece.",
    "image": "/attractions/magalang_church.jpg"
  },
  {
    "id": "parish-masantol",
    "name": "San Miguel Arcangel Parish Church (Masantol Church)",
    "municipality": "Masantol",
    "lat": 14.8978,
    "lng": 120.7119,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic coastal parish church founded in 1877 under the patronage of Archangel Michael.",
    "details": "Overlooks the Pampanga river delta and historic fishing communities.",
    "image": "/attractions/masantol_church.jpg"
  },
  {
    "id": "parish-mexico",
    "name": "Santa Monica Parish Church (Mexico Church)",
    "municipality": "Mexico",
    "lat": 15.0667,
    "lng": 120.7214,
    "type": "🏛️ Historic Parish Church",
    "description": "Colonial Augustinian parish established in 1581, known for its historic belfry ruins.",
    "details": "Houses antique stone altars and century-old parish registers.",
    "image": "/attractions/mexico_church.jpg"
  },
  {
    "id": "parish-minalin",
    "name": "Santa Monica Parish Church (Minalin Sunken Church)",
    "municipality": "Minalin",
    "lat": 14.9692,
    "lng": 120.6942,
    "type": "🏛️ Historic Parish Church",
    "description": "National Cultural Treasure built in 1614, featuring rare European-Moorish architectural motifs.",
    "details": "Renowned for its unique floral carvings, retablo-style facade, and ancient bamboo organ relics.",
    "image": "/attractions/minalin_church.jpg"
  },
  {
    "id": "parish-porac",
    "name": "Santa Catalina de Alejandria Parish Church (Porac Church)",
    "municipality": "Porac",
    "lat": 15.0714,
    "lng": 120.5428,
    "type": "🏛️ Historic Parish Church",
    "description": "Heritage 19th-century parish church founded in 1594 by Augustinian missionaries.",
    "details": "Restored after historic earthquake events, showcasing thick stone buttress walls.",
    "image": "/attractions/porac_church.jpg"
  },
  {
    "id": "parish-sanluis",
    "name": "San Luis Gonzaga Parish Church (San Luis Church)",
    "municipality": "San Luis",
    "lat": 15.0417,
    "lng": 120.7958,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic 18th-century riverside parish church overlooking the majestic Pampanga River bend.",
    "details": "Constructed in 1760 using volcanic tuff stone and traditional lime mortar.",
    "image": "/attractions/san_luis_church.jpg"
  },
  {
    "id": "parish-sansimon",
    "name": "Virgen del Pilar Parish Church (San Simon Church)",
    "municipality": "San Simon",
    "lat": 14.9967,
    "lng": 120.785,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic Spanish colonial parish founded in 1771 under the patronage of Our Lady of the Pillar.",
    "details": "Features classic Renaissance facade arches and a historic bell tower overlooking MacArthur Highway.",
    "image": "/attractions/san_fernando_cathedral.jpg"
  },
  {
    "id": "parish-santaana",
    "name": "Santa Ana Parish Church (Santa Ana Church)",
    "municipality": "Santa Ana",
    "lat": 15.0972,
    "lng": 120.7686,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic parish established in 1756 by Augustinian friars, featuring classic Spanish-colonial brick masonry.",
    "details": "Houses antique stone retablos and original century-old church bells.",
    "image": "/attractions/santa_ana_church.jpg"
  },
  {
    "id": "parish-santarita",
    "name": "Santa Rita de Cascia Parish Church (Santa Rita Church)",
    "municipality": "Santa Rita",
    "lat": 15.0006,
    "lng": 120.6133,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic parish church founded in 1726, home to the sacred relic of Saint Rita of Cascia.",
    "details": "Features a large spacious nave, historic pipe organ loft, and century-old heritage trees.",
    "image": "/attractions/santa_rita_church.jpg"
  },
  {
    "id": "parish-santotomas",
    "name": "Santo Tomas de Villanueva Parish Church (Santo Tomas Church)",
    "municipality": "Santo Tomas",
    "lat": 15.011,
    "lng": 120.7175,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic Augustinian parish church founded in 1792 in the pottery and palayok capital of Pampanga.",
    "details": "Stands as the spiritual heart of Santo Tomas, known for its solemn holy week traditions.",
    "image": "/attractions/santa_rita_church.jpg"
  },
  {
    "id": "parish-sasmuan",
    "name": "Santa Lucia Parish Church (Sasmuan Church)",
    "municipality": "Sasmuan",
    "lat": 14.9375,
    "lng": 120.6272,
    "type": "🏛️ Historic Parish Church",
    "description": "Historic coastal parish church founded in 1590, renowned for the miraculous Kuraldal healing dance festival.",
    "details": "Built over coastal wetlands, featuring massive stone walls and a single historic belfry.",
    "image": "/attractions/sasmuan_church.jpg"
  }
];


export const PRESEEDED_MEAL_PHOTOS = [
  {
    id: 'mv-sisig',
    name: 'Sizzling Pork Sisig',
    imgLabel: '🐷 Pork Sisig Plate',
    description: 'Finely chopped pork face, snout, ears, and chicken liver, seasoned with calamansi, onions, and chili.',
    nutrition: { calories: 840, protein: 48, carbs: 4, fat: 72 },
    allergens: '⚠️ ALLERGENS: Pork, Poultry, Offal, Calamansi citrus.',
    compliance: '⚠️ High cholesterol, high lipid profiling, high purines.'
  },
  {
    id: 'mv-karekare',
    name: 'Beef Kare-Kare',
    imgLabel: '🥜 Creamy Kare-Kare',
    description: 'Tender beef tripe and oxtail stewed in a rich, velvety peanut sauce, served with steamed local vegetables.',
    nutrition: { calories: 710, protein: 44, carbs: 18, fat: 52 },
    allergens: '⚠️ ALLERGENS: Peanuts, Crustacean (requires Fermented Shrimp Paste / Bagoong).',
    compliance: '⚠️ Moderate saturated fats, high sodium when combined with bagoong.'
  },
  {
    id: 'mv-bringhe',
    name: 'Bringhe Rice',
    imgLabel: '🥥 Bringhe Rice',
    description: 'Glutinous rice slow-cooked with fresh coconut cream, chicken strips, local turmeric ginger, and raisins.',
    nutrition: { calories: 550, protein: 22, carbs: 70, fat: 20 },
    allergens: '⚠️ ALLERGENS: Coconut, Raisins, Traces of chicken.',
    compliance: '🟢 Good carbohydrate source, moderate healthy fats from coconut butter.'
  },
  {
    id: 'mv-pakosalad',
    name: 'Pako Salad',
    imgLabel: '🌿 Pako Fern Salad',
    description: 'Crisp river fern (pako) tossed with red onions, fresh tomatoes, and slices of local salted duck egg.',
    nutrition: { calories: 140, protein: 6, carbs: 12, fat: 8 },
    allergens: '⚠️ ALLERGENS: Duck Egg (Egg albumin).',
    compliance: '🟢 Excellent fiber density, low calorie, low lipid loading.'
  }
];


export const OCCUPANCY_HOURS = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
];
