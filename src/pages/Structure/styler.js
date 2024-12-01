import styled from "styled-components";

export const Container = styled.div`
  margin: 50px 0;
  .structure-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 2px solid var(--titleDark);
    &__logo {
      height: 60px;
    }
    &__title {
      font-size: 30px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--titleDark);
    }
  }
  .str {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 40px;
    &__top {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .str-item {
    border: 1px solid var(--minDate);
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    margin: 20px 0;
    .structure-top {
      flex-direction: column;
      text-align: center;
      gap: 10px;
      padding: 10px 0;
      &__title {
        font-size: 22px;
      }
    }
  }
`;

[
  {
    id: 6,
    title: "Jamoatchilik kengashi",
    parent_id: 1,
  },
  {
    id: 7,
    title: "Universitet kengashi",
    parent_id: 1,
  },
  {
    id: 34,
    title: "Xotin - qizlar maslahat kengashi",
    parent_id: 9,
  },
  {
    id: 36,
    title: "Talabalar kengashi",
    parent_id: 9,
  },
  {
    id: 16,
    title: "Axborot - resurs markazi",
    parent_id: 8,
  },
  {
    id: 33,
    title: "Sport inshootlari",
    parent_id: 9,
  },
  {
    id: 44,
    title: "Ilmiy - tadqiqot markazlari",
    parent_id: 10,
  },
  {
    id: 62,
    title: "Karera markazi",
    parent_id: 13,
  },
  {
    id: 17,
    title: "Tahririy nashriyoti va poligrafiya bo'limi",
    parent_id: 8,
  },
  {
    id: 35,
    title: "TTJ (administratsiya va ishchi xodimlar)",
    parent_id: 9,
  },
  {
    id: 1,
    title: "Rektor",
    parent_id: 0,
  },
  {
    id: 8,
    title: "Akademik faoliyat bo'yicha prorektor",
    parent_id: 1,
  },
  {
    id: 28,
    title: "Ikkinchi bo'lim",
    parent_id: 21,
  },
  {
    id: 289,
    title: "Qо‘qon avtomobil va yо‘llar texnikumi",
    parent_id: 8,
  },
  {
    id: 325,
    title: "Elektr ta’minoti o`quv laboratoriyasi",
    parent_id: 93,
  },
  {
    id: 46,
    title: "Xalqaro hamkorlik boshqarmasi",
    parent_id: 11,
  },
  {
    id: 51,
    title: "Xorij bilan hamkorlik markazi",
    parent_id: 11,
  },
  {
    id: 19,
    title: "Sirtqi bo‘lim",
    parent_id: 8,
  },
  {
    id: 30,
    title: "Yoshlar bilan ishlash, ma'naviy - ma'rifat bo'limi",
    parent_id: 9,
  },
  {
    id: 48,
    title: "Xalqaro ta'lim dasturlari bilan ishlash bo'limi",
    parent_id: 11,
  },
  {
    id: 76,
    title: "Xalqaro reytinglar bilan ishlash bo'limi",
    parent_id: 1,
  },
  {
    id: 78,
    title: "Temir yo‘l transporti muhandisligi",
    parent_id: 1,
  },
  {
    id: 15,
    title: "Raqamli ta‘lim texnologiyalari markazi",
    parent_id: 8,
  },
  {
    id: 49,
    title: "O‘zbekiston-Turkiya hamkorlik markazi",
    parent_id: 11,
  },
  {
    id: 50,
    title: '"Language Club" Xorijiy tillar markazi',
    parent_id: 11,
  },
  {
    id: 83,
    title: "Avtomobil yo’llari muhandisligi",
    parent_id: 1,
  },
  {
    id: 18,
    title: "Magistratura bo‘limi",
    parent_id: 8,
  },
  {
    id: 85,
    title: "Transport tizimlari boshqaruvi",
    parent_id: 1,
  },
  {
    id: 21,
    title: "Talabalarga xizmat ko'rsatish markazi (Ofis registrator)",
    parent_id: 8,
  },
  {
    id: 2,
    title: "Rektorning birinchi o'rinbosari (xorijiy mutaxasis)",
    parent_id: 1,
  },
  {
    id: 29,
    title:
      "Talabalarni turar joy bilan ta'minlash ishlarini muvofiqlashtiruvchi bo'lim",
    parent_id: 21,
  },
  {
    id: 79,
    title: "Elektrotexnika va kompyuter muhandisligi",
    parent_id: 1,
  },
  {
    id: 90,
    title: "Tabiiy fanlar",
    parent_id: 78,
  },
  {
    id: 38,
    title:
      "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boʻlimi",
    parent_id: 10,
  },
  {
    id: 39,
    title:
      "Iqtidorli talabalarning ilmiy-tadqiqot faoliyatini tashkil etish boʻlimi",
    parent_id: 10,
  },
  {
    id: 43,
    title: "Ilmiy - innovatsion ishlanmalarni tijoratlashtirish bo'limi",
    parent_id: 10,
  },
  {
    id: 47,
    title:
      "Akademik mobillik va xorijiy grantlar va institutlar bilan ishlash bo'limi",
    parent_id: 11,
  },
  {
    id: 77,
    title: "Raqamli transformatsiya bo'limi",
    parent_id: 1,
  },
  {
    id: 25,
    title: "Nukus transport texnikumi",
    parent_id: 8,
  },
  {
    id: 53,
    title: "Ishlar boshqarmasi",
    parent_id: 12,
  },
  {
    id: 80,
    title: "Iqtisodiyot",
    parent_id: 1,
  },
  {
    id: 81,
    title: "Qurilish muhandisligi",
    parent_id: 1,
  },
  {
    id: 82,
    title: "Aviatsiya transporti muhandisligi",
    parent_id: 1,
  },
  {
    id: 84,
    title: "Avtomobil transporti muhandisligi",
    parent_id: 1,
  },
  {
    id: 86,
    title: "Xalqaro ta’lim dasturlari",
    parent_id: 1,
  },
  {
    id: 88,
    title: "Elektr harakat tarkibi",
    parent_id: 78,
  },
  {
    id: 89,
    title: "Materialshunoslik va mashinasozlik",
    parent_id: 78,
  },
  {
    id: 91,
    title: "Lokomotivlar va lokomotiv xo’jaligi",
    parent_id: 78,
  },
  {
    id: 93,
    title: "Elektr ta’minoti",
    parent_id: 79,
  },
  {
    id: 94,
    title: "Avtomatika va telemexanika",
    parent_id: 79,
  },
  {
    id: 95,
    title: "Informatika va kompyuter grafikasi",
    parent_id: 79,
  },
  {
    id: 96,
    title: "Radioelektron qurilmalar va tizimlar",
    parent_id: 79,
  },
  {
    id: 97,
    title: "Chet tillari",
    parent_id: 80,
  },
  {
    id: 98,
    title: "Ijtimoiy fanlar",
    parent_id: 80,
  },
  {
    id: 99,
    title: "O’zbek (Rus) tili",
    parent_id: 80,
  },
  {
    id: 100,
    title: "Hisob va biznes",
    parent_id: 80,
  },
  {
    id: 101,
    title: "Transport iqtisodiyoti",
    parent_id: 80,
  },
  {
    id: 92,
    title: "Elektrotexnika",
    parent_id: 79,
  },
  {
    id: 102,
    title: "Korporativ boshqaruv",
    parent_id: 80,
  },
  {
    id: 104,
    title: "Transportda axborot tizimlari va texnologiyalari",
    parent_id: 80,
  },
  {
    id: 106,
    title: "Amaliy mexanika",
    parent_id: 81,
  },
  {
    id: 108,
    title: "Temir yo’l muhandisligi",
    parent_id: 81,
  },
  {
    id: 109,
    title: "Bino va sanoat inshootlari qurilishi",
    parent_id: 81,
  },
  {
    id: 110,
    title: "Muhandislik kommunikatsiyalari va tizimlari",
    parent_id: 81,
  },
  {
    id: 111,
    title: "Aviatsiya injiniringi",
    parent_id: 82,
  },
  {
    id: 112,
    title: "Aeronavigatsiya tizimlari",
    parent_id: 82,
  },
  {
    id: 113,
    title: "Shahar yo’llari va ko’chalari",
    parent_id: 83,
  },
  {
    id: 114,
    title: "Avtomobil yo’llaridagi sun’iy inshoatlar",
    parent_id: 83,
  },
  {
    id: 116,
    title: "Avtomobil yo’llarini qurish va eksplutatsiya qilish",
    parent_id: 83,
  },
  {
    id: 117,
    title: "Transport energetik qurilmalari",
    parent_id: 84,
  },
  {
    id: 118,
    title: "Avtomobil va avtomobil xo’jaligi",
    parent_id: 84,
  },
  {
    id: 119,
    title: "Transport vositalari muhandisligi",
    parent_id: 84,
  },
  {
    id: 120,
    title: "Texnologik mashinalar muhandisligi",
    parent_id: 84,
  },
  {
    id: 121,
    title: "Avtomobilsozlik va ishlab chiqarish muhandisligi",
    parent_id: 84,
  },
  {
    id: 122,
    title: "Transport logistikasi",
    parent_id: 85,
  },
  {
    id: 123,
    title: "Texnosfera xavfsizligi",
    parent_id: 85,
  },
  {
    id: 124,
    title: "Yuk transport tizimlari",
    parent_id: 85,
  },
  {
    id: 125,
    title: "Temir yo'ldan foydalanish ishlarini boshqarish",
    parent_id: 85,
  },
  {
    id: 126,
    title: "Transport intellektual tizimlari muhandisligi",
    parent_id: 85,
  },
  {
    id: 127,
    title: "Yo'l harakatini tashkil etish",
    parent_id: 85,
  },
  {
    id: 42,
    title: "Ixtisoslashtirilgan ilmiy kengashlar",
    parent_id: 10,
  },
  {
    id: 52,
    title:
      "Moliyalashtirish, buxgalteriya hisobi, hisoboti va tahlili bo'limi - Bosh hisobchi",
    parent_id: 12,
  },
  {
    id: 11,
    title: "Xalqaro hamkorlik bo'yicha prorektor",
    parent_id: 1,
  },
  {
    id: 12,
    title: "Moliya - iqtisod ishlari bo'yicha prorektor",
    parent_id: 1,
  },
  {
    id: 37,
    title: "Yoshlar ittifoqi",
    parent_id: 9,
  },
  {
    id: 40,
    title: "Ilmiy - innovatsion va loyiha - konstruktorlik bo'limi",
    parent_id: 10,
  },
  {
    id: 56,
    title: "Xo'jalik bo'limi",
    parent_id: 53,
  },
  {
    id: 58,
    title: "Fuqaro va mehnat muhofazasi bo'limi",
    parent_id: 53,
  },
  {
    id: 61,
    title: "Xavfsizlik xizmati bo'limi",
    parent_id: 53,
  },
  {
    id: 72,
    title: "Inson resurslarini boshqarish bo'limi",
    parent_id: 1,
  },
  {
    id: 107,
    title: "Ko'priklar va tonnellar",
    parent_id: 81,
  },
  {
    id: 105,
    title: "Oliy matematika",
    parent_id: 81,
  },
  {
    id: 20,
    title: "O'quv ishlari bo'yicha assistent",
    parent_id: 8,
  },
  {
    id: 45,
    title: "Tadqiqot ishlari bo'yicha assistent",
    parent_id: 10,
  },
  {
    id: 22,
    title: "Akademik litsey",
    parent_id: 8,
  },
  {
    id: 27,
    title: "Talabalar bilan ishlash sektori",
    parent_id: 21,
  },
  {
    id: 54,
    title: "O'quv amaliyot poligoni",
    parent_id: 12,
  },
  {
    id: 55,
    title: "Omborxona",
    parent_id: 12,
  },
  {
    id: 31,
    title: "Muzey",
    parent_id: 9,
  },
  {
    id: 32,
    title: "Psixolog",
    parent_id: 9,
  },
  {
    id: 59,
    title: "Qozonxona",
    parent_id: 53,
  },
  {
    id: 65,
    title: "Ichki audit va moliyaviy nazorat xizmati",
    parent_id: 1,
  },
  {
    id: 71,
    title: "Matbuot xizmati",
    parent_id: 1,
  },
  {
    id: 67,
    title: "OTM kengashi kotibi",
    parent_id: 1,
  },
  {
    id: 74,
    title: "Devonxona",
    parent_id: 1,
  },
  {
    id: 75,
    title: "Arxiv",
    parent_id: 1,
  },
  {
    id: 9,
    title:
      "Yoshlar masalalari va ma'naviy - ma'rifiy ishlar bo'yicha birinchi prorektor",
    parent_id: 1,
  },
  {
    id: 10,
    title: "Ilmiy ishlar va innovatsiyalar bo'yicha prorektor",
    parent_id: 1,
  },
  {
    id: 13,
    title: "Ishlab chiqarish korxonalar bilan integratsiya bo'yicha prorektor",
    parent_id: 1,
  },
  {
    id: 3,
    title:
      "Universitetdagi istiqbolli va strategik vazifalarni amalga oshirish masalalari bo'yicha rektor maslahatchisi",
    parent_id: 1,
  },
  {
    id: 4,
    title:
      "Talabalar orasida ijtimoiy ma'naviy muhit barqarorligini ta'minlashga mas'ul bo'lgan rektor maslahatchisi",
    parent_id: 1,
  },
  {
    id: 14,
    title: "Akademik faoliyati boshqarmasi",
    parent_id: 8,
  },
  {
    id: 24,
    title: "Samarqand temir yo'l texnikumi",
    parent_id: 8,
  },
  {
    id: 41,
    title: "Ilmiy nashrlar bilan ishlash bo'limi",
    parent_id: 10,
  },
  {
    id: 57,
    title: "Texnik ta'mirlash va tezkor qayta tiklash bo'limi",
    parent_id: 53,
  },
  {
    id: 60,
    title: "Transport xizmati bo'limi",
    parent_id: 53,
  },
  {
    id: 63,
    title: "Birinchi bo'lim",
    parent_id: 1,
  },
  {
    id: 64,
    title: "Ta'lim sifatini nazorat qilish bo'limi",
    parent_id: 1,
  },
  {
    id: 66,
    title:
      'Korrupsiyaga qarshi kurashish "Komplaens - nazorat" tizimini boshqarish bo\'limi',
    parent_id: 1,
  },
  {
    id: 73,
    title:
      "Jismoniy va yuridik shaxslarning murojaatlari bilan ishlash, nazorat va monitoring bo'limi",
    parent_id: 1,
  },
  {
    id: 23,
    title: "Andijon transport texnikumi",
    parent_id: 8,
  },
  {
    id: 26,
    title:
      "Akademik mobillilikni muvofiqlashtirish va talabalar registratsiyasi (admission ofisi) sektori",
    parent_id: 21,
  },
  {
    id: 69,
    title: "Rektor yordamchisi - protokol xizmati",
    parent_id: 1,
  },
  {
    id: 70,
    title: "Yuriskonsult",
    parent_id: 1,
  },
  {
    id: 128,
    title: "Temir yo‘l transporti ilmiy tadqiqot markazi",
    parent_id: 87,
  },
  {
    id: 129,
    title: "Innovatsion transport",
    parent_id: 1,
  },
  {
    id: 130,
    title: "E-RAILWAY",
    parent_id: 94,
  },
  {
    id: 290,
    title: "Urganch avtomobil va yо‘llar texnikumi",
    parent_id: 8,
  },
  {
    id: 291,
    title: "Buxoro avtomobil va yullar texnikumi",
    parent_id: 8,
  },
  {
    id: 292,
    title: "Toshkent avtomobil va yо‘llar texnikumi",
    parent_id: 8,
  },
  {
    id: 294,
    title: "Sаmаrqаnd temir yо‘l texnikumi",
    parent_id: 8,
  },
  {
    id: 295,
    title: "Qо‘qon temir yо‘l texnikumi",
    parent_id: 8,
  },
  {
    id: 297,
    title: "Toshkent temir yо‘l texnikumi",
    parent_id: 8,
  },
  {
    id: 308,
    title:
      "Аvtomobil yoʼllarini qurish va ekspluatatsiya qilish o`quv laboratoriyasi",
    parent_id: 116,
  },
  {
    id: 309,
    title: "Yuk transport tizimlari o`quv laboratoriyasi",
    parent_id: 124,
  },
  {
    id: 322,
    title:
      "Temir yo‘ldan foydalanish ishlarini boshqarish o`quv laboratoriyasi",
    parent_id: 125,
  },
  {
    id: 5,
    title: "Kuzatuv kengashi",
    parent_id: 1,
  },
  {
    id: 333,
    title: "Ekologiya o`quv laboratoriyasi",
    parent_id: 117,
  },
  {
    id: 741,
    title: "None",
    parent_id: 1,
  },
  {
    id: 742,
    title: "O'quv bo'limi",
    parent_id: 1,
  },
  {
    id: 87,
    title: "Vagonlar va vagon xo’jaligi",
    parent_id: 78,
  },
  {
    id: 103,
    title: "Xalqaro ommaviy huquq va tarix",
    parent_id: 80,
  },
  {
    id: 115,
    title: "Avtomobil yo’llarini qidiruv va loyihalash",
    parent_id: 83,
  },
  {
    id: 305,
    title: "Transport energetik  qurilmalari o`quv laboratoriyasi",
    parent_id: 117,
  },
  {
    id: 306,
    title: "Avtomobil yoʼllaridagi sunʼiy inshootlar o`quv laboratoriyasi",
    parent_id: 114,
  },
  {
    id: 307,
    title: "Shahar yoʼllari va koʼchalari o`quv laboratoriyasi",
    parent_id: 113,
  },
  {
    id: 320,
    title: "Transport logistikasi o`quv laboratoriyasi",
    parent_id: 122,
  },
  {
    id: 326,
    title: "Muhandislik kommunikatsiyalari va tizimlari o`quv laboratoriyasi",
    parent_id: 110,
  },
  {
    id: 328,
    title: "Elektrotexnika o`quv laboratoriyasi",
    parent_id: 92,
  },
  {
    id: 330,
    title: "Aviatsiya injiniringi o`quv laboratoriyasi",
    parent_id: 111,
  },
  {
    id: 331,
    title: "Ko’priklar va tonnellar o`quv laboratoriyasi",
    parent_id: 107,
  },
  {
    id: 310,
    title: "Transport intellektual tizimlari muhandisligi o`quv laboratoriyasi",
    parent_id: 126,
  },
  {
    id: 311,
    title: "Lokomotivlar va lokomotiv xo‘jaligi o`quv laboratoriyasi",
    parent_id: 91,
  },
  {
    id: 312,
    title: "Informatika va kompyuter grafikasi o`quv laboratoriyasi",
    parent_id: 95,
  },
  {
    id: 313,
    title:
      "Avtomobilsozlik va ishlab chiqarish muhandisligi o`quv laboratoriyasi",
    parent_id: 121,
  },
  {
    id: 314,
    title: "Aeronavigatsiya tizimlari o`quv laboratoriyasi",
    parent_id: 112,
  },
  {
    id: 324,
    title: "Avtomobil yo‘llarini qidiruv va loyihalash o`quv laboratoriyasi",
    parent_id: 115,
  },
  {
    id: 327,
    title: "Vagonlar va vagon xo’jaligi o`quv laboratoriyasi",
    parent_id: 87,
  },
  {
    id: 329,
    title: "Tabiiy fanlar o`quv laboratoriyasi",
    parent_id: 90,
  },
  {
    id: 315,
    title: "Radioelektron qurilmalar va tizimlar o`quv laboratoriyasi",
    parent_id: 96,
  },
  {
    id: 316,
    title: "Texnosfera xavfsizligi o`quv laboratoriyasi",
    parent_id: 123,
  },
  {
    id: 317,
    title: "Avtomobil va avtomobil xo’jaligi o`quv laboratoriyasi",
    parent_id: 118,
  },
  {
    id: 318,
    title: "Elektr harakat tarkibi o`quv laboratoriyasi",
    parent_id: 88,
  },
  {
    id: 319,
    title: "Texnologik mashinalar muhandisligi o`quv laboratoriyasi",
    parent_id: 120,
  },
  {
    id: 321,
    title: "Transport vositalari muhandisligi o`quv laboratoriyasi",
    parent_id: 119,
  },
  {
    id: 323,
    title: "Yoʼl harakatini tashkil etish o`quv laboratoriyasi",
    parent_id: 127,
  },
];
