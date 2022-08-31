export const setInitialTheme = `(() => {
  if (typeof window !== "undefined") {
    const persistedColorPreference = window.localStorage.getItem("theme");

    if (
      persistedColorPreference === "dark" ||
      persistedColorPreference === "light"
    ) {
      document.body.setAttribute("data-theme", persistedColorPreference);
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    if (mql.matches) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }
})()`;
