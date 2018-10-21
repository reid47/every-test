import toHaveValue from '../../src/matchers/toHaveValue';

describe('toHaveValue', () => {
  test('passing', () => {
    const el = document.createElement('input');
    el.value = 'hello';

    const result = toHaveValue(el, 'hello');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('input');
    el.value = 'hello';

    const result = toHaveValue(el, 'something else');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
