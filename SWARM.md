# docker swarm 초기화

```
docker swarm init
```

```
ubuntu@ip-192-168-0-46:~/n2server$ docker swarm init
Swarm initialized: current node (8j1gv2xqtxqng5ku55f0nofr8) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0uthdexdzew0u9waj6j15e97kvsajkiw7o3lj57092pdacrrip-33ja6t4y4ed2tlstfiz7bxlg0 192.168.0.46:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
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