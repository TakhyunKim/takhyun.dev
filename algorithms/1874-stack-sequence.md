---
title: "백준 1874-스택 수열"
date: "2024-04-12"
tag: "stack,수열"
---

## 문제

> <a href="https://www.acmicpc.net/problem/1874"target="_blank">문제 링크</a>

## 문제

스택 (stack)은 기본적인 자료구조 중 하나로, 컴퓨터 프로그램을 작성할 때 자주 이용되는 개념이다. 스택은 자료를 넣는 (push) 입구와 자료를 뽑는 (pop) 입구가 같아 제일 나중에 들어간 자료가 제일 먼저 나오는 (LIFO, Last in First out) 특성을 가지고 있다.

1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써, 하나의 수열을 만들 수 있다. 이때, 스택에 push하는 순서는 반드시 오름차순을 지키도록 한다고 하자. 임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 없는지, 있다면 어떤 순서로 push와 pop 연산을 수행해야 하는지를 알아낼 수 있다. 이를 계산하는 프로그램을 작성하라.

## 입력

첫 줄에 n (1 ≤ n ≤ 100,000)이 주어진다. 둘째 줄부터 n개의 줄에는 수열을 이루는 1이상 n이하의 정수가 하나씩 순서대로 주어진다. 물론 같은 정수가 두 번 나오는 일은 없다.

## 출력

입력된 수열을 만들기 위해 필요한 연산을 한 줄에 한 개씩 출력한다. push연산은 +로, pop 연산은 -로 표현하도록 한다. 불가능한 경우 NO를 출력한다.

## 풀이

```ts
function solution(n, targetList) {
  const stack = [];

  let answers = [];
  let pushTargetNumber = 1;

  for (let i = 0; i < n; i++) {
    let popTargetNumber = targetList[i];

    while (pushTargetNumber <= popTargetNumber) {
      stack.push(pushTargetNumber);
      pushTargetNumber++;
      answers.push("+");
    }

    if (stack.at(-1) === popTargetNumber) {
      stack.pop();
      answers.push("-");
    } else {
      answers = ["NO"];
      break;
    }
  }

  console.log(answers.join("\n"));
}
```

## 설명

문제 유형이 스택이므로, 배열을 활용하여 문제를 풀었습니다. 문제를 풀 때 생각해야할 핵심 키워드는 `스택에 push하는 순서는 반드시 오름차순` 로 생각했고, `수열을 만들기 위해 찾아야하는 요소가 될 때까지 stack 에 push 해야한다` 라는 생각이 가장 먼저 들었습니다. 해당 생각을 시작으로 문제를 풀었습니다.

> 1. for 문으로 순회하며 만들어야할 수열의 초기 요소를 지정합니다.
> 2. 오름차순으로 stack 에 push 해야한다는 조건을 만족하기 위해 while 문으로 수열의 초기 요소의 값만큼 stack 에 push 해야할 값을 1씩 증가하면서 해당 값을 push 합니다. (ex: 1, 2, 3, 4 순으로)
> 3. 초기 요소의 값에 도달했다면 while 문을 마치고, 스택의 최상위 요소가 수열의 초기 요소와 일치하는지 비교합니다. 일치한다면 스택에서 최상위 요소를 제거합니다. 만약 같지 않다면, 오름차순 스택을 통해 만들 수 없는 수열이므로 NO 를 할당하고 마칩니다.
