---
title: "라이브러리로 어떤 문제를 해결하나요? - zod 편"
subtitle: "zod 로 어떤 문제를 해결할 수 있나요?"
date: "2024-06-30"
thumbnailUrl: "/images/usingZod/thumbnail.png"
tag: "zod,TypeScript,FormValidation"
description: "Discover how to solve data validation problems in frontend development using Zod and TypeScript. Learn about the benefits, usage, and integration with react-hook-form for robust and type-safe validation."
postingType: "post"
---

## 요약

> Zod를 사용하면 데이터 검증 문제를 쉽게 해결할 수 있습니다.<br />
> TypeScript와 Zod를 함께 사용하면 컴파일 타임과 런타임에서 모두 타입 안전성을 확보할 수 있습니다. <br />
> 이를 통해 코드를 더 안전하고 유지보수하기 쉽게 만들 수 있습니다.<br />
> api response value 검증, form 검증과 같이 데이터 검증이 필요한 상황에서 Zod 를 활용해보세요!

## Zod는 어떤 용도로 사용하나요?

Zod 홈페이지에서는 **TypeScript-first schema validation with static type inference** 라고 소개되어 있습니다.<br />
이를 해석하면 **정적 유형 추론을 통한 타입스크립트 우선 스키마 유효성 검사**입니다.

데이터 검증은 프론트엔드 개발에서 매우 중요한 과제입니다. <br />
신뢰할 수 없는 데이터를 처리하거나, 예상치 못한 형식의 데이터가 들어오면 애플리케이션이 오작동할 수 있습니다. <br />
이런 문제를 해결하기 위해 사용하는 라이브러리 중 하나가 바로 **Zod**입니다.<br />

## TypeScript를 사용하는데 Zod가 필요한가요?

TypeScript는 정적 분석 도구로서, 컴파일 타임에 타입을 검사합니다. <br />
그러나 서버에서 받아오는 데이터나 사용자 입력 데이터의 유효성 검사는 런타임에 필요합니다. <br />
예를 들어, API로부터 데이터를 받아올 때, 데이터 형식이 예상과 다를 수 있습니다. <br />
Zod는 이러한 데이터를 런타임에 검사하여 안전성을 높입니다. <br />
이 둘은 엄연히 다른 것이며 타입 검사가 유효성 검증을 대신할 수 없습니다.

## 유효성 검증을 직접 구현하면 어떤가요?

```typescript
interface Account {
  id: string;
  email: string;
  age: number;
  level: "GOLD" | "SILVER" | "BRONZE";
  active: boolean;
  createdAt: Date;
  image?: string | undefined;
  ips?: string[] | undefined;
}

function updateAccount(account: Account) {
  if (typeof account.id !== "string" || account.id.length < 36)
    throw new Error("Invalid id");

  if (typeof account.age !== "number" || account.age < 0)
    throw new Error("Invalid age");

  if (!["GOLD", "SILVER", "BRONZE"].includes(account.level))
    throw new Error("Invalid level");

  if (!(account.createdAt instanceof Date))
    throw new Error("Invalid createdAt");

  // 어떤 로직
}
```

## Zod를 사용하면 어떤가요?

```typescript
// ✅ 스키마 정의
const Account = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18).max(80),
  level: z.enum(["GOLD", "SILVER", "BRONZE"]),
  image: z.string().url().max(200).optional(),
  ips: z.string().ip().array().optional(),
  active: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
});

// ✅ 스키마로부터 타입 추론
type Account = z.infer<typeof Account>;

function updateAccount(account: Account) {
  // ✅ 스키마로 유효성 검증
  Account.parse(account);

  // 어떤 로직
}
```

Zod를 통해 관리한다면 위와 같이 사용할 수 있습니다.<br />
유효성 검증을 위한 스키마 작성, 타입 추론, 유효성 검증까지 깔끔합니다.<br />
직접 작성할 때와 다르게 직관적입니다.<br />

## 결론

Zod를 사용하면 데이터 검증 문제를 쉽게 해결할 수 있습니다. <br />
TypeScript와 Zod를 함께 사용하면 컴파일 타임과 런타임에서 모두 타입 안전성을 확보할 수 있습니다.<br />
이를 통해 코드를 더 안전하고 유지보수하기 쉽게 만들 수 있습니다. 데이터 검증이 필요한 상황에서 Zod를 활용해 보세요!
