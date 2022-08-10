import Link from "next/link";

import navLinks from "../../common/routes";

import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.wrapper}>
      {navLinks.map((nav) => (
        <Link href={nav.link} key={nav.title}>
          <a className={styles.nav_text}> {nav.title}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
