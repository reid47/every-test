export default function toBeHidden(received) {
  const hiddenProp = !!received.hidden;
  const { visibility, width, height } = getComputedStyle(received);
  const computedVisibility = visibility === 'hidden';
  const zeroWidth = width ? parseInt(width) <= 0 : true;
  const zeroHeight = height ? parseInt(height) <= 0 : true;

  const pass = hiddenProp || computedVisibility || zeroWidth || zeroHeight;

  const message = pass
    ? 'Expected element not to be hidden, but it was.'
    : 'Expected element to be hidden, but it was not.';

  return { pass, message };
}
