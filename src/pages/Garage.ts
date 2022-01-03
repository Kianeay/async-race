import changePageTitle from '../utils/change-page-title';

const Garage = () => {
  changePageTitle('Garage');

  const component = document.createElement('div');
  component.textContent = 'Garage';
  return component;
};

export default Garage;
