import type { NextPage } from "next";
import { useRouter } from "next/router";

import type { PostData } from "../../lib/posts";

import PostItem from "./PostItem";

import styles from "./PostList.module.css";

interface PostListProps {
  postList: PostData[];
}

const PostList: NextPage<PostListProps> = ({ postList }) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.post_list_wrapper}>
        {postList.map((postData) => {
          const redirectToPost = () => {
            router.push(`/${postData.postingType}/${postData.id}`);
          };
          return (
            <PostItem
              key={postData.id}
              postData={postData}
              onClick={redirectToPost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
