import Link from "next/link";
import Tag from "@/common/components/PostList/PostItem/Tag";

import styles from "./AlgorithmPost.module.css";

import type { PostData } from "@/common/utils/posts";

interface AlgorithmPostListProps {
  algorithmPostList: PostData[];
}

const AlgorithmPostList = ({ algorithmPostList }: AlgorithmPostListProps) => {
  return (
    <section className={styles.list_wrapper}>
      {algorithmPostList.map((algorithmPostData) => (
        <AlgorithmPostItem
          key={algorithmPostData.id}
          algorithmPostData={algorithmPostData}
          href={`/algorithms/${algorithmPostData.id}`}
        />
      ))}
    </section>
  );
};

interface AlgorithmPostItemProps {
  href: string;
  algorithmPostData: PostData;
}

const AlgorithmPostItem = ({
  href,
  algorithmPostData,
}: AlgorithmPostItemProps) => {
  const { title, date, tagList } = algorithmPostData;

  return (
    <article className={styles.item_wrapper}>
      <Link href={href}>
        <div className={styles.item_header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.tag_wrapper}>
          {tagList.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </Link>
    </article>
  );
};

export default AlgorithmPostList;
