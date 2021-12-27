import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  approvalReqAction,
  comFileUploadAction,
  manFileUploadAction,
  signOutUserAction,
} from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  CommonButton,
  LabelButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { BsFillLightbulbFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { parseJwt } from "../../../../modules/commonModule";
import { AuthTokenInfo } from "../../../../models/auth.entity";
import { FileInit } from "../../../../configure/etc.entity";
import { _pFileUploadProps } from "../../../../configure/_pProps.entity";
import { UserAuthority } from "../../../../models/user.entity";

/**
 * 파일 데이터 초기화
 */
const fileInit: FileInit = {
  comFile: "",
  manFile: "",
};

/**
 * 회원가입: 파일 업로드 컴포넌트(기능)
 * @param props
 * @returns
 */
const FileUpload: NextPage<_pFileUploadProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // state 관리
  const [file, setFile] = useState<FileInit>(fileInit); // 업로드할 파일 state
  const [fileName, setFileName] = useState<FileInit>(fileInit); // 업로드할 파일명 state

  /**
   * 파일 선택 시 파일명 state 변경
   * @param e
   */
  const onFileSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      router.push(UseLink.INDEX);
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
            const tokenInfo: AuthTokenInfo = parseJwt(Cookies.get("mk_token"));
            dispatch(approvalReqAction(tokenInfo.cID)).then((res: any) => {
              if (res.payload) {
                if (props.stepNumber) {
                  props.setStepNumber(props.stepNumber + 1);
                } else {
                  alert(
                    "제출이 완료되었습니다.\n승인 후에 로그인이 가능합니다."
                  );
                  dispatch(signOutUserAction()).then((res: any) => {
                    dispatch({ type: actionTypesUser.USER_INIT });
                    router.push(UseLink.INDEX);
                  });
                }
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

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper
        margin={
          props.userAuth === UserAuthority.OWNER
            ? `0px 0px 50px 0px`
            : `180px 0px 50px 0px`
        }
        padding={`0px`}
      >
        <form onSubmit={onFileUploadHandler}>
          <Wrapper
            width={`auto`}
            margin={`0px`}
            padding={`50px 0px`}
            border={`1px solid #ccc`}
            radius={`5px`}
          >
            <Wrapper
              ju={`flex-start`}
              al={`flex-start`}
              width={`auto`}
              margin={`0px 0px 10px`}
            >
              <Text margin={`0px 0px 10px`}>사업자등록증</Text>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`0px 0px 10px`}
                width={`auto`}
              >
                <TextInput2
                  width={`300px`}
                  type="text"
                  placeholder="jpg, png, pdf 형식"
                  value={fileName.comFile}
                  required
                  readOnly
                />
                <LabelButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  htmlFor="comFile"
                >
                  파일선택
                </LabelButton>
                <TextInput2
                  style={{ display: "none" }}
                  type="file"
                  id="comFile"
                  name="comFile"
                  key={file.comFile}
                  onChange={onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                />
              </Wrapper>
            </Wrapper>
            <Wrapper ju={`flex-start`} al={`flex-start`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>정비업등록증</Text>
              <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                <TextInput2
                  width={`300px`}
                  type="text"
                  placeholder="jpg, png, pdf 형식"
                  value={fileName.manFile}
                  required
                  readOnly
                />
                <LabelButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  htmlFor="manFile"
                >
                  파일선택
                </LabelButton>
                <TextInput2
                  style={{ display: "none" }}
                  type="file"
                  id="manFile"
                  name="manFile"
                  key={file.manFile}
                  onChange={onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper padding={`50px 0px 50px 0px`}>
            <CommonButton
              type="button"
              margin={`0px 0px 10px 0px`}
              kindOf={`white`}
              onClick={onSignOutHandler}
            >
              다음에하기
            </CommonButton>
            <CommonButton type="submit" margin={`10px 0px 0px 0px`}>
              제출하기
            </CommonButton>
          </Wrapper>
          <Wrapper padding={`0px 0px 100px`}>
            <Wrapper
              borderTop={`1px solid #c4c4c4`}
              al={`flex-start`}
              width={`auto`}
            >
              <Wrapper al={`flex-end`} padding={`30px 15px 10px 0px`}></Wrapper>
              <Wrapper padding={`0px 30px 30px`}>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                  <Text padding={`3px 15px 0px 0px`}>
                    <BsFillQuestionCircleFill />
                  </Text>
                  <Text>아직 서류가 준비되지 않으셨나요?</Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                  <Text padding={`3px 15px 0px 0px`}>
                    <BsFillLightbulbFill />
                  </Text>
                  <Text textAlign={`start`}>
                    서류가 준비되지 않으셨더라도 회원가입 시 입력한 계정정보로
                    로그인하면 이어서 진행이 가능해요.
                    <br />
                    서류가 제출되면 최종 가입 심사가 시작됩니다!
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default FileUpload;
