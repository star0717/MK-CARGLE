import parse from "url-parse";
import { MbType } from "src/configure/etc.entity";
import { mbTypeOption } from "src/configure/list.entity";
import { genFindParamQuery } from "src/constants/model.const";
import { FindParameters } from "src/models/base.entity";
import { Company } from "src/models/company.entity";
import jwt from "jsonwebtoken";
import AWS, { S3 } from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});

const s3: AWS.S3 = new AWS.S3({
  params: {
    Bucket: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
  },
  region: process.env.NEXT_PUBLIC_REGION,
});

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

let _externalApiPath =
  process.env.NODE_ENV == "production"
    ? `${process.env.DESTINATION_API}/api/`
    : `${process.env.DESTINATION_API}:${process.env.PORT}/api/`;

console.log("External API Path: " + _externalApiPath);

/**
 * API 호출을 위해 경로 정보 생성
 * @param path 호출할 API의 경로
 * @param args 전달할 아큐먼트
 * @returns API 호출용 최종 경로
 */
export const genApiPath = (path: string, args?: Partial<GenPathArgs>) => {
  let apiPath = "/api" + path;
  // console.log(apiPath);
  if (args?.isServerSide) {
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

/**
 * AWS S3 파일 업로드
 * @returns
 */
const s3FileUpload = async () => {
  if (!selectedFile) return alert("파일을 선택하세요");
  setProgress(0);
  let fileType: string = selectedFile.name;
  fileType = fileType.substring(fileType.lastIndexOf("."), fileType.length);
  const acceptType: string[] = [".jpeg", ".jpg", ".png", ".pdf"];
  if (!acceptType.includes(fileType))
    return alert("jpeg, jpg, png, pdf 파일만 가능합니다");
  const fileName: string = company.comRegNum;

  const params: S3.Types.PutObjectRequest = {
    ACL: "public-read",
    Body: selectedFile,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: "crn/" + fileName,
    ContentType: selectedFile.type,
  };

  s3.putObject(params)
    .on("httpUploadProgress", (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
      setShowAlert(true);
    })
    .send((err) => {
      if (err) return alert("업로드 에러");
    });
};

/**
 * AWS S3 파일 업로드(Blob 타입)
 * @param blob
 * @param fileName
 * @param fold
 * @returns
 */
export const s3FileUploadV1 = (blob: Blob, fileName: string, fold?: string) => {
  const params: S3.Types.PutObjectRequest = {
    ACL: "public-read",
    Body: blob,
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: fold + "/" + fileName,
    ContentType: blob.type,
  };

  const res = s3.putObject(params).promise();
  return res;
};

/**
 * AWS S3 파일 data 가져오기
 * @param fileName
 * @param fold
 * @returns
 */
export const s3GetFileData = async (fileName: string, fold?: string) => {
  const params: S3.Types.GetObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: fold + "/" + fileName,
  };
  let result: S3.GetObjectAclOutput;
  try {
    result = await s3.getObject(params).promise();
  } catch (err) {
    return (result = null);
  }

  return result;
};

/**
 * AWS S3 파일 url 가져오기
 * @param fileName
 * @param fold
 */
export const s3GetFileUrl = async (fileName: string, fold?: string) => {
  const params: any = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
    Key: fold + "/" + fileName,
    Expires: 30,
  };
  let url: string;
  const exist = await s3GetFileData(fileName, fold);
  exist ? (url = s3.getSignedUrl("getObject", params)) : (url = null);

  return url;
};
