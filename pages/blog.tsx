import type { NextPage } from "next";

import Container from "../components/Container";
import RecommendPost from "../components/Blog/RecommendPost";

const Blog: NextPage = () => {
  return (
    <Container>
      <RecommendPost />
    </Container>
  );
};

export default Blog;
