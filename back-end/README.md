# back-end Server

n2server의 api-server 기능을 담당하는 back-end 서버 모듈

본 문서의 작성은 back-end 서버 개발자가 담당한다.

## 관련 문서

* [n2server 매뉴얼](https://github.com/ByunMooYoung/n2server)
* [front-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/front-end)
* [back-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/back-end)
* [models 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/models)

## 서버 구동 방법

.env.local 파일을 복사하고 파일명은 .env로 변경한 후 파일의 내용을 환경에 맞게 수정한다.

개발 모드로 서버를 구동하는 명령어는 다음과 같다.

```bash
npm run start:dev
```

릴리즈 모드로 서버를 구동하는 명령어는 다음과 같다.

```bash
npm run start
```

## API 문서 이용방법

back-end 서버에서 제공하는 api와 데이터 모델을 확인하기 위한 swagger 문서는 [http:localhost:3001/api](http:localhost:3001/api)에서 확인할 수 있다.

## 관리 포인트

### 요약(체크 포인트)

안정적인 서비스 제공을 위해 다음의 항목을 주기적으로 확인해야함

* 사업자등록번호 유효성 검증 API의 정상 동작 여부
* 메일 전송 API의 정상 동작 여부

### 사업자등록번호 유효성 검증

회원 가입시 업주가 입력한 사업자번호의 유효성을 검증하기 위해 공공데이터포털에서 제공하는 Open API를 활용한다.
현재 back-end 개발자의 계정으로 포털가입 및 인증키를 발급한 상태이다.

* [공공데이터포털](https://www.data.go.kr/): https://www.data.go.kr/
* 인증키 활용기간: 2021-11-04 ~ 2023-11-04 (1년간)
* 인증키 저장소: .env 파일의 BUSNUM_API_KEY, BUSNUM_URL
* 인증키 설정파일: src/config/configuration.ts
* 관련 API 구현: src/lib/auth/auth.controller.ts의 busNumValidate()

### 메일 전송 관련

메일 전송을 위한 API는 src/lib/common 모듈에 구현됨
현재 메일 발송을 위한 메일 계정은 mk.manager2020@gmail.com을 이용하고 있으며 구글 앱 비밀번호를 이용함.
구글 앱 비밀번호란 본 계정의 비밀번호가 유출되는 것을 방지하기 위해 서비스할 앱(본 서비스)의 전용 비밀번호를 별도로 발급하여 이용하는 방식을 의미함

* 비밀번호 설정: [구글 계정의 보안](https://myaccount.google.com/security)의 앱 비밀번호
* 앱 비밀번호에 등록된 비밀번호명: carcenter
* 설정 저장소: .env 파일의 MAIL_HOST 등
* 설정파일: src/config/configuration.ts
* 관련 API 구현: src/lib/common/common.service.ts의 sendMail()
