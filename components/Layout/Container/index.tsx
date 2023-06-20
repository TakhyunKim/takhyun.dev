import type { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";

import Navigation from "../Navigation";
import Footer from "../Footer";
import ThemeButton from "../ThemeButton";
import ProfileButton from "../ProfileButton";

import "../../../styles/globals.css";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>김탁현의 개발 블로그</title>
      </Head>
      <div className={styles.content_wrapper}>
        <header className={styles.header}>
          <Navigation />
          <div className={styles.header_profile_theme_wrapper}>
            <a href="mailto:kimkih1218@gmail.com" className={styles.link}>
              <Image src="/images/email.svg" alt="mail" fill />
            </a>
            <a
              href="https://github.com/TakhyunKim"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              <Image src="/images/github.svg" alt="github" fill />
            </a>
            <ThemeButton />
            <ProfileButton />
          </div>
        </header>
        <main className={styles.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
