import { RenderContainer } from '../RenderContainer';

const activeContainers: RenderContainer[] = [];

/**
 * Renders a DOM element and returns a render container wrapping
 * that element.
 *
 * @param element DOM node or HTML string representing DOM node
 * @param options Render options
 */
export const render = (element: HTMLElement | string, options = {}): RenderContainer => {
  const container = new RenderContainer(options);

  if (typeof element === 'string') {
    container.domNode.innerHTML = element;
  } else {
    container.domNode.appendChild(element);
  }

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
