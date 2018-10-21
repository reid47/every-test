import toBeEmpty from '../../src/matchers/toBeEmpty';

describe('toBeEmpty', () => {
  test('passing', () => {
    const el = document.createElement('div');
    el.innerHTML = '';

    const result = toBeEmpty(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    el.innerHTML = '<div></div>';

    const result = toBeEmpty(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
