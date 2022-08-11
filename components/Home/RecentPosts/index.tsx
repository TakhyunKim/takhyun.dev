import type { NextPage } from "next";

import RecentPost from "./RecentPost";

import styles from "./RecentPost.module.css";

const RecentPosts: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.recent_posts_title}>최근 포스팅</h2>
      <div>
        <RecentPost />
        <RecentPost />
        <RecentPost />
      </div>
    </div>
  );
};

export default RecentPosts;
