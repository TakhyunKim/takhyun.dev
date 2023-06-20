import PostList from "../../common/components/PostList";

import { getSortedPostsData } from "../../common/utils/posts";

const Posts = () => {
  const allPostsData = getSortedPostsData({ postType: "posts" });

  return <PostList postList={allPostsData} />;
};

export default Posts;
