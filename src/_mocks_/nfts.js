import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Non Fungible Token 1',
  'Non Fungible Token 2',
  'Non Fungible Token 3',
  'Non Fungible Token 4',
  'Non Fungible Token 5',
  'Non Fungible Token 6',
  'Non Fungible Token 7',
  'Non Fungible Token 8',
  'Non Fungible Token 9',
  'Non Fungible Token 10',
//   'Kyrie 7 EP Sisterhood',
//   'Nike Air Zoom BB NXT',
//   'Nike Air Force 1 07 LX',
//   'Nike Air Force 1 Shadow SE',
//   'Nike Air Zoom Tempo NEXT%',
//   'Nike DBreak-Type',
//   'Nike Air Max Up',
//   'Nike Air Max 270 React ENG',
//   'NikeCourt Royale',
//   'Nike Air Zoom Pegasus 37 Premium',
//   'Nike Air Zoom SuperRep',
//   'NikeCourt Royale',
//   'Nike React Art3mis',
//   'Nike React Infinity Run Flyknit A.I.R. Chaz Bear'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

const products = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', ''])
  };
});

export default products;
