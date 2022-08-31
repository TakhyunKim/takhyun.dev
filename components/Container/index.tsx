import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  getTheme,
  setTheme as setDocumentTheme,
} from "../../common/utils/getTheme";

import Nav from "../Nav";
import Footer from "../Footer";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const [theme, setTheme] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/");
  };

  const handleChangeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setDocumentTheme("light");
    }

    if (theme === "light") {
      setTheme("dark");
      setDocumentTheme("dark");
    }
  };

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>takhyun blog</title>
      </Head>
      <div className={styles.content_wrapper}>
        <header className={styles.header}>
          <Nav />
          {(theme === "dark" || theme === "light") && (
            <button onClick={handleChangeTheme}>버튼 {theme}</button>
          )}
          <div onClick={handleProfileClick} className={styles.header_profile}>
            <Image src="/images/profile.jpg" alt="profile" layout="fill" />
          </div>
        </header>
        <main className={styles.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
