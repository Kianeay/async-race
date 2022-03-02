import { CarsList, Form } from '.';
import { Navbar } from '../Common';
import changePageTitle from '../../utils/change-page-title';

const Garage = () => {
  changePageTitle('Garage');

  const component = document.createElement('div');
  component.className = 'garage';
  component.append(Navbar(), Form(), CarsList());

  const winnerName = document.createElement('p');
  winnerName.className = 'none winner-name';

  component.append(winnerName);

  return component;
};

export default Garage;
