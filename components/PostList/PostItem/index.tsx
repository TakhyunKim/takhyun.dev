import Image from "next/image";
import Link from "next/link";

import Tag from "../../Tag";

import styles from "./PostItem.module.css";

import type { NextPage } from "next";
import type { PostData } from "../../../lib/posts";

interface PostItemProps {
  href: string;
  postData: PostData;
}

const PostItem: NextPage<PostItemProps> = ({
  href,
  postData: { title, date, tagList, subtitle, thumbnailUrl },
}) => {
  return (
    <article className={styles.post_item_wrapper}>
      <div className={styles.post_content_wrapper}>
        <Link href={href}>
          <a>
            <div className={styles.post_thumbnail}>
              <Image
                priority
                src={thumbnailUrl}
                alt="thumbnail"
                layout="fill"
              />
            </div>
          </a>
        </Link>
        <Link href={href}>
          <a>
            <div className={styles.default_post}>
              <div className={styles.title}>{title}</div>
              <div className={styles.sub_title}>{subtitle}</div>
            </div>
          </a>
        </Link>
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
