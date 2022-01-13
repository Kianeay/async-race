import { driveCar, getCarVelocity, removeCarApi } from '../api';
import createDispatchEvent from '../utils/dispatch-event';
import moveCar from '../utils/move-car';
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

  const startMove = () => {
    moveCar({ car, flag, flagX: raceContainer.offsetWidth - flag.offsetWidth });
    getCarVelocity(id, 'started');
    try {
      driveCar(id, 'drive');
    } catch (error) {
      // eslint-disable-next-line no-empty
      if (error) {
      }
      console.log('errrrrrrrrror');
    }
  };

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cars__btn-container';
  btnContainer.append(
    Button({ onClick: startMove, title: 'A' }),
    Button({ onClick: selectCar, title: 'B' }),
  );

  raceContainer.append(car, flag);
  carContainer.append(btnContainer, raceContainer);

  component.append(itemHeader, carContainer);

  return component;
};

export default Car;
