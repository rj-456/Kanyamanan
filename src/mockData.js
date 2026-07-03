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
    id: 'everybodys-cafe',
    name: "Everybody's Cafe",
    municipality: 'City of San Fernando',
    corridor: 'MacArthur Highway Line',
    operatingHours: '07:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.0315,
    lng: 120.6865,
    categories: ['🏛️ Ancestral Kitchen'],
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
  if (res.menu && res.menu.length > 0) {
    res.menu.forEach((dish, dishIdx) => {
      dish.image = DISH_IMAGES[(resIdx * 3 + dishIdx) % DISH_IMAGES.length];
    });
  }
});

// Seeded meal items specifically for the Computer Vision Calorie & Macronutrient Dropzone
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

// Peak traffic times labels corresponding to the 15 occupancy slots (8:00 AM to 10:00 PM)
export const OCCUPANCY_HOURS = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
];
