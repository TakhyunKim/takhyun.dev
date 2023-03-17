---
title: "IOS 디버깅 그리고 버그 수정"
subtitle: "Reg lookbehind 미지원 브라우저 이슈 대응하기"
date: "2023-03-04"
thumbnailUrl: "/images/debugIos/thumbnail.jpg"
tag: "IOS,Reg,lookbehind"
description: "IOS 환경 디버깅을 통한 문제파악 후 해결까지의 과정"
postingType: "post"
---

> 이 글은 IOS 환경에서 포스팅이 동작하지 않는 이슈를 확인하고<br />
> 해결까지 하는 과정을 정리하기 위해 작성한 글입니다.

이전 [블로그 속도 개선하기]()에서 이미지 최적화를 위해 Next js Image component 를 적용했습니다.<br />
이 과정에서 markdown img 의 `width`, `height` 를 추출하기 위해 `Reg Expression` 을 활용했고<br />
제가 원하는 동작 방식을 구현할 수 있었습니다. 그리고 기쁜 마음으로 배포했습니다.

이 후 `모바일 환경에선 잘 보일까?` 라는 생각이 스쳐지나갔고 접속해서 확인했습니다.<br />
결과는? 아래 이미지와 같이 이상한 에러가 표기되고 있었습니다.

![debug image in ios {{ w: 900, h: 1500, parentW: 30 }}](/images/debugIos/bug-image-in-ios.png)

여기서 드는 생각은 3가지였습니다.<br />

> 1. 에러 핸들링을 제대로 안하고 있었구나.
> 2. IOS 환경 디버깅을 어떻게 하지?
> 3. 무슨 버그지?

이번 포스팅에서는 2, 3번에 대한 내용을 다루고자 합니다.

자체적으로 테스트를 해보니 이번에 img 최적화를 적용한 일부 페이지에서 발생하는 것으로 보입니다.<br />
그렇다면 버그가 발생한 곳은 이미지 최적화 관련 코드라고 가정할 수 있을 것 같습니다.

## 어떻게 디버깅할 수 있을까

IOS 환경을 맥에서 확인하기 위해 방법을 알 수 있었고, 저는 아래 방식으로 디버깅을 했습니다.

### 1. 맥 Safari 에서 개발자 도구 활성화

Safari 환경설정 클릭, 고급을 클릭한 후 `메뉴 막대에서 개발자용 메뉴 보기`를 체크하여<br />
개발자 도구를 활성화합니다.

![debug first step {{ w: 3500, h: 2000, parentW: 70 }}](/images/debugIos/debug-first-step.png)

### 2. 아이폰에서 Safari 의 웹 속성 활성화

아이폰 설정에서 `Safari 클릭` -> `고급 클릭` -> `웹 속성 활성화` 순서로 진행합니다.

### 3. 아이폰과 맥을 케이블로 연결 후 디버깅 대상 페이지 띄우기

아이폰과 맥을 케이블로 연결해줍니다.<br />
잘 연결되었다면 두 기기를 처음 연결한 상태라면 아이폰에서 컴퓨터 신뢰 여부 확인 Modal 을 띄워줍니다.<br />
여기서 허용을 눌러주시면 됩니다.<br />

이 과정까지 잘 마치셨다면, 디버깅하고자 하는 페이지를 아이폰에서 띄워줍니다.<br />
저는 IOS Safari 환경을 디버깅하고 싶으므로 Safari 를 실행한 후 에러 발생한 블로그 페이지를 띄웠습니다.

### 4. 맥 Safari 에서 아이폰 환경 개발자 도구 띄우기

여기까지 하셨다면 IOS Safari 환경을 디버깅할 준비가 거의 다 되었습니다.<br />
맥 Safari 에서 개발자용 탭을 클릭하시면 연결된 아이폰 기기명을 확인할 수 있습니다.<br />
3번 과정에서 확인이 필요한 환경을 띄우셨다면, 해당 브라우저 주소를 확인할 수 있습니다.

![debug four step {{ w: 1900, h: 600, parentW: 70 }}](/images/debugIos/debug-four-step.png)

해당 브로우저에 대한 탭을 클릭하게 된다면, 아래와 같이 개발자 도구를 확인할 수 있습니다.

![develop env {{ w: 2000, h: 1300, parentW: 70 }}](/images/debugIos/develop-env.png)

해당 개발자 도구를 통해 아이폰 Safari 환경을 맥에서 디버깅할 수 있습니다.

## 에러가 발생하는 원인을 찾아보자

원인 파악을 위해 우선 콘솔창을 확인했습니다.

![console error {{ w: 3500, h: 100, parentW: 100 }}](/images/debugIos/console-error.png)

`SyntaxError: Invalid regular expression: invalid group specifier name` 라는 에러가 발생하고 있습니다.<br />
앞서 글 초기에 이미지 최적화 관련 코드 문제일 것이라고 예상했었는데 확실한 것 같습니다.<br />
그 중 Reg 관련된 코드가 문제로 보입니다.<br />
기존 코드는 아래와 같습니다.

