import { getAllWinner, getCarApi, IWinnerParams } from '../api';
import CarIcon from '../components/CarIcon';

const Table = () => {
  const table = document.createElement('table');
  table.className = 'table';

  const head = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

  const tHead = document.createElement('thead');
  const tHeadTitles = head.map((el) => {
    const td = document.createElement('td');
    td.textContent = el;
    return td;
  });
  const tr = document.createElement('tr');
  tr.append(...tHeadTitles);
  tHead.append(tr);

  const tBody = document.createElement('tbody');

  const showWinners = async () => {
    const dataWinners = await getAllWinner({});
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

  return table;
};

export default Table;
