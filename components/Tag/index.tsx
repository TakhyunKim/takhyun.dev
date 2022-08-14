import type { NextPage } from "next";

import styles from "./Tag.module.css";

interface TagProps {
  tag: string;
  isHovered: boolean;
}

const Tag: NextPage<TagProps> = ({ tag, isHovered }) => {
  return (
    <div
      className={isHovered ? styles.tag_wrapper_hovered : styles.tag_wrapper}
    >
      <span>{tag}</span>
    </div>
  );
};

export default Tag;
