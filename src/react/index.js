import { ReactRenderContainer } from './react-render-container';
import { documentNotAvailable } from '../errors';

const activeContainers = [];

// const cloneElementWithStubs = (element, shallowTypes) => {
//   if (shallowTypes.has(element.type)) return null;

//   return React.cloneElement(element, {
//     children: React.Children.map(element.props.children, child => {
//       return cloneElementWithStubs(child, shallowTypes);
//     })
//   });
// };

// const findPropsOfType = (element, type, props) => {
//   if (element.type === type) props.push(element.props);
//   React.Children.forEach(element.props.children, child => findPropsOfType(child, type, props));
// };

export const render = (element, options = {}) => {
  if (typeof document !== 'object' || typeof document.createElement !== 'function') {
    throw documentNotAvailable();
  }

  const container = new ReactRenderContainer(element, options);
  activeContainers.push(container);
  container.mount();

  return container;
};

export const cleanup = () => {
  while (activeContainers.length) {
    const container = activeContainers.pop();
    container.unmount();
  }
};
