import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import ChangePwModal from "./changePwModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { setMyInfoAction } from "../../../../../store/action/user.action";
import { useDispatch } from "react-redux";
import { SignUpInfo } from "../../../../models/auth.entity";
import StampModal from "./stampModal";
import { IoIosCloseCircle } from "react-icons/io";
import { User, UserAuthority } from "../../../../models/user.entity";
import { Company } from "../../../../models/company.entity";
import { AxiosError } from "axios";
import { DbErrorInfo } from "../../../../models/base.entity";
import { mbTypeOption } from "../../../../configure/list.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  RsWrapper,
  Text,
  TextInput2,
  SmallButton,
  Combo,
  Image,
  CommonTitle,
  CommonSubTitle,
  CommonButton,
  CommonSmallTitle,
  CommonTitleWrapper,
  CloseButton,
} from "../../../styles/CommonComponents";
import { formRegEx } from "../../../../validation/regEx";
import dayjs from "dayjs";
import {
  makeFullAddress,
  mbTypeToString,
} from "../../../../modules/commonModule";
import {
  _pMyPageAccountProps,
  _pStampModalProps,
} from "../../../../configure/_pProps.entity";

Modal.setAppElement("body");

/**
 * 마이 페이지: 계정관리 수정 컴포넌트(기능)
 * @param props
 * @returns
 */
