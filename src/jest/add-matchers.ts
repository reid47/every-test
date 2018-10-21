import { matchers } from './index';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeChecked: () => R;
      toBeDisabled: () => R;
      toBeEmpty: () => R;
      toBeFocused: () => R;
      toBeHidden: () => R;
      toContainText: (text: string | RegExp) => R;
      toExist: () => R;
      toHaveAttribute: (attr: string, value?: string) => R;
      toHaveClass: (...classes: string[]) => R;
      toHaveTagName: (tagName: string) => R;
      toHaveText: (text: string) => R;
      toHaveValue: (value: any) => R;
    }
  }
}

expect.extend(matchers);
