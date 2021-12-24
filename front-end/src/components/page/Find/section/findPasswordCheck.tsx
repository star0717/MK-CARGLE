import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  RsWrapper,
  CommonButton,
  TextInput2,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
  CommonButtonWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { UseLink } from "../../../../configure/router.entity";
import { _pFindPassword } from "../../../../configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { findPWAction } from "../../../../../store/action/user.action";

/**
 * 계정찾기: 비밀번호 찾기(화면)
 * @param props
 * @returns
 */
const FindPasswordPresenter: NextPage<_pFindPassword> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 비밀번호 찾기 handler
   * @param e
   */
  const onFindPwHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!props.name) {
      alert("이름을 입력해주세요.");
    } else if (!props.hpNumber) {
      alert("휴대폰번호를 입력해주세요.");
    } else if (!props.email) {
      alert("이메일을 입력해주세요.");
    } else {
      const findPwInfo = {
        name: props.name,
        hpNumber: props.hpNumber,
        email: props.email,
      };
      dispatch(findPWAction(findPwInfo)).then(
        (req: any) => {
          if (req.payload) {
            props.setComplete(true);
          } else {
            alert("존재하지 않는 사용자입니다.");
          }
        },
        (err) => {
          alert("존재하지 않는 사용자입니다.");
        }
      );
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
          <CommonSubTitle>패스워드 찾기</CommonSubTitle>
          <form onSubmit={onFindPwHandler}>
            <TextInput2
              type="text"
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
              type="email"
              value={props.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setEmail(e.target.value);
              }}
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
              height={`60px`}
              margin={`10px 0px 10px 0px`}
              placeholder="이메일"
            />
            <TextInput2
              type="text"
              value={props.hpNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setHpNumber(e.target.value);
              }}
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
              height={`60px`}
              margin={`10px 0px 20px`}
              placeholder="휴대전화번호"
            />
            <Wrapper>
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
                    router.push(UseLink.FIND_EMAIL);
                  }}
                >
                  이메일 찾기
                </CommonButton>
              </CommonButtonWrapper>
            </Wrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default FindPasswordPresenter;
