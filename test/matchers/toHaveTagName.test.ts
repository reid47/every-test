import toHaveTagName from '../../src/matchers/toHaveTagName';

describe('toHaveTagName', () => {
  test('passing', () => {
    const el = document.createElement('div');

    const result = toHaveTagName(el, 'div');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');

    const result = toHaveTagName(el, 'button');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });
});
