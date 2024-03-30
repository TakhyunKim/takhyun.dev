"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import navLinks from "../../../common/routes";
import ProfileButton from "../ProfileButton";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.wrapper}>
      <ProfileButton />
      {navLinks.map((nav) => (
        <Link
          className={
            pathname.includes(nav.link)
              ? styles.nav_text_clicked
              : styles.nav_text
          }
          href={nav.link}
          key={nav.title}
        >
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
