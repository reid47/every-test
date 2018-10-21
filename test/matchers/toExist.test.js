import toExist from '../../src/matchers/toExist';

describe('toExist', () => {
  test('passing', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const result = toExist(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (falsy)', () => {
    const el = null;

    const result = toExist(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (not an HTML element)', () => {
    const el = 47;

    const result = toExist(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing (not in document)', () => {
    const el = document.createElement('div');

    const result = toExist(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
