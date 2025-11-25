/**
 * Simple className utility function to combine class names
 * Replacement for clsx that works better with Jest
 */
export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return classes
    .map((cls) => {
      if (typeof cls === 'string') {
        return cls;
      }
      if (typeof cls === 'object' && cls !== null) {
        return Object.keys(cls)
          .filter((key) => cls[key])
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
