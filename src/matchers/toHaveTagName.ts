import { formatValue } from './common';

export default function toHaveTagName(received, expectedTagName) {
  const actualTagName = received.tagName.toLowerCase();
  const pass = actualTagName === expectedTagName.toLowerCase();

  const message = pass
    ? `Expected element not to have tag name ${formatValue(expectedTagName)}.`
    : `Expected element to have tag name ${formatValue(
        expectedTagName
      )}, but actual tag name was ${formatValue(actualTagName)}.`;

  return { pass, message };
}
