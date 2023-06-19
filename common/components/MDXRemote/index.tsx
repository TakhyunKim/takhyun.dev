"use client";

import { useEffect } from "react";
import Image from "next/image";
import hljs from "highlight.js";
import { MDXRemote as MDXRemoveElement } from "next-mdx-remote";

import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import type { MDXRemoteProps } from "next-mdx-remote";

import "highlight.js/styles/atom-one-dark.css";

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

    const width = imgWidth ? Number(imgWidth[0]) : 600;
    const height = imgHeight ? Number(imgHeight[0]) : 300;

    const parentWidth = parentImgWidth ? parentImgWidth[0] : "50";

    return (
      <span style={{ display: "block", width: `${parentWidth}%` }}>
        <Image
          src={props.src}
          alt={alt}
          width={width}
          height={height}
          // TODO: responsive 삭제 필요
          layout="responsive"
        />
      </span>
    );
  },
};

const MDXRemote = (props: MDXRemoteProps) => {
  useEffect(() => {
    hljs.highlightAll();
    hljs.configure({ ignoreUnescapedHTML: true });
  }, []);

  return <MDXRemoveElement components={components} {...props} />;
};

export default MDXRemote;
