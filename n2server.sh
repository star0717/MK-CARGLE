# ssh 서버 실행
# #!/bin/sh
# #SSH_PUBLIC_KEY=생성된 id_rsa.pub의 내용 복사부분(AWS Systems Manager Parameter Store에 저장해놓고 끌어오거나 그게 아니라면 직접 적용해줄 수 도있다.)
# if [ -z "$SSH_PUBLIC_KEY" ]
# then
#   echo "Need your SSH public key as the SSH_PUBLIC_KEY env variable."
#   exit 1
# fi

# # Create a folder to store user's SSH keys if it does not exist.
# USER_SSH_KEYS_FOLDER=~/.ssh
# [ ! -d "$USER_SSH_KEYS_FOLDER" ] && mkdir -p $USER_SSH_KEYS_FOLDER

# # Copy contents from the `SSH_PUBLIC_KEY` environment variable
# # to the `${USER_SSH_KEYS_FOLDER}/authorized_keys` file.k
# # The environment variable must be set when the container starts.
# echo $SSH_PUBLIC_KEY > ${USER_SSH_KEYS_FOLDER}/authorized_keys

# # Clear the `SSH_PUBLIC_KEY` environment variable.
# unset SSH_PUBLIC_KEY

# Start the SSH daemon.
/usr/sbin/sshd

# 도커 이미지가 실행될 때 수행되는 명령어들
cd /back-end/
npm run start:prod &
cd /front-end/
node server.js &
cd /
nginx -g 'daemon off;'

