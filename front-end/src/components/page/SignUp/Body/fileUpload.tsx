import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  approvalReqAction,
  comFileUploadAction,
  manFileUploadAction,
  signOutUserAction,
} from "../../../../../store/action/user.action";

interface FileUploadProps {
  stepNumber?: any;
  setStepNumber?: any;
  cID?: any;
}

const fileInit = {
  comFile: "",
  manFile: "",
};

const FileUpload: NextPage<FileUploadProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props?.stepNumber;
  const setStepNumber = props?.setStepNumber;
  const cID = props?.cID;

  console.log("씨아이디 : ", cID);

  // 업로드할 파일 state
  const [file, setFile] = useState(fileInit);
  // 업로드할 파일명 state
  const [fileName, setFileName] = useState(fileInit);

  // const [upload, setUpload] = useState(false); // 파일 두개 업로드 여부

  // 파일 선택 시 파일명 state 변경
  const onFileSelectHandler = (e: any) => {
    let fileData = e.target.files[0];
    setFile({ ...file, [e.target.name]: fileData });
    setFileName({ ...fileName, [e.target.name]: fileData.name });
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
            dispatch(approvalReqAction(cID)).then((res: any) => {
              if (res.payload) {
                if (stepNumber) {
                  setStepNumber(stepNumber + 1);
                } else {
                  alert(
                    "제출이 완료되었습니다.\n승인 후에 로그인이 가능합니다."
                  );
                  dispatch(signOutUserAction()).then((res: any) => {
                    router.push("/");
                  });
                }
              } else {
                alert("제출에 실패했습니다.");
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
                  key={file.comFile}
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
                  key={file.manFile}
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
          <div
            style={{
              width: "70%",
              margin: "0 auto",
              backgroundColor: "gainsboro",
              fontSize: "0.8em",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ width: "13px", marginRight: "3px" }}
              />
              <div>아직 서류가 준비되지 않으셨나요?</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "baseline",
              }}
            >
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ width: "13px", marginRight: "3px" }}
              />
              <div>
                서류가 준비되지 않으셨더라도 회원가입 시 입력한 계정정보로
                로그인하면 이어서 진행이 가능해요.
                <br />
                서류가 제출되면 최종 가입 심사가 시작됩니다!
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
