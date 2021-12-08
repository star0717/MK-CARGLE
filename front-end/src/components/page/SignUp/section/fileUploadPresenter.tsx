import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  QuestionIcon,
  SmallButton,
  CommonButton,
} from "../../../styles/CommonComponents";
import React from "react";
import {
  BsExclamationCircleFill,
  BsFillLightbulbFill,
  BsFillQuestionCircleFill
} from 'react-icons/bs';
import {
  IoIosCloseCircle
} from 'react-icons/io'

const FileUploadPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const fileName = props.fileName;
  const file = props.file;
  const onFileUploadHandler = props.onFileUploadHandler;
  const onFileSelectHandler = props.onFileSelectHandler;
  const onSignOutHandler = props.onSignOutHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={onFileUploadHandler}>
        <Wrapper dr={`row`} ju={`space-between`}>
          <Wrapper
            ju={`flex-start`}
            al={`flex-start`}
            width={`auto`}
          >
            <Text>사업자등록증</Text>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <TextInput2
                width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `480px`}
                type="text"
                placeholder="jpg, png, pdf 형식"
                value={fileName.comFile}
                required
                readOnly
              />
              <SmallButton
                kindOf={`default`}
                margin={`0px 0px 0px 20px`}
              >
                <label htmlFor="comFile">파일선택</label>
              </SmallButton>
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
          <Wrapper
            ju={`flex-start`}
            al={`flex-start`}
            width={`auto`}
          >
            <Text>정비업등록증</Text>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <TextInput2
                width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `480px`}
                type="text"
                placeholder="jpg, png, pdf 형식"
                value={fileName.manFile}
                required
                readOnly
              />
              <SmallButton
                kindOf={`default`}
                margin={`0px 0px 0px 20px`}
              >
                <label htmlFor="manFile">파일선택</label>
                <TextInput2
                  style={{ display: "none" }}
                  type="file"
                  id="manFile"
                  name="manFile"
                  key={file.manFile}
                  onChange={onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                />
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-around`} padding={`50px 0px 50px 0px`}>
          <CommonButton type="button" onClick={onSignOutHandler}>
            다음에하기
          </CommonButton>
          <CommonButton type="submit">제출하기</CommonButton>
        </Wrapper>
        <Wrapper>
          <Wrapper
            border={`1px solid #c4c4c4`}
            radius={`5px`}
            al={`flex-start`}
            width={width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`}
            shadow={`0px 10px 15px rgba(220,220,220,1)`}
          >
            <Wrapper
              al={`flex-end`}
              padding={`10px 15px 10px 0px`}
            >
              <Text
                fontSize={`28px`}
                cursor={`pointer`}
              >
                <IoIosCloseCircle />
              </Text>
            </Wrapper>
            <Wrapper
              padding={`0px 30px 30px`}
            >
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`0px 0px 10px`}
              >
                <Text
                  padding={`3px 15px 0px 0px`}
                >
                  <BsFillQuestionCircleFill />
                </Text>
                <Text>아직 서류가 준비되지 않으셨나요?</Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
              >
                <Text
                  padding={`3px 15px 0px 0px`}
                >
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
          <QuestionIcon>
            <BsFillQuestionCircleFill />
          </QuestionIcon>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default FileUploadPresenter;
