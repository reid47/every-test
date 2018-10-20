export default function toHaveClass(received, ...classes) {
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

  return {
    pass: isTruthy && Object.keys(missingClasses).length === 0,
    isTruthy,
    missingClasses: Object.keys(missingClasses)
  };
}
