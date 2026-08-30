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
      // MENU SPECIALS
      {
        id: 'kabigting-1',
        name: "Halo-Halo",
        price: 110,
        ingredients: "Carabao milk, pastillas de leche, sweet white kidney beans, halayang ube, shaved ice",
        allergens: "Contains Dairy (Carabao Milk)",
        healthIndicators: "Moderate Calorie, Signature Dessert",
        nutrition: { calories: 340, protein: 8, carbs: 58, fat: 9 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-2',
        name: "Palabok",
        price: 105,
        ingredients: "Rice noodles, savory shrimp-achiote sauce, crushed chicharon, tinapa flakes, boiled egg, scallions, calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "High Protein, Iron Rich",
        nutrition: { calories: 380, protein: 16, carbs: 48, fat: 14 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-3',
        name: "Fresh Lumpia",
        price: 110,
        ingredients: "Fresh homemade egg crepe wrapper, heart of palm (ubod), carrots, minced pork and shrimp, sweet garlic sauce, crushed peanuts",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Soy",
        healthIndicators: "High Fiber, Vitamin Rich",
        nutrition: { calories: 290, protein: 12, carbs: 36, fat: 11 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-4',
        name: "Tokwa't Baboy",
        price: 115,
        ingredients: "Crispy deep-fried firm tofu, boiled pork cuts, spiced soy-vinegar dressing, red onions, chili peppers",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 360, protein: 24, carbs: 12, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-5',
        name: "Tokwa't Baboy w/ Rice",
        price: 135,
        ingredients: "Crispy tofu, boiled pork slices in spiced soy-vinegar dressing, served with steamed white rice",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Protein, Complete Meal",
        nutrition: { calories: 560, protein: 28, carbs: 57, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-6',
        name: "Dinuguan w/ Puto or Rice",
        price: 135,
        ingredients: "Kapampangan savory pork stew simmered in rich spiced blood gravy, vinegar, garlic, green chili, served with puto or rice",
        allergens: "Contains Gluten (if with puto)",
        healthIndicators: "High Protein, Iron Rich",
        nutrition: { calories: 450, protein: 26, carbs: 35, fat: 22 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-7',
        name: "Sizzling Sisig",
        price: 180,
        ingredients: "Grilled minced pork face, ears, and liver, seasoned with calamansi, red onions, and hot chili peppers",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Kapampangan Classic",
        nutrition: { calories: 520, protein: 32, carbs: 8, fat: 40 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-8',
        name: "Boneless Bangus w/ Rice",
        price: 145,
        ingredients: "Marinated pan-fried golden boneless milkfish (bangus), served with garlic-vinegar dip and steamed rice",
        allergens: "Contains Fish",
        healthIndicators: "High Protein, Omega-3 Rich, Pescatarian Friendly",
        nutrition: { calories: 480, protein: 34, carbs: 45, fat: 18 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-9',
        name: "Lumpiang Shanghai w/ Rice",
        price: 130,
        ingredients: "Crispy golden fried pork spring rolls, sweet chili sauce, served with steamed white rice",
        allergens: "Contains Eggs, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 490, protein: 20, carbs: 52, fat: 22 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-10',
        name: "Okoy w/ Rice",
        price: 105,
        ingredients: "Deep-fried crispy shrimp and shredded vegetable fritters, spiced vinegar dip, served with steamed rice",
        allergens: "Contains Crustaceans, Gluten, Eggs",
        healthIndicators: "Crispy Specialty, Moderate Calorie",
        nutrition: { calories: 410, protein: 14, carbs: 54, fat: 15 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },

      // COMBO MEALS
      {
        id: 'kabigting-11',
        name: "Crispy Liempo w/ Halo-Halo",
        price: 240,
        ingredients: "Crispy deep-fried pork belly with rice and spiced vinegar dip, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy (Halo-Halo)",
        healthIndicators: "High Protein, Ultimate Feast Combo",
        nutrition: { calories: 920, protein: 38, carbs: 98, fat: 42 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-12',
        name: "Longsilog w/ Halo-Halo",
        price: 230,
        ingredients: "Pampanga native longanisa, garlic sinangag rice, sunny fried egg, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "High Protein, Breakfast-Dessert Combo",
        nutrition: { calories: 880, protein: 32, carbs: 104, fat: 38 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-13',
        name: "Tocilog w/ Halo-Halo (Pork or Chicken)",
        price: 230,
        ingredients: "Sweet cured Kapampangan pork/chicken tocino, garlic sinangag, fried egg, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "High Protein, Bestseller Combo",
        nutrition: { calories: 870, protein: 34, carbs: 106, fat: 34 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-14',
        name: "Palabok w/ Halo-Halo",
        price: 210,
        ingredients: "Signature Kapampangan Palabok with shrimp sauce and tinapa flakes, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Crustaceans, Eggs, Fish, Dairy, Gluten",
        healthIndicators: "Merienda Favorite Combo",
        nutrition: { calories: 720, protein: 24, carbs: 106, fat: 23 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-15',
        name: "Fresh Lumpia w/ Halo-Halo",
        price: 215,
        ingredients: "Fresh ubod lumpia with peanut garlic sauce, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Dairy, Soy",
        healthIndicators: "High Fiber, Balanced Merienda",
        nutrition: { calories: 630, protein: 20, carbs: 94, fat: 20 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-16',
        name: "Tokwa't Baboy w/ Halo-Halo",
        price: 215,
        ingredients: "Savory fried tofu and pork cuts in soy-vinegar dressing, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Soy, Dairy, Gluten",
        healthIndicators: "High Protein, Sweet & Savory Pairing",
        nutrition: { calories: 700, protein: 32, carbs: 70, fat: 33 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-17',
        name: "Dinuguan at Puto w/ Halo-Halo",
        price: 240,
        ingredients: "Savory simmered pork blood stew with steamed puto cakes, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "High Protein, Traditional Kapampangan Combo",
        nutrition: { calories: 790, protein: 34, carbs: 93, fat: 31 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-18',
        name: "Tapsilog w/ Halo-Halo",
        price: 230,
        ingredients: "Marinated tender pork/beef tapa, garlic rice, fried egg, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy, Eggs, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 860, protein: 36, carbs: 100, fat: 35 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-19',
        name: "Beefsilog w/ Halo-Halo",
        price: 250,
        ingredients: "Savory marinated prime beef sirloin tapa, sinangag rice, fried egg, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Dairy, Eggs, Soy",
        healthIndicators: "High Protein, Premium Silog Combo",
        nutrition: { calories: 890, protein: 40, carbs: 100, fat: 37 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-20',
        name: "Okoy w/ Halo-Halo",
        price: 210,
        ingredients: "Crispy golden shrimp okoy fritters with spicy vinegar, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Crustaceans, Dairy, Eggs, Gluten",
        healthIndicators: "Crispy Merienda Treat",
        nutrition: { calories: 750, protein: 22, carbs: 112, fat: 24 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },

      // ALL DAY BREAKFAST
      {
        id: 'kabigting-21',
        name: "Crispy Liempo w/ Rice",
        price: 140,
        ingredients: "Deep-fried golden pork belly slab, spiced vinegar dip, steamed white rice",
        allergens: "None / Allergen Free",
        healthIndicators: "High Protein",
        nutrition: { calories: 580, protein: 30, carbs: 45, fat: 33 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-22',
        name: "Chicken Tocino",
        price: 135,
        ingredients: "Sweet cured tender chicken fillets, garlic fried rice, sunny-side fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein, Lean Meat",
        nutrition: { calories: 510, protein: 29, carbs: 54, fat: 19 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-23',
        name: "Longsilog",
        price: 135,
        ingredients: "Pampanga native savory-sweet longanisa, sinangag rice, sunny fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein",
        nutrition: { calories: 540, protein: 24, carbs: 50, fat: 28 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-24',
        name: "Tocilog",
        price: 135,
        ingredients: "Cured Kapampangan sweet pork tocino, sinangag garlic rice, sunny-side fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein",
        nutrition: { calories: 530, protein: 26, carbs: 52, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-25',
        name: "Tapsilog (Pork)",
        price: 135,
        ingredients: "Savory marinated pork tapa strips, sinangag garlic rice, sunny-side fried egg",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 520, protein: 28, carbs: 46, fat: 25 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-26',
        name: "Beefsilog",
        price: 150,
        ingredients: "Tender cured beef tapa, garlic fried rice, sunny-side-up farm fried egg",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "High Protein, Iron Rich",
        nutrition: { calories: 550, protein: 32, carbs: 46, fat: 27 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-27',
        name: "Sisig w/ Rice",
        price: 160,
        ingredients: "Minced grilled pork sisig with onions and chili peppers, served with steamed white rice",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 590, protein: 33, carbs: 46, fat: 31 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-28',
        name: "Longanisa w/ Salted Egg",
        price: 170,
        ingredients: "Pampanga native longanisa, whole salted duck egg, fresh tomato slices, served with rice",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein, Traditional Breakfast",
        nutrition: { calories: 590, protein: 27, carbs: 48, fat: 32 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },

      // KOBE SPECIALTY CHICKEN & PORK
      {
        id: 'kabigting-29',
        name: "KOBE Chicken Meal",
        price: 130,
        ingredients: "Signature crispy seasoned Kobe-style fried chicken quarter, savory gravy, steamed rice",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 520, protein: 32, carbs: 46, fat: 22 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-30',
        name: "KOBE Chicken with Salted Egg",
        price: 160,
        ingredients: "Crispy Kobe chicken quarter paired with rich salted duck egg, savory gravy, steamed rice",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein, Savory Specialty",
        nutrition: { calories: 610, protein: 36, carbs: 47, fat: 29 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-31',
        name: "KOBE Chicken w/ Halo-Halo",
        price: 240,
        ingredients: "Crispy Kobe chicken meal with rice and gravy, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Gluten, Soy, Dairy (Halo-Halo)",
        healthIndicators: "High Protein, Complete Combo",
        nutrition: { calories: 860, protein: 40, carbs: 104, fat: 31 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-32',
        name: "KOBE Chicken (Whole) Cooked",
        price: 350,
        ingredients: "Whole crispy golden fried Kobe-style seasoned savory chicken, served with signature gravy",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein, Sharing Size (3-4 pax)",
        nutrition: { calories: 1280, protein: 120, carbs: 24, fat: 76 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-33',
        name: "KOBE Chicken (Whole) Uncooked",
        price: 275,
        ingredients: "Whole marinated raw Kobe-style chicken, ready for home cooking or frying",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Raw Take-Home",
        nutrition: { calories: 1100, protein: 120, carbs: 10, fat: 62 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-34',
        name: "KOBE Chicken Half",
        price: 185,
        ingredients: "Half portion of crispy golden Kobe-style fried chicken, served with savory gravy",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein, Sharing Size (2 pax)",
        nutrition: { calories: 640, protein: 60, carbs: 12, fat: 38 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-35',
        name: "KOBE Porkchop Meal",
        price: 130,
        ingredients: "Breaded and pan-fried tender Kobe seasoned porkchop cutlet, gravy, steamed white rice",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 540, protein: 30, carbs: 47, fat: 25 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-36',
        name: "KOBE Porkchop w/ Halo-Halo",
        price: 240,
        ingredients: "Crispy Kobe porkchop meal with rice, paired with special Kabigting's Halo-Halo",
        allergens: "Contains Gluten, Soy, Dairy (Halo-Halo)",
        healthIndicators: "High Protein, Value Combo",
        nutrition: { calories: 880, protein: 38, carbs: 105, fat: 34 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },

      // PALABOK IN BILAO
      {
        id: 'kabigting-37',
        name: "Palabok in Bilao (Small 3-5 pax)",
        price: 450,
        ingredients: "Traditional woven bamboo bilao filled with Kapampangan Pancit Palabok, tinapa flakes, chicharon, hard-boiled eggs, calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Group Sharing Size (3-5 pax)",
        nutrition: { calories: 1520, protein: 64, carbs: 192, fat: 56 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-38',
        name: "Palabok in Bilao (Medium 6-10 pax)",
        price: 650,
        ingredients: "Party bilao of authentic Kapampangan Palabok topped with generous shrimp sauce, eggs, crushed chicharon, scallions",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Group Sharing Size (6-10 pax)",
        nutrition: { calories: 2800, protein: 118, carbs: 350, fat: 104 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-39',
        name: "Palabok in Bilao (Large 10-20 pax)",
        price: 950,
        ingredients: "Extra-large fiesta bamboo bilao of rich savory Kapampangan Palabok, perfect for family reunions and gatherings",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Fiesta Gathering Size (10-20 pax)",
        nutrition: { calories: 5200, protein: 220, carbs: 650, fat: 195 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },

      // EXTRAS & SIDES
      {
        id: 'kabigting-40',
        name: "Bibingka",
        price: 85,
        ingredients: "Native baked rice cake topped with salted duck egg slices, grated fresh coconut, and melted butter",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "Traditional Kakanin",
        nutrition: { calories: 260, protein: 5, carbs: 42, fat: 8 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-41',
        name: "Salted Egg",
        price: 20,
        ingredients: "Cured Kapampangan red salted duck egg (itlog na maalat)",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein, Traditional Side",
        nutrition: { calories: 75, protein: 6, carbs: 1, fat: 5 },
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-42',
        name: "Fried Egg",
        price: 10,
        ingredients: "Fresh farm egg fried sunny-side-up",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein",
        nutrition: { calories: 70, protein: 6, carbs: 0, fat: 5 },
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-43',
        name: "Rice (Extra)",
        price: 25,
        ingredients: "Steamed extra fragrant white jasmine rice",
        allergens: "None / Allergen Free",
        healthIndicators: "Carbohydrate Energy Source",
        nutrition: { calories: 200, protein: 4, carbs: 44, fat: 0 },
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-44',
        name: "Puto (Extra)",
        price: 20,
        ingredients: "Soft steamed native rice cakes (puto rounds)",
        allergens: "Contains Gluten",
        healthIndicators: "Low Fat Native Snack",
        nutrition: { calories: 120, protein: 2, carbs: 26, fat: 1 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'kabigting-45',
        name: "Tomato (Extra)",
        price: 5,
        ingredients: "Freshly sliced ripe native tomatoes",
        allergens: "None / Allergen Free",
        healthIndicators: "Low Calorie, Vitamin C Rich",
        nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0 },
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-blessys-cuisine-arayat',
    name: "Blessy's Cuisine",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '08:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.1492,
    lng: 120.7694,
    categories: ['🍲 Kapampangan Catering & Garden Cafe', '🍧 Halo-Halo & Merienda', '🎉 Party Trays & Special Entrees'],
    description: "Popular Arayat culinary garden cafe and party catering specialist renowned for hearty Pancit Palabok & Malabon, signature Halo-Halo Duos, Fresh Lumpia, and celebration feast party trays.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Blessy's Cuisine Arayat Main Branch",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '08:00 AM - 09:00 PM',
        lat: 15.1492,
        lng: 120.7694
      }
    ],
    username: 'blessys_owner',
    password: 'password123',
    occupancy: [20, 35, 55, 75, 90, 85, 60, 45, 65, 80, 90, 70, 40, 20, 10],
    menu: [
      // ── DUO MEALS (Paired with Signature Halo-Halo) ──
      {
        id: 'blessy-1',
        name: "Okoy with Halo-Halo (Duo)",
        price: 118,
        ingredients: "Crispy golden fried shrimp and vegetable fritters, spiced vinegar dip, paired with signature Halo-Halo",
        allergens: "Contains Crustaceans, Dairy (Halo-Halo), Eggs, Gluten",
        healthIndicators: "Crispy Merienda Duo",
        nutrition: { calories: 510, protein: 14, carbs: 76, fat: 17 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-2',
        name: "Fresh Lumpia with Halo-Halo (Duo)",
        price: 128,
        ingredients: "Fresh homemade egg crepe, sautéed ubod (heart of palm), minced pork & shrimp, sweet garlic sauce, crushed peanuts, paired with signature Halo-Halo",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Dairy, Soy",
        healthIndicators: "High Fiber, Balanced Merienda Duo",
        nutrition: { calories: 480, protein: 15, carbs: 74, fat: 14 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-3',
        name: "Palabok with Halo-Halo (Duo)",
        price: 118,
        ingredients: "Rice noodles smothered in savory shrimp-achiote sauce, crushed chicharon, boiled egg, tinapa flakes, paired with signature Halo-Halo",
        allergens: "Contains Crustaceans, Eggs, Fish, Dairy, Gluten",
        healthIndicators: "High Protein, Bestseller Duo",
        nutrition: { calories: 560, protein: 18, carbs: 86, fat: 16 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-4',
        name: "Malabon with Halo-Halo (Duo)",
        price: 128,
        ingredients: "Thick round noodles in rich aligue (crab fat) & shrimp gravy, squid rings, egg slices, chicharon, paired with signature Halo-Halo",
        allergens: "Contains Crustaceans, Eggs, Fish, Dairy, Gluten",
        healthIndicators: "High Protein, Seafood Duo",
        nutrition: { calories: 590, protein: 20, carbs: 88, fat: 18 },
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-5',
        name: "Fried Lumpia with Halo-Halo (Duo)",
        price: 118,
        ingredients: "Crispy fried vegetable spring rolls, spiced vinegar dip, paired with signature Halo-Halo",
        allergens: "Contains Gluten, Dairy (Halo-Halo), Soy",
        healthIndicators: "Crispy Snack Duo",
        nutrition: { calories: 490, protein: 12, carbs: 72, fat: 17 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-6',
        name: "Baked Mac with Halo-Halo (Duo)",
        price: 128,
        ingredients: "Elbow macaroni baked with savory meat Bolognese and melted cheese sauce crust, paired with signature Halo-Halo",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein, Comfort Food Duo",
        nutrition: { calories: 640, protein: 22, carbs: 82, fat: 25 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },

      // ── SOLO MEALS & MERIENDA ──
      {
        id: 'blessy-7',
        name: "Halo-Halo (Solo)",
        price: 85,
        ingredients: "Creamy shaved ice, evaporated milk, sweetened beans, leche flan, gulaman, sago, ube halaya, sweetened saba",
        allergens: "Contains Dairy",
        healthIndicators: "Signature Refreshing Dessert",
        nutrition: { calories: 290, protein: 6, carbs: 52, fat: 7 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-8',
        name: "Fresh Lumpia (Solo)",
        price: 85,
        ingredients: "Fresh sautéed ubod (heart of palm) rolled in soft egg crepe, lettuce, sweet garlic sauce, and ground peanuts",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Soy",
        healthIndicators: "High Fiber, Low Calorie Merienda",
        nutrition: { calories: 210, protein: 8, carbs: 32, fat: 6 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-9',
        name: "Baked Mac (Solo)",
        price: 85,
        ingredients: "Single portion of oven-baked elbow macaroni in rich beef-tomato meat sauce with creamy golden cheese layer",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein, Comfort Pasta",
        nutrition: { calories: 370, protein: 16, carbs: 42, fat: 15 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-10',
        name: "Palabok (Solo)",
        price: 75,
        ingredients: "Traditional Kapampangan Pancit Palabok noodles with shrimp gravy, tinapa flakes, chicharon, hard-boiled egg slice",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "High Protein, Merienda Classic",
        nutrition: { calories: 310, protein: 12, carbs: 46, fat: 9 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-11',
        name: "Malabon (Solo)",
        price: 85,
        ingredients: "Thick round noodles tossed in rich crab fat and shrimp sauce, topped with squid rings, chicharon, and egg",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "High Protein, Seafood Specialty",
        nutrition: { calories: 340, protein: 14, carbs: 48, fat: 11 },
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-12',
        name: "Okoy (Solo)",
        price: 58,
        ingredients: "Crispy deep-fried shrimp and shredded vegetable fritters with spiced garlic vinegar dip",
        allergens: "Contains Crustaceans, Gluten, Eggs",
        healthIndicators: "Crispy Snack",
        nutrition: { calories: 220, protein: 8, carbs: 24, fat: 10 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-13',
        name: "Fried Lumpia (Solo)",
        price: 58,
        ingredients: "Golden fried vegetable spring rolls filled with seasoned bean sprouts and carrots, served with vinegar",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "Crispy Vegetable Snack",
        nutrition: { calories: 200, protein: 6, carbs: 22, fat: 10 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },

      // ── PARTY TRAYS (Noodles, Pasta & Lumpia) ──
      {
        id: 'blessy-14',
        name: "Pansit Palabok Party Tray (Medium 10-12 pax)",
        price: 600,
        ingredients: "Party tray of rich Kapampangan Palabok topped with shrimp gravy, tinapa flakes, chicharon, boiled eggs",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Sharing Size (10-12 pax)",
        nutrition: { calories: 3100, protein: 120, carbs: 460, fat: 90 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-15',
        name: "Pansit Palabok Party Tray (Large 20-22 pax)",
        price: 850,
        ingredients: "Extra-large celebration tray of Pancit Palabok loaded with shrimp sauce, crushed chicharon, egg slices, and calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 5500, protein: 215, carbs: 820, fat: 160 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-16',
        name: "Pansit Malabon Party Tray (Medium 10-12 pax)",
        price: 600,
        ingredients: "Medium party tray of thick round noodles coated in flavorful aligue crab-fat and shrimp sauce, squid, and eggs",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Sharing Size (10-12 pax)",
        nutrition: { calories: 3400, protein: 140, carbs: 480, fat: 110 },
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-17',
        name: "Pansit Malabon Party Tray (Large 20-22 pax)",
        price: 850,
        ingredients: "Grand celebration tray of signature Pancit Malabon with generous seafood and chicharon garnish",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 6100, protein: 250, carbs: 860, fat: 195 },
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-18',
        name: "Pansit Bihon Party Tray (Medium 10-12 pax)",
        price: 600,
        ingredients: "Sautéed thin bihon noodles, tender pork slices, chicken strips, julienned cabbage, carrots, and savory seasonings",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Fiber, Party Size (10-12 pax)",
        nutrition: { calories: 2700, protein: 110, carbs: 430, fat: 65 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-19',
        name: "Pansit Bihon Party Tray (Large 20-22 pax)",
        price: 850,
        ingredients: "Large feast tray of traditional stir-fried Pancit Bihon Guisado with garden vegetables and meats",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 4800, protein: 195, carbs: 770, fat: 115 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-20',
        name: "Pansit Canton Party Tray (Medium 10-12 pax)",
        price: 600,
        ingredients: "Stir-fried thick egg noodles with tender pork, chicken liver, snow peas, carrots, cabbage in savory oyster sauce",
        allergens: "Contains Eggs, Gluten, Soy, Molluscs",
        healthIndicators: "Party Size (10-12 pax)",
        nutrition: { calories: 3200, protein: 130, carbs: 470, fat: 95 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-21',
        name: "Pansit Canton Party Tray (Large 20-22 pax)",
        price: 850,
        ingredients: "Generous fiesta tray of hearty Pancit Canton with mixed meats and garden-fresh vegetables",
        allergens: "Contains Eggs, Gluten, Soy, Molluscs",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 5700, protein: 230, carbs: 840, fat: 170 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-22',
        name: "Fresh Lumpia Party Tray (15 rolls)",
        price: 650,
        ingredients: "15 individual homemade fresh ubod lumpia rolls with sweet peanut-garlic sauce and crushed nuts",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Soy",
        healthIndicators: "High Fiber, 15 Rolls Tray",
        nutrition: { calories: 3150, protein: 120, carbs: 480, fat: 90 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-23',
        name: "Fresh Lumpia Party Tray (30 rolls)",
        price: 950,
        ingredients: "30 individual fresh ubod lumpia rolls with sweet garlic sauce and crushed peanuts",
        allergens: "Contains Peanuts, Eggs, Crustaceans, Soy",
        healthIndicators: "High Fiber, 30 Rolls Celebration Tray",
        nutrition: { calories: 6300, protein: 240, carbs: 960, fat: 180 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-24',
        name: "Baked Mac Party Tray (Medium 10-12 pax)",
        price: 950,
        ingredients: "Party tray of baked macaroni loaded with beef Bolognese sauce, melted mornay cheese sauce crust",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Party Sharing Size (10-12 pax)",
        nutrition: { calories: 3700, protein: 160, carbs: 420, fat: 150 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-25',
        name: "Baked Mac Party Tray (Large 20-22 pax)",
        price: 1450,
        ingredients: "Celebration tray of golden baked macaroni with extra creamy melted cheese and rich meat sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 6600, protein: 285, carbs: 750, fat: 270 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-26',
        name: "Carbonara Party Tray (Medium 10-12 pax)",
        price: 850,
        ingredients: "Creamy pasta with crispy smoked bacon bits, sliced button mushrooms, parmesan cream sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Rich Creamy Pasta (10-12 pax)",
        nutrition: { calories: 3800, protein: 140, carbs: 390, fat: 190 },
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-27',
        name: "Carbonara Party Tray (Large 20-22 pax)",
        price: 1300,
        ingredients: "Large celebration tray of rich bacon and mushroom pasta carbonara with grated cheese",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 6800, protein: 250, carbs: 700, fat: 340 },
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-28',
        name: "Spaghetti Party Tray (Medium 10-12 pax)",
        price: 750,
        ingredients: "Filipino-style sweet-savory party spaghetti with minced ground meat, sliced red hotdogs, shredded cheddar cheese",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Kids & Family Favorite (10-12 pax)",
        nutrition: { calories: 3500, protein: 130, carbs: 490, fat: 120 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-29',
        name: "Spaghetti Party Tray (Large 20-22 pax)",
        price: 1250,
        ingredients: "Grand party tray of classic sweet meat sauce spaghetti with melted cheddar topping",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Fiesta Gathering Size (20-22 pax)",
        nutrition: { calories: 6300, protein: 235, carbs: 880, fat: 215 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },

      // ── CATERING & MAIN ENTREES ──
      {
        id: 'blessy-30',
        name: "Chicken Cordon Bleu Tray (Small 10-15 pax)",
        price: 800,
        ingredients: "Rolled breaded chicken breasts filled with savory ham and cheese, sliced with white cream dipping sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein (10-15 pax)",
        nutrition: { calories: 2800, protein: 220, carbs: 120, fat: 160 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-31',
        name: "Chicken Cordon Bleu Tray (Medium 20-30 pax)",
        price: 1400,
        ingredients: "Medium party tray of sliced golden chicken cordon bleu with creamy dipping sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein (20-30 pax)",
        nutrition: { calories: 5200, protein: 410, carbs: 220, fat: 300 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-32',
        name: "Chicken Cordon Bleu Tray (Large 40-50 pax)",
        price: 2575,
        ingredients: "Full catering banquet tray of crispy chicken cordon bleu rolls with garlic-cream sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 9500, protein: 750, carbs: 400, fat: 550 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-33',
        name: "Mixed Vegetables Tray (Small 10-15 pax)",
        price: 750,
        ingredients: "Fresh broccoli, cauliflower, carrots, young corn, and bell peppers sautéed in garlic butter",
        allergens: "Contains Dairy (Butter)",
        healthIndicators: "High Fiber, Vitamin Rich (10-15 pax)",
        nutrition: { calories: 950, protein: 35, carbs: 140, fat: 30 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-34',
        name: "Mixed Vegetables Tray (Medium 20-30 pax)",
        price: 1400,
        ingredients: "Medium party tray of buttered garden vegetables with quail eggs and mushrooms",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "High Fiber (20-30 pax)",
        nutrition: { calories: 1800, protein: 65, carbs: 260, fat: 60 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-35',
        name: "Mixed Vegetables Tray (Large 40-50 pax)",
        price: 2500,
        ingredients: "Large banquet tray of fresh sautéed buttered garden vegetables",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 3300, protein: 120, carbs: 480, fat: 110 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-36',
        name: "Pork Menudo Tray (Small 10-15 pax)",
        price: 1050,
        ingredients: "Tender stewed pork shoulder, liver cubes, potatoes, carrots, garbanzo beans in spiced tomato sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Iron Rich (10-15 pax)",
        nutrition: { calories: 2900, protein: 210, carbs: 150, fat: 165 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-37',
        name: "Pork Menudo Tray (Medium 20-30 pax)",
        price: 1900,
        ingredients: "Medium party tray of classic Kapampangan pork menudo with hotdog and raisins",
        allergens: "Contains Soy",
        healthIndicators: "High Protein (20-30 pax)",
        nutrition: { calories: 5400, protein: 390, carbs: 280, fat: 310 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-38',
        name: "Pork Menudo Tray (Large 40-50 pax)",
        price: 3625,
        ingredients: "Large catering banquet tray of slow-simmered rich pork menudo",
        allergens: "Contains Soy",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 9900, protein: 720, carbs: 510, fat: 570 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-39',
        name: "Beef Caldereta Tray (Small 10-15 pax)",
        price: 1100,
        ingredients: "Tender beef brisket cubes slow-cooked in rich tomato gravy, liver spread, cheese, bell peppers, olives",
        allergens: "Contains Dairy (Cheese)",
        healthIndicators: "High Protein, Rich in Iron (10-15 pax)",
        nutrition: { calories: 3200, protein: 240, carbs: 130, fat: 195 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-40',
        name: "Beef Caldereta Tray (Medium 20-30 pax)",
        price: 2000,
        ingredients: "Medium party tray of savory beef caldereta with potatoes, carrots, and sweet bell peppers",
        allergens: "Contains Dairy",
        healthIndicators: "High Protein (20-30 pax)",
        nutrition: { calories: 6000, protein: 450, carbs: 240, fat: 360 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-41',
        name: "Beef Caldereta Tray (Large 40-50 pax)",
        price: 3775,
        ingredients: "Grand banquet tray of melt-in-your-mouth beef caldereta in thick liver spread & tomato sauce",
        allergens: "Contains Dairy",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 11000, protein: 820, carbs: 440, fat: 660 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-42',
        name: "Pork Sisig Tray (Small 10-15 pax)",
        price: 750,
        ingredients: "Minced grilled pork face, ears, chicken liver, seasoned with calamansi, onions, green chili peppers",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Kapampangan Classic (10-15 pax)",
        nutrition: { calories: 2800, protein: 190, carbs: 45, fat: 210 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-43',
        name: "Pork Sisig Tray (Medium 20-30 pax)",
        price: 1300,
        ingredients: "Medium party tray of authentic savory Kapampangan pork sisig",
        allergens: "Contains Soy",
        healthIndicators: "High Protein (20-30 pax)",
        nutrition: { calories: 5200, protein: 350, carbs: 80, fat: 390 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-44',
        name: "Pork Sisig Tray (Large 40-50 pax)",
        price: 2000,
        ingredients: "Celebration banquet tray of flavorful minced Kapampangan pork sisig",
        allergens: "Contains Soy",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 9500, protein: 640, carbs: 150, fat: 710 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-45',
        name: "Chicken Sisig Tray (Small 10-15 pax)",
        price: 600,
        ingredients: "Grilled minced seasoned chicken breast and thigh, onions, chili peppers, calamansi seasoning",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Lean Meat (10-15 pax)",
        nutrition: { calories: 2100, protein: 210, carbs: 35, fat: 120 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-46',
        name: "Chicken Sisig Tray (Medium 20-30 pax)",
        price: 1100,
        ingredients: "Medium party tray of zesty, flavorful chicken sisig",
        allergens: "Contains Soy",
        healthIndicators: "High Protein (20-30 pax)",
        nutrition: { calories: 3900, protein: 390, carbs: 65, fat: 220 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-47',
        name: "Chicken Sisig Tray (Large 40-50 pax)",
        price: 1800,
        ingredients: "Large catering banquet tray of savory grilled chicken sisig",
        allergens: "Contains Soy",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 7200, protein: 720, carbs: 120, fat: 410 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-48',
        name: "Creamy Chopsuey Tray (Small 10-15 pax)",
        price: 500,
        ingredients: "Crisp sautéed cabbage, carrots, snow peas, quail eggs, pork slices in savory creamy sauce",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "High Fiber, Vitamin Rich (10-15 pax)",
        nutrition: { calories: 1200, protein: 55, carbs: 110, fat: 60 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-49',
        name: "Creamy Chopsuey Tray (Medium 20-30 pax)",
        price: 950,
        ingredients: "Medium party tray of fresh creamy vegetable chopsuey with meats and quail eggs",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "High Fiber (20-30 pax)",
        nutrition: { calories: 2300, protein: 105, carbs: 210, fat: 115 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-50',
        name: "Creamy Chopsuey Tray (Large 40-50 pax)",
        price: 1800,
        ingredients: "Large banquet tray of rich garden chopsuey with assorted meats and quail eggs",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 4300, protein: 195, carbs: 390, fat: 215 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-51',
        name: "Karekare Tray (Medium 20-30 pax)",
        price: 900,
        ingredients: "Stewed beef and pork cuts, tripe, banana blossoms, string beans, eggplant in rich roasted peanut sauce, with bagoong",
        allergens: "Contains Peanuts, Crustaceans (Bagoong)",
        healthIndicators: "High Protein, Kapampangan Specialty (20-30 pax)",
        nutrition: { calories: 4900, protein: 320, carbs: 190, fat: 320 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-52',
        name: "Karekare Tray (Large 40-50 pax)",
        price: 1650,
        ingredients: "Grand celebration tray of tender Karekare stew in thick peanut gravy served with sautéed shrimp paste",
        allergens: "Contains Peanuts, Crustaceans (Bagoong)",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 9100, protein: 590, carbs: 350, fat: 590 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-53',
        name: "Shanghai Rolls (50 pcs)",
        price: 550,
        ingredients: "50 pieces of golden fried crispy pork Lumpiang Shanghai rolls with sweet chili dip",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein, Party Finger Food (50 pcs)",
        nutrition: { calories: 2450, protein: 110, carbs: 190, fat: 140 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-54',
        name: "Shanghai Rolls (100 pcs)",
        price: 1000,
        ingredients: "100 pieces of crispy Lumpiang Shanghai rolls served with sweet chili dipping sauce",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Finger Food (100 pcs)",
        nutrition: { calories: 4900, protein: 220, carbs: 380, fat: 280 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-55',
        name: "Fish Fillet Tray (Small 10-15 pax)",
        price: 800,
        ingredients: "Crispy breaded golden cream dory fish fillets served with sweet-and-sour or tartar dip",
        allergens: "Contains Fish, Gluten, Eggs",
        healthIndicators: "High Protein, Pescatarian Friendly (10-15 pax)",
        nutrition: { calories: 2100, protein: 170, carbs: 130, fat: 95 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-56',
        name: "Fish Fillet Tray (Large 40-50 pax)",
        price: 2000,
        ingredients: "Large banquet tray of crispy golden fish fillet strips with dipping sauces",
        allergens: "Contains Fish, Gluten, Eggs",
        healthIndicators: "Banquet Size (40-50 pax)",
        nutrition: { calories: 5500, protein: 440, carbs: 340, fat: 250 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-57',
        name: "Pork Embutido (Per Roll)",
        price: 130,
        ingredients: "Steamed Filipino meatloaf roll of ground pork, Vienna sausages, raisins, hard-boiled egg, sweet pickle relish, cheese",
        allergens: "Contains Eggs, Dairy, Gluten",
        healthIndicators: "High Protein, Specialty Meatloaf (1 roll)",
        nutrition: { calories: 420, protein: 26, carbs: 18, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-58',
        name: "Chicken Galantina Roll (Per Roll)",
        price: 120,
        ingredients: "Traditional stuffed chicken galantina roll filled with ground chicken, ham, carrots, cheese, and native seasonings",
        allergens: "Contains Eggs, Dairy, Gluten",
        healthIndicators: "High Protein, Lean Specialty Roll (1 roll)",
        nutrition: { calories: 380, protein: 28, carbs: 14, fat: 24 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-59',
        name: "Relyenong Bangus (Per pc)",
        price: 250,
        ingredients: "Whole stuffed milkfish (bangus) filled with flaked fish meat, carrots, raisins, onions, and peas, oven-baked golden",
        allergens: "Contains Fish, Eggs, Gluten",
        healthIndicators: "High Protein, Omega-3 Rich, Heirloom Dish",
        nutrition: { calories: 620, protein: 48, carbs: 26, fat: 36 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'blessy-60',
        name: "Korean BBQ / Honey Glazed Wings (24 pcs)",
        price: 850,
        ingredients: "24 pieces of crispy fried chicken wings glazed in Korean BBQ sauce or sweet honey butter glaze",
        allergens: "Contains Soy, Gluten, Sesame",
        healthIndicators: "High Protein, Sharing Size (24 pcs)",
        nutrition: { calories: 2600, protein: 180, carbs: 110, fat: 160 },
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-erwins-sisigan-ningnangan-arayat',
    name: "Erwin's Sisigan & Ningnangan",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '10:00 AM - 11:00 PM',
    priceTier: '$',
    lat: 15.1510,
    lng: 120.7680,
    categories: ['🔥 Heritage Sisig & Grill', '🍻 Ningnangan & Pulutan', '🍲 Traditional Kapampangan Viands'],
    description: "Popular Arayat open-grill ningnangan and sisigan destination renowned for authentic sizzling Kapampangan Special Sisig, savory Bianda, Dinakdakan, fresh Sizzling Pusit, Bulalo, and fiesta party bilaos.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Erwin's Sisigan & Ningnangan Arayat Main",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '10:00 AM - 11:00 PM',
        lat: 15.1510,
        lng: 120.7680
      }
    ],
    username: 'erwins_owner',
    password: 'password123',
    occupancy: [15, 25, 45, 70, 85, 95, 90, 80, 85, 95, 90, 80, 50, 30, 15],
    menu: [
      // ── SIZZLING & SPECIAL SISIG ──
      {
        id: 'erwin-1',
        name: "Special Sisig",
        price: 180,
        ingredients: "Authentic grilled minced pork face, ears, chicken liver, fresh farm egg, onions, and siling labuyo on a sizzling hot plate",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "High Protein, Sizzling Specialty",
        nutrition: { calories: 540, protein: 34, carbs: 8, fat: 42 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-2',
        name: "Regular Sisig",
        price: 130,
        ingredients: "Char-grilled minced pork jowl and ears seasoned with calamansi, native onions, and chili peppers",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Kapampangan Classic",
        nutrition: { calories: 480, protein: 30, carbs: 6, fat: 38 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-3',
        name: "Special Bianda",
        price: 140,
        ingredients: "Traditional Kapampangan slow-simmered savory pork viand with rich native seasonings",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Heirloom Recipe",
        nutrition: { calories: 420, protein: 28, carbs: 10, fat: 30 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-4',
        name: "Bianda Sarsa",
        price: 140,
        ingredients: "Flavorful Kapampangan bianda stew cooked in thick rich savory sarsa gravy",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Savory Stew",
        nutrition: { calories: 450, protein: 26, carbs: 14, fat: 32 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-5',
        name: "Dinakdakan",
        price: 160,
        ingredients: "Char-grilled tender pork cuts tossed with sliced red onions, ginger, calamansi, and rich creamy dressing",
        allergens: "Contains Soy, Eggs",
        healthIndicators: "High Protein, Pulutan Favorite",
        nutrition: { calories: 490, protein: 32, carbs: 6, fat: 38 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-6',
        name: "Tokwa't Baboy",
        price: 130,
        ingredients: "Crispy golden fried tofu cubes and tender boiled pork slices in spiced soy-vinegar dressing with red onions and chilies",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 360, protein: 24, carbs: 12, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-7',
        name: "Lechon Kawali",
        price: 160,
        ingredients: "Crispy deep-fried seasoned pork belly slab with crackling golden skin, served with spiced vinegar dip",
        allergens: "None / Allergen Free",
        healthIndicators: "High Protein, Crispy Feast",
        nutrition: { calories: 580, protein: 32, carbs: 2, fat: 50 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-8',
        name: "Sizzling Pusit",
        price: 160,
        ingredients: "Fresh squid grilled to tenderness and served on a sizzling platter with sautéed onions, garlic, and sweet-savory glaze",
        allergens: "Contains Molluscs, Soy",
        healthIndicators: "High Protein, Low Calorie Seafood",
        nutrition: { calories: 280, protein: 28, carbs: 10, fat: 12 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-9',
        name: "Sizzling Salmon",
        price: 230,
        ingredients: "Pan-seared fresh salmon fillet served on a sizzling plate with garlic butter glaze and vegetables",
        allergens: "Contains Fish, Dairy (Butter)",
        healthIndicators: "High Protein, Omega-3 Rich, Pescatarian",
        nutrition: { calories: 380, protein: 34, carbs: 4, fat: 26 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-10',
        name: "Gising-Gising",
        price: 180,
        ingredients: "Fresh chopped green beans and winged beans simmered with ground pork in rich spiced coconut cream and green chilies",
        allergens: "Contains Coconut",
        healthIndicators: "High Fiber, Spicy Specialty",
        nutrition: { calories: 340, protein: 14, carbs: 18, fat: 24 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-11',
        name: "Crispy Pata",
        price: 700,
        ingredients: "Whole deep-fried crispy pork leg with tender melt-in-your-mouth meat and crunchy skin, served with spiced soy-vinegar dip",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Sharing Feast (3-4 pax)",
        nutrition: { calories: 1800, protein: 160, carbs: 6, fat: 125 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-12',
        name: "Chicharon Bulaklak",
        price: 250,
        ingredients: "Deep-fried crispy seasoned pork mesentery curls, golden and crunchy, served with spicy garlic vinegar",
        allergens: "None / Allergen Free",
        healthIndicators: "High Protein, Ultimate Pulutan",
        nutrition: { calories: 620, protein: 32, carbs: 2, fat: 54 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-13',
        name: "Bulalo",
        price: 320,
        ingredients: "Slow-simmered beef shank and marrow bone in rich flavorful beef broth with sweet corn on the cob, pechay, and cabbage",
        allergens: "None / Allergen Free",
        healthIndicators: "High Protein, Collagen Rich Soup",
        nutrition: { calories: 580, protein: 48, carbs: 12, fat: 38 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-14',
        name: "Lomi",
        price: 170,
        ingredients: "Thick egg noodles in hearty savory egg-drop broth, loaded with pork slices, chicken liver, meatballs, and chicharon",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein, Warm Comfort Soup",
        nutrition: { calories: 480, protein: 28, carbs: 54, fat: 18 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-15',
        name: "Chicken Joy (Platter)",
        price: 290,
        ingredients: "Crispy golden deep-fried seasoned chicken pieces served with savory brown gravy",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein, Family Favorite",
        nutrition: { calories: 720, protein: 56, carbs: 24, fat: 44 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-16',
        name: "Chicken Strips",
        price: 230,
        ingredients: "Crispy breaded tender chicken breast fillets served with creamy garlic dip or sweet chili sauce",
        allergens: "Contains Gluten, Eggs",
        healthIndicators: "High Protein, Lean Snack",
        nutrition: { calories: 420, protein: 36, carbs: 28, fat: 16 },
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-17',
        name: "French Fries",
        price: 80,
        ingredients: "Crispy golden fried potato shoestring fries lightly salted",
        allergens: "None / Allergen Free",
        healthIndicators: "Carb Snack",
        nutrition: { calories: 280, protein: 4, carbs: 36, fat: 14 },
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-18',
        name: "Pancit Guisado (Solo)",
        price: 110,
        ingredients: "Stir-fried bihon and canton noodles with pork, chicken strips, cabbage, carrots, and calamansi",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Fiber, Classic Merienda",
        nutrition: { calories: 340, protein: 16, carbs: 48, fat: 10 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-19',
        name: "Pancit Canton (Solo)",
        price: 120,
        ingredients: "Sautéed thick egg noodles with tender pork slices, chicken liver, and mixed vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 380, protein: 18, carbs: 50, fat: 12 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },

      // ── BILAO BILAO PARTY TRAYS ──
      {
        id: 'erwin-20',
        name: "Pancit Guisado in Bilao (Small 3-5 pax)",
        price: 600,
        ingredients: "Woven bamboo bilao filled with traditional stir-fried Pancit Guisado, seasoned meats, and garden vegetables",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Party Bilao Size (3-5 pax)",
        nutrition: { calories: 2400, protein: 105, carbs: 360, fat: 60 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-21',
        name: "Pancit Guisado in Bilao (Medium 6-10 pax)",
        price: 700,
        ingredients: "Medium party bilao of savory Pancit Guisado with generous pork, chicken, and fresh vegetable toppings",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Party Bilao Size (6-10 pax)",
        nutrition: { calories: 3800, protein: 165, carbs: 570, fat: 95 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-22',
        name: "Pancit Guisado in Bilao (Large 10-20 pax)",
        price: 850,
        ingredients: "Grand celebration fiesta bilao of authentic Kapampangan Pancit Guisado",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Fiesta Gathering Size (10-20 pax)",
        nutrition: { calories: 5600, protein: 240, carbs: 840, fat: 140 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-23',
        name: "Pancit Canton in Bilao (Small 3-5 pax)",
        price: 650,
        ingredients: "Bamboo bilao of thick stir-fried egg noodles with pork cuts, chicken liver, and crispy garden vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Bilao Size (3-5 pax)",
        nutrition: { calories: 2700, protein: 115, carbs: 380, fat: 75 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-24',
        name: "Pancit Canton in Bilao (Medium 6-10 pax)",
        price: 750,
        ingredients: "Medium party bilao of savory Pancit Canton loaded with meats and fresh vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Bilao Size (6-10 pax)",
        nutrition: { calories: 4200, protein: 180, carbs: 590, fat: 115 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-25',
        name: "Pancit Canton in Bilao (Large 10-20 pax)",
        price: 900,
        ingredients: "Extra-large fiesta celebration bilao of Pancit Canton with generous toppings",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Fiesta Gathering Size (10-20 pax)",
        nutrition: { calories: 6200, protein: 260, carbs: 870, fat: 170 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },

      // ── DESSERT, EXTRAS & DRINKS ──
      {
        id: 'erwin-26',
        name: "Leche Flan",
        price: 80,
        ingredients: "Rich creamy steamed egg yolk custard with golden amber caramel syrup",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "Classic Filipino Dessert",
        nutrition: { calories: 260, protein: 6, carbs: 36, fat: 11 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-27',
        name: "Extra Rice",
        price: 20,
        ingredients: "Steamed hot white jasmine rice",
        allergens: "None / Allergen Free",
        healthIndicators: "Energy Carbohydrate Source",
        nutrition: { calories: 200, protein: 4, carbs: 44, fat: 0 },
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-28',
        name: "San Mig Light",
        price: 70,
        ingredients: "Chilled bottle of San Mig Light low-calorie beer (330ml)",
        allergens: "Contains Gluten (Barley)",
        healthIndicators: "Chilled Alcoholic Beverage",
        nutrition: { calories: 100, protein: 1, carbs: 3, fat: 0 },
        image: "https://images.unsplash.com/photo-1608270192770-3882798e4d3c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-29',
        name: "Pale Pilsen",
        price: 70,
        ingredients: "Classic San Miguel Pale Pilsen beer (320ml)",
        allergens: "Contains Gluten (Barley)",
        healthIndicators: "Classic Filipino Beer",
        nutrition: { calories: 140, protein: 1, carbs: 10, fat: 0 },
        image: "https://images.unsplash.com/photo-1608270192770-3882798e4d3c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-30',
        name: "Red Horse Beer",
        price: 70,
        ingredients: "Extra strong Red Horse beer bottle (330ml)",
        allergens: "Contains Gluten (Barley)",
        healthIndicators: "Extra Strong Beer",
        nutrition: { calories: 160, protein: 1, carbs: 12, fat: 0 },
        image: "https://images.unsplash.com/photo-1608270192770-3882798e4d3c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-31',
        name: "Pineapple Juice",
        price: 50,
        ingredients: "Chilled 100% natural sweet pineapple juice in can",
        allergens: "None / Allergen Free",
        healthIndicators: "Vitamin C Rich Refreshment",
        nutrition: { calories: 120, protein: 1, carbs: 29, fat: 0 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'erwin-32',
        name: "Mineral Water",
        price: 20,
        ingredients: "Purified bottled drinking water (500ml)",
        allergens: "None / Allergen Free",
        healthIndicators: "Zero Calorie Hydration",
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-razons-halo-halo-arayat',
    name: "Razon's Halo-Halo",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '08:00 AM - 08:30 PM',
    priceTier: '$',
    lat: 15.1500,
    lng: 120.7690,
    categories: ['🍧 Halo-Halo & Desserts', '🍲 Classic Kapampangan Merienda', '🍱 Value Rice Meals'],
    description: "Legendary Guagua-heritage brand known across Pampanga for minimal, ultra-fine shaved ice Halo-Halo (macapuno, saba, leche flan), spicy Pancit Palabok, Sizzling Sisig, and hearty combo meals.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Razon's Halo-Halo Arayat Branch",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '08:00 AM - 08:30 PM',
        lat: 15.1500,
        lng: 120.7690
      }
    ],
    username: 'razons_owner',
    password: 'password123',
    occupancy: [15, 30, 60, 85, 95, 90, 65, 45, 60, 85, 95, 75, 45, 20, 10],
    menu: [
      // ── HOUSE SPECIALTY ──
      {
        id: 'razon-1',
        name: "Original Razon's Halo-Halo",
        price: 65,
        ingredients: "Finely shaved micro-ice, sweetened macapuno, caramelized saba banana, creamy leche flan, evaporated milk",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "Signature Heritage Dessert",
        nutrition: { calories: 290, protein: 6, carbs: 54, fat: 6 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-2',
        name: "Pancit Palabok (Spicy)",
        price: 60,
        ingredients: "Rice noodles, savory spicy shrimp-achiote gravy, crushed chicharon, boiled egg slice, calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "High Protein, Signature Merienda",
        nutrition: { calories: 330, protein: 12, carbs: 48, fat: 10 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-3',
        name: "Chicharon",
        price: 65,
        ingredients: "Crispy fried seasoned pork rinds, golden and crunchy",
        allergens: "None / Allergen Free",
        healthIndicators: "High Protein Snack",
        nutrition: { calories: 290, protein: 22, carbs: 1, fat: 22 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-4',
        name: "Dinuguan",
        price: 65,
        ingredients: "Savory pork blood stew simmered with tender pork cuts, vinegar, garlic, and green finger chilies",
        allergens: "Contains Soy",
        healthIndicators: "High Iron, Traditional Dish",
        nutrition: { calories: 340, protein: 26, carbs: 8, fat: 22 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-5',
        name: "Arrozcaldo",
        price: 60,
        ingredients: "Savory ginger rice porridge with tender chicken cuts, toasted garlic, scallions, boiled egg",
        allergens: "Contains Eggs",
        healthIndicators: "Comfort Food, Immune Boosting",
        nutrition: { calories: 280, protein: 16, carbs: 38, fat: 6 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-6',
        name: "Eggcaldo",
        price: 45,
        ingredients: "Warm ginger rice porridge served with hard-boiled egg and golden crispy garlic",
        allergens: "Contains Eggs",
        healthIndicators: "Light Meal",
        nutrition: { calories: 220, protein: 9, carbs: 36, fat: 4 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-7',
        name: "Beef Mami",
        price: 80,
        ingredients: "Egg noodles in rich slow-boiled beef broth with tender beef brisket slices, hard-boiled egg, and scallions",
        allergens: "Contains Eggs, Gluten",
        healthIndicators: "High Protein Soup",
        nutrition: { calories: 390, protein: 24, carbs: 46, fat: 12 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-8',
        name: "Fresh Lumpia",
        price: 55,
        ingredients: "Fresh heart of palm (ubod) rolled in thin egg crepe with lettuce, sweet brown garlic glaze, and peanuts",
        allergens: "Contains Peanuts, Eggs, Soy",
        healthIndicators: "High Fiber Snack",
        nutrition: { calories: 190, protein: 7, carbs: 28, fat: 5 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-9',
        name: "Fried Lumpia",
        price: 30,
        ingredients: "Crispy fried vegetable spring roll filled with bean sprouts and carrots, served with spiced vinegar",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "Crispy Snack",
        nutrition: { calories: 140, protein: 4, carbs: 16, fat: 7 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-10',
        name: "Lumpiang Shanghai",
        price: 45,
        ingredients: "Crispy mini golden pork spring rolls served with sweet chili dipping sauce",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein Snack",
        nutrition: { calories: 240, protein: 12, carbs: 18, fat: 14 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-11',
        name: "Puto Singles",
        price: 8,
        ingredients: "Soft steamed native white rice cake with cheese slice",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Low Fat Native Snack",
        nutrition: { calories: 60, protein: 1, carbs: 13, fat: 1 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-12',
        name: "Puto Box (10 pcs)",
        price: 80,
        ingredients: "Box of 10 soft steamed native white rice cakes with cheese topping",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Sharing Box (10 pcs)",
        nutrition: { calories: 600, protein: 12, carbs: 130, fat: 6 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-13',
        name: "Halo-Halo Smoothie",
        price: 80,
        ingredients: "Blended creamy Razon's halo-halo shake with saba, macapuno, and boba pearls",
        allergens: "Contains Dairy",
        healthIndicators: "Cold Blended Beverage",
        nutrition: { calories: 310, protein: 5, carbs: 62, fat: 5 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-14',
        name: "Palabok Bilao (Medium 6-8 pax)",
        price: 350,
        ingredients: "Sharing bilao of spicy Razon's Pancit Palabok with rich orange shrimp gravy and egg slices",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Sharing Size (6-8 pax)",
        nutrition: { calories: 2100, protein: 80, carbs: 320, fat: 60 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-15',
        name: "Palabok Bilao (Large 12-15 pax)",
        price: 550,
        ingredients: "Large celebration bilao of Pancit Palabok with crushed chicharon and calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Fiesta Gathering Size (12-15 pax)",
        nutrition: { calories: 3800, protein: 145, carbs: 580, fat: 110 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },

      // ── EVERYDAY FAVORITES ──
      {
        id: 'razon-16',
        name: "Kare-Kare",
        price: 180,
        ingredients: "Tender beef and tripe stewed in rich peanut sauce with eggplant, string beans, and bagoong",
        allergens: "Contains Peanuts, Crustaceans (Bagoong)",
        healthIndicators: "High Protein Classic",
        nutrition: { calories: 520, protein: 32, carbs: 16, fat: 36 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-17',
        name: "Sizzling Sisig",
        price: 165,
        ingredients: "Crispy grilled minced pork, chicken liver, and onions on a sizzling hot cast-iron plate",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Kapampangan Sisig",
        nutrition: { calories: 480, protein: 28, carbs: 6, fat: 38 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-18',
        name: "Sizzling Porkchop",
        price: 135,
        ingredients: "Tender marinated pork chop seared on a sizzling plate with savory mushroom gravy",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 440, protein: 34, carbs: 8, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-19',
        name: "Sizzling Chicken",
        price: 135,
        ingredients: "Golden crispy fried chicken cutlet served sizzling with savory sauce and mixed vegetables",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 460, protein: 38, carbs: 10, fat: 28 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-20',
        name: "Boneless Bangus",
        price: 145,
        ingredients: "Pan-fried marinated boneless milkfish (bangus) with garlic and vinegar dipping sauce",
        allergens: "Contains Fish",
        healthIndicators: "High Protein, Omega-3 Rich",
        nutrition: { calories: 380, protein: 36, carbs: 2, fat: 24 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },

      // ── RICE MEALS (with free iced tea) ──
      {
        id: 'razon-21',
        name: "Sisig Rice Meal (with Lumpia/Shanghai & Free Iced Tea)",
        price: 110,
        ingredients: "Sizzling pork sisig, steamed rice, side choice of fresh lumpia, fried lumpia, or shanghai, with iced tea",
        allergens: "Contains Soy, Gluten, Eggs",
        healthIndicators: "Complete Combo Value Meal",
        nutrition: { calories: 680, protein: 34, carbs: 74, fat: 28 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-22',
        name: "Dinuguan Rice Meal (with Lumpia/Shanghai & Free Iced Tea)",
        price: 110,
        ingredients: "Savory pork dinuguan, steamed white rice, side lumpia or shanghai, with free iced tea",
        allergens: "Contains Soy, Gluten, Eggs",
        healthIndicators: "Complete Combo Value Meal",
        nutrition: { calories: 640, protein: 32, carbs: 76, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-23',
        name: "Porkchop Rice Meal (with Lumpia/Shanghai & Free Iced Tea)",
        price: 105,
        ingredients: "Breaded pork chop cutlet with gravy, steamed rice, lumpia/shanghai side, and iced tea",
        allergens: "Contains Gluten, Eggs, Soy",
        healthIndicators: "High Protein Combo Meal",
        nutrition: { calories: 690, protein: 36, carbs: 78, fat: 26 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-24',
        name: "Chicken Rice Meal (with Lumpia/Shanghai & Free Iced Tea)",
        price: 105,
        ingredients: "Golden fried chicken cutlet, steamed rice, brown gravy, lumpia/shanghai, and iced tea",
        allergens: "Contains Gluten, Eggs, Soy",
        healthIndicators: "High Protein Combo Meal",
        nutrition: { calories: 670, protein: 38, carbs: 76, fat: 24 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-25',
        name: "Bangus Belly Rice Meal (with Lumpia/Shanghai & Free Iced Tea)",
        price: 95,
        ingredients: "Pan-seared marinated bangus belly, steamed white rice, lumpia/shanghai, and iced tea",
        allergens: "Contains Fish, Gluten, Eggs",
        healthIndicators: "Pescatarian Combo Meal",
        nutrition: { calories: 590, protein: 32, carbs: 72, fat: 20 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-26',
        name: "Kare-Kare Rice Meal (with Shanghai & Free Iced Tea)",
        price: 110,
        ingredients: "Beef & tripe Kare-Kare stew with peanut sauce, bagoong, steamed rice, lumpiang shanghai, and iced tea",
        allergens: "Contains Peanuts, Crustaceans, Gluten, Eggs",
        healthIndicators: "Heritage Combo Meal",
        nutrition: { calories: 710, protein: 35, carbs: 78, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-27',
        name: "Tapsilog",
        price: 85,
        ingredients: "Cured beef tapa strips, garlic fried sinangag rice, sunny-side-up fried egg, vinegar dip",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "Classic Filipino Breakfast",
        nutrition: { calories: 580, protein: 30, carbs: 64, fat: 22 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },

      // ── SANDWICHES ──
      {
        id: 'razon-28',
        name: "Double Cheese Burger",
        price: 50,
        ingredients: "Two beef patties, double sliced American cheese, special sauce in toasted sesame bun",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "High Protein Burger",
        nutrition: { calories: 450, protein: 26, carbs: 32, fat: 24 },
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-29',
        name: "Cheese Burger",
        price: 40,
        ingredients: "Grilled beef patty with melted cheese, lettuce, and creamy burger dressing",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Classic Burger",
        nutrition: { calories: 340, protein: 18, carbs: 30, fat: 16 },
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-30',
        name: "Burger",
        price: 35,
        ingredients: "Grilled beef patty with sweet-savory dressing in toasted burger bun",
        allergens: "Contains Gluten",
        healthIndicators: "Snack Burger",
        nutrition: { calories: 290, protein: 14, carbs: 30, fat: 12 },
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-31',
        name: "Ham & Cheese Sandwich",
        price: 40,
        ingredients: "Sliced savory ham, melted cheddar cheese, mayo spread in toasted bread",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Merienda Sandwich",
        nutrition: { calories: 280, protein: 14, carbs: 26, fat: 13 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-32',
        name: "Ham Sandwich",
        price: 35,
        ingredients: "Sliced seasoned ham in soft sandwich bread with mayonnaise",
        allergens: "Contains Gluten",
        healthIndicators: "Light Sandwich",
        nutrition: { calories: 220, protein: 10, carbs: 25, fat: 8 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-33',
        name: "Chicken Sandwich",
        price: 45,
        ingredients: "Shredded seasoned chicken breast spread with diced carrots and celery in soft sandwich bread",
        allergens: "Contains Eggs, Gluten",
        healthIndicators: "High Protein Sandwich",
        nutrition: { calories: 260, protein: 16, carbs: 26, fat: 10 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-34',
        name: "Tuna Sandwich",
        price: 45,
        ingredients: "Flaked tuna in light mayonnaise spread with onions in toasted sandwich bread",
        allergens: "Contains Fish, Eggs, Gluten",
        healthIndicators: "Pescatarian, Lean Snack",
        nutrition: { calories: 250, protein: 17, carbs: 25, fat: 9 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },

      // ── DRINKS ──
      {
        id: 'razon-35',
        name: "Fruit Juice / Ice Tea",
        price: 35,
        ingredients: "Chilled sweetened citrus fruit juice or house-brewed iced tea",
        allergens: "None / Allergen Free",
        healthIndicators: "Chilled Refreshment",
        nutrition: { calories: 90, protein: 0, carbs: 23, fat: 0 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'razon-36',
        name: "Brewed Coffee",
        price: 45,
        ingredients: "Freshly brewed Kapeng Barako hot coffee",
        allergens: "None / Allergen Free",
        healthIndicators: "Zero Calorie Caffeine",
        nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 },
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-fhinas-panciteria-arayat',
    name: "Fhinas Panciteria",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '07:30 AM - 08:00 PM',
    priceTier: '$',
    lat: 15.1485,
    lng: 120.7710,
    categories: ['🎋 Authentic Bilao Panciteria', '🍲 Kapampangan Noodle House', '🎉 Celebration Trays'],
    description: "Beloved Arayat traditional noodle house and fiesta catering institution renowned for freshly cooked heirloom Pancit Guisado, Palabok, Canton, Pancit Mix, Malabon, Spaghetti, and Carbonara in Small, Party, and Family Bilaos.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Fhinas Panciteria Arayat Branch",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '07:30 AM - 08:00 PM',
        lat: 15.1485,
        lng: 120.7710
      }
    ],
    username: 'fhinas_owner',
    password: 'password123',
    occupancy: [20, 40, 65, 80, 90, 85, 60, 40, 55, 75, 85, 65, 35, 15, 10],
    menu: [
      // ── BILAO SPECIALTIES ──
      {
        id: 'fhina-1',
        name: "Pancit Guisado (Small Bilao)",
        price: 800,
        ingredients: "Stir-fried bihon noodles with sliced pork, chicken, shredded cabbage, carrots, bell peppers, and calamansi in small woven bilao",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Party Bilao Size (Small)",
        nutrition: { calories: 2800, protein: 120, carbs: 430, fat: 65 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-2',
        name: "Pancit Guisado (Party Bilao)",
        price: 900,
        ingredients: "Party-sized bilao of savory Pancit Guisado loaded with seasoned pork cuts and crisp vegetables",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Party Gathering Size",
        nutrition: { calories: 4200, protein: 180, carbs: 640, fat: 95 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-3',
        name: "Pancit Guisado (Family Bilao)",
        price: 1100,
        ingredients: "Grand family fiesta bilao of traditional Kapampangan Pancit Guisado with generous meat toppings",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "Family Feast Size (Large)",
        nutrition: { calories: 5800, protein: 250, carbs: 880, fat: 135 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-4',
        name: "Pancit Palabok (Small Bilao)",
        price: 800,
        ingredients: "Small bilao of rice noodles smothered in rich shrimp-achiote gravy, crushed chicharon, boiled eggs, tinapa",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Bilao Size (Small)",
        nutrition: { calories: 3100, protein: 120, carbs: 460, fat: 90 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-5',
        name: "Pancit Palabok (Party Bilao)",
        price: 900,
        ingredients: "Party bilao of flavorful Pancit Palabok with egg slices, chicharon flakes, and fresh calamansi",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Gathering Size",
        nutrition: { calories: 4600, protein: 175, carbs: 680, fat: 130 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-6',
        name: "Pancit Palabok (Family Bilao)",
        price: 1100,
        ingredients: "Full family celebration bilao of authentic Kapampangan Pancit Palabok with overloaded toppings",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Family Feast Size (Large)",
        nutrition: { calories: 6200, protein: 240, carbs: 920, fat: 175 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-7',
        name: "Pancit Canton (Small Bilao)",
        price: 800,
        ingredients: "Small bilao of stir-fried thick egg noodles with tender pork, chicken liver, cabbage, snow peas, and carrots",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Bilao Size (Small)",
        nutrition: { calories: 3200, protein: 130, carbs: 470, fat: 95 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-8',
        name: "Pancit Canton (Party Bilao)",
        price: 950,
        ingredients: "Party bilao of savory Pancit Canton loaded with assorted meats and garden vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Gathering Size",
        nutrition: { calories: 4800, protein: 195, carbs: 700, fat: 140 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-9',
        name: "Pancit Canton (Family Bilao)",
        price: 1200,
        ingredients: "Large family celebration bilao of Pancit Canton with generous savory meat sauce and vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Family Feast Size (Large)",
        nutrition: { calories: 6500, protein: 260, carbs: 950, fat: 190 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-10',
        name: "Pancit Mix [Bihon-Canton] (Small Bilao)",
        price: 800,
        ingredients: "Small bilao of delicious combination of thin bihon and thick canton egg noodles stir-fried with meats and vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Bilao Size (Small)",
        nutrition: { calories: 3000, protein: 125, carbs: 450, fat: 80 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-11',
        name: "Pancit Mix [Bihon-Canton] (Party Bilao)",
        price: 950,
        ingredients: "Party bilao of bihon and canton mix noodles tossed in savory oyster-garlic sauce with seasoned pork",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Gathering Size",
        nutrition: { calories: 4500, protein: 185, carbs: 670, fat: 120 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-12',
        name: "Pancit Mix [Bihon-Canton] (Family Bilao)",
        price: 1200,
        ingredients: "Grand family feast bilao of Pancit Mix with extra pork cuts, chicken liver, and crispy vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Family Feast Size (Large)",
        nutrition: { calories: 6200, protein: 250, carbs: 920, fat: 165 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-13',
        name: "Pancit Malabon (Family Bilao)",
        price: 1200,
        ingredients: "Grand family bilao of thick rice noodles tossed in authentic crab fat and shrimp sauce, squid rings, egg slices, chicharon",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Seafood Specialty Bilao (Family Size)",
        nutrition: { calories: 6400, protein: 260, carbs: 900, fat: 210 },
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-14',
        name: "Spaghetti (Family Bilao)",
        price: 1200,
        ingredients: "Full family celebration bilao of sweet-savory party spaghetti loaded with ground pork, sliced red hotdogs, and cheddar cheese",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Kids & Family Party Favorite",
        nutrition: { calories: 6300, protein: 235, carbs: 880, fat: 215 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-15',
        name: "Carbonara (Family Bilao)",
        price: 1200,
        ingredients: "Grand family bilao of rich creamy pasta carbonara with crispy smoked bacon bits, sliced mushrooms, and parmesan",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Creamy Feast Bilao",
        nutrition: { calories: 6800, protein: 250, carbs: 700, fat: 340 },
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
      },

      // ── ALA CARTE / MERIENDA PORTIONS ──
      {
        id: 'fhina-16',
        name: "Pancit Guisado (Solo Plate)",
        price: 90,
        ingredients: "Single order of stir-fried bihon noodles with pork and vegetables",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Fiber Snack",
        nutrition: { calories: 310, protein: 14, carbs: 46, fat: 8 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-17',
        name: "Pancit Palabok (Solo Plate)",
        price: 95,
        ingredients: "Single serving of rich orange shrimp sauce palabok with egg and chicharon",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 340, protein: 14, carbs: 48, fat: 11 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-18',
        name: "Pancit Canton (Solo Plate)",
        price: 95,
        ingredients: "Single portion of stir-fried thick egg noodles with meat and vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 360, protein: 16, carbs: 48, fat: 12 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-19',
        name: "Spaghetti (Solo Plate)",
        price: 100,
        ingredients: "Filipino-style sweet meat sauce spaghetti with cheese and sliced hotdog",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Comfort Food",
        nutrition: { calories: 390, protein: 15, carbs: 54, fat: 14 },
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-20',
        name: "Carbonara (Solo Plate)",
        price: 110,
        ingredients: "Creamy bacon and mushroom pasta carbonara with grated parmesan cheese",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "Rich Creamy Pasta",
        nutrition: { calories: 420, protein: 16, carbs: 44, fat: 22 },
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'fhina-21',
        name: "Bottled Water / Softdrinks",
        price: 25,
        ingredients: "Chilled bottled water (500ml) or canned softdrink",
        allergens: "None / Allergen Free",
        healthIndicators: "Refreshment",
        nutrition: { calories: 100, protein: 0, carbs: 26, fat: 0 },
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-jurados-5-arayat',
    name: "Jurado's 5",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '09:00 AM - 10:00 PM',
    priceTier: '$$',
    lat: 15.1520,
    lng: 120.7675,
    categories: ['🍱 Japanese Fusion & Sushi', '🍲 Bianda & Sizzling Rice Meals', '🎋 Made-to-Order Bilaos'],
    description: "Popular Arayat culinary destination offering a vibrant fusion of authentic Kapampangan favorites, savory Bianda viands, made-to-order party bilaos, all-day Altanghap silogs, and freshly rolled Japanese Maki & Sushi party platters.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Jurado's 5 Arayat Branch",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '09:00 AM - 10:00 PM',
        lat: 15.1520,
        lng: 120.7675
      }
    ],
    username: 'jurados5_owner',
    password: 'password123',
    occupancy: [10, 25, 50, 75, 90, 85, 65, 50, 70, 85, 95, 80, 50, 25, 15],
    menu: [
      // ── SUSHI ROLLS & PARTY PLATTERS ──
      {
        id: 'jurado-1',
        name: "California Maki",
        price: 140,
        ingredients: "Crab stick (kani), ripe mango slices, fresh cucumber, Japanese nori, sushi rice, coated in orange tobiko",
        allergens: "Contains Crustaceans, Fish (Roe), Soy",
        healthIndicators: "High Protein, Fresh Sushi Roll",
        nutrition: { calories: 290, protein: 10, carbs: 48, fat: 6 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-2',
        name: "Korean Kimbap",
        price: 140,
        ingredients: "Seasoned beef/ham, yellow pickled radish (danmuji), carrots, spinach, egg ribbon rolled in sesame-scented nori",
        allergens: "Contains Eggs, Sesame, Soy",
        healthIndicators: "High Fiber, Korean Specialty Roll",
        nutrition: { calories: 310, protein: 12, carbs: 50, fat: 7 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-3',
        name: "Chicken Teriyaki Sushi Roll",
        price: 140,
        ingredients: "Grilled tender chicken glazed in sweet savory teriyaki sauce, cucumber, sesame seeds, sushi rice roll",
        allergens: "Contains Soy, Sesame, Gluten",
        healthIndicators: "High Protein Maki",
        nutrition: { calories: 330, protein: 16, carbs: 46, fat: 8 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-4',
        name: "Cheesy Bacon Sushi Roll",
        price: 140,
        ingredients: "Smoked crispy bacon bits, cream cheese, cucumber, torch-melted cheddar glaze over seasoned sushi rice",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "Rich Fusion Roll",
        nutrition: { calories: 360, protein: 14, carbs: 44, fat: 14 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-5',
        name: "Volcano Roll (Spicy)",
        price: 210,
        ingredients: "Baked spicy kani and seafood mixture layered over California roll with spicy Japanese mayo and sriracha unagi drizzle",
        allergens: "Contains Crustaceans, Fish, Eggs, Soy",
        healthIndicators: "High Protein, Spicy Fusion",
        nutrition: { calories: 420, protein: 16, carbs: 46, fat: 18 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-6',
        name: "Dragon Ball Sushi",
        price: 210,
        ingredients: "Crispy tempura shrimp roll topped with creamy avocado, sweet unagi sauce, and spicy kewpie drizzle",
        allergens: "Contains Crustaceans, Gluten, Eggs, Soy",
        healthIndicators: "Premium Specialty Roll",
        nutrition: { calories: 440, protein: 18, carbs: 48, fat: 19 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-7',
        name: "Sushi Party Platter (32 Rolls)",
        price: 459,
        ingredients: "32-piece assorted party platter featuring California Maki, Korean Kimbap, Chicken Teriyaki, and Cheesy Bacon rolls",
        allergens: "Contains Crustaceans, Eggs, Dairy, Soy, Sesame",
        healthIndicators: "Party Platter Size (32 Rolls)",
        nutrition: { calories: 1300, protein: 48, carbs: 190, fat: 38 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-8',
        name: "Sushi Party Platter (56 Rolls)",
        price: 680,
        ingredients: "56-piece grand celebration platter with mixed signature maki rolls, wasabi, pickled ginger, and soy sauce",
        allergens: "Contains Crustaceans, Eggs, Dairy, Soy, Sesame",
        healthIndicators: "Party Platter Size (56 Rolls)",
        nutrition: { calories: 2300, protein: 84, carbs: 330, fat: 66 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-9',
        name: "Sushi Party Platter (72 Rolls)",
        price: 910,
        ingredients: "72-piece mega feast platter featuring assorted premium maki and kimbap rolls",
        allergens: "Contains Crustaceans, Eggs, Dairy, Soy, Sesame",
        healthIndicators: "Fiesta Platter Size (72 Rolls)",
        nutrition: { calories: 2950, protein: 110, carbs: 430, fat: 85 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-10',
        name: "Special Sushi Platter (72 Rolls in Special Platter)",
        price: 1010,
        ingredients: "72-piece deluxe chef's special sushi platter including Volcano Rolls, Dragon Ball, California Maki, and Cheesy Bacon",
        allergens: "Contains Crustaceans, Fish, Eggs, Dairy, Soy, Sesame",
        healthIndicators: "Grand Deluxe Banquet Size (72 Rolls)",
        nutrition: { calories: 3400, protein: 130, carbs: 450, fat: 115 },
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80"
      },

      // ── FAVORITES & NOODLES ──
      {
        id: 'jurado-11',
        name: "Special Halo-Halo",
        price: 109,
        ingredients: "Shaved ice, creamy milk, sweet beans, saba, ube halaya, leche flan, cheese topping, and ice cream scoop",
        allergens: "Contains Dairy, Eggs",
        healthIndicators: "Signature Refreshing Dessert",
        nutrition: { calories: 360, protein: 8, carbs: 62, fat: 9 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-12',
        name: "Crab Roll",
        price: 150,
        ingredients: "Crispy fried kani crab stick rolls served with creamy sweet garlic dip",
        allergens: "Contains Crustaceans, Gluten, Eggs",
        healthIndicators: "Crispy Appetizer",
        nutrition: { calories: 280, protein: 12, carbs: 24, fat: 14 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-13',
        name: "Caesar Salad / Kani Salad / Garden Salad",
        price: 209,
        ingredients: "Fresh crisp romaine lettuce, kani shreds, cucumber, croutons, parmesan cheese, creamy Caesar dressing",
        allergens: "Contains Crustaceans, Dairy, Eggs",
        healthIndicators: "High Fiber, Nutrient Rich Salad",
        nutrition: { calories: 240, protein: 10, carbs: 16, fat: 15 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-14',
        name: "Lomi (Chicken or Pork)",
        price: 95,
        ingredients: "Thick egg noodles in savory broth with pork/chicken cuts, meatballs, liver, and egg drops",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Warm Noodle Soup",
        nutrition: { calories: 440, protein: 24, carbs: 50, fat: 16 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-15',
        name: "Lomi Beef",
        price: 105,
        ingredients: "Thick egg noodles with tender beef slices in rich savory egg drop soup",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein Soup",
        nutrition: { calories: 470, protein: 28, carbs: 50, fat: 17 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-16',
        name: "Mami (Chicken or Pork)",
        price: 95,
        ingredients: "Fresh egg noodles in clear chicken/pork broth with sliced meat, hard-boiled egg, and scallions",
        allergens: "Contains Eggs, Gluten",
        healthIndicators: "Classic Comfort Soup",
        nutrition: { calories: 360, protein: 20, carbs: 46, fat: 10 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-17',
        name: "Mami Beef",
        price: 105,
        ingredients: "Egg noodle soup with tender stewed beef brisket cubes, boiled egg, toasted garlic, and broth",
        allergens: "Contains Eggs, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 410, protein: 26, carbs: 46, fat: 13 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-18',
        name: "Bihon May Sabaw",
        price: 95,
        ingredients: "Thin bihon rice noodles in savory broth with chicken strips, cabbage, and carrots",
        allergens: "Contains Soy",
        healthIndicators: "Light Rice Noodle Soup",
        nutrition: { calories: 290, protein: 14, carbs: 44, fat: 6 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-19',
        name: "Bihon Guisado",
        price: 95,
        ingredients: "Stir-fried bihon noodles with sliced pork, chicken, julienned vegetables, and calamansi",
        allergens: "Contains Soy, Gluten",
        healthIndicators: "High Fiber Merienda",
        nutrition: { calories: 320, protein: 15, carbs: 48, fat: 8 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-20',
        name: "Miki Guisado",
        price: 95,
        ingredients: "Sautéed thick miki egg noodles with pork, liver, cabbage, and savory seasonings",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein Noodle",
        nutrition: { calories: 360, protein: 17, carbs: 48, fat: 11 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-21',
        name: "Miki-Bihon Mix",
        price: 95,
        ingredients: "Combined miki and bihon noodles stir-fried with meats and garden vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Popular Combination Noodle",
        nutrition: { calories: 340, protein: 16, carbs: 48, fat: 9 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-22',
        name: "Lomi Guisado",
        price: 95,
        ingredients: "Dry stir-fried thick lomi egg noodles with pork cuts, meatballs, and crunchy vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Savory Fried Noodles",
        nutrition: { calories: 370, protein: 18, carbs: 49, fat: 12 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-23',
        name: "Palabok",
        price: 95,
        ingredients: "Rice noodles coated in shrimp-achiote gravy, topped with tinapa flakes, chicharon, and egg slices",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Kapampangan Classic",
        nutrition: { calories: 340, protein: 14, carbs: 48, fat: 10 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-24',
        name: "Pancit Canton",
        price: 105,
        ingredients: "Stir-fried thick canton noodles with tender pork, chicken liver, snow peas, carrots, cabbage",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 380, protein: 18, carbs: 50, fat: 12 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-25',
        name: "Bihon-Canton Mix",
        price: 105,
        ingredients: "Stir-fried bihon and canton egg noodles with assorted meat toppings and vegetables",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Merienda Favorite",
        nutrition: { calories: 350, protein: 17, carbs: 49, fat: 10 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-26',
        name: "Japchae",
        price: 130,
        ingredients: "Korean sweet potato glass noodles stir-fried in sesame-soy sauce with beef strips, mushrooms, spinach, and carrots",
        allergens: "Contains Sesame, Soy",
        healthIndicators: "High Fiber, Korean Specialty",
        nutrition: { calories: 330, protein: 12, carbs: 52, fat: 8 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-27',
        name: "Clubhouse Sandwich",
        price: 189,
        ingredients: "Triple-decker toasted sandwich layered with sliced chicken, ham, cheese, egg, bacon, lettuce, and tomato with fries",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein Club Meal",
        nutrition: { calories: 580, protein: 28, carbs: 48, fat: 30 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-28',
        name: "Egg Drop Sandwich / Grilled Tuna Sandwich",
        price: 130,
        ingredients: "Thick brioche toast filled with fluffy scrambled eggs, sweet creamy sauce, melted cheese, or savory grilled tuna",
        allergens: "Contains Dairy, Eggs, Gluten, Fish",
        healthIndicators: "Korean Egg Drop Style",
        nutrition: { calories: 420, protein: 18, carbs: 36, fat: 22 },
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-29',
        name: "Fries Solo",
        price: 80,
        ingredients: "Crispy golden fried shoestring potato fries",
        allergens: "None / Allergen Free",
        healthIndicators: "Carb Snack",
        nutrition: { calories: 280, protein: 4, carbs: 36, fat: 14 },
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=500&q=80"
      },

      // ── ALTANGHAP / SILOG MEALS & COFFEE ──
      {
        id: 'jurado-30',
        name: "Longganisa, Rice & Egg (Longsilog)",
        price: 109,
        ingredients: "Sweet savory native Kapampangan longganisa sausages, garlic sinangag rice, sunny-side fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "Filipino All-Day Breakfast",
        nutrition: { calories: 560, protein: 22, carbs: 58, fat: 26 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-31',
        name: "Hotdog, Rice & Egg (Hotsilog)",
        price: 109,
        ingredients: "Jumbo red hotdogs, garlic fried rice, and sunny-side egg",
        allergens: "Contains Eggs, Dairy",
        healthIndicators: "Silog Favorite",
        nutrition: { calories: 520, protein: 18, carbs: 58, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-32',
        name: "Corned Beef, Rice & Egg (Cornsilog)",
        price: 109,
        ingredients: "Sautéed premium corned beef with onions, garlic rice, and fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "High Protein Breakfast",
        nutrition: { calories: 540, protein: 26, carbs: 56, fat: 22 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-33',
        name: "Ham, Rice & Egg (Hamsilog)",
        price: 109,
        ingredients: "Seared sliced savory ham, garlic fried rice, and fried egg",
        allergens: "Contains Eggs",
        healthIndicators: "Silog Breakfast",
        nutrition: { calories: 490, protein: 20, carbs: 56, fat: 19 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-34',
        name: "Tapa, Rice & Egg (Tapsilog)",
        price: 149,
        ingredients: "Cured tender beef tapa strips, garlic fried rice, sunny-side egg, spiced vinegar",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 590, protein: 32, carbs: 58, fat: 24 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-35',
        name: "Black Coffee / Creamy Coffee",
        price: 50,
        ingredients: "Freshly brewed hot black coffee or rich creamy coffee",
        allergens: "Contains Dairy (if Creamy)",
        healthIndicators: "Hot Beverage",
        nutrition: { calories: 60, protein: 1, carbs: 8, fat: 2 },
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
      },

      // ── MADE TO ORDER BILAO (MEDIUM, LARGE, XL, XXL) ──
      {
        id: 'jurado-36',
        name: "Bihon Guisado Bilao (Medium 6 pax)",
        price: 459,
        ingredients: "Party bilao of stir-fried bihon noodles with pork, chicken, hard-boiled egg garnish, and vegetables (6 pax)",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "Party Bilao (Medium 6 pax)",
        nutrition: { calories: 2300, protein: 95, carbs: 360, fat: 55 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-37',
        name: "Bihon Guisado Bilao (Large 10 pax)",
        price: 725,
        ingredients: "Large feast bilao of savory Pancit Bihon Guisado with decorative egg slices (10 pax)",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "Fiesta Bilao (Large 10 pax)",
        nutrition: { calories: 3800, protein: 155, carbs: 590, fat: 90 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-38',
        name: "Bihon Guisado Bilao (XL 13 pax)",
        price: 924,
        ingredients: "Extra-large celebration bilao of Pancit Bihon with generous meat and vegetable toppings (13 pax)",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "XL Celebration Bilao (13 pax)",
        nutrition: { calories: 4900, protein: 200, carbs: 760, fat: 120 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-39',
        name: "Bihon Guisado Bilao (XXL 18 pax)",
        price: 1257,
        ingredients: "Grand XXL banquet fiesta bilao of traditional Pancit Bihon Guisado (18 pax)",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "XXL Banquet Bilao (18 pax)",
        nutrition: { calories: 6800, protein: 275, carbs: 1050, fat: 165 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-40',
        name: "Palabok Bilao (Medium 6 pax)",
        price: 459,
        ingredients: "Medium bilao of Pancit Palabok with shrimp gravy, tinapa flakes, sliced hard-boiled eggs, and chicharon (6 pax)",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Party Bilao (Medium 6 pax)",
        nutrition: { calories: 2500, protein: 100, carbs: 370, fat: 70 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-41',
        name: "Palabok Bilao (Large 10 pax)",
        price: 725,
        ingredients: "Large party bilao of savory Kapampangan Pancit Palabok with egg arrangement (10 pax)",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "Fiesta Bilao (Large 10 pax)",
        nutrition: { calories: 4100, protein: 165, carbs: 610, fat: 115 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-42',
        name: "Palabok Bilao (XL 13 pax)",
        price: 924,
        ingredients: "Extra-large party bilao of rich Pancit Palabok (13 pax)",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "XL Celebration Bilao (13 pax)",
        nutrition: { calories: 5300, protein: 215, carbs: 790, fat: 150 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-43',
        name: "Palabok Bilao (XXL 18 pax)",
        price: 1257,
        ingredients: "Grand XXL celebration bilao of Pancit Palabok with overloaded toppings (18 pax)",
        allergens: "Contains Crustaceans, Eggs, Fish, Gluten",
        healthIndicators: "XXL Banquet Bilao (18 pax)",
        nutrition: { calories: 7300, protein: 290, carbs: 1080, fat: 205 },
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-44',
        name: "Canton Bilao (Medium 6 pax)",
        price: 499,
        ingredients: "Medium party bilao of thick stir-fried Pancit Canton egg noodles with assorted meats and vegetables (6 pax)",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Party Bilao (Medium 6 pax)",
        nutrition: { calories: 2700, protein: 110, carbs: 380, fat: 80 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-45',
        name: "Canton Bilao (Large 10 pax)",
        price: 790,
        ingredients: "Large celebration bilao of Pancit Canton with egg toppings and calamansi (10 pax)",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Fiesta Bilao (Large 10 pax)",
        nutrition: { calories: 4400, protein: 180, carbs: 620, fat: 130 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-46',
        name: "Canton Bilao (XL 13 pax)",
        price: 1010,
        ingredients: "Extra-large fiesta bilao of savory Pancit Canton (13 pax)",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "XL Celebration Bilao (13 pax)",
        nutrition: { calories: 5700, protein: 235, carbs: 810, fat: 170 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-47',
        name: "Canton Bilao (XXL 18 pax)",
        price: 1376,
        ingredients: "Grand banquet XXL bilao of loaded Pancit Canton (18 pax)",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "XXL Banquet Bilao (18 pax)",
        nutrition: { calories: 7900, protein: 320, carbs: 1120, fat: 235 },
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
      },

      // ── RICE MEALS & SIZZLING DISHES (Solo / With Rice) ──
      {
        id: 'jurado-48',
        name: "Pork Steak (with Rice)",
        price: 260,
        ingredients: "Tender pork shoulder steaks marinated in calamansi and soy sauce, topped with caramelized white onion rings, with rice",
        allergens: "Contains Soy",
        healthIndicators: "High Protein Rice Meal",
        nutrition: { calories: 640, protein: 38, carbs: 54, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-49',
        name: "T-Bone Steak (with Rice)",
        price: 369,
        ingredients: "Grilled tender T-bone steak served with savory brown gravy and steamed rice",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein Prime Beef",
        nutrition: { calories: 720, protein: 48, carbs: 52, fat: 34 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-50',
        name: "Seafoods Mix (with Rice)",
        price: 199,
        ingredients: "Sautéed shrimp, squid, and fish fillet in savory garlic butter sauce with steamed rice",
        allergens: "Contains Crustaceans, Molluscs, Fish, Dairy",
        healthIndicators: "High Protein Seafood",
        nutrition: { calories: 510, protein: 34, carbs: 56, fat: 16 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-51',
        name: "Sizzling Pusit (with Rice)",
        price: 169,
        ingredients: "Grilled tender squid sizzling with onions and sweet glaze, served with steamed white rice",
        allergens: "Contains Molluscs, Soy",
        healthIndicators: "High Protein Seafood Meal",
        nutrition: { calories: 480, protein: 30, carbs: 56, fat: 14 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-52',
        name: "Sisig Pork (with Rice)",
        price: 169,
        ingredients: "Kapampangan sizzling pork sisig with egg, calamansi, onions, served with steamed rice",
        allergens: "Contains Eggs, Soy",
        healthIndicators: "High Protein Sisig Meal",
        nutrition: { calories: 620, protein: 32, carbs: 54, fat: 30 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-53',
        name: "Sisig Chicken (with Rice)",
        price: 169,
        ingredients: "Minced grilled chicken sisig seasoned with calamansi and chilies, served with steamed rice",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Lean Meal",
        nutrition: { calories: 540, protein: 36, carbs: 54, fat: 18 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-54',
        name: "Sisig Bangus (with Rice)",
        price: 169,
        ingredients: "Flaked grilled milkfish sisig with onions, ginger, and calamansi, served with steamed rice",
        allergens: "Contains Fish, Soy",
        healthIndicators: "High Protein, Omega-3 Rich",
        nutrition: { calories: 490, protein: 32, carbs: 54, fat: 15 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-55',
        name: "Laman Loob (with Rice)",
        price: 169,
        ingredients: "Sautéed seasoned pork innards with garlic and onions, served with steamed rice",
        allergens: "Contains Soy",
        healthIndicators: "Traditional Viand",
        nutrition: { calories: 560, protein: 28, carbs: 54, fat: 24 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-56',
        name: "Chopsuey (with Rice)",
        price: 169,
        ingredients: "Fresh crisp mixed garden vegetables with sliced pork and quail eggs in savory sauce with rice",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "High Fiber Balanced Meal",
        nutrition: { calories: 460, protein: 20, carbs: 62, fat: 14 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-57',
        name: "Boneless Bangus (with Rice)",
        price: 230,
        ingredients: "Whole pan-fried marinated boneless bangus with garlic vinegar dip and steamed rice",
        allergens: "Contains Fish",
        healthIndicators: "High Protein, Pescatarian",
        nutrition: { calories: 580, protein: 42, carbs: 52, fat: 22 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-58',
        name: "Chicken BBQ (with Rice)",
        price: 199,
        ingredients: "Char-grilled marinated chicken leg quarter with sweet-savory BBQ glaze and steamed rice",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 590, protein: 38, carbs: 56, fat: 20 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-59',
        name: "Pork Liempo BBQ (with Rice)",
        price: 209,
        ingredients: "Grilled marinated pork belly liempo slab with spiced BBQ basting and steamed rice",
        allergens: "Contains Soy",
        healthIndicators: "High Protein Grill",
        nutrition: { calories: 680, protein: 32, carbs: 54, fat: 36 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-60',
        name: "Dinakdakan (with Rice)",
        price: 169,
        ingredients: "Grilled tender pork cuts tossed in creamy calamansi dressing with red onions, served with rice",
        allergens: "Contains Soy, Eggs",
        healthIndicators: "High Protein",
        nutrition: { calories: 610, protein: 34, carbs: 54, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-61',
        name: "Lechon Kawali (with Rice)",
        price: 179,
        ingredients: "Crispy deep-fried pork belly with crunchy skin, liver sauce, and steamed rice",
        allergens: "None / Allergen Free",
        healthIndicators: "Crispy Pork Meal",
        nutrition: { calories: 690, protein: 34, carbs: 52, fat: 38 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-62',
        name: "Pork / Chicken Tonkatsu (with Rice)",
        price: 199,
        ingredients: "Crispy panko-breaded pork or chicken cutlet with shredded cabbage, tonkatsu sauce, and rice",
        allergens: "Contains Gluten, Eggs, Soy",
        healthIndicators: "Japanese Style Cutlet Meal",
        nutrition: { calories: 640, protein: 36, carbs: 62, fat: 24 },
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-63',
        name: "Chicken Teriyaki (with Rice)",
        price: 199,
        ingredients: "Pan-grilled chicken thighs glazed with authentic sweet teriyaki sauce, sesame seeds, and rice",
        allergens: "Contains Soy, Sesame, Gluten",
        healthIndicators: "High Protein Teriyaki",
        nutrition: { calories: 580, protein: 36, carbs: 58, fat: 18 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },

      // ── BIANDA DISHES (Solo / With Rice) ──
      {
        id: 'jurado-64',
        name: "Pusit / Beef Bianda (with Rice)",
        price: 169,
        ingredients: "Slow-simmered tender squid or beef cooked in traditional Kapampangan bianda savory broth, served with rice",
        allergens: "Contains Molluscs/Soy",
        healthIndicators: "Heirloom Bianda Stew",
        nutrition: { calories: 520, protein: 32, carbs: 56, fat: 16 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'jurado-65',
        name: "Pork / Chicken Bianda (with Rice)",
        price: 169,
        ingredients: "Savory simmered pork or chicken in seasoned bianda broth, served with steamed white rice",
        allergens: "Contains Soy",
        healthIndicators: "Traditional Viand",
        nutrition: { calories: 540, protein: 34, carbs: 54, fat: 20 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  {
    id: 'res-tonos-restaurant-arayat',
    name: "Tono's Restaurant",
    municipality: 'Arayat',
    corridor: 'Mount Arayat Line',
    operatingHours: '08:00 AM - 09:00 PM',
    priceTier: '$$',
    lat: 15.1515,
    lng: 120.7685,
    categories: ['🍲 Traditional Kapampangan Viands', '🍗 Sizzling & Fried Specialties', '🍧 Native Desserts & Catering'],
    description: "Popular Arayat dine-in, take-out, and party catering kitchen celebrated for slow-simmered Kapampangan pork, beef, chicken, seafood viands, classic Sipo Egg, Bagnet, and handcrafted native sweets.",
    address: 'Poblacion, Arayat, Pampanga',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    branches: [
      {
        branchName: "Tono's Restaurant Arayat Main",
        municipality: 'Arayat',
        address: 'Poblacion, Arayat, Pampanga',
        operatingHours: '08:00 AM - 09:00 PM',
        lat: 15.1515,
        lng: 120.7685
      }
    ],
    username: 'tonos_owner',
    password: 'password123',
    occupancy: [15, 30, 55, 75, 90, 85, 60, 45, 65, 80, 90, 70, 45, 20, 10],
    menu: [
      // ── PORK DISHES ──
      {
        id: 'tono-1',
        name: "Pork Menudo",
        price: 180,
        ingredients: "Tender diced pork shoulder, liver cubes, potatoes, carrots, and garbanzos in rich spiced tomato sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Iron Rich",
        nutrition: { calories: 380, protein: 28, carbs: 18, fat: 22 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-2',
        name: "Pork Afritada",
        price: 180,
        ingredients: "Stewed pork chunks, sweet bell peppers, carrots, green peas, and potatoes in hearty tomato gravy",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 360, protein: 26, carbs: 16, fat: 20 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-3',
        name: "Pork Caldereta",
        price: 190,
        ingredients: "Pork cuts simmered in spiced tomato sauce, liver spread, melted cheese, and sweet bell peppers",
        allergens: "Contains Dairy",
        healthIndicators: "High Protein, Rich Flavor",
        nutrition: { calories: 420, protein: 30, carbs: 14, fat: 26 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-4',
        name: "Pork Asado",
        price: 180,
        ingredients: "Braised pork shoulder slices in sweet-savory calamansi, soy sauce, and aromatic star anise glaze",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 390, protein: 28, carbs: 15, fat: 24 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-5',
        name: "Pork Cream of Mushroom (Lengua)",
        price: 220,
        ingredients: "Tender slow-cooked pork tongue and meat simmered in rich creamy mushroom white sauce with button mushrooms",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "High Protein, Rich Cream Stew",
        nutrition: { calories: 450, protein: 32, carbs: 12, fat: 30 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-6',
        name: "Pork Barbeque",
        price: 160,
        ingredients: "Char-grilled skewered pork slices glazed in sweet and spicy Kapampangan BBQ marinade",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 340, protein: 28, carbs: 10, fat: 20 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-7',
        name: "Pork Gisantes",
        price: 180,
        ingredients: "Sautéed pork strips simmered in savory tomato sauce with sweet green peas and bell peppers",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 350, protein: 26, carbs: 16, fat: 19 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-8',
        name: "Pork Broccoli",
        price: 190,
        ingredients: "Tender pork strips stir-fried with fresh crisp broccoli florets in savory garlic-oyster sauce",
        allergens: "Contains Soy, Molluscs",
        healthIndicators: "High Fiber, High Protein",
        nutrition: { calories: 310, protein: 26, carbs: 12, fat: 17 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-9',
        name: "Pork Bagnet with Mang Tomas Sauce",
        price: 220,
        ingredients: "Crispy deep-fried seasoned pork belly slab with crunchy blistered skin, served with savory Mang Tomas sauce",
        allergens: "Contains Gluten (Sauce)",
        healthIndicators: "High Protein Crispy Pork",
        nutrition: { calories: 580, protein: 34, carbs: 8, fat: 46 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-10',
        name: "Pork Sisig",
        price: 180,
        ingredients: "Authentic sizzling Kapampangan minced pork face, ears, chicken liver, onions, and calamansi",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Kapampangan Specialty",
        nutrition: { calories: 480, protein: 30, carbs: 6, fat: 38 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-11',
        name: "Pork Kare-Kare",
        price: 210,
        ingredients: "Stewed tender pork cuts and vegetables in rich roasted peanut sauce, served with sautéed bagoong alamang",
        allergens: "Contains Peanuts, Crustaceans (Bagoong)",
        healthIndicators: "High Protein Classic",
        nutrition: { calories: 510, protein: 30, carbs: 18, fat: 34 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-12',
        name: "Pork Binagoongan",
        price: 190,
        ingredients: "Pork belly cubes simmered in savory sautéed shrimp paste (bagoong), garlic, and fried eggplant",
        allergens: "Contains Crustaceans",
        healthIndicators: "High Protein, Savory Dish",
        nutrition: { calories: 460, protein: 28, carbs: 8, fat: 35 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-13',
        name: "Pork Hamonado",
        price: 190,
        ingredients: "Sweet pineapple-braised pork shoulder with pineapple slices and sweet brown reduction sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 420, protein: 27, carbs: 26, fat: 23 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-14',
        name: "Pork Stir Fry",
        price: 170,
        ingredients: "Quick stir-fried tender pork slices with mixed julienned vegetables in savory garlic-soy sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Balanced Dish",
        nutrition: { calories: 330, protein: 25, carbs: 12, fat: 19 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-15',
        name: "Pork Shanghai w/ Sweet & Sour Sauce or Catsup",
        price: 150,
        ingredients: "Crispy golden fried pork spring rolls served with sweet & sour dipping sauce or banana catsup",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "Crispy Finger Food",
        nutrition: { calories: 360, protein: 18, carbs: 22, fat: 22 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },

      // ── CHICKEN DISHES ──
      {
        id: 'tono-16',
        name: "Chicken Asado",
        price: 170,
        ingredients: "Tender chicken cuts simmered in savory-sweet tomato-soy sauce with potatoes and bay leaves",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 340, protein: 32, carbs: 14, fat: 16 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-17',
        name: "Chicken Caldereta",
        price: 180,
        ingredients: "Stewed chicken in spiced liver-tomato gravy, bell peppers, carrots, and melted cheese",
        allergens: "Contains Dairy",
        healthIndicators: "High Protein",
        nutrition: { calories: 370, protein: 34, carbs: 14, fat: 19 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-18',
        name: "Chicken Afritada",
        price: 170,
        ingredients: "Chicken braised in tomato sauce with carrots, potatoes, green peas, and sweet bell peppers",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 320, protein: 30, carbs: 14, fat: 14 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-19',
        name: "Chicken Barbeque",
        price: 160,
        ingredients: "Char-grilled marinated chicken cuts basted with savory-sweet barbecue sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Lean Grill",
        nutrition: { calories: 310, protein: 32, carbs: 8, fat: 15 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-20',
        name: "Chicken Malunggay",
        price: 170,
        ingredients: "Healthy chicken soup simmered with fresh nutrient-packed malunggay (moringa) leaves and ginger",
        allergens: "None / Allergen Free",
        healthIndicators: "Nutrient Rich, Immune Boosting",
        nutrition: { calories: 260, protein: 30, carbs: 6, fat: 12 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-21',
        name: "Chicken Fillet w/ White Sauce",
        price: 180,
        ingredients: "Pan-seared tender chicken breast fillet drizzled with creamy garlic-herb white sauce",
        allergens: "Contains Dairy, Gluten",
        healthIndicators: "High Protein, Lean Meat",
        nutrition: { calories: 340, protein: 36, carbs: 10, fat: 16 },
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-22',
        name: "Chicken Cordon Bleu w/ White Sauce",
        price: 190,
        ingredients: "Rolled crispy breaded chicken breast stuffed with ham and cheese, served with creamy sauce",
        allergens: "Contains Dairy, Gluten, Eggs",
        healthIndicators: "High Protein Favorite",
        nutrition: { calories: 430, protein: 38, carbs: 16, fat: 22 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-23',
        name: "Fried Chicken w/ Gravy",
        price: 170,
        ingredients: "Golden crispy fried chicken seasoned with secret spices, served with rich brown gravy",
        allergens: "Contains Gluten, Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 410, protein: 34, carbs: 14, fat: 24 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-24',
        name: "Chicken Lollipop w/ Gravy",
        price: 180,
        ingredients: "French-cut crispy fried chicken wing lollipops served with savory dipping gravy",
        allergens: "Contains Gluten, Eggs",
        healthIndicators: "Crispy Appetizer",
        nutrition: { calories: 390, protein: 32, carbs: 16, fat: 22 },
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-25',
        name: "Buffalo Wings",
        price: 190,
        ingredients: "Crispy fried chicken wings tossed in tangy spicy Buffalo chili butter glaze",
        allergens: "Contains Dairy (Butter)",
        healthIndicators: "High Protein, Spicy",
        nutrition: { calories: 420, protein: 30, carbs: 8, fat: 28 },
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-26',
        name: "Garlic Chicken",
        price: 180,
        ingredients: "Pan-roasted chicken tossed with abundant toasted garlic bits and savory seasoning",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 350, protein: 34, carbs: 8, fat: 19 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-27',
        name: "Chicken Hainanese",
        price: 190,
        ingredients: "Poached tender chicken served with aromatic ginger-scallion dip and chili sauce",
        allergens: "Contains Soy, Sesame",
        healthIndicators: "High Protein, Low Fat, Clean Eating",
        nutrition: { calories: 290, protein: 35, carbs: 4, fat: 13 },
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80"
      },

      // ── BEEF DISHES ──
      {
        id: 'tono-28',
        name: "Beef Asado",
        price: 220,
        ingredients: "Tender stewed beef brisket slices in rich savory-sweet tomato-soy glaze with potatoes",
        allergens: "Contains Soy",
        healthIndicators: "High Protein, Iron Rich",
        nutrition: { calories: 420, protein: 36, carbs: 14, fat: 24 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-29',
        name: "Beef Caldereta",
        price: 240,
        ingredients: "Prime beef cubes slow-cooked in rich spiced tomato sauce, liver spread, cheese, and olives",
        allergens: "Contains Dairy",
        healthIndicators: "High Protein, Premium Beef",
        nutrition: { calories: 470, protein: 38, carbs: 14, fat: 28 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-30',
        name: "Beef Broccoli",
        price: 230,
        ingredients: "Tender beef slices stir-fried with fresh broccoli florets in savory oyster-garlic sauce",
        allergens: "Contains Soy, Molluscs",
        healthIndicators: "High Fiber, High Protein",
        nutrition: { calories: 340, protein: 34, carbs: 12, fat: 16 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-31',
        name: "Beef Kare-Kare",
        price: 250,
        ingredients: "Melt-in-your-mouth beef cuts and tripe stewed in authentic roasted peanut sauce with vegetables and bagoong",
        allergens: "Contains Peanuts, Crustaceans (Bagoong)",
        healthIndicators: "High Protein Specialty",
        nutrition: { calories: 530, protein: 36, carbs: 18, fat: 34 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-32',
        name: "Beef Shanghai w/ Sweet & Sour Sauce or Catsup",
        price: 180,
        ingredients: "Crispy golden fried seasoned ground beef spring rolls with sweet & sour dipping sauce",
        allergens: "Contains Eggs, Gluten, Soy",
        healthIndicators: "High Protein Crispy Snack",
        nutrition: { calories: 370, protein: 22, carbs: 20, fat: 21 },
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-33',
        name: "Beef Steak with Mushroom",
        price: 240,
        ingredients: "Tender beef tenderloin cuts in savory soy-calamansi sauce topped with mushrooms and caramelized onions",
        allergens: "Contains Soy",
        healthIndicators: "High Protein",
        nutrition: { calories: 390, protein: 36, carbs: 10, fat: 22 },
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-34',
        name: "Beef Pares",
        price: 160,
        ingredients: "Sweet-savory braised beef brisket stew with star anise and rich aromatic broth",
        allergens: "Contains Soy",
        healthIndicators: "High Protein Comfort Stew",
        nutrition: { calories: 380, protein: 32, carbs: 16, fat: 20 },
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=500&q=80"
      },

      // ── VEGETABLE DISHES ──
      {
        id: 'tono-35',
        name: "Gising-Gising",
        price: 160,
        ingredients: "Fresh green beans and winged beans simmered in spicy coconut cream with ground pork and chilies",
        allergens: "Contains Coconut",
        healthIndicators: "High Fiber, Spicy",
        nutrition: { calories: 290, protein: 12, carbs: 16, fat: 20 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-36',
        name: "Ampalaya Con Carne",
        price: 170,
        ingredients: "Sautéed bitter melon (ampalaya) with tender beef slices and fermented black beans in savory sauce",
        allergens: "Contains Soy",
        healthIndicators: "High Fiber, Blood Sugar Friendly",
        nutrition: { calories: 260, protein: 20, carbs: 14, fat: 13 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-37',
        name: "Chopsuey",
        price: 160,
        ingredients: "Crisp cabbage, carrots, snow peas, baby corn, pork slices, and quail eggs in savory thickened sauce",
        allergens: "Contains Eggs, Soy, Gluten",
        healthIndicators: "High Fiber, Vitamin Rich",
        nutrition: { calories: 240, protein: 14, carbs: 18, fat: 12 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-38',
        name: "Sipo Egg",
        price: 170,
        ingredients: "Traditional Kapampangan vegetable specialty of green peas, diced carrots, singkamas, ham, and quail eggs in creamy sauce",
        allergens: "Contains Eggs, Dairy",
        healthIndicators: "Kapampangan Fiesta Vegetable",
        nutrition: { calories: 290, protein: 15, carbs: 22, fat: 16 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-39',
        name: "Pinakbet",
        price: 150,
        ingredients: "Local squash, eggplant, string beans, bitter melon, and okra sautéed in savory bagoong alamang with pork",
        allergens: "Contains Crustaceans (Bagoong)",
        healthIndicators: "High Fiber, Native Vegetable Stew",
        nutrition: { calories: 210, protein: 10, carbs: 24, fat: 8 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-40',
        name: "Mix Vegetable Stir Fry",
        price: 150,
        ingredients: "Medley of seasonal farm-fresh garden vegetables quickly sautéed in garlic-butter sauce",
        allergens: "Contains Dairy (Butter)",
        healthIndicators: "High Fiber, Low Calorie",
        nutrition: { calories: 180, protein: 6, carbs: 18, fat: 9 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-41',
        name: "Vegetable Salad",
        price: 140,
        ingredients: "Fresh crisp garden greens, cucumber, tomatoes, and carrots with house dressing",
        allergens: "None / Allergen Free",
        healthIndicators: "High Fiber, Very Low Calorie",
        nutrition: { calories: 120, protein: 3, carbs: 12, fat: 6 },
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
      },

      // ── SEAFOOD DISHES ──
      {
        id: 'tono-42',
        name: "Buttered Shrimp",
        price: 260,
        ingredients: "Fresh succulent shrimp sautéed in rich garlic butter glaze and sweet soda reduction",
        allergens: "Contains Crustaceans, Dairy",
        healthIndicators: "High Protein Seafood",
        nutrition: { calories: 340, protein: 30, carbs: 8, fat: 20 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-43',
        name: "Mix Seafood",
        price: 260,
        ingredients: "Fresh shrimp, squid rings, and fish fillet sautéed in flavorful garlic butter and oyster sauce",
        allergens: "Contains Crustaceans, Molluscs, Fish, Dairy, Soy",
        healthIndicators: "High Protein Seafood Medley",
        nutrition: { calories: 310, protein: 32, carbs: 10, fat: 15 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-44',
        name: "Seafood Salpicao",
        price: 270,
        ingredients: "Shrimp, squid, and fish cubes seared with generous toasted garlic, olive oil, and Worcestershire seasoning",
        allergens: "Contains Crustaceans, Molluscs, Fish, Soy",
        healthIndicators: "High Protein, Mediterranean-Style",
        nutrition: { calories: 290, protein: 34, carbs: 6, fat: 14 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-45',
        name: "Ginataang Hipon",
        price: 260,
        ingredients: "Fresh shrimp simmered with squash and string beans in rich creamy spiced coconut milk",
        allergens: "Contains Crustaceans, Coconut",
        healthIndicators: "High Protein, Traditional Coconut Dish",
        nutrition: { calories: 360, protein: 28, carbs: 14, fat: 22 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },

      // ── FISH DISHES ──
      {
        id: 'tono-46',
        name: "Fish Fillet w/ Tartar Sauce",
        price: 190,
        ingredients: "Crispy breaded golden dory fish fillet strips served with creamy tartar dipping sauce",
        allergens: "Contains Fish, Gluten, Eggs",
        healthIndicators: "High Protein, Pescatarian",
        nutrition: { calories: 320, protein: 26, carbs: 16, fat: 16 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-47',
        name: "Stirfry Dory Fish",
        price: 190,
        ingredients: "Pan-seared tender cream dory fish slices stir-fried with bell peppers, onions, and ginger in soy glaze",
        allergens: "Contains Fish, Soy",
        healthIndicators: "High Protein, Lean Fish",
        nutrition: { calories: 240, protein: 28, carbs: 8, fat: 10 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-48',
        name: "Sweet and Sour Fish",
        price: 200,
        ingredients: "Crispy fried fish fillet tossed in vibrant sweet & sour pineapple glaze with bell peppers and onions",
        allergens: "Contains Fish, Gluten",
        healthIndicators: "High Protein",
        nutrition: { calories: 310, protein: 24, carbs: 26, fat: 11 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-49',
        name: "Fish in Soy Sauce (Chinese Style)",
        price: 200,
        ingredients: "Steamed fish fillet drizzled with hot sesame-soy sauce, julienned ginger, and fresh scallions",
        allergens: "Contains Fish, Soy, Sesame",
        healthIndicators: "High Protein, Clean Steamed Fish",
        nutrition: { calories: 220, protein: 28, carbs: 6, fat: 8 },
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80"
      },

      // ── DESSERT ──
      {
        id: 'tono-50',
        name: "Buko Pandan",
        price: 90,
        ingredients: "Shredded young coconut meat, pandan-flavored green gelatin, and sago in sweetened cream and condensed milk",
        allergens: "Contains Dairy, Coconut",
        healthIndicators: "Classic Filipino Sweet Dessert",
        nutrition: { calories: 240, protein: 3, carbs: 32, fat: 11 },
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-51',
        name: "Fruit Salad",
        price: 90,
        ingredients: "Mixed fruit cocktail, nata de coco, kaong, and cheese cubes folded into sweet heavy cream",
        allergens: "Contains Dairy",
        healthIndicators: "Fiesta Fruit Dessert",
        nutrition: { calories: 260, protein: 4, carbs: 36, fat: 12 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-52',
        name: "Coffee Jelly",
        price: 80,
        ingredients: "Firm coffee-flavored gelatin cubes submerged in sweetened creamy condensed milk and evaporated milk",
        allergens: "Contains Dairy",
        healthIndicators: "Chilled Coffee Dessert",
        nutrition: { calories: 190, protein: 3, carbs: 28, fat: 7 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-53',
        name: "Gelatin Dessert",
        price: 60,
        ingredients: "Chilled colorful layered fruit-flavored gelatin slices",
        allergens: "None / Allergen Free",
        healthIndicators: "Light Sweet Dessert",
        nutrition: { calories: 110, protein: 2, carbs: 25, fat: 0 },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 'tono-54',
        name: "Maja Blanca",
        price: 80,
        ingredients: "Creamy native coconut milk and cornstarch pudding with sweet kernel corn, topped with toasted latik",
        allergens: "Contains Coconut",
        healthIndicators: "Traditional Native Delicacy",
        nutrition: { calories: 230, protein: 3, carbs: 34, fat: 9 },
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
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

PRESEEDED_RESTAURANTS.sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }));


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
