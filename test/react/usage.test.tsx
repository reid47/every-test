import * as React from 'react';
import '../../src/jest/add-matchers';
import { render, cleanup } from '../../src/react';

interface TestComponentProps {
  title: string;
  subtitle: string;
}

describe('React usage', () => {
  afterEach(cleanup);

  test('rendering a simple button', () => {
    const onClick = jest.fn();
    const wrapper = render(<button onClick={onClick}>click me</button>);

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

    const wrapper = render(
      <div>
        <input onChange={onChange} />
      </div>
    );

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

    const wrapper = render(
      <div>
        <textarea onChange={onChange} />
      </div>
    );

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

  test('rendering a functional component', () => {
    function Simple(props) {
      return (
        <div>
          <span id="title">{props.title}</span>
          <span id="subtitle">{props.subtitle}</span>
        </div>
      );
    }

    const wrapper = render(<Simple title="a" subtitle="b" />);

    expect(wrapper.get('#title')).toHaveText('a');
    expect(wrapper.get('#subtitle')).toHaveText('b');

    wrapper.setProps({ subtitle: 'c' });
    expect(wrapper.get('#title')).toHaveText('a');
    expect(wrapper.get('#subtitle')).toHaveText('c');
  });

  test('rendering a class component', () => {
    class Simple extends React.Component<TestComponentProps> {
      render() {
        return (
          <div>
            <span id="title">{this.props.title}</span>
            <span id="subtitle">{this.props.subtitle}</span>
          </div>
        );
      }
    }

    const wrapper = render(<Simple title="a" subtitle="b" />);

    expect(wrapper.get('#title')).toHaveText('a');
    expect(wrapper.get('#subtitle')).toHaveText('b');

    wrapper.setProps({ subtitle: 'c' });
    expect(wrapper.get('#title')).toHaveText('a');
    expect(wrapper.get('#subtitle')).toHaveText('c');
  });
});
