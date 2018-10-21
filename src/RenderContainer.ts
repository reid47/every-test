import * as sizzle from 'sizzle';
import { getNodeInContainer, formatDomNode } from './helpers';
import { dispatchChange } from './events';

/**
 * A container that represents a rendered DOM node.
 */
export class RenderContainer {
  options: object;
  domNode: HTMLElement;
  mounted: boolean;

  /**
   * Creates a new render container
   *
   * @param options Render options
   */
  constructor(options = {}) {
    this.options = options;
    this.domNode = document.createElement('div');
    this.domNode.setAttribute('data-test-container', 'true');
    this.mounted = false;
  }

  /**
   * Returns all DOM nodes in container matching `selector`.
   *
   * @param selector Selector for DOM nodes to search for
   */
  all(selector: string): Element[] {
    return sizzle(selector, this.domNode);
  }

  /**
   * Removes focus from a DOM node, triggering a `blur` event.
   *
   * @param selector Selector for DOM node to blur
   */
  blurOn(selector: string): void {
    const element = getNodeInContainer.call(this, selector, 'blurOn');
    if (!(element instanceof HTMLElement)) return;
    element.blur();
  }

  /**
   * Changes the `value` of a DOM node and triggers an `input`
   * event. Meant to simulate user interaction with an element.
   *
   * @param selector Selector for DOM node to change value of
   * @param newValue New value to set on DOM node
   */
  changeValueOf(selector: string, newValue: any): void {
    const element = getNodeInContainer.call(this, selector, 'changeValueOf');
    dispatchChange(element, newValue);
  }

  /**
   * Clicks on a DOM node, triggering a `click` event.
   *
   * @param selector Selector for DOM node to click on
   */
  clickOn(selector: string): void {
    const element = getNodeInContainer.call(this, selector, 'clickOn');
    if (!(element instanceof HTMLElement)) return;
    element.click();
  }

  /**
   * Returns the count of DOM nodes in container matching `selector`.
   *
   * @param selector Selector for DOM nodes
   */
  count(selector: string): number {
    return this.all(selector).length;
  }

  /**
   * Prints the current state of this DOM node to the console as an
   * HTML string.
   *
   * @param printOptions Print options
   */
  debug(printOptions: object = {}): void {
    console.log(this.toString(printOptions));
  }

  /**
   * Returns the first DOM node in container matching `selector`, or
   * `null` if no matches found.
   *
   * @param selector Selector for DOM node to search for
   */
  find(selector: string): Element | null {
    return this.all(selector)[0] || null;
  }

  /**
   * Sets focus to a DOM node, triggering a `focus` event.
   *
   * @param selector Selector for DOM node to focus
   */
  focusOn(selector: string): void {
    const element = getNodeInContainer.call(this, selector, 'focusOn');
    if (!(element instanceof HTMLElement)) return;
    return element.focus();
  }

  /**
   * Returns the only DOM node in container matching `selector`.
   * Throws an error if no matches or multiple matches are found.
   *
   * @param selector Selector for DOM node to search for
   */
  get(selector: string): Element {
    return getNodeInContainer.call(this, selector, 'get');
  }

  /**
   * Mounts the element to the DOM.
   */
  mount(): void {
    document.body.appendChild(this.domNode);
    this.mounted = true;
  }

  /**
   * Returns the current state of this DOM node as an HTML string.
   *
   * @param printOptions Print options
   */
  toString(printOptions = {}): string {
    return formatDomNode(this.domNode.firstChild, printOptions);
  }

  /**
   * Removes the element from the DOM.
   */
  unmount(): void {
    if (!this.mounted) return;
    document.body.removeChild(this.domNode);
    this.mounted = false;
  }
}
