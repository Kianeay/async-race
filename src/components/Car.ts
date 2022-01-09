import moveCar from '../utils/move-car';
import Button from './Button';
import CarIcon from './CarIcon';
import FlagIcon from './FlagIcon';

interface ICar {
  name: string;
  color: string;
}
const Car = ({ name, color }: ICar) => {
  const component = document.createElement('li');
  component.className = 'cars__item';

  const itemHeader = document.createElement('div');
  itemHeader.className = 'cars__header';
  const test2 = () => console.log('btn');

  const carName = document.createElement('span');
  carName.textContent = name;
  carName.className = 'cars__name';

  itemHeader.append(
    Button({ onClick: test2, title: 'select' }),
    Button({ onClick: test2, title: 'remove' }),
    carName,
  );

  const carContainer = document.createElement('div');
  carContainer.className = 'cars__container';

  const raceContainer = document.createElement('div');
  raceContainer.className = 'cars__race-container';

  const car = CarIcon(color);
  const flag = FlagIcon(color);

  const startMove = async () => {
    moveCar({ car, flag, flagX: raceContainer.offsetWidth - flag.offsetWidth });
    const velocity = await fetch('http://127.0.0.1:3000/engine');
  };

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cars__btn-container';
  btnContainer.append(
    Button({ onClick: startMove, title: 'A' }),
    Button({ onClick: test2, title: 'B' }),
  );

  raceContainer.append(car, flag);
  carContainer.append(btnContainer, raceContainer);

  component.append(itemHeader, carContainer);

  return component;
};

export default Car;
