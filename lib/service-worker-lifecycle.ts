const DEV_RESET_KEY = "episteme:dev-service-worker-reset";

const registerServiceWorker = `
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
`;

const unregisterDevelopmentServiceWorker = `
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const resetKey = ${JSON.stringify(DEV_RESET_KEY)};

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) await registration.unregister();

      if (navigator.serviceWorker.controller) {
        if (!window.sessionStorage.getItem(resetKey)) {
          window.sessionStorage.setItem(resetKey, "1");
          window.location.reload();
        }
        return;
      }

      window.sessionStorage.removeItem(resetKey);
    } catch {
      // Development must remain usable when storage or SW APIs are restricted.
    }
  });
}
`;

/**
 * Production keeps offline reading enabled. Development actively retires a
 * production registration left on the same localhost origin, otherwise that
 * worker can serve stale Turbopack chunks before the dev server sees a request.
 */
export function getServiceWorkerLifecycleScript(environment: string | undefined): string {
  return environment === "production" ? registerServiceWorker : unregisterDevelopmentServiceWorker;
}
