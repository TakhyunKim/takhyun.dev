import type { NextPage, GetStaticProps } from "next";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import PostList from "../components/PostList";

interface PostsProps {
  allPostsData: PostData[];
}

const Posts: NextPage<PostsProps> = ({ allPostsData }) => {
  return (
    <Container>
      <PostList postList={allPostsData} />
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

export default Posts;
