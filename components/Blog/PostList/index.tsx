import type { NextPage } from "next";

import { PostData } from "../../../lib/posts";

import PostItem from "./PostItem";

import styles from "./PostList.module.css";

interface PostListProps {
  allPostsData: PostData[];
}

const PostList: NextPage<PostListProps> = ({ allPostsData }) => {
  return (
    <div>
      <h2 className={styles.post_list_title}>현재 Post List</h2>
      <div className={styles.post_list_wrapper}>
        {allPostsData.map((postData) => (
          <PostItem key={postData.id} postData={postData} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
