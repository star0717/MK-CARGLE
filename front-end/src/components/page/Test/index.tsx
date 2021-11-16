import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  comFileUploadAction,
  manFileUploadAction,
} from "../../../../store/action/user.action";

const OwnerUpload: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  // 업로드할 파일 state
  const [file, setFile] = useState({
    comFile: "",
    manFile: "",
  });
  // 업로드할 파일명 state
  const [fileName, setFileName] = useState({
    comFile: "",
    manFile: "",
  });

  // 파일 선택 시 파일명 state 변경
  const onFileSelectHandler = (e: any) => {
    setFile({ ...file, [e.target.name]: e.target.files[0] });
    setFileName({ ...fileName, [e.target.name]: e.target.files[0].name });
  };

  console.log("파일 : ", file.comFile);
  console.log("이름 : ", fileName.comFile);

  const onFileUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileArray = new FormData();
    fileArray.append("comFile", file.comFile);
    // fileArray.append("manFile", fileName.manFile);
    dispatch(comFileUploadAction(fileArray)).then((res: any) => {
      console.log(res);
    });
    // dispatch(manFileUploadAction()).then((res: any) => {
    //   console.log(res);
    // });
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
            <button
              type="button"
              onClick={(e) => {
                router.push("/");
              }}
            >
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
