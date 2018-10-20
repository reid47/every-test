import * as baseMatchers from '../matchers';
import { adaptMatcherResult } from '../matchers/common';

export const matchers = Object.keys(baseMatchers).reduce((acc, matcherName) => {
  const matcherFunction = baseMatchers[matcherName];

  return {
    ...acc,
    [matcherName]: () => ({
      compare: (received, ...args) => {
        const { pass, message } = matcherFunction(received, ...args);
        return adaptMatcherResult({ matcherName, received, pass, message });
      }
    })
  };
}, {});
