export default function toBeChecked(received) {
  const pass = !!received.checked;
  const message = pass ? `Expected element not to be checked.` : `Expected element to be checked.`;
  return { pass, message };
}
