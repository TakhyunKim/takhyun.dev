import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer_wrapper}>
      <div className={styles.copyright_wrapper}>
        Copyright © {new Date().getFullYear()} TakhyunKim{" "}
      </div>
      <Link href="https://github.com/TakhyunKim">
        <a rel="noreferrer" target="_blank" className={styles.github_wrapper}>
          <Image src="/images/github.svg" alt="github icon" layout="fill" />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
