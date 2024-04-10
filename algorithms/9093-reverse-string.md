---
title: "백준 9093-단어 뒤집기"
date: "2024-04-10"
tag: "stack,문자열 뒤집기"
---

## 문제

> <a href="https://www.acmicpc.net/problem/9093" target="_blank">문제 링크</a>

문장이 주어졌을 때, 단어를 모두 뒤집어서 출력하는 프로그램을 작성하시오. 단, 단어의 순서는 바꿀 수 없다. 단어는 영어 알파벳으로만 이루어져 있다.

첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있으며, 문장이 하나 주어진다. 단어의 길이는 최대 20, 문장의 길이는 최대 1000이다. 단어와 단어 사이에는 공백이 하나 있다.

## 퓰이

```ts
function solution(targetList) {
  const answers = [];

  for (i = 0; i < targetList.length; i++) {
    const reversedList = [];
    const target = targetList[i].split(" ");

    for (j = 0; j < target.length; j++) {
      const reversedTarget = target[j].split("").reverse().join("");
      reversedList.push(reversedTarget);
    }

    answers.push(reversedList.join(" "));
  }

  console.log(answers.join("\n"));
}

solution(targetInput);
```

## 설명

문제 유형은 스택이나, 문자열 뒤집기는 split(String method), reverse(Array method) 을 통해 쉽게 풀 수 있을 것 같아 해당 method 를 활용하여 문제를 풀었습니다. 접근 방식은 다음과 같습니다.

> 1. for 문을 통해 문자열 뒤집기 대상 배열을 순회합니다.
> 2. 대상 문자열은 문장 구조를 가질 수 있으므로, 내부에 뒤집기한 문자열을 보관할 배열을 선언합니다.<br />(ex: 'I am happy today')
> 3. 대상 문자열을 띄어쓰기 기준으로 split 하여 배열화합니다.
> 4. 배열화한 문자열을 for 문으로 순회합니다.
> 5. 띄어쓰기로 분리된 문자열을 reverse 합니다. 문자열이므로 split("")으로 단어 별로 분리한 후 reverse 했으며, 이 후 join("")을 통해 뒤집은 문자열을 합칩니다.
> 6. 뒤집기한 문자열을 배열에 보관합니다.
> 7. 처음 for 문이 끝날 지점에선 뒤집은 문자열 list 를 보관합니다.
> 8. 이를 출력합니다.
