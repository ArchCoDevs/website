export const isValidCallbackUrl = (url: string): boolean => {
  if (url.startsWith('/')) return true;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === window.location.hostname;
  } catch {
    return false;
  }
};
