import { incorrectNodeCount } from './errors';

export default function createFindHelpers(domNode) {
  const find = selector => domNode.querySelector(selector);

  const findAll = selector => Array.from(domNode.querySelectorAll(selector));

  const findOnly = (selector, helperName = 'findOnly') => {
    const nodes = domNode.querySelectorAll(selector);
    if (nodes.length !== 1) throw incorrectNodeCount(helperName, selector, nodes.length);
    return nodes[0];
  };

  const findAllByText = toMatch => {
    return [...domNode.querySelectorAll('*')].filter(node => {
      const text = node.textContent;
      if (typeof toMatch === 'string') return text === toMatch;
      if (toMatch instanceof RegExp) return toMatch.test(text);
    });
  };

  const findByText = toMatch => findAllByText(toMatch)[0] || null;

  const findOnlyByText = toMatch => {
    const nodes = findAllByText(toMatch);
    if (nodes.length !== 1) throw incorrectNodeCount('findOnlyByText', toMatch, nodes.length);
    return nodes[0];
  };

  return { find, findAll, findOnly, findByText, findAllByText, findOnlyByText };
}
