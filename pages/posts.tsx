import type { NextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { getSortedPostsData } from "../lib/posts";
import type { PostData } from "../lib/posts";

import Container from "../components/Container";
import PostList from "../components/PostList";

interface PostsProps {
  allPostsData: PostData[];
}

const Posts: NextPage<PostsProps> = ({ allPostsData }) => {
  return (
    <Container>
      <NextSeo
        title="Takhyun Kim 포스팅 목록"
        description="기술, 개인 일상 관련 포스팅을 작성했습니다"
        openGraph={{
          type: "website",
          title: "Takhyun Kim 포스팅 목록",
          url: "https://takhyun.dev/posts",
          description: "기술, 개인 일상 관련 포스팅을 작성했습니다",
          images: [
            {
              url: "https://takhyun.dev/images/firstYear/bird.jpg",
              width: 800,
              height: 400,
              alt: "blog posts image",
            },
          ],
        }}
      />
      <PostList postType="posts" postList={allPostsData} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData({ postType: "posts" });

  return {
    props: {
      allPostsData,
    },
  };
};

export default Posts;
