import { useEffect } from "react";
import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Image from "next/image";
import type { ParsedUrlQuery } from "querystring";
import { MDXRemote } from "next-mdx-remote";
import hljs from "highlight.js";
import { NextSeo } from "next-seo";

import "highlight.js/styles/vs2015.css";

import { getAllPostIds, getPostData } from "../../lib/posts";
import type { PostDataWithHtml } from "../../lib/posts";

import Container from "../../components/Container";
import TopScrollButton from "../../components/Posts/TopScrollButton";
import TableOfContents from "../../components/Posts/TableOfContents";

import styles from "../styles/post.module.css";

interface PostProps {
  postData: PostDataWithHtml;
}

interface PostStatic extends ParsedUrlQuery {
  id: string;
}

const Post: NextPage<PostProps> = ({
  postData: {
    date,
    title,
    subtitle,
    mdxSource,
    description,
    thumbnailUrl,
    tableOfContents,
  },
}) => {
  useEffect(() => {
    hljs.highlightAll();
    hljs.configure({ ignoreUnescapedHTML: true });
  }, []);

  return (
    <Container>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          title,
          description,
          images: [
            {
              url: `https://takhyun.dev${thumbnailUrl}`,
              width: 800,
              height: 400,
              alt: `${title} image`,
            },
          ],
        }}
      />
      <h1 className={styles.title}>{title}</h1>
      <h3>{subtitle}</h3>
      <div className={styles.date}>{date}</div>
      <div className={styles.thumbnail_wrapper}>
        <Image alt="thumbnail" src={thumbnailUrl} layout="fill" />
      </div>
      <div className={styles.html_wrapper}>
        <MDXRemote {...mdxSource} />
      </div>
      <TopScrollButton />
      <TableOfContents tableOfContents={tableOfContents} />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds({ postType: "posts" });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params as PostStatic;
  const postData = await getPostData({ postType: "posts", id });

  return {
    props: {
      postData,
    },
  };
};

export default Post;
