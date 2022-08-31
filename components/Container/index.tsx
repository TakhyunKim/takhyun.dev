import type { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Nav from "../Nav";
import Footer from "../Footer";
import ThemeButton from "./ThemeButton";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>takhyun blog</title>
      </Head>
      <div className={styles.content_wrapper}>
        <header className={styles.header}>
          <Nav />
          <div className={styles.header_profile_theme_wrapper}>
            <ThemeButton />
            <div onClick={handleProfileClick} className={styles.header_profile}>
              <Image src="/images/profile.jpg" alt="profile" layout="fill" />
            </div>
          </div>
        </header>
        <main className={styles.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
