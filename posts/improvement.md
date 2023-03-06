---
title: "블로그 속도 개선하기"
subtitle: "Next js Image 로 느려진 웹페이지 속도 개선하기"
date: "2023-02-27"
thumbnailUrl: "/images/improvement/thumbnail.jpg"
tag: "Image,web dev,next.js"
description: "이미지 최적화를 통해 속도 개선하는 과정"
postingType: "post"
---

> 이 글은 유저에게 썸네일을 보다 빠르게 보여주기 위한 과정을 정리하며 동시에<br />
> 생각없이 글만 썼던 부끄러운 과거를 반성하자는 의미에서 작성한 글입니다.

어느 순간부터 블로그 속도가 느려졌다는 것을 체감할 수 있었습니다.<br />
모든 콘텐츠를 보기 위한 시간이 2초 가량 소요된다는 것을 느꼈습니다.<br />
특히 가장 상단에 위치한 썸네일의 로딩이 늦는 경우가 많아 계속 눈에 밟히곤 했습니다.

프로젝트 포스팅 썸네일은 제가 실제 만든 결과물을 보여주기 위한 목적으로 쓰니<br />
유저에게 빠르게 노출되면 좋겠다는 생각이 들었습니다.<br />
생각만 하면 안되니 바로 개선을 시작했습니다.

## web dev 로 지표를 확인해보자

