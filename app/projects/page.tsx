import PostList from "../../common/components/PostList";

import { getSortedPostsData } from "../../common/utils/posts";

const Projects = () => {
  const allProjectsData = getSortedPostsData({ postType: "projects" });

  return <PostList postList={allProjectsData} />;
};

export default Projects;
