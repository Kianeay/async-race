import Car from '../components/Car';

interface ICarsLst {
  totalCarsCount: number;
}
const CarsList = ({ totalCarsCount = 13 }: ICarsLst) => {
  const component = document.createElement('div');
  component.className = 'cars';

  const title = document.createElement('h1');
  title.className = 'cars__title';
  title.textContent = `Garage (${totalCarsCount})`;

  const carsPage = document.createElement('h3');
  carsPage.className = 'cars__page';
  carsPage.textContent = `Page #${3}`;

  const list = document.createElement('ul');
  list.className = 'cars__list';

  list.append(Car({ name: 'aston martin', color: 'pink' }));

  component.append(title, carsPage, list);

  return component;
};

export default CarsList;
