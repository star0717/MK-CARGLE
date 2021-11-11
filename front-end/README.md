# front-end Server

n2server의 ui 기능을 담당하는 fonrt-end 서버 모듈

본 문서의 작성은 front-end 서버 개발자가 담당한다.

## 관련 문서

* [n2server 매뉴얼](https://github.com/ByunMooYoung/n2server)
* [front-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/front-end)
* [back-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/back-end)
* [models 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/models)

## 관리포인트

### 요약(체크 포인트)

안정적인 서비스 제공을 위해 다음의 항목을 주기적으로 확인해야 함

### 데이터 모델(models) 이용법

front-end에서  back-end와의 통신에서 사용하는 데이터 모델 클래스들은 전적으로 back-end에서 개발된다. 이를 front-end에서 이용하기 위해서는 models 모듈에서 데이터 모델 클래스들을 컴파일해야 한다.
model 모듈에서 다음의 명령으로 데이터 모델 클래스를 컴파일한다.

```bash
npm run compile
```

컴파일된 결과물(모델 클래스)들은 front-end의 /src/models 폴더에 자동 생성된다.

#### 데이터 모델 참조 에러 이슈: 2021-11-11
UserAuthority enum을 참조하면 에러가 발생하는 이슈가 발생되었다. 현재까지의 데이터 모델 클래스의 컴파일 옵션에서는 컴파일의 결과물인 .js 파일들과 클래스 선언(C/C++의 헤더파일과 유사) 파일들인 .d.js 파일들이 동시에 생성되며 next.js에서는 기본 .js 파일을 참조한다.

.js 파일에는 back-end 개발에 이용된 각종 라이브러리들과 데코레이터들이 포함되어 컴파일되어 다음과 같은 이유로 에러가 발생하는 것이다.
* back-end 개발에 사용된 라이브러리들이 front-end에 설치되지 않아 에러 발생
* 라이브러리들 중 일부가 server-side에서만 수행되도록 제한되어 에러 발생

결과적으로 front-end에서는 .js 파일을 이용하지 않고 .d.js 파일들을 이용해야 한다.

models 모듈의 tsconfig.json 파일의 컴파일 옵션을 수행햐여 컴파일 결과로 .d.js 파일들만 생성되도록 수정되었다. 그리고 next.js에서 사용할 수 있도록 일부 수정이 필요하다.

1. 컴파일 된 모든 .d.js파일들을 .js 파일로 파일명을 변경함
2. base.entity.ts 파일 상단의 모든 import 선언문을 제거함
3. user.entity.ts 파일의 enum 타입의 UserAuthrotiy에서 declare 를 제거함

현 시점부터 front-end의 models은 back-end 개발자에 의해 관리되며 git을 통해 버전과리를 시작함

