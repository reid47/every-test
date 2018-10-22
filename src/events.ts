export const createKeyboardEvent = (type: string, eventInit: KeyboardEventInit): Event => {
  const eventOptions = { bubbles: true, cancelable: true, ...eventInit };
  if (typeof KeyboardEvent === 'undefined') return new Event(type, eventOptions);
  return new KeyboardEvent(type, eventOptions);
};

export const dispatch = (element: Element, event: Event): void => {
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
