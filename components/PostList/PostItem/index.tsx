import type { NextPage } from "next";
import Image from "next/image";

import styles from "./PostItem.module.css";

import type { PostData } from "../../../lib/posts";

import Tag from "../../Tag";

interface PostItemProps {
  postData: PostData;
  onClick: () => void;
}

const PostItem: NextPage<PostItemProps> = ({
  postData: { title, date, tagList, subtitle, thumbnailUrl },
  onClick,
}) => {
  return (
    <article onClick={onClick} className={styles.post_item_wrapper}>
      <div className={styles.post_content_wrapper}>
        <div className={styles.post_thumbnail}>
          <Image priority src={thumbnailUrl} alt="thumbnail" layout="fill" />
        </div>
        <div className={styles.default_post}>
          <div className={styles.title}>{title}</div>
          <div className={styles.sub_title}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.tag_list_date_wrapper}>
        <div className={styles.date}>{date}</div>
        <div className={styles.tag_list_wrapper}>
          {tagList.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostItem;
