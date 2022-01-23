import changePageTitle from '../utils/change-page-title';

const Winners = () => {
  changePageTitle('Winners');

  const component = document.createElement('div');
  component.className = 'winners';

  const title = document.createElement('h2');
  title.className = 'winners__title';
  title.textContent = 'Winners (0)';

  component.append(title);

  return component;
};

export default Winners;
