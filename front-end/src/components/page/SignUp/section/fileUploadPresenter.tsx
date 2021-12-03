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
  TextInput,
} from "../../../styles/CommonComponents";
import React from "react";

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
        <Wrapper>
          <Wrapper>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              style={{ width: "13px", marginRight: "3px" }}
            />
            <Text>아직 서류가 준비되지 않으셨나요?</Text>
          </Wrapper>
          <Wrapper>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ width: "13px", marginRight: "3px" }}
            />
            <Text>
              서류가 준비되지 않으셨더라도 회원가입 시 입력한 계정정보로
              로그인하면 이어서 진행이 가능해요.
              <br />
              서류가 제출되면 최종 가입 심사가 시작됩니다!
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Wrapper>
            <Text>사업자등록증</Text>
            <TextInput
              type="text"
              placeholder="jpg, png, pdf 형식"
              value={fileName.comFile}
              required
              readOnly
            />
            <label htmlFor="comFile">파일선택</label>
            <TextInput
              style={{ display: "none" }}
              type="file"
              id="comFile"
              name="comFile"
              key={file.comFile}
              onChange={onFileSelectHandler}
              accept=".jpg, .png, .pdf"
            />
          </Wrapper>
          <Wrapper>
            <Text>정비업등록증</Text>
            <TextInput
              type="text"
              placeholder="jpg, png, pdf 형식"
              value={fileName.manFile}
              required
              readOnly
            />
            <label htmlFor="manFile">파일선택</label>
            <TextInput
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
        <Wrapper>
          <button type="button" onClick={onSignOutHandler}>
            다음에하기
          </button>
          <button type="submit">제출하기</button>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default FileUploadPresenter;
