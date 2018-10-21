import * as baseMatchers from '../../src/matchers';
import { matchers } from '../../src/jasmine';

describe('Jasmine matchers', () => {
  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  test('all matchers added to expect', () => {
    const el = document.createElement('div');

    Object.keys(baseMatchers).forEach(matcherName => {
      expect(typeof expect(el)[matcherName]).toBe('function');
    });
  });
});
