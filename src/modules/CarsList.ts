import { getCarsListApi, ICreateParams } from '../api';
import Car, { ICar } from '../components/Car';
import Button from '../components/Button';

interface ICarsLst {
  totalCarsCount: number;
}

const CarsList = () => {
  const component = document.createElement('div');
  component.className = 'cars';

  const title = document.createElement('h1');
  title.className = 'cars__title';

  const carsPage = document.createElement('h3');
  carsPage.className = 'cars__page';

  const list = document.createElement('ul');
  list.className = 'cars__list';

  let currentPage = 1;
  let carsCount = 0;

  const getCars = async () => {
    const carsArrAll = await getCarsListApi();
    carsCount = carsArrAll.length;
    const carsArr = await getCarsListApi(currentPage, 7);

    title.textContent = `Garage (${carsArrAll.length})`;
    carsPage.textContent = `Page #${currentPage}`;
    const carsItems = carsArr.map((item: ICar) => Car(item));
    list.innerHTML = '';
    list.append(...carsItems);
  };
  getCars();
  window.addEventListener('app:garage:updateCarsList', getCars);

  const btnWrap = document.createElement('div');
  btnWrap.className = 'btn-wrap';

  btnWrap.append(
    Button({
      title: 'prev',
      onClick: () => {
        if (currentPage === 1) return;
        currentPage -= 1;
        getCars();
      },
    }),
    Button({
      title: 'next',
      onClick: () => {
        const page = Math.floor(carsCount / 7);
        if (page === currentPage) return;
        currentPage += 1;
        getCars();
      },
    }),
  );

  component.append(title, carsPage, list, btnWrap);

  return component;
};

export default CarsList;
