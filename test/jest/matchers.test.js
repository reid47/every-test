import * as baseMatchers from '../../src/matchers';
import { matchers } from '../../src/jest';

describe('Jest matchers', () => {
  beforeAll(() => {
    expect.extend(matchers);
  });

  test('all matchers added to expect', () => {
    const el = document.createElement('div');

    Object.keys(baseMatchers).forEach(matcherName => {
      expect(typeof expect(el)[matcherName]).toBe('function');
    });
  });
});
