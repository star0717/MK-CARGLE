
# n2server 배포

## 기본 환경 구축

**n2server다운로드**

```
git clone https://github.com/ByunMooYoung/n2server.git
```

**instal.sh 스크립트 실행**

주요 기능
- front-end와 back-end의 .env 파일 생성 (소스 빌드용)
- npm 설치 (배포에 필요한 명령어 사용에 필요)
- 배포에 필요한 .env를 deploy_env로부터 복사해옴

```
/install.sh
```

**script-launcher**

n2server의 빌드, 도커 이미지 관리, 서비스 관리 등에 필요한 명령어는 굉장히 다양하며 쉬운 사용을 위해 주요 기능들을 npm script로 작성하여 이용한다. 다만 일반 package.jon을 이용하는 방식을 사용하기에는 관련 명령어들이 많고 복잡하여 script-launcher를 이용한다.

script-launcer를 이용하며 메뉴 선택 방식으로 원하는 기능을 이용할 수 있으며 간략한 설명도 확인할 수 있다. 명령어들과 설명은 launcher-config.json 파일에 기술되어 있다.

script-launcer는 다음의 명령어로 실행한다.

```
npm start
```

실행화면
```
ubuntu@ip-192-168-52-239:~/n2server$ npm start

> n2server@1.0.0 start /home/ubuntu/n2server
> launch

? Select action › - Use arrow-keys. Return to submit.
❯   build - 소스 빌드 및 도커 이미지 관리
    service
    swarm
    node
    context
    env
```

## Docker Swarm 모드

Docker swarm 모드를 이용하면 복수의 인스턴스에 n2server를 배치하고 스케일링 할 수 있다. 스웜모드는 크게 다음과 같이 나뉜다.

- 매니저 노드: 서비스 실행/관리/삭제. 소스 빌드 및 도커 이미지 담당
- 워커 노드: 매니저에 관리하에 서비스 실행. 서비스의 복사본을 수행하여 서비스 성능 향상

## 스웜 모드

**swarm init(매니저)**

init 명령어는 매니저가 실행한다.

```
ubuntu@ip-192-168-52-239:~/n2server$ npm start

> n2server@1.0.0 start /home/ubuntu/n2server
> launch

✔ Select action › swarm
✔ Select › init
✔ Are you sure … yes

Executing: npm start swarm:init

Swarm initialized: current node (k78g0etkh3gnrx58z2bn6udt0) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5udy7oaeiev7ul69khs8ynb9487q9kdyz8t4ilpfosa7qedu4o-c3xg5gc22jayje6wdq8up1t6v 192.168.52.239:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

init 명령어가 실행되면 자동적으로 매니저 노드가 되고, 워커 노드를 초대하기 위한 명령어가 토큰과 함께 출력된다. 각각의 워커 노드(EC2 인스턴스)들은 이 명령어를 통해 n2server 서비스 운영에 참여하게 된다.

추가로 매니저로 참여하기 위해서 docker swarm join-token manager 명령어를 입력하라는 안내가 출력되는데, 이는 현재 매니저 모드가 아닌 별도의 EC2 인스턴스를 워커가 아닌 매니저 노드로 참여시키고자 할때 이용하는 명령어 이며 해당 명령어를 입력하면 매니저로 로그인하기 위핸 명령어가 토큰과 함께 다시 출력된다.

매니저는 워커의 기능외에 서비스를 관리(실행/삭제 등)할 수 있는 추가 기능을 가진다.

스웜모드가 실행될 때에만 토큰을 확인할 수 있으므로 스웜모드를 실행할 때 해당 토큰을 잘 저장하자.

## ecr 로그인

n2server의 서비스는 Docker 이미지를 기반으로 수행되며 그 이미지는 AWS의 ECR을 이용해서 관리한다. ECR(Elastic Container Registry)는 AWS에서 제공하는 도커 컨테이너(이미지)의 저장소로 Dockerhub와 유사한 서비스 기능을 제공한다. 이미 ECR에 n2server의 도커 이미지가 등록되어 있는 경우 그 이미지를 pull 하여 신속하게 서비스를 시작할 수 있다.
ECR을 이용하기 위해서는 로그인이 필요하다.

```
ubuntu@ip-192-168-52-239:~/n2server$ npm start

> n2server@1.0.0 start /home/ubuntu/n2server
> launch

✔ Select action › context
✔ Select › login
✔ Are you sure … yes

Executing: npm start context:login

Login Succeeded
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store
```

## 서비스 실행

```
ubuntu@ip-192-168-52-239:~/n2server$ npm start

> n2server@1.0.0 start /home/ubuntu/n2server
> launch

✔ Select action › service
✔ Select › create
✔ Select › ec2-mode
✔ Are you sure … yes

Executing: npm start service:create:ec2-mode

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    14  100    14    0     0     64      0 --:--:-- --:--:-- --:--:--    64
env replace success!
http://13.215.162.173
ojv3i2trrmaoh50d2ug2jj9vr
```

약 10여초만에 ECR로부터 n2server의 이미지를 다운로드하여 서비스가 실행된다. 실행화면에 출력되는 url로 접속하여 서비스가 정상 동작하는지 확인한다.

### 서비스 실행 모드

n2server의 서비스를 실행하는 방식은 다음과 같이 두 종류다.

- ec2-mode: IP주소를 통해 n2server에 접속 가능한 모드
- domain-mode: 도메인 주소를 통해 n2server에 접속 가능한 모드

ec2-mode는 IP주소를 통해 서비스가 실행되는 서버의 public IP로 직접 접속하는 방식이다. AWS의 인스턴스는 생성될 때 마다 각기 다른 public IP가 부여되기 때문에 인스턴스를 실제 생성하는 순간까지 IP 주소를 알 수 없다. 그래서 서비스를 실행할 때 스스로 public IP를 확인하고 서버에 환경 변수로 부여한다.

domain-mode는 도메인 주소(http://cargle.net)를 통해 서비스에 접속하는 방식으로 인스턴스의 IP를 미리 알 필요가 없다. 다만 복수의 인스턴스로 동작하는 서비스의 특성상 도메인 주소에 매핑할 인스턴스가 필요하며 로드 밸런서가 그 역할을 한다. 다시 말해 도메인 모드를 이용하기 위해서는 로드 밸런서를 미리 구비하고 도메인 주소도 매핑되어야 한다.

## 워커 모드

워커 모드는 매니저 모드의 관리하에 n2server 서비스의 복사본을 수행한다. 1의 매니저와 복수개의 워커들로 하나의 n2server 클러스터가 생성되는 것이다.


# 이하 다 삭제 예정
# docker swarm 초기화

```
docker swarm init
```

```
ubuntu@ip-192-168-0-46:~/n2server$ docker swarm init
Swarm initialized: current node (zr8ud00mq3a5i0y19onllaubq) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-5h6lv5n46goap67184nw0eqtnwqfoq2im6b6gyjpsf1hcfqyn4-1llvfkxm1ck5qjonbyi7vtbcj 192.168.0.46:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

ubuntu@ip-192-168-0-46:~/n2server$ 
```

# docker image용 registry를 생성

```
docker service create --name registry --publish published=5000,target=5000 registry:2
```

# docker-compose를 통해 빌드

- 사용하는 yml 파일은 : docker-compose.yml
```
docker-compose build
```

## docker-compose를 통해 이미지 push

```
docker-compose push
```

# 서비스 배포

```
docker stack deploy --compose-file compose.swarm.yml n2server
```

# 서비스 확인

```
docker stack services n2server
```

# 서비스 삭제

```
docker stack rm n2server
```

# 이미지 저장소 삭제

```
docker service rm registry
```