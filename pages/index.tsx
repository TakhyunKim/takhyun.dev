import type { NextPage } from "next";

import Container from "../components/Container";
import Introduce from "../components/Home/Introduce";
import RecentPosts from "../components/Home/RecentPosts";

const Home: NextPage = () => {
  return (
    <Container>
      <Introduce />
      <RecentPosts />
    </Container>
  );
};

export default Home;
