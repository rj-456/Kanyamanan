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

const CULINARY_VISION_PROMPT = `You are a master Philippine and Kapampangan culinary chef, nutritionist, and visual food recognition engine.

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
Step 3: Return raw JSON matching the schema below with NO markdown code fences.`;

const CULINARY_JSON_SCHEMA = {
  type: "OBJECT",
  properties: {
    is_food: { type: "BOOLEAN", description: "True ONLY if edible food is visible" },
    rejection_reason: { type: "STRING" },
    dish_name: { type: "STRING" },
    is_kapampangan: { type: "BOOLEAN" },
    portion_estimate: { type: "STRING" },
    calories: { type: "INTEGER" },
    sodium_mg: { type: "INTEGER" },
    macros: {
      type: "OBJECT",
      properties: {
        protein_g: { type: "NUMBER" },
        carbs_g: { type: "NUMBER" },
        fat_g: { type: "NUMBER" }
      }
    },
    confidence_score: { type: "NUMBER" }
  },
  required: ["is_food"]
};

function plateScanApiPlugin(loadedEnv = {}) {
  return {
    name: 'vite-plugin-plate-scan-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if ((url === '/api/scan-plate' || url === '/api/scan-plate/') && req.method === 'POST') {
          let chunks = [];
          req.on('data', c => chunks.push(c));
          req.on('end', async () => {
            try {
              const buffer = Buffer.concat(chunks);
              const payload = JSON.parse(buffer.toString('utf-8') || '{}');
              const imageBase64 = payload.image || payload.imageBase64 || '';

              if (!imageBase64 || imageBase64.length < 50) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ is_food: false, rejection_reason: "No image payload received." }));
                return;
              }

              const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
              const formattedDataUrl = `data:image/jpeg;base64,${cleanBase64}`;

              const groqKey = (process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || loadedEnv.GROQ_API_KEY || loadedEnv.VITE_GROQ_API_KEY || '').trim();
              const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || loadedEnv.GEMINI_API_KEY || loadedEnv.VITE_GEMINI_API_KEY || '').trim();

              // 1. PRIMARY ENGINE: Groq Vision (qwen/qwen3.8-27b)
              if (groqKey) {
                try {
                  const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${groqKey}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      model: "qwen/qwen3.8-27b",
                      messages: [
                        {
                          role: "user",
                          content: [
                            { type: "text", text: CULINARY_VISION_PROMPT },
                            { type: "image_url", image_url: { url: formattedDataUrl } }
                          ]
                        }
                      ],
                      temperature: 0.1,
                      response_format: { type: "json_object" },
                      max_tokens: 400
                    })
                  });

                  if (groqResp.ok) {
                    const groqData = await groqResp.json();
                    const content = groqData?.choices?.[0]?.message?.content || '{}';
                    const parsed = JSON.parse(content.replace(/```json/g, '').replace(/```/g, '').trim());
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(parsed));
                    return;
                  }
                } catch (gErr) {
                  console.warn("[PlateScan] Groq vision failed, trying Gemini fallback:", gErr.message);
                }
              }

              // 2. SECONDARY ENGINE: Gemini (Active 2.5 Flash / 2.0 Flash / 3.6 Flash)
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
                            { text: `${CULINARY_VISION_PROMPT}\nReturn strictly JSON matching the schema.` }
                          ]
                        }],
                        generationConfig: {
                          temperature: 0.1,
                          responseMimeType: 'application/json',
                          responseSchema: CULINARY_JSON_SCHEMA
                        }
                      })
                    });

                    if (aiResp.ok) {
                      const data = await aiResp.json();
                      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(JSON.parse(text)));
                        return;
                      }
                    }
                  } catch (gemErr) {
                    console.warn(`[PlateScan] Gemini ${gModel} fallback failed:`, gemErr.message);
                  }
                }
              }

              // 3. TERTIARY FAILOVER: High-speed Multimodal Vision Gateway (Pollinations)
              try {
                const polResp = await fetch('https://text.pollinations.ai/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    messages: [
                      {
                        role: 'user',
                        content: [
                          { type: 'text', text: `${CULINARY_VISION_PROMPT}\nReturn strictly raw JSON.` },
                          { type: 'image_url', image_url: { url: formattedDataUrl } }
                        ]
                      }
                    ],
                    model: 'openai',
                    temperature: 0.1,
                    jsonMode: true
                  })
                });

                if (polResp.ok) {
                  const text = await polResp.text();
                  const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
                  const parsed = JSON.parse(cleanJson);
                  if (parsed && typeof parsed === 'object') {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(parsed));
                    return;
                  }
                }
              } catch (_) {}

              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                is_food: false,
                rejection_reason: "Vision services unavailable. Verify VITE_GROQ_API_KEY in .env."
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ is_food: false, rejection_reason: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

function normalizePlateScanNutritionNode(data) {
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
    plugins: [react(), plateScanApiPlugin(env), catalogMenuApiPlugin(env)],
  };
});
