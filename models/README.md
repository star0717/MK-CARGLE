# models 모듈

n2server에서 사용하는 TypeScript 기반의 데이터 모델을 제공하는 모듈

본 문서의 작성은 back-end 서버 개발자가 담당한다.

## 관련 문서

- [n2server 매뉴얼](https://github.com/ByunMooYoung/n2server)
- [front-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/front-end)
- [back-end 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/back-end)
- [models 매뉴얼](https://github.com/ByunMooYoung/n2server/tree/main/models)

## 데이터 모델 생성 방법

back-end 서버 개발 중 구현된 데이터 모델 클래스는 DTO(Data Transfer Object)로도 사용되며 그 이유로 페이지를 구성하는 front-end 서버에서도 이용되게 된다.

본 모듈은 back-end/src/models에 구현된 데이터 모델 클래스들을 빌드하여 models/dist 폴더에 배치하게 된다. 빌드 명령어는 다음과 같다.

```bash
npm run compile
```
