const formatReceived = received => {
  if (received === undefined) return 'undefined';
  if (received === null) return 'null';
  if (received instanceof HTMLElement) return received.outerHTML;
  return JSON.stringify(received);
};

export const adaptMatcherResult = ({ matcherName, pass, message, received }) => {
  const messageString = [
    `expect(${formatReceived(received)})${pass ? '.not' : ''}.${matcherName}(...)`,
    ' ',
    message || 'Expectation failed.'
  ].join('\n');

  // This makes the result work both for Jest (which wants message to
  // be a function) and Jasmine (which wants message to be a string)
  const messageFunc = () => messageString;
  messageFunc.toString = () => messageString;

  return { pass, message: messageFunc };
};

export const formatValue = value => {
  return JSON.stringify(value, null, 2);
};
