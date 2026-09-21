import fs from 'fs';

let code = fs.readFileSync('src/mockData.js', 'utf8');

const REPLACEMENTS = [
  ['"id": "nature-arayat-park"', '"image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_nature_arayat_park.jpg"'],
  ['"id": "nature-candaba-swamp"', '"image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_nature_candaba_swamp.jpg"'],
  ['"id": "nature-miyamit-falls"', '"image": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_nature_miyamit_falls.jpg"'],
  ['"id": "museum-ning-angeles"', '"image": "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_museum_ning_angeles.jpg"'],
  ['"id": "museum-kapampangan-studies"', '"image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_museum_kapampangan_studies.jpg"'],
  ['"id": "museum-sanfernando-train"', '"image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_museum_sanfernando_train.jpg"'],
  ['"id": "artisan-betis-woodcarving"', '"image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_artisan_betis_woodcarving.jpg"'],
  ['"id": "artisan-santotomas-pottery"', '"image": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_artisan_santotomas_pottery.jpg"'],
  ['"id": "artisan-sanfernando-parol"', '"image": "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_artisan_sanfernando_parol.jpg"'],
  ['"id": "landmark-pamintuan-mansion"', '"image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_landmark_pamintuan_mansion.jpg"'],
  ['"id": "landmark-bale-matua"', '"image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_landmark_bale_matua.jpg"'],
  ['"id": "landmark-bacolor-lahar"', '"image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_landmark_bacolor_lahar.jpg"'],
  ['"id": "festival-giant-lantern"', '"image": "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_giant_lantern.jpg"'],
  ['"id": "festival-sinukwan"', '"image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_sinukwan.jpg"'],
  ['"id": "festival-lubao-balloon"', '"image": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_lubao_balloon.jpg"'],
  ['"id": "festival-tigtigan-terakan"', '"image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_tigtigan_terakan.jpg"'],
  ['"id": "festival-pyestang-tugak"', '"image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_pyestang_tugak.jpg"'],
  ['"id": "festival-maleldo-cutud"', '"image": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_maleldo_cutud.jpg"'],
  ['"id": "festival-sasmuan-kuraldal"', '"image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_sasmuan_kuraldal.jpg"'],
  ['"id": "festival-duman"', '"image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_duman.jpg"'],
  ['"id": "festival-ibun-ebun"', '"image": "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_ibun_ebun.jpg"'],
  ['"id": "festival-fiestang-kuliat"', '"image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_fiestang_kuliat.jpg"'],
  ['"id": "festival-makatapak"', '"image": "/attractions/san_guillermo_bacolor.jpg"', '"image": "/attractions/real_festival_makatapak.jpg"'],
  ['"id": "festival-apalit-libad"', '"image": "/attractions/apalit_church.jpg"', '"image": "/attractions/real_festival_apalit_libad.jpg"'],
  ['"id": "festival-dukit"', '"image": "/attractions/real_betis_church.jpg"', '"image": "/attractions/real_festival_dukit.jpg"'],
  ['"id": "festival-caragan"', '"image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_caragan.jpg"'],
  ['"id": "festival-kamaru"', '"image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_kamaru.jpg"'],
  ['"id": "festival-sabuaga"', '"image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_sabuaga.jpg"'],
  ['"id": "festival-batalla"', '"image": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"', '"image": "/attractions/real_festival_batalla.jpg"']
];

let count = 0;
REPLACEMENTS.forEach(([idMarker, oldImg, newImg]) => {
  const pos = code.indexOf(idMarker);
  if (pos === -1) {
    console.log('MARKER NOT FOUND:', idMarker);
    return;
  }
  const nextPos = code.indexOf(oldImg, pos);
  if (nextPos === -1 || nextPos > pos + 1200) {
    console.log('OLD IMG NOT FOUND NEAR:', idMarker);
    return;
  }
  code = code.slice(0, nextPos) + newImg + code.slice(nextPos + oldImg.length);
  count++;
});

fs.writeFileSync('src/mockData.js', code, 'utf8');
console.log(`Replaced ${count} of ${REPLACEMENTS.length} attractions in src/mockData.js`);
