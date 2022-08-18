import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./PostItem.module.css";

import type { PostData } from "../../../../lib/posts";

import Tag from "../../../Tag";

interface PostItemProps {
  postData: PostData;
}

const PostItem: NextPage<PostItemProps> = ({
  postData: { id, title, tagList, subtitle, thumbnailUrl },
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <article
      onClick={handlePostClick}
      className={
        isHovered ? styles.post_item_wrapper_hover : styles.post_item_wrapper
      }
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.post_content_wrapper}>
        <div className={styles.post_thumbnail}>
          <Image priority src={thumbnailUrl} alt="thumbnail" layout="fill" />
        </div>
        <div className={styles.default_post}>
          <div className={styles.title}>{title}</div>
          <div className={styles.sub_title}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.tag_list_wrapper}>
        {tagList.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
};

export default PostItem;
