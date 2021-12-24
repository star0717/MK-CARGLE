import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonButton,
  TextInput2,
  CommonTitle,
  CommonSubTitle,
  CommonButtonWrapper,
  CommonTitleWrapper,
  RsWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { UseLink } from "../../../../configure/router.entity";
import { _pFindEmail } from "../../../../configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { findEmailAction } from "../../../../../store/action/user.action";

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
      dispatch(findEmailAction(findEmailInfo)).then((res: any) => {
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
      <CommonTitleWrapper>
        <CommonTitle textAlign={`center`} margin={`0px`}>
          계정찾기
        </CommonTitle>
      </CommonTitleWrapper>
      <RsWrapper>
        <Wrapper
          width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
        >
          <CommonSubTitle>이메일 찾기</CommonSubTitle>
          <form onSubmit={onfindEmailHandler}>
            <TextInput2
              value={props.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setName(e.target.value);
              }}
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
              height={`60px`}
              margin={`0px 0px 10px 0px`}
              placeholder="이름"
            />
            <TextInput2
              value={props.hpNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setHpNumber(e.target.value);
              }}
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
              height={`60px`}
              margin={`10px 0px 20px`}
              placeholder="휴대전화번호"
            />
            <CommonButtonWrapper>
              <CommonButton
                type="submit"
                kindOf={`white`}
                margin={`0px 0px 20px`}
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
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default FindEmailCheck;
