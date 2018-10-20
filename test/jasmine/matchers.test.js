import { matchers } from '../../src/jasmine';

describe('Jasmine matchers', () => {
  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  test('toHaveAttr', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'hello');

    expect(() => expect(div).toHaveAttr('id', 'hello')).not.toThrow();
    expect(() => expect(div).not.toHaveAttr('id', 'wow')).not.toThrow();
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
