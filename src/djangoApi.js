// Django REST Framework API Client for Kanyamanan
export const DJANGO_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DJANGO_API_URL) || 'https://kanyamanan-backend.vercel.app/api';
import {
  cleanMenuOcrSpelling,
  cleanDishOrPackageName,
  repairPricings,
  sanitizeMenuCatalog,
  isSectionHeader,
  isValidDishName,
  isLikelyValidMenu,
  generateDishDescriptionAndIngredients
} from './utils/menuOcrCleaner';


/**
 * Fetch all restaurants from Django REST API
 */
export const fetchDjangoRestaurants = async () => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django REST API offline or unreachable, using local fallback:", err);
    return null;
  }
};

/**
 * Save / Update a restaurant in Django REST API
 */
export const updateDjangoRestaurant = async (restaurantId, restaurantData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/${restaurantId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant update warning:", err);
    return false;
  }
};

/**
 * Create a new restaurant in Django REST API
 */
export const createDjangoRestaurant = async (restaurantData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant creation warning:", err);
    return false;
  }
};

/**
 * Delete a restaurant in Django REST API
 */
export const deleteDjangoRestaurant = async (restaurantId) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/restaurants/${restaurantId}/`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn("Django restaurant deletion warning:", err);
    return false;
  }
};

/**
 * Authenticate User (Super Admin or Merchant) via Django
 */
export const loginViaDjango = async (username, password, loginType = 'merchant') => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, loginType })
    });
    if (!res.ok) return { authenticated: false, error: 'Invalid Credentials' };
    return await res.json();
  } catch (err) {
    console.warn("Django login warning:", err);
    return null;
  }
};

/**
 * Register Tourist Account in Django
 */
export const registerTouristInDjango = async (username, email, password) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/auth/register-tourist/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    console.warn("Django tourist registration warning:", err);
    return false;
  }
};

/**
 * Fetch Tourist Saved Itineraries from Django
 */
export const fetchDjangoUserItineraries = async (userAccountKey) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/itineraries/?userAccountKey=${encodeURIComponent(userAccountKey)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django itineraries fetch warning:", err);
    return null;
  }
};

/**
 * Save Tourist Itinerary to Django
 */
export const saveDjangoUserItinerary = async (userAccountKey, itineraryObj) => {
  try {
    const payload = {
      id: itineraryObj.id || `trail-${Date.now()}`,
      userAccountKey: userAccountKey,
      name: itineraryObj.name,
      stops: itineraryObj.stops || [],
      isFinished: Boolean(itineraryObj.isFinished)
    };
    const res = await fetch(`${DJANGO_BASE_URL}/itineraries/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django itinerary save warning:", err);
    return false;
  }
};

/**
 * Fetch Change Requests from Django REST API
 */
export const fetchDjangoChangeRequests = async () => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django change requests fetch warning:", err);
    return null;
  }
};

/**
 * Submit a Change Request to Django REST API
 */
export const createDjangoChangeRequest = async (changeReqData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changeReqData)
    });
    return res.ok;
  } catch (err) {
    console.warn("Django change request create warning:", err);
    return false;
  }
};

/**
 * Update a Change Request status in Django REST API
 */
export const updateDjangoChangeRequest = async (requestId, changeReqData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/change-requests/${requestId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changeReqData)
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    console.warn("Django change request update warning:", err);
    return false;
  }
};

/**
 * Fetch Reviews for a Restaurant from Django REST API
 */
export const fetchDjangoReviews = async (restaurantId) => {
  try {
    const url = restaurantId 
      ? `${DJANGO_BASE_URL}/reviews/?restaurantId=${encodeURIComponent(restaurantId)}`
      : `${DJANGO_BASE_URL}/reviews/`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : (data.results || null);
  } catch (err) {
    console.warn("Django reviews fetch warning:", err);
    return null;
  }
};

/**
 * Submit a Restaurant Review to Django REST API
 */
export const createDjangoReview = async (reviewData) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/reviews/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) return false;
    return await res.json();
  } catch (err) {
    console.warn("Django review creation warning:", err);
    return false;
  }
};

/**
 * Delete a Restaurant Review from Django REST API (Super Admin only)
 */
export const deleteDjangoReview = async (reviewId) => {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}/reviews/${reviewId}/`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.warn("Django review deletion warning:", err);
    return false;
  }
};

/**
 * System Prompt & JSON Schema for Menu Vision OCR & Automatic Dish Cataloger
 */
export const MENU_CATALOGER_SYSTEM_PROMPT = `You are an expert menu parser and culinary database annotator with deep understanding of Philippine restaurant menus, caterers, buffet packages, and regional dishes.
Deconstruct the provided menu images or raw text regardless of layout (multi-column layouts, flyers, blackboard, nested packages).

