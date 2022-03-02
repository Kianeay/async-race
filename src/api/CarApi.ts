import { ICar } from '../components/Cars/Car';

const BASE_URL = 'http://127.0.0.1:3000/';

export interface ICreateParams {
  name: string;
  color: string;
}

interface ICarVelocity {
  distance: number;
  velocity: number;
}

export const createCarApi = async (params: ICreateParams) => {
  const request = JSON.stringify(params);

  await fetch(`${BASE_URL}garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: request,
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
  await fetch(`${BASE_URL}garage/${id}`, {
    method: 'DELETE',
  });
};

export const updateCarApi = async (id: number, params: ICreateParams) => {
  await fetch(`${BASE_URL}garage/${id}`, {
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
