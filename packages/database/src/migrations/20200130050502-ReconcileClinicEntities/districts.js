import { generateId } from '../../utilities/generateId';
/*
    Now add the missing districts
  */
export const newDistricts = [
  { name: 'Kampong Cham', countryCode: 'KH', id: generateId(), code: 'KH_KAMPONG' },
  { name: 'Mekong', countryCode: 'KH', id: generateId(), code: 'KH_Samdech Ov' },
  { name: 'Dang Koa', countryCode: 'KH', id: generateId(), code: 'KH_Dang Kao' },
  { name: 'Bassak', countryCode: 'KH', id: generateId(), code: 'KH_Mean Chey' },
  { name: 'Stueng Trang', countryCode: 'KH', id: generateId(), code: 'KH_Hun Sen Stung Trang' },
  { name: 'Batheay', countryCode: 'KH', id: generateId(), code: 'KH_Batheay' },
  { name: 'Sen Sok', countryCode: 'KH', id: generateId(), code: 'KH_Sen Sok' },
  { name: 'Chamkar Leu', countryCode: 'KH', id: generateId(), code: 'KH_Chamkar Leu' },
  { name: 'Choeung Prey', countryCode: 'KH', id: generateId(), code: 'KH_Choeung Prey' },
  { name: 'Prey Chhor', countryCode: 'KH', id: generateId(), code: 'KH_Prey Chhor' },
  { name: 'Por Senchey', countryCode: 'KH', id: generateId(), code: 'KH_Pochentong' },
  { name: 'Preaek Phnov', countryCode: 'KH', id: generateId(), code: 'KH_Prek Pnov' },
  { name: 'Chaktomouk', countryCode: 'KH', id: generateId(), code: 'KH_Chamkar Morn' },
  { name: 'Srey Santhor', countryCode: 'KH', id: generateId(), code: 'KH_Srey Santhor' },
  {
    name: 'Municipal Hospital_PH',
    countryCode: 'KH',
    id: generateId(),
    code: 'KH_Municipal Hospital',
  },
  { name: 'Tuamasaga', countryCode: 'WS', id: generateId(), code: 'WS_TUAMASAGA' },
  { name: "Moto'otua", countryCode: 'WS', id: generateId(), code: 'WS_SAMOA_1' },
  { name: 'Phnom Penh', countryCode: 'KH', id: generateId(), code: 'KH_PHNOMPENH' },
  {
    id: generateId(),
    code: 'CI_BELIER24',
    countryCode: 'CI',
    name: 'Yamoussoukro',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro',
    countryCode: 'TL',
    name: 'Bobonaro District',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Cailaco',
    countryCode: 'TL',
    name: 'Cailaco',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Lolotoe',
    countryCode: 'TL',
    name: 'Lolotoe',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Balibo',
    countryCode: 'TL',
    name: 'Balibo',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Maliana',
    countryCode: 'TL',
    name: 'Maliana',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Bobonaro',
    countryCode: 'TL',
    name: 'Bobonaro',
  },
  {
    id: generateId(),
    code: 'TL_Bobonaro_Atabae',
    countryCode: 'TL',
    name: 'Atabae',
  },
  {
    id: generateId(),
    code: 'TL_Lautem',
    countryCode: 'TL',
    name: 'Lautem District',
  },
  {
    id: generateId(),
    code: 'TL_Lautem_Mehara',
    countryCode: 'TL',
    name: 'Mehara',
  },
  {
    id: generateId(),
    code: 'TL_Lautem_Iliomar',
    countryCode: 'TL',
    name: 'Iliomar',
  },
  {
    id: generateId(),
    code: 'TL_Lautem_Lospalos',
    countryCode: 'TL',
    name: 'Lospalos',
  },
  {
    id: generateId(),
    code: 'TL_Lautem_Luro',
    countryCode: 'TL',
    name: 'Luro',
  },
  {
    id: generateId(),
    code: 'TL_Lautem_Lautem',
    countryCode: 'TL',
    name: 'Lautem',
  },
  {
    id: generateId(),
    code: 'TL_Liquica',
    countryCode: 'TL',
    name: 'Liquica District',
  },
  {
    id: generateId(),
    code: 'TL_Liquica_Liquica',
    countryCode: 'TL',
    name: 'Liquica',
  },
  {
    id: generateId(),
    code: 'TL_Liquica_Bazartete',
    countryCode: 'TL',
    name: 'Bazartete',
  },
  {
    id: generateId(),
    code: 'TL_Liquica_Maubara',
    countryCode: 'TL',
    name: 'Maubara',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque',
    countryCode: 'TL',
    name: 'Viqueque District',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque_Lacluta',
    countryCode: 'TL',
    name: 'Lacluta',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque_Uatucarbau',
    countryCode: 'TL',
    name: 'Uatucarbau',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque_Viqueque',
    countryCode: 'TL',
    name: 'Viqueque',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque_Ossu',
    countryCode: 'TL',
    name: 'Ossu',
  },
  {
    id: generateId(),
    code: 'TL_Viqueque_Uatulari',
    countryCode: 'TL',
    name: 'Uatulari',
  },
  {
    id: generateId(),
    code: 'TL_Baucau',
    countryCode: 'TL',
    name: 'Baucau District',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Venilale',
    countryCode: 'TL',
    name: 'Venilale',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Vemasse',
    countryCode: 'TL',
    name: 'Vemasse',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Baguia',
    countryCode: 'TL',
    name: 'Baguia',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Baucau',
    countryCode: 'TL',
    name: 'Baucau',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Quelicai',
    countryCode: 'TL',
    name: 'Quelicai',
  },
  {
    id: generateId(),
    code: 'TL_Baucau_Laga',
    countryCode: 'TL',
    name: 'Laga',
  },
  {
    id: generateId(),
    code: 'TL_Ainaro',
    countryCode: 'TL',
    name: 'Ainaro District',
  },
  {
    id: generateId(),
    code: 'TL_Ainaro_Maubisse',
    countryCode: 'TL',
    name: 'Maubisse',
  },
  {
    id: generateId(),
    code: 'TL_Ainaro_Ainaro',
    countryCode: 'TL',
    name: 'Ainaro',
  },
  {
    id: generateId(),
    code: 'TL_Ainaro_Hatoudo',
    countryCode: 'TL',
    name: 'Hatoudo',
  },
  {
    id: generateId(),
    code: 'TL_Ainaro_Hatobuilico',
    countryCode: 'TL',
    name: 'Hatobuilico',
  },
  {
    id: generateId(),
    code: 'TL_Dili',
    countryCode: 'TL',
    name: 'Dili',
  },
  {
    id: generateId(),
    code: 'TL_Dili_Atauro',
    countryCode: 'TL',
    name: 'Atauro',
  },
  {
    id: generateId(),
    code: 'TL_Dili_Vera Cruz',
    countryCode: 'TL',
    name: 'Vera Cruz',
  },
  {
    id: generateId(),
    code: 'TL_Dili_Becora',
    countryCode: 'TL',
    name: 'Becora',
  },
  {
    id: generateId(),
    code: 'TL_Dili_Comoro',
    countryCode: 'TL',
    name: 'Comoro',
  },
  {
    id: generateId(),
    code: 'TL_Dili_Metinaro',
    countryCode: 'TL',
    name: 'Metinaro',
  },
  {
    id: generateId(),
    code: 'TL_Manufahi',
    countryCode: 'TL',
    name: 'Manufahi',
  },
  {
    id: generateId(),
    code: 'TL_Manufahi_Same',
    countryCode: 'TL',
    name: 'Same',
  },
  {
    id: generateId(),
    code: 'TL_Manufahi_Turiscai',
    countryCode: 'TL',
    name: 'Turiscai',
  },
  {
    id: generateId(),
    code: 'TL_Manufahi_Fatuberliu',
    countryCode: 'TL',
    name: 'Fatuberliu',
  },
  {
    id: generateId(),
    code: 'TL_Manufahi_Alas',
    countryCode: 'TL',
    name: 'Alas',
  },
  {
    id: generateId(),
    code: 'TL_Ermera',
    countryCode: 'TL',
    name: 'Ermera District',
  },
  {
    id: generateId(),
    code: 'TL_Ermera_Letefoho',
    countryCode: 'TL',
    name: 'Letefoho',
  },
  {
    id: generateId(),
    code: 'TL_Ermera_Hatolia',
    countryCode: 'TL',
    name: 'Hatolia',
  },
  {
    id: generateId(),
    code: 'TL_Ermera_Railaco',
    countryCode: 'TL',
    name: 'Railaco',
  },
  {
    id: generateId(),
    code: 'TL_Ermera_Ermera',
    countryCode: 'TL',
    name: 'Ermera',
  },
  {
    id: generateId(),
    code: 'TL_Ermera_Atsabe',
    countryCode: 'TL',
    name: 'Atsabe',
  },
  {
    id: generateId(),
    code: 'TL_Oecusse',
    countryCode: 'TL',
    name: 'Oecusse',
  },
  {
    id: generateId(),
    code: 'TL_Oecusse_Baqui',
    countryCode: 'TL',
    name: 'Baqui',
  },
  {
    id: generateId(),
    code: 'TL_Oecusse_Nitibe',
    countryCode: 'TL',
    name: 'Nitibe',
  },
  {
    id: generateId(),
    code: 'TL_Oecusse_Oesilo',
    countryCode: 'TL',
    name: 'Oesilo',
  },
  {
    id: generateId(),
    code: 'TL_Oecusse_Passabe',
    countryCode: 'TL',
    name: 'Passabe',
  },
  {
    id: generateId(),
    code: 'TL_Covalima',
    countryCode: 'TL',
    name: 'Covalima',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Fohorem',
    countryCode: 'TL',
    name: 'Fohorem',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Suai',
    countryCode: 'TL',
    name: 'Suai',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Tilomar',
    countryCode: 'TL',
    name: 'Tilomar',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Fatumea',
    countryCode: 'TL',
    name: 'Fatumea',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Maucatar',
    countryCode: 'TL',
    name: 'Maucatar',
  },
  {
    id: generateId(),
    code: 'TL_Covalima_Zumalai',
    countryCode: 'TL',
    name: 'Zumalai',
  },
  {
    id: generateId(),
    code: 'TL_Aileu',
    countryCode: 'TL',
    name: 'Aileu',
  },
  {
    id: generateId(),
    code: 'TL_Aileu_Remexio',
    countryCode: 'TL',
    name: 'Remexio',
  },
  {
    id: generateId(),
    code: 'TL_Aileu_Laulara',
    countryCode: 'TL',
    name: 'Laulara',
  },
  {
    id: generateId(),
    code: 'TL_Aileu_Aileu Vila',
    countryCode: 'TL',
    name: 'Aileu Vila',
  },
  {
    id: generateId(),
    code: 'TL_Aileu_Lequidoe',
    countryCode: 'TL',
    name: 'Lequidoe',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto',
    countryCode: 'TL',
    name: 'Manatuto District',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Soibada',
    countryCode: 'TL',
    name: 'Soibada',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Laclo',
    countryCode: 'TL',
    name: 'Laclo',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Laclubar',
    countryCode: 'TL',
    name: 'Laclubar',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Laleia',
    countryCode: 'TL',
    name: 'Laleia',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Manatuto',
    countryCode: 'TL',
    name: 'Manatuto',
  },
  {
    id: generateId(),
    code: 'TL_Manatuto_Natarbora',
    countryCode: 'TL',
    name: 'Natarbora',
  },
];
