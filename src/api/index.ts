/* eslint-disable no-useless-catch */
import { ICar } from '../components/Car';

const BASE_URL = 'http://127.0.0.1:3000/';

export interface ICreateParams {
  name: string;
  color: string;
}

export const createCarApi = async (params: ICreateParams) => {
  const request = JSON.stringify(params);

  const data = await fetch(`${BASE_URL}garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
};

export const getCarsListApi = async () => {
  const response = await fetch(`${BASE_URL}garage`);
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
  const data: ICar = await response.json();
};

export const driveCar = (id: number, status: string) => {
  try {
    const response = fetch(`${BASE_URL}engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
  } catch (err) {
    throw err;
  }
};
