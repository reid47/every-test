import React from 'react';
import ReactDOM from 'react-dom';
import { RenderContainer } from '../render-container';

export class ReactRenderContainer extends RenderContainer {
  constructor(element, options) {
    super(options);
    this.element = element;
    this.shallowTypes = new Set(this.options.shallowTypes || []);
  }

  mount() {
    super.mount();
    ReactDOM.render(this.element, this.domNode);
  }

  update(newProps) {
    this.element = React.cloneElement(this.element, newProps || {});
    ReactDOM.render(this.element, this.domNode);
  }

  unmount() {
    if (!this.mounted) return;
    super.unmount();
    ReactDOM.unmountComponentAtNode(this.domNode);
  }
}
