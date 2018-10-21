import toBeChecked from '../../src/matchers/toBeChecked';

describe('toBeChecked', () => {
  test('passing', () => {
    const input = document.createElement('input');
    input.checked = true;

    const result = toBeChecked(input);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const input = document.createElement('input');
    input.checked = false;

    const result = toBeChecked(input);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
