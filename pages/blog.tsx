import type { NextPage } from "next";

import Container from "../components/Container";
import PostList from "../components/Blog/PostList";
import RecommendPost from "../components/Blog/RecommendPost";

const Blog: NextPage = () => {
  return (
    <Container>
      <RecommendPost />
      <PostList />
    </Container>
  );
};

export default Blog;
