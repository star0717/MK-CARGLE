# AWS를 통한 배포관리

### constances

--cluster n2server
--config-name n2server
--profile-name n2server
--cluster-config n2server --ecs-profile n2server

## ECS CLI 구성

1. ECS CLI 구성

```
ecs-cli configure --cluster n2server --default-launch-type EC2 --config-name n2server --region ap-northeast-2
```

2. 프로필 생성

```
ecs-cli configure profile --access-key AKIASGPBUARRSHQPH5PW --secret-key 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 --profile-name n2server
```

# 클러스터 생성

```
ecs-cli up --keypair cargle --capability-iam --size 1 --instance-type t2.medium --cluster-config n2server --ecs-profile n2server
```

결과

```
ubuntu@ip-172-26-11-143:~/n2server$ ecs-cli up --keypair cargle --capability-iam --size 2 --instance-type t2.medium --cluster-config n2server --ecs-profile n2server
INFO[0000] Using recommended Amazon Linux 2 AMI with ECS Agent 1.60.1 and Docker version 20.10.7
INFO[0000] Created cluster                               cluster=n2server region=ap-northeast-2
INFO[0000] Waiting for your cluster resources to be created...
INFO[0000] Cloudformation stack status                   stackStatus=CREATE_IN_PROGRESS
INFO[0060] Cloudformation stack status                   stackStatus=CREATE_IN_PROGRESS
INFO[0121] Cloudformation stack status                   stackStatus=CREATE_IN_PROGRESS
VPC created: vpc-0af40a4a95e1a141e
Security Group created: sg-07375f09b421dcccf
Subnet created: subnet-098dfe7053d5be303
Subnet created: subnet-00341a2881e32b561
Cluster creation succeeded.
```

AWS ECS 콘솔에서 등록된 클러스터 확인 가능

- 새로운 VPC와 보안그룹, 그리고 두개의 서브넷이 함께 생성됨

# Compose 파일 생성

docker-compose.yml 파일과 params.yml 파일 작성

# Docker 이미지 빌드

ecs-cli compose 명령어는 도커 이미지 빌드를 지원하지 않으며 실제 이미지 build 및 push는 일반 docker-compose 명령을 이용해야함

1. Docker 로그인

```
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin \
  151333897315.dkr.ecr.ap-northeast-2.amazonaws.com
```

2. ECR에 이미지 Push

```
docker-compose build
docker-compose push
```

# 클러스터에 Compose 파일 배포

```
ecs-cli compose up --create-log-groups --cluster-config n2server --ecs-profile n2server
```

# 클러스터에서 실행 컨테이너 보기

```
ecs-cli compose ps --cluster-config n2server --ecs-profile n2server
```

결과

```
ubuntu@ip-172-26-11-143:~/n2server$ ecs-cli ps -cluster-config n2server --ecs-profile n2server
Name                                                    State                Ports                    TaskDefinition  Health
n2server/b9f710d96cc7463a8e6ca76d35d2493a/back-end      STOPPED                                       n2server:4      UNKNOWN
n2server/b9f710d96cc7463a8e6ca76d35d2493a/proxy-server  STOPPED ExitCode: 1  3.34.192.123:80->80/tcp  n2server:4      UNKNOWN
n2server/b9f710d96cc7463a8e6ca76d35d2493a/front-end     STOPPED                                       n2server:4      UNKNOWN
ubuntu@ip-172-26-11-143:~/n2server$
```

# 실행 컨테이너 종료

```
ecs-cli compose down --cluster-config n2server --ecs-profile n2server
```

# 태스크 삭제

- 동작중인 태스크나 서비스를 모두 종료한 후 수행함

```
ecs-cli down --force --cluster-config n2server --ecs-profile n2server
```

# 태스크 정의 삭제

```
aws ecs deregister-task-definition \
    --region ap-northeast-2 \
    --task-definition n2server:1
```

# Domain 연동

## 도메인 발급