```tsx
const components = {
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    if (!props.alt || !props.src) return null;

    const substrings = props.alt.split("{");
    const alt = substrings[0].trim();
    const imgInfo = substrings[1];
    const imgWidth = imgInfo.match(/(?<=w:\s?)\d+/g);
    const imgHeight = imgInfo.match(/(?<=h:\s?)\d+/g);
    const parentImgWidth = imgInfo.match(/(?<=parentW:\s?)\d+/g);

    const width = imgWidth ? imgWidth[0] : 600;
    const height = imgHeight ? imgHeight[0] : 300;

    const parentWidth = parentImgWidth ? parentImgWidth[0] : "50";

    return (
      <span style={{ display: "block", width: `${parentWidth}%` }}>
        <Image
          src={props.src}
          alt={alt}
          width={width}
          height={height}
          layout="responsive"
        />
      </span>
    );
  },
};
```

여기서 저는 아래와 같이 작성하는 이미지 markdown 에서 alt, width, height, parentW 문자열을 다루기 위해<br />
Reg Expression 을 활용했습니다.

```md
![thumbnail size {{ w: 750, h: 200, parentW: 50 }}](/images/improvement/thumbnail-size.png)
```

정규 표현식이 IOS 환경에선 지원이 안되는 건 아닐텐데.. 라는 생각을 하면서 에러를 그대로 검색했습니다.<br />
다행히 관련 레퍼런스가 많아 쉽게 문제를 찾을 수 있었습니다.

관련해서 참고했던 레퍼런스 링크입니다.<br />

- [Dan Tech Dev Blog 정규표현식 에러 포스팅](https://dantechblog.gatsbyjs.io/posts/til-regex/)
- [Stackoverflow Safari Reg Exp Error](https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group)

현재 코드에선 원하는 문자를 얻기 위해 `?<=`, `lookbehind` 문법을 사용하고 있었습니다.<br />
`IOS`, `Safari` 환경에서 해당 문법을 지원하지 않아 발생한 에러였습니다.

- [caniuse 에서 Lookbehind 브라우저 호환성 확인](https://caniuse.com/js-regexp-lookbehind)

## 문제 해결

문제를 파악했으니 결과를 동일하게 얻을 다른 방법을 생각해보았습니다.<br />
이전에 찾았던 [image-size](https://github.com/image-size/image-size) 라는 라이브러리를 적용하는 건 시간이 걸릴 것 같으니<br />
빠르게 조치할 수 있는 다른 방법이 필요할 듯합니다.

그래서 정규표현식을 사용하는 방법은 유지하되 lookbehind 을 걷어내는 방법을 선택했습니다.

```tsx
const imgWidth = imgInfo
  .match(/w:\s\d+/g)
  ?.map((match) => match.replace("w: ", ""));
const imgHeight = imgInfo
  .match(/h:\s\d+/g)
  ?.map((match) => match.replace("h: ", ""));
const parentImgWidth = imgInfo
  .match(/parentW:\s\d+/g)
  ?.map((match) => match.replace("parentW: ", ""));
```

결과는 성공적이였습니다. 🎉 <br />
기존 문제를 발생시켰던 IOS, Safari 환경에서도 잘 동작하는 것을 확인할 수 있었습니다.

## 해결한 후

문제는 잘 해결은 했지만, 찝찝한 구석은 있었습니다.<br />

> 1. 에러 핸들링을 좀 더 신경쓰자.
> 2. 브라우저 호환성을 좀 더 신경쓰자.

브라우저 호환성을 크게 생각하지 않았기에, 잘 동작하지 않는 환경을 바로 발견하지 못했습니다.<br />
다행히 빠르게 문제를 조치할 수 있었지만 스스로 아쉬운 부분도 있었습니다.<br />
'preview 환경에서 모바일 기기나 safari 에서 확인할 걸..' 이라는 생각이 계속 들었습니다.<br />
그리고 '이걸 매번 신경쓰는건 귀찮은데 자동으로 처리할 수 있는 방법이 없는지?' 에 대한 생각도 함께 들었습니다.

생각과 함께 바로 찾아보았고, 다양한 툴이 있는 것을 확인할 수 있었습니다.<br />
이번 기회에 각 툴들이 어떤 기능을 제공하고 있고, 어떻게 이 귀찮음을 해결해줄지 공부하려고 합니다. 🧑‍💻

이번 과정을 통해 `모바일 환경 디버깅하는 방식에 대한 지식도 습득`하고, `공부하고 싶은 것 +1` 을 할 수 있었습니다.<br />
<strong>어제보다 발전한 오늘</strong> [저의 github profile](https://github.com/TakhyunKim) README 에 적혀있는 삶의 모토입니다. <br />

![my github readme {{ w: 1100, h: 140, parentW: 70 }}](/images/debugIos/my-github-readme.png)

오늘도 어제보다 하나의 지식을 더 얻었다는 뿌듯함 그리고 <br />
내일도 오늘의 나보다 더 나아질 수 있을거란 희망찬 생각과 함께 이 글을 마칩니다.

긴 글 읽어주셔서 정말 감사합니다. 🤗
