---
title: "백준 1158-요세푸스"
date: "2024-04-15"
tag: "stack"
---

## 문제

> <a href="https://www.acmicpc.net/problem/1158"target="_blank">문제 링크</a>

요세푸스 문제는 다음과 같다.

1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K) 요세푸스 순열이라고 한다. 예를 들어 (7, 3) 요세푸스 순열은 3, 6, 2, 7, 5, 1, 4이다.

N과 K가 주어지면 (N, K) 요세푸스 순열을 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 N과 K가 빈 칸을 사이에 두고 순서대로 주어진다. `(1 ≤ K ≤ N ≤ 5,000)`

## 출력

예제와 같이 요세푸스 순열을 출력한다.

## 풀이

```ts
function solution(n, k) {
  const queue = [];
  const answers = [];

  let targetIndex = 1;

  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  while (queue.length) {
    const shiftedItem = queue.shift();

    if (targetIndex % k === 0) {
      answers.push(shiftedItem);
    } else {
      queue.push(shiftedItem);
    }

    targetIndex++;
  }

  console.log(`<${answers.join(", ")}>`);
}
```

## 설명

특정 index 의 값을 찾아야하는 문제이며, 문제를 풀 떄 중요한 키워드는 `순서`, `반복` 으로 생각했습니다. 요소가 제거된 후에도 순서에 맞춰 순회해야한다는 점을 통해 큐 자료구조를 활용하면 문제를 쉽게 풀 수 있을 것 같았습니다. `순회하면서 삭제 대상 index 인 경우엔 제거하고 아닌 경우엔 맨 뒤로 돌려보낸다` 라는 방식으로 구현했습니다.

> 1. for 문으로 순회하여 초기 배열 요소를 구성합니다.
> 2. while 문을 통해 모든 요소가 사라질 때까지 내부 로직을 반복합니다.
> 3. 큐에서 첫 요소를 가져옵니다.
> 4. 첫 요소가 해당하는 index 의 배수가 맞는지 확인합니다. 맞다면 제거 대상이므로 첫 요소를 결과 리스트에 넣고, 아니라면 큐에 다시 push 합니다.
> 5. targetIndex 는 while 문을 반복하면서 계속 증가시켜 문제 조건에 맞게 제거 대상을 찾도록 합니다.
