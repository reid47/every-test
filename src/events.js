const inputProto = HTMLInputElement.prototype;
const textareaProto = HTMLTextAreaElement.prototype;
const inputValueSetter = Object.getOwnPropertyDescriptor(inputProto, 'value').set;
const textareaValueSetter = Object.getOwnPropertyDescriptor(textareaProto, 'value').set;

export const dispatch = (element, event) => {
  element.dispatchEvent(event);
};

export const dispatchChange = (element, newValue, options = {}) => {
  const event = new Event('input', { bubbles: true, ...options });

  switch (element.tagName.toLowerCase()) {
    case 'input': {
      inputValueSetter.call(element, newValue);
      break;
    }

    case 'textarea': {
      textareaValueSetter.call(element, newValue);
      break;
    }
  }

  element.dispatchEvent(event);
};
