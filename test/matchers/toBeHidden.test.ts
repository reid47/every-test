import { toBeHidden } from '../../src/matchers/toBeHidden';

describe('toBeHidden', () => {
  test('passing (hidden prop)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);
    el.hidden = true;

    const result = toBeHidden(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('passing (display: none)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);
    el.style.display = 'none';

    const result = toBeHidden(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('passing (zero-width)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);
    el.style.width = '0px';

    const result = toBeHidden(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('passing (zero-height)', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);
    el.style.height = '0px';

    const result = toBeHidden(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    const text = document.createTextNode('hello');
    el.appendChild(text);
    el.style.width = '10px';
    el.style.height = '10px';

    const result = toBeHidden(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
