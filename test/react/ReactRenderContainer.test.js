import React from 'react';
import { ReactRenderContainer } from '../../src/react/ReactRenderContainer';

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

  test('getPropsOf', () => {
    const container = new ReactRenderContainer(
      (
        <div>
          <TestComponent title="fixed" text="one" />
        </div>
      )
    );

    expect(container.getPropsOf(TestComponent)).toEqual({
      title: 'fixed',
      text: 'one'
    });
    expect(() => container.getPropsOf(FunctionalComponent)).toThrow();

    const container2 = new ReactRenderContainer(
      (
        <div>
          <FunctionalComponent title="a" text="b" />
          <FunctionalComponent title="c" text="d" />
        </div>
      )
    );

    expect(() => container2.getPropsOf(FunctionalComponent)).toThrow();
  });

  test('allPropsOf', () => {
    const container = new ReactRenderContainer(
      (
        <div>
          <TestComponent title="fixed" text="one" />
        </div>
      )
    );

    expect(container.allPropsOf(TestComponent)).toEqual([
      {
        title: 'fixed',
        text: 'one'
      }
    ]);
    expect(container.allPropsOf(FunctionalComponent)).toEqual([]);

    const container2 = new ReactRenderContainer(
      (
        <div>
          <FunctionalComponent title="a" text="b" />
          <FunctionalComponent title="c" text="d" />
        </div>
      )
    );

    expect(container2.allPropsOf(FunctionalComponent)).toEqual([
      { title: 'a', text: 'b' },
      { title: 'c', text: 'd' }
    ]);
  });

  test('countRendersOf', () => {
    const container = new ReactRenderContainer(
      (
        <div>
          <TestComponent title="fixed" text="one" />
        </div>
      )
    );

    expect(container.countRendersOf(TestComponent)).toBe(1);
    expect(container.countRendersOf(FunctionalComponent)).toBe(0);

    const container2 = new ReactRenderContainer(
      (
        <div>
          <FunctionalComponent title="a" text="b" />
          <FunctionalComponent title="c" text="d" />
        </div>
      )
    );

    expect(container2.countRendersOf(FunctionalComponent)).toBe(2);
  });
});
