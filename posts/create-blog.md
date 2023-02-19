---
title: "Next js로 개인 블로그 만들기"
subtitle: "왜 만들었고, 어떻게 만들었을까?"
date: "2022-08-20"
thumbnailUrl: "/images/createBlog/thumbnail.jpg"
tag: "react,next.js,typescript"
description: "next js 로 개인 블로그 만들기 (with Typescript)"
postingType: "posts"
---

기술 블로그를 만들고 싶었고, 현재 블로그는 [next.js](https://nextjs.org/) 로 만들었습니다.<br />
next.js 를 사용해보고 싶었고, SEO, SSR, SSG 등을 문서를 보고 이해하는 것이 아닌 <br />
직접 코드를 짜면서 확인해보고 싶은 니즈가 있었습니다.

이와 더불어 공부한 내용을 기록하는 것을 즐겨하는데, Notion 이 아닌 개인 기술 블로그로 작성하면 <br />
위에서 언급한 니즈와 기록한 것들을 직관적으로 확인할 수 있다는 점에서 <br />
더 좋은 효과를 가져올 수 있을 것 같아서 만들게 되었습니다.<br />

빠르게 결과물을 만들기 위해 공식 문서 기준으로 간단하게 구성해보았습니다.<br />
앞으로 보완해야할 것들이 많다고 생각하기에 앞으로도 공부하면서 계속 계선해나갈 생각입니다.

🙏 **아래 글에서 스타일에 대한 내용은 다루지 않습니다!**

> 개인 블로그 내 추가하고 싶은 것!
>
> - 공부한 글 모으기
> - project 모으기
> - 특별한 개인 소개 페이지 구성

## 어떻게 만들까?

마크다운으로 글을 작성하고, 이를 트래킹해서 화면 상에 표기하는 방식으로 진행했습니다.<br />
위 방식은 github 으로 블로그를 구성할 때 진행해보았던 방식입니다.<br />
아래 내용은 공식 문서 내용을 토대로 작성했기에 아래 첨부된 링크를 통해 보셔도 좋습니다!

## 프로젝트 구성

처음 시작은 [next.js Docs](https://nextjs.org/docs/getting-started) 를 참고하여 `create-next-app` 을 통해 구성했습니다. <br />
저는 `typescript` 를 사용하기에 `--typescript` 를 추가했습니다.<br />
타입스크립트를 사용하지 않을 경우 이를 삭제하면 됩니다.

```bash
yarn create next-app project-name --typescript
```

## 페이지 구성

블로그 글 작성하는 것이 목적이므로 `Home(index)`, `Blog` 두 페이지로 구성했습니다. <br />
이를 위해 `pages/blog.tsx` 를 추가했습니다. <br />
그리고 간단하게 페이지를 구분하기 위해 아래와 같이 코드를 구성했습니다.

```tsx
// pages/index.tsx
const Home = () => {
  return <div>Home</div>;
};

export default Home;
```

```tsx
// pages/blog.tsx
const Blog = () => {
  return <div>Blog</div>;
};

export default Blog;
```

## Navigation 구성

추후 원활한 링크 관리를 위해 아래와 같이 `link list` 를 구성했습니다.

```ts
type NavLink = { title: string; link: string };

const navLinks: NavLink[] = [{ title: "Blog", link: "/blog" }];

export default navLinks;
```

위에서 추가한 `Link` 는 [next.js docs](https://nextjs.org/docs/api-reference/next/link) 를 참고하여 아래와
같이 component 를 구성했습니다.<br />

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import navLinks from "../../common/routes";

import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.wrapper}>
      {navLinks.map((nav) => (
        <Link href={nav.link} key={nav.title}>
          <a>{nav.title}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
```

## 기본 레이아웃 구성

head 즉 title 을 추가하고, header 내에서 Nav component 를 적용했습니다. <br />
main 태그 내에서는 props 내 chidren 을 적용합니다.<br />
더불어 Footer component 를 적용해서 각 페이지에 대한 레이아웃을 구성했습니다.<br />
(Footer 는 위 글에서 다루지 않았습니다.)

```tsx
import type { ReactNode } from "react";
import Head from "next/head";

import Nav from "../Nav";
import Footer from "../Footer";

import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <div>
      <Head>
        <title>takhyun blog</title>
      </Head>
      <div>
        <header>
          <Nav />
        </header>
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Container;
```

## 마크다운 파일으로 blog post 페이지 구성

아래 내용은 [next.js 공식 문서 data-fetching](https://nextjs.org/learn/basics/data-fetching/blog-data) 을 참고했습니다.

블로그 글을 작성하기 위해 `root 디렉터리` 에서 `posts 디렉터리`를 만듭니다.<br />
posts 디렉터리 내에서는 작성하고 싶은 블로그 post 글을 md 파일로 만들 예정입니다. <br />
간단하게 아래와 같은 md 파일을 만들어보았습니다 :)

```
---
title: "나의 첫 번째 블로그 post"
date: "2022-08-20"
---

신난당 완전 신난당
```

> 각 md 파일 상단에 있는 `title`, `date` 는 `YAML Front Matter` 이라고 합니다.<br />
> 이는 [gray-matter](https://github.com/jonschlinkert/gray-matter) 라이브러리를 통해 구문 분석이 가능합니다.

마크다운에서 작성하게될 `title`, `date` 을 구문 분석하기 위해 아래 라이브러리를 설치했습니다.

```bash
yarn add gray-matter
```

저는 이 밖에 썸네일, tag 기능을 활용하고 싶어서 아래와 같이 md 파일 상단 field 를 추가했습니다.

```
---
title: "Next js로 개인 블로그 만들기"
subtitle: "왜 만들었고, 어떻게 만들었을까?"
date: "2022-08-20"
thumbnailUrl: "/images/desktop.jpg"
tag: "react,next.js,typescript"
---
```

### 어떻게 마크다운 blog post 페이지로 전달할 수 있을까요?

> util function 의 목적?
>
> - posts 디렉토리 내에서 md 파일을 추출합니다.
> - 주어진 경로를 `grey-matter` 기반으로 `matterResult` 를 가져옵니다.
> - Post Data interface 에 맞춰서 값을 return 합니다.
> - 이 후 sort method 를 통해 날짜 기반으로 배열을 순차적으로 재배치입니다.

```ts
interface PostData {
  id: string;
  date: string;
  title: string;
  tagList: string[];
  subtitle: string;
  thumbnailUrl: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
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
```

### 각 Post 별로 데이터를 어떻게 가져올 수 있을까요?

> util function 의 목적
>
> - 전달받은 id 기반으로 full path 를 가져옵니다.
> - 해당 파일 내 content 를 읽습니다.
> - 이를 mdx 파일로 읽어내고, 블로그에 쓸 수 있는 값을 반환하고 있습니다.

```ts
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id: string) => {
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
```

위에 util function 를 통해 post data 를 각 포스팅의 `getStaticProps` 로 전달하고자 합니다.

### 그럼 위 데이터를 어떻게 post component 에 어떻게 적용할 수 있을까요?

Post 를 만들어보겠습니다. `pages/posts/[id].tsx` 로 만들어보았습니다. <br />
`getStaticProps` 내에서 위에서 추가한 `getPostData` 를 통해 데이터를 가져왔습니다. <br />
이를 Post component 의 props 로 전달했습니다.

위 방식은 [next.js dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) 를 적용했습니다.

> getStaticPaths?
>
> - 동적 라우팅을 사용할 때, 어떤 페이지를 미리 Static으로 빌드할지 정할 때 사용합니다.

> getStaticProps?
>
> - 빌드 시 데이터를 fetch하여 static 페이지를 생성하는 목적으로 사용합니다.

```tsx
import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Image from "next/image";
import type { ParsedUrlQuery } from "querystring";
import { MDXRemote } from "next-mdx-remote";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { PostDataWithHtml } from "../../lib/posts";

import Container from "../../components/Container";

interface PostProps {
  postData: PostDataWithHtml;
}

interface PostStatic extends ParsedUrlQuery {
  id: string;
}

const Post: NextPage<PostProps> = ({
  postData: { title, subtitle, date, mdxSource, thumbnailUrl },
}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <div>{date}</div>
      <div>
        <Image alt="thumbnail" src={thumbnailUrl} layout="fill" />
      </div>
      <div>
        <MDXRemote {...mdxSource} />
      </div>
    </Container>
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
```

## 이번 블로그 만들기를 진행하면서 느낀점!

이번 블로그 만들기는 next.js docs 기반으로 만들었습니다.<br />
`getStaticProps`, `getStaticPaths`, `dynamic routes` 를 어떻게 활용하는지<br />
직접 사용해보면서 알 수 있었습니다.

다만 보면서 어떻게 쓰는지 따라치고, 다음 step 으로 넘어가기 바빠 아직까진 위 내용들이<br />
어떻게 동작하고 사용하지 않을 경우 어떤 동작 방식을 하는지 자세히 못본 점은 아쉽습니다.<br />
아쉬움을 달래기위해 이 후 관련해서 공부, 정리하여 포스팅을 올려볼 예정입니다.

지금 **블로그 만들기는 `next.js 공부하기` 라는 목적보다는 후딱후딱 만들어보면서 간략하게 어떤 기능들이**<br />
**있는지 살펴보고, 즐거움을 느껴보기 위한 목적이 컸습니다.**<br />

**글 초기에 작성했던 공부한 내용들을 그룹화하는 목적의 블로그를 즐겁게 만들고 싶었고**<br />
**자유롭게 제가 개발하여 채워나갈 수 있는 하나의 창작 공간으로 활용하고 싶었습니다.**

그런 목적에서 이번 블로그 만들기는 굉장히 만족도가 높았습니다.<br />
기술적인 챌린지는 아직 초반이라 많이 없었지만 아래와 같은 고민을 하면서 굉장히 즐거웠습니다.

> post 에 대한 레이아웃을 어떻게 구성해야 보다 시각적으로 편할까?

요 부분도 많은 고민을 했습니다 ㅠㅠ.. 어떻게 레이아웃을 구성해야 조금더 편하게 보일 수 있을지?<br />
사실 아직 좋은 방향성인지는 모르겠습니다.<br />

주변 사람들에게 보여주면서 `어떤 레이아웃이 좀 더 보기 편한지?` `Title 이 부각되는지?` 에 대한<br />
질문을 했었고, 이를 통해 지금과 같은 레이아웃을 구성하게 되었습니다.

### 첫 번째 레이아웃

썸네일이 차지하는 비율이 너무 크고,<br />
이미지들이 부각될 경우 시각적으로 보기 어려울 것 같아서 변경하고자 했습니다.
<img width="50%" alt="first-layout" src="/images/createBlog/first-layout.jpg" />

### 두 번째 레이아웃

이건 포스팅이 많을 경우, 경계선이 존재하지 않아 보는 유저에게 <br />
눈의 피로도를 높일 수 있을 것 같다는 생각을 했습니다.<br />
이와 같은 이유로 다시 변경하고자 했습니다.
<img width="50%" alt="second-layout" src="/images/createBlog/second-layout.jpg" />

### 세 번째 레이아웃

현재의 레이아웃이며, tag, title, thumbnail 을 효과적으로 보여줄 수 있다고 생각합니다.<br />
이와 더불어 명확한 경계선을 통해 구분된 레이아웃을 제공하여 두 번째 레이아웃의 단점을 해결해줄 수 있다고 생각합니다.
<img width="50%" alt="last-layout" src="/images/createBlog/last-layout.jpg" />

> header 를 상단에 계속 고정하는 것이 좋을까? 스크롤해서 올라가긴 귀찮은데?<br />

header 에 존재하는 navigation 기능을 활용하고 싶은 경우 <br />
내려왔던 스크롤을 다시 올려야하기에 굉장히 번거롭게 느껴졌습니다.<br />

하지만 header 로 인해 포스팅 내용이 가려지는 것은 블로그의 특성상 내용을 보고자하는 목적을 많이<br />
훼손시킬 우려가 있기에 유저 경험성을 더욱 떨어뜨리는 방식이라고 생각을 했고<br />
**현재 적용한 방식처럼 우측 하단에 up scroll 버튼을 추가했습니다.**

스크롤을 유저가 직접 올려서 사용하지 않아도 괜찮고, 포스팅 내용을 가리지 않기에 좋은 방식이라는 생각이 듭니다. :D

위 기능이 없었을 때는 navigation 기능을 활용하기 위해 매번 스크롤을 해야했고,<br />
이게 귀찮아서 이전 페이지로 이동 후 해당 기능을 활용하곤 했습니다.

어떻게 보면 이 블로그라는 프로젝트 내에서 가장 간단하고 구현하기 쉬운 기능이였지만<br />
추가하고 난 후엔 가장 편한 기능으로 느껴졌습니다.

첫 글이기도하고 아직 부족한 점은 많은 것 같습니다.<br />
기록하기 위해서 만들었고 더 좋은 글을 작성하기 위해 노력하겠습니당!
