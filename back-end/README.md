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