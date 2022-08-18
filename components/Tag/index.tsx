import type { NextPage } from "next";

import styles from "./Tag.module.css";

interface TagProps {
  tag: string;
}

const Tag: NextPage<TagProps> = ({ tag }) => {
  return (
    <div className={styles.tag_wrapper}>
      <span>{tag}</span>
    </div>
  );
};

export default Tag;
