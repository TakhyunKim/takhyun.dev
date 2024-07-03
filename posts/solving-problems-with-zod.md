---
title: "라이브러리로 어떤 문제를 해결하나요? - zod 편"
subtitle: "zod 로 어떤 문제를 해결할 수 있나요?"
date: "2024-06-30"
thumbnailUrl: "/images/usingZod/thumbnail.png"
tag: "zod,TypeScript,FormValidation"
description: "Discover how to solve data validation problems in frontend development using Zod and TypeScript. Learn about the benefits, usage, and integration with react-hook-form for robust and type-safe validation."
postingType: "post"
---

> `라이브러리로 어떤 문제를 해결하나요` 는 다음과 같은 주제를 다루고 있어요.
>
> 1. 라이브러리에 대한 설명
> 2. 라이브러리를 사용하면서 해결한 문제

## 요약

> Zod를 사용하면 데이터 검증 문제를 쉽게 해결할 수 있습니다.<br />
> TypeScript와 Zod를 함께 사용하면 컴파일 타임과 런타임에서 모두 타입 안전성을 확보할 수 있습니다. <br />
> 이를 통해 코드를 더 안전하고 유지보수하기 쉽게 만들 수 있습니다.<br />
> api response value 검증, form 검증과 같이 데이터 검증이 필요한 상황에서 Zod 를 활용해보세요!

## Zod는 왜 사용하나요?

Zod 홈페이지에서는 **TypeScript-first schema validation with static type inference** 라고 소개되어 있습니다.<br />
이를 해석하면 **정적 유형 추론을 통한 타입스크립트 우선 스키마 유효성 검사**입니다.

데이터 검증은 프론트엔드 개발에서 매우 중요한 과제입니다. <br />
신뢰할 수 없는 데이터를 처리하거나, 예상치 못한 형식의 데이터가 들어오면 애플리케이션이 오작동할 수 있습니다. <br />
이런 문제를 해결하기 위해 사용하는 라이브러리 중 하나가 바로 **Zod**입니다.<br />

## 유효성 검증을 직접 구현하면 어떤가요?

```typescript
interface User {
  id: string;
  name: string;
  age: number;
  roles: ("ADMIN" | "USER" | "GUEST")[];
}

// 유효성 검증 함수
function validateUser(user: any) {
  if (typeof user.id !== "string") {
    throw new Error("Invalid id");
  }
  if (typeof user.name !== "string" || user.name.length < 1) {
    throw new Error("Invalid name");
  }
  if (typeof user.age !== "number" || user.age < 18 || user.age > 100) {
    throw new Error("Invalid age: Must be an integer between 18 and 100");
  }
  if (
    !Array.isArray(user.roles) ||
    !user.roles.every((role) => ["ADMIN", "USER", "GUEST"].includes(role))
  ) {
    throw new Error("Invalid roles");
  }
}
```

User interface 몇 개의 필드를 검증하는데도 상당한 코드가 필요합니다. <br />
또한, 각 필드의 유효 조건을 한눈에 파악하기 어렵다는 단점이 있습니다. <br />
현재 4개의 필드만 있어도 이런 상황인데, 필드 수가 더 많아진다면 파악이 더욱 어려워질 것입니다.

## Zod를 사용하면 어떤가요?

```typescript
import { z } from "zod";

// User 스키마 정의
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  age: z
    .number()
    .int()
    .min(18, "Must be at least 18 years old")
    .max(100, "Age must be less than or equal to 100"),
  roles: z.array(z.enum(["ADMIN", "USER", "GUEST"])),
});

// 타입 추론
type User = z.infer<typeof UserSchema>;
```

Zod를 사용하면 위와 같은 문제를 해결할 수 있습니다.<br />
Zod를 통해 유효성 검증 스키마를 작성하고, 타입을 추론하며, 유효성 검증까지 직관적으로 확인할 수 있습니다. <br />
직접 코드를 작성하는 것보다 훨씬 효율적인 방법으로 보입니다.

