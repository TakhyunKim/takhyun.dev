---
title: "백준 10866-덱"
date: "2024-04-16"
tag: "queue"
---

## 문제

> <a href="https://www.acmicpc.net/problem/10866" target="_blank">문제 링크</a>

정수를 저장하는 덱(Deque)를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

> - push_front X: 정수 X를 덱의 앞에 넣는다.
> - push_back X: 정수 X를 덱의 뒤에 넣는다.
> - pop_front: 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
> - pop_back: 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
> - size: 덱에 들어있는 정수의 개수를 출력한다.
> - empty: 덱이 비어있으면 1을, 아니면 0을 출력한다.
> - front: 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
> - back: 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.

## 입력

첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 10,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.

## 출력

출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.

## 풀이

```ts
function solution(commands) {
  const queue = [];
  const answers = [];

  const command = {
    push_front: (value) => {
      queue.unshift(value);
    },
    push_back: (value) => {
      queue.push(value);
    },
    pop_front: () => {
      queue.length === 0 ? answers.push(-1) : answers.push(queue.shift());
    },
    pop_back: () => {
      queue.length === 0 ? answers.push(-1) : answers.push(queue.pop());
    },
    size: () => {
      answers.push(queue.length);
    },
    empty: () => {
      queue.length === 0 ? answers.push(1) : answers.push(0);
    },
    front: () => {
      queue.length === 0 ? answers.push(-1) : answers.push(queue[0]);
    },
    back: () => {
      queue.length === 0 ? answers.push(-1) : answers.push(queue.at(-1));
    },
  };

  commands.forEach((commandInfo) => {
    const [currentCommand, value] = commandInfo.split(" ");

    if (currentCommand === "push_front" || currentCommand === "push_back") {
      command[currentCommand](value);
    } else {
      command[currentCommand]();
    }
  });

  return answers.join("\n");
}
```

## 설명

본적으로 제공되는 배열의 Method 를 활용하면 쉽게 문제를 풀 수 있을 것 같아 배열을 활용했습니다. 코드는 크게 두 개를 생각했습니다. **각각의 command 를 정의하는 코드**, **실행해야할 command 를 순회하면서 실행하는 코드**입니다.

> 1. command 실행 후 결과 값을 담을 `queue` 와 command 실행 후 출력 값을 담을 `answer` 을 선언합니다.
> 2. 주어진 조건에 따라 command 를 선언합니다. array 의 shift, pop, at 등을 활용하여 구현합니다.
> 3. 실행해야할 command 를 forEach 를 통해 순회합니다. 이 때 push command 만 실행 시 값을 전달해야한다는 점을 반영하여 조건문을 작성했습니다.
> 4. 예제 출력에 맞도록 `join("\n")` 을 사용했습니다.
