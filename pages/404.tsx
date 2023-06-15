import type { NextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { getSortedPostsAndProjectsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import NotFoundHeader from "../components/NotFound/NotFoundHeader";
import RecentPosts from "../components/Home/RecentPosts";

import styles from "./styles/notFound.module.css";

interface NotFoundProps {
  recentPosts: PostData[];
}

const NotFound: NextPage<NotFoundProps> = ({ recentPosts }) => {
  return (
    <>
      <NextSeo
        title="Takhyun Kim & Frontend Engineer"
        description="프론트엔드 개발자 김탁현의 기술 블로그"
      />
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

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = getSortedPostsAndProjectsData().slice(0, 3);

  return {
    props: {
      recentPosts,
    },
  };
};

export default NotFound;
