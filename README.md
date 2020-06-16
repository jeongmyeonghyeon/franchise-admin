프로젝트 구조

```
 src
  ├── Root.js (router와 context api 사용을 위한 컴포넌트. App 컴포넌트의 컨테이너.)
  ├── _lib
  │   └── api (프로젝트에 필요한 라이브러리 보관 디렉토리. 프로젝트에서는 비동기 통신 라이브러리로 axios를 사용해 해당 폴더에서 관리.)
  ├── _util
  │   └── index.js (프로젝트에 필요한 유틸 함수 보관 디렉토리. 데이터값을 한글로 바꿔 반환하거나 숫자를 입력하면 하이픈을 넣어주는 기능 등의 함수.)
  ├── components
  │   ├── App.css 
  │   ├── App.js (많은 데이터를 보기 쉽게 하기 위한 공간확보를 위해 전체 레이아웃은 헤더/컨텐츠. 라우팅을 통해 목록/등록 페이지 변환.)
  │   ├── AppHeader.js (헤더)
  │   ├── Home.css
  │   ├── Home.js (가맹점 신청 목록 컴포넌트.)
  │   ├── Register.css
  │   └── Register.js (가맹점 등록 목록 컴포넌트.)
  ├── context
  │   └── store.js (context api 를 활용해 redux 혹은 mobx와 같이 전역 상태 관리가 가능하도록 구성.)
  ├── index.js (프로젝트 entry point)
  └── styles
  └── index.css
```

- UI 라이브러리로는 ant design(https://ant.design/)을 사용했습니다.
- 타입스크립트와 테스트코드는 다룰 줄 몰라 없이 작성했습니다.
