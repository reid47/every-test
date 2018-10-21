import { cloneElement, Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { RenderContainer } from '../RenderContainer';
import { noRendersFound, multipleRendersFound } from '../errors';

const findPropsOfType = (element, type, props) => {
  if (element.type === type) props.push(element.props);
  Children.forEach(element.props.children, child => findPropsOfType(child, type, props));
};

/**
 * A container that represents a rendered instance of a React element
 * and its corresponding DOM node.
 */
export class ReactRenderContainer extends RenderContainer {
  element: JSX.Element;

  /**
   * Creates a new React render container.
   *
   * @param element React element to render
   * @param options Render options
   */
  constructor(element: JSX.Element, options = {}) {
    super(options);
    this.element = element;
  }

  /**
   * Returns an array of all sets of props with which a given component
   * was rendered.
   *
   * @param componentType Constructor of component to search for
   */
  allPropsOf(componentType): object[] {
    const collectedProps: object[] = [];
    findPropsOfType(this.element, componentType, collectedProps);
    return collectedProps;
  }

  /**
   * Counts the number of times an instance of a component appears in the
   * rendered component tree.
   *
   * @param componentType Constructor of component to search for
   */
  countRendersOf(componentType: Function): number {
    return this.allPropsOf(componentType).length;
  }

  /**
   * Mounts the element to the DOM. Performs the initial render.
   */
  mount(): void {
    super.mount();
    render(this.element, this.domNode);
  }

  /**
   * Returns the props with which a given component was rendered. Throws an
   * error if the component was not rendered or was rendered more than once.
   *
   * @param componentType Constructor of component to search for
   */
  propsOf(componentType: Function): object {
    const allProps = this.allPropsOf(componentType);
    if (!allProps.length) throw noRendersFound(componentType);
    if (allProps.length > 1) throw multipleRendersFound(componentType);
    return allProps[0];
  }

  /**
   * Re-renders root React component with new props merged into old
   * props.
   *
   * @param newProps New props to merge into old props
   */
  setProps(newProps: object = {}): void {
    this.element = cloneElement(this.element, newProps);
    render(this.element, this.domNode);
  }

  /**
   * Unmounts the React component and removes the container element
   * from the DOM.
   */
  unmount(): void {
    if (!this.mounted) return;
    super.unmount();
    unmountComponentAtNode(this.domNode);
  }
}
