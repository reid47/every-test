export const documentNotAvailable = () => {
  return new Error(
    `Either 'document' is undefined, or 'document.createElement' is not a function. A DOM must be available to render.`
  );
};

export const noRendersFound = componentType => {
  return new Error(`No rendered instances of '${componentType}' found in component tree.`);
};

export const multipleRendersFound = componentType => {
  return new Error(
    `Multiple rendered instances of '${componentType}' found in component tree. Maybe you want to use 'allPropsOf'?`
  );
};
