---
title: "개선 일기 - react-hook-form 을 일관성 있게"
subtitle: "일관성 그리고 예측 가능한 코드"
date: "2024-09-21"
thumbnailUrl: "/images/improvementForm/thumbnail.png"
tag: "react-hook-form,zod"
description: "Write consistent, predictable code"
postingType: "post"
---

> `개선 일기` 는 다음과 같은 주제를 다루고 있어요.
>
> 1. 개선 전 불편한 점
> 2. 개선을 위해 찾아낸 방법
> 3. 개선 후기

## 요약

> react-hook-form 을 사용하다보면 비슷한 목적의 코드가 다양한 형태로 이루어질 수 있다는 걸 느꼈습니다.<br />
> 이로 인해 유지보수에 어려움을 느껴 2가지의 큰 골조를 토대로 개선해보았습니다.<br />
>
> - 일관성 있는 코드로 예측 가능한 코드 만들기<br />
> - form 과 관련된 코드의 응집도 높이기<br />
>
> 개발하다보면 자주 듣는 `일관성 있는 코드`, `코드 응집도` 의 중요성을 다시금 체감하는 시간이였습니다.

## 라이브러리 버전

- react-hook-form: v7.53.0
- zod: v3.23.8

## 개선하기 전에 어떤게 불편했나요?

저희 팀에서는 로그인 페이지, 회원가입과 같은 Form 을 핸들링할 때, [react-hook-form](https://react-hook-form.com/) 라이브러리를 사용하고 있습니다.<br />
react-hook-form 과 [zod](https://zod.dev/) 를 함께 사용해서 Form 데이터 관리 및 검증을 하고 있습니다.<br />

다만, react-hook-form 을 사용하면서 `비슷한 목적의 코드가 약간씩 다른 형태로 작성된 것`을 확인할 수 있었습니다.<br />
이로 인해 특정 Form 데이터 로직을 수정할 때, 관련된 컴포넌트를 모두 체크해야했고<br />
어떻게 Form 데이터를 다루는지 파악하는 비용이 매번 발생했습니다.

저는 이와 같은 과정 자체가 불편하다고 생각했습니다.

### 불편하다고 생각한 이유

Form 관련 코드를 수정할 때 관련된 코드를 모두 확인해야한다는 것<br />
이 비용이 꽤 크다고 느꼈습니다.<br />

Admin 과 같은 다양하고 복잡한 설정을 다루는 환경에서 그 비용을 크게 느꼈습니다.<br />
`A 라는 필드를 수정했을 때, B 라는 설정값이 변경될 수 있다.`<br />
Form 을 다루면서 위와 같은 조건이 많았습니다.

react-hook-form 의 코드가 서로 달라 이러한 조건을 다루는 방식도 달랐고<br />
`놓치는 조건이 없을까` 하는 걱정에 코드를 하나하나 들여다보게 되었습니다.

정리하자면, 불편하다고 느낀 부분은 아래 두 가지로 보여집니다.

> 1. 약간씩 다른 Form 데이터 형태
> 2. Form 데이터 관리 로직의 분산

### 기존 코드는 어떤 형태인가요?

앞서 이야기한 `비슷한 목적의 코드가 약간씩 다른 형태로 작성되었다` 부분의 코드 예시를 살펴보겠습니다.

아이디, 패스워드를 입력하는 로그인 페이지가 있고,<br />
`패스워드를 8자 이상 입력하면 아이디 Input 창에 임시 이메일을 채워넣어준다` 와 같은 요구사항이 있다고 가정하겠습니다.<br />
이런 요구사항은 없겠지만 요는 `특정 Field 값을 수정할 때, 다른 Field 값에 영향을 준다` 입니다.

이를 `react-hook-form` 과 `zod` 를 활용한다면 다음과 같은 예시가 있을 것 같습니다.

#### 1. custom hook 에서 요구사항을 녹여내기

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TEMPORARY_EMAIL = "test@test.com";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const defaultValues: z.TypeOf<typeof loginInputSchema> = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  const { watch, setValue } = form;
  const password = watch("password");

  useEffect(() => {
    if (password.length > 8) {
      setValue("email", TEMPORARY_EMAIL);
    }
  }, [password, setValue]);

  return form;
};
```

#### 2. 컴포넌트 레벨에서 요구사항을 녹여내기

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TEMPORARY_EMAIL = "test@test.com";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const defaultValues: z.TypeOf<typeof loginInputSchema> = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  return form;
};

const LoginForm = () => {
  const form = useLoginForm();

  const { watch, setValue } = form;
  const password = watch("password");

  useEffect(() => {
    if (password.length > 8) {
      setValue("email", TEMPORARY_EMAIL);
    }
  }, [password, setValue]);

  return (
    // ...jsx
  );
};
```

가장 중요한 골자인 `특정 Field 값을 수정할 때, 다른 Field 값에 영향을 준다` 를 기반으로<br />
다양한 요구사항이 있어 구현하게 된다면, 다양한 형태의 코드가 나올 수 있습니다.<br />
요구사항이 수정되어 코드를 수정하게 될 경우, 요구사항이 custom hook 에 있을지<br />
아니면 hook 을 호출한 컴포넌트에 있을지, 더 나아가 하위 컴포넌트에 있을지 확신할 수 없습니다.<br />
`요구사항 확인을 위해 관련된 코드 전체를 살펴보는 비용이 발생`하게 됩니다.

## 개선을 위해 찾아낸 방법

> - Form 제출 시 어떤 로직이 실행되는지<br />
> - Form 형태(Schema)가 어떻게 되는지<br />
> - Form 의 각 Field 별로 어떤 동작을 하는지<br />

위 로직이 한 곳에 뭉쳐있으면 이러한 불편함을 해소할 수 있을 것으로 보입니다.

### 일관성 + 응집도 있는 Form 만들기

바로 코드부터 살펴보겠습니다.

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ZodType } from "zod";
import type {
  Path,
  FieldValues,
  DeepPartial,
  DefaultValues,
  UseFormReturn,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

interface UseZodFormOptions<Schema, TFormValues extends FieldValues> {
  schema: Schema;
  defaultValues: DefaultValues<TFormValues>;
  onFormValueChange?: (
    value: DeepPartial<TFormValues>,
    formPath: Path<TFormValues>,
    setValue: UseFormSetValue<TFormValues>
  ) => void;
  onFormSubmit: (data: TFormValues) => void;
}

type UseZodFormReturn<TFormValues extends FieldValues> = Omit<
  UseFormReturn<TFormValues>,
  "watch" | "setValue" | "handleSubmit" | "register"
> & {
  onSubmit: ReturnType<UseFormHandleSubmit<TFormValues>>;
};

export const useZodForm = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends z.infer<Schema>
>({
  schema,
  defaultValues,
  onFormSubmit,
  onFormValueChange,
}: UseZodFormOptions<Schema, TFormValues>): UseZodFormReturn<TFormValues> => {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit, ...restForm } = form;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (onFormValueChange) {
        onFormValueChange(value, name as Path<TFormValues>, setValue);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, onFormValueChange]);

  return { ...restForm, onSubmit: handleSubmit(onFormSubmit) };
};
```

`useZodForm` hook 은 `schema`, `defaultValues`, `onFormSubmit` props 를 필수로 받습니다.<br />
Form 을 다루는데 있어 핵심 로직을 `useZodForm` hook 호출 시점에 작성하도록 제약을 두었습니다.<br />
이를 통해 `응집도를 높이는 결과`를 얻을 수 있다고 생각합니다.

더불어 `useZodForm` 의 return 값에서는 `watch`, `setValue`, `handleSubmit` 를 제외하고 있습니다.<br />
`watch`, `setValue` 를 외부로 노출시킬 경우, 해당 hook 을 사용하는 쪽, 그리고 그 하위 코드에서<br />
위 method 를 활용해서 값을 수정하는 코드를 작성할 수 있기 때문입니다.

그리고 `onFormValueChange` prop 을 통해 `값이 수정될 때에 대한 로직을 선언하도록 유도`했습니다.<br />
기존 `useEffect`, `watch`, `setValue` 를 활용한 로직을 `onFormValueChange` 에 작성하는 방식입니다.<br />

위 hook 을 이용한 실제 사용 예시를 살펴보겠습니다.

```tsx
import { z } from "zod";

