import Image from "next/image";

import { getAllPostIds, getPostData } from "../../../common/utils/posts";

import MDXRemote from "../../../common/components/MDXRemote";
import TopScrollButton from "../../../common/components/TopScrollButton";
import TableOfContents from "../../../common/components/TableOfContents";

import styles from "./project.module.css";

import type { Params } from "../../../common/types/params";

const getProject = async (params: Params) => {
  const postData = await getPostData({ postType: "projects", id: params.id });

  return postData;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const allPostIds = getAllPostIds({ postType: "projects" });

  return allPostIds;
};

const Project = async ({ params }: { params: Params }) => {
  const { date, title, subtitle, mdxSource, thumbnailUrl, tableOfContents } =
    await getProject(params);

  return (
    <>
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
    </>
  );
};

export default Project;
