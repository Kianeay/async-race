import Button from './Button';
import CarIcon from './CarIcon';

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

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cars__btn-container';
  btnContainer.append(
    Button({ onClick: test2, title: 'A' }),
    Button({ onClick: test2, title: 'B' }),
  );

  const raceContainer = document.createElement('div');
  raceContainer.className = 'cars__race-container';

  raceContainer.append(CarIcon(color));
  carContainer.append(btnContainer, raceContainer);

  component.append(itemHeader, carContainer);

  return component;
};

export default Car;
