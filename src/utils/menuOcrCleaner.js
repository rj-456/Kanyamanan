/**
 * menuOcrCleaner.js
 * Comprehensive Philippine & Asian culinary OCR spelling auto-corrector.
 * Repairs optical recognition typos, character confusions, clipped prices,
 * and filters out junk boilerplate (phone numbers, decimal fragments, condition text).
 */

export const OCR_WORD_REPLACEMENTS = [
  // Cyrillic & Russian OCR typo confusions on Philippine menus
  { regex: /(?:глариток(?:\s+na\s+bangus)?|\brlarntok\s*(?:na\s*bangus)?\b)/gi, replace: 'Inihaw na Bangus' },

  // Miki Bihon & Pancit varieties
  { regex: /\b(?:mii\s+bihon|mki\s+bihon|mkibihon|miki\s+bihon)\b/gi, replace: 'Miki Bihon' },
  { regex: /\b(?:canton[.\s-]+solo|canton\s+solo)\b/gi, replace: 'Pancit Canton (Solo)' },
  { regex: /\b(?:palabok[.\s-]+solo|palabok\s+solo)\b/gi, replace: 'Pancit Palabok (Solo)' },
  { regex: /\b(?:bihon[.\s-]+solo|bihon\s+solo)\b/gi, replace: 'Pancit Bihon (Solo)' },
  { regex: /\b^guisado$\b/gi, replace: 'Pancit Guisado' },

  // Sinigang & Miso
  { regex: /\b(?:s[.\s-]*miso[-:\s]*salmon\s+head(?:[-\s]*\d+\s*g)?)\b/gi, replace: 'Sinigang sa Miso - Salmon Head (200g)' },
  { regex: /\b(?:s[.\s-]*miso[-:\s]*salmon\s+belly(?:[-\s]*g)?)\b/gi, replace: 'Sinigang sa Miso - Salmon Belly' },
  { regex: /\b(?:s[.\s-]*miso)\b/gi, replace: 'Sinigang sa Miso' },

  // Chicharon cuts & Wings
  { regex: /\b(?:c[.\s-]*bulaklak(?:[-\s]*\d+\s*g)?)\b/gi, replace: 'Chicharon Bulaklak (200g)' },
  { regex: /\b(?:c[.\s-]*bale(?:[-\s]*g)?|c[.\s-]*balat(?:[-\s]*g)?)\b/gi, replace: 'Chicharon Balat (200g)' },
  { regex: /\b(?:c[.\s-]*wing|c[.\s-]*wings)\b/gi, replace: 'Chicken Wings' },

  // Garlic specialties
  { regex: /\b(?:b[.\s-]*garlic(?:[-\s]*\d+\s*g)?)\b/gi, replace: 'Butter Garlic (200g)' },

  // Beverages & Water
  { regex: /\b(?:m\s+water|m\.water|min\s+water)\b/gi, replace: 'Mineral Water (Bottled)' },
  { regex: /\b(?:royal\s+1\.5)\b/gi, replace: 'Royal (1.5L)' },
  { regex: /\b(?:coke\s+1\.5)\b/gi, replace: 'Coke (1.5L)' },
  { regex: /\b(?:ice\s+drinks?)\b/gi, replace: 'Iced Drinks' },
  { regex: /\b(?:drieks|dricks|drnks|drinls|drikns|drnk|driske)\b/gi, replace: 'Drinks' },

  // Rice
  { regex: /(?:\bplain\s+rice\s+)?\bper\s*[- ]*cup(?:\s*\))?/gi, replace: 'Plain Rice (Per Cup)' },
  { regex: /\b(?:disty\s+rice|ditry\s+rice|drty\s+rice|dity\s+rice)\b/gi, replace: 'Dirty Rice' },
  { regex: /\b(?:sinanggag|sinangag|sinanggg)\b/gi, replace: 'Sinangag' },

  // Lechon & Pork
  { regex: /\b(?:lecnon\s+rawall?|lecnon\s+rawali|lechon\s+rawall?|lechon\s+rawali)\b/gi, replace: 'Lechon Kawali' },
  { regex: /\b(?:lechon\s+kamar|lechon\s+kamal|lechn\s+kamar)\b/gi, replace: 'Lechon Kawali' },
  { regex: /\b(?:kawli|kwali)\b/gi, replace: 'Kawali' },
  { regex: /\b(?:sisg|sisigk|sisik)\b/gi, replace: 'Sisig' },
  { regex: /\b(?:lechn|lechonk)\b/gi, replace: 'Lechon' },
  { regex: /\b(?:pork\s+bbe|pork\s+bb\b)\b/gi, replace: 'Pork BBQ' },
  { regex: /\b(?:tokwa'?t\s+baboy|tokwat\s+bboy)\b/gi, replace: "Tokwa't Baboy" },
  { regex: /\b(?:begukn|binagongan|binagoongn)\b/gi, replace: 'Binagoongan' },
  { regex: /\b(?:patas|pata)\b/gi, replace: 'Pata' },
  { regex: /\b(?:sizzin\s+pusit|sizzin|sizin\s+pusit)\b/gi, replace: 'Sizzling Pusit' },
  { regex: /\b(?:kilayin|sizzling\s+kilayin|kilaying\s+kapampangan)\b/gi, replace: 'Sizzling Kilayin' },

  // Chicken typos & cuts
  { regex: /\b(?:chicaen|chiken|chikn|chickn|chikken|chikean|chkn)\b/gi, replace: 'Chicken' },
  { regex: /\b(?:chicken\s+ass|chickn\s+ass|chikn\s+ass)\b/gi, replace: 'Chicken Tail (Isol)' },

  // Liempo / Pork Belly & Grilled
  { regex: /\b(?:gried\s+lenge|gried\s+liempo|griled\s+lenge|grid\s+lenge)\b/gi, replace: 'Grilled Liempo' },
  { regex: /\b(?:lenge|liembo|lempo)\b/gi, replace: 'Liempo' },
  { regex: /\b(?:gried|griled|grild|grlld)\b/gi, replace: 'Grilled' },

  // Dishes / Side Dishes
  { regex: /\b(?:side\s+dies|side\s+diss|sieg\s+side\s+dish|sido\s+dish|side\s+diah|side\s+dishs)\b/gi, replace: 'Side Dish' },
  { regex: /\b(?:diss|diah|dies)\b/gi, replace: 'Dish' },
  { regex: /\b(?:sieg)\b/gi, replace: 'Side' },

  // Rolls (Shanghai / Shrimp / Spring)
  { regex: /\b(?:sheine\s+rol|shein\s+rol|shane\s+rol|sheine\s+roll|shang\s+rol)\b/gi, replace: 'Shanghai Roll' },
  { regex: /\b(?:shrimp\s+ral|shrimp\s+rol)\b/gi, replace: 'Shrimp Roll' },
  { regex: /\b(?:sping\s+rol|sprng\s+rol)\b/gi, replace: 'Spring Roll' },
  { regex: /\b(?:rol)\b/gi, replace: 'Roll' },
  { regex: /\b(?:ral)\b/gi, replace: 'Roll' },

  // Seafood & Fish
  { regex: /\b(?:keiveno\s+bangus|releno\s+bangus|relyeno\s+bangus)\b/gi, replace: 'Relleno Bangus' },
  { regex: /\b(?:bangs|bngus|bangos)\b/gi, replace: 'Bangus' },
  { regex: /\b(?:tilapya|tlapia)\b/gi, replace: 'Tilapia' },
  { regex: /\b(?:hipn|hpn)\b/gi, replace: 'Hipon' },
  { regex: /\b(?:tahng|thong)\b/gi, replace: 'Tahong' },

  // Beef & Stews
  { regex: /\b(?:caldreta|kaldereta|caldereta)\b/gi, replace: 'Caldereta' },
  { regex: /\b(?:bullo|bulalo)\b/gi, replace: 'Bulalo' },
  { regex: /\b(?:kare[- ]?kar)\b/gi, replace: 'Kare-Kare' },

  // Vegetables
  { regex: /\b(?:chopsuy|chopsuey)\b/gi, replace: 'Chopsuey' },
  { regex: /\b(?:pinakbt|pakbit)\b/gi, replace: 'Pakbit' },
  { regex: /\b(?:ensalad|ensalada)\b/gi, replace: 'Ensalada' },

  // Quantities & Units
  { regex: /\b(?:polorder|pol\s+order|por\s+order)\b/gi, replace: 'pcs / order' },
  { regex: /\b(?:cruis|crus)\b/gi, replace: 'Crisps' },
  { regex: /\b(?:pc\.|pc)\b/gi, replace: 'pc' },
  { regex: /\b(?:pcs\.|pcs)\b/gi, replace: 'pcs' }
];

/**
 * Identify OCR noise, telephone hotlines, decimal price remnants, and flyer boilerplate.
 */
export function isGarbageOrBoilerplate(text) {
  if (!text || typeof text !== 'string') return true;
  const t = text.trim();
  if (t.length < 2) return true;

  // Phone numbers or hotline patterns: "279-8756", "967-4400", "730-5116", "868-2646"
  if (/^\d{3,4}[-\s.]\d{4}$/.test(t) || /\b\d{3}[-\s.]\d{4}\b/.test(t) || /\b\d{4}[-\s.]\d{4}\b/.test(t)) return true;
  if (/^(?:\+?63|0)9\d{9}$/.test(t)) return true;

  // Decimal remnants and stray punctuation e.g. ",00", ".00", "00", "unne", ",0", ".0"
  if (/^[,.]\s*\d{1,2}$/.test(t) || /^[,.\s0-9]+$/.test(t)) return true;
  if (/^unne\b/i.test(t)) return true;

  // Stray OCR gibberish fragments: "tsk bu", "tsk", meaningless non-word tokens
  if (/^tsk\s*bu\b/i.test(t) || /^\btsk\b/i.test(t) || /\btsk\s+bu\b/i.test(t)) return true;
  const words = t.split(/\s+/);
  if (words.some(w => w.length >= 3 && !/[aeiouy]/i.test(w) && !/^(?:bbq|pcs|pkg|solo|max|min|lbs)$/i.test(w))) {
    return true;
  }

  // Flyer conditions and order rules (e.g. "MEUMUM OF", "Choice it Side Dah Castian or Ballered o")
  if (/\b(?:meumum|minimum|maximum|min)\s+of\b/i.test(t)) return true;
  if (/\bchoice\s+(?:it|of)\s+side\b/i.test(t)) return true;
  if (/\bcastian\s+or\s+ballered\b/i.test(t)) return true;
  if (/\bcoleslaw\s+or\s+buttered\b/i.test(t)) return true;
  if (/\b(?:we\s+deliver|free\s+delivery|advance\s+order|open\s+daily|contact\s+us|hotline|branch)\b/i.test(t)) return true;
  if (/\b(?:re-\s*fias|fietgite|dan,\s*tea|why\s+mata|chunsult|curatold)\b/i.test(t)) return true;

  // Restaurant branding, store logos, and fragments: e.g. "Aling)", "Aling Lucing", "Aling", "Lucing", "ucing"
  if (/^(?:aling[\s\)]*|lucing|aling\s+lucing|ucing|restaurant|kainan|eatery|lutong\s+bahay|carinderia)$/i.test(t)) return true;
  if (/\b(?:aling\s+lucing|restaurant|kainan)\b/i.test(t)) return true;

  // Stray punctuation at end or start, e.g. "Aling)", "ucing"
  if (/^[a-z0-9\s]+[)\]}>]$/i.test(t) && !/\([^)]+\)/.test(t) && !/solo|cup|\d+g|pcs/i.test(t)) {
    if (/aling\b|lucing\b|dish\b|menu\b/i.test(t)) return true;
  }

  return false;
}

