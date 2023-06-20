import Introduce from "../components/Home/Introduce";
import RecentPosts from "../components/Home/RecentPosts";

import { getSortedPostsAndProjectsData } from "../common/utils/posts";

const POSTING_VIEW_COUNT = 3;

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
