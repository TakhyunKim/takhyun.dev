import type { NextPage, GetStaticProps } from "next";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import PostList from "../components/Blog/PostList";
import RecommendPost from "../components/Blog/RecommendPost";

interface BlogProps {
  allPostsData: PostData[];
}

const Blog: NextPage<BlogProps> = ({ allPostsData }) => {
  return (
    <Container>
      <RecommendPost />
      <PostList allPostsData={allPostsData} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

export default Blog;
