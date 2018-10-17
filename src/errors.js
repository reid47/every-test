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
