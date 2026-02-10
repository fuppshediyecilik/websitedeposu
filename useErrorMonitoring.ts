import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * Hook to set up global error monitoring and logging
 * Should be called once in the App component
 * Integrates with Sentry for remote error tracking
 */
export function useErrorMonitoring() {
  const { user } = useAuth();

  useEffect(() => {
    // Set user context for error tracking (both local logger and Sentry)
    if (user) {
      logger.setUserContext(user.id, user.email || undefined);
      logger.setSentryUser(user.id, user.email || undefined);
    } else {
      logger.clearSentryUser();
    }
  }, [user]);

  useEffect(() => {
    // Monitor page visibility changes
    const handleVisibilityChange = () => {
      const state = document.hidden ? "hidden" : "visible";
      logger.debug("Page visibility changed", { state });
      logger.addSentryBreadcrumb(`Page visibility: ${state}`, "navigation");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Monitor network status
    const handleOnline = () => {
      logger.info("Network connection restored");
      logger.addSentryBreadcrumb("Network connection restored", "network");
    };

    const handleOffline = () => {
      logger.warn("Network connection lost");
      logger.addSentryBreadcrumb("Network connection lost", "network");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Monitor page unload
    const handleBeforeUnload = () => {
      logger.debug("Page unloading");
      logger.addSentryBreadcrumb("Page unloading", "navigation");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Monitor memory warnings (if available)
    if ("memory" in performance) {
      const checkMemory = () => {
        const mem = (performance as any).memory;
        if (mem.usedJSHeapSize > mem.jsHeapSizeLimit * 0.9) {
          const percentage = ((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100).toFixed(2);
          logger.warn("High memory usage detected", {
            usedJSHeapSize: mem.usedJSHeapSize,
            jsHeapSizeLimit: mem.jsHeapSizeLimit,
            percentage,
          });
          logger.addSentryBreadcrumb(`High memory usage: ${percentage}%`, "performance");
        }
      };

      const memoryCheckInterval = setInterval(checkMemory, 30000); // Check every 30 seconds

      return () => {
        clearInterval(memoryCheckInterval);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}
