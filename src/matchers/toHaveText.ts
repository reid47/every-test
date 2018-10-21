import { formatValue } from './common';

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toHaveText: (expectedText: string) => any;
//     }
//   }
// }

export default function toHaveText(received, expectedText) {
  const actualText = received.textContent;
  const pass = actualText === expectedText;

  const message = pass
    ? `Expected element not to have text ${formatValue(expectedText)}.`
    : `Expected element to have text ${formatValue(
        expectedText
      )}, but actual text was ${formatValue(actualText)}.`;

  return { pass, message };
}
