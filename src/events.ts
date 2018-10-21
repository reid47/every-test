export const dispatch = (element, event) => {
  element.dispatchEvent(event);
};

export const dispatchChange = (element, newValue, options = {}) => {
  const { set: valueSetter }: PropertyDescriptor =
    Object.getOwnPropertyDescriptor(element, 'value') || {};

  const { set: prototypeValueSetter }: PropertyDescriptor =
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value') || {};

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, newValue);
  } else if (valueSetter) {
    valueSetter.call(element, newValue);
  }

  const event = new Event('input', { bubbles: true, ...options });
  element.dispatchEvent(event);
};
