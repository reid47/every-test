import React from 'react';
import { matchers } from '../../src/jest/index';
import { render, cleanup } from '../../src/react';

describe('React usage', () => {
  beforeAll(() => expect.extend(matchers));
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

  test('rendering a text input with label', () => {
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
    class Simple extends React.Component {
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
