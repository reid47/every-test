export const incorrectNodeCount = (helperName, selector, amount) => {
  return new Error(
    `${helperName}: expected to find exactly one node matching '${selector}', but found ${amount}.`
  );
};

export const documentNotAvailable = () => {
  return new Error(
    `Either 'document' is undefined, or 'document.createElement' is not a function. A DOM must be available to render.`
  );
};

export const noRendersFound = componentType => {
  return new Error(
    `getPropsOf: No rendered instances of '${componentType}' found in component tree.`
  );
};

export const multipleRendersFound = componentType => {
  return new Error(
    `getPropsOf: Multiple rendered instances of '${componentType}' found in component tree. Maybe you want to use 'allPropsOf'?`
  );
};
