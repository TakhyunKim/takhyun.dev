import Link from "next/link";

import navLinks from "../../common/routes";

const Nav = () => {
  return (
    <nav>
      {navLinks.map((nav) => (
        <Link href={nav.link} key={nav.title}>
          <a>{nav.title}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
