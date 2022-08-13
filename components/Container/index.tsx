import type { ReactNode } from "react";
import Head from "next/head";

import Nav from "../Nav";
import BlogTitle from "../BlogTitle";

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
      <header className={styles.header}>
        <BlogTitle />
        <div className={styles.nav_profile_wrapper}>
          <Nav />
          <div className={styles.header_profile} />
        </div>
      </header>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Container;
