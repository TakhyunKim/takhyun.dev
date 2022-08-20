import type { NextPage, GetStaticProps } from "next";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import Introduce from "../components/Home/Introduce";
import RecentPosts from "../components/Home/RecentPosts";

interface HomeProps {
  recentPosts: PostData[];
}

const Home: NextPage<HomeProps> = ({ recentPosts }) => {
  return (
    <Container>
      <Introduce />
      <RecentPosts postList={recentPosts} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return {
    props: {
      recentPosts,
    },
  };
};

export default Home;