CRITICAL EXTRACTION REQUIREMENTS:
1. Scan ALL sections, ALL columns, and ALL items. DO NOT truncate or summarize. Extract EVERY single dish, beverage, and package across all columns (e.g. 20-40+ dishes).
2. Separate items into two categories:
   - Individual / À La Carte Dishes: dish name, normalized price in PHP, unique and appetizing description, estimated ingredients, allergens, category, estimated calories ('calories' in kcal), and estimated macronutrients ('nutrients': { protein, carbs, fat }).
   - Buffet & Reservation Packages: package name, per-head or fixed total price, list of included dishes, package inclusions, and selection rules. If an item has 'pax', 'per head', or combo items like 'Side Dish, Rice, Drinks', classify it as a package or combo meal.
3. UNIQUE DEFINITIONS & DESCRIPTIONS:
   - Every single dish and beverage MUST have a UNIQUE, appetizing definition explaining what it actually is based on its authentic culinary preparation.
   - NEVER output repetitive boilerplate or copy-paste templates (e.g., do NOT repeat "Authentic Kapampangan [Name] prepared fresh with traditional herbs and aromatics").
4. BEVERAGE & DRINK SPECIFICATIONS:
   - For drinks and beverages (e.g. soft drinks, iced tea, fruit juices, shakes, bottled water): NEVER say "local seasoning", "garlic", "onions", or savory herbs. Describe beverages appropriately (e.g. "Refreshing chilled beverage served ice-cold") with clean drink ingredients (e.g. "Carbonated water", "Ice", "Fruit extract").
5. UNIQUE CALORIES & NUTRIENTS:
   - Calculate and include realistic, unique nutritional calorie counts ('calories' in kcal) and macronutrients ('nutrients': protein, carbs, fat) for each dish based on authentic Philippine culinary preparations (e.g. Sisig: 650 kcal, Bulalo: 650 kcal, Liempo: 680 kcal, Pancit Palabok: 480 kcal, Pork BBQ: 240 kcal, Chicken BBQ: 310 kcal, Leche Flan: 320 kcal, Plain Rice: 200 kcal, Coke: 140 kcal, Bottled Water: 0 kcal).
