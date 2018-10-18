export default function createEventHelpers({ findOnly }) {
  return {
    blurOn: selector => {
      findOnly(selector, 'blurOn').blur();
    },

    changeValueOf: (selector, newValue, options = {}) => {
      const node = findOnly(selector, 'changeValue');
      node.value = newValue;
      node.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
          ...options
        })
      );
    },

    clickOn: selector => {
      findOnly(selector, 'clickOn').click();
    },

    doubleClickOn: (selector, options = {}) => {
      findOnly(selector, 'doubleClickOn').dispatchEvent(
        new MouseEvent({
          bubbles: true,
          cancelable: true,
          ...options
        })
      );
    },

    focusOn: selector => {
      findOnly(selector, 'focusOn').focus();
    }
  };
}
