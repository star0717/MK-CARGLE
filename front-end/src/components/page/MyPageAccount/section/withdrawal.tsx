import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import WithdrawalModal from "./withdrawalModal";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { _aPostAuthMyinfoConfirmPassword } from "../../../../../store/action/user.action";
import { _fWithdrawal } from "../../../../configure/_fProps.entity";
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
  CheckboxContainer,
  CheckBoxIcon,
  CheckBoxLine,
  HiddenCheckbox,
  TextInput2,
  CommonButtonWrapper,
  CommonButton,
} from "../../../styles/CommonComponents";
import {
  _pMyPageAccountProps,
  _pWithdrawalModalProps,
} from "../../../../configure/_pProps.entity";
import { BsCheckLg } from "react-icons/bs";

Modal.setAppElement("body");

/**
 * 마이 페이지: 계정관리 회원탈퇴 컴포넌트(기능)
 * @param props
 * @returns
 */
const Withdrawal: NextPage<_pMyPageAccountProps> = (props) => {
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // 필요한 props 재정의
  const accountInfo = props.accountInfo;

  // state 관리
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달 창 여부
  const [password, setPassword] = useState<string>(""); // 비밀번호 input
  const [termCheck, setTermCheck] = useState<boolean>(false); // 약관 동의 여부

  /**
   * 모달 창 닫기
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 비밀번호 체크 및 회원탈퇴 모달 open handler
   * @param data
   */
  const pwCheckHandler: SubmitHandler<Partial<_fWithdrawal>> = (data) => {
    const confirmPWD = {
      _id: accountInfo.user._uID,
      PWD: password,
    };
    dispatch(_aPostAuthMyinfoConfirmPassword(confirmPWD)).then((res: any) => {
      if (res.payload === true) {
        setModalOpen(!modalOpen);
      } else {
        alert("비밀번호가 틀립니다.");
      }
    });
  };

  // 회원탈퇴 모달 props
  const WithdrawalModalProps: _pWithdrawalModalProps = {
    password,
    accountInfo,
    setModalOpen,
    style: { height: "500px" },
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <>
      <WholeWrapper ref={ref}>
        <CommonTitleWrapper>
          <CommonTitle>회원탈퇴</CommonTitle>
          <CommonSubTitle>
            회원탈퇴를 위해 약관 동의 후 비밀번호를 입력해주세요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <RsWrapper padding={`80px 0px 0px`}>
          <Wrapper al={`flex-start`} width={`500px`}>
            <form onSubmit={handleSubmit(pwCheckHandler)}>
              <Wrapper
                height={`200px`}
                width={`500px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
                shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              >
                <Text textAlign={`flex-start`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                  modi in exercitationem explicabo, at rem officia autem non
                  porro soluta dolorum officiis ipsa repellat, laudantium ea
                  unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eveniet eius totam quam pariatur
                  ratione, in voluptatem dignissimos laboriosam sint aut!
                  Repudiandae consectetur odit quo corrupti quidem perferendis
                  aut dolores quis?Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat nam optio dolore recusandae fuga
                  voluptatibus. Ea quam deserunt consectetur quo aut eligendi,
                  molestiae incidunt molestias ullam? Repellendus ratione
                  repellat
                </Text>
              </Wrapper>
              <Wrapper dr={`row-reverse`} padding={`10px 0px`}>
                <Wrapper al={`flex-end`}>
                  <CheckboxContainer>
                    <CheckBoxLine kindOf={`${termCheck}`}>
                      <HiddenCheckbox
                        margin={`0px`}
                        type="checkbox"
                        {...register("withdrawalTerm", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setTermCheck(e.target.checked);
                          },
                          required: {
                            value: true,
                            message: "약관에 동의해주세요.",
                          },
                        })}
                      />
                      <CheckBoxIcon>
                        <BsCheckLg />
                      </CheckBoxIcon>
                    </CheckBoxLine>
                    동의합니다.
                  </CheckboxContainer>
                </Wrapper>

                {/* <Text>
                  회원탈퇴 약관을 상세히 읽고 숙지하였으며, 동의합니다.
                </Text>

                <input
                  type="checkbox"
                  checked={termCheck}
                  {...register("withdrawalTerm", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setTermCheck(e.target.checked);
                    },
                    required: { value: true, message: "약관에 동의해주세요." },
                  })}
                /> */}

                {errors.withdrawalTerm?.type === "required" && (
                  <Text
                    margin={`0px 0px 10px`}
                    width={`100%`}
                    color={`#d6263b`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    {errors.withdrawalTerm.message}
                  </Text>
                )}
              </Wrapper>
              <TextInput
                width={`500px`}
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                })}
              />
              {errors.password?.type === "required" && (
                <Text
                  margin={`0px 0px 10px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.password.message}
                </Text>
              )}
              <CommonButtonWrapper kindOf={`column`}>
                <CommonButton
                  type="button"
                  kindOf={`white`}
                  onClick={() => props.setStep(2)}
                >
                  돌아가기
                </CommonButton>
                <CommonButton type="submit">회원탈퇴</CommonButton>
              </CommonButtonWrapper>
            </form>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(71, 71, 71, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            background: "white",
            width: "45rem",
            height: "575px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(61,61,61,1)",
            inset: 0,
          },
        }}
      >
        <WithdrawalModal {...WithdrawalModalProps} />
      </Modal>
    </>
  );
};

export default Withdrawal;
