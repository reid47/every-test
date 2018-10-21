import toHaveAttribute from '../../src/matchers/toHaveAttribute';

describe('toHaveAttribute', () => {
  test('passing', () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'banner');
    el.setAttribute('data-hello', 'world');

    const result = toHaveAttribute(el, 'role', 'banner');
    expect(result.pass).toBeTruthy();
    expect(result.message).toMatchSnapshot();

    const result2 = toHaveAttribute(el, 'data-hello');
    expect(result2.pass).toBeTruthy();
    expect(result2.message).toMatchSnapshot();
  });

  test('failing', () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'banner');
    el.setAttribute('data-hello', 'world');

    const result = toHaveAttribute(el, 'role', 'button');
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();

    const result2 = toHaveAttribute(el, 'data-something-else');
    expect(result2.pass).toBeFalsy();
    expect(result2.message).toMatchSnapshot();
  });
});
