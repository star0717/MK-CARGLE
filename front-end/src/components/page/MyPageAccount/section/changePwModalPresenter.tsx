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
            <Text>비밀번호 변경</Text>
          </Wrapper>
          <Wrapper>
            <Text>현재 비밀번호</Text>
            <TextInput
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
            <Text>새로운 비밀번호</Text>
            <TextInput
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
              <Text>{props.errors.newPassword.message}</Text>
            )}
            {props.errors.newPassword?.type === "validate" && (
              <Text>현재 비밀번호와 다르게 설정하세요.</Text>
            )}
          </Wrapper>
          <Wrapper dr={`column`}>
            <Text>새로운 비밀번호 확인</Text>
            <TextInput
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
              <Text>8~16자 영문, 숫자, 특수문자를 사용하세요.</Text>
            )}
            {props.errors.newPasswordCheck?.type === "validate" && (
              <Text>비밀번호가 일치하지 않습니다.</Text>
            )}
            {props.watch("newPasswordCheck", "") !== "" &&
              props.errors.newPasswordCheck?.type !== "validate" && (
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
                props.setModalOpen(false)
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
