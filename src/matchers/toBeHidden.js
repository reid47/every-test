export default function toBeHidden(received) {
  const hiddenProp = !!received.hidden;
  const { visibility, width, height } = getComputedStyle(received);
  const computedVisibility = visibility === 'hidden';
  const zeroWidth = width <= 0;
  const zeroHeight = height <= 0;

  const pass = hiddenProp || computedVisibility || zeroWidth || zeroHeight;

  const message = pass
    ? 'Expected element not to be hidden, but it was.'
    : 'Expected element to be hidden, but it was not.';

  return { pass, message };
}