먼저 지난 [SEO 최적화](https://takhyun.dev/posts/web-accessibility) 할 때도 활용했던 [web dev pagespeed](https://pagespeed.web.dev/) 를 통해 다양한 지표를 측정했습니다.<br />

![prev optimization result {{ w: 700, h: 530, parentW: 50 }}](/images/improvement/prev-measured-web-dev.png)

대부분 좋은 지표를 보여주고 있지만 LCP(Largest Contentfull Paint) 는 3.4초 소요됩니다.<br />
LCP 영어 의미와 소요 시간을 보아하니 제가 개선하고 싶은 지표라고 생각이 듭니다.<br />
그럼 LCP 가 무엇인지 어떻게 개선할 수 있을지 살펴봅시다.

## LCP?

제가 자주 이용하는 [web dev](https://web.dev/i18n/ko/lcp/) 에서 작성된 글을 참고했습니다.<br />
Largest Contentfull Paint(LCP) 메트릭은 페이지가 처음으로 로드 시작한 시점을 기준으로<br />
뷰포트 내에서 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간을 알려주는 지표라고 합니다.

![lcp {{ w: 540, h: 140, parentW: 50 }}](/images/improvement/LCP.png)

우수한 사용자 경험성 제공을 위해 LCP 는 2.5초 이하라고 알려줍니다.<br />
제 블로그 포스팅의 LCP 지표는 대부분 3초 이상을 표기하고 있다는 점에서 분명 개선이 필요할 것 같습니다.

## 어떻게 개선할 수 있을까

LCP 에 영향을 주는 요인은 아래 4가지입니다.<br />

> 1. 느린 서버 응답 시간
> 2. javascript 및 css 렌더링 차단
> 3. 리소스 로드 시간
> 4. 클라이언트 측 렌더링

이 중 `리소스 로드 시간`을 개선하면 될 것 같습니다.<br />
왜냐하면 현재 제 블로그 LCP 지표에 큰 영향을 주는 것은 이미지이기 때문입니다.<br />
현재 이미지 크기를 확인하고 개선할 수 있는 방법을 모색하는 것이 좋을 것 같습니다.

## 현재 이미지 크기

뷰포트 기준 가장 큰 이미지인 썸네일의 사이즈를 network 탭을 통해 확인했습니다.<br />
1.4MB 아무리 thumbnail 이라지만 지나치게 크게 느껴지는 용량입니다.

![thumbnail size {{ w: 750, h: 200, parentW: 50 }}](/images/improvement/thumbnail-size.png)

더불어 이미지 정보를 살펴보니 실제 화면 상에 표기되는 사이즈보다 해상도가 높았습니다.

> - 맥북 16인치 기준 thumbnail size: 1075 x 560
> - 기본 thumbnail size: 3600 x 2025

이미지 사이즈(용량)을 줄이기 위해 할 수 있는 건 아래 2가지 방법일 것 같습니다.

1. 이미지 해상도 줄이기
2. 이미지 최적화를 위한 이미지 압축

### 이미지 해상도 줄이기

이미지 해상도 조절 기능을 제공하는 [웹사이트](https://www.iloveimg.com/ko/resize-image/resize-jpg)를 이용했습니다.<br />
해상도를 실제 사용 사이즈와 비슷하게 `1100 x 620` 으로 변경했으며 이 과정만으로도 `91kB` 로 줄일 수 있었습니다.<br />
기존 초고화질보단 당연히 화질 면에서는 떨어질 수 있습니다.<br />
용량이 줄어든만큼 더 빠르게 이미지를 표기할 수 있고 떨어진 화질은 식별하기 어려울 정도가 아니니 더 좋은 방향처럼 느껴집니다.

![after change size {{ w: 540, h: 30, parentW: 50 }}](/images/improvement/after-change-size.png)

### 이미지 압축

동일한 사이트에서 이미지 압축 기능도 제공해주고 있어 압축도 함께 진행했습니다.<br />
그 결과 해상도를 줄였을 때와 큰 차이는 없지만 `85kB` 까지 줄일 수 있었습니다.

기존 `1.4MB` 에서 `85kB` 까지 줄이며 상당히 많은 리소스를 아끼게 되었습니다.<br />
이를 각 포스팅의 모든 이미지에 적용하였으며 아래와 같은 결과를 얻게 되었습니다.<br />

![after optimization result {{ w: 700, h: 530, parentW: 50 }}](/images/improvement/after-measured-web-dev.png)

이 과정을 거치기 전 LCP 와 비교했을 때 <strong>1.4초</strong>의 절감 효과를 얻을 수 있었습니다.<br />
약 10분 정도 최적화 과정을 한 결과 1.4초를 줄이는 효과를 얻을 수 있었고 이는 매우 크게 느껴졌습니다.<br />
현재 2022년 회고록을 예시로 진행했지만 다른 글에서는 최대 3초 가량의 절감 효과도 확인할 수 있었습니다.

project 글의 경우 대부분 4k gif 를 썸네일로 활용 했었고 LCP 지표가 `9.7초`로 측정되었습니다.<br />
주변에 여쭤봤지만 gif 를 굳이 깊게 보지 않는다는 평이 많았고, 이를 최적화한 이미지로 변경하여<br />
LCP 를 `1초`까지 줄일 수 있었습니다.

## 더 좋은 방법이 없을까

지금 방법은 이미지 해상도를 적절한 수준으로 줄이고, 그 이미지를 압축하는 과정을 매 이미지마다 반복해야합니다.<br />
처음부터 화면에 보여질 사이즈에 맞는 이미지를 사용하면 좋겠지만, 그렇지 않는 경우 위 작업을 반복하는 건 정말 번거롭습니다.<br />
제가 이미지 최적화를 위해 적용하고 싶은 것은 아래 3가지입니다.

> 1. 이미지 해상도 줄이기
> 2. 이미지 압축
> 3. lazy loading

위 3가지를 보면 좋은 방법 한가지가 떠오릅니다. 바로 [Next js 의 Image Component](https://nextjs.org/docs/basic-features/image-optimization) 입니다.<br />

Next js Image Component 를 활용하면 아래와 같은 이점이 있다고 합니다.

> 1. Improved Performance (향상된 성능)
> 2. Visual Stability (시각적 안정성)
> 3. Faster Page Loads (더 빠른 페이지 로드)
> 4. Asset Flexibility (자산 유연성)

분명 이 기능들은 저에게 있어 큰 도움을 줄 수 있을 것으로 예상됩니다.<br />
`Improved Performance` 는 `최신 이미지 형식을 사용 + 올바른 크기의 이미지를 제공`해준다는 점에서 사용에 이점이 있고,<br />
Faster Page Loads 는 lazy loading 등에 대한 기능 제공으로 더 빠른 페이지 로드의 이점이 있습니다.

적용할만한 이유는 충분한 것 같으니 현재 환경에서 적용할 수 있는 방법을 고민해보겠습니다.

## Image Component 적용

현재 제 블로그는 `next-mdx-remote` 라이브러리를 사용하여 markdown 을 표기하고 있습니다.<br />
위 라이브러리에서 제공해주는 MDXRemote component 의 components props 를 통해 html tag 를 커스텀할 수 있습니다.

그렇다면 img 태그를 이 components props 를 통해 Next js Image Component 로 변경할 수 있을 것 같습니다.<br />
이 과정에서 기존 markdown 에서 사용하던 img tag 를 읽지 못하는 이슈가 있어, `![]()` 방식으로 변경했습니다.<br />
_(아직 이 부분은 관련 레퍼런스를 찾지 못해 정확한 원인 파악은 하지 못했습니다.)_

`![]()` 형식을 사용하면 components 내 img field 에서 읽고, 커스텀이 가능하지만 <br />
각 이미지에 맞는 width, height 를 지정하는 것이 어렵습니다.<br />
기존 img 태그처럼 width, height 를 지정할 수 없기 때문이죠.

일단 MDXRemote img 태그를 대체할 커스텀 컴포넌트는 아래와 같습니다.

```tsx
const components = {
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    if (!props.alt || !props.src) return null;

    return <Image src={props.src} alt={props.alt} />;
  },
};
```

전달되는 props 에서는 `alt` 와 `src` 에 대한 정보를 확인할 수 있습니다.<br />
이 정보는 제가 markdown 에서 수동으로 기입한 값입니다.<br />
그렇다면 제가 width, height 를 해당 이미지 비율을 맞춰서 기입한 후, 이 값을 똑 떼어낼수만 있다면<br />
제가 원하는 width, height 를 지정할 수 있을 것 같습니다.

markdown 에서 alt 를 지정할 때 제가 원하는 width, height 를 작성했습니다.

```md
![thumbnail size {{ w: 750, h: 200 }}](/images/improvement/thumbnail-size.png)
```

이렇게 작성한 후 alt 값이 어떻게 출력되는지 console 을 통해 확인해본 결과<br />
`thumbnail size { w: 750, h: 200 }` 값을 확인할 수 있었습니다.<br />
그럼 이를 문자열 분리 통해 alt, width, height 를 분리하여 사용할 수 있을 것으로 보입니다.<br />
아래와 같은 코드로 분리할 수 있었습니다.

```tsx
const components = {
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    if (!props.alt || !props.src) return null;

    const substrings = props.alt.split("{");
    const imgInfo = substrings[1];
    const imgWidth = imgInfo.match(/(?<=w:\s?)\d+/g);
    const imgHeight = imgInfo.match(/(?<=h:\s?)\d+/g);

    const width = imgWidth ? imgWidth[0] : 600;
    const height = imgHeight ? imgHeight[0] : 300;

    return <Image src={props.src} alt={alt} width={width} height={height} />;
  },
};
```

> 1. split method 를 이용하여 문자열을 `"{"` 기준으로 분리
> 2. 이 경우 인덱스 0은 alt 값이 될 예정이므로 이를 alt 로 다시 할당
> 3. REG 를 이용하여 w, h 값만 뽑아낸 후, width, height 로 할당
> 4. Image Component 에 width, height, alt props 에 지정

이와 더불어 상위 요소 Dom 의 width 에 따라 동적으로 img width, height 가 변경되는 것을 원하므로<br />
기존 img markdown 에서 아래와 같이 `parentW` 를 추가했습니다.

```md
![thumbnail size {{ w: 750, h: 200, parentW: 50 }}](/images/improvement/thumbnail-size.png)
```

그리고 코드 내에서 이 값을 적용하기 위해 아래와 같이 코드를 수정 했습니다.

```tsx
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
    const imgWidth = imgInfo.match(/(?<=w:\s?)\d+/g);
    const imgHeight = imgInfo.match(/(?<=h:\s?)\d+/g);
    const parentImgWidth = imgInfo.match(/(?<=parentW:\s?)\d+/g);

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
```

Image Component 에 layout responsive 를 적용하여 상위 Dom width 에 맞게 변경됩니다.<br />
이 과정까지 진행하면 제가 원하는 이미지 최적화가 적용 되었을 것 같습니다.<br />
결과를 천천히 살펴보겠습니다.

## 어떻게 적용되었을까

Next js Image Component 적용 전 후에 대한 이미지 사이즈를 비교해보겠습니다.
_(아래 이미지는 현재 작성 중인 포스팅 기준입니다.)_

`Next js Image 적용 전`
![prev image size {{ w: 1075, h: 200, parentW: 100 }}](/images/improvement/prev-image-size.png)

`Next js Image 적용 후`
![after image size {{ w: 1075, h: 200, parentW: 100 }}](/images/improvement/after-image-size.png)

적용 전 이미지 총 사이즈는 `1.3MB` 이며, 적용 후 이미지 총 사이즈는 `280kB` 입니다.<br />
무려 약 37배의 이미지 사이즈를 줄일 수 있었습니다.<br />
지금까지의 과정을 통해 굉장히 많은 리소스를 줄일 수 있게 되었습니다.

마지막으로 web dev 결과를 비교해보겠습니다.

`개선 전 측정 결과`
![prev optimization result {{ w: 700, h: 530, parentW: 50 }}](/images/improvement/prev-measured-web-dev.png)

`개선 후 측정 결과`
![after optimization result {{ w: 700, h: 530, parentW: 50 }}](/images/improvement/last-measured-web-dev.png)

뿌듯하네용

## 후기 그리고 다음 목표

먼저 굉장히 즐겁고 좋은 과정이였습니다. 문제점을 파악하고 하나하나 개선해나가는 과정이 즐겁다는 걸 다시금 느꼈습니다.<br />
문제를 정의하고, 해결할 수 있는 방법을 모색하고, 적용까지 한 후, 더 좋은 방법이 없을지 고민하다가 찾고 적용까지 하는<br />
이 일련의 과정은 개발 특유의 쾌감을 불러일으키는 듯 했습니다.

지금의 방법이 최선은 아닐 수 있습니다. 다만 우선 해결하고자 하는 문제를 해결했다는 점에서 뿌듯함을 느끼고 있습니다.<br />
개발자는 문제를 정의하고, 풀어낼 수 있어야한다고 생각하기에 이런 과정은 저에게 있어 큰 성취감과 자존감을 주곤 합니다.

이렇게 마무리를 짓는 것도 좋겠지만, 더 좋은 방법이 없을지 생각했습니다.<br />
그럼 지금의 방법 중 어떤 것이 불편함을 야기하는지 천천히 되짚어보았습니다.

image width, height 비율을 지정하기 위해 수동으로 입력하는 과정이 번거로웠습니다.<br />
이미지 width, height 값을 입력하는 과정은 아래와 같습니다.

> 1. image 정보를 확인합니다.
> 2. 제 화면 기준 실제 해당 이미지를 띄울 떄 width, height 가 어떻게 표기되는지 값을 확인하고 기억합니다.
> 3. 그 width, height 를 수동으로 입력합니다.

하나의 포스팅에 약 5개의 이미지를 넣게 되는데 이 과정을 매번 반복하는 것은 매우 번거로운 일이라고 생각합니다.<br />
그럼 이를 자동으로 해줄 수 있는 방법이 뭐가 있을지 간단하게 찾아보았습니다.

찾아보니 이미지 사이즈를 찾을 수 있는 라이브러리가 있습니다. 바로 [image-size](https://github.com/image-size/image-size) 입니다.<br />
node 환경에서 이미지를 분석하여 사이즈를 가져올 수 있는 라이브러리로 위 과정을 대체할 수 있을 것으로 예상됩니다.

이 과정은 추후에 다시 적용해보도록 하겠습니다.

긴 글 읽어주셔서 정말 감사합니다. 다음엔 더 좋은 글, 경험과 함께 돌아오겠습니다 :D
