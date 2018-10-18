import React from 'react';
import { ReactRenderContainer } from '../../src/react/react-render-container';

class TestComponent extends React.Component {
  render() {
    return (
      <div id="test-component">
        <span>{this.props.title}</span>
        <button>{this.props.text}</button>
      </div>
    );
  }
}

function FunctionalComponent(props) {
  return (
    <div id="func-component">
      <span>{props.title}</span>
      <button>{props.text}</button>
    </div>
  );
}

describe('ReactRenderContainer', () => {
  test('mount/update of class component', () => {
    const element = <TestComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('one');

    container.update({ text: 'two' });
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('two');

    container.update();
    container.update({});
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('two');
  });

  test('mount/unmount of class component', () => {
    const element = <TestComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect(node.querySelector('#test-component')).toBeTruthy();

    container.unmount();
    expect(node.querySelector('#test-component')).toBeFalsy();

    container.unmount();
    expect(node.querySelector('#test-component')).toBeFalsy();
  });

  test('mount/update of functional component', () => {
    const element = <FunctionalComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('one');

    container.update({ text: 'two' });
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('two');

    container.update();
    container.update({});
    expect(node.querySelector('span').textContent).toBe('fixed');
    expect(node.querySelector('button').textContent).toBe('two');
  });

  test('mount/unmount of functional component', () => {
    const element = <FunctionalComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect(node.querySelector('#func-component')).toBeTruthy();

    container.unmount();
    expect(node.querySelector('#func-component')).toBeFalsy();

    container.unmount();
    expect(node.querySelector('#func-component')).toBeFalsy();
  });
});
