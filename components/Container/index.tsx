import type { ReactNode } from "react";
import Head from "next/head";

import Nav from "../Nav";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>takhyun blog</title>
      </Head>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Container;
