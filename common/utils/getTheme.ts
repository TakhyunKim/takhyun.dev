export const getTheme = () => {
  const themeAttribute = document.body.getAttribute("data-theme");

  return themeAttribute;
};
