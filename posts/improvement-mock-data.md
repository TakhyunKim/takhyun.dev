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
- msw: v1.3.3 (구버전)

## 개선하기 전에 어떤게 불편했나요?

제가 속한 프론트엔드 팀에서는 [zod](https://zod.dev/) 를 사용하여 API 스키마 및 Form 검증을 하고 있습니다. <br />
또한, [msw](https://mswjs.io/) 를 통해 API 모킹을 함께 사용하여 개발을 진행하고 있습니다.

![zod {{ w: 300, h: 300, parentW: 5 }}](/images/improvementMockData/zod.png)
![msw {{ w: 300, h: 300, parentW: 5 }}](/images/improvementMockData/msw.png)

msw 를 통한 API 모킹은 개발 과정에서 유용했지만, <br />
API 모킹을 위해 필요한 Mock Data 의 관리 비용이 꽤 크다는 생각이 들었습니다.<br />

### 불편하다고 생각한 이유

`관리 비용이 크다` 라는 생각이 왜 들었을까요?<br />
코드와 그동안의 경험을 토대로 원인을 찾아보니 두 가지의 원인이 보였습니다.

> 1. API Schema 를 정의한 코드와 Mock Data 코드의 위치가 멀다.
> 2. API Schema 를 수정하면 무조건 Mock Data 도 수정해야한다.

1번 이슈는 흔히 말하는 [코로케이션](https://kentcdodds.com/blog/colocation) 이라는 개념을 떠올리며 개선할 수 있을 것 같다는 생각이 들었습니다.<br />
2번 이슈는 `Schema 와 직접적으로 연결된 Mock Data 수정은 불가피하지` 라는 생각이 들었습니다.<br />
하지만 코로케이션을 생각하며 코드 선언 위치를 변경하고, 폴더 구조를 변경해도 **불편함이 해소되었다 라는 생각이 들진 않았습니다.**

![question {{ w: 700, h: 530, parentW: 50 }}](/images/improvementMockData/question.jpg)

다시 처음으로 돌아가 생각했습니다.<br />
내가 왜 이렇게 불편함을 느낀걸까?

길게 생각할 것도 없이, 결론이 나왔습니다.<br />
`API Schema 를 수정할 때마다 관련된 Mock Data 를 수정하는게 불편하다` 라는 결론이 나왔습니다.

개발자는 필연적으로 기획의 변경을 마주하게 됩니다.<br />
기획의 변경은 스펙의 변경을 의미합니다.<br />
스펙의 변경은 이전에 작성한 코드의 변경을 의미합니다.<br />
_(아닐 때도 있지만 대체로 그렇다고 생각합니다)_

스프린트를 진행하며 기획 변경으로 인해 반복되는 <br />
`API Schema 변경 -> Mock Data 변경` 과 같은 코드 수정에 피로도를 느꼈고,<br />
`피로도는 곧 불편하다` 라고 생각하게 되었습니다.

### 기존 코드는 어떤 형태인가요?

이 불편함을 이해하기 쉽게 예제를 통해 설명해보겠습니다.

`GET /user/profile API` 가 있다고 가정해보면<br />
아래와 같이 해당 API Schema 를 정의할 수 있습니다.

```ts
export const userProfileSchema = z.object({
  userName: z.string(),
  age: z.number(),
  role: z.enum(["admin", "user", "guest"]),
});
```

기존 Mock Data 생성 방식은 다음과 같았습니다.

```ts
const profileMockData: z.infer<typeof profileSchema> = {
  userName: "takhyun",
  age: 26,
  role: "user",
};
```

선언한 zod Schema 를 기반으로 필드에 맞는 값을 개발자가 직접 작성했습니다.

만약 유저 프로필 정보에 `email`, `address` 정보를 보여줘야한다는 기획이 추가되면 어떻게 될까요?<br />
변경된 기획 사항에 맞춰 API 스펙이 변경될 것입니다.<br />
스펙이 변경되어 `userProfileSchema` 와 `profileMockData` 를 업데이트 해야합니다.

이러한 변경 사항이 많아질수록 자연스럽게 개발자의 피로도가 높아지게 됩니다.<br />
팀원분들도 Mock Data 피로를 느끼고 있기에 더욱 개선이 필요하다고 생각했습니다.

## 개선을 위해 찾아낸 방법 - 자동화

![automation {{ w: 700, h: 530, parentW: 50 }}](/images/improvementMockData/automation.jpg)

앞서, `API Schema 수정을 하면 직접적으로 연결된 Mock Data 수정은 불가피하지` 라고 생각하고 넘어갔지만,<br />
`꼭 Mock Data 를 직접 수정해야할까?` 라는 생각이 들었습니다.

API Schema 만 수정하면 Mock Data 가 자동으로 변경되는 흐름을 만들면<br />
지금의 불편함을 해소할 수 있을거란 생각이 들었습니다.

### 자동화를 위해 필요한 것

그럼 Mock Data 를 만들 때 어떤게 필요할까요?<br />

> 1. Mock Data 의 구조
> 2. 각 필드 별 데이터 유형

앞서 말씀드린 것처럼 저희 팀은 `zod` 를 사용하고 있습니다.<br />
`zod` 를 사용하면서 자연스럽게 위 두 가지의 정보를 가지고 있습니다.<br />
다시 한 번 profile Schema 를 살펴보겠습니다.

```ts
export const userProfileSchema = z.object({
  userName: z.string(),
  age: z.number(),
  role: z.enum(["admin", "user", "guest"]),
});
```

profile Mock Data 생성에 필요한 정보를 모두 가지고 있습니다.<br />
z.object 의 key 값을 통해 Mock Data 의 구조를 알 수 있고,<br />
각 key 값의 zod schema 를 통해 어떤 데이터 유형을 가지고 있는지도 알 수 있습니다.

Schema 를 통해 Mock Data 를 자동으로 생성할 수 있을 것 같습니다. 🧐

### 자동화를 하기 전 생각해야할 것

항상 저는 방법을 찾기 전 필요한 조건을 먼저 생각합니다.<br />
이번 자동화를 통한 개선 방법을 찾기 전 중요한 조건을 생각해보니<br />
다음과 같은 조건들이 있었습니다.

> 1. zod Schema 를 변경하면 Mock Data 도 자동으로 변경 되어야 한다.
> 2. Mock Data 는 매 렌더링마다 동일한 값을 생성해야한다.

![question2 {{ w: 700, h: 330, parentW: 50 }}](/images/improvementMockData/question2.jpg)

1번은 이해가 가지만, 2번은 왜 필요할까요?<br />
2번은 앞으로 저희 팀에서 가고자 하는 코드 방향성을 위해 필요한 조건입니다.

저희 팀은 [Storybook](https://storybook.js.org/) 과 [Chromatic](https://www.chromatic.com/) 을 사용하여 UI 테스트에 도움을 받고 있습니다.<br />
Storybook 의 경우, Static 한 Mock Data 를 사용하고 있지만<br />
향후 msw 를 사용하여 Mock Data 관리 비용을 낮추는 것을 목표로 하고 있습니다.

이번 자동화를 통해 매 렌더링마다 새로운 Mock Data 를 생성한다면<br />
Chromatic 에서 항상 다른 값의 Story 를 확인하게 될 것이며<br />
이는 저희가 원하는 방향이 아니기에 2번 조건도 매우 중요했습니다.

### 조건에 맞는 라이브러리

![select {{ w: 700, h: 330, parentW: 50 }}](/images/improvementMockData/select.jpg)

[zod 문서 페이지에 작성된 모킹 라이브러리](https://zod.dev/?id=mocking)를 쭉 보면서 조건에 맞는 라이브러리를 찾을 수 있었습니다!<br />
바로 [@anatine/zod-mock](https://github.com/anatine/zod-plugins/blob/main/packages/zod-mock/README.md) 라이브러리입니다.

사용 방법은 다음과 같습니다.

```ts
import { generateMock } from "@anatine/zod-mock";

const schema = z.object({
  uid: z.string().nonempty(),
  theme: z.enum([`light`, `dark`]),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  avatar: z.string().url().optional(),
  jobTitle: z.string().optional(),
  otherUserEmails: z.array(z.string().email()),
  stringArrays: z.array(z.string()),
  stringLength: z.string().transform((val) => val.length),
  numberCount: z.number().transform((item) => `total value = ${item}`),
  age: z.number().min(18).max(120),
});

const mockData = generateMock(schema);
```

그리고 일관된 데이터를 뽑을 수 있도록 seed option 도 제공하고 있습니다.

```ts
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
const seed = 123;
const first = generateMock(schema, { seed });
const second = generateMock(schema, { seed });
expect(first).toEqual(second);
```

### 실제 적용 방법
