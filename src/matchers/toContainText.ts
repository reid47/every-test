import { formatValue } from './common';

export function toContainText(received, expectedText) {
  const actualText = received.textContent;

  const pass =
    typeof expectedText.test === 'function'
      ? expectedText.test(actualText)
      : actualText.indexOf(expectedText) > -1;

  const message = pass
    ? `Expected element not to contain text ${formatValue(expectedText)}.`
    : `Expected element to contain text ${formatValue(
        expectedText
      )}, but actual text was ${formatValue(actualText)}.`;

  return { pass, message };
}
