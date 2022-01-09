const BASE_URL = 'http://127.0.0.1:3000/';
interface ICreateParams {
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

export const getCarApi = async () => {
  const response = await fetch(`${BASE_URL}garage`);
  const data = await response.json();
};

export const updateCarApi = async () => {};
