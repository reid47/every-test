export function toBeFocused(received) {
  const pass = document.activeElement === received;

  const message = pass
    ? 'Expected element not to be focused, but it was.'
    : 'Expected element to be focused, but it was not.';

  return { pass, message };
}
