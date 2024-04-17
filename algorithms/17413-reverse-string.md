---
title: "백준 17413-단어뒤집기2"
date: "2024-04-17"
tag: "문자열 뒤집기"
---

## 문제

> <a href="https://www.acmicpc.net/problem/17413"target="_blank">문제 링크</a>

문자열 S가 주어졌을 때, 이 문자열에서 단어만 뒤집으려고 한다.

먼저, 문자열 S는 아래와과 같은 규칙을 지킨다.

> 1. 알파벳 소문자('a'-'z'), 숫자('0'-'9'), 공백(' '), 특수 문자(`<`, `>`)로만 이루어져 있다.
> 2. 문자열의 시작과 끝은 공백이 아니다.
> 3. `<`와 `>`가 문자열에 있는 경우 번갈아가면서 등장하며, `<`이 먼저 등장한다. 또, 두 문자의 개수는 같다.

태그는 `<`로 시작해서 `>`로 끝나는 길이가 3 이상인 부분 문자열이고, `<`와 `>` 사이에는 알파벳 소문자와 공백만 있다. 단어는 알파벳 소문자와 숫자로 이루어진 부분 문자열이고, 연속하는 두 단어는 공백 하나로 구분한다. 태그는 단어가 아니며, 태그와 단어 사이에는 공백이 없다.

## 입력

첫째 줄에 문자열 S가 주어진다. S의 길이는 100,000 이하이다.

## 출력

첫째 줄에 문자열 S의 단어를 뒤집어서 출력한다.

## 풀이

```ts
function solution(targetList) {
  const answers = [];
  let reverseTarget = [];

  let isOpen = false;

  for (let i = 0; i < targetList.length; i++) {
    const currentValue = targetList[i];

    if (currentValue === "<") {
      if (reverseTarget.length) {
        const result = reverseTarget
          .join("")
          .split(" ")
          .map((value) => value.split("").reverse().join(""));

        answers.push(result.join(" "));
        reverseTarget = [];
      }
      isOpen = true;
      answers.push(currentValue);
    } else if (currentValue === ">") {
      isOpen = false;
      answers.push(currentValue);
    } else if (isOpen) {
      answers.push(currentValue);
    } else {
      reverseTarget.push(currentValue);
    }
  }

  if (reverseTarget.length) {
    const result = reverseTarget
      .join("")
      .split(" ")
      .map((value) => value.split("").reverse().join(""));

    answers.push(result.join(" "));
    reverseTarget = [];
  }

  console.log(answers.join(""));
}
```

## 설명

정규표현식을 사용하면 쉽게 풀 수 있을 것 같았으나, 우선 이를 사용하지 않고 풀이하는 방향으로 진행했습니다. 키워드는 `<> 는 제외`, `단어만` 정도로 확인된다. 총 두 가지의 배열과 flag 변수를 통해 문제를 풀었습니다. `결과를 담을 배열`, `reverse 대상 배열` `<> 체크용 변수` 입니다. reverse 대상 배열은 순회 중인 값이 `<` 가 나왔을 때와 모두 순회하고난 후 reverse 대상 배열이 남아있을 때 처리하면 순서에 문제 없이 결과 배열에 넣을 수 있을 것으로 예상했습니다.

> 1. `결과를 담을 배열`, `reverse 대상 배열` `<> 체크용 변수` 선언합니다.
> 2. 주어진 값을 순회합니다.
> 3. 현재 순회 중인 값이 `<`, `>` 에 따라 flag 변수의 값을 할당합니다.
> 4. 만약 open 상태라면 `<>` 내부의 값이므로 그대로 결과 배열에 push 합니다.
> 5. 만약 close 상태라면 reverse 를 해야할 대상 `단어` 이므로 reverse 대상 배열에 push 합니다.
> 6. `<` 를 만났을 떄, reverse 대상 배열의 무언가 있다면 먼저 reverse 를 합니다. (순서를 맞추기 위해)
> 7. 모든 순회를 마쳤을 때 `reverse 대상 배열` 에 무언가 있었다면 `<>` 이 없었던 문제이므로, reverse 로직을 실행합니다.
