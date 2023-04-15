---
title: "나의 첫 번째 오픈소스 기여"
subtitle: "포기하지 않고 끝까지 파고들기"
date: "2023-04-15"
thumbnailUrl: "/images/firstContribute/thumbnail.jpg"
tag: "오픈소스,React,디버깅"
description: "문제를 정의하고, 좁혀가고, 해결 방안을 찾아가는 과정"
postingType: "post"
---

> 처음으로 오픈소스에 이슈를 등록하고, PR 을 올려 기여하게 되었습니다.<br />
> 문제 정의, 디버깅을 통해 문제 범위를 좁혀가고, 해결 방안을 찾아가는 과정을 기록하려 합니다. 🎉

## 오픈소스 기여?

<strong>"오픈소스"</strong> 여러분들은 이 단어를 보면 어떤 생각이 드시나요?<br />
'많은 시간이 들어가는 것', '기여해보고 싶다', '실력이 좋아야 할 수 있는거 아닐까?' 와 같은<br />
생각이 들 것 같습니다. 저도 똑같이 생각하고 있었거든요.

이렇게 생각하고 있던 제가 [Swiper](https://swiperjs.com/) 라는 슬라이더 오픈소스에 기여하게된 과정을 공유하고자 합니다. ⭐️

## 누락된 타입

회사 내 사이드 프로젝트를 진행하던 어느날..<br />
열심히 `슬라이드` 기능을 구현하기 위해 라이브러리를 찾고 있었습니다.<br />
라이브러리 도입을 위해 `React 지원`, `필요한 기능 지원`, `많은 사용 사례`, `유지 보수 여부` 등을 살펴보았고,<br />
최종적으로 [Swiper](https://github.com/nolimits4web/Swiper) 라는 라이브러리를 선택하게 되었습니다.

열심히 기능 구현을 하던 와중 타입 에러를 마주하게 되었습니다.<br />

![first error {{ w: 1600, h: 670, parentW: 50 }}](/images/firstContribute/first-error.png)

### [첫 번째 에러] 문제 정의

`null` 타입 지원이 안된다는 에러였으나,<br />
[공식 문서](https://swiperjs.com/react#controller)에서는 분명 초기값을 `null` 로 할당하는 것으로 쓰여있습니다.<br />
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

## cannot read properties of undefined

![second error {{ w: 1100, h: 1600, parentW: 30 }}](/images/firstContribute/second-error.png)

타입스크립트를 쓴 이 후로 되게 오랜만에 본 에러였습니다ㅠㅠ...<br />
첫 번째 에러인 타입 에러와 함께 계속 보인 에러 화면이며,<br />
이상하게 [Swiper Controller](https://swiperjs.com/react#controller) 를 사용하면 에러가 발생하고 있었습니다.<br />

첫 번째 에러와 마찬가지로 `문제 정의` 부터 시작했습니다.

### [두 번째 에러] 문제 정의

> Next js 에서 Swiper 라이브러리의 controller 기능을 사용할 경우 런타임 에러가 발생한다.

버그 발생 조건이 워낙 간단하여 issue 로 등록된 것이 없나 주의깊게 살펴보았고 역시나<br />
<strong>controller 외 다른 기능에서도 비슷한 에러가 많았으며, [controller 역시 동일 이슈](https://github.com/nolimits4web/swiper/issues/6216)가 있었습니다!</strong><br />

동일 이슈가 있다니 천만 다행입니다.. 그리고 해결책도 있었습니다!!<br />
해당 issue 에서 적힌 해결책은 controller 초기값에 `null` 이 아닌 `빈 객체`를 넣으라고 했습니다.

![first solution {{ w: 960, h: 260, parentW: 50 }}](/images/firstContribute/first-solution.png)

빈 객체를 넣어보니? 정말 잘 동작했습니다. "와 문제 해결~ 🎉" 이라고 마무리 지었을 수도 있지만<br />
빈 객체로 인한 타입 에러도 발생하고 있었고, 스스로도 찝찝하다는 생각이 자꾸만 들었습니다.<br />

👍 따봉 인증 마크도 5개, 이슈 제보자 분도 도움이 되었다고 했고 <br />
메인테이너도 해당 이슈를 확인 후 이슈 closed 를 했단 긍정적인 지표들이 보이고 있지만<br />
`이게 과연 최선의 해결책일까?` 라는 의문이 계속 들었습니다.

우선 일정을 위해 빈 객체 할당 후 프로젝트는 계속 진행 했으며,<br />
프로젝트와 별개로 퇴근을 하고 난 후 내가 정확히 어떤 의문점을 가지고 있는지<br />
차근차근 작성하기 시작하며 문제 해결을 위한 긴 여정을 시작했습니다.

제가 가지고 있는 의문점은 아래와 같습니다.

> 1. controller 의 타입에는 객체가 포함되어 있지 않다.<br />
>    그렇기 때문에 typescript 사용 시 type 에러가 발생한다.
> 2. 값이 없음을 명확히 표현하기 위해서 초기값은 null 이 맞는 것 같다.<br />
>    즉 빈 객체를 초기값으로 할당하는 것은 좋은 방향이 아닌 것 같다.
> 3. React 17 에서 null 을 할당했을 때 정상 동작을 했다는 것은 <br />
>    React 18 에서도 null 을 할당했을 때 정상 동작 해야한다는 의미로 해석할 수 있다.

3번의 내용처럼 React 17 에서는 controller 초기값에 null 을 할당하더라도<br />
문제의 에러가 발생하지 않았으며 그렇기에 지금의 해결책에 대해 더욱 의문이 생겼습니다.<br />
의문과 동시에 문제를 더 좁은 범위로 생각하여 하나의 가설을 세울 수 있었습니다.

> React 17, React 18 두 버전 사이에서 어떤 동작 차이로 인해 Swiper controller 동작에 이슈를 발생시켰다.

현재의 에러를 비교 확인하실 수 있는 테스트 환경입니다!<br />
직접 에러를 보시면서 읽어보시면 좋을 것 같아요! 🤗

- [React 17 + Swiper Controller codesandbox](https://codesandbox.io/s/swiper-testing-with-react-17-8mg7tl)
- [React 18 + Swiper Controller codesandbox](https://codesandbox.io/s/swiper-testing-with-react-18-bcm44v)

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

마침 디버깅하기 위해 확인한 controller value 에서도 `unmount` 의 흔적을 찾아볼 수 있었습니다.<br />

![destroyed controller {{ w: 1350, h: 180, parentW: 50 }}](/images/firstContribute/destroyed.png)

Swiper 소스 코드를 보면 `useIsomorphicLayoutEffect` hook (자체 custom hook) 에서<br />
[정리 함수로 destroy 관련 함수](https://github.com/nolimits4web/swiper/blob/3fbec6e5a730f073575f57422262585471eaae5b/src/react/swiper.js#L145)를 실행하는 것을 확인할 수 있었으며<br />
이는 React 18 의 변경된 strict mode 동작 방식에 의해 실행 되었다는 의미로 해석할 수 있습니다.

그렇다면 여기서 한가지 궁금증이 생깁니다.<br />

> StrictMode 를 사용하지 않는다면 지금의 문제는 발생하지 않는 것일까?

궁금하니 바로 실행으로 옮기겠습니다! next.config.js 에서 reactStrictMode 를 `false` 로 변경해보았습니다.<br />
결과는? 예상처럼 이슈는 발생하지 않았으며<br />
Swiper 객체가 정상적으로 할당된 것을 확인할 수 있었습니다.

![strict mode false {{ w: 1400, h: 150, parentW: 50 }}](/images/firstContribute/success-strict-mode.png)

이를 기점으로 가설은 곧 확신이 되었습니다.

> React 18 에서 변경된 strict mode 동작 방식이 Swiper controller 동작에 이슈를 발생시켰다.<br />
> React 17, React 18 에서의 어떠한 동작 차이 === strict mode 동작 방식 차이

### [두 번째 에러] 디버깅

이제 어느 부분이 의도와 다르게 동작되고 있는지 살펴보면 될 것 같습니다.<br />
에러 파악을 위한 힌트는 에러 화면에서 잘 보여주고 있습니다.<br />
위에서 본 에러 화면을 다시 볼까요?

![second error {{ w: 1100, h: 1600, parentW: 30 }}](/images/firstContribute/second-error.png)

지금은 잘 모르겠지만 updateSwiper 실행하고 이것저것 실행하다가 <br />
마지막 Swiper.maxTranslate 함수를 실행할 때 어떤 값이 `undefined` 인 상태여서 발생한 에러로 보입니다.<br />
천천히 위 에러 메시지를 기반으로 node modules 내 Swiper 라이브러리를 파헤치기 시작했습니다.<br />
동시에 정확한 원인 파악을 위해 마지막 실행 함수의 그 이전 `setControlledTranslate` 함수가 실행될 때<br />
관련 값들을 파악할 목적으로 `debugger` 를 사용했습니다.<br />
_(디버거 사용 방식은 이 [링크](https://ko.javascript.info/debugging-chrome)를 통해 참고하시면 됩니다!)_

그리고 이런 에러가 발생하게된 원인을 확인할 수 있었습니다!<br />

![conditional debugger {{ w: 800, h: 630, parentW: 40 }}](/images/firstContribute/conditional-debugger.png)

### [두 번째 에러] 에러 원인 파악

setControlledTranslate 내의 `c.maxTranslate()` 를 실행할 때 c 는 `{ destroyed: true }` 상태입니다.<br />
`{ destroyed: true }` 상태이지만 Swiper 객체이므로 maxTranslate 함수를 트래킹하여 소스 코드를 호출할 수 있습니다.<br />

![error destroyed {{ w: 1020, h: 680, parentW: 50 }}](/images/firstContribute/error-destroyed.png)

maxTranslate 함수를 실행하게 되면 `this.snapGrid` 배열에서 length 로 접근하게 됩니다.<br />
이 때 this 는 `c` 즉, `{ destroyed: true }` 상태의 Swiper 객체를 의미합니다.<br />
Swiper 객체에선 `snapGrid` 의 값을 확인할 수 없어 `undefined` 로 추론되고<br />
이 상태에서 length 로 접근해서 `cannot read properties of undefined` 에러가 발생하게 되었습니다.

![error function {{ w: 1690, h: 450, parentW: 50 }}](/images/firstContribute/error-function.png)

지금까지 파악된 내용을 기반으로 아래와 같이 정리할 수 있을 것 같습니다.<br />

> React 18 의 변경된 strict mode 동작 방식으로 인해<br />
> mount -> unmount -> mount 의 동작이 이루어졌고,<br />
> unmount 과정에서 destroyed 된 Swiper 객체를<br />
> controller 에서 사용하여 지금의 에러가 발생했다.

### [두 번째 에러] 에러 해결

destroyed 된 상태의 Swiper 객체에 접근하는 것을 막아주면 위 문제를 해결할 수 있을 것 같습니다.<br />
이왕이면 swiper 객체에 대한 validation 로직이 있는 곳에서 함께 처리하면 더 좋을 것 같아<br />
controller 로직 내에서 적절한 위치를 찾아 적용했습니다!

![conditional {{ w: 990, h: 128, parentW: 50 }}](/images/firstContribute/conditional.png)

`swiper.controller.setTranslate` 함수를 실행하면 `setControlledTranslate` 가 실행되게 됩니다.<br />
해당 함수는 Swiper 객체가 destroyed 된 상태에서 돌아가면 의미가 없고, 에러를 발생시키는 함수이므로<br />
`setTranslate` 함수 실행 전 early return 조건문에 추가하여 문제를 해결할 수 있었습니다.

### [두 번째 에러] 이슈 제보 및 PR

문제 해결책과 함께 신나는 마음으로 이슈 등록하는 과정에서 [동일한 이슈와 이미 해결이 되어있는 것](https://github.com/nolimits4web/swiper/issues/6491)을 확인했습니다. 😰<br />
되게 아쉬웠으나 해당 이슈에서의 해결책을 보면서 문제 해결은 했지만 조건문 위치를 수정하는 방향으로<br />
재수정이 가능할 것 같다는 생각이 들었습니다. 저는 해결을 할 때 하나의 조건을 더 고려했습니다.

> Swiper 객체에 대한 validation 로직이 있는 곳에서 함께 처리하자

해당 이슈에서의 처리 방식은 문제를 야기하는 `setControlledTranslate` 함수 내에서 destroyed 여부를<br />
확인 후 early return 하고 있으며, 그 외 불필요한 로직을 실행하는 것을 확인할 수 있었습니다.

다시 기쁜 마음으로 최대한 정중하게 [이슈를 등록](https://github.com/nolimits4web/swiper/issues/6552) 했으며 <br />
위 이슈에 대한 언급과 함께 동일한 문제를 해결한다는 점을 명시했습니다.

![second error issue {{ w: 2522, h: 1806, parentW: 50 }}](/images/firstContribute/second-error-issue.png)

그리고 해당 [이슈에 대한 PR](https://github.com/nolimits4web/swiper/pull/6555) 도 올리게 되었습니다!<br />
얼마 지나지 않아 메인테이너께서 해당 PR 을 확인 머지를 해주셨고, <br />
`저의 첫 오픈소스 PR 및 머지`를 했습니다!!! 🎉🎉🎉🎉🎉

![second error pr {{ w: 2500, h: 1480, parentW: 50 }}](/images/firstContribute/second-error-pr.png)

정말 짜릿한 순간이였습니다. 퇴근하면서 머지 여부를 확인했을 때 나도 모르게 밖에서 `예쓰!!!` 를 외쳤고,<br />
머지된 제 PR 과 master 브랜치에서 머지된 제 commit 을 봤을 땐 매우 행복했습니다 :D

![master branch commit {{ w: 2458, h: 476, parentW: 50 }}](/images/firstContribute/master-branch.png)

## 여전히 남아있는 의문점

저의 첫 오픈소스 기여는 저의 PR 이 머지되어 마무리 되었습니다.<br />
하지만 저는 개선, 해결해야할 문제가 있다고 생각합니다.<br />
_(물론 아닐 수도 있습니다! 디버깅 하면서 생각한 제 개인적인 의견입니다.)_

두 번째 에러에 대한 문제 정의 과정에서 아래 내용이 기억나시나요?

> controller 외 다른 기능에서도 비슷한 에러가 많았으며, controller 역시 동일 이슈가 있었습니다!

지금 Swiper 라이브러리 내에서 `Swiper 객체가 destroyed 된 상태`로 인해 발생하는 문제가 굉장히 많습니다.<br />
이 중 대부분의 문제는 저와 같이 `React 18 Strict mode` 로 인해 발생한다는 것도 확인할 수 있었습니다.

이 문제는 `destroyed` 된 곳을 확인하고 `early return` 하여 처리할 문제가 아니라는<br />
생각이 들었고 이건 단순히 여기저기 새는 곳을 막는 것 같다는 느낌을 받았습니다. 동시에<br />
변경된 Strict mode 방식의 목적을 반영하여 해결하는 것이 맞을 것 같다는 생각이 들었습니다.<br />
위에서 말한 목적은 React 는 **구성 요소가 여러 번 마운트되고 제거되는 효과는 탄력적** 이여야 한다는 리액트의 지향점으로 생각합니다.

이에 대한 디버깅은 시간이 될 때마다 진행하고 있습니다.<br />
지금까지 얻은 정보는 `useRef`, `변경된 strict mode` 이 두 가지가 섞이면서 발생한 이슈로 보입니다.<br />
이슈일지 개발자의 의도일지는 더 확인해봐야알 것 같지만 시간이 될 때마다 디버깅 해볼 생각입니다!

## 마무리

이번 오픈소스 기여하는 과정에서 배운 것은 꽤 많았습니다.<br />

### Chrome 디버깅 툴 활용

크롬 디버깅 툴을 이렇게 잘 활용해본 것은 처음이였으며,<br />
특히 [conditional breakpoint 기능](https://developer.chrome.com/blog/set-a-breakpoint-based-on-a-certain-condition/)은 문제를 찾는 과정에서 큰 도움이 되었습니다.

보통 console 을 찍으면서 해당 값을 하나하나 확인하며 문제를 파악했는데<br />
디버깅 툴을 통해서 처음 보는 오픈소스 임에도 불구하고 코드가 어떻게 흘러가는지<br />
흘러가는 과정에서 당시 사용하는 값들이 어떤 상태인지, this 는 무엇이고,<br />
현재 스코프 및 콜스택은 어떻게 되는지 등 많은 정보들을 볼 수 있었습니다.<br />
그리고 이런 정보들은 문제를 파악하는게 큰 도움이 된다는 점 또한 알 수 있었습니다.

### 자신감

오픈소스에 이슈를 올리는 것 그 자체가 되게 어렵고, '내가 해도 괜찮을걸까?' 등 자신감이<br />
부족해서 참여할 생각조차 못하고 있었으나, 이번 활동을 통해 자신감을 많이 얻을 수 있었습니다.<br />
오픈소스라는 것이 정말 Top 급의 개발자 분들이 아니더라도 평범한 사람도<br />
포기하지 않고, 이해하기 위한 노력을 들인다면 충분히 기여할 수 있다는 것 또한 느낄 수 있었습니다.<br />
다들 한 번쯤 기회가 오면 망설이지 않고 해보는 걸 추천드려요!

### React 공부

React 공부라고 말할 건 아니지만, React Strict mode 가 어떻게 변경되었고,<br />
무슨 의도를 가지고 이런 변화를 가져갔는지를 알 수 있었습니다.

이전에는 `strict mode 일 땐 두 번 실행되는구나` 정도만 알고 지나갔으나<br />
지금은 strict mode 일 떄 `mount -> unmount -> mount` 의 라이프사이클을 형성하고,<br />
이 과정에서 내부 코드들이 한 번 더 실행된다. 이는 이러한 라이플사이클 과정에서<br />
React 가 순수성을 가지고 동일하게 그리고 탄력적으로 실행되는지 여부를 알기 위해서이다.<br />
라는 목적까지도 인지하게 되었습니다.

그리고 현재는 useRef 에 대해서 확인 중에 있습니다.<br />
_(아직까지 남아있는 의문점을 위해서 공부 중입니다.)_

또한 저는 그저 문서나 책을 읽는 것보단 직접 그 문제와 이슈 속에 뛰어들어<br />
경험하고, 그 속에서 문제 해결을 위해 찾아보는 과정에서 더 빠르게 이해하고 습득한다는 것을 알 수 있었습니다.

### 최종 후기

오픈소스 기여라는 것이 되게 가깝게 느껴집니다.<br />
그리고 언제나처럼 문제를 정의하고, 풀어나가는 일련의 과정은 굉장히 즐겁다는 것 역시 느낄 수 있었습니다.<br />
문제 해결에 절대적인 정답은 없고, 언제나 더 좋은 선택지를 찾기 위해 노력해야하며<br />
이를 위해 계속 문제를 정의하고 좁혀나가고 이윽고 해결까지 도달하는 경험은 개발의 설렘을 가져다주었습니다.

내가 사용하고 있는 라이브러리의 contributor 가 되었다는 것<br />
어쩌면 나와 비슷한 문제로 인해 고통받았을 여러 개발자들에게 보탬이 되었다는 것을 생각하면서<br />
뿌듯함과 자신감을 많이 얻고 있습니다. :D

릴리즈 노트에 기입되어 있는 저의 이슈, PR 사진과 함께 이 포스팅을 마무리 지으려고 합니다.<br />
긴 글 읽어주셔서 정말 감사합니다!

![null issue release note {{ w: 2440, h: 1780, parentW: 50 }}](/images/firstContribute/null-issue.png)

![control issue release note {{ w: 2440, h: 1580, parentW: 50 }}](/images/firstContribute/control-issue.png)
