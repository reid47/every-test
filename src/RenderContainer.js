import sizzle from 'sizzle';
import { formatDomNode } from './helpers';
import { dispatchChange } from './events';

function throwContainerError(methodName, message) {
  const error = new Error(message + '\n\nCurrent container DOM:\n\n' + this.toString());
  error.name = `${methodName}(...)`;
  error.stack = (error.stack || '')
    .split('\n')
    .filter(line => line.indexOf('throwContainerError') === -1)
    .join('\n');

  throw error;
}

export class RenderContainer {
  constructor(options) {
    this.options = options || {};
    this.domNode = document.createElement('div');
    this.domNode.setAttribute('data-test-container', 'true');
    this.mounted = false;
  }

  all(selector) {
    return sizzle(selector, this.domNode);
  }

  allByText(toMatch) {
    return this.all('*').filter(node => {
      const text = node.textContent;
      if (typeof toMatch === 'string') return text === toMatch;
      if (toMatch instanceof RegExp) return toMatch.test(text);
    });
  }

  blurOn(selector) {
    return this.get(selector, 'blurOn').blur();
  }

  changeValueOf(selector, newValue) {
    const element = this.get(selector, 'changeValueOf');
    dispatchChange(element, newValue);
  }

  clickOn(selector) {
    return this.get(selector, 'clickOn').click();
  }

  count(selector) {
    return this.all(selector).length;
  }

  countByText(selector) {
    return this.allByText(selector).length;
  }

  debug(printOptions) {
    console.log(this.toString(printOptions));
  }

  find(selector) {
    return this.all(selector)[0] || null;
  }

  findByText(toMatch) {
    return this.allByText(toMatch)[0] || null;
  }

  focusOn(selector) {
    return this.get(selector, 'focusOn').focus();
  }

  get(selector, methodName = 'get') {
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

  getByText(toMatch) {
    const nodes = this.allByText(toMatch);

    if (nodes.length !== 1) {
      throwContainerError.call(
        this,
        'getByText',
        `Expected to find exactly 1 element matching '${selector}', but found ${nodes.length}.`
      );
    }

    return nodes[0];
  }

  mount() {
    document.body.appendChild(this.domNode);
    this.mounted = true;
  }

  toString(printOptions) {
    return formatDomNode(this.domNode.firstChild, printOptions);
  }

  unmount() {
    if (!this.mounted) return;
    document.body.removeChild(this.domNode);
    this.mounted = false;
  }
}
