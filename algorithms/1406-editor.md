---
title: "백준 1406-에디터"
date: "2024-04-13"
tag: "stack"
---

## 문제

> <a href="https://www.acmicpc.net/problem/1406"target="_blank">문제 링크</a>

한 줄로 된 간단한 에디터를 구현하려고 한다. 이 편집기는 영어 소문자만을 기록할 수 있는 편집기로, 최대 600,000글자까지 입력할 수 있다.

이 편집기에는 '커서'라는 것이 있는데, 커서는 문장의 맨 앞(첫 번째 문자의 왼쪽), 문장의 맨 뒤(마지막 문자의 오른쪽), 또는 문장 중간 임의의 곳(모든 연속된 두 문자 사이)에 위치할 수 있다. 즉 길이가 L인 문자열이 현재 편집기에 입력되어 있으면, 커서가 위치할 수 있는 곳은 L+1가지 경우가 있다.

이 편집기가 지원하는 명령어는 다음과 같다.

> - L 커서를 왼쪽으로 한 칸 옮김 (커서가 문장의 맨 앞이면 무시됨)<br/>
> - D 커서를 오른쪽으로 한 칸 옮김 (커서가 문장의 맨 뒤이면 무시됨)<br/>
> - B 커서 왼쪽에 있는 문자를 삭제함 (커서가 문장의 맨 앞이면 무시됨)<br/>
> - 삭제로 인해 커서는 한 칸 왼쪽으로 이동한 것처럼 나타나지만, 실제로 커서의 오른쪽에 있던 문자는 그대로임<br/>
> - P $ $라는 문자를 커서 왼쪽에 추가함<br/>

초기에 편집기에 입력되어 있는 문자열이 주어지고, 그 이후 입력한 명령어가 차례로 주어졌을 때, 모든 명령어를 수행하고 난 후 편집기에 입력되어 있는 문자열을 구하는 프로그램을 작성하시오. 단, 명령어가 수행되기 전에 커서는 문장의 맨 뒤에 위치하고 있다고 한다.

## 입력

첫째 줄에는 초기에 편집기에 입력되어 있는 문자열이 주어진다. 이 문자열은 길이가 N이고, 영어 소문자로만 이루어져 있으며, 길이는 100,000을 넘지 않는다. 둘째 줄에는 입력할 명령어의 개수를 나타내는 정수 M(1 ≤ M ≤ 500,000)이 주어진다. 셋째 줄부터 M개의 줄에 걸쳐 입력할 명령어가 순서대로 주어진다. 명령어는 위의 네 가지 중 하나의 형태로만 주어진다.

## 출력

첫째 줄에 모든 명령어를 수행하고 난 후 편집기에 입력되어 있는 문자열을 출력한다.

## 풀이 (메모리 초과로 실패)

```ts
function solution(targetValue, commands) {
  let copiedTargetValue = targetValue.split("");
  let cursorPosition = copiedTargetValue.length;

  const command = {
    L: () => {
      if (cursorPosition === 0) return;

      cursorPosition--;
    },
    D: () => {
      if (cursorPosition === copiedTargetValue.length) return;

      cursorPosition++;
    },
    B: () => {
      if (cursorPosition === 0) return;

      copiedTargetValue.splice(cursorPosition - 1, 1);
      cursorPosition--;
    },
    P: (value) => {
      copiedTargetValue.splice(cursorPosition, 0, value);
      cursorPosition++;
    },
  };

  for (let i = 0; i < commands.length; i++) {
    const currentCommand = commands[i];

    if (currentCommand.length > 1) {
      const [_, value] = currentCommand.split(" ");
      command["P"](value);
    } else {
      command[currentCommand]();
    }
  }

  return copiedTargetValue.join("");
}

console.log(solution(defaultValue, commands));
```

## 설명

문제의 유형이 스택이고, 요소의 추가, 삭제를 활용해야하므로 배열을 이용하는 방향으로 풀이 방향을 잡았습니다. 추가 삭제는 splice method 를 활용하면 될 것이며, cursor 의 위치는 pointer 처럼 각 command 의 따라 값을 가감하여 조정하는 방향으로 접근했습니다.

> 1. 주어진 문자열을 배열의 형태로 변경합니다.
> 2. 각 command 의 기능을 정의합니다. 이와 동시에 cursor 의 위치를 가감합니다.
> 3. 각 command 를 실행하며 값을 변경합니다.

그러나 메모리 이슈가 발생하여 다른 방법으로 접근했습니다.

## 재풀이

```ts
function solution(targetValue, commands) {
  const leftStack = targetValue.split("");
  const rightStack = [];

  for (let i = 0; i < commands.length; i++) {
    const command = {
      L: () => {
        if (leftStack.length === 0) return;

        rightStack.push(leftStack.pop());
      },
      D: () => {
        if (rightStack.length === 0) return;

        leftStack.push(rightStack.pop());
      },
      B: () => {
        if (leftStack.length === 0) return;

        leftStack.pop();
      },
      P: (value) => {
        leftStack.push(value);
      },
    };

    const [currentCommand, commandValue] = commands[i].split(" ");

    if (currentCommand === "P") {
      command["P"](commandValue);
    } else {
      command[currentCommand]();
    }
  }

  return [...leftStack, ...rightStack.reverse()].join("");
}
```

## 설명

해당 문제는 커서의 위치 정의, splice method 를 통한 값의 추가 삭제 등을 활용할 필요 없이 두 개의 배열을 통해 문제를 풀 수 있습니다. leftStack, rightStack 두 개의 스택을 정의하고, 초기 값은 leftStack 에 넣은 후, 커서의 위치는 left, right 사이라고 정의합니다. 각 command 를 통해 left, right stack 의 push, pop 으로 값의 위치를 옮기고 나중에 이 두 스택을 합쳐서 결과를 도출하는 방식입니다.
