declare global {
  interface Window {
    Intercom?: (...args: unknown[]) => void;
    intercomSettings?: {
      api_base?: string;
      app_id: string;
      [key: string]: unknown;
    };
  }
}

export const initIntercom = (): void => {
  if (typeof window === "undefined") return;

  const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
  const apiBase = process.env.NEXT_PUBLIC_INTERCOM_API_BASE;

  // Ensure appId and apiBase are defined
  if (!appId || !apiBase) {
    throw new Error(
      "Intercom credentials are missing. Please set the required environment variables.",
    );
  }

  window.intercomSettings = {
    api_base: apiBase,
    app_id: appId, // Safe now
  };

  (function () {
    const w = window;
    const ic = w.Intercom;
    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      const d = document;
      const i = function (...args: unknown[]): void {
        // Explicitly log args to avoid warnings
        i.c([...args]); // Pass args to the c method explicitly
      } as {
        (...args: unknown[]): void;
        c: (args: unknown[]) => void;
        q: unknown[];
      };
      i.q = [];
      i.c = function (args: unknown[]): void {
        i.q.push([...args]); // Use args explicitly in q.push
      };
      w.Intercom = i;
      const l = function (): void {
        const s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.intercom.io/widget/" + appId;
        const x = d.getElementsByTagName("script")[0];
        x.parentNode?.insertBefore(s, x);
      };

      if (document.readyState === "complete") {
        l();
      } else {
        w.addEventListener("load", l, false);
      }
    }
  })();
};

export const shutdownIntercom = (): void => {
  if (typeof window !== "undefined" && window.Intercom) {
    window.Intercom("shutdown");
  }
};
