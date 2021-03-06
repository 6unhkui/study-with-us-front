# 📚 Study With Us - Frontend

![Study With Us](https://user-images.githubusercontent.com/41765537/122437155-68035f80-cfd4-11eb-944c-60203c0d90aa.gif)
<br/>

Study With Us는 자기 개발을 위해 공부하는 사람들이 모여 정보를 공유하고, 함께 의지를 다지기 위해 만든 커뮤니티 사이트입니다.<br/><br/>

## ✨ Features

-   회원가입, 로그인 & 소셜 로그인 (Google, Naver)
-   스터디룸 생성 및 관리
-   출석 체크, 멤버 별 출석 현황 (그래프)
-   게시글, 댓글 & 대댓글 CRUD
-   채팅
-   새글 피드
-   스터디룸 찾기
-   마이페이지
-   다국어 (영어, 한국어), 반응형
    <br/><br/>

## 🔧 Tech Stack
-   React
-   Typescript
-   React Router, React i18n
-   Redux, Redux Saga
-   Less, css-in-js (styled-components)
-   Ant Design UI
-   Ckeditor5, Chart.js
     <br/><br/>

## 🗂 Folder Structure

```
.
├── public
│   ├── locales
│   │   ├── en
│   │   └── ko
│   └── ...
├── src
│   ├── assets
│   │   ├── css
│   │   │   ├── base
│   │   │   ├── layout
│   │   │   └── index.less
│   │   └── image
│   ├── components
│   ├── constants
│   ├── containers
│   ├── hoc
│   ├── hooks
│   ├── pages
│   ├── routes
│   ├── store
│   │   ├── modules
│   │   ├── sagas
│   │   └── index.js
│   ├── utils
│   ├── App.js
│   ├── i18n.js
│   ...
│   └── index.js
│
├── .env
├── .env.production
├── .eslintrc
├── .prettierrc
├── craco.config.js
├── jsconfig.json
...
└──  package.json
```

#### `public/locales`

다국어 JSON 파일을 모아둔 디렉토리입니다. 다국어는 한국어, 영어를 지원합니다.

#### `src/assets/css/*`

모든 컴포넌트에서 공통으로 사용하는 스타일 시트를 모아놓은 디렉토리입니다.

##### `base/`

-   `_gloable.less` : 전역에서 사용되는 스타일 시트
-   `_utility.less` : Media Query 등 유틸성 스타일 시트
-   `_variables.less` : less 변수를 모아둔 파일로, 등록된 변수는 css variable로도 정의해 css-in-js 내에서도 사용하도록 구성하였습니다.

#### `src/assets/image`

컴포넌트에서 사용되는 image 파일을 모아둔 디렉토리입니다.

#### `src/components`

부모 컴포넌트로부터 전달된 props에 의해서만 렌더링되는 순수 컴포넌트(Dumb Component)들을 모아둔 디렉토리입니다.

#### `src/constants`

상수 모음 디렉토리입니다.

#### `src/containers`

Redux Store에서 관리되는 state를 사용하고, action을 dispatch 하여 앱의 상태를 제어하는 스마트 컴포넌트(Smart Component)들을 모아둔 디렉토리입니다.

#### `src/hoc`

HOC(High Order Component)를 모아둔 디렉토리입니다.<br/>

##### `auth.js`

인증된 사용자만 접근 할 수 있는 Page 컴포넌트를 감싸는 HOC로, 인증되지 않은 (사용자 브라우저의 Local Storage에 JWT가 존재하지 않는) 사용자가 접근할 경우 로그인 페이지로 Redirect 하도록 처리하였습니다.

#### `src/hooks`

Custom Hooks를 모아둔 디렉토리입니다.

#### `src/pages`

페이지 컴포넌트를 모아둔 디렉토리로, 순수 컴포넌트와 컨테이너 컴포넌트를 조합해 페이지 별로 화면을 구성합니다.

#### `src/routes`

페이지 라우팅에 필요한 Route 컴포넌트를 모아둔 디렉토리입니다.

#### `src/store/*`

##### `modules`

Ducks 패턴으로 Action Type, Reducer를 하나의 파일로 관리합니다.

##### `sagas`

비동기 통신을 위한 Redux Middleware로 Redux-Saga를 사용하고 있습니다.<br/>
saga 파일을 모아둔 디렉토리입니다.

#### `src/utils`

유틸성 모듈을 모아놓은 디렉토리입니다.

##### `httpHandler.js`

HTTP 통신에 axios 라이브러리를 사용하고 있습니다. axios 인스턴스를 생성하여 API Server URL을 baseURL로 설정하고, 이 인스턴스를 프로젝트 전반에서 사용하도록 하였습니다.<br/>
또한 인스턴스에 인터셉터를 추가해 Request 시 요청을 가로채 header에 JWT를 넣어주고, Response를 가로채 응답 코드가 401(Unauthorized)일 경우 로그인 페이지로 redirect 하도록 구현하였습니다. 401 코드 값은 만료된 토큰이 전달 됐을 때 반환되는 상태 코드 값입니다.

#### `.env` `.env.production`

로컬 환경과 운영 환경의 환경 변수 파일을 `.env`와 `.env.production`으로 분리하고, API Server URL이 실행 환경마다 다르기 때문에 이 값을 환경 변수 값으로 관리해 실행 환경에 맞게 세팅되도록 하였습니다.

#### `.eslintrc`

코드 품질과 포맷팅을 위해 ESLint를 사용합니다.<br/>그에 대한 설정 파일로, airbnb 코딩 컨벤션을 따릅니다.

#### `.prettierrc`

코드 포맷팅을 위해 Prettier를 사용합니다. 그에 대한 설정 파일입니다.

#### `jsconfig.json`

js 파일 내에서 모듈을 import 할 때 사용하는 절대 경로를 src 디렉토리로 설정해 주었습니다. 에디터인 VS code에서 제공하는 기능입니다.

#### `craco.config.js`

craco 라이브러리는 CRA 프로젝트를 eject 하지 않고 Webpack 설정을 오버라이딩 하는 방식으로 변경하도록 도와주는 패키지입니다.<br/>`craco.config.js`는 이를 위한 설정 파일입니다.<br/>

1. UI 라이브러리로 사용한 Ant Design의 Less 변수를 변경하기 위해 `craco-antd`을 사용하였습니다.
2. 번들링 된 결과물에 남아있는 콘솔 로그를 제거하기 위해 Babel 플러그인인 `transform-remove-console`을 사용하였습니다. 이 플러그인은 운영 환경에서만 적용되도록 하였습니다.
