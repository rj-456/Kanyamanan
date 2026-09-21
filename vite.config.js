import { defineConfig } from 'vite'
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

function catalogMenuApiPlugin() {
  return {
    name: 'vite-plugin-catalog-menu-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
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
                process.env.GEMINI_API_KEY ||
                process.env.VITE_GEMINI_API_KEY ||
                ''
              ).trim();

              if (apiKey) {
                const model = process.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

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
                            calories: d.calories || estimateDishCaloriesNode(d.name, d.category)
                          }));
                        }
                        if (Array.isArray(parsed.buffet_and_set_packages)) {
                          parsed.buffet_and_set_packages = parsed.buffet_and_set_packages.map(pkg => ({
                            ...pkg,
                            package_name: cleanDishOrPackageName(pkg.package_name),
                            price: repairPricings(pkg.price, pkg.package_name),
                            included_dishes: Array.isArray(pkg.included_dishes) ? pkg.included_dishes.map(cleanDishOrPackageName) : []
                          }));
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(sanitizeMenuCatalog(parsed)));
                        return;
                      }
                    }
                  }
                } catch (aiErr) {
                  console.warn('[catalog-menu-api] Gemini call failed, returning fallback:', aiErr.message);
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
export default defineConfig({
  plugins: [react(), catalogMenuApiPlugin()],
})
