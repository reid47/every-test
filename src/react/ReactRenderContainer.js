import { cloneElement, Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { RenderContainer } from '../RenderContainer';
import { noRendersFound, multipleRendersFound } from '../errors';

const findPropsOfType = (element, type, props) => {
  if (element.type === type) props.push(element.props);
  Children.forEach(element.props.children, child => findPropsOfType(child, type, props));
};

export class ReactRenderContainer extends RenderContainer {
  constructor(element, options) {
    super(options);
    this.element = element;
    this.shallowTypes = new Set(this.options.shallowTypes || []);
  }

  mount() {
    super.mount();
    render(this.element, this.domNode);
  }

  update(newProps) {
    this.element = cloneElement(this.element, newProps || {});
    render(this.element, this.domNode);
  }

  unmount() {
    if (!this.mounted) return;
    super.unmount();
    unmountComponentAtNode(this.domNode);
  }

  countRendersOf(componentType) {
    return this.allPropsOf(componentType).length;
  }

  getPropsOf(componentType) {
    const allProps = this.allPropsOf(componentType);
    if (!allProps.length) throw noRendersFound(componentType);
    if (allProps.length > 1) throw multipleRendersFound(componentType);
    return allProps[0];
  }

  allPropsOf(componentType) {
    const collectedProps = [];
    findPropsOfType(this.element, componentType, collectedProps);
    return collectedProps;
  }
}
