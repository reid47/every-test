import { ReactRenderContainer } from './ReactRenderContainer';

const activeContainers: ReactRenderContainer[] = [];

// const cloneElementWithStubs = (element, shallowTypes) => {
//   if (shallowTypes.has(element.type)) return null;

//   return React.cloneElement(element, {
//     children: React.Children.map(element.props.children, child => {
//       return cloneElementWithStubs(child, shallowTypes);
//     })
//   });
// };

/**
 * Renders a React element to the DOM and returns a render container
 * wrapping that element.
 *
 * @param element React element to render
 * @param options Render options
 */
export const render = (element: JSX.Element, options = {}): ReactRenderContainer => {
  const container = new ReactRenderContainer(element, options);

  activeContainers.push(container);
  container.mount();

  return container;
};

/**
 * Unmounts all remaining render containers from the DOM.
 */
export const cleanup = () => {
  while (activeContainers.length) {
    const container = activeContainers.pop();
    container && container.unmount();
  }
};