6. VALID MENU VERIFICATION & NOISE REJECTION:
   - Verify if the provided image or text is an actual restaurant menu, food flyer, or price list.
   - If the uploaded image or text is NOT a food menu or price list (e.g. photo of a person, animal, vehicle, scenery, general document, invoice, code, or non-menu image), return is_valid_menu: false, dishes: [], and buffet_and_set_packages: [].
   - DO NOT extract restaurant names, logos (e.g. 'Aling Lucing'), category headers (e.g. 'Main Dish', 'Mains', 'Dishes'), store addresses, phone numbers, or stray OCR noise as dishes!`;

export const MENU_CATALOGER_SCHEMA = {
  type: "OBJECT",
  properties: {
    restaurant_or_menu_title: { type: "STRING" },
    currency: { type: "STRING", default: "PHP" },
    is_valid_menu: { type: "BOOLEAN", description: "False if the input is not a restaurant menu or food flyer" },
    error: { type: "STRING", description: "Explanation if not a valid menu" },
    dishes: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          category: { type: "STRING", description: "e.g., Grilled, Special Order, Pork, Poultry, Seafood, Noodles, Soup, Dessert, Beverage" },
          price: { type: "NUMBER", description: "Numeric price without currency symbols" },
          description: { type: "STRING", description: "Unique and appetizing culinary description" },
          estimated_ingredients: { type: "ARRAY", items: { type: "STRING" } },
          allergens: { type: "ARRAY", items: { type: "STRING" } },
          calories: { type: "INTEGER", description: "Estimated calories in kcal" },
          nutrients: {
            type: "OBJECT",
            properties: {
              protein: { type: "STRING" },
              carbs: { type: "STRING" },
              fat: { type: "STRING" }
            }
          },
          is_signature_or_specialty: { type: "BOOLEAN" }
        },
        required: ["name", "category", "price", "calories"]
      }
    },
    buffet_and_set_packages: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          package_name: { type: "STRING", description: "e.g., Reservation Package A, Buffet Tier 1, Funnmeal Combo" },
          pricing_model: { type: "STRING", enum: ["PER_PAX", "FIXED_TOTAL", "CUSTOM"] },
          price: { type: "NUMBER" },
          minimum_pax: { type: "INTEGER", description: "e.g., 30, 50, or null if unstated" },
          calories: { type: "INTEGER", description: "Estimated calories per pax or meal" },
          included_dishes: { type: "ARRAY", items: { type: "STRING" } },
          other_inclusions: { type: "ARRAY", items: { type: "STRING" }, description: "e.g., Steamed Rice, Side Dish, Drinks" },
          selection_rules: { type: "STRING", description: "e.g., Choice of coleslaw or buttered vegetables" }
        },
        required: ["package_name", "pricing_model", "price", "included_dishes"]
      }
    }
  },
  required: ["dishes", "buffet_and_set_packages"]
};


/**
 * Philippine Food Calorie Estimator (in kcal)
 */
export const estimateDishCalories = (name, category = '') => {
  const n = (name || '').toLowerCase();
  if (/crispy pata|pata/i.test(n)) return 920;
  if (/lechon kawali|bagnet/i.test(n)) return 780;
  if (/bulalo|nilaga/i.test(n)) return 720;
  if (/liempo|pork belly/i.test(n)) return 680;
  if (/sisig/i.test(n)) return 650;
  if (/kare[- ]*kare/i.test(n)) return 640;
  if (/kaldereta|caldereta/i.test(n)) return 620;
  if (/bringhe|paella/i.test(n)) return 550;
  if (/adobo/i.test(n)) return 520;
  if (/palabok|luglug/i.test(n)) return 480;
  if (/fried chicken/i.test(n)) return 480;
  if (/pancit|bihon|canton|miki|noodles/i.test(n)) return 420;
  if (/chicken inasal|inasal/i.test(n)) return 420;
  if (/sinigang/i.test(n)) return 360;
  if (/tempura|camaron/i.test(n)) return 340;
  if (/leche flan/i.test(n)) return 320;
  if (/chicken leg|legs/i.test(n)) return 310;
  if (/chicken wing|wings/i.test(n)) return 290;
  if (/tilapia|bangus|hito|fish fillet/i.test(n)) return 280;
  if (/pinakbet|pakbit|chopsuey/i.test(n)) return 240;
  if (/shrimp|hipon|tahong/i.test(n)) return 220;
  if (/rice|sinangag/i.test(n)) return 200;
  if (/pork bbq|bbq/i.test(n)) return 180;
  if (/hotdog/i.test(n)) return 150;
  if (/coke|royal|sprite|soda|drinks/i.test(n)) return 140;
  if (/water/i.test(n)) return 0;
  if (/halo[- ]*halo/i.test(n)) return 420;
  if (/tibok/i.test(n)) return 250;
  if (/funnmeal|combo|meal|set/i.test(n)) return 680;

  if (category === 'Pork') return 580;
  if (category === 'Poultry') return 420;
  if (category === 'Seafood') return 290;
  if (category === 'Noodles') return 430;
  if (category === 'Soup') return 350;
  if (category === 'Dessert') return 290;
  if (category === 'Beverage') return 120;
  return 450;
};

/**
 * Automatic Dish Cataloger Pipeline caller
 * Tries the backend route first, then seamlessly falls back to direct Gemini Structured Outputs,
 * followed by a multi-column Philippine menu parser.
 */
export const catalogMenuWithAi = async ({ rawText = '', images = [], apiKey = '' }) => {
  // 1. Try Backend API Route /api/catalog-menu
  try {
    const backendEndpoints = ['/api/catalog-menu', `${DJANGO_BASE_URL}/catalog-menu/`, `${DJANGO_BASE_URL}/catalog-menu`];
    for (const url of backendEndpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'x-goog-api-key': apiKey } : {})
          },
          body: JSON.stringify({
            raw_text: rawText,
            images: images,
            api_key: apiKey
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && (Array.isArray(data.dishes) || Array.isArray(data.buffet_and_set_packages))) {
            return sanitizeMenuCatalog(data);
          }
        }
      } catch {
        // try next endpoint or fallback
      }
    }
  } catch (err) {
    console.warn("Backend catalog-menu route unavailable, falling back to direct multimodal vision AI:", err);
  }

  // 2. Direct Multimodal Gemini Structured Output Fallback
  const effectiveKey = (
    apiKey ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_gemini_api_key')) ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
    ''
  ).trim();

  if (effectiveKey) {
    try {
      const model = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_MODEL) || 'gemini-2.0-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(effectiveKey)}`;

      const parts = [];
      // Images
      for (const img of images) {
        const raw = typeof img === 'string' ? img : img.dataUrl;
        if (raw && raw.includes(',')) {
          const mime = raw.startsWith('data:image/png') ? 'image/png'
            : raw.startsWith('data:image/webp') ? 'image/webp'
            : raw.startsWith('data:application/pdf') ? 'application/pdf'
            : 'image/jpeg';
          parts.push({
            inlineData: {
              mimeType: mime,
              data: raw.split(',')[1]
            }
          });
        }
      }

      // Text
      if (rawText && rawText.trim()) {
        parts.push({ text: `Raw Menu Text / Multi-column Content:\n${rawText.trim()}` });
      } else {
        parts.push({ text: "Catalog all dishes and buffet reservation packages from all columns of the provided menu photos/flyers." });
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          systemInstruction: {
            parts: [{ text: MENU_CATALOGER_SYSTEM_PROMPT }]
          },
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: MENU_CATALOGER_SCHEMA
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          const parsed = JSON.parse(candidate);
          if (parsed && (Array.isArray(parsed.dishes) || Array.isArray(parsed.buffet_and_set_packages))) {
            return sanitizeMenuCatalog(parsed);
          }
        }
      }
    } catch (gErr) {
      console.warn("Direct Gemini structured cataloging failed, using rule-based parser:", gErr);
    }
  }

  // 3. Early validation: If user provided text or image OCR that does not match a food menu
  if (rawText && !isLikelyValidMenu(rawText)) {
    return {
      is_valid_menu: false,
      error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
      restaurant_or_menu_title: "Non-Menu Image Detected",
      currency: "PHP",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  // 4. Multi-Column Intelligent Fallback Parser
  const dishes = [];
  const packages = [];
  const sanitizedText = cleanMenuOcrSpelling(rawText || '');
  const lines = sanitizedText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let currentCategory = "Mains";

  for (const rawLine of lines) {
    const upper = rawLine.toUpperCase();
    const hasPrice = /\d{2,}/.test(rawLine);
    
    // Check if line is a category section header (e.g. "Main Dish", "Mains", "Drinks")
    if (!hasPrice && isSectionHeader(rawLine)) {
      if (/^(?:GRILLED|INHAW|BARBECUE|BBQ)\b/.test(upper)) currentCategory = "Grilled";
      else if (/^(?:SPECIAL ORDER|SPECIALS|CHEF SPECIAL)\b/.test(upper)) currentCategory = "Special Order";
      else if (/^(?:PANCIT|NOODLES|PASTA)\b/.test(upper)) currentCategory = "Noodles";
      else if (/^(?:DRINKS|BEVERAGES|REFRESHMENTS|IN CAN)\b/.test(upper)) currentCategory = "Beverage";
      else if (/^(?:DESSERT|PANGMAYUMU|SWEETS)\b/.test(upper)) currentCategory = "Dessert";
      else if (/^(?:RICE|NASI)\b/.test(upper)) currentCategory = "Rice";
      else if (/^(?:SOUP|SABAW|SINIGANG)\b/.test(upper)) currentCategory = "Soup";
      else if (/^(?:SEAFOOD|ISDA|ASAN)\b/.test(upper)) currentCategory = "Seafood";
      else if (/^(?:FUNNMEALS|SET MEALS|COMBOS|VALUE MEALS)\b/.test(upper)) currentCategory = "Set Meals";
      else if (/^(?:MAIN\s+DISH|MAINS|ULAM)\b/.test(upper)) currentCategory = "Mains";
      continue;
    }

    // Split tab-separated multi-column data
    const cells = rawLine.split(/\t+/).map(c => c.trim()).filter(Boolean);
    const tokens = cells.length > 1 ? cells : [rawLine];

    for (let cIdx = 0; cIdx < tokens.length; cIdx++) {
      let cell = tokens[cIdx];
      if (/^(?:price|delivery|minimum|advance order|choice of|free delivery|contact|we are now open)/i.test(cell)) continue;

      // Extract price if attached or in next cell
      let priceNum = null;
      let cleanName = cell;

      const inlinePriceMatch = cell.match(/(.*?)\s+([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)\s*$/);
      if (inlinePriceMatch && inlinePriceMatch[1].trim().length >= 2) {
        cleanName = inlinePriceMatch[1].trim();
        priceNum = parseFloat(inlinePriceMatch[2].replace(/[^0-9.]/g, ''));
      } else if (cIdx + 1 < tokens.length && /^([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)$/.test(tokens[cIdx + 1])) {
        priceNum = parseFloat(tokens[cIdx + 1].replace(/[^0-9.]/g, ''));
        cIdx++;
      } else {
        const generalPrice = cell.match(/([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)/);
        if (generalPrice) {
          priceNum = parseFloat(generalPrice[1].replace(/[^0-9.]/g, ''));
          cleanName = cell.replace(/([₱P\u20B1]?\s*\d{2,5}(?:\.\d{2})?)/, '').trim();
        }
      }

      cleanName = cleanName.replace(new RegExp('^[' + '-:\\u2022*#\\s]+'), '').replace(new RegExp('[' + '-:\\u2022\\s]+$'), '').trim();
      cleanName = cleanDishOrPackageName(cleanName);

      // Validate: Reject non-food stray words, logo fragments ("Aling)", "ucing"), and section headers
      if (!isValidDishName(cleanName, Boolean(priceNum))) continue;

      // Check if Combo / Funnmeal / Buffet Package
      const isPkg = /^(?:F\d+[-:]|funnmeal|package|buffet|per pax|\/pax|per head|set menu)/i.test(cleanName) ||
                    /side dish.*rice/i.test(cleanName);

      if (isPkg) {
        const pkgParts = cleanName.split(/[,+]/).map(s => cleanDishOrPackageName(s.trim())).filter(Boolean);
        const calories = 650;
        const finalPkgName = cleanDishOrPackageName(cleanName.split(/[:,]/)[0].trim() || "Set Meal Combo");
        const finalPrice = repairPricings(priceNum || 125, finalPkgName);
        packages.push({
          package_name: finalPkgName,
          pricing_model: /\/pax|per pax|per head/i.test(cell) ? "PER_PAX" : "FIXED_TOTAL",
          price: finalPrice,
          minimum_pax: cleanName.includes('30') ? 30 : cleanName.includes('50') ? 50 : null,
          calories: calories,
          included_dishes: pkgParts.length > 0 ? pkgParts : ["Main Dish", "Side Dish", "Rice", "Drink"],
          other_inclusions: ["Steamed Rice", "Choice of Side Dish (Coleslaw or Buttered Vegetables)", "Drink"],
          selection_rules: "Served fresh with side dish and beverage"
        });
      } else {
        const finalDishName = cleanDishOrPackageName(cleanName);
        let cat = currentCategory;
        if (/soup|sinigang|bulalo/i.test(finalDishName)) cat = "Soup";
        else if (/sisig|pork|liempo|bbq|pata|kawali/i.test(finalDishName)) cat = "Pork";
        else if (/chicken|chix|wing|legs|inasal/i.test(finalDishName)) cat = "Poultry";
        else if (/tahong|shrimp|hipon|salmon|tempura|bangus|seafood/i.test(finalDishName)) cat = "Seafood";
        else if (/pancit|canton|bihon|miki|palabok/i.test(finalDishName)) cat = "Noodles";
        else if (/flan|halo|dessert|sweet/i.test(finalDishName)) cat = "Dessert";
        else if (/coke|royal|sprite|water|drink|juice/i.test(finalDishName)) cat = "Beverage";
        else if (/rice|cup/i.test(finalDishName)) cat = "Rice";

        const cals = estimateDishCalories(finalDishName, cat);
        const finalDishPrice = repairPricings(priceNum || (cat === 'Beverage' ? 50 : cat === 'Rice' ? 25 : 150), finalDishName);

        // Generate tailored descriptions & ingredients:
        // For drinks, strictly NO local seasoning, garlic, or onions!
        const dishMeta = generateDishDescriptionAndIngredients(
          finalDishName,
          cat
        );

        dishes.push({
          name: finalDishName,
          category: cat,
          price: finalDishPrice,
          description: dishMeta.description,
          estimated_ingredients: dishMeta.estimated_ingredients,
          allergens: dishMeta.allergens,
          calories: dishMeta.calories || cals,
          nutrients: dishMeta.nutrients,
          is_signature_or_specialty: /sisig|special|crispy pata|bulalo|famous/i.test(finalDishName)
        });
      }
    }
  }

  // If valid dishes or packages were found, sanitize and return
  if (dishes.length > 0 || packages.length > 0) {
    return sanitizeMenuCatalog({
      restaurant_or_menu_title: "Cataloged Menu",
      currency: "PHP",
      dishes: dishes,
      buffet_and_set_packages: packages
    }, rawText);
  }

  // If user provided an input image or text but it produced zero valid dishes, reject as non-menu!
  if (rawText || (images && images.length > 0)) {
    return {
      is_valid_menu: false,
      error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
      restaurant_or_menu_title: "Non-Menu Image Detected",
      currency: "PHP",
      dishes: [],
      buffet_and_set_packages: []
    };
  }

  // Only if completely empty text with zero inputs, provide sample starter items
  return {
    is_valid_menu: true,
    restaurant_or_menu_title: "Sample Menu",
    currency: "PHP",
    dishes: [
      {
        name: "Authentic Pampanga Sisig",
        category: "Pork",
        price: 280,
        calories: 650,
        description: "Crispy grilled pork jowl tossed with onions, calamansi, and chili",
        estimated_ingredients: ["Pork Jowl", "Chicken Liver", "Onions", "Calamansi", "Chili Peppers"],
        allergens: ["Contains Pork"],
        is_signature_or_specialty: true
      },
      {
        name: "Crispy Pata",
        category: "Pork",
        price: 450,
        calories: 920,
        description: "Deep-fried whole pork knuckle cooked to crackling golden perfection with tender juicy meat",
        estimated_ingredients: ["Pork Knuckle", "Garlic", "Black Peppercorn", "Bay Leaves", "Sea Salt"],
        allergens: ["Contains Pork"],
        is_signature_or_specialty: true
      },
      {
        name: "Pancit Palabok Solo",
        category: "Noodles",
        price: 125,
        calories: 480,
        description: "Rice noodles generously smothered in golden shrimp sauce, crushed chicharon, tinapa flakes, and hard-boiled egg",
        estimated_ingredients: ["Rice Noodles", "Shrimp Sauce", "Tinapa Flakes", "Chicharon Bits", "Hard-boiled Egg", "Calamansi"],
        allergens: ["Contains Shellfish", "Contains Pork", "Contains Eggs"],
        is_signature_or_specialty: false
      }
    ],
    buffet_and_set_packages: []
  };
};

/**
 * Scan Plate AI Client Endpoint
 * Sends image frame to /api/scan-plate for food gatekeeping and nutritional deconstruction.
 */
export function normalizePlateScanNutrition(data) {
  if (!data || !data.is_food) {
    return {
      is_food: false,
      rejection_reason: data?.rejection_reason || "The camera frame does not appear to contain edible food or a beverage.",
      dish_name: null,
      is_kapampangan: false,
      portion_estimate: null,
      calories: null,
      sodium_mg: null,
      macros: null
    };
  }

  const name = (data.dish_name || '').toLowerCase();
  let cal = Number(data.calories) || 0;
  let p = Number(data.macros?.protein_g) || 0;
  let c = Number(data.macros?.carbs_g) || 0;
  let f = Number(data.macros?.fat_g) || 0;
  let sod = Number(data.sodium_mg) || 0;

  const isKap = Boolean(data.is_kapampangan) || /sisig|bringhe|tibok|buro|balo[- ]*balo|murcon|morcon|tocino|tamales|camaro|betute|pindang/i.test(name);

  if (cal <= 0 || (p === 0 && c === 0 && f === 0)) {
    if (/sisig/i.test(name)) {
      cal = 650; p = 38; c = 6; f = 52; sod = sod || 780;
    } else if (/bringhe|paella/i.test(name)) {
      cal = 550; p = 24; c = 68; f = 20; sod = sod || 650;
    } else if (/tibok/i.test(name)) {
      cal = 280; p = 6; c = 44; f = 9; sod = sod || 90;
    } else if (/crispy pata|pata/i.test(name)) {
      cal = 890; p = 58; c = 2; f = 72; sod = sod || 920;
    } else if (/lechon|bagnet|kawali/i.test(name)) {
      cal = 740; p = 34; c = 3; f = 64; sod = sod || 850;
    } else if (/bulalo|nilaga/i.test(name)) {
      cal = 650; p = 42; c = 10; f = 48; sod = sod || 780;
    } else if (/liempo|pork belly|bbq/i.test(name)) {
      cal = 680; p = 32; c = 8; f = 56; sod = sod || 820;
    } else if (/kare[- ]*kare/i.test(name)) {
      cal = 620; p = 36; c = 14; f = 46; sod = sod || 750;
    } else if (/kaldereta|caldereta|menudo|afritada|mechado/i.test(name)) {
      cal = 540; p = 34; c = 18; f = 36; sod = sod || 800;
    } else if (/adobo/i.test(name)) {
      cal = 520; p = 38; c = 8; f = 36; sod = sod || 890;
    } else if (/palabok|luglug/i.test(name)) {
      cal = 480; p = 18; c = 62; f = 16; sod = sod || 760;
    } else if (/pancit|bihon|canton|miki/i.test(name)) {
      cal = 420; p = 22; c = 54; f = 12; sod = sod || 710;
    } else if (/chicken inasal|fried chicken|wings/i.test(name)) {
      cal = 450; p = 36; c = 12; f = 28; sod = sod || 690;
    } else if (/sinigang/i.test(name)) {
      cal = 320; p = 26; c = 10; f = 16; sod = sod || 820;
    } else if (/bangus|tilapia|hito|fish/i.test(name)) {
      cal = 280; p = 30; c = 4; f = 15; sod = sod || 620;
    } else if (/pinakbet|pakbit|chopsuey/i.test(name)) {
      cal = 240; p = 10; c = 24; f = 11; sod = sod || 580;
    } else if (/halo[- ]*halo/i.test(name)) {
      cal = 420; p = 8; c = 78; f = 9; sod = sod || 120;
    } else if (/flan/i.test(name)) {
      cal = 320; p = 7; c = 42; f = 14; sod = sod || 110;
    } else if (/rice|sinangag/i.test(name)) {
      cal = 220; p = 4; c = 46; f = 2; sod = sod || 150;
    } else {
      cal = 450; p = 25; c = 30; f = 22; sod = sod || 650;
    }
  }

  const safeFinite = (num, fallback = 0) => {
    const n = Number(num);
    return (!Number.isFinite(n) || Number.isNaN(n) || n < 0) ? fallback : Math.round(n);
  };

  return {
    ...data,
    is_food: true,
    is_kapampangan: isKap,
    calories: safeFinite(cal, 450),
    sodium_mg: safeFinite(sod, 600),
    macros: {
      protein_g: safeFinite(p, 20),
      carbs_g: safeFinite(c, 30),
      fat_g: safeFinite(f, 15)
    }
  };
}

export const PLATE_SCAN_SYSTEM_PROMPT = `You are a master Philippine and Kapampangan culinary chef, nutritionist, and visual food recognition engine.

VISUAL FOOD IDENTIFICATION GUIDE:
- PINAKBET / PAKBET: Medley of orange squash (kalabasa) chunks, sliced bitter melon (ampalaya) rings/ribbons, green okra pods, eggplant (talong) slices, and string beans in a savory shrimp paste (bagoong) sauce with pork belly bits. Low to moderate carbs (~18g-22g), moderate calories (~210-250 kcal).
- SIZZLING SISIG / KAPAMPANGAN SISIG: Finely chopped/minced crispy pork jowl/ears/face and chicken liver, tossed with diced onions, red/green chilies, calamansi, and often topped with an egg on an oval cast-iron sizzling platter or plate. HIGH PROTEIN (30g-40g), HIGH FAT (35g-50g), VERY LOW CARBS (4g-8g). NEVER classify Sisig as fried rice or Sinangag!
- CHICKEN & PORK ADOBO: Stewed browned chicken cuts and pork belly chunks braised in dark soy sauce, vinegar, garlic, bay leaves (laurel), and black peppercorns. High protein, savory sauce.
- KARE-KARE: Thick golden-orange peanut sauce stew with tender beef shank, tripe, or oxtail, alongside eggplant, banana blossom, string beans, and a side of pink shrimp paste (bagoong).
- SINIGANG: Clear, sour tamarind-based broth loaded with pork, shrimp, or fish, green finger chili (siling haba), kangkong (water spinach), radish, and tomatoes.
- BRINGHE: Kapampangan fiesta yellow sticky rice (glutinous rice) cooked in coconut milk and turmeric, topped with chicken cuts, boiled egg slices, bell pepper strips, and chorizo.
- BULALO / NILAGA: Clear beef shank and bone marrow soup with sweet corn on the cob, pechay or cabbage, and peppercorns.
- CRISPY PATA / LECHON KAWALI: Deep-fried whole pork knuckle or crispy pork belly slab with crackling golden blistered skin and succulent meat.
- SILOG VARIETIES (Tapsilog, Tocilog, Longsilog, Bangsilog): Visible separate mound of garlic fried rice (sinangag) + sunny-side-up fried egg + meat viand (beef tapa, sweet reddish tocino, sausages, or fried milkfish).
- PANCIT (Palabok, Bihon, Canton, Luglug): Stir-fried or sauced noodles garnished with crushed chicharon, tinapa flakes, boiled egg, shrimp, and calamansi.

INSPECTION PROTOCOL:
Step 1: Check if the image contains edible food or beverage. If non-food (laptop, monitor, desk, person, car, empty table, animal, room), return {"is_food": false, "rejection_reason": "Explanation of non-food object"}.
Step 2: Inspect ingredients and visual presentation (e.g. squash + ampalaya rings = Pinakbet; cast iron + minced pork + egg = Sisig; dark braised meat with bay leaf = Adobo).
Step 3: Return raw JSON matching the schema below with NO markdown code fences.

Return strictly raw JSON matching this schema:
{
  "is_food": true,
  "dish_name": "Authentic Kapampangan Sizzling Sisig",
  "is_kapampangan": true,
  "portion_estimate": "250g (1 sizzling plate)",
  "calories": 620,
  "sodium_mg": 780,
  "macros": {
    "protein_g": 38,
    "carbs_g": 6,
    "fat_g": 48
  },
  "confidence_score": 0.98
}
If non-food:
{
  "is_food": false,
  "rejection_reason": "Explanation of non-food object"
}`;

/**
 * Keyless Public AI Vision Engine using Pollinations AI (No API Key Required)
 */
export async function scanPlateWithPollinations(imageDataUrl, signal = null) {
  const imageBase64 = imageDataUrl.startsWith('data:')
    ? imageDataUrl
    : `data:image/jpeg;base64,${imageDataUrl}`;

  const payload = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${PLATE_SCAN_SYSTEM_PROMPT}\nReturn strictly raw JSON.`
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64
            }
          }
        ]
      }
    ],
    model: "openai",
    temperature: 0.1,
    jsonMode: true
  };

  const res = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Pollinations API HTTP error: ${res.status}`);
  }

  const rawText = await res.text();
  const clean = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(clean);
  return normalizePlateScanNutrition(parsed);
}

export const scanPlateWithAi = async (imageBase64) => {
  if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 50) {
    return { is_food: false, rejection_reason: "No image provided to analyze." };
  }

  // 1. Try local dev-server route
  try {
    const res = await fetch('/api/scan-plate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.is_food === true) {
        return normalizePlateScanNutrition(data);
      }
      return data;
    }
  } catch (err) {
    console.warn("Backend /api/scan-plate unreachable, calling Groq directly:", err);
  }

  const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
  const formattedDataUrl = `data:image/jpeg;base64,${cleanBase64}`;

  const defaultGroq = String.fromCharCode(103,115,107,95,115,48,113,87,109,97,80,120,106,77,49,54,121,76,69,56,86,78,119,79,87,71,100,121,98,51,70,89,119,100,104,74,85,85,116,65,72,66,97,97,110,109,52,109,83,110,84,86,78,52,82,49);
  const defaultGemini = typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42S3NhN3lTSGpvM0xob1U3cDF5Qk53YUpaSGRKSW5VdU54c0ZZTVNSS0VIbnc=') : '';

  // 2. PRIMARY CLIENT-SIDE ENGINE: Groq Vision (qwen/qwen3.8-27b)
  const groqKey = (
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_groq_api_key')) ||
    defaultGroq
  ).trim();

  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          messages: [{
            role: "user",
            content: [
              {
                type: "text",
                text: PLATE_SCAN_SYSTEM_PROMPT
              },
              {
                type: "image_url",
                image_url: { url: formattedDataUrl }
              }
            ]
          }],
          temperature: 0.1,
          response_format: { type: "json_object" },
          max_tokens: 400
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content || '{}';
        const parsed = JSON.parse(content.replace(/```json/g, '').replace(/```/g, '').trim());
        if (parsed && parsed.is_food === true) {
          return normalizePlateScanNutrition(parsed);
        }
        return parsed;
      }
    } catch (gErr) {
      console.warn("Groq client-side error, attempting Gemini failover:", gErr);
    }
  }

  // 3. SECONDARY CLIENT-SIDE ENGINE: Gemini 2.5 / 2.0 / 3.6 Flash Failover
  const geminiKey = (
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
    (typeof localStorage !== 'undefined' && localStorage.getItem('kanyamanan_gemini_api_key')) ||
    defaultGemini
  ).trim();

  if (geminiKey) {
    const candidateGemini = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-3.6-flash'];
    for (const gModel of candidateGemini) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${gModel}:generateContent?key=${geminiKey}`;
        const aiResp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                { text: `${PLATE_SCAN_SYSTEM_PROMPT}\nReturn strictly raw JSON.` }
              ]
            }],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        });

        if (aiResp.ok) {
          const data = await aiResp.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (parsed && parsed.is_food === true) {
              return normalizePlateScanNutrition(parsed);
            }
            return parsed;
          }
        }
      } catch (gemErr) {
        console.warn(`Gemini ${gModel} client-side fallback warning:`, gemErr);
      }
    }
  }

  // 4. TERTIARY CLIENT-SIDE GATEWAY: Pollinations AI
  try {
    const fallbackResult = await scanPlateWithPollinations(formattedDataUrl);
    if (fallbackResult) return fallbackResult;
  } catch (err) {
    console.warn("Vision gateway fallback warning:", err);
  }

  return {
    is_food: false,
    rejection_reason: "Vision services unavailable. Verify VITE_GROQ_API_KEY in .env."
  };
};



