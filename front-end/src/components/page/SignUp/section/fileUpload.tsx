import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  _aPatchAuthRequestCompany,
  _aPostAuthUploadComRegDoc,
  _aPostAuthUploadManRegDoc,
  _aGetAuthSignout,
  _aGetAuthCompanyId,
} from "../../../../../store/action/user.action";
import {
  actionTypesUser,
  UserCompanyFind,
} from "../../../../../store/interfaces";
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
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  JoinStepBar,
  JoinStepBarWrapper,
  CommonButtonWrapper,
  CloseButton,
} from "../../../styles/CommonComponents";
import {
  BsDownload,
  BsFillLightbulbFill,
  BsFillQuestionCircleFill,
  BsUpload,
} from "react-icons/bs";
import { parseJwt, s3FileUploadV2 } from "../../../../modules/commonModule";
import { AuthTokenInfo } from "../../../../models/auth.entity";
import { FileDataInit, FileNameInit } from "../../../../configure/etc.entity";
import { _pFileUploadProps } from "../../../../configure/_pProps.entity";
import {
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { useDropzone } from "react-dropzone";
import theme from "styles/theme";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { Company } from "src/models/company.entity";
import { S3 } from "aws-sdk";

/**
 * 파일 데이터 초기화
 */
const fileDataInit: FileDataInit = {
  comFile: null,
  manFile: null,
};
const fileNameInit: FileNameInit = {
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
  const [file, setFile] = useState<FileDataInit>(fileDataInit); // 업로드할 파일 state
  const [fileName, setFileName] = useState<FileNameInit>(fileNameInit); // 업로드할 파일명 state

  /**
   * 파일 선택 시 파일명 state 변경
   * @param e
   */
  const onFileSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileData = e.target.files[0];
    setFile({ ...file, [e.target.name]: fileData });
    setFileName({ ...fileName, [e.target.name]: fileData.name });
  };

  const ComDropZone: any = () => {
    const onDrop = useCallback((acceptedFiles) => {
      if (
        acceptedFiles[0].type.includes("jpg") ||
        acceptedFiles[0].type.includes("png") ||
        acceptedFiles[0].type.includes("jpeg") ||
        acceptedFiles[0].type.includes("pdf")
      ) {
        // Do something with the files
        setFile({ ...file, comFile: acceptedFiles[0] });
        setFileName({ ...fileName, comFile: acceptedFiles[0].name });
      } else {
        return alert("형식에 알맞지 않습니다.");
      }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <Wrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {!file.comFile ? (
          <>
            {isDragActive ? (
              <Wrapper
                width={`480px`}
                height={`380px`}
                border={`1px solid #c4c4c4`}
                radius={`5px`}
                shadow={theme.boxShadow}
              >
                <Text fontSize={`40px`} color={`#ccc`}>
                  <BsDownload />
                </Text>
                <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
                  업로드할 파일을 드래그하거나 클릭하여 선택하세요.
                </Text>
                <Text color={`#314FA5`} fontSize={`24px`} fontWeight={`700`}>
                  사업자등록증
                </Text>
                <Text margin={`100px 0px 0px`} color={`#c4c4c4`}>
                  jpg, jpeg, pdf, png 확장자의 파일만 업로드 가능합니다.
                </Text>
              </Wrapper>
            ) : (
              <Wrapper
                width={`480px`}
                height={`380px`}
                border={`1px solid #c4c4c4`}
                radius={`5px`}
                bgColor={`#f5f5f5`}
              >
                <Text fontSize={`40px`} color={`#ccc`}>
                  <BsDownload />
                </Text>
                <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
                  업로드할 파일을 드래그하거나 클릭하여 선택하세요.
                </Text>
                <Text fontSize={`24px`} fontWeight={`700`}>
                  사업자등록증
                </Text>
                <Text margin={`100px 0px 0px`} color={`#c4c4c4`}>
                  jpg, jpeg, pdf, png 확장자의 파일만 업로드 가능합니다.
                </Text>
              </Wrapper>
            )}
          </>
        ) : (
          <Wrapper
            width={`480px`}
            height={`380px`}
            border={`1px solid #c4c4c4`}
            radius={`5px`}
          >
            <Text fontSize={`40px`} color={`#314FA5`}>
              <GoCheck />
            </Text>

            <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
              &nbsp;
            </Text>

            <Text color={`#314FA5`} fontSize={`24px`} fontWeight={`700`}>
              사업자등록증
            </Text>
            <Wrapper dr={`row`}>
              <Text
                margin={`100px 0px 0px`}
                color={`#c4c4c4`}
                overflow={`hidden`}
                textOverflow={`ellipsis`}
                whiteSpace={`nowrap`}
                width={`auto`}
                maxWidth={`300px`}
              >
                {fileName.comFile}
              </Text>
              {/* <Text
                margin={`105px 0px 0px 8px`}
                color={`#c4c4c4`}
                cursor={`pointer`}
                onClick={(e: React.MouseEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setFile({ ...file, comFile: "" });
                  setFileName({ ...fileName, comFile: "" });
                }}
              >
                <FaTrashAlt />
              </Text> */}
              <CloseButton
                type="button"
                onClick={(e: React.MouseEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setFile({ ...file, comFile: null });
                  setFileName({ ...fileName, comFile: "" });
                }}
                color={`#343a40`}
                bgColor={`#fff`}
                fontSize={`20px`}
                margin={`105px 0px 5px 0px`}
              >
                <IoIosCloseCircle />
              </CloseButton>
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>
    );
  };

  const ManDropZone: any = () => {
    const onDrop = useCallback((acceptedFiles) => {
      if (
        acceptedFiles[0].type.includes("jpg") ||
        acceptedFiles[0].type.includes("png") ||
        acceptedFiles[0].type.includes("jpeg") ||
        acceptedFiles[0].type.includes("pdf")
      ) {
        // Do something with the files
        setFile({ ...file, manFile: acceptedFiles[0] });
        setFileName({ ...fileName, manFile: acceptedFiles[0].name });
      } else {
        return alert("형식에 알맞지 않습니다.");
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <Wrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {!file.manFile ? (
          <>
            {isDragActive ? (
              <Wrapper
                width={`480px`}
                height={`380px`}
                border={`1px solid #c4c4c4`}
                radius={`5px`}
                shadow={theme.boxShadow}
              >
                <Text fontSize={`40px`} color={`#ccc`}>
                  <BsDownload />
                </Text>
                <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
                  업로드할 파일을 드래그하거나 클릭하여 선택하세요.
                </Text>
                <Text color={`#314FA5`} fontSize={`24px`} fontWeight={`700`}>
                  정비업등록증
                </Text>
                <Text margin={`100px 0px 0px`} color={`#c4c4c4`}>
                  jpg, jpeg, pdf, png 확장자의 파일만 업로드 가능합니다.
                </Text>
              </Wrapper>
            ) : (
              <Wrapper
                width={`480px`}
                height={`380px`}
                border={`1px solid #c4c4c4`}
                radius={`5px`}
                bgColor={`#f5f5f5`}
              >
                <Text fontSize={`40px`} color={`#ccc`}>
                  <BsDownload />
                </Text>
                <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
                  업로드할 파일을 드래그하거나 클릭하여 선택하세요.
                </Text>
                <Text fontSize={`24px`} fontWeight={`700`}>
                  정비업등록증
                </Text>
                <Text margin={`100px 0px 0px`} color={`#c4c4c4`}>
                  jpg, jpeg, pdf, png 확장자의 파일만 업로드 가능합니다.
                </Text>
              </Wrapper>
            )}
          </>
        ) : (
          <Wrapper
            width={`480px`}
            height={`380px`}
            border={`1px solid #c4c4c4`}
            radius={`5px`}
          >
            <Text fontSize={`40px`} color={`#314FA5`}>
              <GoCheck />
            </Text>

            <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
              &nbsp;
            </Text>

            <Text color={`#314FA5`} fontSize={`24px`} fontWeight={`700`}>
              정비업등록증
            </Text>
            <Wrapper dr={`row`}>
              <Text
                margin={`100px 0px 0px`}
                color={`#c4c4c4`}
                overflow={`hidden`}
                textOverflow={`ellipsis`}
                whiteSpace={`nowrap`}
                width={`auto`}
                maxWidth={`300px`}
              >
                {fileName.manFile}
              </Text>
              <CloseButton
                type="button"
                onClick={(e: React.MouseEvent<MouseEvent>) => {
                  e.stopPropagation();
                  setFile({ ...file, manFile: null });
                  setFileName({ ...fileName, manFile: "" });
                }}
                color={`#343a40`}
                bgColor={`#fff`}
                fontSize={`20px`}
                margin={`105px 0px 5px 0px`}
              >
                <IoIosCloseCircle />
              </CloseButton>
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>
    );
  };

  /**
   * 다음에 하기(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert("입력하신 계정정보로 로그인하시면 서류제출이 가능합니다.");
    dispatch(_aGetAuthSignout()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push(UseLink.INDEX);
    });
  };

  /**
   * 파일 업로드 handler
   * @param e
   */
  const onFileUploadHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file.comFile) return alert("사업자 등록증을 선택하세요.");
    if (!file.manFile) return alert("정비업 등록증을 선택하세요.");
    const tokenInfo: AuthTokenInfo = parseJwt(
      Cookies.get(process.env.NEXT_PUBLIC_TK_NAME),
      process.env.NEXT_PUBLIC_TK_KEY
    ) as AuthTokenInfo;
    await dispatch(_aGetAuthCompanyId(tokenInfo.cID)).then(
      async (res: UserCompanyFind) => {
        if (!res.payload) return alert("업체 조회 에러");
        const company: Company = await res.payload;
        const comResult: void | S3.Types.PutObjectOutput = await s3FileUploadV2(
          file.comFile,
          company.comRegNum,
          "crn"
        );
        const manResult: void | S3.Types.PutObjectOutput = await s3FileUploadV2(
          file.manFile,
          company.comRegNum,
          "mrn"
        );

        if (!comResult || !manResult) return alert("파일 업로드 에러");

        if (props.stepNumber) {
          props.setStepNumber(props.stepNumber + 1);
        } else {
          alert("제출이 완료되었습니다.\n승인 후에 로그인이 가능합니다.");
          dispatch(_aGetAuthSignout()).then((res: any) => {
            dispatch({ type: actionTypesUser.USER_INIT });
            router.push(UseLink.INDEX);
          });
        }
      },
      (err) => {
        return alert("업체 조회 에러");
      }
    );

    window.scrollTo(0, 0);
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>
              가입 승인을 위해 서류를 제출해주세요
            </CommonSubTitle>
          </CommonTitleWrapper>
          {router.query.page && router.query.page[0] !== "main" && (
            <JoinStepBarWrapper>
              <Wrapper width={`auto`}>
                <JoinStepBar
                  kindOf={props.stepNumber === 2 ? `progress` : `complete`}
                >
                  {props.stepNumber === 2 ? <AiOutlineFileText /> : <GoCheck />}
                </JoinStepBar>
                <Text height={`0px`} padding={`10px 0px 0px`}>
                  약관동의
                </Text>
              </Wrapper>
              <JoinStepBar
                kindOf={props.stepNumber > 2 ? `line` : `line2`}
              ></JoinStepBar>
              <Wrapper width={`auto`}>
                <JoinStepBar
                  kindOf={
                    props.stepNumber < 3
                      ? `before`
                      : props.stepNumber === 3
                      ? `progress`
                      : `complete`
                  }
                >
                  {props.stepNumber > 3 ? <GoCheck /> : <AiOutlineUser />}
                </JoinStepBar>
                <Text height={`0px`} padding={`10px 0px 0px`}>
                  계정정보
                </Text>
              </Wrapper>
              <JoinStepBar
                kindOf={props.stepNumber > 3 ? `line` : `line2`}
              ></JoinStepBar>
              <Wrapper width={`auto`}>
                <JoinStepBar
                  kindOf={
                    props.stepNumber < 4
                      ? `before`
                      : props.stepNumber === 4
                      ? `progress`
                      : `complete`
                  }
                >
                  {props.stepNumber > 4 ? (
                    <GoCheck />
                  ) : (
                    <MdOutlineBusinessCenter />
                  )}
                </JoinStepBar>
                <Text height={`0px`} padding={`10px 0px 0px`}>
                  사업자정보
                </Text>
              </Wrapper>
              <JoinStepBar
                kindOf={props.stepNumber > 4 ? `line` : `line2`}
              ></JoinStepBar>
              <Wrapper width={`auto`}>
                <JoinStepBar
                  kindOf={props.stepNumber === 5 ? `progress` : `before`}
                >
                  <MdOutlineUploadFile />
                </JoinStepBar>
                <Text height={`0px`} padding={`10px 0px 0px`}>
                  서류제출
                </Text>
              </Wrapper>
            </JoinStepBarWrapper>
          )}
          <form onSubmit={onFileUploadHandler}>
            {/* <Wrapper
              width={`auto`}
              padding={`50px`}
              border={`1px solid #ccc`}
              radius={`5px`}
            > */}
            {/* <Wrapper
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
              </Wrapper> */}
            {/* <Wrapper ju={`flex-start`} al={`flex-start`} width={`auto`}>
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
            </Wrapper> */}
            <Wrapper dr={`row`} radius={`5px`}>
              <ComDropZone />
              <ManDropZone />
            </Wrapper>
            <CommonButtonWrapper padding={`50px 0px 50px 0px`} dr={`row`}>
              <CommonButton
                type="button"
                kindOf={`white`}
                onClick={onSignOutHandler}
              >
                다음에하기
              </CommonButton>
              <CommonButton type="submit">제출하기</CommonButton>
            </CommonButtonWrapper>
            <Wrapper padding={`0px 0px 0px`}>
              <Wrapper borderTop={`1px solid #c4c4c4`} al={`flex-start`}>
                <Wrapper
                  al={`flex-end`}
                  padding={`30px 15px 10px 0px`}
                ></Wrapper>
                <Wrapper padding={`0px 10px 30px`}>
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
    </BodyWrapper>
  );
};

export default FileUpload;
