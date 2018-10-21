import * as prettyFormat from 'pretty-format';
import { RenderContainer } from './RenderContainer';

const { DOMElement, DOMCollection } = prettyFormat.plugins as any;

export function formatDomNode(node, printOptions = {}) {
  return prettyFormat(node, {
    plugins: [DOMElement, DOMCollection],
    maxDepth: 24,
    ...printOptions
  });
}

export function throwContainerError(methodName, message) {
  const error = new Error(message + '\n\nCurrent container DOM:\n\n' + this.toString());
  error.name = `${methodName}(...)`;
  error.stack = (error.stack || '')
    .split('\n')
    .filter(line => line.indexOf('throwContainerError') === -1)
    .join('\n');

  throw error;
}

export function getNodeInContainer(this: RenderContainer, selector: string, methodName: string) {
  const nodes = this.all(selector);

  if (nodes.length !== 1) {
    throwContainerError.call(
      this,
      methodName,
      `Expected to find exactly 1 element matching '${selector}', but found ${nodes.length}.`
    );
  }

  return nodes[0];
}
