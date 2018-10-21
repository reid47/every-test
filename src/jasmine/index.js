import * as baseMatchers from '../matchers';
import { formatReceived } from '../matchers/common';

export const adaptMatcherResult = ({ matcherName, pass, message: msg, received }) => {
  const formatted = [
    `expect(${formatReceived(received)})${pass ? '.not' : ''}.${matcherName}(...)`,
    ' ',
    msg
  ].join('\n');

  // Jasmine wants message to be a string, but the tests for this
  // library are in Jest, which wants it to be a function. This trick
  // makes it work both ways.
  const message = () => formatted;
  message.toString = message;

  return { pass, message };
};

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
