import { useEffect } from "react";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
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

import TopScrollButton from "../../components/Posts/TopScrollButton";
import TableOfContents from "../../components/Posts/TableOfContents";

import styles from "../styles/post.module.css";

interface PostProps {
  postData: PostDataWithHtml;
}

interface PostStatic extends ParsedUrlQuery {
  id: string;
}

const components = {
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    if (!props.alt || !props.src) return null;

    const substrings = props.alt.split("{");
    const alt = substrings[0].trim();
    const imgInfo = substrings[1];

    const imgWidth = imgInfo
      .match(/w:\s\d+/g)
      ?.map((match) => match.replace("w: ", ""));
    const imgHeight = imgInfo
      .match(/h:\s\d+/g)
      ?.map((match) => match.replace("h: ", ""));
    const parentImgWidth = imgInfo
      .match(/parentW:\s\d+/g)
      ?.map((match) => match.replace("parentW: ", ""));

    const width = imgWidth ? imgWidth[0] : 600;
    const height = imgHeight ? imgHeight[0] : 300;

    const parentWidth = parentImgWidth ? parentImgWidth[0] : "50";

    return (
      <span style={{ display: "block", width: `${parentWidth}%` }}>
        <Image
          src={props.src}
          alt={alt}
          width={width}
          height={height}
          layout="responsive"
        />
      </span>
    );
  },
};

const Post: NextPage<PostProps> = ({
  postData: {
    date,
    title,
    tagList,
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
    <>
      <NextSeo
        title={title}
        description={description}
        additionalMetaTags={[
          {
            name: "keywords",
            content: `포스팅, 프론트엔드, 프론트엔드 개발자, 개발 블로그, 프론트엔드 개발 블로그, 프론트엔드 개발자 김탁현, 김탁현 개발 블로그`,
          },
          {
            name: "author",
            content: "김탁현",
          },
        ]}
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
        <Image priority alt="thumbnail" src={thumbnailUrl} layout="fill" />
      </div>
      <div className={styles.html_wrapper}>
        <MDXRemote components={components} {...mdxSource} />
      </div>
      <TopScrollButton />
      <TableOfContents tableOfContents={tableOfContents} />
    </>
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
