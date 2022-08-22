import type { GetStaticProps, NextPage } from "next";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import PostList from "../components/PostList";

interface ProjectsProps {
  allProjectsData: PostData[];
}

const Projects: NextPage<ProjectsProps> = ({ allProjectsData }) => {
  return (
    <Container>
      <PostList postType="projects" postList={allProjectsData} />
    </Container>
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
