import { formatValue } from './common';

export default function toHaveProp(received, property, value) {
  if (arguments.length < 3) {
    const pass = !!received[property];
    const message = pass
      ? `Expected element not to have property "${property}".`
      : `Expected element to have property "${property}".`;

    return { pass, message };
  }

  const actualValue = received[property];
  const pass = actualValue === value;
  const message = pass
    ? `Expected element not to have property "${property}" with value ${formatValue(value)}.`
    : `Expected element to have property "${property}" with value ${formatValue(
        value
      )}, but actual value was ${formatValue(actualValue)}.`;

  return { pass, message };
}
