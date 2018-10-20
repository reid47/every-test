import { formatValue } from './common';

export default function toExist(received) {
  const isTruthy = !!received;
  const isHtmlElement = received instanceof HTMLElement;
  const isInDocument = document.contains(received);

  const pass = isTruthy && isHtmlElement && isInDocument;

  let message;
  if (pass) {
    message = 'Expected element not to exist in the DOM, but it did.';
  } else if (!isTruthy) {
    message = `Expected element to exist, but it did not.`;
  } else if (!isHtmlElement) {
    message = `Expected assertion to be made on a DOM element, but received ${formatValue(
      received
    )}.`;
  } else {
    message =
      'DOM element is not contained by document. Was this element rendered to the document?';
  }

  return { pass, message };
}
