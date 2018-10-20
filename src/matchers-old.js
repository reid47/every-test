const createMatcher = (name, { check, onNotFailure = () => {}, onFailure = () => {} }) => {
  expect.extend({
    [name](received, ...args) {
      const { pass, ...checkResults } = check(received, ...args);

      const matcherName = this.isNot ? `.not.${name}` : `.${name}`;
      const matcherHint = this.utils.matcherHint(
        matcherName,
        this.utils.printReceived(received)
        // this.utils.printExpected(args)
      );

      const message = pass
        ? onNotFailure.call(this, { received, args, ...checkResults }) || ''
        : onFailure.call(this, { received, args, ...checkResults }) || '';

      return {
        pass,
        message: () => matcherHint + '\n\n' + message
      };
    }
  });
};

createMatcher('toBeFocused', {
  check(received) {
    const { activeElement } = document;
    const isFocused = received && activeElement === received;

    return {
      pass: !!isFocused,
      activeElement,
      isFocused
    };
  },
  onFailure({ activeElement }) {
    return `Expected node to be focused, but current focused element is ${this.utils.stringify(
      activeElement
    )}.`;
  }
});

createMatcher('toExist', {
  check(received) {
    const isTruthy = !!received;
    const isHtmlElement = received instanceof HTMLElement;

    return {
      pass: isTruthy && isHtmlElement,
      isTruthy,
      isHtmlElement
    };
  }
});

createMatcher('toHaveAttr', {
  check(received, attr, value) {
    const isTruthy = !!received;

    let hasAttr, actualValue;
    if (isTruthy) {
      hasAttr = received.hasAttribute(attr);
      actualValue = received.getAttribute(attr);
    }

    const pass =
      arguments.length < 3 ? isTruthy && hasAttr : isTruthy && hasAttr && actualValue === value;

    return {
      pass,
      isTruthy,
      hasAttr,
      actualValue
    };
  }
});

createMatcher('toHaveClass', {
  check(received, ...classes) {
    const isTruthy = !!received;
    const missingClasses = new Set();

    if (isTruthy) {
      for (let i = 0, length = classes.length; i < length; i++) {
        const className = classes[i];
        if (!received.classList.contains(className)) {
          missingClasses.add(className);
        }
      }
    }

    return {
      pass: isTruthy && missingClasses.size === 0,
      isTruthy,
      missingClasses: [...missingClasses]
    };
  }
});

createMatcher('toHaveRole', {
  check(received, expectedRole) {
    const actualRole = received && received.getAttribute('role');

    return {
      pass: actualRole === expectedRole,
      actualRole
    };
  }
});

createMatcher('toHaveValue', {
  check(received, expectedValue) {
    const actualValue = received && received.value;

    return {
      pass: actualValue === expectedValue,
      actualValue
    };
  }
});

createMatcher('toMatchSelector', {
  check(received, selector) {
    const matches = received && received.matches(selector);

    return {
      pass: !!matches
    };
  }
});

createMatcher('toHaveText', {
  check(received, selector) {
    const matches =
      received &&
      (typeof selector === 'string'
        ? received.textContent === String(selector)
        : selector.test(selector));

    return {
      pass: !!matches
    };
  }
});
