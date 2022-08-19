---
title: "얕은 복사"
subtitle: "얕은 복사를 했을 경우?"
date: "2022-08-14"
thumbnailUrl: "/images/light.jpg"
tag: "react,javascript,typescript"
---

## 얕은 복사

얕은 복사란 객체를 복사할 때 원래값과 복사된 값이 같은 참조를
가르키고 있는 것을 말한다. 객체 안에 객체가 있을 경우 한 개의 객체라도
원본 객체를 참조하고 있다면 이를 얕은 복사라고 한다.

1. Object.assign()

`Object.assign`은 첫번째 요로로 들어온 객체에 다음인자로 들어온 객체를 복사해준다.

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copiedObj = Object.assign({}, obj);

copiedObj.b.c = 3;

obj === copiedObj; // false
obj.b.c === copiedObj.b.c; // true
```

2. 전개 연산자

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copiedObj = { ...obj }; // 전개 연산자를 사용하여 인수 리스트로 확장

copiedObj.b.c = 3;

obj === copiedObj; // false
obj.b.c === copiedObj.b.c; // true
```

위 예제에서

```javascript
const copiedObj = { ...obj };
```

라는 코드가 있습니다. 여기서 `...obj`가 전개 연산자의 특징입니다. 이 코드의 의미는 하기 예제를 통해 살펴봅시다.
내장 함수 Math.max는 인수로 받은 숫자 중 가장 큰 숫자를 반환합니다.

```javascript
alert(Math.max(3, 5, 1)); // 5
```

그런데 여기서 배열 [3,5,1]을 넘기면 Math.max를 호출할 수 있을까요?
결과는 안됩니다. NaN이 출력이 됩니다. 물론 배열의 이름으로
인덱스로 호출하는 방식으로는 가능합니다만 이러한 경우 코드가 난잡해집니다.
이러한 경우를 위해 전개 연산자가 만들어졌습니다.
함수를 호출할때 ...arr과 형태로 사용하면 객체 arr이 인수 리스트로서 확장됩니다.
하기의 사용 예시를 보시죠

```javascript
let arr = [1, 5, 3];

alert(Math.max(...arr)); /// 5 (전개 연산자로 배열을 인수 리스트로 바꿔줬습니다.)
```

위와 같이 사용하는게 전개 연산자입니다.

## 깊은 복사

깊은 복사된 객체는 객체 안에 객체가 있을 경우에도 원본과의 참조가 완전히 끊어진 객체를 말합니다.
완벽하게 원본과 사본을 나눠 복사하는 방법을 말합니다.

1. 재귀함수를 이용한 복사

하기는 배열의 깊은 복사 예시입니다.

```javascript
var arr1 = [1, 2, 3, 4];
var arr2 = arr1.slice();

console.log("arr1: ", arr1); // arr1:  [ 1, 2, 3, 4 ]
console.log("arr2: ", arr2); // arr2:  [ 1, 2, 3, 4 ]

arr2[0] = 0;

console.log("arr1: ", arr1); // arr1:  [ 1, 2, 3, 4 ]
console.log("arr2: ", arr2); // arr2:  [ 0, 2, 3, 4 ]

console.log(arr1 === arr2); // false
```

하기는 객체의 깊은 복사 예시입니다.
객체의 따른 사용자 정의 함수를 만들어 복사할 수 있습니다.

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

function copyObj(obj) {
  const result = {};

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = copyObj(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

const copiedObj = copyObj(obj);

copiedObj.b.c = 3;

obj.b.c === copiedObj.b.c; // false (기존 객체와 연결되어있지 않다.)
```

2. JSON.stringift()

JSON.stringify()는 객체를 json 문자열로 변환하는데 이 과정에서 원본 객체와의 참조가 끊어진다.
객체를 json 문자열로 변환 후 JSON.parse()를 이용해 다시 자바스크립트 객체로 만들어주면 깊은 복사가 된다.
이 방법은 쉽지만 다른 방법에 비해 매우 느리다고 알려져 있다.

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copiedObj = JSON.parse(JSON.stringify(obj));

copiedObj.b.c = 3;

obj.b.c === copiedObj.b.c; //false
```
