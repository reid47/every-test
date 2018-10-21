import * as baseMatchers from '../../src/matchers';
import { matchers } from '../../src/jest';

describe('Jest matchers', () => {
  beforeAll(() => {
    expect.extend(matchers);
  });

  test('formats matchers for Jest', () => {
    Object.keys(baseMatchers).forEach(matcherName => {
      const matcher = matchers[matcherName];
      expect(typeof matcher).toBe('function');

      const fakeJest = { utils: { matcherHint: jest.fn() } };

      const result = matcher.bind(fakeJest)(document.createElement('div'), '');
      expect(result).toMatchObject({
        pass: expect.any(Boolean),
        message: expect.any(Function)
      });

      const message = result.message;
      expect(typeof message()).toBe('string');
    });
  });

  test('all matchers added to expect', () => {
    const el = document.createElement('div');

    Object.keys(baseMatchers).forEach(matcherName => {
      expect(typeof expect(el)[matcherName]).toBe('function');
    });
  });
});
