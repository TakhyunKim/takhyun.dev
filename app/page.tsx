import Introduce from "../components/Home/Introduce";
import RecentPosts from "../components/Home/RecentPosts";

import { getSortedPostsAndProjectsData } from "../common/utils/posts";

import type { Metadata } from "next";

const POSTING_VIEW_COUNT = 3;

export const metadata: Metadata = {
  title: "김탁현의 개발 블로그",
  description: "프론트엔드 개발자 김탁현의 개발 블로그입니다",
};

const Home = () => {
  const recentPosts = getSortedPostsAndProjectsData().slice(
    0,
    POSTING_VIEW_COUNT
  );

  return (
    <>
      <Introduce />
      <RecentPosts postList={recentPosts} />
    </>
  );
};

export default Home;
