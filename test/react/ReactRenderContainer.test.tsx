import * as React from 'react';
import { ReactRenderContainer } from '../../src/react/ReactRenderContainer';

interface TestComponentProps {
  title: string;
  text: string;
}

class TestComponent extends React.Component<TestComponentProps> {
  render() {
    return (
      <div id="test-component">
        <span>{this.props.title}</span>
        <button>{this.props.text}</button>
      </div>
    );
  }
}

function FunctionalComponent(props: TestComponentProps) {
  return (
    <div id="func-component">
      <span>{props.title}</span>
      <button>{props.text}</button>
    </div>
  );
}

describe('ReactRenderContainer', () => {
  test('mount/setProps of class component', () => {
    const element = <TestComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('one');

    container.setProps({ text: 'two' });
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('two');

    container.setProps();
    container.setProps({});
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('two');
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

  test('mount/setProps of functional component', () => {
    const element = <FunctionalComponent title="fixed" text="one" />;
    const container = new ReactRenderContainer(element);
    const node = container.domNode;

    container.mount();
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('one');

    container.setProps({ text: 'two' });
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('two');

    container.setProps();
    container.setProps({});
    expect((node.querySelector('span') || ({} as any)).textContent).toBe('fixed');
    expect((node.querySelector('button') || ({} as any)).textContent).toBe('two');
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

  test('propsOf', () => {
    const container = new ReactRenderContainer(
      (
        <div>
          <TestComponent title="fixed" text="one" />
        </div>
      )
    );

    expect(container.propsOf(TestComponent)).toEqual({
      title: 'fixed',
      text: 'one'
    });
    expect(() => container.propsOf(FunctionalComponent)).toThrow();

    const container2 = new ReactRenderContainer(
      (
        <div>
          <FunctionalComponent title="a" text="b" />
          <FunctionalComponent title="c" text="d" />
        </div>
      )
    );

    expect(() => container2.propsOf(FunctionalComponent)).toThrow();
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
