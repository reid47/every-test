export const formatValue = received => {
  if (received == null) return String(received);
  if (received instanceof HTMLElement) return received.outerHTML;

  try {
    return JSON.stringify(received);
  } catch {
    return received.toString();
  }
};
