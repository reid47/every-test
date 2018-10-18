import { incorrectNodeCount } from './errors';

export class RenderContainer {
  constructor(options) {
    this.options = options || {};
    this.domNode = document.createElement('div');
    this.mounted = false;
  }

  debug() {
    console.log(this.domNode.innerHTML);
  }

  mount() {
    document.body.appendChild(this.domNode);
    this.mounted = true;
  }

  unmount() {
    if (!this.mounted) return;
    document.body.removeChild(this.domNode);
    this.mounted = false;
  }

  count(selector) {
    return this.all(selector).length;
  }

  get(selector, helperName = 'get') {
    const nodes = this.all(selector);
    if (nodes.length !== 1) throw incorrectNodeCount(helperName, selector, nodes.length);
    return nodes[0];
  }

  find(selector) {
    return this.domNode.querySelector(selector);
  }

  all(selector) {
    return Array.from(this.domNode.querySelectorAll(selector));
  }

  countByText(selector) {
    return this.allByText(selector).length;
  }

  getByText(toMatch) {
    const nodes = this.allByText(toMatch);
    if (nodes.length !== 1) throw incorrectNodeCount('getByText', toMatch, nodes.length);
    return nodes[0];
  }

  findByText(toMatch) {
    return this.allByText(toMatch)[0] || null;
  }

  allByText(toMatch) {
    return this.all('*').filter(node => {
      const text = node.textContent;
      if (typeof toMatch === 'string') return text === toMatch;
      if (toMatch instanceof RegExp) return toMatch.test(text);
    });
  }
}
