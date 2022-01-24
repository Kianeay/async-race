import {
  createWinner,
  driveCar,
  getAllWinner,
  getCarVelocity,
  getWinner,
  removeCarApi,
  updateWinner,
} from '../api';
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
  const flag = FlagIcon('#ff0f09');

  let shouldContinue = true;

  const startMove = async () => {
    const start = Date.now();

    localStorage.removeItem('isFirst');
    localStorage.removeItem('isRace');
    shouldContinue = true;
    const speed = await getCarVelocity(id, 'started');

    const carSet = {
      car,
      flag,
      carX: 0,
      flagX: raceContainer.offsetWidth - flag.offsetWidth,
      speed: speed / 100,
    };

    const setWinner = async (time: number) => {
      const winData = await getWinner(id);

      if (!Object.keys(winData).length) {
        await createWinner({ id, wins: 1, time });
      } else {
        if (winData.time < time) return;
        await updateWinner(id, { time, wins: winData.wins + 1 });
      }
      const allWinnersData = await getAllWinner({});
    };

    const tick = () => {
      carSet.carX = carSet.carX + 1 + carSet.speed;
      car.style.transform = `translateX(${carSet.carX}px)`;

      if (carSet.carX > carSet.flagX + 25) {
        shouldContinue = false;

        if (
          !localStorage.getItem('isFirst') &&
          localStorage.getItem('isRace')
        ) {
          const time = ((Date.now() - start) / 1000).toFixed(2);
          setWinner(+time);
          const winnerName = document.querySelector('.winner-name');
          winnerName.classList.remove('none');
          winnerName.textContent = `${name} went first(${time} sec)`;

          setTimeout(() => {
            winnerName.classList.add('none');
          }, 4000);
        }
        localStorage.setItem('isFirst', 'true');
      }

      if (shouldContinue) {
        requestAnimationFrame(tick);
      }
    };
    tick();

    shouldContinue = await driveCar(id, 'drive');
  };

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cars__btn-container';

  const buttonStartMove = Button({
    onClick: () => {
      startMove();
      (
        carContainer.querySelector('.cars__start') as HTMLButtonElement
      ).disabled = true;
      (
        carContainer.querySelector('.cars__stop') as HTMLButtonElement
      ).disabled = false;
    },
    title: 'A',
  });
  buttonStartMove.classList.add('cars__start');

  const buttonStopMove = Button({
    onClick: () => {
      shouldContinue = false;
      setTimeout(() => {
        car.style.transform = 'translateX(0px)';
      }, 500);
      (
        carContainer.querySelector('.cars__start') as HTMLButtonElement
      ).disabled = false;
      (
        carContainer.querySelector('.cars__stop') as HTMLButtonElement
      ).disabled = true;
    },
    title: 'B',
  });
  buttonStopMove.classList.add('cars__stop');
  buttonStopMove.disabled = true;

  btnContainer.append(buttonStartMove, buttonStopMove);

  window.addEventListener('app:garage:race', startMove);
  window.addEventListener('app:garage:resetRace', () => {
    shouldContinue = false;
    setTimeout(() => {
      car.style.transform = 'translateX(0px)';
    }, 500);
  });

  raceContainer.append(car, flag);
  carContainer.append(btnContainer, raceContainer);

  component.append(itemHeader, carContainer);

  return component;
};

export default Car;
