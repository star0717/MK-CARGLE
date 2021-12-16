import { useRouter } from "next/router";

/**
 * jwt를 json으로 만드는 함수
 * @param token
 * @returns
 */
export const parseJwt = (token: string) => {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  var result = JSON.parse(payload.toString());

  return result;
};

export interface RoutePages {
  mainRoute: string;
  subRoute: string;
}

export const initPage = (): RoutePages => {
  const router = useRouter();

  const { page } = router.query; // page url query

  const pages: RoutePages = {
    mainRoute: page && page[0],
    subRoute: page && page[1],
  };

  return pages;
};
