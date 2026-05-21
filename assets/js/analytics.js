const GA_MEASUREMENT_ID = "G-9V0MP7GP5H";

(function () {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("[SlowDevLabs] GA4 Measurement ID is not configured.");
    return;
  }

  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(GA_MEASUREMENT_ID);

  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true
  });
})();

function setupAppStoreClickTracking() {
  const links = document.querySelectorAll(
    "[data-app-name][data-destination='app_store']"
  );

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag !== "function") {
        return;
      }

      window.gtag("event", "appstore_click", {
        app_name: link.dataset.appName || "Unknown",
        language:
          link.dataset.language ||
          document.documentElement.lang ||
          "unknown",
        destination: link.dataset.destination || "app_store",
        page_path: window.location.pathname
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", setupAppStoreClickTracking);
