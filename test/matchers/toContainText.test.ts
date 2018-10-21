import toContainText from '../../src/matchers/toContainText';

describe('toContainText', () => {
  test('passing (substring)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);

    const result = toContainText(el, 'h');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('passing (regex)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);

    const result = toContainText(el, /ell/);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);

    const result = toContainText(el, 'hello!');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
