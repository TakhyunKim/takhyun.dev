import Image from "next/image";

import { getSortedPostsAndProjectsData } from "../common/utils/posts";

import NotFoundHeader from "../components/NotFound/Header";
import RecentPosts from "../components/Home/RecentPosts";

import styles from "../styles/NotFound.module.css";

const POSTING_VIEW_COUNT = 3;

const NotFound = () => {
  const recentPosts = getSortedPostsAndProjectsData().slice(
    0,
    POSTING_VIEW_COUNT
  );

  return (
    <>
      <div className={styles.header_wrapper}>
        <div className={styles.intro_profile}>
          <Image fill src="/images/intro-profile.jpg" alt="intro profile" />
        </div>
        <NotFoundHeader />
      </div>
      <RecentPosts postList={recentPosts} />
    </>
  );
};

export default NotFound;
