import Head from "next/head";

import Container from "../components/Layout/Container";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>김탁현의 개발 블로그</title>
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Container>{children}</Container>
      </body>
    </html>
  );
};

export default RootLayout;
