import React from 'react';
import ReactDOM from 'react-dom';
import createFindHelpers from './find-helpers';
import createEventHelpers from './event-helpers';
import createReactHelpers from './react-helpers';
import { documentNotAvailable } from './errors';

const containers = [];

export const cleanup = () => {
  while (containers.length) {
    const node = containers[containers.length - 1];
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
    containers.pop();
  }
};

const cloneElementWithStubs = (element, shallowTypes) => {
  if (shallowTypes.has(element.type)) return null;

  return React.cloneElement(element, {
    children: React.Children.map(element.props.children, child => {
      return cloneElementWithStubs(child, shallowTypes);
    })
  });
};

export const render = (element, options = {}) => {
  if (typeof document !== 'object' || typeof document.createElement !== 'function') {
    throw documentNotAvailable();
  }

  const domNode = document.createElement('div');
  document.body.appendChild(domNode);

  const renderedElement =
    options.shallow && options.shallow.length
      ? cloneElementWithStubs(element, new Set(options.shallow))
      : element;

  ReactDOM.render(renderedElement, domNode);
  containers.push(domNode);

  const findHelpers = createFindHelpers(domNode);
  const eventHelpers = createEventHelpers(findHelpers);
  const reactHelpers = createReactHelpers(element);

  return {
    ...findHelpers,
    ...eventHelpers,
    ...reactHelpers,
    unmount: () => ReactDOM.unmountComponentAtNode(domNode),
    print: () => console.log(domNode.outerHTML)
  };
};
