import type { NextPage } from "next";
import Link from "next/link";

import styles from "./BlogTitle.module.css";

const BlogTitle = () => {
  return (
    <h1 className={styles.blog_title}>
      <Link href="/">Takhyun Blog</Link>
    </h1>
  );
};

export default BlogTitle;
