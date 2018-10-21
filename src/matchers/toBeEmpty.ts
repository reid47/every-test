export function toBeEmpty(received) {
  const pass = received.innerHTML === '';

  const message = pass
    ? 'Expected element not to be empty, but it was.'
    : `Expected element to be empty, but it has content: ${received.innerHTML}`;

  return { pass, message };
}
