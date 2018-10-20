import { matchers } from '../../src/jest';

describe('Jest matchers', () => {
  beforeAll(() => {
    expect.extend(matchers);
  });

  test('toHaveAttr', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'hello');

    expect(div).toHaveAttr('id', 'hello');
    expect(div).not.toHaveAttr('id', 'wow');
    expect(() => expect(div).toHaveAttr('id', 'wow')).toThrowErrorMatchingSnapshot();
    expect(() => expect(div).not.toHaveAttr('id', 'hello')).toThrowErrorMatchingSnapshot();
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
