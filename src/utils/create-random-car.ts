/* eslint-disable implicit-arrow-linebreak */
function getRandomIntInclusive(minNum: number, maxNum: number) {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777216).toString(16)}`;

const carModel = [
  'Tesla',
  'Ferrari',
  'Lamborgini',
  'Chevrolet',
  'Porsche',
  'Toyota',
  'Ford',
  'Maserati',
  'Land Rover',
  'Chrysler',
];
const carModel2 = [
  'Pista',
  'Spider',
  'Portofino',
  'Aperta',
  'Challenge',
  'FXX K',
  'Model S',
  'Gallardo',
  'Model Y',
  'Supra',
];

function createRandomCar() {
  const randomCar = carModel[getRandomIntInclusive(0, carModel.length - 1)];
  const randomModel = carModel2[getRandomIntInclusive(0, carModel2.length - 1)];
  const color = getRandomColor();
  return {
    name: `${randomCar} ${randomModel}`,
    color,
  };
}
export default createRandomCar;
