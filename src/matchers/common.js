export const formatReceived = received => {
  if (received === undefined) return 'undefined';
  if (received === null) return 'null';
  if (received instanceof HTMLElement) return received.outerHTML;
  return JSON.stringify(received);
};

export const formatValue = value => {
  return JSON.stringify(value, null, 2);
};
