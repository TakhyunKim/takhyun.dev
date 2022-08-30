import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "./styles/theme";

import { getInitialTheme } from "../lib/getInitialTheme";

import "../styles/globals.css";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const initialTheme = getInitialTheme();

    setTheme(initialTheme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
