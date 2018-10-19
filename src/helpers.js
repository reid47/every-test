import prettyFormat from 'pretty-format';

const { DOMElement, DOMCollection } = prettyFormat.plugins;

export const formatDomNode = (node, printOptions) => {
  return prettyFormat(node, {
    plugins: [DOMElement, DOMCollection],
    maxDepth: 24,
    ...printOptions
  });
};
