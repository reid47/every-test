export default function toBeHidden(received) {
  const hiddenProp = !!received.hidden;
  const computedVisibility = getComputedStyle(received).visibility === 'hidden';
  const zeroWidth = received.offsetWidth <= 0;
  const zeroHeight = received.offsetHeight <= 0;

  const pass = !(hiddenProp && computedVisibility && zeroWidth && zeroHeight);

  const reasons = {
    hiddenProp: 'the "hidden" property was set to a truthy value',
    computedVisibility: 'the computed visibility of the element was "hidden"',
    zeroWidth: `the offsetWidth of the element was ${received.offsetWidth}`,
    zeroHeight: `the offsetHeight of the element was ${received.offsetHeight}`
  };

  const reason = [
    hiddenProp && reasons[hiddenProp],
    computedVisibility && reasons[computedVisibility],
    zeroWidth && reasons[zeroWidth],
    zeroHeight && reasons[zeroHeight]
  ]
    .filter(Boolean)
    .join(', ');

  const message = pass
    ? `Expected element not to be hidden, but ${reason}.`
    : `Expected element to be hidden, but ${reason}.`;

  return { pass, message };
}
