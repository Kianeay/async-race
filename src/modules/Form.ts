import { createCarApi, getCarApi, updateCarApi } from '../api';
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

  const setInputName = (value: string) => {
    carState.name = value;
  };

  const setInputColor = (value: string) => {
    carState.color = value;
  };

  const createCarWrap = document.createElement('div');
  createCarWrap.className = 'form__wrapper';

  const updateCarWrap = document.createElement('div');
  updateCarWrap.className = 'form__wrapper';

  const btnCarWrap = document.createElement('div');
  btnCarWrap.className = 'form__wrapper';

  const createInput = Input({ onChange: setInputName });
  const createColorSelect = ColorSelect({ onChange: setInputColor });

  const createCar = async () => {
    if (createInput.value.trim()) {
      await createCarApi(carState);
      createDispatchEvent('app:garage:updateCarsList');
      createInput.value = '';
    }
  };

  const generateCars = () => {
    for (let i = 0; i < 100; i += 1) {
      const car = createRandomCar();
      createCarApi(car);
    }
    createDispatchEvent('app:garage:updateCarsList');
  };
  const createButton = Button({ onClick: createCar, title: 'create' });

  createCarWrap.append(createInput, createColorSelect, createButton);

  const updateInput = Input({
    onChange: (value: string) => {
      carState.name = value;
    },
  });

  const updateSelect = ColorSelect({
    onChange: (value: string) => {
      carState.color = value;
    },
  });

  const updateCar = async () => {
    await updateCarApi(
      JSON.parse(localStorage.getItem('currentCarId')),
      carState,
    );
    createDispatchEvent('app:garage:updateCarsList');
    updateInput.value = '';
    updateSelect.value = '#000';
    // eslint-disable-next-line operator-linebreak
    (updateCarWrap.querySelector('.button') as HTMLButtonElement).disabled =
      true;
  };

  const updateBtn = Button({ onClick: updateCar, title: 'update' });
  updateBtn.disabled = true;

  updateCarWrap.append(updateInput, updateSelect, updateBtn);

  window.addEventListener('app:garage:selectCar', async () => {
    const { name, color } = await getCarApi(
      JSON.parse(localStorage.getItem('currentCarId')),
    );
    updateInput.value = name;
    updateSelect.value = color;
    carState.name = name;
    carState.color = color;
    updateBtn.disabled = false;
  });

  btnCarWrap.append(
    Button({
      onClick: () => {
        createDispatchEvent('app:garage:race');
      },
      title: 'race',
    }),
    Button({
      onClick: () => {
        createDispatchEvent('app:garage:resetRace');
      },
      title: 'reset',
    }),
    Button({ onClick: generateCars, title: 'generate cars' }),
  );

  component.append(createCarWrap, updateCarWrap, btnCarWrap);

  return component;
};

export default Form;
