import * as sizzle from 'sizzle';
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
  options: object;
  domNode: HTMLElement;
  mounted: boolean;

  constructor(options = {}) {
    this.options = options;
    this.domNode = document.createElement('div');
    this.domNode.setAttribute('data-test-container', 'true');
    this.mounted = false;
  }

  all(selector: string): Element[] {
    return sizzle(selector, this.domNode);
  }

  blurOn(selector: string): void {
    const element = this.get(selector, 'blurOn');
    if (!(element instanceof HTMLElement)) return;
    element.blur();
  }

  changeValueOf(selector: string, newValue: any): void {
    const element = this.get(selector, 'changeValueOf');
    dispatchChange(element, newValue);
  }

  clickOn(selector: string): void {
    const element = this.get(selector, 'clickOn');
    if (!(element instanceof HTMLElement)) return;
    element.click();
  }

  count(selector: string): number {
    return this.all(selector).length;
  }

  debug(printOptions: object = {}): void {
    console.log(this.toString(printOptions));
  }

  find(selector: string): Element | null {
    return this.all(selector)[0] || null;
  }

  focusOn(selector: string): void {
    const element = this.get(selector, 'focusOn');
    if (!(element instanceof HTMLElement)) return;
    return element.focus();
  }

  get(selector: string, methodName: string = 'get'): Element {
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

  mount(): void {
    document.body.appendChild(this.domNode);
    this.mounted = true;
  }

  toString(printOptions = {}): string {
    return formatDomNode(this.domNode.firstChild, printOptions);
  }

  unmount(): void {
    if (!this.mounted) return;
    document.body.removeChild(this.domNode);
    this.mounted = false;
  }
}
