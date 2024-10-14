---
title: "개선 일기 - storybook 을 더 쉽게"
subtitle: "Storybook with MSW"
date: "2024-10-12"
thumbnailUrl: "/images/improvementStorybook/thumbnail.png"
tag: "storybook,msw"
description: "storybook, msw, easy"
postingType: "post"
---

> 이번 포스팅에서는 각 기술에 대한 자세한 방법을 다루지 않습니다.<br />
> 문제 해결을 위한 접근 방식에 대한 내용만 다루니 참고 부탁드립니다.

> `개선 일기` 는 다음과 같은 주제를 다루고 있어요.
>
> 1. 개선 전 불편한 점
> 2. 개선을 위해 찾아낸 방법
> 3. 개선 후기

## 요약

> Storybook 을 Page 단위 Story 관리 방식을 개선했습니다.<br />
> 각 Story 의 관리 비용을 줄이고자 msw 를 활용했고,<br />
> 꽤 유의미한 비용 절감을 볼 수 있었습니다.<br />
> 이번 글에선 msw 를 적용하기까지의 과정을 작성했습니다.

## 개선하기 전에 어떤게 불편했나요?

`배보다 배꼽이 더 크다`, 주객 전도, 정작 커야할 것이 작고, 작아야 할 것이 클 때 쓰는 말입니다.<br />
Storybook 으로 Page 단위 Story 를 관리할 때 이런 느낌을 받았습니다.

각 페이지에서 사용하는 데이터를 모킹해서 적용한 Story 는 시간이 지날수록 거대한 배꼽이 되고 있었습니다.<br />
페이지 요구사항이 변경되어 수정하면 Story 도 함께 수정해야하는데 이게 보통 비용이 아니였습니다.

비주얼 사이드 이펙트를 `쉽게` 확인하기 위해 적용한 기술이 어느덧 저를 지치게 하는 기술로 느껴지는 순간이였습니다.<br />
지친 순간부터 관리가 어려워지며, 아름다웠던 Page Story 는 더이상 원래 기능을 할 수 없게 됩니다.

이게 제가 불편하다고 느낀 부분입니다.<br />
생각했던 것에 비해 지속적인 관리가 어려워 방치되고, 제 기능을 못하게 되는 것입니다.

### 불편하다고 생각한 이유

앞서 이야기한 것처럼 각 Story 를 관리하는 비용이 커서 관리가 어려웠고<br />
그로 인해 하나 둘 방치되기 시작하면서 제 기능을 못하는 것이 가장 큰 문제였습니다.

그럼 `Story 를 관리하는 비용이 크다` 의 원인은 무엇일까요?<br />
저는 Page 에서 사용하는 데이터를 Mock Data 로 관리하고, `Page + Mock Data` 조합을 통해 Story 를 구성했습니다.<br />
만약, Page 스펙이 변경되어 Page 의 props 를 변경하면 어떻게 될까요?

페이지도 변경해야하고, 관련된 Story 도 함께 수정해야합니다.<br />
해당 페이지 스펙이 변경되었으니 관련된 Story 역시 변경되는게 당연한 것 같습니다.<br />
하지만, 원래의 목적이였던 비주얼 사이드 이펙트를 `쉽게` 확인하겠다는 목표와 달리<br />
생각보다 쉽지 않다는 것이 문제로 느껴졌습니다.

결국 `과도한 관리 비용의 문제`라고 정리할 수 있을 것 같습니다.

### 기존 코드는 어떤 형태인가요?

앞서 `각 Page 에서 사용하는 데이터를 Mock Data 로 관리하고 이를 할당하여 구성했습니다` 라고 이야기했습니다.<br />
현재 유저 정보를 표현하는 페이지를 예시로 코드 형태를 보여드리겠습니다.<br />
page 코드부터 보겠습니다.

```tsx
import { useUser } from './hooks';

interface User {
  id: string;
  name: string;
  age: number;
}

function UserPageContainer() {
  // user 정보를 가져오는 fetch custom hook
  const { user } = useUser();

  return <User user={user} />;
}

// 페이지 UI 만을 다루는 Component
function MyPage({ user }: { user: User }) {
  return (
    // ... jsx 로직
  );
}
```

위 코드는 다음과 같은 구조를 가지고 있습니다.

> 1. 페이지 UI 만을 다루는 `MyPage Component`
> 2. user 정보를 fetch 하는 `useUser custom hook`
> 3. 위 두 가지 요소를 포함하는 `UserPageContainer Component`

기존 코드에서 스토리북은 페이지 UI 만을 다루는 `MyPage` 를 가져와서 Story 를 구성했습니다.<br />
그리고 필요한 데이터는 Mock Data 로 관리하여 사용합니다.

```tsx
import { MyPage } from "./page";

import type { Meta } from "@storybook/react";
import type { User } from "./page";

const MOCK_USER: User = {
  id: "test_id",
  name: "Tak",
  age: 28,
};

function PageRenderer() {
  return <MyPage user={MOCK_USER} />;
}

const meta: Meta<typeof PageRenderer> = {
  title: "My Page",
  component: PageRenderer,
};
```

지금은 `MOCK_USER` 라는 간단한 Mock Data 를 생성해서 할당하는 방식입니다.<br />
하지만 모든 Story 에서 Mock Data 를 관리하고, 복잡한 형태의 Mock Data 를 생성하게 된다면<br />
Story 관리 비용은 점진적으로 늘어날 것입니다.

그리고 앞서 불편함에 대한 이야기를 한 것처럼<br />
`API 스펙이 변경되어 User 타입도 변경되었다면?`<br />
`페이지 기획이 변경되어 props 도 변경되었다면?`<br />
Page 수정과 더불어 Story 수정까지.. 비용은 계속 늘게 됩니다.

그럼 이 비용을 어떻게 줄일 수 있을까요?

## 개선을 위해 찾아낸 방법

저는 개선을 할 떄 가장 중요하게 생각하는 부분이 있습니다.<br />

> 가성비<br />

가격 대비 성능의 비율을 줄인 말이죠.<br />
개선의 비용이 적고, 도입의 비용도 적은 것이 매우 중요하다고 생각합니다.

그런 점에서 지금 제가 개발하고 있는 환경에서 쓰고 있는 msw 를 활용하는 것이<br />
가성비가 좋은 방향일 것 같다고 생각했습니다.

별도의 Mock Data 생성 없이 user 정보를 가져오는 fetch hook 을 포함한<br />
Container Component 자체를 msw 와 함께 구성하는 것이 목표였습니다.

다행히 Storybook 에서 msw addon 을 지원하고 있는 것을 볼 수 있었습니다.

- [Storybook MSW Addon](https://storybook.js.org/addons/msw-storybook-addon)

### Storybook with MSW(Mock Service Worker)

> Storybook MSW Addon 설정은 위에 링크 참고 부탁드립니다.<br />

Storybook MSW Addon 을 활용하면 MSW 를 Storybook 에서도 활용할 수 있습니다.<br />
이를 통해 fetch hook 을 포함한 Container Component 를 Story 로 구성할 수 있습니다.

> 아래 글은 이미 msw 를 사용하고 있단 가정 하에 작성했습니다.<br />
> 자세한 msw 사용법은 [문서](https://mswjs.io/)에서 보시는 걸 추천드립니다.
