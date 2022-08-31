export const getTheme = () => {
  const themeAttribute = document.body.getAttribute("data-theme");

  return themeAttribute;
};

export const setTheme = (theme: "dark" | "light") => {
  document.body.setAttribute("data-theme", theme);

  window.localStorage.setItem("theme", theme);
};
