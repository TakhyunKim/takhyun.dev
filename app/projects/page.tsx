import Head from "next/head";

import PostList from "@/common/components/PostList";

import { getSortedPostsData } from "@/common/utils/posts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 포스팅",
  description: "프로젝트의 과정을 작성한 포스팅",
};

const Projects = () => {
  const allProjectsData = getSortedPostsData({ postType: "projects" });

  return (
    <>
      <Head>
        <title>프로젝트</title>
      </Head>
      <PostList postList={allProjectsData} />
    </>
  );
};

export default Projects;