Zod를 사용하면 유효성 검증을 보다 효과적으로 할 수 있다는 것을 알게 되었습니다.<br />
그렇다면 **이러한 `유효성 검증`은 언제 사용하는 것이 좋을까요?** 🤔

앞서 `신뢰할 수 없는 데이터를 처리하거나 예상치 못한 형식의 데이터가 들어오면 애플리케이션이 오작동할 수 있습니다.` 라고 이야기했습니다.<br />
그렇다면 **신뢰할 수 없는 데이터를 처리하는 경우와 예상치 못한 형식의 데이터가 들어오는 상황은 언제일까요?**

이 두 상황이 어떤 연관 관계가 있는지 지금부터 살펴보겠습니다.

## 예상치 못한 형식의 데이터가 들어온 경우

### fetch only

화면에서 보여주는 대부분의 요소는 서버로부터 전달 받은 데이터입니다.<br />
우리는 이러한 데이터를 [fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API) 를 통해 가져옵니다.

이러한 fetch api 를 `typescript` 와 함께 쓰면 다음과 같습니다.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: User[] = await response.json();
  return data;
};
```

특별하게 문제가 있어보이진 않아보입니다.<br />
하지만 아래 이 코드에서 우리는 예상치 못한 데이터가 들어올 수 있다는 점을 알 수 있습니다.

```ts
const data: User[] = await response.json();
```

호출한 데이터가 User[] 형태일 것이라고 `예상`해서 타입을 적용했습니다.<br />
하지만 이는 `예상`에 불과하기 때문에, 실제로는 예상한 타입과 다른 데이터가 들어올 수 있습니다. <br />
이런 경우, 다른 데이터가 들어왔다는 것을 `런타임`에서만 알 수 있습니다. <br />

이를 런타임에서만 알 수 있다는 건 **개발자가 의도하지 않은 시나리오가 사용자에게 노출**된다는 의미입니다.<br />
이때, 우리는 유효성 검증을 사용하여 문제를 해결할 수 있습니다.

### fetch with zod

먼저, fetch 를 zod 와 함께 사용한 예제를 살펴보겠습니다.

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Zod 스키마에서 유추된 타입 정의
type User = z.infer<typeof UserSchema>;

// Zod 배열 스키마 정의
const UsersSchema = z.array(UserSchema);

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  // Zod로 데이터 검증
  const parsedData = UsersSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Response data is not of type User[]");
  }

  return parsedData.data;
};
```

전달받은 데이터가 `User[]` 인지 확인하기 위해 Zod를 사용하여 유효성 검증을 진행했습니다. <br />
만약 `User[]` 가 아닌 데이터가 들어온다면, `UsersSchema.safeParse(data)`를 통해 이를 인지할 수 있습니다. <br />
개발자는 이 상황을 코드에서 제어할 수 있게 됩니다.

이로 인해 런타임에서 예상치 못한 에러가 발생하는 대신, <br />
잘못된 에러가 발생하더라도 앱이 정상적으로 동작할 수 있도록 기본값 할당과 같이 대응하는 등<br />
개발자가 직접 대응할 수 있다는 점이 매우 큰 장점이라고 생각합니다.

### 예상치 못한 형식의 데이터가 들어온 경우 zod 가 어떤 도움을 주나요?

> zod 를 `유효성 검증`을 통해 이 상황을 `제어` 할 수 있습니다.<br /> > `기본값 할당`과 같은 대응이 기본적인 예시입니다.

## 그래서 Zod 는 어떤 문제를 해결하나요?

Zod를 사용하면 데이터 검증 문제를 쉽게 해결할 수 있습니다. <br />
TypeScript와 Zod를 함께 사용하면 컴파일 타임과 런타임에서 모두 타입 안전성을 확보할 수 있습니다.<br />
api response value 검증, form 검증과 같이 데이터 검증이 필요한 상황에서 Zod 를 활용해보세요!
