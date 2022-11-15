import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import PostList from "../components/PostList";

interface ProjectsProps {
  allProjectsData: PostData[];
}

const Projects: NextPage<ProjectsProps> = ({ allProjectsData }) => {
  return (
    <>
      <NextSeo
        title="Takhyun Kim 프로젝트 목록"
        description="개인 프로젝트를 확인할 수 있는 페이지입니다"
        openGraph={{
          type: "website",
          title: "Takhyun Kim 프로젝트 목록",
          description: "개인 프로젝트를 확인할 수 있는 페이지입니다",
          url: "https://takhyun.dev/projects",
          images: [
            {
              url: "https://takhyun.dev/images/habitTree/habitTree.gif",
              width: 800,
              height: 400,
              alt: "blog posts image",
            },
          ],
        }}
      />
      <PostList postList={allProjectsData} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allProjectsData = getSortedPostsData({ postType: "projects" });

  return {
    props: {
      allProjectsData,
    },
  };
};

export default Projects;
