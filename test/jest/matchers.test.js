import { matchers } from '../../src/jest';

describe('Jest matchers', () => {
  beforeAll(() => {
    expect.extend(matchers);
  });

  test('toHaveAttribute', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'hello');

    expect(div).toHaveAttribute('id', 'hello');
    expect(div).not.toHaveAttribute('id', 'wow');
    expect(() => expect(div).toHaveAttribute('id', 'wow')).toThrowErrorMatchingSnapshot();
    expect(() => expect(div).not.toHaveAttribute('id', 'hello')).toThrowErrorMatchingSnapshot();
  });

  test('toHaveValue', () => {
    const input = document.createElement('input');
    input.value = 47;

    expect(input).toHaveValue('47');
    expect(input).not.toHaveValue('48');
    expect(input).not.toHaveValue(47);
    expect(() => expect(input).toHaveValue(47)).toThrowErrorMatchingSnapshot();
    expect(() => expect(input).not.toHaveValue('47')).toThrowErrorMatchingSnapshot();
  });
});
