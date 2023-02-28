---
title: "블로그 속도 개선하기"
subtitle: "느려진 웹페이지 속도 개선하기"
date: "2023-02-27"
thumbnailUrl: "/images/improvement/thumbnail.jpg"
tag: "Image,web dev,next.js"
description: "이미지 최적화를 통해 속도 개선하는 과정"
postingType: "posts"
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

<img width="50%" loading="lazy" alt="prev optimization result" src="/images/improvement/prev-measured-web-dev.png" />

대부분 좋은 지표를 보여주고 있지만 LCP(Largest Contentfull Paint) 는 3.4초 소요됩니다.<br />
LCP 영어 의미와 소요 시간을 보아하니 제가 개선하고 싶은 지표라고 생각이 듭니다.<br />
그럼 LCP 가 무엇인지 어떻게 개선할 수 있을지 살펴봅시다.

## LCP?

제가 자주 이용하는 [web dev](https://web.dev/i18n/ko/lcp/) 에서 작성된 글을 참고했습니다.<br />
Largest Contentfull Paint(LCP) 메트릭은 페이지가 처음으로 로드 시작한 시점을 기준으로<br />
뷰포트 내에서 가장 큰 이미지 또는 텍스트 블록의 렌더링 시간을 알려주는 지표라고 합니다.

<img width="50%" loading="lazy" alt="lcp" src="/images/improvement/LCP.png" />

우수한 사용자 경험성 제공을 위해 LCP 는 2.5초 이하라고 알려줍니다.<br />
제 블로그 포스팅의 LCP 지표는 대부분 3초 이상을 표기하고 있다는 점에서 분명 개선이 필요할 것 같습니다.

## 어떻게 개선할 수 있을까?

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

<img width="70%" loading="lazy" alt="thumbnail size" src="/images/improvement/thumbnail-size.png" />

더불어 이미지 정보를 살펴보니 실제 화면 상에 표기되는 사이즈보다 해상도가 높았습니다.

> - 맥북 16인치 기준 thumbnail size: 1075 x 560
> - 기본 thumbnail size: 3600 x 2025

표기된 thumbnail size
<img width="50%" loading="lazy" alt="mac thumbnail size" src="/images/improvement/mac-thumbnail-size.png" />

실제 thumbnail size
<img width="50%" loading="lazy" alt="image info" src="/images/improvement/image-info.png" />

이미지 사이즈(용량)을 줄이기 위해 할 수 있는 건 아래 2가지 방법일 것 같습니다.

1. 이미지 해상도 줄이기
2. 이미지 최적화를 위한 이미지 압축

### 이미지 해상도 줄이기

이미지 해상도 조절 기능을 제공하는 [웹사이트](https://www.iloveimg.com/ko/resize-image/resize-jpg)를 이용했습니다.<br />
해상도를 실제 사용 사이즈와 비슷하게 `1100 x 620` 으로 변경했으며 이 과정만으로도 `91kB` 로 줄일 수 있었습니다.<br />
기존 초고화질보단 당연히 화질 면에서는 떨어질 수 있습니다.<br />
용량이 줄어든만큼 더 빠르게 이미지를 표기할 수 있고 떨어진 화질은 식별하기 어려울 정도가 아니니 더 좋은 방향처럼 느껴집니다.

<img width="50%" loading="lazy" alt="after change size" src="/images/improvement/after-change-size.png" />

### 이미지 압축

동일한 사이트에서 이미지 압축 기능도 제공해주고 있어 압축도 함께 진행했습니다.<br />
그 결과 해상도를 줄였을 때와 큰 차이는 없지만 `85kB` 까지 줄일 수 있었습니다.

기존 `1.4MB` 에서 `85kB` 까지 줄이며 상당히 많은 리소스를 아끼게 되었습니다.<br />
이를 각 포스팅의 모든 이미지에 적용하였으며 아래와 같은 결과를 얻게 되었습니다.<br />

<img width="50%" loading="lazy" alt="after optimization result" src="/images/improvement/after-measured-web-dev.png" />

이 과정을 거치기 전 LCP 와 비교했을 때 <strong>1.4초</strong>의 절감 효과를 얻을 수 있었습니다.<br />
약 10분 정도 최적화 과정을 한 결과 1.4초를 줄이는 효과를 얻을 수 있었고 이는 매우 크게 느껴졌습니다.<br />
현재 2022년 회고록을 예시로 진행했지만 다른 글에서는 최대 3초 가량의 절감 효과도 확인할 수 있었습니다.

project 글의 경우 대부분 4k gif 를 썸네일로 활용 했었고 LCP 지표가 `9.7초`로 측정되었습니다.<br />
주변에 여쭤봤지만 gif 를 굳이 깊게 보지 않는다는 평이 많았고, 이를 최적화한 이미지로 변경하여<br />
LCP 를 `1초`까지 줄일 수 있었습니다.

`불필요한 리소스를 낭비하지 말자.` `이미지는 최적화를 한 번 해야한다.` 등 스스로 이미 알고 있었던 내용입니다.<br />
알고 있었을 뿐 생각하지 않고 넘어간 결과 지금과 같이 여러 문제와 마주하게 되었습니다.<br />
