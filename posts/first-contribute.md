---
title: "나의 첫 번째 오픈소스 기여"
subtitle: "포기하지 않고 문제 해결까지"
date: "2023-04-12"
thumbnailUrl: "/images/firstContribute/thumbnail.jpg"
tag: "오픈소스,React,디버깅"
description: "문제를 정의하고, 좁혀가고, 해결 방안을 찾아가는 과정"
postingType: "post"
---

> 처음으로 오픈소스에 이슈를 등록하고, PR 을 올려 기여하게 되었습니다.<br />
> 문제 정의, 디버깅을 통해 문제 범위를 좁혀가고, 해결 방안을 찾아가는 과정을 기록하려 합니다. 🎉

## 오픈소스 기여?

<strong>"오픈소스"</strong> 여러분들은 "오픈소스" 란 것을 보면 어떤 생각이 드시나요?<br />
'기여해보고 싶다.', '많은 시간이 들어가는 것', '실력이 좋아야 할 수 있는거 아닐까?', '어떻게 시작해야하지?'<br />
과 같은 생각이 들 것 같습니다. 저도 똑같이 생각하고 있었거든요.

이렇게 생각하고 있던 제가 오픈소스를 기여하게된 과정을 공유하고자 합니다. ⭐️

## [첫 번째 에러] 누락된 타입

회사 내 사이드 프로젝트를 진행하던 어느날..<br />
열심히 `슬라이드` 기능을 구현하기 위해 라이브러리를 찾고 있었습니다.<br />
라이브러리 도입을 위해 `React 지원`, `기능 지원`, `많은 사용 사례`, `유지 보수 여부` 등을 살펴보았고,<br />
최종적으로 [Swiper](https://github.com/nolimits4web/Swiper) 라는 라이브러리를 선택하게 되었습니다.

열심히 기능 구현을 하던 와중 타입 에러를 마주하게 되었습니다.<br />

![first error {{ w: 1600, h: 670, parentW: 50 }}](/images/firstContribute/first-error.png)

`null` 타입 지원이 안된다는 에러였으나,<br />
[공식 문서](https://swiperjs.com/react#controller)에서는 분명 초기값으로 `null` 을 할당하는 방식으로 쓰여있습니다.

![first error {{ w: 1470, h: 400, parentW: 50 }}](/images/firstContribute/first-error-docs.png)

"내가 뭔가 잘못 생각한건가?", "공식 문서가 잘못된거 아닌가?", "관련해서 이슈는 없나?" 등<br />
많은 생각과 함께 천천히 이슈를 파악하고, 분석을 진행했으며,<br />
분석 진행 결과 `"이건 수정이 필요한 것이 맞다!"` 였습니다.

이슈로 인해 꽉 막혀버린 사이드 프로젝트를 생각하며 빠르게 이슈 등록을 하며<br />
저의 [첫 오픈소스 이슈 등록](https://github.com/nolimits4web/swiper/issues/6505)을 하게 되었습니다. 🎉<br />
_(당시 찍어둔 사진이 없어 글 작성할 시점에 찍어둔 사진으로 대체합니다.)_

![first error {{ w: 2520, h: 1850, parentW: 50 }}](/images/firstContribute/first-error-issue.png)

얼마 지나지 않아, 메인테이너 분께서 [null 타입 추가하는 커밋](https://github.com/nolimits4web/swiper/commit/3177936a725ece8d076a5f481ae927325f41c0ec)을 남겨주시면서<br />
첫 번째 에러를 해결할 수 있게 되었습니다. 🎉

하지만 null 타입 지원 이슈 말고 다른 문제도 있었으니..<br />
그건 바로 개발 환경에서 실행조차 못하게 하는 치명적인 에러가 있었습니다.<br />

## [두 번째 에러] controller destroy

![first error {{ w: 1100, h: 1600, parentW: 30 }}](/images/firstContribute/second-error.png)
