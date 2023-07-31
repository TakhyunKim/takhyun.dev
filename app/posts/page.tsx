import PostList from "../../common/components/PostList";

import { getSortedPostsData } from "../../common/utils/posts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개발 포스팅",
  description: "개발하는 과정을 작성한 포스팅",
};

const Posts = () => {
  const allPostsData = getSortedPostsData({ postType: "posts" });

  return <PostList postList={allPostsData} />;
};

export default Posts;
