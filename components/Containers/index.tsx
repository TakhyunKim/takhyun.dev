import type { ReactNode } from "react";
import Head from "next/head";

import Nav from "../Nav";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <>
      <Head>
        <title>takhyun blog</title>
      </Head>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default Container;
