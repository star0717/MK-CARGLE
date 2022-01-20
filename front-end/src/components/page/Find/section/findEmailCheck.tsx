import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonButton,
  TextInput2,
  CommonButtonWrapper,
  Text,
  RsWrapper,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { UseLink } from "../../../../configure/router.entity";
import { _pFindEmail } from "../../../../configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { _aPostAuthHelpEmail } from "../../../../../store/action/user.action";

/**
 * 계정찾기: 이메일 찾기(화면)
 * @param props
 * @returns
 */
const FindEmailCheck: NextPage<_pFindEmail> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 이메일 찾기 handler
   * @param e
   */
  const onfindEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!props.name) {
      alert("이름을 입력해주세요.");
    } else if (!props.hpNumber) {
      alert("휴대폰번호를 입력해주세요.");
    } else {
      const findEmailInfo = {
        name: props.name,
        hpNumber: props.hpNumber,
      };
      dispatch(_aPostAuthHelpEmail(findEmailInfo)).then((res: any) => {
        if (res.payload) {
          props.setFindEmail(res.payload);
          props.setComplete(true);
        } else {
          alert("존재하지 않는 사용자입니다.");
        }
      });
    }
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper kindOf={`short`}>
        <CommonTitleWrapper>
          <CommonTitle textAlign={`center`} margin={`0px`}>
            계정찾기
          </CommonTitle>
          <CommonSubTitle>
            이메일 찾기를 위하여 계정 정보를 입력해주세요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper
          width={`auto`}
          padding={`50px`}
          border={`1px solid #ccc`}
          radius={`5px`}
        >
          <form id="findEmailForm" onSubmit={onfindEmailHandler}>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>이름</Text>
              <TextInput2
                value={props.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setName(e.target.value);
                }}
                width={`400px`}
                margin={`0px 0px 10px 0px`}
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>휴대전화번호</Text>
              <TextInput2
                value={props.hpNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setHpNumber(e.target.value);
                }}
                width={`400px`}
              />
            </Wrapper>
          </form>
        </Wrapper>
        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton
            type="submit"
            kindOf={`white`}
            margin={`0px 0px 20px`}
            form="findEmailForm"
          >
            다음
          </CommonButton>
          <CommonButton
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              router.push(UseLink.FIND_PASSWORD);
            }}
          >
            비밀번호 찾기
          </CommonButton>
        </CommonButtonWrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default FindEmailCheck;
