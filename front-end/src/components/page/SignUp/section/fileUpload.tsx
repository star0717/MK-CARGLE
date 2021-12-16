import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  approvalReqAction,
  comFileUploadAction,
  manFileUploadAction,
  signOutUserAction,
  tokenCheckAction,
} from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import FileUploadPresenter from "./fileUploadPresenter";

interface FileUploadProps {
  stepNumber?: any;
  setStepNumber?: any;
}

/**
 * 파일 데이터 초기화
 */
const fileInit = {
  comFile: "",
  manFile: "",
};

/**
 * 회원가입: 파일 업로드 컴포넌트(기능)
 * @param props
 * @returns
 */
const FileUpload: NextPage<FileUploadProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props?.stepNumber;
  const setStepNumber = props?.setStepNumber;

  const [file, setFile] = useState<any>(fileInit); // 업로드할 파일 state
  const [fileName, setFileName] = useState<any>(fileInit); // 업로드할 파일명 state

  /**
   * 파일 선택 시 파일명 state 변경
   * @param e
   */
  const onFileSelectHandler = (e: any) => {
    let fileData = e.target.files[0];
    setFile({ ...file, [e.target.name]: fileData });
    setFileName({ ...fileName, [e.target.name]: fileData.name });
  };

  /**
   * 다음에 하기(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert("입력하신 계정정보로 로그인하시면 서류제출이 가능합니다.");
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push("/");
    });
  };

  /**
   * 파일 업로드 handler
   * @param e
   */
  const onFileUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comFormData = new FormData();
    const manFormData = new FormData();
    comFormData.append("file", file.comFile); // NestJs의 fileinterceptor의 name과 일치해야 됨
    manFormData.append("file", file.manFile);
    dispatch(comFileUploadAction(comFormData)).then(
      (res: any) => {
        dispatch(manFileUploadAction(manFormData)).then(
          (res: any) => {
            dispatch(tokenCheckAction()).then((res: any) => {
              if (res.payload) {
                dispatch(approvalReqAction(res.payload.cID)).then(
                  (res: any) => {
                    if (res.payload) {
                      if (stepNumber) {
                        setStepNumber(stepNumber + 1);
                      } else {
                        alert(
                          "제출이 완료되었습니다.\n승인 후에 로그인이 가능합니다."
                        );
                        dispatch(signOutUserAction()).then((res: any) => {
                          dispatch({ type: actionTypesUser.USER_INIT });
                          router.push("/");
                        });
                      }
                    } else {
                      alert("파일 업로드에 실패했습니다.");
                    }
                  }
                );
              } else {
                alert("파일 업로드에 실패했습니다.");
              }
            });
          },
          (err) => {
            if (err.response.status === 400 || 500) {
              alert("정비업 등록증을 확인해주세요.");
              setFile(fileInit);
              setFileName(fileInit);
            }
          }
        );
      },
      (err) => {
        if (err.response.status === 400 || 500) {
          alert("사업자 등록증을 확인해주세요.");
          setFile(fileInit);
          setFileName(fileInit);
        }
      }
    );
  };

  // 화면구성에 넘길 props
  const fProps = {
    fileName,
    file,
    onFileUploadHandler,
    onFileSelectHandler,
    onSignOutHandler,
  };

  return <FileUploadPresenter {...fProps} />;
};

export default FileUpload;
