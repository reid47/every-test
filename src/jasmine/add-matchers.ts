import { matchers } from './index';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeChecked: () => T;
      toBeDisabled: () => T;
      toBeEmpty: () => T;
      toBeFocused: () => T;
      toBeHidden: () => T;
      toContainText: (text: string | RegExp) => T;
      toExist: () => T;
      toHaveAttribute: (attr: string, value?: string) => T;
      toHaveClass: (...classes: string[]) => T;
      toHaveTagName: (tagName: string) => T;
      toHaveText: (text: string) => T;
      toHaveValue: (value: any) => T;
    }
  }
}

jasmine.addMatchers(matchers);
