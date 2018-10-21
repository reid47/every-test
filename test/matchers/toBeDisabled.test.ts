import { toBeDisabled } from '../../src/matchers/toBeDisabled';

describe('toBeDisabled', () => {
  test('passing', () => {
    const input = document.createElement('input');
    input.disabled = true;

    const result = toBeDisabled(input);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const input = document.createElement('input');
    input.disabled = false;

    const result = toBeDisabled(input);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
