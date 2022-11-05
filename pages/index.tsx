import type { NextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { getSortedPostsAndProjectsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import Introduce from "../components/Home/Introduce";
import RecentPosts from "../components/Home/RecentPosts";

interface HomeProps {
  recentPosts: PostData[];
}

const Home: NextPage<HomeProps> = ({ recentPosts }) => {
  return (
    <Container>
      <Introduce />
      <NextSeo
        title="Takhyun Kim & Frontend Engineer"
        description="프론트엔드 개발자 김탁현의 기술 블로그"
        openGraph={{
          type: "website",
          url: "https://takhyun.dev",
          title: "Takhyun Kim 기술 블로그",
          description: "프론트엔드 개발자 김탁현의 기술 블로그",
          images: [
            {
              url: "https://takhyun.dev/images/intro-profile.jpg",
              width: 400,
              height: 800,
              alt: "takhyun Kim profile image",
            },
          ],
        }}
      />
      <RecentPosts postList={recentPosts} />
    </Container>
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

export default Home;
