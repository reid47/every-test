import { formatValue } from './common';

export default function toHaveValue(received, expectedValue) {
  const actualValue = received.value;
  const pass = actualValue === expectedValue;
  const message = pass
    ? `Expected element not to have value ${formatValue(expectedValue)}.`
    : `Expected element to have value ${formatValue(
        expectedValue
      )}, but actual value was ${formatValue(actualValue)}.`;

  return { pass, message };
}
