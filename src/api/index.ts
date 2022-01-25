/* eslint-disable no-useless-catch */
import { ICar } from '../components/Car';

const BASE_URL = 'http://127.0.0.1:3000/';

export interface ICreateParams {
  name: string;
  color: string;
}

export interface IWinnerParams {
  id?: number;
  wins: number;
  time: number;
}

interface ICarVelocity {
  distance: number;
  velocity: number;
}

export interface IGetAllWinners {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export const createCarApi = async (params: ICreateParams) => {
  const request = JSON.stringify(params);

  const data = await fetch(`${BASE_URL}garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
};

export const getCarsListApi = async (page?: number, limit?: number) => {
  const response = await fetch(
    `${BASE_URL}garage?${page ? `_page=${page}` : ''}${
      limit ? `&_limit=${limit}` : ''
    }`,
  );
  const data: ICar[] = await response.json();
  return data;
};

export const removeCarApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}garage/${id}`, {
    method: 'DELETE',
  });
};

export const updateCarApi = async (id: number, params: ICreateParams) => {
  const response = await fetch(`${BASE_URL}garage/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(params),
  });
};

export const getCarApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}garage/${id}`);
  const data: ICar = await response.json();
  return data;
};

export const getCarVelocity = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const data: ICarVelocity = await response.json();
  const { velocity } = data;
  return velocity;
};

export const driveCar = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    return false;
  }
  return true;
};

export const createWinner = async (params: IWinnerParams) => {
  const response = await fetch(`${BASE_URL}winners/`, {
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
  const response = await fetch(`${BASE_URL}winners/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(params),
  });
};

export const removeWinner = async (id: number) => {
  const response = await fetch(`${BASE_URL}winners/${id}`, {
    method: 'DELETE',
  });
};
