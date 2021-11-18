// jwt를 json으로 만드는 함수
export const parseJwt = (token: string) => {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  var result = JSON.parse(payload.toString());

  return result;
};
