---
title: "개선 일기 - storybook 을 더 쉽게"
subtitle: "Storybook with MSW"
date: "2024-09-29"
thumbnailUrl: "/images/improvementStorybook/thumbnail.png"
tag: "storybook,msw"
description: "storybook, msw, easy"
postingType: "post"
---

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

`배보다 배꼽이 더 크다.`, 주객 전도, 정작 커야할 것이 작고, 작아야 할 것이 클 때 쓰는 말입니다.<br />
Storybook 으로 Page 단위 Story 를 관리할 때 이런 느낌을 받았습니다.

각 페이지에서 사용하는 데이터를 모킹해서 적용한 Story 는 시간이 지날수록 거대한 배꼽이 되고 있었습니다.<br />
페이지 요구사항이 변경되어 수정하면 Story 도 함꼐 수정해야하는데 이게 보통 비용이 아니였습니다.

비주얼 사이드 이펙트를 쉽게 확인하기 위해 적용한 기술이 어느덧 저를 지치게 하는 기술로 느껴지는 순간이였습니다.<br />
지치게 되는 순간부터 관리를 하기 어려워지며, 아름다웠던 Story 들은 더이상 원래 기능을 할 수 없게 됩니다.

이게 제가 불편하다고 느낀 부분입니다.
