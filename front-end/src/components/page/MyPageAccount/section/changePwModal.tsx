import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  changePwAction,
  pwCheckAction,
  signOutUserAction,
} from "../../../../../store/action/user.action";
import { WholeWrapper } from "../../../styles/CommonComponents";
import ChangePwModalPresenter from "./changePwModalPresenter";
import { useRouter } from "next/router";
import { UseLink } from "../../../../configure/router.entity";
import { _cChangePwModalProps } from "../../../../configure/_cProps.entity";
import { _fChangePw } from "../../../../configure/_fProps.entity";
import { _pChangePwModalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 비밀번호 변경 컴포넌트(기능)
 * @param props
 * @returns
 */
const ChangePwModal: NextPage<_cChangePwModalProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // state 관리
  const [password, setPassword] = useState<string>(""); // 현재 비밀번호
  const [newPassword, setNewPassword] = useState<string>(""); // 새로운 비밀번호
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>(""); // 새로운 비밀번호 확인

  /**
   * 로그아웃 기능
   * @param e
   */
  const onSignOutHandler = () => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push(UseLink.INDEX);
    });
  };

  /**
   * 비밀번호 변경 handler
   * @param data
   */
  const onChangePwHandler: SubmitHandler<_fChangePw> = (data) => {
    const confirmPWD = {
      _id: props.accountInfo.user._uID,
      PWD: password,
    };
    dispatch(pwCheckAction(confirmPWD)).then((res: any) => {
      if (res.payload === true) {
        const HelpChangePWD = {
          _id: props.accountInfo.user._uID,
          oldPWD: password,
          newPWD: newPassword,
        };
        dispatch(changePwAction(HelpChangePWD)).then((res: any) => {
          if (res.payload === true) {
            alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
            onSignOutHandler();
          } else {
            alert("변경 실패");
          }
        });
      } else {
        alert("현재 비밀번호가 틀립니다.");
        setPassword("");
        setNewPassword("");
        setNewPasswordCheck("");
      }
    });
  };

  // 화면구성에 넘길 props
  const fProps: _pChangePwModalProps = {
    ...props,
    handleSubmit,
    register,
    watch,
    errors,
    onChangePwHandler,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    newPasswordCheck,
    setNewPasswordCheck,
  };

  return (
    <WholeWrapper>
      <ChangePwModalPresenter {...fProps} />
    </WholeWrapper>
  );
};

export default ChangePwModal;
