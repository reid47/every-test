import { formatValue } from '../../src/matchers/common';

test('formatValue', () => {
  expect(formatValue(null)).toBe('null');
  expect(formatValue(undefined)).toBe('undefined');
  expect(formatValue(47)).toBe('47');
  expect(formatValue('wow')).toBe('"wow"');
  expect(formatValue(document.createElement('div'))).toBe('<div></div>');
  const circular = { a: 1 };
  circular.b = circular;
  expect(formatValue(circular)).toBe('[object Object]');
});
