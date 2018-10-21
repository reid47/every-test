export default function toBeDisabled(received) {
  const pass = !!received.disabled;

  const message = pass
    ? 'Expected element not to be disabled, but it was.'
    : 'Expected element to be disabled, but it was not.';

  return { pass, message };
}
