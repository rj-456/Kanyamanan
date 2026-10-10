import fs from 'fs';

const mapping = JSON.parse(fs.readFileSync('scratch/downloaded_mapping.json', 'utf8'));

// Special multi-image pairings for restaurants with menus
const menuAddons = {
  "Boss Madam Chicken Inasal": ["/restaurants/santa_ana/boss_madam_menu.jpg"],
  "Bale Lubao": ["/restaurants/lubao/bale_lubao_menu.jpg"],
  "Everybody's Cafe": [
    "/restaurants/san_fernando/Everybody_s Cafe menu/Everybody_s Cafe menu1.png",
    "/restaurants/san_fernando/Everybody_s Cafe menu/Everybody_s Cafe menu2.png",
    "/restaurants/san_fernando/Everybody_s Cafe menu/Everybody_s Cafe menu3.png",
    "/restaurants/san_fernando/Everybody_s Cafe menu/Everybody_s Cafe menu4.png"
  ],
  "Imang Nene Kapampangan Cuisine": [
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu1.jpg",
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu2.jpg",
    "/restaurants/san_fernando/Imang Nene Menu/Imang Nene menu3.jpg"
  ],
  "Pipanganan Capampangan Restaurant & Catering": [
    "/restaurants/san_fernando/Pipanganan Capampangan menu.jpg"
  ],
  "Susie's Cuisine": [
    "/restaurants/san_fernando/Susie_s Cuisine Menu.jpg"
  ],
  "The Ville (Mandelin)": [
    "/restaurants/santa_ana/the_ville_menu1.jpg",
    "/restaurants/santa_ana/the_ville_menu2.jpg",
    "/restaurants/santa_ana/the_ville_menu3.jpg"
  ],
  "Cakes and Creams Cafe": [
    "/restaurants/san_simon/cakes_and_creams_cover.jpg",
    "/restaurants/san_simon/cakes_and_creams_menu1.jpg",
    "/restaurants/san_simon/cakes_and_creams_menu2.jpg",
    "/restaurants/san_simon/cakes_and_creams_menu3.jpg"
  ],
  "Conching's Restaurant & Native Foods": [
    "/restaurants/guagua/conchings_cover.jpg",
    "/restaurants/guagua/conchings_menu1.jpg",
    "/restaurants/guagua/conchings_menu2.jpg",
    "/restaurants/guagua/conchings_menu3.jpg",
    "/restaurants/guagua/conchings_menu4.jpg"
  ],
  "B Farm Cafe By Alexa's Kitchen": [
    "/restaurants/candaba/b_farm_menu1.jpg",
    "/restaurants/candaba/b_farm_menu2.jpg"
  ],
  "Ernesto’s Kitchen & Bar": [
    "/restaurants/santa_ana/ernestos_menu.jpg"
  ],
  "Lotus Restaurant (St. Isidore the FARMer)": [
    "/restaurants/santa_ana/lotus_restaurant_menu.jpg"
  ],
  "Ver & Rea Sizzling Steak House": [
    "/restaurants/candaba/ver_rea_menu.jpg"
  ],
  "Holidayland Restaurant": [
    "/restaurants/san_fernando/Holidayland buffet pricing (just search for typical menu).jpg"
  ],
  "Lolaima Pampanga Cuisine": [
    "/restaurants/san_fernando/Lola Ima buffet.jpg LUNCH BUFFET for only P315 DINNER BUFFET for only P349   KIDS (4-7 y_o) - P175.jpg"
  ],
  "Bubusuk (Goto Anne Corner)": [
    "/restaurants/san_fernando/bubusuk-goto-anne-corner.jpg"
  ],
  "Wow Lubao": [
    "/restaurants/lubao/wow_lubao_menu.jpg"
  ],
  "Bale Capampangan": [
    "/restaurants/san_fernando/Bale-Capampangan menu and eat all you can promo.jpg"
  ]
};

function applyToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let replacedCount = 0;

  for (const [name, primaryImg] of Object.entries(mapping)) {
    const addons = menuAddons[name] || [];
    const allImages = Array.from(new Set([primaryImg, ...addons]));

    // Match exact restaurant block
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\"name\":\\s*\"${escaped}\"[\\s\\S]*?\"image\":\\s*\")[^\"]+(\"[\\s\\S]*?\"images\":\\s*\\[)[^\\]]*(\\])`);

    if (regex.test(content)) {
      content = content.replace(regex, (match, p1, p2, p3) => {
        replacedCount++;
        const imagesJson = allImages.map(img => `\n      "${img}"`).join(',') + '\n    ';
        return `${p1}${primaryImg}${p2}${imagesJson}${p3}`;
      });
    } else {
      console.warn(`Could not find restaurant "${name}" in ${filePath}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully applied real images to ${replacedCount} restaurants in ${filePath}`);
}

applyToFile('src/mockData.js');
applyToFile('backend/extracted_restaurants.json');
applyToFile('backend/api/extracted_restaurants.json');