import { useZodForm } from './useZodForm';

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const form = useZodForm({
    schema: loginInputSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    onFormValueChange: (_, formPath, setValue) => {
      if (formPath === "password") {
        setValue("email", "test@test.com");
      }
    },
    onFormSubmit: (data) => {
      console.log(data, "submit 했습니다");
    },
  });

  return (
    // ...jsx
  );
};
```

useZodForm 을 호출하는 시점에 아래 4가지 로직을 확인할 수 있습니다.

> 1. Schema
> 2. Default Value
> 3. Form 값이 수정될 때 사용할 로직
> 4. Form 값이 제출될 때 사용할 로직

## 개선 후기

Form 데이터를 다루는 건 굉장히 자주 있는 일입니다.<br />
자주 있지만, 잘 다루는 건 어렵다는 것을 최근에 크게 느끼게 되었습니다.<br />
라이브러리를 통해 다양한 형태의 코드를 구성할 수 있다는 건, 양날의 검이라는 생각도 들었습니다.

다양한 사람이 모여 일을 하게 되고, 다양한 형태의 코드가 생성되며<br />
이는 곧 유지보수에 있어 어려운 과제 중 하나라는 점 또한 느낄 수 있었습니다.

특히 저조차도 몇 개월 전의 코드와 현재의 코드가 다르다는 것 역시도 느꼈습니다.

코드 응집도가 얼마나 중요한지, 그리고 일관성 있는 코드, 예측 가능한 코드의 중요도를 느끼고<br />
시작하게된 이번 공부는 나름의 성과가 있다고 생각됩니다.

지속 가능한 형태의 코드를 구성하기 위해 지금과 같은 공부를 계속 이어가볼 예정입니다.
