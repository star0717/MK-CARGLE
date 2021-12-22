import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  SmallButton,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
  RsWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { _pWithdrawalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 회원탈퇴 컴포넌트(화면)
 * @param props
 * @returns
 */
const WithdrawalPresenter: NextPage<_pWithdrawalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <CommonTitleWrapper>
        <CommonTitle>회원탈퇴</CommonTitle>
        <CommonSubTitle>
          회원탈퇴를 위해 약관 동의 후 비밀번호를 입력해주세요.
        </CommonSubTitle>
      </CommonTitleWrapper>
      <RsWrapper>
        <Wrapper>
          <form onSubmit={props.handleSubmit(props.pwCheckHandler)}>
            <Wrapper
              width={
                width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
              }
              height={`150px`}
              border={`1px solid #ccc`}
              al={`flex-start`}
              ju={`flex-start`}
              padding={`10px`}
              radius={`5px`}
              overflow={`auto`}
            >
              <Text textAlign={`flex-start`}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                modi in exercitationem explicabo, at rem officia autem non porro
                soluta dolorum officiis ipsa repellat, laudantium ea unde
                labore, temporibus quas?Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Eveniet eius totam quam pariatur ratione, in
                voluptatem dignissimos laboriosam sint aut! Repudiandae
                consectetur odit quo corrupti quidem perferendis aut dolores
                quis?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Placeat nam optio dolore recusandae fuga voluptatibus. Ea quam
                deserunt consectetur quo aut eligendi, molestiae incidunt
                molestias ullam? Repellendus ratione repellat
              </Text>
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>회원탈퇴 약관을 상세히 읽고 숙지하였으며, 동의합니다.</Text>
              <input
                type="checkbox"
                checked={props.termCheck}
                {...props.register("withdrawalTerm", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setTermCheck(e.target.checked);
                  },
                  required: { value: true, message: "약관에 동의해주세요." },
                })}
              />
              {props.errors.withdrawalTerm?.type === "required" && (
                <Text
                  margin={`0px 0px 10px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.withdrawalTerm.message}
                </Text>
              )}
            </Wrapper>
            <TextInput
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...props.register("password", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setPassword(e.target.value);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {props.errors.password?.type === "required" && (
              <Text
                margin={`0px 0px 10px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {props.errors.password.message}
              </Text>
            )}
            <Wrapper dr={`row`}>
              <SmallButton
                type="button"
                kindOf={`default`}
                onClick={() => props.setStep(2)}
              >
                돌아가기
              </SmallButton>
              <SmallButton type="submit" kindOf={`default`}>
                회원탈퇴
              </SmallButton>
            </Wrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WithdrawalPresenter;
