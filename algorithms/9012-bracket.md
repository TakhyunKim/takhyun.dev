---
title: "백준 9012-bracket"
date: "2024-04-11"
tag: "stack,괄호"
---

## 문제

> <a href="https://www.acmicpc.net/problem/9093"target="_blank">문제 링크</a>

괄호 문자열(Parenthesis String, PS)은 두 개의 괄호 기호인 ‘(’ 와 ‘)’ 만으로 구성되어 있는 문자열이다. 그 중에서 괄호의 모양이 바르게 구성된 문자열을 올바른 괄호 문자열(Valid PS, VPS)이라고 부른다. 한 쌍의 괄호 기호로 된 “( )” 문자열은 기본 VPS 이라고 부른다. 만일 x 가 VPS 라면 이것을 하나의 괄호에 넣은 새로운 문자열 “(x)”도 VPS 가 된다. 그리고 두 VPS x 와 y를 접합(concatenation)시킨 새로운 문자열 xy도 VPS 가 된다. 예를 들어 “(())()”와 “((()))” 는 VPS 이지만 “(()(”, “(())()))” , 그리고 “(()” 는 모두 VPS 가 아닌 문자열이다.

## 입력

여러분은 입력으로 주어진 괄호 문자열이 VPS 인지 아닌지를 판단해서 그 결과를 YES 와 NO 로 나타내어야 한다.

## 출력

입력 데이터는 표준 입력을 사용한다. 입력은 T개의 테스트 데이터로 주어진다. 입력의 첫 번째 줄에는 입력 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터의 첫째 줄에는 괄호 문자열이 한 줄에 주어진다. 하나의 괄호 문자열의 길이는 2 이상 50 이하이다.

## 풀이

```ts
function solution(targetList) {
  const answers = [];

  for (i = 0; i < targetList.length; i++) {
    const vpsCheckerList = [];
    const vpsTarget = targetList[i];

    for (j = 0; j < vpsTarget.length; j++) {
      const currentText = vpsTarget[j];
      if (currentText === "(") {
        vpsCheckerList.push(currentText);
      } else if (currentText === ")" && vpsCheckerList.at(-1) === "(") {
        vpsCheckerList.pop();
      } else {
        vpsCheckerList.push(currentText);
      }
    }

    while (vpsCheckerList.length) {
      if (vpsCheckerList.at(-1) === ")" && vpsCheckerList.at(-2) === "(") {
        vpsCheckerList.splice(vpsCheckerList[vpsCheckerList.length - 2], 2);
      } else {
        break;
      }
    }

    const vpsResult = vpsCheckerList.length === 0 ? "YES" : "NO";
    answers.push(vpsResult);
  }

  console.log(answers.join("\n"));
}

solution(arr);
```

## 설명

문제 유형이 스택이므로, 스택 동작 방식을 생각해서 풀이 방향을 잡았습니다. `()` 이런 한 쌍의 형태가 구성될 경우, 스택에서 제거하는 방식이며 최종적으로 스택에 아무것도 없을 경우엔 모든 쌍이 맞았다 즉, `vps 형태이다` 라고 정의하며, 스택에 뭔가 있을 경우, `vps 형태가 아니다` 라고 정의하는 방식입니다.

> 1. for 문을 통해 vps 판별 대상 배열을 순회합니다.
> 2. 배열의 요소 별로 판별해야하므로 내부적으로 다시 for 문을 통해 순회합니다. 해당 for 문을 순회하기 전 vps 여부를 판별하기 위한 스택(배열)을 선언합니다.
> 3. `(` 일 경우엔 checker 배열에 push 만 합니다. 닫힌 형태에 대해서만 vps 여부를 판별할 수 있기 때문입니다. `)` 일 경우엔 스택의 최상단 요소가 `(` 인지를 파악하고 `(` 라면 vps 이므로, pop 을 통해 제거하게 됩니다. 만약 아니라면 `)` 을 push 합니다.
> 4. 이렇게 for 문을 돌고 난 후, while 문을 통해 vpsChecker 배열을 순회합니다. 이전 for 문을 통해 `()` 순으로 들어온 케이스를 제거 했으므로, vps 형태라면 배열 내 남은 요소들도 `()` 순이여야 합니다. 만약 아니라면 vps 가 아니므로 break 처리합니다.
> 5. 4번 과정을 통해 배열 내 요소가 없을 경우에 `YES` 아니면 `NO` 를 할당하여 풀이합니다.

## 후기

마지막 while 문의 경우 굳이 없어도 되는 코드일 것으로 보입니다. 이를 제거하고도 풀 수 있을 것 같으므로 풀이 과정을 복기 후 다시 풀어봐야할 것 같습니다.

## 퇴근 후 재풀이

```ts
function solution(targetList) {
  const answers = [];

  for (i = 0; i < targetList.length; i++) {
    const vpsCheckerList = [];
    const currentCase = targetList[i];
    let result = "YES";

    for (j = 0; j < currentCase.length; j++) {
      const targetBracket = currentCase[j];

      if (targetBracket === "(") {
        vpsCheckerList.push(targetBracket);
      } else {
        if (!vpsCheckerList.pop()) {
          result = "NO";
          break;
        }
      }
    }

    if (vpsCheckerList.length !== 0) {
      result = "NO";
    }

    answers.push(result);
  }
  console.log(answers.join("\n"));
}

solution(arr);
```

## 설명

풀이는 처음과 비슷합니다. 단, **`)` 일 때, array.pop 만 합니다.** 이는 **`)` 일 때, pop 만 하고, `(` 일 때 push 해도 vps 라면 깔끔하게 빈 배열이 된다** 라는 전제를 세울 수 있었기 때문입니다. 만약 `)` 일 때 이미 스택의 값이 없다면 짝이 맞지 않다 즉, vps 가 아니다 라는 결론을 내릴 수 있다는 생각 하에 세운 전제입니다. 또한 **순회를 마치고 스택에 요소가 남아있다면 그 역시도 vps 가 아니라는** 결론을 내릴 수 있습니다. 이를 코드로 구현했습니다.
