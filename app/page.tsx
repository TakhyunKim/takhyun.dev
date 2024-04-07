import Introduce from "@/components/Home/Introduce";
import PostList from "@/common/components/PostList";

import { getSortedPostsAndProjectsData } from "@/common/utils/posts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김탁현의 개발 블로그",
  description: "프론트엔드 개발자 김탁현의 개발 블로그입니다",
};

const Home = () => {
  const recentPosts = getSortedPostsAndProjectsData();

  return (
    <>
      <Introduce />
      <PostList postList={recentPosts} />
    </>
  );
};

export default Home;
