---
title: "나의 첫 번째 오픈소스 기여"
subtitle: "포기하지 않고 끝까지 파고들기"
date: "2023-04-12"
thumbnailUrl: "/images/firstContribute/thumbnail.jpg"
tag: "오픈소스,React,디버깅"
description: "문제를 정의하고, 좁혀가고, 해결 방안을 찾아가는 과정"
postingType: "post"
---

> 처음으로 오픈소스에 이슈를 등록하고, PR 을 올려 기여하게 되었습니다.<br />
> 문제 정의, 디버깅을 통해 문제 범위를 좁혀가고, 해결 방안을 찾아가는 과정을 기록하려 합니다. 🎉

## 오픈소스 기여?

<strong>"오픈소스"</strong> 여러분들은 이 단어를 보면 어떤 생각이 드시나요?<br />
'많은 시간이 들어가는 것', '기여해보고 싶다', '실력이 좋아야 할 수 있는거 아닐까?' 와<br />
같은 생각이 들 것 같습니다. 저도 똑같이 생각하고 있었거든요.

이렇게 생각하고 있던 제가 [Swiper](https://swiperjs.com/) 라는 슬라이더 오픈소스에 기여하게된 과정을 공유하고자 합니다. ⭐️

## [첫 번째 에러] 누락된 타입

회사 내 사이드 프로젝트를 진행하던 어느날..<br />
열심히 `슬라이드` 기능을 구현하기 위해 라이브러리를 찾고 있었습니다.<br />
라이브러리 도입을 위해 `React 지원`, `기능 지원`, `많은 사용 사례`, `유지 보수 여부` 등을 살펴보았고,<br />
최종적으로 [Swiper](https://github.com/nolimits4web/Swiper) 라는 라이브러리를 선택하게 되었습니다.

열심히 기능 구현을 하던 와중 타입 에러를 마주하게 되었습니다.<br />

![first error {{ w: 1600, h: 670, parentW: 50 }}](/images/firstContribute/first-error.png)

### [첫 번째 에러] 문제 정의

`null` 타입 지원이 안된다는 에러였으나,<br />
[공식 문서](https://swiperjs.com/react#controller)에서는 분명 초기값으로 `null` 을 할당하는 방식으로 쓰여있습니다.<br />
"내가 뭔가 잘못 생각한건가?", "공식 문서가 잘못된거 아닌가?", "관련해서 이슈는 없나?" 등<br />
많은 생각과 함께 천천히 이슈를 파악하고, 분석을 진행했으며,<br />
분석 진행 결과 `"이건 수정이 필요한 것이 맞다!"` 였습니다.

### [첫 번째 에러] 이슈 제보

이슈를 등록하기 전까지 수도 없이 검증, 또 검증하였고,<br />
저의 [첫 오픈소스 이슈 등록](https://github.com/nolimits4web/swiper/issues/6505)을 하게 되었습니다. 🎉<br />
_(당시 찍어둔 사진이 없어 글 작성할 시점에 찍어둔 사진으로 대체합니다.)_

![first error issue {{ w: 2520, h: 1850, parentW: 50 }}](/images/firstContribute/first-error-issue.png)

### [첫 번째 에러] 문제 해결

얼마 지나지 않아, 메인테이너 분께서 [null 타입 추가하는 커밋](https://github.com/nolimits4web/swiper/commit/3177936a725ece8d076a5f481ae927325f41c0ec)을 남겨주시면서<br />
첫 번째 에러 해결과 함께 무사히 저의 이슈는 닫히게 되었습니다. 🎉

하지만 null 타입 지원 이슈 말고 다른 문제도 있었으니..<br />
그건 바로 개발 환경에서 실행조차 못하게 하는 치명적인 에러였습니다.

## [두 번째 에러] cannot read properties of undefined

![second error {{ w: 1100, h: 1600, parentW: 30 }}](/images/firstContribute/second-error.png)

타입스크립트를 쓴 이 후로 되게 오랜만에 본 에러였습니다ㅠㅠ...<br />
첫 번째 에러인 타입 에러와 함께 계속 보인 에러 화면이며,<br />
이상하게 [Swiper Controller](https://swiperjs.com/react#controller) 를 사용하면 에러가 발생하고 있었습니다.<br />
이번 에러 해결을 위해 `문제 정의`를 제일 먼저 진행했습니다.

### [두 번째 에러] 문제 정의

> Next js 에서 Swiper 라이브러리의 controller 기능을 사용할 경우 런타임 에러가 발생한다.

버그 발생 조건이 워낙 간단하여 issue 로 등록된 것이 없나 주의깊게 살펴보았고 역시나<br />
<strong>controller 외에도 다른 기능에서도 비슷한 에러가 많았고, controller 역시 동일 이슈가 있었습니다!</strong><br />
_(이번 포스팅을 마무리할 때 다시 언급할 내용입니다! 위 줄의 내용을 기억해주세요!)_

동일 이슈가 있다니 천만 다행입니다.. 그리고 해결책도 있었습니다!!<br />

- [Swiper Controller module error](https://github.com/nolimits4web/swiper/issues/6216)

해당 issue 에서 적힌 해결책은 controller 초기값에 `null` 이 아닌 `빈 객체`를 넣으라고 했습니다.

![first solution {{ w: 960, h: 260, parentW: 50 }}](/images/firstContribute/first-solution.png)

빈 객체를 넣어보니? 정말 잘 동작했습니다. "와 문제 해결~ 🎉" 이라고 마무리 지었을 수도 있지만<br />
빈 객체로 인한 타입 에러도 발생하고 있었고, 스스로도 찝찝하다는 생각이 자꾸만 들었습니다.<br />

👍 따봉 인증 마크도 5개, 이슈 제보자 분도 도움이 되었다고 했고 <br />
메인테이너도 해당 이슈를 확인 후 이슈 closed 를 했단 긍정적인 지표들이 보이고 있지만<br />
자꾸만 `이게 과연 최선의 해결책일까?` 라는 의문이 들었습니다.

우선 일정을 위해 빈 객체 할당 후 프로젝트는 계속 진행 했으며,<br />
프로젝트와 별개로 퇴근을 하고 난 후 내가 정확히 어떤 의문점을 가지고 있는지부터<br />
차근차근 작성하기 시작하며 문제 해결을 위한 긴 여정을 시작했습니다.

#### 의문점 (개인적인 의견)

> 1. controller 의 타입에는 객체가 포함되어 있지 않다.<br />
>    그렇기 때문에 typescript 사용 시 type 에러가 발생한다.
> 2. 값이 없음을 명확히 표현하기 위해서 초기값은 null 이 맞는 것 같다.<br />
>    즉 빈 객체를 초기값으로 할당하는 것은 좋은 방향이 아닌 것 같다.
> 3. React 17 에서는 정상 동작을 했다는 것은 React 18 에서도<br />
>    null 을 할당했을 때 정상 동작해야한다는 의미로 해석할 수 있다.

3번의 내용처럼 React 17 에서는 controller 초기값에 null 을 할당하더라도<br />
문제의 에러가 발생하고 있지 않았고, 그렇기에 지금의 해결책에 대해 더욱 의문이 생겼습니다.<br />
의문과 동시에 문제를 더 좁은 범위로 생각하여 하나의 가설을 세울 수 있습니다.

> React 17, React 18 에서의 어떠한 동작 차이로 인해 Swiper controller 동작에 이슈를 발생시켰다.

### [두 번째 에러] 문제 좁히기

React 17 에서 18 로 넘어오면서 어떤 변경점이 있었는지 확인하기 시작했고,<br />
React 18 의 새로운 기능을 정리한 [docs](https://react.dev/blog/2022/03/29/react-v18) 를 토대로 확인했습니다.<br />
Concurrent, Suspense, Server Component 등 다양한 추가, 변경사항이 있었고<br />
그 중에서 눈에 띄는 건 [변경된 Strict Mode 동작 방식](https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors)이였습니다.

요약하자면 아래와 같습니다.

> 앞으로는 React 가 상태를 유지하면서 UI 섹션을 추가하고 제거할 수 있는 기능을 추가하고 싶다.<br />
> 구성 요소가 여러 번 마운트되고 제거되는 효과는 resilient 해야한다.<br />
> React 18 에서는 이 과정에서 발생할 수 있는 문제를 쉽게 도출하기 위한 새로운 strict mode 검사를 도입한다.<br />
> 구성 요소가 처음으로 마운트될 때마다 자동으로 모든 구성 요소를 <br />
> unmount 후 다시 mount 하여 이전 상태를 복원한다.

마침 에러를 디버깅하기 위해 찍은 controller value 에서도 `unmount` 의 흔적을 찾아볼 수 있었습니다.<br />

![destroyed controller {{ w: 1350, h: 180, parentW: 50 }}](/images/firstContribute/destroyed.png)

Swiper 소스 코드를 보면 `useIsomorphicLayoutEffect` hook (자체 custom hook) 에서<br />
정리 함수로 destroy 관련 함수를 실행하는 것을 확인할 수 있었으며<br />
이는 React 18 의 변경된 strict mode 동작 방식에 의해 실행 되었다는 의미로 해석할 수 있습니다.

그렇다면 여기서 한가지 궁금증이 생깁니다.<br />

> StrictMode 를 사용하지 않는다면 지금의 문제는 발생하지 않는 것일까?

궁금증은 바로 풀어야죠? next.config.js 에서 reactStrictMode 를 `false` 로 변경해보았습니다.<br />
결과는? 역시 예상처럼 이슈는 발생하지 않았으며<br />
아래 이미지와 같이 Swiper 객체가 정상적으로 할당된 것을 확인할 수 있었습니다.

![strict mode false {{ w: 1400, h: 150, parentW: 50 }}](/images/firstContribute/success-strict-mode.png)

이를 기점으로 가설은 곧 확신이 되었습니다.

> React 18 에서 변경된 strict mode 동작 방식이 Swiper controller 동작에 이슈를 발생시켰다.<br />
> React 17, React 18 에서의 어떠한 동작 차이 === strict mode 동작 방식

### [두 번째 에러] 디버깅

이제 어느 부분이 의도와 다르게 동작되고 있는지 살펴보면 될 것 같습니다.<br />
에러 파악을 위한 힌트는 에러 화면에서 잘 보여주고 있습니다.<br />
위에서 본 에러 화면을 다시 볼까요?

![second error {{ w: 1100, h: 1600, parentW: 30 }}](/images/firstContribute/second-error.png)

지금은 잘 모르겠지만 updateSwiper 실행하고 이것저것 실행하다가 <br />
마지막 Swiper.maxTranslate 함수를 실행할 때 어떤 값이 `undefined` 인 상태여서 발생한 에러로 보입니다.
