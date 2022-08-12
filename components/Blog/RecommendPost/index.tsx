import type { NextPage } from "next";

import styles from "./RecommendPost.module.css";

const RecommendPost: NextPage = () => {
  return (
    <div className={styles.recommend_post_wrapper}>
      <div>
        <span>Recommend Post</span>
        <div className={styles.recommend_post_content}>
          <h2 className={styles.title}>현재 타이틀을 적을 생각입니다</h2>
          <h3 className={styles.recent_post_sub_title}>
            sub title 을 적을 생각입니다.
          </h3>
          <span className={styles.recommend_post_date}>2022년 08년 22일</span>
        </div>
      </div>
      <div className={styles.recent_post_thumbnail} />
    </div>
  );
};

export default RecommendPost;
