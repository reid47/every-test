import { formatValue } from './common';

export function toHaveAttribute(received: HTMLElement, attribute: string, value?: string) {
  if (arguments.length < 3) {
    const pass = !!received.getAttribute(attribute);
    const message = pass
      ? `Expected element not to have attribute "${attribute}".`
      : `Expected element to have attribute "${attribute}".`;

    return { pass, message };
  }

  const actualValue = received.getAttribute(attribute);
  const pass = actualValue === value;
  const message = pass
    ? `Expected element not to have attribute "${attribute}" with value ${formatValue(value)}.`
    : `Expected element to have attribute "${attribute}" with value ${formatValue(
        value
      )}, but actual value was ${formatValue(actualValue)}.`;

  return { pass, message };
}
