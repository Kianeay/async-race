import Form from '../modules/Form';
import Navbar from '../modules/Navbar';
import changePageTitle from '../utils/change-page-title';

const Garage = () => {
  changePageTitle('Garage');

  const component = document.createElement('div');
  component.textContent = 'Garage';
  component.append(Navbar(), Form());
  return component;
};

export default Garage;
