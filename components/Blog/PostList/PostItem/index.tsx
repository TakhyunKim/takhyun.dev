import type { NextPage } from "next";

import styles from "./PostItem.module.css";

const PostItem: NextPage = () => {
  return (
    <div className={styles.post_item_wrapper}>
      <div className={styles.post_thumbnail} />
      <div className={styles.title}>Next js 로 블로그 만들기</div>
      <div className={styles.sub_title}>
        Next js 를 어떻게 사용할 수 있을까?
      </div>
      <div className={styles.date}>2022년 08년 12일</div>
    </div>
  );
};

export default PostItem;
