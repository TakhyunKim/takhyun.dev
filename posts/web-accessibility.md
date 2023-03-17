---
title: "SEO, 웹 접근성 얕게 적용해보기"
subtitle: "SEO, 웹 접근성 적용"
date: "2022-09-13"
thumbnailUrl: "/images/webAccessibility/thumbnail.jpg"
tag: "SEO,웹접근성,web dev"
description: "SEO, 웹 접근성을 얕게 적용해보았습니다."
postingType: "post"
---

저는 무언가를 만들고 성능 테스트하는 것을 굉장히 좋아합니다.<br />
이번 블로그도 만들자마자 성능 테스트를 해보았습니다.<br />
웹 성능 테스트는 [web.dev 의 measurement](https://web.dev/measure) 를 통해 진행했습니다.

> 이번 포스팅에서 다룰 내용
>
> - [next-seo 패키지](https://github.com/garmeeh/next-seo#readme)로 SEO 적용하기
> - next.js 초기 셋업을 하면서 놓쳤던 html lang 속성 적용하기 (웹접근성)
> - light mode text color 명암비 이슈 (웹접근성)

<img width="50%" loading="lazy" alt="measurement my blog" src="/images/webAccessibility/measurement.jpg" />
위 포스트를 작성하는 시점에서 이미 SEO 에 대한 조치는 했기에 위 이미지와 같은 측정값이 나오게 되었습니다.<br />
그럼 이번에 적용한 SEO 부터 다뤄보겠습니다.

## SEO 적용해보기

**SEO** 는 워낙 방대하고 좋은 자료가 많기에 이번 글에서는 SEO 가 무엇인지 왜 적용해야하는지에 대한 내용을 다루지 않습니다!<br />
여기서는 정말 얕게 적용한 경험을 적어보려합니다.<br />

저는 SEO 적용을 위해 [next-seo 패키지](https://github.com/garmeeh/next-seo#readme) 를 사용했습니다.<br />
위 패키지를 사용하면 굉장히 간단하게 `title`, `description` 설정을 할 수 있습니다. <br />
간단하게 예시 코드를 작성해보겠습니다.<br />

```tsx
import { NextSeo } from "next-seo";

import Container from "../components/Container";

const Posts = () => {
  return (
    <Container>
      <NextSeo
        title="Takhyun Kim 포스팅 목록"
        description="기술, 개인 일상 관련 포스팅을 작성했습니다"
      />
    </Container>
  );
};
```

이렇게 적용하게 되면 실제 html 에서는 아래 이미지처럼 확인하실 수 있습니다.
<img width="40%" alt="meta-title-description" src="/images/webAccessibility/meta-title-description.jpg" />

사실 저는 여기까지만 하면 끝이라고 생각했는데, 제가 사용한 [라이브러리를 보면서 `openGraph` 설정](https://github.com/garmeeh/next-seo#add-seo-to-page)을 추가하게 되었습니다.<br />
_(이번에도 개념 설명은 생략하겠습니다)_<br />

`openGraph` 설정을 하기 전, 저의 블로그 링크를 카카오톡으로 공유할 시 아래와 같이 표기되었습니다.<br />
<img width="40%" loading="lazy" alt="prev-open-graph" src="/images/webAccessibility/prev-open-graph.jpg" />
별다른 내용이 보이지 않고, 예전에 title 로 지정했던 takhyun blog 만 확인할 수 있습니다.

이게 왜 필요할지 생각해보면, 보통 카톡으로 URL 을 주고 받을 때(특히 유튜브 영상과 같은?)<br />
저는 썸네일과 제목을 보고 흥미를 느끼고 보는 경우가 많았습니다. 유저 입장에선 URL 에서 볼 수 있는 정보가 한정적이니깐요.<br />
그런 면에 있어, `openGraph` 를 적용하지 않은 제 블로그는 링크를 전달 받았을 때 별로 들어가고 싶지 않을 것 같았습니다.

그래서! 생각보다 간단해보이기도 하고 바로 적용해보았습니다.

```tsx
import { NextSeo } from "next-seo";

import Container from "../components/Container";

const Home = () => {
  return (
    <Container>
      <NextSeo
        title="Takhyun Kim & Frontend Engineer"
        description="프론트엔드 개발자 김탁현의 기술 블로그"
        openGraph={{
          type: "website",
          url: "https://takhyun.dev",
          title: "Takhyun Kim 기술 블로그",
          description: "프론트엔드 개발자 김탁현의 기술 블로그",
          images: [
            {
              url: "https://takhyun.dev/images/intro-profile.jpg",
              width: 400,
              height: 800,
              alt: "takhyun Kim profile image",
            },
          ],
        }}
      />
    </Container>
  );
};
```

이렇게 `openGraph prop` 에서 **title**, **url**, **description**, **images** 를 적용했습니다.<br />
이렇게 적용해본 결과 아래와 같이 더욱 상세한 내용을 확인할 수 있게 되었습니다.

<img width="40%" loading="lazy" alt="after-open-graph" src="/images/webAccessibility/after-open-graph.jpg" />

그 밖에도 post page 에도 openGraph 를 적용해본 결과 아래와 같이 썸네일, Title, 설명을 확인할 수 있게 되었습니다.
<img width="40%" loading="lazy" alt="open-graph-dark-light-mode" src="/images/webAccessibility/open-graph-dark-light-mode.jpg" />

## html lang 속성 적용하기 (웹접근성)

웹 접근성에 대한 측정을 할 때 짚어준 내용 중 하나인 국제화, 현지화에 대한 이슈를 해결하고자<br />
html tag 에 lang 속성을 적용했습니다. 아래엔 web 측정 시 표기된 내용입니다.

<img width="50%" loading="lazy" alt="html-lang" src="/images/webAccessibility/html-lang.jpg" />

이는 간단하게 `_document.tsx` 파일에서 Html component 의 lang prop 을 통해 지정하여 해결했습니다.

```tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

import { setInitialTheme } from "../lib/setInitialTheme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## light mode text color 명암비 이슈 (웹접근성)

이 외에도 웹 접근성에서 하나 이슈가 된 것은 배경색과 글자색 간 명암비였습니다.
<img width="40%" loading="lazy" alt="background-text-color" src="/images/webAccessibility/background-text-color.jpg" />

위 이미지를 보시면 아시겠지만, Light mode 일 때 일부 글자색이 잘 보이지 않는 이슈가 있습니다.<br />
이를 해결하기 위해 역시 간단하게 텍스트 color 를 변경했습니다!

<img width="40%" loading="lazy" alt="text-color-modified" src="/images/webAccessibility/text-color-modified.jpg" />

보다 명확하게 보이는 것을 확인할 수 있습니다. 이렇게 `html lang 속성`, `light mode text color` 명암비 이슈를 해결하고난 후,<br />

<img width="50%" loading="lazy" alt="measurement-modified" src="/images/webAccessibility/measurement-modified.jpg" />

100% 로 채워져있는 `Accessibility` 를 확인할 수 있었습니다. 🎉

간단하게 web.dev measurement 를 통해 블로그의 여러 성능 측정을 하고 개선까지 했습니다.<br />
이번 기회를 통해 `openGraph` 를 알게 되었다는 점, SEO 를 어떻게 적용하는지 실제로 적용한 경험도 할 수 있어서 좋았습니다.<br />
꽤 즐거운 시간이였고, 이 후엔 Performance 개선을 해볼 예정입니다!

그럼 Performance 개선 후 후기에 대한 포스팅에서 또 뵙겠습니다~ 안뇽 🤗
