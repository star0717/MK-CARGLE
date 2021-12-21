import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { formRegEx } from "../../../../validation/regEx";
import { _pChangePwModalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 비밀번호 변경 컴포넌트(화면)
 * @param props
 * @returns
 */
const ChangePwModalPresenter: NextPage<_pChangePwModalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={props.handleSubmit(props.onChangePwHandler)}>
          <Wrapper>
            <Text fontSize={`18px`} fontWeight={`800`} padding={`0px 0px 20px`}>
              비밀번호 변경
            </Text>
          </Wrapper>
          <Wrapper>
            <Text margin={`10px 0px 5px`}>현재 비밀번호</Text>
            <TextInput2
              width={`500px`}
              height={`60px`}
              type="password"
              value={props.password}
              placeholder="현재 비밀번호를 입력하세요."
              {...props.register("password", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setPassword(e.target.value);
                },
              })}
            />
          </Wrapper>
          <Wrapper>
            <Text margin={`10px 0px 5px`}>새로운 비밀번호</Text>
            <TextInput2
              width={`500px`}
              height={`60px`}
              type="password"
              value={props.newPassword}
              placeholder="새로운 비밀번호를 입력하세요."
              {...props.register("newPassword", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setNewPassword(e.target.value);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.PASSWORD,
                  message: "8~16자 영문, 숫자, 특수문자를 사용하세요.",
                },
                validate: (value: string) => value !== props.watch("password"),
              })}
            />
            {(props.errors.newPassword?.type === "required" ||
              props.errors.newPassword?.type === "pattern") && (
              <Text
                margin={`0px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {props.errors.newPassword.message}
              </Text>
            )}
            {props.errors.newPassword?.type === "validate" && (
              <Text
                margin={`0px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                현재 비밀번호와 다르게 설정하세요.
              </Text>
            )}
          </Wrapper>
          <Wrapper dr={`column`}>
            <Text margin={`10px 0px 5px`}>새로운 비밀번호 확인</Text>
            <TextInput2
              width={`500px`}
              height={`60px`}
              type="password"
              value={props.newPasswordCheck}
              placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              {...props.register("newPasswordCheck", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setNewPasswordCheck(e.target.value);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                validate: (value: string) =>
                  value === props.watch("newPassword"),
              })}
            />
            {props.errors.newPasswordCheck?.type === "required" && (
              <Text
                margin={`0px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                8~16자 영문, 숫자, 특수문자를 사용하세요.
              </Text>
            )}
            {props.errors.newPasswordCheck?.type === "validate" && (
              <Text
                margin={`0px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
            {props.watch("newPasswordCheck", "") !== "" &&
              props.errors.newPasswordCheck?.type !== "validate" && (
                <Text
                  margin={`0px 0px`}
                  width={`100%`}
                  color={`#51b351`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  비밀번호가 일치합니다.
                </Text>
              )}
          </Wrapper>
          <Wrapper padding={` 30px 0px 0px`} dr={`row`}>
            <SmallButton
              width={`240px`}
              fontSize={`16px`}
              height={`40px`}
              type="button"
              kindOf={`cancle`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                props.setModalOpen(false)
              }
              margin={`0px 10px 0px 0px`}
            >
              취소
            </SmallButton>
            <SmallButton
              width={`240px`}
              fontSize={`16px`}
              height={`40px`}
              type="submit"
              kindOf={`default`}
              margin={`0px 0px 0px 10px`}
            >
              확인
            </SmallButton>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ChangePwModalPresenter;
