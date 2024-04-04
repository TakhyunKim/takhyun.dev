import PostList from "@/common/components/PostList";

import styles from "./RecentPost.module.css";

import type { NextPage } from "next";
import type { PostData } from "@/common/utils/posts";

interface RecentPostsProps {
  postList: PostData[];
}

const RecentPosts: NextPage<RecentPostsProps> = ({ postList }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.recent_posts_title}>최근 포스팅</h2>
      <PostList postList={postList} />
    </div>
  );
};

export default RecentPosts;
