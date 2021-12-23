import parse from "url-parse";
import { AuthTokenInfo } from "../models/auth.entity";

/**
 * jwt를 json으로 만드는 함수
 * @param token
 * @returns
 */
export const parseJwt = (token: string): AuthTokenInfo => {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  var result = JSON.parse(payload.toString());

  return result;
};

/**
 * url 파싱하여 pathName 얻는 함수
 * @param url
 * @returns
 */
export const getPathName = (url: string): string => {
  const pathName: string = parse(url).pathname;

  return pathName;
};

/**
 * 주소 한줄로 나타내기
 * @param main
 * @param sub
 * @param post
 * @returns
 */
export const makeFullAddress = (main: string, sub: string, post: string) => {
  let fullAddress: string = "";
  if (main) {
    if (sub) {
      fullAddress = `${main} ${sub}, (${post})`;
    } else {
      fullAddress = `${main}, (${post})`;
    }
  } else {
    fullAddress = `-`;
  }
  return fullAddress;
};

/**
 * Date를 string 타입으로 전환(input type에 맞게)
 * @param date
 * @returns
 */
export const dateToString = (date: Date) => {
  let stringDate: string = "";
  date ? (stringDate = date.toString().slice(0, 10)) : (stringDate = "");
  return stringDate;
};
