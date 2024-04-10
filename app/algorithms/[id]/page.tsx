import { getAllPostIds, getPostData } from "@/common/utils/posts";

import MDXRemote from "@/common/components/MDXRemote";
import TopScrollButton from "@/common/components/TopScrollButton";
import TableOfContents from "@/common/components/TableOfContents";

import styles from "./page.module.css";

import type { Metadata } from "next";
import type { Params } from "@/common/types/params";

const getPost = async (params: Params) => {
  const postData = await getPostData({ postType: "algorithms", id: params.id });

  return postData;
};

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { title, description, tagList } = await getPost(params);

  return {
    title,
    description,
    keywords: tagList,
  };
};

export const generateStaticParams = async () => {
  const allPostIds = getAllPostIds({ postType: "algorithms" });

  return allPostIds;
};

const AlgorithmPost = async ({ params }: { params: Params }) => {
  const { date, title, mdxSource, tableOfContents } = await getPost(params);

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.date}>{date}</div>
      <div className={styles.html_wrapper}>
        <MDXRemote {...mdxSource} />
      </div>
      <TopScrollButton />
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  );
};

export default AlgorithmPost;
