import fs from 'fs';
import path from 'path';

const REAL_IMAGES = {
  'parish-arayat': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Heritage_Saint_Catherine_of_Alexandria_Church_%28Arayat%2C_Pampanga%29_CNE_04.jpg',
  'parish-sansimon': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/07951JfSan_Simon_Parish_Church_San_Jose_San_Miguel_San_Luisfvf_01.JPG',
  'parish-santotomas': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Santo_Tomas_Church%2C_Pampanga%2C_Nov_2025_%283%29.jpg',
  'nature-arayat-park': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/DENR%2C_Mt_Arayat%2C_Ayala%2C_Magalang%2C_Pampanga%2C_Philippines_-_panoramio.jpg',
  'nature-candaba-swamp': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Candaba_swamp_-_rice_field_%28view_from_NLEX_Candaba_Viaduct%29_%28Pulilan%2C_Bulacan%29%282017-04-14%29_1.jpg',
  'nature-miyamit-falls': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Pampanga_Landscape_Panorama.jpg',
  'museum-ning-angeles': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Museo_Ning_Angeles.jpg',
  'museum-kapampangan-studies': 'https://upload.wikimedia.org/wikipedia/commons/a/a7/9024jfHoly_Angel_University_Center_Museum_Pampangafvf_10.JPG',
  'museum-sanfernando-train': 'https://upload.wikimedia.org/wikipedia/commons/9/93/San_Fernando_Train_Station%2C_Pampanga_09.jpg',
  'artisan-betis-woodcarving': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Cayetano_Rivera_House_CNE_02.jpg',
  'artisan-santotomas-pottery': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Santo_Tomas%2C_Pampanga_Municipality_09.jpg',
  'artisan-sanfernando-parol': 'https://upload.wikimedia.org/wikipedia/commons/7/78/GLFjf1503_02.JPG',
  'landmark-pamintuan-mansion': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Northeast_facade_of_Pamintuan_Mansion_-_2.jpg',
  'landmark-bale-matua': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Angel_Pantaleon_de_Miranda_House_%28Angeles_City_2023-07-10%29_E911a_05.jpg',
  'landmark-bacolor-lahar': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Jf8656San_Antonio_Lahar%2C_Bacolor%2C_Pampangafvf_03.JPG',
  'festival-giant-lantern': 'https://upload.wikimedia.org/wikipedia/commons/7/78/GLFjf1503_02.JPG',
  'festival-sinukwan': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sinukwan_Festival_of_Pampanga.jpg',
  'festival-lubao-balloon': 'https://upload.wikimedia.org/wikipedia/commons/6/68/Jf1420International_Balloon_Festival_Philippines_Pampangafvf_18.JPG',
  'festival-tigtigan-terakan': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sinukwan_Festival_of_Pampanga.jpg',
  'festival-pyestang-tugak': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Stuffed_frogs.jpg',
  'festival-maleldo-cutud': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Cutud_Lenten_Rites.jpg',
  'festival-sasmuan-kuraldal': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/9324Santa_Lucia%2C_Sasmuan%2C_Pampanga_01.jpg',
  'festival-duman': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/7446bSanta_Rita%2CPampanga_Duman_Festival.jpg',
  'festival-ibun-ebun': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/03256jfBaliuag_Candaba_Roads_Swamps_Pampanga_Highway_Bulacanfvf_02.JPG',
  'festival-fiestang-kuliat': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Sisig_%2832623486%29.jpg',
  'festival-makatapak': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Half-Buried_San_Guillermo_Parish_Church%2C_Bacolor%2C_Pampanga_-_panoramio.jpg',
  'festival-apalit-libad': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Apung_Iru_Festival_%28Apalit%2C_Pampanga%3B_06-30-2023%29_E911a_31.jpg',
  'festival-dukit': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Betis%2C_Guagua%2C_Pampanga_%28619364538%29.jpg',
  'festival-caragan': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Caragan_Festival_2014_-_Xevera%2C_Mabalacat_City_-_Pampanga%2C_Philippines_-_February_28%2C_2014_2014-04-10_10-14.jpg',
  'festival-kamaru': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Tibok-tibok_from_Susie%27s_Cuisine%2C_Dau%2C_Mabalacat_City%2C_Pampanga%2C_Philippines.jpg',
  'festival-sabuaga': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Jf4154Festivals_Sabuaga_Santo_Tomas_Pampanga_Dancefvf_02.JPG',
  'festival-batalla': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sinukwan_Festival_of_Pampanga.jpg'
};

async function download(id, url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 KanyamananApp/1.0 (culinary-cultural-preservation; info@kanyamanan.ph)'
      }
    });
    if (!res.ok) {
      console.log('FAIL', id, res.status, res.statusText);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = url.toLowerCase().endsWith('.png') ? '.png' : '.jpg';
    const filename = `real_${id.replace(/-/g, '_')}${ext}`;
    const outPath = path.join('public', 'attractions', filename);
    fs.writeFileSync(outPath, buf);
    console.log('SAVED', id, '=>', filename, (buf.length / 1024).toFixed(1) + ' KB');
    return true;
  } catch (err) {
    console.log('ERROR', id, err.message);
    return false;
  }
}

async function run() {
  let count = 0;
  for (const [id, url] of Object.entries(REAL_IMAGES)) {
    const ok = await download(id, url);
    if (ok) count++;
    await new Promise(r => setTimeout(r, 600)); // Polite delay
  }
  console.log(`Finished downloading ${count} of ${Object.keys(REAL_IMAGES).length} images.`);
}

run();
