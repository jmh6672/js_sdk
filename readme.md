# JS_SDK

## SDK 사용설명서 [readme](readme_function.md)

<br>

## 환경
- 주요 언어 : `javascript ES6+`
- 프레임워크
  - `npm [v16.14.2]` : 개발 소스 구성 및 빌드 툴
  - `babel` : javascript 버전별 언어 해독
  - `webpack` : 소스 컴파일 빌드 lib
  - `mocha` : javascript 테스트
  - `karma` : 브라우저 테스트
  - `eslint` : 코딩 포맷 정의
  - `sass` : 스타일시드 코딩 lib

<br>

## 패키지 구조

- src
  - common : 공통 구문
  - api
    - auth : 인증 API 메서드
    - call : call API 메서드
    - presence : presence API 메서드
  - css : 스타일
  - html : UI
  - utils : javascript 유틸

<br>

## 빌드

`webpack` 프레임워크 환경으로 구성되어 있다.
`webpack.config.js` 파일에서 아래 설정을 통해 빌드 옵션을 수정한다.
~~~
module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: [
    path_component + "/sample.js",
    // path_style + "/style.sass"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "haram.js",
    library: "Haram",
    libraryTarget: "umd",
  }
}
~~~
- `target` : 빌드 하고자 하는 소스 유형이다. **web** 은 웹 브라우저용 이다.
- `mode` : 배포할 프로파일을 지정한다. **production** 은 제품용 이다.
- `entry` : 빌드대상이 될 파일 목록이다.
- `output` : 빌드 후 사용될 소스에 대한 옵션이다.
  - `path` : 빌드된 파일이 생성되는 경로
  - `filename` : 생성할 파일 이름
  - `library` : 완성된 라이브러리 모듈의 이름을 정한다.
  - `libraryTarget` : 완성된 라이브러리 모듈의 타입을 정한다. **umd** 는 노드 언어와 웹 언어 모두 유연하게 쓰기위한 패턴이다. 
  예를 들면, 웹에서는 `window` 객체를 쓰지만, 노드에서는 `global`을 사용한다. 위의 **library** 설정에서 지정한 모듈 명을 전역으로 생성해줄때, 웹에서는 `window`에 , 노드에서는 `global`에서 사용 할 수 있도록 해준다.

최종 빌드는 아래 커맨드를 실행.
~~~
npm run build
~~~
이후에 `dist/haram.js` 파일이 생성된다.

<br>

## 테스트

<br>

### 유닛테스트

`mocha` 프레임워크 환경으로 구성되어 있다. 

유닛 테스트는 **mocha** 프레임워크를 사용하는데 **mocha** 는 **node** 환경으로 구동되기 때문에 실제 브라우저 환경과 차이가 있을 수 있다.
예를 들어, `Eventsource`의 경우 대부분의 브라우저 환경에서 제공되는데, node 프레임워크에는 존재하지 않기 때문에 추가 라이브러리가 필요하다.

> 해당 프로젝트에서는 유닛테스트 시에 `eventsoure` 라이브러리를 사용하도록 하였는데, 빌드 시에는 `eventsoure` 라이브러리를 제거 해주어야 한다. 

<br>

### 브라우저 테스트

`karma` 프레임워크 환경으로 구성되어 있다.
`karma.conf.js` 파일에서 아래 설정을 통해 테스트 시에 브라우저에서 로딩할 파일을 세팅해야 한다.
~~~
const testFiles = "test/api/*.js";

module.exports = function (config) {
  config.set({
    files: ["src/**/*.js", testFiles],
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "test/api/**/*.js": ["webpack"],
    },
    browsers: [
      "Chrome",
      // , "Safari", "Firefox", "ChromeHeadless", "ChromeCanary", "PhantomJS"
    ]
  });
};
~~~
- `files` : 테스트시 로딩할 파일 목록이다. `src/`이하의 모든 js 파일을 기본으로 로딩하도록 했으며, 이후에 진행할 테스트 파일을 추가해서 사용하도록 한다.
- `preprocessors` : 테스트 로딩 전에 수행할 프로세서를 등록한다. 소스 파일과 테스트 파일을 빌드 한 후 테스트 하도록 해준다.
- `browsers` : 테스트할 브라우저 환경을 선택 할 수 있다. 브라우저 환경을 추가하려면 해당 라우저의 런처 라이브러리가 필요하다. 예를 들면 크롬 환경 테스트를 위해서`karma-chrome-launcher` 라이브러리가 필요하다.