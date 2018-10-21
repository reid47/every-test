import * as baseMatchers from '../matchers';
import { formatValue } from '../matchers/common';

function adaptMatcherResult({ matcherName, pass, message, received }) {
  const fullMatcherName = `${pass ? '.not' : ''}.${matcherName}`;

  const messageString = [
    `${this.utils.matcherHint(fullMatcherName, formatValue(received))}`,
    '',
    message
  ].join('\n');

  return { pass, message: () => messageString };
}

export const matchers = Object.keys(baseMatchers).reduce((acc, matcherName) => {
  const matcherFunction = baseMatchers[matcherName];

  return {
    ...acc,
    [matcherName](received, ...args) {
      const { pass, message } = matcherFunction(received, ...args);
      return adaptMatcherResult.call(this, { matcherName, received, pass, message });
    }
  };
}, {});
