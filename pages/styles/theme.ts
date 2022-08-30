import { createGlobalStyle } from "styled-components";

type Theme = {
  color: string;
  background: string;
};

export const lightTheme: Theme = {
  color: "#000000",
  background: "#ffffff",
};

export const darkTheme: Theme = {
  color: "#ffffff",
  background: "#202125",
};

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
