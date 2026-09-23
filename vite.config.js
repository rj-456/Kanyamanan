import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  cleanMenuOcrSpelling,
  cleanDishOrPackageName,
  repairPricings,
  sanitizeMenuCatalog,
  isSectionHeader,
  isValidDishName,
  isLikelyValidMenu,
  generateDishDescriptionAndIngredients,
  estimateDishCalories,
  estimateDishNutrients
} from './src/utils/menuOcrCleaner.js'

const SYSTEM_MENU_PROMPT = `You are an expert menu parser and culinary database annotator with deep understanding of Philippine restaurant menus, caterers, buffet packages, and regional dishes.
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

const CATALOG_MENU_SCHEMA = {
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

const SCAN_PLATE_SYSTEM_PROMPT = `You are a specialized culinary AI nutritionist and visual food classifier with deep expertise in Philippine regional gastronomy (especially authentic Kapampangan cuisine such as Sisig, Bringhe, Burong Isda/Balo-balo, Tibok-tibok, Murcon, etc.) as well as standard global dishes.

You must follow a strict two-phase inspection:
1. Verification & Gatekeeping (Food vs. Non-Food):
   - Inspect whether the image actually contains edible cooked food, prepared dishes, snacks, or beverages.
   - If the image depicts non-food subjects (such as faces, pets, clothing, furniture, office desks, electronics, vehicles, documents, or an empty plate/table), you MUST set is_food: false.
   - When is_food is false, do NOT calculate or hallucinate calories or nutrients. Provide a polite explanation in rejection_reason.
