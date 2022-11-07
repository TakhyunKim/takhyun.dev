---
title: "자막 크롬 익스텐션 개발하기"
subtitle: "영어, 한글 자막을 함께!"
date: "2022-11-05"
thumbnailUrl: "/images/subtitle/run-extension.gif"
tag: "Chrome-extension,typescript,manifest-v3"
description: "영어, 한글 자막을 함께 보는 나만의 크롬 익스텐션 개발"
postingType: "projects"
---

> 요약
>
> - [Frontend masters](https://frontendmasters.com/) 에서 영어 자막으로 공부했습니다.
> - 영어, 한글 자막을 함께 보기 위해 크롬 익스텐션을 개발했습니다.

## Closed Caption Chrome Extension 개발 링크

Closed Caption Chrome Extension 의 github, 배포 URL 을 아래에 첨부했습니다. 🤗

- [github repo](https://github.com/TakhyunKim/Closed-caption-korean)

- [Chrome Extension 배포](https://chrome.google.com/webstore/detail/closed-caption-korean/pjfhdffkbjfneojiamjnooaagomkimde?hl=ko&authuser=0)

## Closed Caption Chrome Extension

---

Closed Caption Chrome Extension 은 영어, **한글 자막을 함께 보기 위해 개발한 크롬 익스텐션입니다.**<br />
[Frontend masters](https://frontendmasters.com/) 영어 자막을 통해 공부를 했지만<br />
개발 공부가 아닌 영어 공부를 하는 듯한 느낌을 받곤 했습니다. 🥲<br />

이를 위해 구글 번역 익스텐션을 통해 영어 자막을 바로 한글로 번역해서 공부를 했습니다.<br />
처음에는 굉장히 만족하며 "이 정도면 공부할 수 있지!" 라며 잘 보는 시간이 얼마 지나지 않아<br />
가끔 확인할 수 있는 오역 때문에 다시 **영어 자막으로 전환 -> 한글 자막**으로 전환하는<br />
불필요한 과정이 계속 신경쓰였습니다.<br />

지금의 불편함을 어떻게 해결할 수 있을지 고민했고 영어, 한글 자막을 함께 보면 문제 해결이 가능할 것 같다고 생각했습니다.<br />
문제 해결이 가능할 것 같으니 바로 개발을 시작했습니다! 🏃‍♂️

### 목표 설정

언제나처럼 처음 시작은 목표 설정부터 시작했습니다! <br />
첫 1.0.0 version 개발 기간은 **5일** 정도로 간단한 기능만 구현하는 목표를 설정했습니다.<br />
번역 버튼을 클릭하면 자막이 추가되는 기능만 구현하고자 했습니다.<br />
이는 빠르게 프로토타입을 개발, 기능 테스트 및 주변에서 저와 비슷한 불편함을 겪은 분들의<br />
사용 후기 및 피드백을 듣기 위해서입니다.

이와 더불어 회사 업무도 바쁘고, 대학 과제 등 시간이 많지 않았기에 빠르게 개발하고,<br />
추후 피드백 반영 및 리팩토링을 하자! 라는 마음으로 기한을 굉장히 짧게 잡았습니다.

### 크롬 익스텐션 API 파악을 위한 문서

크롬 익스텐션 개발에 앞서 문서는 주로 [MDN 문서](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension), [chrome extension 공식 문서](https://developer.chrome.com/docs/extensions/) 를 참고했습니다.<br />

그 밖에 개발하는 과정에서 추가로 참고한 것은 [크롬 익스텐션 개발 예시 Github repo](https://github.com/GoogleChrome/chrome-extensions-samples) 입니다.<br />
간단하고 다양한 예제들을 보여주며 이를 통해 어떤 기능이 어떻게 구현할 수 있는지를 참고할 수 있었습니다.

### 구현해야할 기능과 고려해야할 점들

저의 번역 크롬 익스텐션의 워크 플로우는 아래와 같습니다.

> 1.  번역 버튼을 클릭합니다.
> 2.  화면 상 영어 자막의 text 를 확인합니다.
> 3.  영어 자막 text 를 번역 API 를 통해 한글로 변환합니다.
> 4.  변환된 한글 자막을 기존 자막 아래에 추가합니다.

위 과정 중 2 ~ 4번 과정은 영어 자막이 변경될 때마다 실행이 되어야하므로 DOM 변경 트래킹이 필요합니다.<br />
이를 위해 여러 방법을 찾아보다가 [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 를 선택하게 되었습니다.<br />

특정 DOM 변경을 추적하고 있다는 점, MutationObserver 인스턴스를 생성해서 DOM 변경 시<br />
특정 함수를 실행할 수 있다는 점에서 구현하고자 하는 방향성과 일치했습니다.

### popup.html, popup.js, background.js

popup.html 은 `chrome extension 을 활성화한 후 클릭하면 표기되는 html` 입니다.<br />
저는 여기서 실행할 함수인 popup.js 를 script 로 포함시켰습니다.

**popup.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="popup.js" type="module"></script>
  </head>
  <body>
    <button id="translate">translation</button>
  </body>
</html>
```

html 에서 간단하게 translation 버튼을 만들었으니, 이젠 `popup.js` 에서 기능들을 구현하면 됩니다!<br />
위에 작성한 워크 플로우처럼 `클릭 -> 영어 자막 가져오기 -> 한글로 번역 -> 한글 자막 DOM 생성 및 추가` 대로 구현했습니다.<br />

## 개발 과정에서 겪은 이슈

---

### chrome scripting executeScript & is not defined 에러

처음 1.0.0 버전을 개발했을 땐 popup.js 에서 모든 기능을 실행했습니다.<br />
하나의 함수에서 모든 일을 처리하고 있었고, 이를 해결하기 위해 하나의 역할만 수행할 수 있도록 별도의 함수를 선언해서 로직을 분리했습니다.<br />
아주아주 간략한 예시 코드는 아래와 같습니다!

```js
const getClosedCaptionInfo = () => {
  // 자막 정보를 가져오고, DOM 생성 및 추가해주는 로직이 있습니다.
  // .....
};

const startApplyClosedCaption = () => {
  const closedCaptionElement = document.querySelector(
    ".vjs-text-track-display"
  );

  // MutationObserver 인스턴스 생성 시 getClosedCaptionInfo 를 전달했습니다.
  const observer = new MutationObserver(getClosedCaptionInfo);

  const config = {
    attributes: true,
    childList: true,
    characterData: true,
  };

  observer.observe(closedCaptionElement, config);
};

// popup.html 내 버튼 DOM Element
const translationElement = document.getElementById("translate");

// translate button click 이벤트 등록
translationElement.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 해당 크롬 탭에 startApplyClosedCaption function 을 추가!
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startApplyClosedCaption,
  });
});
```

이렇게 실행할 경우? 아래와 같이 에러가 발생하게 됩니다 ㅠ<br />
<img width="50%" alt="not defined error" src="/images/subtitle/not-defined-error.jpg" />
여기서 생각보다 많은 시간을 소요했습니다. '코드에는 별 문제가 없어보이고 잘 선언한 것 같은데 왜 저 함수를 찾지 못하는거지??<br />
처음 개발해보는 Chrome extension, 처음 사용해보는 MutationObserver 등 에러를 처음 본 저는 원인이 너무 많다고 느꼈습니다..<br />

그러던 와중.. `chrome.scripting.executeScript` 에 대한 공식 문서를 다시 살펴보았습니다. <br />
해당 API 의 설명에는 `Use the chrome.scripting API to execute script in different contexts.` 이렇게 적혀있었습니다.<br />
:D 하하.. `chrome.scripting` 는 별도의 context 에서 실행되므로 별도의 context 내에선 `getClosedCaptionInfo` 가<br />
선언되지 않았다고 에러를 발생시킨다는 것을 확인할 수 있었습니다.

우선 목표한 시간 내 기능 구현을 해야하므로 `startApplyClosedCaption` function 내에 선언 후 사용하는 방향으로 진행했습니다.<br />

**위에서 겪은 에러를 해결해서 번역하기 전 자막을 띄우는데 성공했습니다!🎉**<br />
<img width="50%" alt="same subtitle" src="/images/subtitle/same-subtitle.gif" />

### CORS 에러

이제 번역 API를 적용해서 번역된 자막만 띄우면 끝! 이라는 생각과 함께 신나게 저의 영원한 동반자 파파고 API 를 적용했습니다<br />
popup.js 의 `startApplyClosedCaption` 내에서 API 호출 및 그 결과값을 표기하는 방향으로 구현했으나... CORS 에러가 발생했습니다.<br />

순간 당황했지만 빠르게 대처할 수 있었습니다. chrome extension 에는 `background service_worker` 가 있습니다.<br />
background service_worker 에서 API 를 호출할 경우, CORS 를 피해 API 를 호출할 수 있었습니다.<br />
background script 와 소통하는 방법은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts)에 잘 설명되어 있으니 참고하시면 도움이 될 것 같습니다.

간단하게 설명하자면 아래와 같습니다.<br />

`popup.js` 에서 `chrome.runtime.sendMessage` 를 통해 `background.js` 로 메시지를 전달합니다.<br />
`background.js` 에서는 `popup.js` 에서 전달한 message 를 받아 해당 message (key) 의 로직을 실행합니다.<br />
`background.js` 예시는 아래와 같습니다.

**background.js**

```js
chrome.runtime.onMessage.addListener((message, _, response) => {
  if (message.name === "fetchTranslate") {
    // 번역 API 를 실행한 후 response 를 통해 결과값을 전달합니다.
  }

  return true;
});
```

더불어 `background.js` 를 적용하기 위해서는 `manifest.json` 에서도 별도의 설정이 필요합니다.

```json
  "background": {
    "service_worker": "background.js"
  },
```

위와 같은 이슈들을 해결하고 두 언어의 자막을 함께 볼 수 있었습니다. 🤗
<img width="50%" alt="prototype version" src="/images/subtitle/prototype-version.gif" />

_(이 때 당시의 [브랜치 URL](https://github.com/TakhyunKim/Closed-caption-korean/tree/feature/translate-text) 도 남겨두겠습니당 :D)_

## 1.0.0 배포를 위한 리팩토링

---

이렇게 `prototype` 으로 짧고 필요한 기능만 빠르게 개발했습니다.<br />
목적을 잘 달성했고, 강의를 보면서 큰 만족감을 느낄 수 있었습니다! 😁<br />
이 후 리팩토링 및 타입스크립트 적용 등의 개선 작업을 시작했습니다.

### 기존 구조 그리고 코드는 어떤 문제가 있을까?

**첫 번째, javascript 로 구성해서 놓친 케이스가 있어 런타임에 에러가 발생할 때가 있습니다.**

위 문제를 해결하기 위해 typescript 를 적용했습니다.<br />
webpack 설정을 통해 dist 디렉토리 내 빌드 파일을 관리, 해당 디렉토리를<br />
chrome extension 에 등록해서 사용하는 방식을 적용하여 위 문제를 해결할 수 있었습니다! 👍

**두 번째, 기능 구현 로직이 한 곳에 집중되어 있습니다.**

기능 구현을 위한 로직이 `popup.ts` 그리고 하나의 function 에 집중되어 있습니다.<br />
이는 분명 개선이 필요한 구조라고 생각이 듭니다.

본격적인 코드 분리 전 큰 카테고리로 분리했습니다.

> 1. popup html 과의 커뮤니케이션
> 2. DOM 추적 및 추가
> 3. 번역 API 호출 및 전달

큰 카테고리로 위 3가지로 나눌 수 있었습니다.<br />
나눈 카테고리 기반으로 로직을 분리하고자 했고, 이전 함수 분리에서 문제를 발생시킨 `chrome.scripting.executeScript` 에서<br />
`function field` 를 `files` 로 변경했습니다. 그리고 기존 popup.ts 에 집중된 코드를 `content.ts` 로 옮긴 후<br />
해당 파일을 주입하는 방향으로 변경했습니다.<br />
파일 자체를 주입하여 별도의 context 를 구성했으므로 함수를 분리하더라도 사용이 가능했습니다.<br />

_(요것도 당시 [브랜치 URL](https://github.com/TakhyunKim/Closed-caption-korean/tree/feature/module) 남겨두겠습니당!)_

그러나 ㅠㅠ.. 분리는 했지만 영 마음에 들지 않았습니다. `content.ts` 로 로직을 옮기고, 함수를 분리했을 뿐<br />
chrome api 를 통해 통신하는 로직, DOM 핸들링 로직이 함께 존재했습니다.<br />

이런 로직들을 별도의 파일로 분류하고 관리하는 것을 목표로 천천히 리팩토링을 진행했습니다.

먼저, 디자인 패턴을 도입하는 것도 좋은 방법일 것 같았습니다.<br />

> 1.  DOM 과의 커뮤니케이션하는 로직이 존재하고
> 2.  번역 API 호출 후 해결 결과 값을 관리하며
> 3.  DOM 렌더링 시 전달해야하는 로직까지 <br />

이러한 데이터 관리 및 렌더링 관리 로직을 분리하는 목적으로 **MVC 패턴**을 적용해보면 좋을 것 같아 시도했습니다.<br />
코드를 첨부하기엔 너무 길 것 같아, 당시 아키텍처를 잡기 위한 다이어그램 및 [브랜치 URL](https://github.com/TakhyunKim/Closed-caption-korean/tree/feature/class-module) 으로 대체하여 공유드리는 점 양해 부탁드립니다!

### 아키텍처 다이아그램

<img width="90%" alt="structure" src="/images/subtitle/structure.jpg" />

## 앞으로의 목표

---

현재 `1.1.0 version release` 를 준비하고 있습니다.<br />
가장 많은 피드백을 들었던 항목부터 사용하면서 불편했던 점 위주로 작업 후 업데이트 예정입니다.<br />
천천히 업데이트 하면서 아래 체크 리스트도 함께 업데이트할 예정입니다! 🏃‍♂️

> - 기존 번역 버튼 대신 on off 스위치 도입 및 자막 on off 기능 구현 - ✅<br />
> - 자막 요청 시 즉시 자막 추가 및 삭제가 가능하도록 기능 개선 (현재는 자막이 변경되어야 한글 자막이 추가됨) - ✅<br />
> - 동일한 text 에 대한 번역 API 요청하는 이슈 개선<br />
> - youtube, 유데미 등 다른 사이트도 지원<br />
> - 자막 pdf 생성 기능 구현<br />

### 진행 사항

> - 2022년 11월 05일 기준 1.1.0 version 게시했습니다~<br /> [1.1.0 version Release note](https://github.com/TakhyunKim/Closed-caption-korean/releases/tag/v1.1.0)<br />[익스텐션 설치 URL](https://chrome.google.com/webstore/detail/closed-caption-korean/pjfhdffkbjfneojiamjnooaagomkimde?hl=ko&authuser=0)

## 개발을 진행하면서 느낀점

---

무언가를 만들겠다라고 마음을 먹고 되게 빠른 시간 내에 완성해본건 이번이 처음이였습니다.<br />
지금까지의 저라면 위에 목표라고 적은 모든 체크 리스트를 완성해야 1.0.0 버전을 내보냈을겁니다.<br />
이번에는 시간 문제도 있었지만 너무 완벽한 결과물을 내려고 시간이 오래 걸리는 부분을 조금 개선하고자<br />
최소한의 사용 가능할 정도로 개발했습니다.

생각보다 좋은 경험이였고 이를 다른 분들과 함께 사용해보면서 피드백을 받고 이를 빠르게 수용하고<br />
적용하는 일련의 과정도 새롭고 즐거웠습니다. 특히 바로 적용하고 피드백을 받는 과정이 즐거웠습니다. 😁

더불어 최소한의 기능(이번 익스텐션은 한글 자막을 보여주는 정도)만으로도 되게 높은 만족도를 얻을 수 있었고<br />
주변에서도 좋은 반응을 확인하면서 되게 간단한 기능이지만 되게 큰 임팩트를 줄 수 있다는 점도 느낄 수 있었습니다.<br />

이번 개발을 위해 공부했던 `chrome extension`, `mutation observer`, `webpack` 등 개발 측면에서도<br />
좋은 경험을 할 수 있었다는 점에서 상당히 만족스러운 프로젝트였습니다.🎉<br />
계속 개선 및 기능 개발하면서 더 좋고 완성도 높은 프로젝트로 만들어 나갈 예정입니다~~ ⭐️