const AccountInfo: NextPage<_pMyPageAccountProps> = (props) => {
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
        switch (errInfo.key) {
          case "email":
            alert("이미 가입된 이메일입니다.");
            break;
          case "hpNumber":
            alert("이미 가입된 휴대폰 번호입니다.");
            break;
          case "mbRegNum":
            alert("이미 가입된 정비업등록번호입니다.");
            break;
          case "phoneNum":
            alert("이미 가입된 업체 전화번호입니다.");
            break;
          default:
            alert("회원정보 수정에 실패했습니다.");
            break;
        }
      });
  };

  // 비밀번호 변경 modal props
  const ChangePwModalProps: _pMyPageAccountProps = {
    ...props,
    setModalOpen,
    style: { height: "500px" },
  };

  // 도장 modal props
  const StampModalProps: _pStampModalProps = {
    stampNum,
    setStampNum,
    setModalOpen,
    stampImgSrc,
    setStampImgSrc,
    style: { height: "500px" },
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <>
      <WholeWrapper ref={ref}>
        <CommonTitleWrapper>
          <CommonTitle>계정정보</CommonTitle>
          <CommonSubTitle>
            이곳에서 계정정보를 확인 및 수정할 수 있습니다.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <RsWrapper wrap={`no-wrap`} margin={`100px 0px 0px 0px`}>
          <form id="saveform" onSubmit={handleSubmit(onChangeInfoHandler)}>
            <Wrapper
              border={`1px solid #ccc`}
              radius={`5px`}
              shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              margin={`0px 0px 50px`}
            >
              <Wrapper dr={`row`} radius={`5px`} margin={`0px 0px 5px 0px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <CommonSmallTitle
                    fontSize={`18px`}
                    fontWeight={`800`}
                    padding={`10px 0px`}
                  >
                    사용자 정보
                  </CommonSmallTitle>
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                // borderTop={`2px solid #000`}
                // borderBottom={`2px solid #000`}
                // ju={`space-between`}
                al={`center`}
                margin={`0px 0px 50px`}
              >
                {/* <Wrapper width={`270px`} bgColor={`#f5f5f5`} padding={`163px 0px`}>
              <Wrapper
                width={`80px`}
                height={`80px`}
                bgColor={`#ccc`}
                radius={`100px`}
              >
                <Text fontSize={`60px`} lineHeight={`36px`} color={`#fff`}>
                  <Person />
                </Text>
              </Wrapper>
              <Text
                padding={`20px 0px 0px`}
                fontSize={`18px`}
                fontWeight={`800`}
                letterSpacing={`4px`}
              >
                {props.userData.name}님
              </Text>
            </Wrapper> */}
                <Wrapper dr={`column`} width={`auto`} padding={`10px 0px`}>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      아이디
                    </Text>
                    <TextInput2
                      value={userData.email}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      비밀번호
                    </Text>
                    <TextInput2 type="password" readOnly width={`700px`} />
                    <SmallButton
                      type="button"
                      kindOf={`default`}
                      margin={`0px 0px 0px 20px`}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setModalOpen(!modalOpen);
                        setModalOption("password");
                      }}
                    >
                      변경하기
                    </SmallButton>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={
                        errors.name?.type === "required"
                          ? `0px 10px 20px 0px`
                          : `0px 10px 0px 0px`
                      }
                    >
                      이름
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        value={userData.name}
                        // readOnly
                        type="text"
                        {...register("name", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onInputUserHandler(e);
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                        })}
                        width={`800px`}
                      />

                      {errors.name?.type === "required" && (
                        <Text
                          margin={`0px`}
                          width={`800px`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.name.message}
                        </Text>
                      )}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      // padding={`0px 10px 0px 0px`}
                      padding={
                        errors.hpNumber?.type === "required" ||
                        errors.hpNumber?.type === "pattern"
                          ? `0px 10px 20px 0px`
                          : `0px 10px 0px 0px`
                      }
                    >
                      휴대폰 번호
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        value={userData.hpNumber}
                        type="tel"
                        {...register("hpNumber", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onInputUserHandler(e);
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                          pattern: {
                            value: formRegEx.HP_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                        width={`800px`}
                      />
                      {(errors.hpNumber?.type === "required" ||
                        errors.hpNumber?.type === "pattern") && (
                        <Text
                          margin={`0px`}
                          width={`800px`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.hpNumber.message}
                        </Text>
                      )}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      주소
                    </Text>
                    <TextInput2
                      type="text"
                      placeholder="주소를 입력해주세요."
                      value={userData.address1}
                      readOnly
                      {...register("address1")}
                      width={`700px`}
                    />
                    <SmallButton
                      type="button"
                      kindOf={`default`}
                      margin={`0px 0px 0px 20px`}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setModalOpen(!modalOpen);
                        setModalOption("address");
                      }}
                    >
                      주소 검색
                    </SmallButton>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    ></Text>
                    <TextInput2
                      type="text"
                      name="address2"
                      placeholder="상세주소를 입력해 주세요."
                      readOnly={userData.address1 ? false : true}
                      value={userData.address2}
                      {...register("address2", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputUserHandler(e);
                        },
                      })}
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      입사일자
                    </Text>
                    <TextInput2
                      type="date"
                      value={dayjs(userData.joinDate).format("YYYY-MM-DD")}
                      {...register("joinDate", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputUserHandler(e);
                        },
                      })}
                      width={`800px`}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            {/* 사업자정보  */}
            <Wrapper
              border={`1px solid #ccc`}
              radius={`5px`}
              shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              margin={`0px 0px 50px`}
            >
              <Wrapper
                dr={`row`}
                // ju={`space-between`}
                radius={`5px`}
                margin={`0px 0px 5px 0px`}
              >
                <Wrapper dr={`row`} width={`auto`}>
                  <CommonSmallTitle
                    fontSize={`18px`}
                    fontWeight={`800`}
                    padding={`10px 0px`}
                  >
                    사업자 정보
                  </CommonSmallTitle>
                </Wrapper>
                <Text
                  fontSize={`28px`}
                  lineHeight={`28px`}
                  margin={`8px 0px 0px`}
                ></Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                width={`100%`}
                padding={`0px 70px`}
                ju={`space-between`}
                al={`center`}
                margin={`0px 0px 10px`}
              >
                <Wrapper dr={`column`} width={`auto`} padding={`10px 0px`}>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      상호명
                    </Text>
                    <TextInput2
                      value={comData.name}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      사업자등록번호
                    </Text>
                    <TextInput2
                      value={comData.comRegNum}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      정비업등록번호
                    </Text>
                    <TextInput2
                      value={comData.mbRegNum}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      대표자명
                    </Text>
                    <TextInput2
                      value={comData.ownerName}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      정비업종
                    </Text>
                    {readOnly ? (
                      <TextInput2
                        value={mbTypeToString(comData)}
                        type="text"
                        readOnly={readOnly}
                        {...register("mbTypeNum")}
                        width={`800px`}
                      />
                    ) : (
                      <Combo
                        width={`800px`}
                        margin={`0px`}
                        value={comData.mbTypeNum}
                        {...register("mbTypeNum", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onInputComHandler(e);
                          },
                          required: true,
                        })}
                      >
                        {mbTypeOption.map((item) => {
                          return (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          );
                        })}
                      </Combo>
                    )}
                    {errors.mbTypeNum?.type === "required" && (
                      <Text
                        margin={`0px 0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        필수 선택사항입니다.
                      </Text>
                    )}
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      업태
                    </Text>
                    <TextInput2
                      value={comData.busType}
                      type="text"
                      readOnly={readOnly}
                      {...register("busType", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputComHandler(e);
                        },
                      })}
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      업종
                    </Text>
                    <TextInput2
                      value={comData.busItem}
                      type="text"
                      readOnly={readOnly}
                      {...register("busItem", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputComHandler(e);
                        },
                      })}
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      // padding={`0px 10px 0px 0px`}
                      padding={
                        errors.phoneNum?.type === "required" ||
                        errors.phoneNum?.type === "pattern"
                          ? `0px 10px 20px 0px`
                          : `0px 10px 0px 0px`
                      }
                    >
                      업체 전화번호
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        value={comData.phoneNum}
                        type="text"
                        placeholder="(- 제외, 지역번호 포함)"
                        readOnly={readOnly}
                        {...register("phoneNum", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onInputComHandler(e);
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                          pattern: {
                            value: formRegEx.PH_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                        width={`800px`}
                      />
                      {(errors.phoneNum?.type === "required" ||
                        errors.phoneNum?.type === "pattern") && (
                        <Text
                          margin={`0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.phoneNum.message}
                        </Text>
                      )}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      // padding={`0px 10px 0px 0px`}
                      padding={
                        errors.faxNum?.type === "pattern"
                          ? `0px 10px 20px 0px`
                          : `0px 10px 0px 0px`
                      }
                    >
                      업체 팩스번호
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        value={comData.faxNum}
                        type="text"
                        readOnly={readOnly}
                        placeholder="(- 제외)"
                        {...register("faxNum", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onInputComHandler(e);
                          },
                          pattern: {
                            value: formRegEx.FAX_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                        width={`800px`}
                      />
                      {errors.faxNum?.type === "pattern" && (
                        <Text
                          margin={`0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.faxNum.message}
                        </Text>
                      )}
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      사업자 주소
                    </Text>
                    <TextInput2
                      value={makeFullAddress(
                        comData.address1,
                        comData.address2,
                        comData.postcode
                      )}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      사업자 도장
                    </Text>
                    <Wrapper dr={`row`} width={`auto`}>
                      <Wrapper
                        width={`700px`}
                        height={`150px`}
                        border={`1px solid #ccc`}
                        radius={`5px`}
                        padding={`10px 0px`}
                      >
                        <Image
                          alt="도장 사진"
                          width={`100 px`}
                          // height={200}
                          src={stampImgSrc}
                        />
                      </Wrapper>

                      <SmallButton
                        type="button"
                        kindOf={`default`}
                        margin={`0px 0px 0px 20px`}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          setModalOpen(!modalOpen);
                          setModalOption("stamp");
                        }}
                      >
                        파일선택
                      </SmallButton>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </form>
          <Wrapper
            width={`1070px`}
            al={`flex-end`}
            margin={`0px 0px 30px`}
            dr={`row`}
            ju={`space-between`}
          >
            <CommonButton
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setStep(3);
              }}
            >
              회원탈퇴
            </CommonButton>
            <CommonButton form="saveform" type="submit">
              저장
            </CommonButton>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
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
            height: "575px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(220,220,220,1)",
            inset: 0,
          },
        }}
      >
        <Wrapper fontSize={`28px`} al={`flex-end`}>
          <CloseButton onClick={closeModal}>
            <IoIosCloseCircle />
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
    </>
  );
};

export default AccountInfo;