2. Nutritional Deconstruction (Only if is_food is true):
   - Accurately identify the dish name.
   - Estimate the visual portion volume against standard dishware to compute serving weight in grams.
   - Return realistic calories, macronutrients (protein, carbs, fat in grams), and sodium (in milligrams).`;

const SCAN_PLATE_SCHEMA = {
  type: "OBJECT",
  properties: {
    is_food: {
      type: "BOOLEAN",
      description: "True ONLY if the frame contains edible food, dishes, or drinks. False for non-food objects, people, pets, or empty surfaces."
    },
    rejection_reason: {
      type: "STRING",
      description: "User-friendly explanation if is_food is false explaining what was detected instead. Null if is_food is true."
    },
    dish_name: {
      type: "STRING",
      description: "Accurate culinary name of the dish. Null if is_food is false."
    },
    is_kapampangan: {
      type: "BOOLEAN",
      description: "True if authentic Kapampangan or Philippine regional dish."
    },
    portion_estimate: {
      type: "STRING",
      description: "Estimated weight and serving, e.g., '160g (1 plate)'. Null if is_food is false."
    },
    calories: {
      type: "INTEGER",
      description: "Estimated calories in kcal. Positive integer."
    },
    sodium_mg: {
      type: "INTEGER",
      description: "Estimated sodium in milligrams. Positive integer."
    },
    macros: {
      type: "OBJECT",
      description: "Estimated macronutrients in grams.",
      properties: {
        protein_g: { type: "NUMBER", description: "Estimated protein in grams" },
        carbs_g: { type: "NUMBER", description: "Estimated carbohydrates in grams" },
        fat_g: { type: "NUMBER", description: "Estimated fat in grams" }
      },
      required: ["protein_g", "carbs_g", "fat_g"]
    },
    confidence_score: { type: "NUMBER" }
  },
  required: ["is_food", "dish_name", "portion_estimate", "calories", "sodium_mg", "macros"]
};

function normalizePlateScanNutritionNode(data) {
  if (!data || !data.is_food) return data;

  const name = (data.dish_name || '').toLowerCase();
  let cal = Number(data.calories) || 0;
  let p = Number(data.macros?.protein_g) || 0;
  let c = Number(data.macros?.carbs_g) || 0;
  let f = Number(data.macros?.fat_g) || 0;
  let sod = Number(data.sodium_mg) || 0;

  if (cal <= 0 || (p === 0 && c === 0 && f === 0)) {
    if (/sisig/i.test(name)) {
      cal = 650; p = 38; c = 6; f = 52; sod = sod || 780;
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

  return {
    ...data,
    calories: cal,
    sodium_mg: sod || 600,
    macros: {
      protein_g: p,
      carbs_g: c,
      fat_g: f
    }
  };
}

function estimateDishCaloriesNode(name, category = '') {
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
}

function catalogMenuApiPlugin(loadedEnv = {}) {
  return {
    name: 'vite-plugin-catalog-menu-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        if ((url === '/api/scan-plate' || url === '/api/scan-plate/') && req.method === 'POST') {
          let chunks = [];
          req.on('data', c => chunks.push(c));
          req.on('end', async () => {
            try {
              const buffer = Buffer.concat(chunks);
              let payload = {};
              try { payload = JSON.parse(buffer.toString('utf-8')); } catch { payload = {}; }

              const rawImg = payload.image || payload.dataUrl || payload.imageDataUrl || payload.image_base64 || '';
              if (!rawImg) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ is_food: false, rejection_reason: "No image frame received." }));
                return;
              }

              const apiKey = (
                payload.api_key ||
                req.headers['x-goog-api-key'] ||
                loadedEnv.VITE_GEMINI_API_KEY ||
                loadedEnv.GEMINI_API_KEY ||
                process.env.GEMINI_API_KEY ||
                process.env.VITE_GEMINI_API_KEY ||
                ''
              ).trim();

              let mime = 'image/jpeg';
              let b64 = rawImg;
              if (rawImg.includes(',')) {
                const [hdr, data] = rawImg.split(',', 2);
                if (hdr.includes('png')) mime = 'image/png';
                else if (hdr.includes('webp')) mime = 'image/webp';
                b64 = data;
              }

              if (apiKey) {
                const candidateModels = [
                  payload.model,
                  process.env.VITE_GEMINI_MODEL,
                  'gemini-2.5-flash',
                  'gemini-3.5-flash-lite',
                  'gemini-3.1-flash-lite',
                  'gemini-3.6-flash',
                  'gemini-3.5-flash',
                  'gemini-flash-latest'
                ].filter(Boolean);
                const modelsToTry = [...new Set(candidateModels)];

                for (const model of modelsToTry) {
                  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

                  try {
                    const aiResp = await fetch(endpoint, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        contents: [{
                          parts: [
                            { inlineData: { mimeType: mime, data: b64 } },
                            { text: "Inspect this image. Determine if it contains edible food or a beverage. If is_food is true, you MUST provide dish_name, portion_estimate, calories (in kcal), sodium_mg, and macros (protein_g, carbs_g, fat_g)." }
                          ]
                        }],
                        systemInstruction: { parts: [{ text: SCAN_PLATE_SYSTEM_PROMPT }] },
                        generationConfig: {
                          temperature: 0.1,
                          responseMimeType: 'application/json',
                          responseSchema: SCAN_PLATE_SCHEMA
                        }
                      })
                    });

                    if (aiResp.ok) {
                      const aiData = await aiResp.json();
                      const text = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) {
                        const parsed = JSON.parse(text);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(normalizePlateScanNutritionNode(parsed)));
                        return;
                      }
                    } else {
                      console.warn(`Vite dev scan-plate model ${model} returned ${aiResp.status}, trying next fallback...`);
                    }
                  } catch (err) {
                    console.warn(`Vite dev scan-plate model ${model} failed:`, err.message);
                  }
                }
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                is_food: false,
                requires_api_key: !apiKey,
                rejection_reason: apiKey
                  ? "PlateScan AI service could not analyze the frame. Please center the food in good lighting."
                  : "Gemini API Key is required to run live visual food deconstruction. Enter your free API key or try Demo Mode."
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if ((url === '/api/catalog-menu' || url === '/api/catalog-menu/') && req.method === 'POST') {
          let chunks = [];
          req.on('data', c => chunks.push(c));
          req.on('end', async () => {
            try {
              const buffer = Buffer.concat(chunks);
              let payload = {};
              try {
                payload = JSON.parse(buffer.toString('utf-8'));
              } catch {
                payload = {};
              }

              const rawText = cleanMenuOcrSpelling((payload.raw_text || payload.text || '').trim());
              const images = Array.isArray(payload.images) ? payload.images : [];
              const apiKey = (
                payload.api_key ||
                req.headers['x-goog-api-key'] ||
                loadedEnv.VITE_GEMINI_API_KEY ||
                loadedEnv.GEMINI_API_KEY ||
                process.env.GEMINI_API_KEY ||
                process.env.VITE_GEMINI_API_KEY ||
                ''
              ).trim();

              if (apiKey) {
                const candidateModels = [
                  payload.model,
                  process.env.VITE_GEMINI_MODEL,
                  'gemini-2.5-flash',
                  'gemini-3.5-flash-lite',
                  'gemini-3.1-flash-lite',
                  'gemini-3.6-flash',
                  'gemini-3.5-flash',
                  'gemini-flash-latest'
                ].filter(Boolean);
                const modelsToTry = [...new Set(candidateModels)];

                const parts = [];
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

                if (rawText) {
                  parts.push({ text: `Raw Menu Text / Multi-column Content:\n${rawText}` });
                } else {
                  parts.push({ text: "Catalog all dishes and buffet packages across all columns from the provided menu photos/flyers." });
                }

                for (const model of modelsToTry) {
                  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

                  try {
                    const aiResp = await fetch(endpoint, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        contents: [{ parts }],
                        systemInstruction: { parts: [{ text: SYSTEM_MENU_PROMPT }] },
                        generationConfig: {
                          temperature: 0.1,
                          responseMimeType: 'application/json',
                          responseSchema: CATALOG_MENU_SCHEMA
                        }
                      })
                    });

                    if (aiResp.ok) {
                      const aiData = await aiResp.json();
                      const text = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) {
                        const parsed = JSON.parse(text);
                        if (parsed) {
                          if (Array.isArray(parsed.dishes) && parsed.dishes.length > 0) {
                            parsed.dishes = parsed.dishes.map(d => ({
                              ...d,
                              name: cleanDishOrPackageName(d.name),
                              price: repairPricings(d.price, d.name),
                              category: categorizeDish(d.name, d.category),
                              calories: d.calories || estimateDishCaloriesNode(d.name, d.category),
                              description: (d.description || '').trim(),
                              allergens: Array.isArray(d.allergens) ? d.allergens : []
                            }));
                          }
                          if (Array.isArray(parsed.buffet_and_set_packages)) {
                            parsed.buffet_and_set_packages = parsed.buffet_and_set_packages.map(p => ({
                              ...p,
                              package_name: cleanDishOrPackageName(p.package_name),
                              price: repairPricings(p.price, p.package_name),
                              pricing_model: p.pricing_model || 'per_head',
                              description: (p.description || '').trim()
                            }));
                          }
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify(parsed));
                          return;
                        }
                      }
                    } else {
                      console.warn(`Vite dev catalog-menu model ${model} returned ${aiResp.status}, trying fallback...`);
                    }
                  } catch (err) {
                    console.warn(`Vite dev catalog-menu model ${model} failed:`, err.message);
                  }
                }
              }

              // Early validation: If user provided text that does not match a food menu
              if (rawText && !isLikelyValidMenu(rawText)) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  is_valid_menu: false,
                  error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
                  restaurant_or_menu_title: "Non-Menu Image Detected",
                  currency: "PHP",
                  dishes: [],
                  buffet_and_set_packages: []
                }));
                return;
              }

              // Multi-column intelligent fallback output
              const dishes = [];
              const packages = [];
              const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

              let currentCategory = "Mains";

              for (const rawLine of lines) {
                const upper = rawLine.toUpperCase();
                const hasPrice = /\d{2,}/.test(rawLine);
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

                const cells = rawLine.split(/\t+/).map(c => c.trim()).filter(Boolean);
                const tokens = cells.length > 1 ? cells : [rawLine];

                for (let cIdx = 0; cIdx < tokens.length; cIdx++) {
                  let cell = tokens[cIdx];
                  if (/^(?:price|delivery|minimum|advance order|choice of|free delivery|contact|we are now open)/i.test(cell)) continue;

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

                  cleanName = cleanDishOrPackageName(cleanName.replace(new RegExp('^[' + '-:\\u2022*#\\s]+'), '').replace(new RegExp('[' + '-:\\u2022\\s]+$'), '').trim());
                  priceNum = repairPricings(priceNum, cleanName);
                  if (!isValidDishName(cleanName, Boolean(priceNum))) continue;

                  const isPkg = /^(?:F\d+[-:]|funnmeal|package|buffet|per pax|\/pax|per head|set menu)/i.test(cleanName) ||
                                /side dish.*rice/i.test(cleanName);

                  if (isPkg) {
                    const pkgParts = cleanName.split(/[,+]/).map(s => cleanDishOrPackageName(s.trim())).filter(Boolean);
                    packages.push({
                      package_name: cleanName.split(/[:,]/)[0].trim() || "Set Meal Combo",
                      pricing_model: /\/pax|per pax|per head/i.test(cell) ? "PER_PAX" : "FIXED_TOTAL",
                      price: priceNum || 125,
                      minimum_pax: cleanName.includes('30') ? 30 : cleanName.includes('50') ? 50 : null,
                      calories: 680,
                      included_dishes: pkgParts.length > 0 ? pkgParts : ["Main Dish", "Side Dish", "Rice", "Drink"],
                      other_inclusions: ["Steamed Rice", "Choice of Side Dish (Coleslaw or Buttered Vegetables)", "Drink"],
                      selection_rules: "Served fresh with side dish and beverage"
                    });
                  } else {
                    let cat = currentCategory;
                    if (/soup|sinigang|bulalo/i.test(cleanName)) cat = "Soup";
                    else if (/sisig|pork|liempo|bbq|pata|kawali/i.test(cleanName)) cat = "Pork";
                    else if (/chicken|chix|wing|legs|inasal/i.test(cleanName)) cat = "Poultry";
                    else if (/tahong|shrimp|hipon|salmon|tempura|bangus|seafood/i.test(cleanName)) cat = "Seafood";
                    else if (/pancit|canton|bihon|miki|palabok/i.test(cleanName)) cat = "Noodles";
                    else if (/flan|halo|dessert|sweet/i.test(cleanName)) cat = "Dessert";
                    else if (/coke|royal|sprite|water|drink|juice/i.test(cleanName)) cat = "Beverage";
                    else if (/rice|cup/i.test(cleanName)) cat = "Rice";

                    const dishMeta = generateDishDescriptionAndIngredients(cleanName, cat);

                    dishes.push({
                      name: cleanName,
                      category: cat,
                      price: priceNum || (cat === 'Beverage' ? 50 : cat === 'Rice' ? 25 : 150),
                      description: dishMeta.description,
                      estimated_ingredients: dishMeta.estimated_ingredients,
                      allergens: dishMeta.allergens,
                      calories: dishMeta.calories || estimateDishCalories(cleanName, cat),
                      nutrients: dishMeta.nutrients,
                      is_signature_or_specialty: /sisig|special|crispy pata|bulalo|famous/i.test(cleanName)
                    });
                  }
                }
              }

              if (dishes.length === 0 && packages.length === 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  is_valid_menu: false,
                  error: "The uploaded image does not appear to be a restaurant menu or flyer. Please upload a clear photo of a menu, flyer, or food price list.",
                  restaurant_or_menu_title: "Non-Menu Image Detected",
                  currency: "PHP",
                  dishes: [],
                  buffet_and_set_packages: []
                }));
                return;
              }

              const result = {
                restaurant_or_menu_title: "Cataloged Menu",
                currency: "PHP",
                dishes: dishes,
                buffet_and_set_packages: packages
              };

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(sanitizeMenuCatalog(result, rawText)));

            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), catalogMenuApiPlugin(env)],
  };
});
