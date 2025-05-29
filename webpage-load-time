//GTM custom datalayer variable. Time format is in milliseconds.

function getPageLoadTime() {
  if (window.performance) {
    // Prefer Navigation Timing Level 2 (modern browsers)
    if (typeof performance.getEntriesByType === "function") {
      const [navigation] = performance.getEntriesByType("navigation");
      if (navigation && typeof navigation.loadEventEnd === "number") {
        const loadTime = navigation.loadEventEnd - navigation.startTime;
        return Math.round((loadTime + Number.EPSILON) * 100) / 100;
      }
    }

    // Fallback: Navigation Timing Level 1 (older browsers)
    const timing = performance.timing;
    if (timing && timing.loadEventEnd > 0) {
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      return Math.round((loadTime + Number.EPSILON) * 100) / 100;
    }
  }

  // If neither API is available or timing is incomplete
  return null;
}
