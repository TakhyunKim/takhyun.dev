---
title: "Protected Route 로 안전하게 정보, 기능 보호하기"
subtitle: "React 에서 Protected Route 구현"
date: "2023-06-12"
thumbnailUrl: "/images/protectedRoute/thumbnail.jpg"
tag: "react,protected route"
description: "React 를 사용해서 Protected Route 구현"
postingType: "post"
---

앞으로 React 를 기반으로 다양한 시나리오를 대응하는 것을 정리해볼 생각입니다.<br />
Protected Route 는 첫 번째 시나리오이며, 구현해야할 시나리오와 <br />
정의 직접 구현하면서 리마인드하고 새로 배웠던 내용을 정리합니다.

실제 구현은 아래 GitHub Repo 링크를 통해 확인해보실 수 있습니다.

- [protected route with react GitHub Repo](https://github.com/TakhyunKim/react-study/tree/main/protected-route)

## 구현 시나리오

1. 페이지는 "메인", "로그인", "마이페이지", "대시보드" 를 구현합니다.
2. 로그인한 유저가 아닌 경우, "마이페이지", "대시보드" 는 접근할 수 없습니다.
3. 로그인한 유저일 경우, 로그인 페이지로 접근 시 메인 페이지로 이동합니다.

## 정의

이름 그대로 Route 를 protected 하는 것을 의미합니다.<br />
`특정 조건` 을 만족하지 않을 경우, 특정 페이지로 이동시키고,<br />
`특정 조건` 을 만족할 경우, 해당 페이지로 이동하는 방식입니다.<br />

보통 인증과 같이 적절한 권한이 없는 유저로부터 정보, 기능을 보호하기 위해<br />
특정 경로에 접근을 방지할 때 `Protected Route` 를 사용합니다.

## 리마인드 혹은 배웠던 점

### 시나리오 외적 처리할 부분 - replace

이번 `Protected Route` 를 구현하면서 로그인이 되어있지 않은 유저는 login 페이지로 route 하는 로직을 구현했습니다.<br />
이 과정에서 `replace` 옵션을 사용했습니다. 이를 사용하지 않을 경우 어떤 이슈가 발생하는지 작성하겠습니다.

> 1. login 을 하지 않은 상태에서 `Protected Route` 된 `대시보드`, `마이페이지` 로 이동합니다.
> 2. `Protected Route` 로 인해 login 페이지로 이동합니다.
> 3. login 페이지에서 뒤로가기를 합니다.

유저는 login 페이지에 갇히는 상황이 됩니다. 그 이유는 아래와 같습니다.

`Protected Route` 에 의해 login 페이지로 이동하면 브라우저 History Stack 은 아래와 같습니다.<br />
처음 메인 페이지에서 마이페이지로 그리고 로그인 페이지로 Stack 이 쌓여있는 것을 볼 수 있습니다.

![protected route {{ w: 1100, h: 780, parentW: 50 }}](/images/protectedRoute/protected-route.png)

위 상태에서 뒤로가기를 하게 되면 Stack 자료 구조의 동작 방식에 따라 최상위 로그인 페이지가<br />
사라지게 됩니다. 그럼 마이 페이지로 이동하게 됩니다.

![back history stack {{ w: 980, h: 810, parentW: 50 }}](/images/protectedRoute/back-image.png)

문제는 아직 로그인을 하지 않아<br />
마이 페이지로 이동할 경우 `Protected Route` 에 의해 다시 로그인 페이지로 이동합니다.<br />

![protected route {{ w: 1100, h: 780, parentW: 50 }}](/images/protectedRoute/protected-route.png)

결과적으로 뒤로 가기를 해도 사용자는 계속 로그인 페이지를 보게 됩니다.<br />
이 문제를 해결하기 위해 `replace` option 을 활용했습니다.

### replace?

ProtectedRoute 컴포넌트 코드는 아래와 같습니다.

```tsx
import { useRecoilValue } from "recoil";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isLoginUserSelector } from "../recoil/user";

function ProtectedRoute() {
  const currentLocation = useLocation();
  const isLoginUser = useRecoilValue(isLoginUserSelector);

  if (!isLoginUser) {
    return <Navigate to="/login" replace state={{ from: currentLocation }} />;
  } else {
    return <Outlet />;
  }
}
```

Navigate 컴포넌트에서 `replace` props 을 사용하고 있습니다.<br />
`replace` 의 역할은 History Stack 의 현재 항목을 대체하는 역할을 합니다.<br />

- [react router history docs](https://v5.reactrouter.com/web/api/history)

현재 항목을 대체하게 된다는 건 아래와 같이 정리할 수 있을 것 같습니다.

> 1. 로그인을 하지 않은 상태에서 마이 페이지로 이동합니다.<br />
>    (History Stack 에 메인 페이지, 마이 페이지 순으로 스택이 쌓여있습니다.)

> 2. `Protected Route` 에 의해 로그인 페이지로 이동합니다.<br />
>    (replace 에 의해 마이 페이지 스택이 로그인 페이지 스택으로 대체됩니다.)

이렇게 될 경우 아래와 같은 스택 구조를 가지게 됩니다.

![replace {{ w: 1000, h: 770, parentW: 50 }}](/images/protectedRoute/replace.png)

이 상태에서 뒤로 가기를 누르면 메인 페이지로 이동하므로<br />
이전 사용자가 뒤로 가기를 눌러도 계속 로그인 페이지를 표기하는 문제를 해결할 수 있습니다.

- [kakao location replace 포스팅](https://fe-developers.kakaoent.com/2022/221124-router-without-library/#location-replace)
- [replace method MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location/replace)

### 시나리오 외적 처리할 부분 - Navigate state

로그인을 하지 않은 경우, 대시보드, 마이페이지로 이동 시 `Protected Route` 에 의해 login 페이지로 이동합니다.<br />
login 페이지에서 로그인에 성공할 경우, 우리는 어디로 이동할 것으로 예상할까요?<br />
원래 접속하고자 했던 페이지로 이동할 것으로 예상할겁니다.

현재 기획서에는 명시되지 않았지만, 사용자 입장에선 당연하고 편리한 기능을 구현하고자 합니다.<br />
이 기능을 위해 필요한 점은 다음과 같습니다.

> 1. `Protected Route` 에 의해 login 페이지로 이동하기 전 페이지가 무엇인지 알아야합니다.
> 2. 로그인이 완료된 후, 이전 페이지(원래 가고자 했던 페이지)로 이동할 수 있어야합니다.<br />
>    그렇다면 이전 페이지에 대한 정보를 로그인 페이지에서도 알고 있어야합니다.

우리는 이전 `replace` 옵션을 사용하면서 원래 들어가고자 했던 페이지를 History Stack 에서<br />
찾을 수 없습니다. 그렇기에 다른 방법을 모색해야합니다.

그렇다면 replace 가 되기 전, 현재 페이지에 대한 location 정보를 가져오고<br />
login 페이지로 그 정보를 전달하면 될 것 같습니다.

이를 위해 react-router-dom 라이브러리의 `useLocation` hook 을 활용해보겠습니다.<br />
useLocation hook 은 현재 location 객체를 반환합니다. <br />
이를 통해 현재 location 정보를 가지고 있습니다.

- [react router useLocation hook docs](https://reactrouter.com/en/main/hooks/use-location)

그리고 location 정보를 login 페이지로 전달하기 위해 Navigate 컴포넌트의 state prop 을 활용합니다.<br />
state prop 을 통해 어떤 상태를 이동할 페이지로 전달할 수 있습니다.<br />
`useLocation`, `Navigate 컴포넌트의 state prop` 두 가지를 활용하여 아래와 같이 구현했습니다.

```tsx
import { useRecoilValue } from "recoil";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isLoginUserSelector } from "../recoil/user";

function ProtectedRoute() {
  const currentLocation = useLocation(); // 현재 location 객체 정보를 가져온다.
  const isLoginUser = useRecoilValue(isLoginUserSelector);

  if (!isLoginUser) {
    // Navigate 컴포넌트의 state prop 에 현재 location 객체를 전달한다.
    return <Navigate to="/login" replace state={{ from: currentLocation }} />;
  } else {
    return <Outlet />;
  }
}
```

그리고 login 페이지에서는 location 객체를 아래와 같이 활용합니다.

```tsx
import { useNavigate, useLocation } from "react-router-dom";

import { useLogin } from "./hooks/login";

import type { FormEvent } from "react";

function Login() {
  // ... 다른 비즈니스 코드
  const loginMutation = useLogin();
  const location = useLocation();
  const navigation = useNavigate();

  // useLocation hooks 을 통해 전달한 location 의 pathname 을 가져온다.
  // 만약 없을 경우 `/` 메인 페이지로 이동한다.
  const from = location.state?.from?.pathname ?? "/";

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      { id, password },
      {
        onSuccess: (response: { accessToken: string }) => {
          // API 호출이 성공했을 경우, useNavigate hook 을 사용하여 이동
          navigation(from);
        },
        onError: () => {
          alert("로그인 실패!");
        },
      }
    );
  };

  return (
    <FormWrapper onSubmit={handleLoginSubmit}>
      {/** 다른 컴포넌트... */}
    </FormWrapper>
  );
}
```

로그인이 성공했을 경우, 전달한 location 객체 정보를 활용하여 페이지를 이동하는 방식입니다.<br />
이를 통해 로그인 성공 시, 원래 가고자 했던 페이지로 이동하는 기능 또한 구현할 수 있습니다.

### 새롭게 사용해보고 배운 것 - Outlet

`Outlet` 은 react router dom 에서 제공하는 컴포넌트로<br />
중첩 라우팅, 중첩 레이아웃 (React 의 children 과 같은) 기능으로 활용할 수 있습니다.

- [react router Outlet docs](https://reactrouter.com/en/main/components/outlet)

공식 문서의 예제를 보면 사용법을 쉽게 이해할 수 있습니다.

```tsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```

`/messages`, `/tasks` 로 이동할 경우, 항상 `<h1>Dashboard</h1>` 와 함께 띄워지는 것을 볼 수 있습니다.<br />
`/messages`, `/tasks` router 상위에는 `/` 가 있고, 이 떄 Dashboard 컴포넌트를 출력합니다.

그리고 Dashboard 에서는 내부에서는 `Outlet` 을 사용하여 `/messages`, `/tasks` 로 이동 시<br />
실행될 컴포넌트를 `Outlet` 의 위치에서 실행합니다.<br />
이러한 특징으로 인해 React 의 children 과 비슷한 동작이라고 말씀드렸습니다.

그렇다면 이러한 중첩 라우팅, 레이아웃을 제공하는 `Outlet` 을 `Protected Route` 를 구현할 때 어떻게<br />
사용했을까요? 이는 아래 코드에서 확인할 수 있습니다.

```tsx
// routes/ProtectedRoute.tsx
import { useRecoilValue } from "recoil";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isLoginUserSelector } from "../recoil/user";

function ProtectedRoute() {
  const currentLocation = useLocation();
  const isLoginUser = useRecoilValue(isLoginUserSelector);

  if (!isLoginUser) {
    return <Navigate to="/login" replace state={{ from: currentLocation }} />;
  } else {
    return <Outlet />;
  }
}
// routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

`Outlet` 은 `ProtectedRoute` 컴포넌트에서 사용했습니다.<br />
로그인이 되었을 때, `<Outlet />` 컴포넌트를 return 합니다.

그리고 Routes 컴포넌트에서는 이러한 `ProtectedRoute` 를 `/my-page`, `/dashboard` 상위의<br />
Route 로 감싼 형태로 구현되어 있습니다.

우리가 구현한 `ProtectedRoute` 는 로그인이 되지 않았을 때는 login 페이지로,<br />
로그인이 되었을 땐 원래 이동하고자 했던 페이지로 이동하는 것이 목적입니다.<br />
이를 `Outlet` 을 통해 구현했습니다.<br />
로그인이 되었을 땐 `Outlet` 을 사용하여 그 하위에 위치한 Route 컴포넌트를 출력하는 방식으로요.

이렇게 구현하게 될 경우 아래와 같은 장점이 있습니다.

> 1. 다른 Route 에서 ProtectedRoute 의 기능이 필요하다면 동일하게 감싸주면 된다.
> 2. 적용이 매우 쉽고, 각 컴포넌트(ProtectedRoute, 원래 출력하고자 하는 콤포넌트)는 각자 할일만 할 수 있다.
>    (관심사의 분리)

## 후기

Navigate 의 replace 의 경우, 어떤 경우에 사용하는지는 알고 있었으나 어떻게 동작하는지<br />
명확히 알고 있지 않았습니다. 이번 기회를 통해 '내가 모호하게 알고 있었구나' 라는 것을 꺠닫기도 했구요.<br />
아무래도 현업에서 유지보수를 하고 있고, 그렇기에 Protected Route 와 같이 초기에 셋업하는 방식을<br />
직접 코드로 안써본지 꽤 된터라 리마인드를 확실히 해봤다는 점에서 얻어가는 점이 있다고 생각합니다.

또한 React Router Dom `Outlet` 은 듣기만 했었지 여태 활용해본 적이 없었기에 도움이 많이 되었습니다.<br />
중첩 라우팅, 레이아웃이라는 것이 어떻게 도움을 줄 수 있는지를 알 수 있었고, 직접 사용하면서<br />
그 원리를 파악했다는 점에서 좋은 경험이라고 생각합니다.
_(확실히 직접 사용해봐야 알겠다는 점 또한 다시금 느끼게 되었습니다.)_

기술적인 부분에서 얻어가는 부분도 많았고, 기존 시나리오에서 개발자가 구현하면서 더 생각해봐야할 점을<br />
고민하는 부분도 도움이 많이 되었습니다. 기획서를 분석하고, 개발하면서 목소리를 내는 것이 중요하기에<br />
아주 조그마한 스펙에서부터 생각하는 연습을 해봤다는 점에서 좋은 경험이라고 생각합니다.

시나리오대로 구현하고 끝이 아닌, 직접 테스트해보면서 '이건 좀 불편한데?', '다른 곳은 어떻게 되어있지?'<br />
와 같은 연결된 생각, 솔루션 찾기 등 이를 지속적으로 체득화하는 것을 목표로 연습해볼 생각입니다.

## 레퍼런스

- [react router history docs](https://v5.reactrouter.com/web/api/history)
- [kakao location replace 포스팅](https://fe-developers.kakaoent.com/2022/221124-router-without-library/#location-replace)
- [replace method MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location/replace)
- [react router useLocation hook docs](https://reactrouter.com/en/main/hooks/use-location)
- [react router Outlet docs](https://reactrouter.com/en/main/components/outlet)
