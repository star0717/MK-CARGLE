# back-end Server

n2server의 api-server 기능을 담당하는 back-end 서버 모듈

본 문서의 작성은 back-end 서버 개발자가 담당한다.

## 관련 문서

- [n2server 매뉴얼](https://github.com/ByunMooYoung/n2server)
- [front-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/front-end)
- [back-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/back-end)
- [models 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/models)

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

- 사업자등록번호 유효성 검증 API의 정상 동작 여부
- 메일 전송 API의 정상 동작 여부

### 사업자등록번호 유효성 검증

회원 가입시 업주가 입력한 사업자번호의 유효성을 검증하기 위해 공공데이터포털에서 제공하는 Open API를 활용한다.
현재 back-end 개발자의 계정으로 포털가입 및 인증키를 발급한 상태이다.

- [공공데이터포털](https://www.data.go.kr/): https://www.data.go.kr/
- 인증키 활용기간: 2021-11-04 ~ 2023-11-04 (1년간)
- 인증키 저장소: .env 파일의 BUSNUM_API_KEY, BUSNUM_URL
- 인증키 설정파일: src/config/configuration.ts
- 관련 API 구현: src/lib/auth/auth.controller.ts의 busNumValidate()

### 메일 전송 관련

메일 전송을 위한 API는 src/lib/common 모듈에 구현됨
현재 메일 발송을 위한 메일 계정은 mk.manager2020@gmail.com을 이용하고 있으며 구글 앱 비밀번호를 이용함.
구글 앱 비밀번호란 본 계정의 비밀번호가 유출되는 것을 방지하기 위해 서비스할 앱(본 서비스)의 전용 비밀번호를 별도로 발급하여 이용하는 방식을 의미함

- 비밀번호 설정: [구글 계정의 보안](https://myaccount.google.com/security)의 앱 비밀번호
- 앱 비밀번호에 등록된 비밀번호명: carcenter
- 설정 저장소: .env 파일의 MAIL_HOST 등
- 설정파일: src/config/configuration.ts
- 관련 API 구현: src/lib/common/common.service.ts의 sendMail()

### Safe-CRUD 모듈 구현 및 이용법

back-end에서 사용하는 모든 데이터 모델 리소스는 기존 Base-CRUD 모듈을 통해 기본적인 CRUD가 가능하나 보안상의 문제가 발생할 수 있으므로, 로그인되어 토큰을 가진 사용자에 한해 제한적으로 CRUD를 제공하는 Safe-CRUD 모듈을 구현함

Safe-CRUD는 토큰에 등록된 업체와 사용자의 오브젝트ID 값을 이용하여 데이터 접근 범위를 제한하여 권한이 없는 데이터의 접근을 방지할 수 있다.

또한 사용자나 업체 정보와 같이 생성시 부가적인 가공이 필요한 모델의 경우 Safe-CRUD에서 제공하는 기본 create 라우팅 api의 접근을 제한해야 할 경우 해당 api를 오버라이딩 한 후 NotAcceptableException 처리를 한다.

```
  @Post()
  @ApiOperation({ summary: `제공 안함 (NotAcceptableException 처리)` })
  async create(@Req() req, @Body() doc: User): Promise<User> {
    throw new NotAcceptableException();
  }
```

### 컨트롤러와 서비스의 관계 및 개발 방법

컨트롤러는 클라이언트의 요청을 받아 해당 서비스로 전달하는 것을 목적으로 하며, 서비스는 컨트롤러의 요청을 처리하는 비즈니스 로직을 담당한다. 기본적인 개발 방법은 다음과 같다.

- 컨트롤러는 가능한 간단하게 구현되어야 하며, 하나의 전용 서비스만을 가짐
- 컨트롤러는 하나의 전용 서비스만을 이용하며 그 외 서비스를 이용할 수 없음
- 하나의 요청을 처리하기 위해 복수의 서비스가 필요한 경우 해당 컨트롤러의 전용 서비스에서 다른 서비스를 호출하는 방식으로 구현함
- 데이터 모델 서비스: 특정 데이터 모델(스키마)를 기반으로 DB에 CRUD를 수행하는 서비스
- 데이터 모델 서비스는 하나의 데이터 모델만을 가짐
- 하나의 요청을 처리하기 위해 복수의 모델 접근이 필요한 경우 해당 데이터 모델 서비스를 통해서만 접근해야 함
- DB 접근을 위한 모델은 전용 데이터 모델 서비스에 Singleton으로 존재해야 함

### 서비스의 메소드명 부여 방법

서비스의 메소드명 부여 방법은 해당 메소드를 호출하는 주체의 로그인 여부에 의해 결정한다.

- 데이터 모델 서비스의 경우 로그인 된 클라이언트 요청에만 대응하는 것을 원칙으로 함
- 특별한 경우(회원 가입 등)에 한해서 인증 토큰이 없는 경우에도 대응할 수 있으며 해당 메소드명은 '\_'로 시작함
