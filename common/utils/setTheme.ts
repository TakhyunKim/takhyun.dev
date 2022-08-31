export const setTheme = (theme: "dark" | "light") => {
  document.body.setAttribute("data-theme", theme);

  window.localStorage.setItem("theme", theme);
};
