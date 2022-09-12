import Document, { Html, Head, Main, NextScript } from "next/document";

import { setInitialTheme } from "../lib/setInitialTheme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
