import toHaveText from '../../src/matchers/toHaveText';

describe('toHaveText', () => {
  test('passing', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);

    const result = toHaveText(el, 'hello');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);

    const result = toHaveText(el, 'something else');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
