import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  WholeWrapper,
  Wrapper,
  CloseButton,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import ChangePwModal from "./changePwModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { setMyInfoAction } from "../../../../../store/action/user.action";
import { useDispatch } from "react-redux";
import { SignUpInfo } from "../../../../models/auth.entity";
import StampModal from "./stampModal";
import { IoIosCloseCircle } from "react-icons/io";
import AccountInfoPresenter from "./accountInfoPresenter";
import { User, UserAuthority } from "../../../../models/user.entity";
import { Company } from "../../../../models/company.entity";
import { AxiosError } from "axios";
import { DbErrorInfo } from "../../../../models/base.entity";
import { mbTypeOption } from "../../../../configure/list.entity";
import {
  _cChangePwModalProps,
  _cMyPageAccount,
  _cStampModalProps,
} from "../../../../configure/_cProps.entity";
import { _pAccountInfoProps } from "../../../../configure/_pProps.entity";

Modal.setAppElement("body");

/**
 * 마이 페이지: 계정관리 수정 컴포넌트(기능)
 * @param props
 * @returns
 */
const AccountInfo: NextPage<_cMyPageAccount> = (props) => {
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // state 관리
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 내용
  const [readOnly, setReadOnly] = useState<boolean>(true); // 계정 권한에 따른 readonly
  const [stampNum, setStampNum] = useState<number>(0); // 도장 이미지 reload를 위한 number
  const [userData, setUserData] = useState<User>(props.accountInfo.user); // 불러온 계정정보 - 유저
  const [comData, setComData] = useState<Company>(props.accountInfo.company); // 불러온 계정정보 - 회사
  const [stampImgSrc, setStampImgSrc] = useState<string>(
    "/api/settings/myinfo/stamp"
  ); // url src 설정

  // useEffect 관리
  // 계정 권한에 따라 readOnly state 변경
  useEffect(() => {
    if (props.accountInfo.user.auth === UserAuthority.WORKER) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [props.accountInfo]);

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // handler(기능) 관리

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * 계정(유저)정보 수정 handler
   * @param e
   */
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  /**
   * 계정(회사)정보 수정 handler
   * @param e
   */
  const onInputComHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComData({ ...comData, [e.target.name]: e.target.value });
  };

  /**
   * 정비업종 readOnly일 경우 해당하는 text 출력
   */
  const textMbType = mbTypeOption.find((item) => {
    return item.value === comData.mbTypeNum;
  });

  /**
   * 주소 검색 api handler
   * @param data
   */
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setUserData({ ...userData, address1: fullAddress, postcode: zonecode });
    setValue("address1", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  /**
   * 계정 정보 변경 handler
   * @param data
   */
  const onChangeInfoHandler: SubmitHandler<SignUpInfo> = (data) => {
    const changeData: SignUpInfo = {
      company: comData,
      user: userData,
    };
    dispatch(setMyInfoAction(changeData))
      .then((res: any) => {
        alert("저장되었습니다.");
        props.setAccountInfo({
          ...props.accountInfo,
          company: comData,
          user: userData,
        });
      })
      .catch((err: AxiosError<any, any>) => {
        const errInfo: DbErrorInfo = err.response.data;
        alert(JSON.stringify(errInfo));
      });
  };

  // 비밀번호 변경 modal props
  const ChangePwModalProps: _cChangePwModalProps = {
    ...props,
    setModalOpen,
    style: { height: "500px" },
  };

  // 도장 modal props
  const StampModalProps: _cStampModalProps = {
    stampNum,
    setStampNum,
    setModalOpen,
    stampImgSrc,
    setStampImgSrc,
    style: { height: "500px" },
  };

  // 화면구성에 넘길 props
  const fProps: _pAccountInfoProps = {
    ...props,
    handleSubmit,
    register,
    errors,
    onChangeInfoHandler,
    userData,
    onInputUserHandler,
    comData,
    onInputComHandler,
    readOnly,
    stampImgSrc,
    setStampImgSrc,
    modalOpen,
    setModalOpen,
    setModalOption,
    textMbType,
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <AccountInfoPresenter {...fProps} />
      </Wrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              inset: 0,
            },
          }}
        >
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle color={`#0066ff`} />
            </CloseButton>
          </Wrapper>
          {modalOption === "address" ? (
            <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            />
          ) : modalOption === "password" ? (
            <ChangePwModal {...ChangePwModalProps} />
          ) : (
            <StampModal {...StampModalProps} />
          )}
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountInfo;
