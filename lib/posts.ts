import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { MarkdownPost } from "../common/types/markdownPost";

export interface TableOfContent {
  text: string;
  link: string;
}

export interface TableOfContents {
  text: string;
  link: string;
  items: TableOfContent[];
}

export interface PostData {
  id: string;
  date: string;
  title: string;
  tagList: string[];
  subtitle: string;
  description: string;
  thumbnailUrl: string;
  postingType: MarkdownPost;
}

export interface PostDataWithHtml extends PostData {
  contentHtml: string;
  tableOfContents: TableOfContents[];
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

export const getPostingData = ({ postType }: PostType) => {
  const postingDirectory = path.join(process.cwd(), postType);
  const postingFileNames = fs.readdirSync(postingDirectory);

  const allPostsData = postingFileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const tagList = matterResult.data?.tag.split(",");

    return {
      id,
      tagList,
      ...matterResult.data,
    } as PostData;
  });

  return allPostsData;
};

export const getSortedPostsAndProjectsData = () => {
  const allPostsData = getPostingData({ postType: "post" });
  const allProjectsData = getPostingData({ postType: "project" });

  const allPostsAndProjectsData = [...allPostsData, ...allProjectsData];

  return allPostsAndProjectsData.sort((a, b) => {
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

export const getHeadingInfo = (
  heading: string,
  postHeading: "h2" | "h3"
): TableOfContent => {
  const headingText = heading
    .replace(`<${postHeading}>`, "")
    .replace(`</${postHeading}>`, "");
  const link = "#" + headingText.replaceAll(" ", "-").toLowerCase();

  return { text: headingText, link };
};

export const getHeadings = (source: string): TableOfContents[] => {
  const headings: TableOfContents[] = [];
  const matchOfSourceList = source.match(/<h[2-3]>(.*?)<\/h[2-3]>/g);

  if (!matchOfSourceList) return headings;

  matchOfSourceList.forEach((heading) => {
    if (heading.includes("h2")) {
      const tableOfContent = getHeadingInfo(heading, "h2");

      headings.push({ ...tableOfContent, items: [] });
    } else {
      const tableOfContent = getHeadingInfo(heading, "h3");

      headings[headings.length - 1].items.push(tableOfContent);
    }
  });

  return headings;
};

export const getPostData = async ({ postType, id }: PostDataParams) => {
  const postsDirectory = path.join(process.cwd(), postType);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };

  const matterResult = matter(fileContents);
  const mdxSource = await serialize(matterResult.content, options);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const tableOfContents = getHeadings(contentHtml);
  const tagList = matterResult.data?.tag.split(",");

  return {
    id,
    tagList,
    mdxSource,
    contentHtml,
    tableOfContents,
    ...(matterResult.data as { title: string; date: string }),
  };
};
