import type { NextPage } from "next";

import styles from "./RecentPost.module.css";

const RecentPost: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.recent_post_title}>title 을 적을 생각입니다.</div>
      <div className={styles.recent_post_date}>2022년 08년 22일</div>
      <div className={styles.recent_post_sub_title}>
        sub title 을 적을 생각입니다.
      </div>
    </div>
  );
};

export default RecentPost;
