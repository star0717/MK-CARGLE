import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  Combo,
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import ManComApprovalModal from "./approvalModal";
import { _pAdminManCompanies } from "../../../../configure/_pProps.entity";
import {
  makeFullAddress,
  mbTypeToString,
} from "../../../../modules/commonModule";
import { Company } from "../../../../models/company.entity";
import Image from "next/image";
import { User } from "../../../../models/user.entity";
import { mbTypeOption } from "../../../../configure/list.entity";
import { formRegEx } from "../../../../validation/regEx";
import { SignUpInfo } from "../../../../models/auth.entity";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { nameState } from ".";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";

const ManCompanyInfo: NextPage<_pAdminManCompanies> = (props) => {
  const router = useRouter();
  console.log("조회");
  if (props.data == null) {
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: "/",
    //   },
    // };
    router.push("/new/url");
  }

  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [comData, setComData] = useState<Company>(props.data.company); // 클릭한 업체 정보
  const [userData, setUserData] = useState<User>(props.data.user); // 클릭한 유저 정보
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달 창 여부
  // const [busType, setBusType] = useState<string>(props.clickDoc.busType); // 업태
  // const [busItem, setBusItem] = useState<string>(props.clickDoc.busItem); // 업종
  const name = useAtomValue(nameState);
  const setName = useUpdateAtom(nameState);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 업체 input 변경 handler
   * @param e
   */
  const onComChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComData({ ...comData, [e.target.name]: e.target.value });
  };

  /**
   * 사용자 input 변경 handler
   * @param e
   */
  const onUserChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onChangeComHandler: SubmitHandler<SignUpInfo> = (data) => {
    const changeData: SignUpInfo = {
      company: comData,
      user: userData,
    };
    console.log("체인지", changeData);
  };

  // 모달 창 닫기
  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        {/* Jotai 테스트 */}
        atomValue: {name}
        <SmallButton onClick={() => setName("info")}>이름변경</SmallButton>
        <Wrapper>
          <SmallButton
            type="button"
            kindOf={`default`}
            margin={`0px 0px 0px 20px`}
            onClick={() => {
              console.log("티모");
              setModalOpen(true);
            }}
          >
            승인처리
          </SmallButton>
          <SmallButton form="comForm" type="submit" kindOf={`default`}>
            정보 수정
          </SmallButton>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper>
            <Image src="/images/404.png" width={300} height={500} />
          </Wrapper>
          <Wrapper>
            <form id="comForm" onSubmit={handleSubmit(onChangeComHandler)}>
              <Wrapper>
                <Text>계정정보</Text>
                <Wrapper dr={`row`}>
                  <Text>아이디</Text>
                  <TextInput2 value={userData.email} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>이름</Text>
                  <TextInput2 value={userData.name} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>전화번호</Text>
                  <TextInput2
                    type="text"
                    value={userData.hpNumber}
                    placeholder="(- 제외)"
                    {...register("hpNumber", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onUserChangeHandler(e);
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
                  />
                  {(errors.hpNumber?.type === "required" ||
                    errors.hpNumber?.type === "pattern") && (
                    <Text
                      margin={`0px 0px 10px`}
                      width={`100%`}
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
              <Wrapper>
                <Text>사업자정보</Text>
                <Wrapper dr={`row`}>
                  <Text>상호명</Text>
                  <TextInput2 value={comData.name} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>사업자등록번호</Text>
                  <TextInput2 value={comData.comRegNum} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>정비업등록번호</Text>
                  <TextInput2 value={comData.mbRegNum} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>대표자명</Text>
                  <TextInput2 value={comData.ownerName} type="text" readOnly />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>정비업종</Text>
                  <Combo
                    name="mbTypeNum"
                    value={comData.mbTypeNum}
                    onChange={onComChangeHandler}
                    required
                  >
                    {mbTypeOption.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      );
                    })}
                  </Combo>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>업태</Text>
                  <TextInput2
                    type="text"
                    value={comData.busType}
                    {...register("busType", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onComChangeHandler(e);
                      },
                    })}
                  />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>업종</Text>
                  <TextInput2
                    type="text"
                    value={comData.busItem}
                    {...register("busItem", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onComChangeHandler(e);
                      },
                    })}
                  />
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Text>업체 전화번호</Text>
                  <TextInput2
                    type="text"
                    value={comData.phoneNum}
                    placeholder="(- 제외, 지역번호 포함)"
                    {...register("phoneNum", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onComChangeHandler(e);
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
                  />
                  {(errors.phoneNum?.type === "required" ||
                    errors.phoneNum?.type === "pattern") && (
                    <Text
                      margin={`0px 0px 10px 0px`}
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
                <Wrapper dr={`row`}>
                  <Text>업체 팩스번호</Text>
                  <TextInput2
                    type="text"
                    value={comData.faxNum}
                    placeholder="(- 제외)"
                    {...register("faxNum", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onComChangeHandler(e);
                      },
                      pattern: {
                        value: formRegEx.FAX_NUM,
                        message: "형식에 맞게 입력하세요.",
                      },
                    })}
                  />
                  {errors.faxNum?.type === "pattern" && (
                    <Text
                      margin={`0px 0px 10px 0px`}
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
                <Wrapper dr={`row`}>
                  <Text>사업자 주소</Text>
                  <TextInput2
                    value={makeFullAddress(
                      comData.address1,
                      comData.address2,
                      comData.postcode
                    )}
                    type="text"
                    readOnly
                  />
                </Wrapper>
              </Wrapper>
            </form>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
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
            <ManComApprovalModal />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ManCompanyInfo;
