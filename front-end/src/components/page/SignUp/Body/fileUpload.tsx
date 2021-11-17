import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  comFileUploadAction,
  manFileUploadAction,
  signOutUserAction,
} from "../../../../../store/action/user.action";

const fileInit = {
  comFile: "",
  manFile: "",
};

const OwnerUpload: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  // 업로드할 파일 state
  const [file, setFile] = useState(fileInit);
  // 업로드할 파일명 state
  const [fileName, setFileName] = useState(fileInit);

  // const [upload, setUpload] = useState(false); // 파일 두개 업로드 여부

  // 파일 선택 시 파일명 state 변경
  const onFileSelectHandler = (e: any) => {
    setFile({ ...file, [e.target.name]: e.target.files[0] });
    setFileName({ ...fileName, [e.target.name]: e.target.files[0].name });
  };

  // 다음에 하기(logout 같은 기능) handler
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push("/");
    });
  };

  // 파일 업로드 handler
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
            setStepNumber(stepNumber + 1);
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

  return (
    <div
      style={{
        width: "95%",
        height: "400px",
        backgroundColor: "mintcream",
        margin: "10px",
      }}
    >
      <form onSubmit={onFileUploadHandler}>
        <div
          style={{
            width: "100%",
            height: "40%",
            backgroundColor: "peru",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "50%" }}>
              <p>사업자등록증</p>
              <div>
                <input
                  type="text"
                  placeholder="jpg, png, pdf 형식"
                  value={fileName.comFile}
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="comFile" style={{ backgroundColor: "green" }}>
                  파일선택
                </label>
                <input
                  type="file"
                  id="comFile"
                  name="comFile"
                  onChange={onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <p>정비업등록증</p>
              <div>
                <input
                  type="text"
                  placeholder="jpg, png, pdf 형식"
                  value={fileName.manFile}
                  required
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="manFile" style={{ backgroundColor: "green" }}>
                  파일선택
                </label>
                <input
                  type="file"
                  id="manFile"
                  name="manFile"
                  onChange={onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "30%",
            backgroundColor: "orange",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <button type="button" onClick={onSignOutHandler}>
              다음에하기
            </button>
            <button type="submit">제출하기</button>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "30%",
            backgroundColor: "yellow",
          }}
        >
          {/* 물음표 이모티콘, 메세지 삽입 */}
        </div>
      </form>
    </div>
  );
};

export default OwnerUpload;
