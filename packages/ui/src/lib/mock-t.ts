/**
 * Mock translation function for i18n
 * @param {string} key
 * @param {Record<string, any>} values
 * @param {string} fallback
 * @returns {string}
 */
export const tMockFn = (
  key: string,
  values?: Record<string, any>,
  fallback?: string
): string => {
  // Mock implementation
  return key || fallback || "";
};
