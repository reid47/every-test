import { formatValue } from './common';

export function toHaveText(received, expectedText) {
  const actualText = received.textContent;
  const pass = actualText === expectedText;

  const message = pass
    ? `Expected element not to have text ${formatValue(expectedText)}.`
    : `Expected element to have text ${formatValue(
        expectedText
      )}, but actual text was ${formatValue(actualText)}.`;

  return { pass, message };
}
