import {
  getAllWinner,
  getAllWinnerCount,
  getCarApi,
  IGetAllWinners,
  IWinnerParams,
} from '../../api';

import { Button, CarIcon } from '../Common/index';

const Table = () => {
  const sortSettings: Required<IGetAllWinners> = {
    page: 1,
    limit: 10,
    sort: 'id',
    order: 'ASC',
  };
  const component = document.createElement('div');

  const winnersPageTitle = document.createElement('h3');
  winnersPageTitle.className = 'cars__page';

  const table = document.createElement('table');
  table.className = 'table';

  const head = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

  const tHead = document.createElement('thead');

  const tHeadTitles = head.map((el) => {
    const td = document.createElement('td');
    td.textContent = el;
    if (el === 'Wins') {
      td.addEventListener('click', () => sortWinners('wins'));
    } else if (el === 'Number') {
      td.addEventListener('click', () => sortWinners('id'));
    } else if (el === 'Best time (seconds)') {
      td.addEventListener('click', () => sortWinners('time'));
    }

    return td;
  });

  const tr = document.createElement('tr');

  tr.append(...tHeadTitles);

  tHead.append(tr);

  const tBody = document.createElement('tbody');

  let winnerCount = 0;

  const showWinners = async () => {
    const dataWinners = await getAllWinner(sortSettings);
    const getWinnerCount = await getAllWinnerCount();
    winnerCount = getWinnerCount.length;

    winnersPageTitle.textContent = `Page ${sortSettings.page}`;

    const rows = await Promise.all(
      dataWinners.map(async (el: Required<IWinnerParams>, i: number) => {
        const data = await getCarApi(el.id);
        const row = document.createElement('tr');
        const tdNum = document.createElement('td');
        tdNum.textContent = `${i + 1}`;
        const tdCar = document.createElement('td');

        tdCar.append(CarIcon(data.color));

        const tdName = document.createElement('td');
        tdName.textContent = data.name;
        const tdWins = document.createElement('td');
        tdWins.textContent = `${el.wins}`;
        const tdTime = document.createElement('td');
        tdTime.textContent = `${el.time}`;

        row.append(tdNum, tdCar, tdName, tdWins, tdTime);

        return row;
      }),
    );
    tBody.innerHTML = '';

    tBody.append(...rows);
  };

  showWinners();

  table.append(tHead, tBody);
  const btnWrap = document.createElement('div');
  btnWrap.className = 'btn-wrap';

  function sortWinners(sort: string) {
    switch (sort) {
      case 'wins':
        sortSettings.sort = 'wins';
        break;

      case 'time':
        sortSettings.sort = 'time';
        break;

      case 'id':
        sortSettings.sort = 'id';
        break;

      default:
        break;
    }
    sortSettings.order === 'ASC'
      ? (sortSettings.order = 'DESC')
      : (sortSettings.order = 'ASC');

    showWinners();
  }

  btnWrap.append(
    Button({
      title: 'prev',
      onClick: () => {
        if (sortSettings.page === 1) return;
        sortSettings.page -= 1;
        showWinners();
      },
    }),
    Button({
      title: 'next',
      onClick: () => {
        const page = Math.ceil(winnerCount / 10);
        if (page === sortSettings.page) return;
        sortSettings.page += 1;
        showWinners();
      },
    }),
  );

  component.append(winnersPageTitle, table, btnWrap);

  return component;
};

export default Table;
