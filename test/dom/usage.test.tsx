import '../../src/jest/add-matchers';
import { render, cleanup } from '../../src/dom';

describe('Vanilla DOM usage', () => {
  afterEach(cleanup);

  test('rendering a simple button', () => {
    const onClick = jest.fn();

    const btn = document.createElement('button');
    btn.addEventListener('click', onClick);
    btn.appendChild(document.createTextNode('click me'));
    const wrapper = render(btn);

    expect(wrapper.get('button')).toHaveText('click me');
    expect(wrapper.get('button')).toContainText('click');
    expect(wrapper.get('button')).toContainText(/click/);

    expect(wrapper.get('button')).toHaveTagName('button');
    expect(wrapper.get('button')).toHaveTagName('Button');
    expect(wrapper.get('button')).toHaveTagName('BUTTON');

    wrapper.clickOn('button');
    expect(onClick).toHaveBeenCalled();
  });

  test('rendering a text input', () => {
    const onChange = jest.fn();

    const input = document.createElement('input');
    input.addEventListener('input', onChange);
    const wrapper = render(input);

    expect(wrapper.get('input')).toHaveValue('');
    wrapper.changeValueOf('input', 'wow');
    expect(wrapper.get('input')).toHaveValue('wow');
    expect(onChange).toHaveBeenCalled();

    expect(wrapper.get('input')).not.toBeFocused();
    wrapper.focusOn('input');
    expect(wrapper.get('input')).toBeFocused();
    wrapper.blurOn('input');
    expect(wrapper.get('input')).not.toBeFocused();
  });

  test('rendering a textarea', () => {
    const onChange = jest.fn();

    const textarea = document.createElement('textarea');
    textarea.addEventListener('input', onChange);
    const wrapper = render(textarea);

    expect(wrapper.get('textarea')).toHaveValue('');
    wrapper.changeValueOf('textarea', 'wow');
    expect(wrapper.get('textarea')).toHaveValue('wow');
    expect(onChange).toHaveBeenCalled();

    expect(wrapper.get('textarea')).not.toBeFocused();
    wrapper.focusOn('textarea');
    expect(wrapper.get('textarea')).toBeFocused();
    wrapper.blurOn('textarea');
    expect(wrapper.get('textarea')).not.toBeFocused();
  });

  test('keydown handling', () => {
    const onKeyDown = jest.fn();

    const input = document.createElement('input');
    input.addEventListener('keydown', onKeyDown);
    const wrapper = render(input);

    wrapper.keyDownOn('input', { key: 'Enter' });
    const enterKeyDown = onKeyDown.mock.calls[0][0];
    expect(enterKeyDown.type).toBe('keydown');
    expect(enterKeyDown.bubbles).toBe(true);
    expect(enterKeyDown.cancelable).toBe(true);
    expect(enterKeyDown.key).toBe('Enter');
    expect(enterKeyDown.shiftKey).toBe(false);

    wrapper.keyDownOn('input', { key: 'Tab', shiftKey: true });
    const shiftTabKeyDown = onKeyDown.mock.calls[1][0];
    expect(shiftTabKeyDown.type).toBe('keydown');
    expect(shiftTabKeyDown.bubbles).toBe(true);
    expect(shiftTabKeyDown.cancelable).toBe(true);
    expect(shiftTabKeyDown.key).toBe('Tab');
    expect(shiftTabKeyDown.shiftKey).toBe(true);
  });

  test('keypress handling', () => {
    const onKeyPress = jest.fn();

    const input = document.createElement('input');
    input.addEventListener('keypress', onKeyPress);
    const wrapper = render(input);

    wrapper.keyPressOn('input', { key: 'a' });
    const enterKeyPress = onKeyPress.mock.calls[0][0];
    expect(enterKeyPress.type).toBe('keypress');
    expect(enterKeyPress.bubbles).toBe(true);
    expect(enterKeyPress.cancelable).toBe(true);
    expect(enterKeyPress.key).toBe('a');
    expect(enterKeyPress.shiftKey).toBe(false);

    wrapper.keyPressOn('input', { key: 'B', shiftKey: true });
    const shiftTabKeyPress = onKeyPress.mock.calls[1][0];
    expect(shiftTabKeyPress.type).toBe('keypress');
    expect(shiftTabKeyPress.bubbles).toBe(true);
    expect(shiftTabKeyPress.cancelable).toBe(true);
    expect(shiftTabKeyPress.key).toBe('B');
    expect(shiftTabKeyPress.shiftKey).toBe(true);
  });

  test('keyup handling', () => {
    const onKeyUp = jest.fn();

    const input = document.createElement('input');
    input.addEventListener('keyup', onKeyUp);
    const wrapper = render(input);

    wrapper.keyUpOn('input', { key: 'Enter' });
    const enterKeyUp = onKeyUp.mock.calls[0][0];
    expect(enterKeyUp.type).toBe('keyup');
    expect(enterKeyUp.bubbles).toBe(true);
    expect(enterKeyUp.cancelable).toBe(true);
    expect(enterKeyUp.key).toBe('Enter');
    expect(enterKeyUp.shiftKey).toBe(false);

    wrapper.keyUpOn('input', { key: 'Tab', shiftKey: true });
    const shiftTabKeyUp = onKeyUp.mock.calls[1][0];
    expect(shiftTabKeyUp.type).toBe('keyup');
    expect(shiftTabKeyUp.bubbles).toBe(true);
    expect(shiftTabKeyUp.cancelable).toBe(true);
    expect(shiftTabKeyUp.key).toBe('Tab');
    expect(shiftTabKeyUp.shiftKey).toBe(true);
  });
});
