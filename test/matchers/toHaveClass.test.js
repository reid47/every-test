import toHaveClass from '../../src/matchers/toHaveClass';

describe('toHaveClass', () => {
  test('passing (single class)', () => {
    const el = document.createElement('div');
    el.classList.add('hello');

    const result = toHaveClass(el, 'hello');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('passing (multiple classes)', () => {
    const el = document.createElement('div');
    el.classList.add('world');
    el.classList.add('hello');

    const result = toHaveClass(el, 'hello', 'world');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (no classes, one expected)', () => {
    const el = document.createElement('div');

    const result = toHaveClass(el, 'hello');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (no classes, multiple expected)', () => {
    const el = document.createElement('div');

    const result = toHaveClass(el, 'hello', 'world');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (some classes, some of expected)', () => {
    const el = document.createElement('div');
    el.classList.add('hello');

    const result = toHaveClass(el, 'hello', 'world');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (some classes, none of expected)', () => {
    const el = document.createElement('div');
    el.classList.add('something');
    el.classList.add('else');

    const result = toHaveClass(el, 'hello', 'world');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
