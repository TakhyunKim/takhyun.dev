import type { NextPage } from "next";
import { useRouter } from "next/router";

import type { PostData } from "../../lib/posts";
import type { MarkdownPost } from "../../common/types/markdownPost";

import PostItem from "./PostItem";

import styles from "./PostList.module.css";

interface PostListProps {
  postList: PostData[];
  postType: MarkdownPost;
}

const PostList: NextPage<PostListProps> = ({ postType, postList }) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.post_list_wrapper}>
        {postList.map((postData) => {
          const redirectToPost = () => {
            router.push(`/${postType}/${postData.id}`);
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
