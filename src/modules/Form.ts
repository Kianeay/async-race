import { createCarApi, getCarApi } from '../api';
import Button from '../components/Button';
import ColorSelect from '../components/ColorSelect';
import Input from '../components/Input';
import createRandomCar from '../utils/create-random-car';
import createDispatchEvent from '../utils/dispatch-event';

const Form = () => {
  const carState = {
    name: 'Tesla',
    color: '#000',
  };

  const component = document.createElement('div');
  component.className = 'form';

  const inputName = (value: string) => {
    carState.name = value;
  };

  const inputColor = (value: string) => {
    carState.color = value;
  };

  const createCar = async () => {
    await createCarApi(carState);
    // await getCarApi();
    createDispatchEvent('app:updateCarsList');
  };

  const generateCars = () => {
    for (let i = 0; i < 100; i += 1) {
      const car = createRandomCar();
      createCarApi(car);
    }
    createDispatchEvent('app:updateCarsList');
  };

  const createCarWrap = document.createElement('div');
  createCarWrap.className = 'form__wrapper';

  const updateCarWrap = document.createElement('div');
  updateCarWrap.className = 'form__wrapper';

  const btnCarWrap = document.createElement('div');
  btnCarWrap.className = 'form__wrapper';

  createCarWrap.append(
    Input({ onChange: inputName }),
    ColorSelect({ onChange: inputColor }),
    Button({ onClick: createCar, title: 'create' }),
  );
  updateCarWrap.append(
    Input({ onChange: createCar }),
    ColorSelect({ onChange: createCar }),
    Button({ onClick: createCar, title: 'update' }),
  );
  btnCarWrap.append(
    Button({ onClick: createCar, title: 'race' }),
    Button({ onClick: createCar, title: 'reset' }),
    Button({ onClick: generateCars, title: 'generate cars' }),
  );

  component.append(createCarWrap, updateCarWrap, btnCarWrap);

  return component;
};

export default Form;
