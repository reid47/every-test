export const formatValue = (received: any): string => {
  if (received == null) return String(received);
  if (received instanceof HTMLElement) return received.outerHTML;

  try {
    return JSON.stringify(received);
  } catch {
    return received.toString();
  }
};
