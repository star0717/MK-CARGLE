import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { formRegEx } from "../../../../validation/regEx";

/**
 * 마이 페이지: 계정관리 비밀번호 변경 컴포넌트(화면)
 * @param props
 * @returns
 */
const ChangePwModalPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const setModalOpen = props.setModalOpen;
  const handleSubmit = props.handleSubmit;
  const register = props.register;
  const watch = props.watch;
  const errors = props.errors;
  const onChangePwHandler = props.onChangePwHandler;
  const password = props.password;
  const setPassword = props.setPassword;
  const newPassword = props.newPassword;
  const setNewPassword = props.setNewPassword;
  const newPasswordCheck = props.newPasswordCheck;
  const setNewPasswordCheck = props.setNewPasswordCheck;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={handleSubmit(onChangePwHandler)}>
          <Wrapper>
            <Text>비밀번호 변경</Text>
          </Wrapper>
          <Wrapper>
            <Text>현재 비밀번호</Text>
            <TextInput
              type="password"
              value={password}
              placeholder="현재 비밀번호를 입력하세요."
              {...register("password", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                },
              })}
            />
          </Wrapper>
          <Wrapper>
            <Text>새로운 비밀번호</Text>
            <TextInput
              type="password"
              value={newPassword}
              placeholder="새로운 비밀번호를 입력하세요."
              {...register("newPassword", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(e.target.value);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.PASSWORD,
                  message: "8~16자 영문, 숫자, 특수문자를 사용하세요.",
                },
                validate: (value: string) => value !== watch("password"),
              })}
            />
            {(errors.newPassword?.type === "required" ||
              errors.newPassword?.type === "pattern") && (
              <Text>{errors.newPassword.message}</Text>
            )}
            {errors.newPassword?.type === "validate" && (
              <Text>현재 비밀번호와 다르게 설정하세요.</Text>
            )}
          </Wrapper>
          <Wrapper dr={`column`}>
            <Text>새로운 비밀번호 확인</Text>
            <TextInput
              type="password"
              value={newPasswordCheck}
              placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              {...register("newPasswordCheck", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPasswordCheck(e.target.value);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                validate: (value: string) => value === watch("newPassword"),
              })}
            />
            {errors.newPasswordCheck?.type === "required" && (
              <Text>8~16자 영문, 숫자, 특수문자를 사용하세요.</Text>
            )}
            {errors.newPasswordCheck?.type === "validate" && (
              <Text>비밀번호가 일치하지 않습니다.</Text>
            )}
            {watch("newPasswordCheck", "") !== "" &&
              errors.newPasswordCheck?.type !== "validate" && (
                <Text width={`200px`}>비밀번호가 일치합니다.</Text>
              )}
          </Wrapper>
          <Wrapper>
            <SmallButton type="submit" kindOf={`default`}>
              확인
            </SmallButton>
            <SmallButton
              type="button"
              kindOf={`default`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                setModalOpen(false)
              }
            >
              취소
            </SmallButton>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ChangePwModalPresenter;
