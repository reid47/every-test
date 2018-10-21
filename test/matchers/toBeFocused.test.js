import toBeFocused from '../../src/matchers/toBeFocused';

describe('toBeFocused', () => {
  test('passing', () => {
    const el = document.createElement('input');
    el.focus();

    const result = toBeFocused(el);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('input');

    const result = toBeFocused(el);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
