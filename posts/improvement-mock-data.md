---
title: "개선 일기 - Mock Data 편"
subtitle: "Mock Data 자동 생성으로 관리하기"
date: "2024-07-14"
thumbnailUrl: "/images/improvementMockData/thumbnail.png"
tag: "mock-data,zod,자동화"
description: "Generating mock data automatically"
postingType: "post"
---

> `개선 일기` 는 다음과 같은 주제를 다루고 있어요.
>
> 1. 개선 전 불편한 점
> 2. 개선을 위해 찾아낸 방법
> 3. 개선 후기

## 요약

> zod 와 zod-mock 라이브러리를 사용하면, Schema Mock Data 를 자동으로 생성할 수 있습니다.<br />
> 이러한 자동화를 통해 `Schema 변경`과 `Mock Data 생성`을 한 번에 처리할 수 있습니다.<br />
> 위 과정을 통해 Mock Data 유지보수 비용을 크게 낮추는 경험을 했습니다.

## 라이브러리 버전

- zod: v3.22.4
- msw: 1.3.3

## 개선하기 전에 어떤게 불편했나요?

제가 속한 프론트엔드 팀에서는 [zod](https://zod.dev/) 를 사용하여 API 스키마 및 폼 검증을 하고 있습니다. <br />
또한, [msw](https://mswjs.io/) 를 통해 API 모킹을 함께 사용하여 개발을 진행하고 있습니다.

msw 를 통한 API Mocking 은 개발 과정에서 유용했지만, 꼭 필요한 Mock Data 의 관리 비용이 꽤 크다는 생각이 들었습니다.<br />
`관리 비용이 크다` 라는 생각과 함께 왜 이런 생각을 하게 되었는지 궁금해서 정리해보니 크게 두 가지가 있었습니다. <br />

> 1. API Schema 를 정의한 코드와 Mock Data 코드의 위치가 멀다.
> 2. API Schema 를 수정하면 무조건 Mock Data 도 수정해야한다.

1번 이슈는 흔히 말하는 [코로케이션](https://kentcdodds.com/blog/colocation) 이라는 개념을 떠올리며, 개선할 수 있을 것 같다는 생각이 들었습니다.<br />
2번 이슈는 `Schema 와 직접적으로 연결된 Mock Data 수정은 불가피하지` 라는 생각이 들었습니다.<br />
하지만 막상 코로케이션을 생각하며 코드 선언 위치를 변경하고, 폴더 구조를 변경해도 **불편함이 해소되었다 라는 생각이 들진 않았습니다.**<br />

다시 처음으로 돌아가 생각했습니다. 내가 왜 이렇게 불편함을 느낀걸까? 그 지점이 어디일까?<br />
길게 생각할 것도 없이, 결론이 나왔습니다.<br />
`난 API Schema 를 수정할 때마다 관련된 Mock Data 를 수정하는게 불편해` 라는 결론이 나왔습니다.

개발자는 필연적으로 기획의 변경을 마주하게 됩니다.<br />
기획의 변경은 스펙의 변경을 의마합니다.<br />
스펙의 변경은 우리가 이전에 작성한 코드의 변경을 의미합니다.<br />
_(아닐 때도 있지만 대체로 그렇다고 생각합니다!)_

스프린트를 진행하며 기획 변경으로 인해 반복되는 `API Schema 변경 -> Mock Data` 변경에 피로도를 느꼈고,<br />
`피로도는 곧 불편하다` 라는 생각을 하게 만들었다는 걸 알게 되었습니다.

## 개선을 위해 찾아낸 방법

앞서, `API Schema 수정을 하면 직접적으로 연결된 Mock Data 수정은 불가피하지` 라고 생각하고 넘어갔지만,<br />
다시 생각해보니 이 부분은 자동화 할 수 있겠다는 생각이 들었습니다.
