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
      <PostList postType="posts" postList={allPostsData} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData({ postType: "posts" });

  return {
    props: {
      allPostsData,
    },
  };
};

export default Posts;
