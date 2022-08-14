import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./PostItem.module.css";

import type { PostData } from "../../../../lib/posts";

interface PostItemProps {
  postData: PostData;
}

const PostItem: NextPage<PostItemProps> = ({
  postData: { id, title, date, subtitle, thumbnailUrl },
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <article onClick={handlePostClick} className={styles.post_item_wrapper}>
      <div
        className={isHovered ? styles.hovered_post : styles.default_post}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.sub_title}>{subtitle}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.post_thumbnail}>
        <Image priority src={thumbnailUrl} alt="thumbnail" layout="fill" />
      </div>
    </article>
  );
};

export default PostItem;
