import * as baseMatchers from '../../src/matchers';
import { matchers } from '../../src/jasmine';
import '../../src/jasmine/add-matchers';

describe('Jasmine matchers', () => {
  test('formats matchers for Jasmine', () => {
    Object.keys(baseMatchers).forEach(matcherName => {
      const matcherFactory = matchers[matcherName];
      expect(typeof matcherFactory).toBe('function');

      const matcher = matcherFactory();
      expect(matcher).toMatchObject({
        compare: expect.any(Function)
      });

      const result = matcher.compare(document.createElement('div'), '');
      expect(result).toMatchObject({
        pass: expect.any(Boolean),
        message: expect.any(Function)
      });

      const message = result.message;
      expect(message()).toBe(message.toString());
    });
  });

  test('all matchers added to expect', () => {
    const el = document.createElement('div');

    Object.keys(baseMatchers).forEach(matcherName => {
      expect(typeof expect(el)[matcherName]).toBe('function');
    });
  });
});