/**
 * Check if a text line is purely a section header (e.g., "Main Dish", "Mains", "Drinks")
 * rather than a purchasable food dish.
 */
export function isSectionHeader(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.trim();
  return /^(?:main\s+dish(?:es)?|mains?|ulam|special(?:s)?|special\s+order|house\s+special(?:s)?|best\s+seller(?:s)?|chef'?s?\s+special(?:s)?|grilled|inihaw|barbecue|bbq|pancit|noodles?|pasta|drinks?|beverages?|in\s+can|desserts?|pangmayumu|sweets?|rice|nasi|funnmeals?|set\s+meals?|combos?|appetizers?|pulutan|starters?|side\s+dish(?:es)?|seafood|pork|poultry|chicken|beef|soups?|sabaw|a\s+la\s+carte|ala\s+carte|hot\s+specials?|all\s+day\s+breakfast)$/i.test(t);
}

/**
 * Curated dictionary of authentic Philippine / Kapampangan culinary dishes
 * used to validate whether a scanned line is truly a food dish.
 */
export const KNOWN_CULINARY_DISHES = [
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
];

/**
 * Validate whether a name represents an actual food dish or beverage.
 * Rejects stray words, section headers, logo watermarks, and random text.
 */
export function isValidDishName(name, hasPrice = false) {
  if (!name || typeof name !== 'string') return false;
  const n = name.trim();
  if (n.length < 3) return false;

  // Pure digits or punctuation
  if (/^[\d\s.,:;()#*~_-]+$/.test(n)) return false;

  // Section headers are not dishes
  if (isSectionHeader(n)) return false;

  // Boilerplate, telephone, conditions, or logo noise
  if (isGarbageOrBoilerplate(n)) return false;

  const lower = n.toLowerCase();

  // Branding/store/logo noise
  if (/^(?:aling\b|lucing\b|aling\s+lucing\b|restaurant\b|kainan\b|eatery\b|bistro\b|welcome\b|thank\s+you\b|main\s+dish\b|side\s+dish\b)/i.test(lower)) {
    return false;
  }

  // Fragment words like "Aling)", "ucing", "Main Dish", "tsk bu"
  if (/^[a-z]{1,4}\)?$/i.test(n) && !/bbq|tea|ice|egg|rib|pao|pie|coke|soda|beer/i.test(lower)) {
    return false;
  }

  // If it has an explicit price, verify it's not a boilerplate word or gibberish
  if (hasPrice) {
    if (/^(?:total|subtotal|change|cash|balance|table|cashier|order|vat|delivery|receipt)$/i.test(lower)) return false;
    if (/^tsk\s*bu$/i.test(lower)) return false;
    return true;
  }

  // If it does NOT have an explicit price, it MUST match a recognized culinary dish!
  for (const dish of KNOWN_CULINARY_DISHES) {
    if (lower.includes(dish)) return true;
  }

  return false;
}

/**
 * Determine if text or image OCR result represents an authentic food menu or flyer.
 * If the user uploads a photo that is not a menu (e.g. selfie, car, document, landscape),
 * this returns false to prevent hallucinating fake dishes from random words.
 */
export function isLikelyValidMenu(rawText) {
  if (!rawText || typeof rawText !== 'string') return false;
  const text = rawText.trim();
  if (text.length < 8) return false;

  const lower = text.toLowerCase();
  
  const foodKeywords = [
    'sisig', 'lechon', 'liempo', 'pata', 'bulalo', 'sinigang', 'nilaga', 'kare-kare', 'adobo', 
    'pancit', 'bihon', 'canton', 'palabok', 'miki', 'chicharon', 'wings', 'chicken', 'manok', 
    'pork', 'baboy', 'beef', 'baka', 'bangus', 'tilapia', 'fish', 'seafood', 'shrimp', 'hipon', 
    'rice', 'sinangag', 'cup', 'halo-halo', 'dessert', 'drinks', 'beverage', 'water', 'coke', 
    'royal', 'sprite', 'ulam', 'mains', 'combo', 'meal', 'platter', 'bucket', 'menu', 'order',
    'grilled', 'inihaw', 'bbq', 'barbecue', 'soup', 'sabaw', 'appetizer', 'pulutan', 'tokwa'
  ];

  let foodMatches = 0;
  for (const kw of foodKeywords) {
    if (lower.includes(kw)) {
      foodMatches++;
    }
  }

  // Count lines with price patterns (e.g. ₱100, P 250, 150.00, 50)
  const priceMatches = text.match(/(?:[₱P\u20B1]\s*\d{2,5}|\b\d{2,4}(?:\.\d{2})?\s*(?:pesos|php)?\b)/gi) || [];

  // It's a menu if:
  // 1. Has at least 2 food terms AND at least 1 price pattern, OR
  // 2. Has at least 3 distinct food terms, OR
  // 3. Has explicit menu markers ('menu', 'ulam', 'combos', 'set meal', 'price list') and food/prices
  if (foodMatches >= 2 && priceMatches.length >= 1) return true;
  if (foodMatches >= 3) return true;
  if (/menu|price\s*list|packages|set\s*meals|short\s*orders/i.test(lower) && (foodMatches >= 1 || priceMatches.length >= 1)) return true;

  return false;
}

/**
 * Generate accurate, unique, authentic dish descriptions, ingredients, allergen lists, calories, and nutrient profiles.
 * CRITICAL RULES:
 * 1. For beverages and drinks, NEVER mention "local seasoning", "garlic", or "onions".
 * 2. Every single dish and beverage must have a unique definition based on what it actually is.
 * 3. Calories and nutrients (protein, carbs, fat) must be unique and appropriate for each specific dish/drink.
 */
export function generateDishDescriptionAndIngredients(dishName, category = 'Mains', existingDesc = '', existingIngs = null) {
  const name = (dishName || '').trim();
  const lower = name.toLowerCase();
  const cat = (category || '').toLowerCase();

  // 1. BEVERAGES & DRINKS (Strictly NO local seasoning, garlic, or onions)
  if (cat === 'beverage' || /water|beverage|drink|coke|royal|sprite|pepsi|tea|juice|shake|soda|beer|coffee/i.test(lower)) {
    if (/water|mineral/i.test(lower)) {
      return {
        description: "Pure refreshing bottled mineral drinking water served chilled.",
        estimated_ingredients: ["Purified Mineral Water", "Ice"],
        allergens: ["None identified"],
        calories: 0,
        nutrients: { protein: "0g", carbs: "0g", fat: "0g" }
      };
    }
    if (/coke|royal|sprite|pepsi|soda|mountain dew|sarsi/i.test(lower)) {
      return {
        description: `Refreshing, crisp carbonated ${name} served ice-cold.`,
        estimated_ingredients: [name, "Carbonated Water", "Sweetener", "Ice"],
        allergens: ["None identified"],
        calories: 140,
        nutrients: { protein: "0g", carbs: "39g", fat: "0g" }
      };
    }
    if (/tea|iced tea/i.test(lower)) {
      return {
        description: "Freshly brewed house iced tea sweetened with cane sugar and infused with fresh calamansi citrus essence.",
        estimated_ingredients: ["Brewed Black Tea", "Calamansi Essence", "Sugar Syrup", "Ice"],
        allergens: ["None identified"],
        calories: 90,
        nutrients: { protein: "0g", carbs: "23g", fat: "0g" }
      };
    }
    if (/calamansi/i.test(lower)) {
      return {
        description: "Freshly squeezed native calamansi lime juice sweetened with pure cane syrup and served chilled.",
        estimated_ingredients: ["Fresh Calamansi Juice", "Purified Water", "Cane Syrup", "Ice"],
        allergens: ["None identified"],
        calories: 80,
        nutrients: { protein: "0.5g", carbs: "20g", fat: "0g" }
      };
    }
    if (/mango/i.test(lower)) {
      return {
        description: "Thick, velvety blended shake made with ripe sweet Philippine mangoes, milk, and crushed ice.",
        estimated_ingredients: ["Ripe Mangoes", "Milk", "Crushed Ice", "Cane Sugar"],
        allergens: ["Contains Dairy"],
        calories: 210,
        nutrients: { protein: "2.5g", carbs: "46g", fat: "3.2g" }
      };
    }
    if (/buko/i.test(lower)) {
      return {
        description: "Naturally sweet and hydrating young coconut water served cold with tender ribbons of fresh buko meat.",
        estimated_ingredients: ["Fresh Coconut Water", "Young Coconut Meat", "Ice"],
        allergens: ["None identified"],
        calories: 70,
        nutrients: { protein: "1.5g", carbs: "16g", fat: "0.5g" }
      };
    }
    if (/beer/i.test(lower)) {
      return {
        description: "Crisp and frosty chilled local pilsner beer with balanced malt sweetness and subtle hop aroma.",
        estimated_ingredients: ["Malted Barley", "Hops", "Filtered Water", "Yeast"],
        allergens: ["Contains Gluten"],
        calories: 140,
        nutrients: { protein: "1.2g", carbs: "11g", fat: "0g" }
      };
    }
    if (/coffee/i.test(lower)) {
      return {
        description: "Aromatic freshly brewed Kapampangan roasted coffee served steaming hot or iced.",
        estimated_ingredients: ["Brewed Roasted Coffee Beans", "Hot Purified Water", "Sugar / Milk"],
        allergens: /milk|latte/i.test(lower) ? ["Contains Dairy"] : ["None identified"],
        calories: /milk|latte/i.test(lower) ? 120 : 15,
        nutrients: { protein: "1g", carbs: "3g", fat: "0.5g" }
      };
    }
    return {
      description: "Refreshing chilled specialty beverage served ice-cold.",
      estimated_ingredients: [name, "Purified Water", "Ice"],
      allergens: ["None identified"],
      calories: 110,
      nutrients: { protein: "0g", carbs: "27g", fat: "0g" }
    };
  }

  // 2. RICE VARIETIES
  if (cat === 'rice' || /rice|sinangag|cup/i.test(lower)) {
    if (/garlic|sinangag/i.test(lower)) {
      return {
        description: "Fragrant stir-fried rice sautéed in garlic-infused oil and tossed with crunchy golden toasted garlic flakes.",
        estimated_ingredients: ["Steamed White Rice", "Toasted Golden Garlic Bits", "Garlic Oil", "Sea Salt"],
        allergens: ["None identified"],
        calories: 240,
        nutrients: { protein: "4g", carbs: "44g", fat: "5g" }
      };
    }
    if (/dirty/i.test(lower)) {
      return {
        description: "Hearty seasoned rice infused with rich pork drippings, liver bits, and aromatic Kapampangan spices.",
        estimated_ingredients: ["Steamed Rice", "Pork Pan Drippings", "Liver Bits", "Caramelized Onions", "Black Pepper"],
        allergens: ["Contains Pork"],
        calories: 280,
        nutrients: { protein: "8g", carbs: "44g", fat: "8g" }
      };
    }
    return {
      description: "Freshly steamed fragrant white rice, the indispensable staple pairing for authentic Kapampangan meals.",
      estimated_ingredients: ["Steamed White Rice", "Pandan Essence"],
      allergens: ["None identified"],
      calories: 200,
      nutrients: { protein: "4g", carbs: "45g", fat: "0.4g" }
    };
  }

  // 3. DESSERTS
  if (cat === 'dessert' || /flan|halo|dessert|sweet|cake|tibok|turon/i.test(lower)) {
    if (/flan/i.test(lower)) {
      return {
        description: "Velvety smooth, golden steamed caramel custard crafted with rich egg yolks, condensed milk, and dark caramel syrup.",
        estimated_ingredients: ["Egg Yolks", "Condensed Milk", "Evaporated Milk", "Caramelized Cane Sugar"],
        allergens: ["Contains Eggs", "Contains Dairy"],
        calories: 320,
        nutrients: { protein: "7g", carbs: "42g", fat: "14g" }
      };
    }
    if (/halo/i.test(lower)) {
      return {
        description: "Celebrated Filipino shaved ice dessert layered with sweetened beans, nata de coco, jackfruit, leche flan, and evaporated milk.",
        estimated_ingredients: ["Shaved Ice", "Sweet Beans", "Nata de Coco", "Leche Flan", "Ube Halaya", "Evaporated Milk"],
        allergens: ["Contains Dairy", "Contains Eggs"],
        calories: 420,
        nutrients: { protein: "8g", carbs: "78g", fat: "9g" }
      };
    }
    if (/tibok/i.test(lower)) {
      return {
        description: "Pampanga's beloved creamy carabao's milk pudding gently cooked until thick and topped with fragrant golden latik curds.",
        estimated_ingredients: ["Carabao's Milk", "Ground Glutinous Rice", "Cane Sugar", "Toasted Coconut Latik"],
        allergens: ["Contains Dairy"],
        calories: 250,
        nutrients: { protein: "6g", carbs: "38g", fat: "8g" }
      };
    }
    return {
      description: `Traditional sweet Kapampangan ${name} crafted with native ingredients.`,
      estimated_ingredients: [name, "Cane Sugar", "Coconut Milk"],
      allergens: ["Contains Dairy"],
      calories: 280,
      nutrients: { protein: "5g", carbs: "45g", fat: "9g" }
    };
  }

  // 4. SOUPS & BROTHS
  if (cat === 'soup' || /soup|sinigang|bulalo|nilaga|miso|sabaw/i.test(lower)) {
    if (/sinigang/i.test(lower)) {
      const isFish = /salmon|fish|head|belly|bangus|hito/i.test(lower);
      const isShellfish = /shrimp|hipon/i.test(lower);
      const isPork = /pork|baboy|liempo/i.test(lower);
      const algs = isFish ? ["Contains Fish"] : isShellfish ? ["Contains Shellfish"] : isPork ? ["Contains Pork"] : ["None identified"];
      return {
        description: "Signature tamarind-soured Kapampangan broth simmered slow with fresh water spinach (kangkong), radish, and tomatoes.",
        estimated_ingredients: [name, "Tamarind Broth", "Tomatoes", "Onions", "Kangkong", "Radish"],
        allergens: algs,
        calories: isFish || isShellfish ? 220 : 340,
        nutrients: isFish || isShellfish ? { protein: "26g", carbs: "8g", fat: "6g" } : { protein: "28g", carbs: "8g", fat: "20g" }
      };
    }
    if (/bulalo/i.test(lower)) {
      return {
        description: "Rich and comforting beef bone marrow broth slow-boiled with sweet corn on the cob, black peppercorns, and tender native cabbage.",
        estimated_ingredients: ["Beef Shank & Marrow", "Sweet Corn", "Pechay Greens", "Black Peppercorn", "Onions"],
        allergens: ["None identified"],
        calories: 650,
        nutrients: { protein: "42g", carbs: "10g", fat: "48g" }
      };
    }
    return {
      description: `Hearty comforting native soup simmered with slow-cooked broth, garlic, onions, and fresh leafy greens.`,
      estimated_ingredients: [name, "Native Broth Base", "Leafy Greens", "Garlic", "Onions", "Ginger"],
      allergens: ["None identified"],
      calories: 280,
      nutrients: { protein: "22g", carbs: "10g", fat: "12g" }
    };
  }

  // 5. NOODLES & PASTA
  if (cat === 'noodles' || /noodle|bihon|canton|palabok|miki|pasta|spaghetti|guisado/i.test(lower)) {
    if (/palabok|luglug/i.test(lower)) {
      return {
        description: "Thick rice noodles generously smothered in golden shrimp sauce, crushed chicharon, tinapa flakes, and sliced hard-boiled egg.",
        estimated_ingredients: ["Rice Noodles", "Shrimp Gravy", "Tinapa Flakes", "Chicharon Bits", "Hard-boiled Egg", "Calamansi"],
        allergens: ["Contains Shellfish", "Contains Eggs", "Contains Pork"],
        calories: 480,
        nutrients: { protein: "18g", carbs: "62g", fat: "16g" }
      };
    }
    return {
      description: `Traditional stir-fried savory noodles tossed with crisp seasonal vegetables, sliced meat, and rich stock.`,
      estimated_ingredients: [name, "Noodles", "Shredded Chicken / Pork", "Cabbage", "Carrots", "Soy Sauce"],
      allergens: ["Contains Gluten", "Contains Soy"],
      calories: 420,
      nutrients: { protein: "22g", carbs: "54g", fat: "12g" }
    };
  }

  // 6. SPECIFIC PORK & POULTRY & SEAFOOD SPECIALTIES
  if (/kilayin/i.test(lower)) {
    return {
      description: "Traditional Kapampangan braised pork slices, tender liver, and hearty cuts simmered in spiced cane vinegar, garlic, onions, and cracked black pepper.",
      estimated_ingredients: ["Pork Slices", "Pork Liver", "Cane Vinegar", "Garlic", "Onions", "Black Peppercorn"],
      allergens: ["Contains Pork"],
      calories: 380,
      nutrients: { protein: "28g", carbs: "5g", fat: "26g" }
    };
  }

  if (/liempo/i.test(lower)) {
    return {
      description: "Thick-cut pork belly marinated in citrus calamansi, garlic, and savory soy sauce, chargrilled over charcoal until smoky and caramelized.",
      estimated_ingredients: ["Pork Belly (Liempo)", "Calamansi", "Soy Sauce", "Garlic", "Brown Sugar", "Black Pepper"],
      allergens: ["Contains Pork", "Contains Soy"],
      calories: 680,
      nutrients: { protein: "32g", carbs: "4g", fat: "58g" }
    };
  }

  if (/pusit/i.test(lower)) {
    return {
      description: "Fresh whole squid seared with garlic, sweet-savory soy glaze, and chilies, served sizzling tender on a hot plate.",
      estimated_ingredients: ["Fresh Squid", "Garlic", "Soy Sauce", "Calamansi", "Red Chili", "Butter"],
      allergens: ["Contains Mollusk / Shellfish", "Contains Soy"],
      calories: 220,
      nutrients: { protein: "26g", carbs: "8g", fat: "6g" }
    };
  }

  if (/hito/i.test(lower)) {
    return {
      description: "Smoky fresh catfish chargrilled over hot coals with crisp skin and tender sweet flesh, traditionally paired with burong isda or spiced vinegar.",
      estimated_ingredients: ["Fresh Catfish (Hito)", "Sea Salt", "Garlic", "Ginger", "Spiced Dip"],
      allergens: ["Contains Fish"],
      calories: 260,
      nutrients: { protein: "24g", carbs: "1g", fat: "16g" }
    };
  }

  if (/lechon kawali|kawali|bagnet/i.test(lower)) {
    return {
      description: "Deep-fried crispy pork belly boiled with aromatics and flash-fried to blistering crackling perfection with succulent interior meat.",
      estimated_ingredients: ["Pork Belly Slab", "Bay Leaves", "Peppercorns", "Sea Salt", "Garlic", "Spiced Liver Sauce"],
      allergens: ["Contains Pork"],
      calories: 740,
      nutrients: { protein: "34g", carbs: "2g", fat: "64g" }
    };
  }

  if (/pork bbq|pork barbecue/i.test(lower) || (/bbq|barbecue/i.test(lower) && cat === 'pork')) {
    return {
      description: "Skewered tender pork shoulder slices marinated in sweet banana ketchup, soy sauce, calamansi, and garlic, grilled smoky and glossy.",
      estimated_ingredients: ["Pork Shoulder Skewers", "Banana Ketchup", "Soy Sauce", "Calamansi", "Brown Sugar", "Garlic"],
      allergens: ["Contains Pork", "Contains Soy"],
      calories: 240,
      nutrients: { protein: "22g", carbs: "16g", fat: "10g" }
    };
  }

  if (/chicken bbq|chicken barbecue|inasal/i.test(lower)) {
    return {
      description: "Juicy chicken cuts marinated in lemongrass, annatto, calamansi, and garlic, chargrilled smoky and basted with seasoned glaze.",
      estimated_ingredients: ["Chicken Cuts", "Calamansi Juice", "Annatto Oil", "Garlic", "Lemongrass", "Brown Sugar"],
      allergens: ["Contains Poultry"],
      calories: 310,
      nutrients: { protein: "33g", carbs: "12g", fat: "14g" }
    };
  }

  if (/relleno/i.test(lower) && /bangus|fish/i.test(lower)) {
    return {
      description: "Deboned whole milkfish stuffed with seasoned flaked fish meat, minced carrots, sweet raisins, and green peas, baked or fried golden.",
      estimated_ingredients: ["Deboned Bangus", "Flaked Milkfish Meat", "Minced Carrots", "Raisins", "Green Peas", "Eggs", "Aromatics"],
      allergens: ["Contains Fish", "Contains Eggs"],
      calories: 340,
      nutrients: { protein: "28g", carbs: "14g", fat: "18g" }
    };
  }

  if (/bangus/i.test(lower)) {
    return {
      description: "Fresh milkfish stuffed with aromatic diced tomatoes, onions, and ginger, wrapped and grilled over hot coals until fragrant.",
      estimated_ingredients: ["Fresh Bangus (Milkfish)", "Tomatoes", "Onions", "Ginger", "Calamansi", "Sea Salt"],
      allergens: ["Contains Fish"],
      calories: 290,
      nutrients: { protein: "31g", carbs: "2g", fat: "16g" }
    };
  }

  if (/chicken tail|chicken ass|isol/i.test(lower)) {
    return {
      description: "Succulent skewered chicken tail (isol) grilled over live coals until smoky, with rich crispy edges and seasoned sweet barbecue glaze.",
      estimated_ingredients: ["Chicken Tail (Isol)", "Sweet Soy Glaze", "Garlic", "Calamansi", "Brown Sugar"],
      allergens: ["Contains Poultry", "Contains Soy"],
      calories: 360,
      nutrients: { protein: "16g", carbs: "4g", fat: "32g" }
    };
  }

  if (/chicken skin/i.test(lower)) {
    return {
      description: "Crunchy, golden deep-fried chicken skin seasoned lightly with sea salt and garlic, served with spiced cane vinegar dip.",
      estimated_ingredients: ["Crispy Chicken Skin", "Garlic Salt", "Cracked Black Pepper", "Spiced Garlic Vinegar Dip"],
      allergens: ["Contains Poultry"],
      calories: 410,
      nutrients: { protein: "18g", carbs: "4g", fat: "36g" }
    };
  }

  if (/chicken liver|atay/i.test(lower)) {
    return {
      description: "Skewered chicken liver chargrilled until tender and smoky, coated in savory barbecue marinade.",
      estimated_ingredients: ["Chicken Liver", "Garlic", "Soy Sauce", "Calamansi", "Black Pepper"],
      allergens: ["Contains Poultry", "Contains Soy"],
      calories: 190,
      nutrients: { protein: "26g", carbs: "3g", fat: "7g" }
    };
  }

  if (/chicken heart|puso ng manok/i.test(lower)) {
    return {
      description: "Skewered chargrilled chicken hearts basted with sweet-savory barbecue glaze, tender and juicy.",
      estimated_ingredients: ["Chicken Hearts", "Barbecue Glaze", "Garlic", "Soy Sauce", "Black Pepper"],
      allergens: ["Contains Poultry", "Contains Soy"],
      calories: 180,
      nutrients: { protein: "24g", carbs: "2g", fat: "8g" }
    };
  }

  if (/chicken gizzard|balunbalunan/i.test(lower)) {
    return {
      description: "Chewy, flavorful chargrilled chicken gizzard skewers basted in savory garlic-soy marinade.",
      estimated_ingredients: ["Chicken Gizzards", "Garlic", "Soy Sauce", "Calamansi", "Spices"],
      allergens: ["Contains Poultry", "Contains Soy"],
      calories: 160,
      nutrients: { protein: "27g", carbs: "1g", fat: "4g" }
    };
  }

  if (/chicken wing|wings/i.test(lower)) {
    return {
      description: "Crispy fried chicken wings tossed in rich golden butter, toasted garlic bits, and fresh herbs.",
      estimated_ingredients: ["Chicken Wings", "Garlic Butter", "Toasted Garlic", "Sea Salt", "Black Pepper"],
      allergens: ["Contains Poultry", "Contains Dairy"],
      calories: 390,
      nutrients: { protein: "29g", carbs: "8g", fat: "26g" }
    };
  }

  if (/dinuguan|tid-tad/i.test(lower)) {
    return {
      description: "Rich, velvety Kapampangan pork stew simmered in pork blood, spiced cane vinegar, long green chilies, and garlic.",
      estimated_ingredients: ["Pork Belly & Offal", "Pork Blood Broth", "Cane Vinegar", "Green Finger Chilies", "Garlic", "Onions"],
      allergens: ["Contains Pork"],
      calories: 390,
      nutrients: { protein: "29g", carbs: "8g", fat: "26g" }
    };
  }

  if (/sisig/i.test(lower)) {
    return {
      description: "Iconic Kapampangan crispy grilled pork jowl and ears tossed with onions, calamansi, and chili peppers.",
      estimated_ingredients: ["Pork Jowl", "Chicken Liver", "Onions", "Calamansi", "Chili Peppers"],
      allergens: ["Contains Pork"],
      calories: 650,
      nutrients: { protein: "36g", carbs: "6g", fat: "52g" }
    };
  }

  if (/pata/i.test(lower)) {
    return {
      description: "Deep-fried whole pork knuckle cooked to crackling golden perfection with tender, succulent juicy meat.",
      estimated_ingredients: ["Pork Knuckle (Pata)", "Bay Leaves", "Peppercorn", "Garlic", "Sea Salt", "Spiced Soy-Vinegar Dip"],
      allergens: ["Contains Pork"],
      calories: 890,
      nutrients: { protein: "58g", carbs: "1g", fat: "72g" }
    };
  }

  if (/chicharon bulaklak/i.test(lower)) {
    return {
      description: "Crispy deep-fried ruffled fat (mesentery) seasoned with sea salt, served hot with spiced garlic cane vinegar dip.",
      estimated_ingredients: ["Pork Ruffle Fat (Mesentery)", "Sea Salt", "Garlic", "Spiced Cane Vinegar Dip"],
      allergens: ["Contains Pork"],
      calories: 480,
      nutrients: { protein: "14g", carbs: "0g", fat: "46g" }
    };
  }

  if (/chicharon/i.test(lower)) {
    return {
      description: `Crisp and crunchy Kapampangan ${name} seasoned with sea salt, served with spiced vinegar dip.`,
      estimated_ingredients: [name, "Sea Salt", "Spiced Garlic Vinegar Dip"],
      allergens: ["Contains Pork"],
      calories: 320,
      nutrients: { protein: "28g", carbs: "0g", fat: "22g" }
    };
  }

  if (/tokwa'?t\s+baboy/i.test(lower)) {
    return {
      description: "Classic pairing of crispy deep-fried tofu and tender pork slices tossed in spiced soy-vinegar dressing with onions and chili.",
      estimated_ingredients: ["Firm Tofu", "Pork Belly", "Soy Sauce", "Vinegar", "Onions", "Chili"],
      allergens: ["Contains Soy", "Contains Pork"],
      calories: 310,
      nutrients: { protein: "24g", carbs: "10g", fat: "18g" }
    };
  }

  if (/kare[- ]*kare/i.test(lower)) {
    return {
      description: "Kapampangan savory peanut and toasted rice stew loaded with tender beef tripe, eggplant, string beans, and savory bagoong.",
      estimated_ingredients: ["Beef Shank / Tripe", "Ground Peanuts", "Toasted Rice Flour", "Eggplant", "String Beans", "Bagoong Alamang"],
      allergens: ["Contains Peanuts", "Contains Shellfish"],
      calories: 580,
      nutrients: { protein: "34g", carbs: "18g", fat: "42g" }
    };
  }

  if (/kaldereta|caldereta/i.test(lower)) {
    return {
      description: "Hearty tomato-based braised stew with liver spread, sweet bell peppers, carrots, and potatoes with gentle chili warmth.",
      estimated_ingredients: ["Stewing Meat", "Tomato Sauce", "Liver Spread", "Bell Peppers", "Carrots", "Potatoes"],
      allergens: ["None identified"],
      calories: 540,
      nutrients: { protein: "36g", carbs: "16g", fat: "34g" }
    };
  }

  if (/adobo/i.test(lower)) {
    return {
      description: "Traditional Philippine adobo simmered in vinegar, garlic, soy sauce, bay leaves, and cracked black pepper until tender and savory.",
      estimated_ingredients: ["Choice Meat", "Soy Sauce", "Cane Vinegar", "Garlic Cloves", "Bay Leaves", "Black Peppercorns"],
      allergens: ["Contains Soy"],
      calories: 480,
      nutrients: { protein: "35g", carbs: "6g", fat: "34g" }
    };
  }

  if (/bopis/i.test(lower)) {
    return {
      description: "Spicy, finely minced pork heart and lungs sautéed with annatto oil, diced carrots, bell peppers, and finger chilies.",
      estimated_ingredients: ["Minced Pork Heart & Lungs", "Annatto Oil", "Carrots", "Bell Peppers", "Finger Chilies", "Vinegar"],
      allergens: ["Contains Pork"],
      calories: 310,
      nutrients: { protein: "26g", carbs: "6g", fat: "18g" }
    };
  }

  if (/binagoongan/i.test(lower)) {
    return {
      description: "Crisp pork belly chunks sautéed in rich fermented shrimp paste (bagoong alamang) with garlic, chilies, and fried eggplant.",
      estimated_ingredients: ["Pork Belly", "Shrimp Paste (Bagoong Alamang)", "Eggplant", "Tomatoes", "Garlic", "Chili Peppers"],
      allergens: ["Contains Pork", "Contains Shellfish"],
      calories: 560,
      nutrients: { protein: "28g", carbs: "6g", fat: "46g" }
    };
  }

  if (/pinakbet|pakbit/i.test(lower)) {
    return {
      description: "Native indigenous stew of bitter melon, squash, eggplant, okra, and string beans seasoned with savory shrimp paste.",
      estimated_ingredients: ["Squash", "Bitter Melon (Ampalaya)", "Eggplant", "Okra", "String Beans", "Shrimp Paste"],
      allergens: ["Contains Shellfish"],
      calories: 180,
      nutrients: { protein: "6g", carbs: "22g", fat: "7g" }
    };
  }

  if (/chopsuey/i.test(lower)) {
    return {
      description: "Crisp stir-fried vegetable medley of cauliflower, carrots, snap peas, and bell peppers in a light savory glaze.",
      estimated_ingredients: ["Cauliflower", "Carrots", "Snow Peas", "Bell Peppers", "Chicken Strips", "Quail Eggs"],
      allergens: ["Contains Eggs", "Contains Soy"],
      calories: 210,
      nutrients: { protein: "12g", carbs: "18g", fat: "9g" }
    };
  }

  // 7. DYNAMIC CULINARY GENERATION BY COOKING METHOD AND PROTEIN
  const isGrilled = /grilled|inihaw|barbecue|bbq/i.test(lower);
  const isSizzling = /sizzling|sizzin/i.test(lower);
  const isFried = /crispy|fried|prito|crunchy/i.test(lower);
  const isPork = cat === 'pork' || /pork|baboy|liempo|pata|jowl/i.test(lower);
  const isPoultry = cat === 'poultry' || /chicken|chick|manok|poultry/i.test(lower);
  const isSeafood = cat === 'seafood' || /fish|bangus|tilapia|squid|pusit|shrimp|hipon|tahong|seafood|salmon/i.test(lower);
  const isBeef = cat === 'beef' || /beef|baka|bulalo/i.test(lower);

  let desc = "";
  let ings = [name];
  let algs = ["None identified"];
  let cal = 450;
  let nuts = { protein: "26g", carbs: "10g", fat: "20g" };

  if (isGrilled) {
    if (isSeafood) {
      desc = `Fresh ${name} chargrilled over hot coals with sea salt and calamansi, smoky and tender.`;
      ings = [name, "Calamansi", "Sea Salt", "Garlic", "Ginger"];
      algs = /shrimp|hipon|tahong|pusit/i.test(lower) ? ["Contains Shellfish"] : ["Contains Fish"];
      cal = 250;
      nuts = { protein: "28g", carbs: "2g", fat: "14g" };
    } else if (isPoultry) {
      desc = `Tender skewered ${name} chargrilled over charcoal with sweet-savory basting glaze.`;
      ings = [name, "Sweet Soy Glaze", "Garlic", "Calamansi", "Spices"];
      algs = ["Contains Poultry", "Contains Soy"];
      cal = 320;
      nuts = { protein: "32g", carbs: "10g", fat: "15g" };
    } else {
      desc = `Succulent ${name} marinated in calamansi and garlic, grilled to smoky perfection over live coals.`;
      ings = [name, "Garlic", "Soy Marinade", "Calamansi", "Spices"];
      algs = isPork ? ["Contains Pork", "Contains Soy"] : isBeef ? ["Contains Soy"] : ["None identified"];
      cal = isPork ? 580 : 420;
      nuts = isPork ? { protein: "30g", carbs: "6g", fat: "48g" } : { protein: "34g", carbs: "6g", fat: "26g" };
    }
  } else if (isSizzling) {
    desc = `Seared tender ${name} served sizzling on a cast-iron platter with caramelized onions and rich savory sauce.`;
    ings = [name, "Onions", "Calamansi", "Butter", "Chili Peppers"];
    algs = isPork ? ["Contains Pork"] : isPoultry ? ["Contains Poultry"] : isSeafood ? ["Contains Shellfish"] : ["None identified"];
    cal = isPork ? 540 : 380;
    nuts = { protein: "30g", carbs: "8g", fat: isPork ? "42g" : "24g" };
  } else if (isFried) {
    desc = `Golden deep-fried ${name} cooked to crisp perfection, served hot with seasoned dipping sauce.`;
    ings = [name, "Flour Coating", "Garlic Salt", "Black Pepper", "Spiced Dip"];
    algs = isPork ? ["Contains Pork"] : isPoultry ? ["Contains Poultry"] : isSeafood ? ["Contains Fish"] : ["None identified"];
    cal = isPork ? 680 : 440;
    nuts = { protein: "28g", carbs: "12g", fat: "32g" };
  } else if (isSeafood) {
    desc = `Ocean-fresh ${name} cooked with native aromatics and citrus, highlighting its delicate natural flavor.`;
    ings = [name, "Ginger", "Garlic", "Onions", "Calamansi"];
    algs = /shrimp|hipon|tahong|pusit/i.test(lower) ? ["Contains Shellfish"] : ["Contains Fish"];
    cal = 240;
    nuts = { protein: "26g", carbs: "4g", fat: "12g" };
  } else if (isPoultry) {
    desc = `Tender choice chicken cuts simmered slow with savory aromatics until succulent and rich.`;
    ings = [name, "Garlic", "Onions", "Bay Leaves", "Black Pepper"];
    algs = ["Contains Poultry"];
    cal = 340;
    nuts = { protein: "32g", carbs: "4g", fat: "20g" };
  } else if (isPork) {
    desc = `Hearty pork cuts cooked tender with garlic, onions, and native Kapampangan spices.`;
    ings = [name, "Garlic", "Onions", "Black Pepper", "Bay Leaves"];
    algs = ["Contains Pork"];
    cal = 560;
    nuts = { protein: "30g", carbs: "4g", fat: "46g" };
  } else if (isBeef) {
    desc = `Slow-braised beef cuts simmered in rich savory broth until fork-tender and flavorful.`;
    ings = [name, "Beef Broth", "Garlic", "Onions", "Black Peppercorn"];
    algs = ["None identified"];
    cal = 520;
    nuts = { protein: "36g", carbs: "6g", fat: "38g" };
  } else {
    desc = `Delicious freshly prepared ${name} cooked with traditional Filipino aromatics.`;
    ings = [name, "Garlic", "Onions", "Sea Salt"];
    algs = ["None identified"];
    cal = 380;
    nuts = { protein: "22g", carbs: "14g", fat: "18g" };
  }

  return {
    description: desc,
    estimated_ingredients: ings,
    allergens: algs,
    calories: cal,
    nutrients: nuts
  };
}

/**
 * Estimate dish calories based on culinary identity.
 */
export function estimateDishCalories(name, category = '') {
  const meta = generateDishDescriptionAndIngredients(name, category);
  return meta.calories || 450;
}

/**
 * Estimate dish macronutrients (Protein, Carbs, Fat) based on culinary identity.
 */
export function estimateDishNutrients(name, category = '', calories = 450) {
  const meta = generateDishDescriptionAndIngredients(name, category);
  return meta.nutrients || { protein: "24g", carbs: "12g", fat: "20g" };
}

/**
 * Detect whether an item is actually a combo or set package rather than a single à la carte dish.
 */
export function isPackageOrCombo(name) {
  if (!name || typeof name !== 'string') return false;
  const n = name.toLowerCase();

  // Explicit combo indicators e.g. "F- Chicken Tail Side Dish, Ice Drinks", "1S- Lechon Kamar, Side Dies, Alice, Driske"
  if (/^(?:f\d+|[1-9]s|set|combo|package|funnmeal)\b/i.test(n) && (n.includes('side') || n.includes('rice') || n.includes('drink') || n.includes('crisp') || n.includes(','))) {
    return true;
  }

  // Side dish + Rice or Drink presence
  if ((n.includes('side dish') || n.includes('side dies') || n.includes('side diss')) && 
      (n.includes('rice') || n.includes('drink') || n.includes('crisp') || n.includes('alice') || n.includes('driske') || n.includes('ice'))) {
    return true;
  }

  if (/side\s+dirty\s+rice/i.test(n) && (n.includes('liempo') || n.includes('chicken') || n.includes('crisp') || n.includes('roll'))) {
    return true;
  }

  return false;
}

/**
 * Split a combo line into a structured package item.
 */
export function splitComboIntoPackage(name, price = 125) {
  const cleaned = cleanDishOrPackageName(name);
  const parts = cleaned
    .split(/[,+]|\b(?:with|w\/)\b/i)
    .map(s => cleanDishOrPackageName(s.trim()))
    .filter(Boolean);

  let pkgTitle = parts[0] || "Set Meal Combo";
  if (!/meal|combo|package|set/i.test(pkgTitle)) {
    pkgTitle = `${pkgTitle} Meal`;
  }

  const dishes = parts.length > 1 ? parts : [cleaned, "Side Dish", "Steamed / Dirty Rice", "Iced Drink"];

  return {
    package_name: pkgTitle,
    pricing_model: "FIXED_TOTAL",
    price: repairPricings(price, pkgTitle),
    calories: 680,
    minimum_pax: null,
    included_dishes: dishes,
    other_inclusions: ["Steamed Rice / Dirty Rice", "Choice of Side Dish (Coleslaw or Buttered Vegetables)", "Drink"],
    selection_rules: "Served fresh with side dish and beverage"
  };
}

/**
 * Categorize dishes properly based on actual culinary identities.
 */
export function categorizeDishProperly(name, currentCategory = 'Mains') {
  const n = (name || '').toLowerCase();
  if (/soup|sinigang|bulalo|nilaga|miso/i.test(n)) return 'Soup';
  if (/noodle|bihon|canton|palabok|miki|pasta|spaghetti|guisado/i.test(n)) return 'Noodles';
  if (/water|beverage|drink|coke|royal|sprite|tea|juice|shake/i.test(n)) return 'Beverage';
  if (/rice|cup|sinangag/i.test(n)) return 'Rice';
  if (/salmon|bangus|tilapia|shrimp|fish|seafood|tahong|tempura|hipon/i.test(n)) return 'Seafood';
  if (/chicken|wings|inasal|manuk|chick/i.test(n)) return 'Poultry';
  if (/pork|sisig|liempo|kawali|bulaklak|balat|chicharon|bbq|pata/i.test(n)) return 'Pork';
  if (/flan|halo|dessert|sweet|cake/i.test(n)) return 'Dessert';
  if (/hotdog|garlic/i.test(n)) return 'Grilled';
  return currentCategory || 'Mains';
}

/**
 * Comprehensive OCR string spell-checker.
 */
export function cleanMenuOcrSpelling(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text;

  // Apply word replacements
  for (const { regex, replace } of OCR_WORD_REPLACEMENTS) {
    cleaned = cleaned.replace(regex, replace);
  }

  // Repair clipped package prices (e.g. P11 -> ₱115, P12 -> ₱125)
  cleaned = cleaned.replace(/\b[P₱]\s*11\b(?!\d)/g, '₱115');
  cleaned = cleaned.replace(/\b[P₱]\s*12\b(?!\d)/g, '₱125');
  cleaned = cleaned.replace(/\b[P₱]\s*13\b(?!\d)/g, '₱130');

  return cleaned;
}

/**
 * Clean dish or package title.
 */
export function cleanDishOrPackageName(name) {
  if (!name || typeof name !== 'string') return '';
  let cleaned = name.trim();

  // Normalize code prefixes e.g. "F2-Chicaen" -> "F2 - Chicken"
  cleaned = cleaned.replace(/^([A-Z]\d+)(?:\s*[-–—:]+\s*|\s+)/i, '$1 - ');
  cleaned = cleaned.replace(/(?:\s*[-–—:]+\s*){2,}/g, ' - ');

  for (const { regex, replace } of OCR_WORD_REPLACEMENTS) {
    cleaned = cleaned.replace(regex, replace);
  }

  // Fix common Alice -> Rice when inside combo phrases
  cleaned = cleaned.replace(/\bAlice\b/g, 'Rice');

  return cleaned
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Price recovery for clipped OCR digits.
 */
export function repairPricings(price, contextName = '') {
  let p = Number(price);
  if (isNaN(p) || p <= 0) return 100;
  // If price is 11, 12, 13 (clipped OCR digit on combo meal)
  if (p === 11) return 115;
  if (p === 12) return 125;
  if (p === 13) return 130;
  if (p === 14) return 140;
  if (p === 15 && /set|package|meal|combo|legs|shrimp|roll/i.test(contextName)) return 150;
  // Phone numbers misinterpreted as prices (e.g. 961, 939, 925, 933)
  if (p > 900 && /\b\d{3,4}[-\s.]\d{4}\b/.test(contextName)) return 120;
  return p;
}

/**
 * Sanitize full menu catalog result:
 * 1. Filters out telephone numbers, decimal fragments, flyer conditions, and logo noise (e.g., Aling, ucing).
 * 2. Moves combo items into buffet_and_set_packages.
 * 3. Enforces valid dish names (rejecting non-food stray words).
 * 4. Ensures drinks NEVER say "local seasoning", garlic, or onions.
 * 5. Returns is_valid_menu = false if input is not a restaurant menu.
 */
export function sanitizeMenuCatalog(catalog, rawInputText = '') {
  if (!catalog || typeof catalog !== 'object') {
    return {
      is_valid_menu: false,
      error: "The uploaded image does not appear to be a restaurant menu or food flyer.",
      restaurant_or_menu_title: "Non-Menu Image Detected",
      currency: "PHP",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  // If catalog already explicitly flagged invalid menu
  if (catalog.is_valid_menu === false) {
    return {
      ...catalog,
      is_valid_menu: false,
      error: catalog.error || "The uploaded image does not appear to be a restaurant menu or food flyer.",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  // If raw input text was provided and fails menu verification
  if (rawInputText && !isLikelyValidMenu(rawInputText)) {
    return {
      ...catalog,
      is_valid_menu: false,
      error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
      restaurant_or_menu_title: "Non-Menu Image Detected",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  const rawDishes = Array.isArray(catalog.dishes) ? catalog.dishes : [];
  const rawPackages = Array.isArray(catalog.buffet_and_set_packages) ? catalog.buffet_and_set_packages : [];

  const cleanDishes = [];
  const cleanPackages = [...rawPackages.map(pkg => ({
    ...pkg,
    package_name: cleanDishOrPackageName(pkg.package_name || ''),
    price: repairPricings(pkg.price, pkg.package_name),
    included_dishes: Array.isArray(pkg.included_dishes) ? pkg.included_dishes.map(cleanDishOrPackageName) : []
  }))];

  for (const dish of rawDishes) {
    if (!dish || !dish.name) continue;
    const rawName = String(dish.name).trim();

    // 1. Skip boilerplate, phone numbers, decimal fragments, and headers
    if (isGarbageOrBoilerplate(rawName) || isSectionHeader(rawName)) continue;
    if (!isValidDishName(rawName, Boolean(dish.price))) continue;

    // 2. If it's a combo meal, move to packages!
    if (isPackageOrCombo(rawName)) {
      cleanPackages.push(splitComboIntoPackage(rawName, dish.price));
      continue;
    }

    // 3. Clean dish name
    const cleanedName = cleanDishOrPackageName(rawName);
    if (isGarbageOrBoilerplate(cleanedName) || isSectionHeader(cleanedName)) continue;
    if (!isValidDishName(cleanedName, Boolean(dish.price))) continue;

    const finalCat = categorizeDishProperly(cleanedName, dish.category);
    const finalPrice = repairPricings(dish.price, cleanedName);
    const dishMeta = generateDishDescriptionAndIngredients(
      cleanedName,
      finalCat,
      dish.description,
      dish.estimated_ingredients
    );

    const calculatedCalories = typeof dishMeta.calories === 'number'
      ? dishMeta.calories
      : (typeof dish.calories === 'number' && dish.calories !== 450 ? dish.calories : estimateDishCalories(cleanedName, finalCat));
    const calculatedNutrients = dishMeta.nutrients || estimateDishNutrients(cleanedName, finalCat, calculatedCalories);

    cleanDishes.push({
      ...dish,
      name: cleanedName,
      category: finalCat,
      price: finalPrice,
      description: dishMeta.description,
      estimated_ingredients: dishMeta.estimated_ingredients,
      allergens: dishMeta.allergens || dish.allergens || ["None identified"],
      calories: calculatedCalories,
      nutrients: calculatedNutrients
    });
  }

  // If zero valid dishes or packages were found, mark as non-menu!
  if (cleanDishes.length === 0 && cleanPackages.length === 0) {
    return {
      ...catalog,
      is_valid_menu: false,
      error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
      restaurant_or_menu_title: "Non-Menu Image Detected",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  return {
    ...catalog,
    is_valid_menu: true,
    dishes: cleanDishes,
    buffet_and_set_packages: cleanPackages
  };
}
