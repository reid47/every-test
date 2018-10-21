export default function toBeChecked(received: HTMLElement) {
  const pass = received instanceof HTMLInputElement && received.checked;
  const message = pass ? `Expected element not to be checked.` : `Expected element to be checked.`;
  return { pass, message };
}
