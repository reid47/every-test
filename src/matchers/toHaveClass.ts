const formatClasses = classes => classes.map(JSON.stringify).join(', ');

export function toHaveClass(received, ...classes) {
  const isTruthy = !!received;
  const missingClasses = {};

  if (isTruthy) {
    for (let i = 0, length = classes.length; i < length; i++) {
      const className = classes[i];
      if (!received.classList.contains(className)) {
        missingClasses[className] = true;
      }
    }
  }

  const missingClassNames = Object.keys(missingClasses);
  const pass = isTruthy && missingClassNames.length === 0;

  const classOrClasses = classes => (classes.length > 1 ? 'classes' : 'class');
  const message = pass
    ? `Expected element not to have ${classOrClasses(classes)} ${formatClasses(
        classes
      )}, but it did.`
    : `Expected element to have ${classOrClasses(classes)} ${formatClasses(
        classes
      )}, but it was missing ${classOrClasses(missingClassNames)} ${formatClasses(
        missingClassNames
      )}.`;

  return { pass, message };
}
