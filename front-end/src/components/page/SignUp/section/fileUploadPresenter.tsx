import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  CommonButton,
  LabelButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { BsFillLightbulbFill, BsFillQuestionCircleFill } from "react-icons/bs";
import { _pFileUploadProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입 - 파일 업로드 컴포넌트(화면)
 * @param props
 * @returns
 */
const FileUploadPresenter: NextPage<_pFileUploadProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={props.onFileUploadHandler}>
        <Wrapper
          width={`auto`}
          padding={`50px`}
          border={`1px solid #ccc`}
          radius={`5px`}
        >
          <Wrapper>
            <Wrapper ju={`flex-start`} al={`flex-start`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>사업자등록증</Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                <TextInput2
                  width={`300px`}
                  type="text"
                  placeholder="jpg, png, pdf 형식"
                  value={props.fileName.comFile}
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
                  key={props.file.comFile}
                  onChange={props.onFileSelectHandler}
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
                  value={props.fileName.manFile}
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
                  key={props.file.manFile}
                  onChange={props.onFileSelectHandler}
                  accept=".jpg, .png, .pdf"
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`50px 0px 50px 0px`}>
          <CommonButton
            type="button"
            margin={`0px 0px 10px 0px`}
            kindOf={`white`}
            onClick={props.onSignOutHandler}
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
    </WholeWrapper>
  );
};

export default FileUploadPresenter;
