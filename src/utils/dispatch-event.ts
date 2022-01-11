const createDispatchEvent = (value: string) => {
  window.dispatchEvent(new Event(value));
};
export default createDispatchEvent;
