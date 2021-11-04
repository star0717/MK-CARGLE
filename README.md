# n2server
Next.js + Nestjs 기반의 통합서버 

# 관련 문서
[n2server](https://github.com/ByunMooYoung/n2server)

## 구성
n2server는 다음과 같이 3종의 모듈로 구성된다.
* front-end: UI 페이지 구성을 담당
* back-end: DB 접근 등의 API 제공을 담당
* models: 데이터 모델 클래스들이 위치함

## 모듈별 매뉴얼
각 모듈별 매뉴얼은 각 모듈의 README.md파일을 참고한다.

## 요약 설명
### 데이터 모델 개발 및 이용
n2server에서는 단일 데이터 모델 클래스를 CreateDTO, UpdateDTO, Schema로 혼용할 수 있다. 데이터 모델 클래스의 구현은 back-end 개발자가 메인으로 담당하며, 구현된 클래스를 front-end 개발자들이 이용할 수 있도록 제공해야 한다. 이를 위해 models 모듈을 운영한다.

models 모듈은 front-end에 구현된 데이터 모델 클래스를 참조하여 ts파일을 컴파일하고 models/dist 폴더에 결과물을 배치한다.

