import React from 'react';

const findPropsOfType = (element, type, props) => {
  if (element.type === type) {
    props.push(element.props);
  }

  return React.Children.forEach(element.props.children, child => {
    findPropsOfType(child, type, props);
  });
};

export default function createReactHelpers(element) {
  const propsOf = componentType => {
    const collectedProps = [];
    findPropsOfType(element, componentType, collectedProps);
    return collectedProps;
  };

  const lastPropsOf = componentType => {
    const allProps = propsOf(componentType);
    return allProps[allProps.length - 1];
  };

  return { propsOf, lastPropsOf };
}
