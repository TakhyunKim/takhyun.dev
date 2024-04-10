import { getSortedPostsData } from "@/common/utils/posts";

import AlgorithmPostList from "./AlgorithmPostList";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "알고리즘 포스팅",
  description: "문제 풀이를 기록한 포스팅",
};

const Algorithms = () => {
  const allAlgorithmsData = getSortedPostsData({ postType: "algorithms" });
  console.log(allAlgorithmsData);
  return <AlgorithmPostList algorithmPostList={allAlgorithmsData} />;
};

export default Algorithms;
