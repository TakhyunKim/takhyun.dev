import type { NextPage } from "next";

import { PostData } from "../../lib/posts";

import PostItem from "./PostItem";

import styles from "./PostList.module.css";

interface PostListProps {
  postList: PostData[];
}

const PostList: NextPage<PostListProps> = ({ postList }) => {
  return (
    <div>
      <div className={styles.post_list_wrapper}>
        {postList.map((postData) => (
          <PostItem key={postData.id} postData={postData} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
