import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import type { ParsedUrlQuery } from "querystring";

import { getAllPostIds, getPostData } from "../../lib/posts";
import type { PostDataWithHtml } from "../../lib/posts";

interface PostProps {
  postData: PostDataWithHtml;
}

interface PostStatic extends ParsedUrlQuery {
  id: string;
}

const Post: NextPage<PostProps> = ({ postData }) => {
  return (
    <div>
      <div>{postData.date}</div>
      <div>{postData.id}</div>
      <div>{postData.title}</div>
      <div>{postData.subtitle}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params as PostStatic;
  const postData = await getPostData(id);

  return {
    props: {
      postData,
    },
  };
};

export default Post;
