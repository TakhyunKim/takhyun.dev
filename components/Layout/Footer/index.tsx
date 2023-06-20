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
      <Link
        rel="noreferrer"
        target="_blank"
        href="https://github.com/TakhyunKim"
      >
        <div className={styles.github_wrapper}>
          <Image src="/images/github.svg" alt="github icon" fill />
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
