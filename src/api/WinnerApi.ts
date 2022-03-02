const BASE_URL = 'http://127.0.0.1:3000/';

export interface IWinnerParams {
  id?: number;
  wins: number;
  time: number;
}

export interface IGetAllWinners {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export const createWinner = async (params: IWinnerParams) => {
  await fetch(`${BASE_URL}winners/`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(params),
  });
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${BASE_URL}winners/${id}`);
  const data = await response.json();

  return data;
};

export const getAllWinner = async ({
  page,
  limit,
  sort,
  order,
}: IGetAllWinners) => {
  const response = await fetch(
    `${BASE_URL}winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const data = await response.json();

  return data;
};

export const getAllWinnerCount = async () => {
  const response = await fetch(`${BASE_URL}winners`);
  const data = await response.json();

  return data;
};

export const updateWinner = async (id: number, params: IWinnerParams) => {
  await fetch(`${BASE_URL}winners/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(params),
  });
};

export const removeWinner = async (id: number) => {
  await fetch(`${BASE_URL}winners/${id}`, {
    method: 'DELETE',
  });
};
