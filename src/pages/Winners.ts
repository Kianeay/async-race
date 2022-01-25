import { getAllWinner, getAllWinnerCount } from '../api';
import Navbar from '../modules/Navbar';
import Table from '../modules/Table';
import changePageTitle from '../utils/change-page-title';

const Winners = () => {
  changePageTitle('Winners');

  const component = document.createElement('div');
  component.className = 'winners';

  const title = document.createElement('h2');
  title.className = 'winners__title';

  const showWinners = async () => {
    const dataWinners = await getAllWinnerCount();
    title.textContent = `Winners (${Object.keys(dataWinners).length})`;
  };
  showWinners();

  component.append(Navbar(), title, Table());

  return component;
};

export default Winners;
