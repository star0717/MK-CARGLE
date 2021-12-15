import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { formRegEx } from "../../../../validation/regEx";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  changePass,
  passwordCheck,
} from "../../../../../store/action/user.action";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";

interface modalOption {
  accountInfo: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}

const ChangePassModal: NextPage<modalOption> = (props) => {
  const dispatch = useDispatch();
  const setModalOpen = props.setModalOpen;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const accountInfo = props.accountInfo;

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  {
    /* 비밀번호 확인용 */
  }
  const confirmPWD = {
    _id: accountInfo.user._uID,
    PWD: password,
  };
  {
    /* 비밀번호 변경용 */
  }
  const HelpChangePWD = {
    _id: accountInfo.user._uID,
    oldPWD: password,
    newPWD: newPassword,
  };

  {
    /* 비밀번호 변경 함수 */
  }
  const pass: SubmitHandler<any> = (data) => {
    dispatch(passwordCheck(confirmPWD)).then((res: any) => {
      if (res.payload === true) {
        dispatch(changePass(HelpChangePWD)).then((res: any) => {
          if (res.payload === true) {
            alert("비밀번호가 변경되었습니다.");
            setModalOpen(false);
          } else {
            alert("변경 실패");
          }
        });
      } else {
        alert("현재 비밀번호가 틀립니다.");
      }
    });
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <form onSubmit={handleSubmit(pass)}>
          <Wrapper>
            <Text>비밀번호 변경</Text>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>현재 비밀번호</Text>
            <TextInput
              type="password"
              placeholder="현재 비밀번호를 입력하세요."
              {...register("password", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                },
              })}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
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
          <Wrapper dr={`row`}>
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
                <Text>비밀번호가 일치합니다.</Text>
              )}
          </Wrapper>
          <Wrapper dr={`row`}>
            <button type="submit">확인</button>
            <button type="button" onClick={(e) => setModalOpen(false)}>
              취소
            </button>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ChangePassModal;
