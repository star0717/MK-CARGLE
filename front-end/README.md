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
* 

### 데이터 모델(models) 이용법
front-end에서  back-end와의 통신에서 사용하는 데이터 모델 클래스들은 전적으로 back-end에서 개발된다. 이를 front-end에서 이용하기 위해서는 models 모듈에서 데이터 모델 클래스들을 컴파일해야 한다.
model 모듈에서 다음의 명령으로 데이터 모델 클래스를 컴파일한다.
```bash
npm run compile
```

컴파일된 결과물(모델 클래스)들은 front-end의 /src/models 폴더에 자동 생성된다.
