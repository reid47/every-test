import toHaveProperty from '../../src/matchers/toHaveProperty';

describe('toHaveProperty', () => {
  test('passing', () => {
    const el = document.createElement('div');
    el.something = 47;

    const result = toHaveProperty(el, 'something', 47);
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    el.something = 48;

    const result = toHaveProperty(el, 'something', 47);
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();

    const result2 = toHaveProperty(el, 'notPresent');
    expect(result2.pass).toBeFalsy();
    expect(result2.message).toMatchSnapshot();
  });
});
