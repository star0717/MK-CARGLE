# n2server

Next.js + Nestjs 기반의 통합서버

## 관련 문서

- [n2server 매뉴얼](https://github.com/ByunMooYoung/n2server)
- [front-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/front-end)
- [back-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/back-end)
- [models 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/models)

## 구성

n2server는 다음과 같이 3종의 모듈로 구성된다.

- front-end: UI 페이지 구성을 담당
- back-end: DB 접근 등의 API 제공을 담당
- models: 데이터 모델 클래스들이 위치함

## 모듈별 매뉴얼

각 모듈별 매뉴얼은 각 모듈의 README.md파일을 참고한다.

## 요약 설명

### 데이터 모델 개발 및 이용

n2server에서는 단일 데이터 모델 클래스를 CreateDTO, UpdateDTO, Schema로 혼용할 수 있다. 데이터 모델 클래스의 구현은 back-end 개발자가 메인으로 담당하며, 구현된 클래스를 front-end 개발자들이 이용할 수 있도록 제공해야 한다. 이를 위해 models 모듈을 운영한다.

models 모듈은 front-end에 구현된 데이터 모델 클래스를 참조하여 ts파일을 컴파일하고 models/dist 폴더에 결과물을 배치한다.

## 로컬 개발 서버

개발 편의를 위해 PC환경의 개발 서버를 사내 LAN망에 구축하여 사용함.

- LAN망에 구축된 서버는 동적 사설 IP를 가지며 사내에서만 접속이 가능함
- 서버의 IP는 자동 할당 되며 가끔씩 변경될 수 있다.

### 새로운 개발자 추가

로컬 개발 서버에 새로운 개발자를 추가할 경우 다음과 같은 절차로 진행한다.

- 해당 사용자가 사용할 Port를 결정함
- 예를 들어 8000번대 Port를 사용할 경우 8000(font-end), 8001(back-end), 8022(ssh)의 포트를 사용함
- ufw(ubuntu firewall)을 통해 Port를 allow함
- 해당 개발자용 디렉토리를 생성하고 n2server 소스를 git clone
- font-end, back-end의 .env 파일 설정 및 라이브러리 설치
- ssh 포트 추가: sshd_config 파일에 포트 추가
- front-end 포트 추가: .env 파일에 DESTINATION_PORT에 back-end용 포트 설정. package.json 파일에 script 항목에 새로운 포트 추가
- back-end 포트 추가: .env 파일의 SV_PORT에 back-end용 포트 설정
