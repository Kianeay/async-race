import CarsList from '../modules/CarsList';
import Form from '../modules/Form';
import Navbar from '../modules/Navbar';
import changePageTitle from '../utils/change-page-title';

const Garage = () => {
  changePageTitle('Garage');

  const component = document.createElement('div');
  component.className = 'garage';
  component.append(Navbar(), Form(), CarsList({ totalCarsCount: 1 }));
  return component;
};

export default Garage;