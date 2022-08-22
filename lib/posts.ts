import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { MarkdownPost } from "../common/types/markdownPost";

export interface PostData {
  id: string;
  date: string;
  title: string;
  tagList: string[];
  subtitle: string;
  thumbnailUrl: string;
}

export interface PostDataWithHtml extends PostData {
  contentHtml: string;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

interface PostType {
  postType: MarkdownPost;
}

interface PostDataParams {
  id: string;
  postType: MarkdownPost;
}

export const getSortedPostsData = ({ postType }: PostType) => {
  const postsDirectory = path.join(process.cwd(), postType);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const tagList = matterResult.data?.tag.split(",");

    return {
      id,
      tagList,
      ...matterResult.data,
    } as PostData;
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllPostIds = ({ postType }: PostType) => {
  const postsDirectory = path.join(process.cwd(), postType);
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async ({ postType, id }: PostDataParams) => {
  const postsDirectory = path.join(process.cwd(), postType);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const mdxSource = await serialize(matterResult.content);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const tagList = matterResult.data?.tag.split(",");

  return {
    id,
    tagList,
    mdxSource,
    contentHtml,
    ...(matterResult.data as { title: string; date: string }),
  };
};
