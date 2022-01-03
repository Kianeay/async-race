import changePageTitle from '../utils/change-page-title';

const Winners = () => {
  changePageTitle('Winners');

  const component = document.createElement('div');
  component.textContent = 'Winners';
  return component;
};

export default Winners;
