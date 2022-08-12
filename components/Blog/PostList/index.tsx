import type { NextPage } from "next";

import PostItem from "./PostItem";

import styles from "./PostList.module.css";

const PostList: NextPage = () => {
  return (
    <div>
      <h2 className={styles.post_list_title}>현재 Post List</h2>
      <div className={styles.post_list_wrapper}>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </div>
  );
};

export default PostList;
