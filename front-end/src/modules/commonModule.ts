import parse from "url-parse";
import { MbType } from "../configure/etc.entity";
import { mbTypeOption } from "../configure/list.entity";
import { genFindParamQuery } from "../constants/model.const";
import { FindParameters } from "../models/base.entity";
import { Company } from "../models/company.entity";
import jwt from "jsonwebtoken";

/**
 * jwt를 검증하여 토큰값 받아오는 함수
 * @param cookie
 * @returns
 */
export const parseJwt = (
  cookie: string,
  key: string
): string | jwt.JwtPayload => {
  const result = jwt.verify(cookie, key);
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

// 서버사이드 랜더링시 사용되는 Back-End 주소
// const _externalApiPath = `${process.env.DESTINATION_API}:${process.env.PORT}/api/`;
// const _externalApiPath = `${process.env.DESTINATION_API}/api/`;

const _externalApiPath =
  process.env.NODE_ENV == "production"
    ? `${process.env.DESTINATION_API}/api/`
    : `${process.env.DESTINATION_API}:${process.env.PORT}/api/`;
console.log("*************************************");
console.log("*************************************");
console.log("*************************************");
console.log("*************************************");
console.log("*************************************");
console.log("*************************************");
console.log("External API Path: " + _externalApiPath);

/**
 * API 호출을 위해 경로 정보 생성
 * @param path 호출할 API의 경로
 * @param args 전달할 아큐먼트
 * @returns API 호출용 최종 경로
 */
export const genApiPath = (path: string, args?: Partial<GenPathArgs>) => {
  let apiPath = "/api" + path;
  console.log(apiPath);
  if (args?.isServerSide) {
    // apiPath = `${process.env.DESTINATION_API}:${process.env.PORT}/api/${path}`;
    apiPath = `${_externalApiPath}${path}`;
  }

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
  const trimStr = str.replaceAll(" ", "");
  return trimStr;
};

/**
 * 빈 값을 가진 json key 제거
 */
export const deleteKeyJson = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === undefined) {
      delete obj[key];
    }
  });
};

/**
 * 중간값 별표 처리
 */
export const maskingStr = (str: string) => {
  if (str.length > 2) {
    const first = str.substring(0, 1);
    const center = str.substring(1, str.length - 1);
    const last = str.substring(str.length - 1, str.length);

    let maskingCenter = "";
    for (let i = 0; i < center.length; i++) {
      maskingCenter += "*";
    }

    const maskingStr = first + maskingCenter + last;
    return maskingStr;
  } else {
    let pattern = /.$/; // 정규식
    return str.replace(pattern, "*");
  }
};

/**
 * 2차원 배열 생성
 * @param rows
 * @param columns
 */
export const create2dArray = (rows: number, columns: number, initArr?: any) => {
  let arr: string[][] = new Array(rows);
  let a: number = 3;
  if (rows === 0) rows = 1;

  for (let i = 0; i < rows; i++) {
    if (initArr) {
      let add: string[] = [];
      for (let j = a - 3; j < a; j++) {
        if (initArr[j]) {
          add.push(initArr[j]);
          arr[i] = add;
        }
      }
    } else {
      arr[i] = new Array(columns);
    }
    a = a + 3;
  }

  if (arr.length === 0) arr = [[]];
  return arr;
};

/**
 * 데이터 정렬
 * @param data
 * @param type
 * @param sort
 * @param opt
 * @returns
 */
export const dataSort = (
  data: any,
  type: string,
  sort: number,
  opt?: string
) => {
  let sortData: any = [];
  switch (type) {
    case "string":
      sortData = data.sort((a: any, b: any) => {
        let aStr: string = "";
        let bStr: string = "";
        if (opt) {
          aStr = a[opt];
          bStr = b[opt];
        } else {
          aStr = a.toString();
          bStr = b.toString();
        }
        if (sort === 1) {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
      break;
    case "date":
      sortData = data.sort((a: any, b: any) => {
        let aStr: number = 0;
        let bStr: number = 0;
        if (opt) {
          aStr = +new Date(a[opt]);
          bStr = +new Date(b[opt]);
        } else {
          aStr = +new Date(a);
          bStr = +new Date(b);
        }
        if (sort === 1) {
          return aStr - bStr;
        } else {
          return bStr - aStr;
        }
      });
      break;
    default:
      break;
  }
  return sortData;
};