AWS 콘솔의 Route 53에서 바로 구입 가능

## SSL 인증서 발급

AWS 콘솔의 Certificate Manager에서 요청 가능

1. 인증서 요청

인증서 요청 -> 퍼블릭 인증 요청 -> 도메인 이름 입력, DNS 검증 선택 후 요청

2. 레코드 생성

인증서 나열에서 요청한 인증서 선택 후 Route 53에서 레코드 생성 클릭

- 발급까지 몇 분 소요

## VPC 및 Subnet 생성

VPC 콘솔에서 VPC 생성 선택

1. VPC 설정

VPC, 서브넷 등 선택
VPC 설정에서 이름태크에 프로젝트명(n2server) 입력

가용 영역: 2

- 가용 영역을 두 곳(a와 b)로 설정
- 특정 영역에 장애가 발생해도 서비스 지속 가능 목적

퍼블릿 서브넷 수: 2

- 두 가용 영역에 외부 접근이 가능한 퍼블릿 서브넷을 1개씩 배치

프라이빗 서브넷 수 2

- 두 가용 영역에 외부 접근이 불가한 프라이빗 서비넷을 1개씩 배치

DNS 호스트 이름 활성화 선택

VPC 콘솔의 각 메뉴에서 생성된 VPC, 서브넷, 라우팅 테이블, 인터넷 게이트웨이를 확인한다.

- 프로젝트명을 입력한 경우 프로젝트명을 prefix로 가지는 이름이 자동 부여됨

## 보안 그룹 설정

EC2 -> 보안 그룹 -> 보안 그룹 생성

1. 기본 세부 정보

- 보안 그룹 이름: n2server-elb-sg
- VPC: 상기 생성한 VPC 선택

2. 인바운드 규칙

- HTTP와 HTTPS 추가

## ELB 생성

EC2 -> 로드 랠런서 생성 -> Application Load Balancer -> 생성

1. 기본 설정

- 이름: n2server-elb
  Internet-face, IPv4로 설정

- Internet-face: 클라이언트의 요청을 특정 퍼블릭 서브넷으로 연동
- Internet: 클라이언트의 요청을 특정 프라이빗 IP로 연동

2. Network mapping

- VPC: n2server-vpc
- Mappings: 각 퍼블릭 서브넷 연결

3. 보안 그룹

- 상기 생성한 보안 그룹 연결: n2server-elb-sg

4. 리스너와 라우팅

- HTTP:80에 대상 그룹 생성 선택

4-1. 대상 그룹 생성

기본 설정

- 타입 선택: Instances
- 대상 그룹명: n2server-vpc-tg
- 프로토콜: HTTP:80
- VPC: n2server-vpc
- 프로토콜 버전: HTTP1

아직 생성된 인스턴스가 없으므로 인스턴스 등록은 생략하고 대상 그룹 생성 완료

4-2. 대상 그룹 등록

로드 밸런서 등록 화면으로 돌아와서 Default action에 생성한 대상 그룹(n2server-vpc-tg)를 등록

5. ELB에 도메인 연결

Route 53 -> 호스팅 영역 -> 연결할 도메인 선택 -> 레코드 생성 -> 마법사로 전환

1단계 라우팅 정책 선택: 단순 라우팅 선택

2단계 레코드 구성: 단순 레코드 정의
레코드 이름: 수정 않함(www.domain.com과 domain.com을 받기 위함)
레코드 유형: A - IPv4 주소 및 일부 AWS 리소스로 트래픽 라우팅
값/트래픽 라우팅 대상

- Application/Classing Load Balancer에 대한 별칭
- 리전 선택
- ELB 선택

# 도메인 기반 서비스 생성

## 기존 클러스터 종료 후 새로운 클러스터 생성

생성한 VPC, Subnet, 보안그룹 정보가 추가된 클러스터 생성

