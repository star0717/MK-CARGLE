import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import parse from "url-parse";
import { MbType } from "../configure/etc.entity";
import { mbTypeOption } from "../configure/list.entity";
import { genFindParamQuery } from "../constants/model.const";
import { AuthTokenInfo } from "../models/auth.entity";
import { FindParameters } from "../models/base.entity";
import { Company } from "../models/company.entity";

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
 * url 파싱하여 query 얻는 함수
 * @param url
 * @returns
 */
export const getQuery = (url: string): Record<string, string> => {
  const query: Record<string, string> = parse(url, true).query;

  return query;
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

/**
 * 정비업종을 해당하는 string으로 출력
 */
export const mbTypeToString = (list: Company) => {
  const textMbType: MbType = mbTypeOption.find((item) => {
    return item.value === list.mbTypeNum;
  });
  if (textMbType == null) return;
  else textMbType.text;
};

// API 호출에 사용할 URL을 생성하기 위해 전달되는 아규먼트의 구조
class GenPathArgs {
  // 전달할 ID
  id?: string;
  // 리스트 조회에 사용할 파라미터
  findParams?: FindParameters;
  // 디스패치에서 호출된 것인지 유무
  isServerSide?: boolean;
}

/**
 * API 호출을 위해 경로 정보 생성
 * @param path 호출할 API의 경로
 * @param args 전달할 아큐먼트
 * @returns API 호출용 최종 경로
 */
export const genApiPath = (path: string, args?: Partial<GenPathArgs>) => {
  let apiPath = "/api" + path;
  if (args?.isServerSide)
    apiPath = `${process.env.DESTINATION_API}:${process.env.DESTINATION_PORT}${path}`;

  console.log("apiPath: ", apiPath);
  if (args?.id) {
    if (!apiPath.endsWith("/")) apiPath += "/" + args.id;
    else apiPath += args.id;
  }
  if (args?.findParams) {
    apiPath += genFindParamQuery(args.findParams);
  }
  console.log("API 호출 경로:", apiPath);
  return apiPath;
};

/**
 * 공백제거
 * @param str
 * @returns
 */
export const trim = (str: string) => {
  const trimStr = str.replace(" ", "");
  return trimStr;
};

/**
 * 빈 값을 가진 json key 제거
 */
export const deleteKeyJson = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });
};
