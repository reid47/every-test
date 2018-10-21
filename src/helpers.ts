import * as prettyFormat from 'pretty-format';

const { DOMElement, DOMCollection } = prettyFormat.plugins as any;

export const formatDomNode = (node, printOptions = {}) => {
  return prettyFormat(node, {
    plugins: [DOMElement, DOMCollection],
    maxDepth: 24,
    ...printOptions
  });
};
