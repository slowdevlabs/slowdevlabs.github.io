(function (global) {
  "use strict";

  function detectLanguage() {
    var preferred = "";

    if (global.navigator) {
      if (Array.isArray(global.navigator.languages) && global.navigator.languages.length > 0) {
        preferred = global.navigator.languages[0] || "";
      }

      if (!preferred) {
        preferred = global.navigator.language || global.navigator.userLanguage || "";
      }
    }

    var locale = String(preferred || "en").toLowerCase();

    if (locale.indexOf("ko") === 0) return "ko";
    if (locale.indexOf("es") === 0) return "es";
    return "en";
  }

  function redirectByLanguage(routes) {
    var lang = detectLanguage();
    var destination = routes[lang] || routes.fallback || routes.en;

    if (!destination) return;

    if (global.location && global.location.pathname !== destination) {
      global.location.replace(destination);
    }
  }

  global.SlowDevLabsRedirect = {
    detectLanguage: detectLanguage,
    redirectByLanguage: redirectByLanguage
  };
})(window);
