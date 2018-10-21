import { formatValue } from './common';

export default function toHaveTagName(received, expectedTagName) {
  const actualTagName = received.tagName;
  const pass = actualTagName.toLowerCase() === expectedTagName.toLowerCase();

  const message = pass
    ? `Expected element not to have tag name ${formatValue(expectedTagName)}.`
    : `Expected element to have text ${formatValue(
        expectedTagName
      )}, but actual text was ${formatValue(actualTagName)}.`;

  return { pass, message };
}
