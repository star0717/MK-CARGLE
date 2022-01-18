import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  changePwAction,
  _aPostAuthMyinfoConfirmPassword,
  _aGetAuthSignout,
} from "../../../../../store/action/user.action";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "../../../../configure/router.entity";
import { _fChangePw } from "../../../../configure/_fProps.entity";
import { ConfirmPWD } from "../../../../models/auth.entity";
import { formRegEx } from "../../../../validation/regEx";
import { _pMyPageAccountProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 비밀번호 변경 컴포넌트(기능)
 * @param props
 * @returns
 */
const ChangePwModal: NextPage<_pMyPageAccountProps> = (props) => {
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
    dispatch(_aGetAuthSignout()).then((res: any) => {
      router.push(UseLink.INDEX);
    });
  };

  /**
   * 비밀번호 변경 handler
   * @param data
   */
  const onChangePwHandler: SubmitHandler<Partial<_fChangePw>> = (data) => {
    const confirmPWD: ConfirmPWD = {
      _id: props.accountInfo.user._uID,
      PWD: password,
    };
    dispatch(_aPostAuthMyinfoConfirmPassword(confirmPWD)).then((res: any) => {
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

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={handleSubmit(onChangePwHandler)}>
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
            <Text margin={`10px 0px 5px`}>새로운 비밀번호</Text>
            <TextInput2
              width={`500px`}
              height={`60px`}
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
                validate: (value: string) => value !== watch("newpassword"),
              })}
            />
            {(errors.newPassword?.type === "required" ||
              errors.newPassword?.type === "pattern") && (
              <Text
                margin={`0px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.newPassword.message}
              </Text>
            )}
            {errors.newPassword?.type === "validate" && (
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
            {errors.newPasswordCheck?.type === "validate" && (
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
            {watch("newPasswordCheck", "") !== "" &&
              errors.newPasswordCheck?.type !== "validate" && (
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

export default ChangePwModal;
