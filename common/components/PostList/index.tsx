import type { NextPage } from "next";

import type { PostData } from "../../../lib/posts";

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
          <PostItem
            key={postData.id}
            postData={postData}
            href={`/${postData.postingType}/${postData.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
