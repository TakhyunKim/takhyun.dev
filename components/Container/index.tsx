import type { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Nav from "../Nav";

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
      <header className={styles.header}>
        <Nav />
        <div onClick={handleProfileClick} className={styles.header_profile}>
          <Image src="/images/profile.jpg" alt="profile" layout="fill" />
        </div>
      </header>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Container;
