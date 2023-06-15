import Link from "next/link";
import { useRouter } from "next/router";

import navLinks from "../../common/routes";

import styles from "./Nav.module.css";

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.wrapper}>
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

export default Nav;