```
ecs-cli up --keypair cargle \
    --capability-iam \
    --size 1 \
    --security-group sg-0db83524b619831fd \
    --vpc vpc-07c3ca5b564ae9332 \
    --subnets subnet-06df8c667c02238d0,subnet-01dbc87cae42bbc07,subnet-0707b27c1dc20c500,subnet-090a37cf943fd7db5 \
    --instance-type t2.medium \
    --cluster-config n2server --ecs-profile n2server
```

## 클러스터에 Compose 파일 배포

```
ecs-cli compose up --cluster-config n2server --ecs-profile n2server
```

태스크 생성

```
ecs-cli compose \
  -f docker-compose.yml \
  -p n2server \
  create \
  --cluster-config n2server
```

서비스 생성(위에 태스크 생성 후에 이용 가능)

```
aws ecs create-service \
  --service-name n2server \
  --launch-type EC2 \
  --task-definition n2server \
  --cluster n2server \
  --desired-count 3 \
  --deployment-controller type=ECS \
  --deployment-configuration minimumHealthyPercent=100,maximumPercent=200 \
  --health-check-grace-period-seconds 600 \
  --scheduling-strategy REPLICA \
  --load-balancers '[{"targetGroupArn": "arn:aws:elasticloadbalancing:ap-northeast-2:151333897315:targetgroup/n2server-vpc-tg/930cb2f780759e85", "containerName": "proxy-server", "containerPort": 80}]'
```

```
aws ecs create-service \
  --service-name n2server \
  --launch-type EC2 \
  --task-definition n2server \
  --cluster n2server \
  --desired-count 3 \
  --deployment-controller type=ECS \
  --deployment-configuration minimumHealthyPercent=100,maximumPercent=200 \
  --health-check-grace-period-seconds 600 \
  --scheduling-strategy REPLICA
```

ecs-cli up --keypair cargle --capability-iam --size 4 --instance-type t2.medium --cluster-config n2server --ecs-profile n2server

```
aws ecs update-service \
  --service n2server \
  --task-definition n2server \
  --cluster n2server \
  --desired-count 4 \
  --force-new-deployment
```

서비스 up

```
ecs-cli compose --project-name n2server service up --create-log-groups --cluster-config n2server
```

서비스 ps

```
ecs-cli compose --project-name n2server service ps --cluster-config n2server
```

서비스 down

```
ecs-cli compose --project-name n2server service down --cluster-config n2server
```

클러스터 설정

```
ecs-cli configure --config-name n2server --cluster n2server --default-launch-type EC2  --region ap-northeast-2
```

#!/bin/bash
vpc="vpc-082ccfc4dfa5f3676"
aws ec2 describe-internet-gateways --filters 'Name=attachment.vpc-id,Values='$vpc | grep InternetGatewayId
aws ec2 describe-subnets --filters 'Name=vpc-id,Values='$vpc | grep SubnetId
aws ec2 describe-route-tables --filters 'Name=vpc-id,Values='$vpc | grep RouteTableId
aws ec2 describe-network-acls --filters 'Name=vpc-id,Values='$vpc | grep NetworkAclId
aws ec2 describe-vpc-peering-connections --filters 'Name=requester-vpc-info.vpc-id,Values='$vpc | grep VpcPeeringConnectionId
aws ec2 describe-vpc-endpoints --filters 'Name=vpc-id,Values='$vpc | grep VpcEndpointId
aws ec2 describe-nat-gateways --filter 'Name=vpc-id,Values='$vpc | grep NatGatewayId
aws ec2 describe-security-groups --filters 'Name=vpc-id,Values='$vpc | grep GroupId
aws ec2 describe-instances --filters 'Name=vpc-id,Values='$vpc | grep InstanceId
aws ec2 describe-vpn-connections --filters 'Name=vpc-id,Values='$vpc | grep VpnConnectionId
aws ec2 describe-vpn-gateways --filters 'Name=attachment.vpc-id,Values='$vpc | grep VpnGatewayId
aws ec2 describe-network-interfaces --filters 'Name=vpc-id,Values='$vpc | grep NetworkInterfaceId
