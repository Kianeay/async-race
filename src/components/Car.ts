import { driveCar, getCarVelocity, removeCarApi } from '../api';
import createDispatchEvent from '../utils/dispatch-event';
import Button from './Button';
import CarIcon from './CarIcon';
import FlagIcon from './FlagIcon';

export interface ICar {
  name: string;
  color: string;
  id: number;
}
const Car = ({ name, color, id }: ICar) => {
  const component = document.createElement('li');
  component.className = 'cars__item';

  const itemHeader = document.createElement('div');
  itemHeader.className = 'cars__header';

  const carName = document.createElement('span');
  carName.textContent = name;
  carName.className = 'cars__name';

  const removeCar = async () => {
    await removeCarApi(id);
    createDispatchEvent('app:garage:updateCarsList');
  };

  const selectCar = async () => {
    localStorage.setItem('currentCarId', `${id}`);
    createDispatchEvent('app:garage:selectCar');
  };

  itemHeader.append(
    Button({ onClick: selectCar, title: 'select' }),
    Button({ onClick: removeCar, title: 'remove' }),
    carName,
  );

  const carContainer = document.createElement('div');
  carContainer.className = 'cars__container';

  const raceContainer = document.createElement('div');
  raceContainer.className = 'cars__race-container';

  const car = CarIcon(color);
  const flag = FlagIcon(color);

  let shouldContinue = true;

  const startMove = async () => {
    shouldContinue = true;
    const speed = await getCarVelocity(id, 'started');

    const carSet = {
      car,
      flag,
      carX: 0,
      flagX: raceContainer.offsetWidth - flag.offsetWidth,
      speed: speed / 100,
    };

    const tick = () => {
      carSet.carX = carSet.carX + 1 + carSet.speed;
      car.style.transform = `translateX(${carSet.carX}px)`;

      if (shouldContinue) {
        requestAnimationFrame(tick);
      }
    };
    tick();

    shouldContinue = await driveCar(id, 'drive');
  };

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cars__btn-container';

  btnContainer.append(
    Button({ onClick: startMove, title: 'A' }),
    Button({
      onClick: () => {
        shouldContinue = false;
        setTimeout(() => {
          car.style.transform = 'translateX(0px)';
        }, 500);
      },
      title: 'B',
    }),
  );

  window.addEventListener('app:garage:race', startMove);

  raceContainer.append(car, flag);
  carContainer.append(btnContainer, raceContainer);

  component.append(itemHeader, carContainer);

  return component;
};

export default Car;
