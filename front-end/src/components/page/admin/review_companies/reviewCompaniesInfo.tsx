import Modal from "react-modal";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosCloseCircle } from "react-icons/io";
import {
  _pAdminReviewCompanies,
  _pComPageModalProps,
} from "../../../../configure/_pProps.entity";
import { Company } from "../../../../models/company.entity";
import AdminReviewCompaniesModal from "./review_Company_Modal";
import {
  CloseButton,
  RsWrapper,
  Text,
  SmallButton,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Combo,
  CommonTitleWrapper,
  CommonTitle,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
  CommonSubTitle,
} from "../../../styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";
import { makeFullAddress } from "../../../../modules/commonModule";
import { mbTypeOption } from "../../../../configure/list.entity";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../../../models/user.entity";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { _aPatchAdminSignUpInfo } from "../../../../../store/action/user.action";
import { SignUpInfo } from "../../../../models/auth.entity";

const AdminReviewCompaniesinfo: NextPage<_pAdminReviewCompanies> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [comData, setComData] = useState<Company>(props.data.company); // 클릭한 업체 정보
  const [userData, setUserData] = useState<User>(props.data.user); // 클릭한 유저 정보
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  const {
    register,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  //업태 업종 정비업종 수정시 필요한 핸들러
  const onInputComHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComData({ ...comData, [e.target.name]: e.target.value });
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

    dispatch(_aPatchAdminSignUpInfo(comData._id, changeData)).then(
      (res: any) => {
        alert("저장되었습니다.");
      }
    );
  };

  const ARCModalProps: _pComPageModalProps = {
    ...props,
    setModalOpen,
    style: { height: "500px" },
  };

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper wrap={`no-wrap`}>
        <CommonTitleWrapper>
          <CommonTitle>승인관리</CommonTitle>
          <CommonSubTitle></CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper width={`1070px`}>
          <Wrapper dr={`row`} ju={`space-between`} padding={`0px 0px 30px`}>
            <Wrapper width={`auto`} dr={`row`}>
              <SmallButton
                type="button"
                kindOf={`default`}
                onClick={(e: any) => {
                  onChangeInfoHandler(e);
                }}
              >
                수정
              </SmallButton>
              <SmallButton
                type="button"
                kindOf={`default`}
                margin={`0px 0px 0px 10px`}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                승인처리
              </SmallButton>
            </Wrapper>
            <Wrapper width={`auto`}>
              <SmallButton
                type="button"
                kindOf={`default`}
                margin={`0px 0px 0px 10px`}
                onClick={() => {
                  router.back();
                }}
              >
                뒤로가기
              </SmallButton>
            </Wrapper>
          </Wrapper>

          {/* ----------------------------------------사용자-------------------------------------- */}
          <Wrapper
            border={`1px solid #7985c3`}
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
                  계정 정보
                </CommonSmallTitle>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} al={`center`} margin={`0px 0px 50px`}>
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
                    type="text"
                    readOnly
                    value={userData.email}
                    width={`800px`}
                  />
                </Wrapper>
                <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                  <Text
                    width={`130px`}
                    textAlign={`end`}
                    padding={`0px 10px 0px 0px`}
                  >
                    이름
                  </Text>
                  <TextInput2
                    type="text"
                    readOnly
                    value={userData.name}
                    width={`800px`}
                  />
                </Wrapper>
                <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                  <Text
                    width={`130px`}
                    textAlign={`end`}
                    padding={`0px 10px 0px 0px`}
                  >
                    전화번호
                  </Text>
                  <Wrapper width={`auto`}>
                    <TextInput2
                      type="text"
                      readOnly
                      value={userData.hpNumber}
                      width={`800px`}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {/* -------------------------------------업체정보----------------------------------------- */}
          <Wrapper
            border={`1px solid #7985c3`}
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
                  사업자 정보
                </CommonSmallTitle>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} al={`center`} margin={`0px 0px 50px`}>
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
                  <Wrapper width={`auto`}>
                    <TextInput2
                      value={comData.mbRegNum}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
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
                  <Combo
                    name="mbTypeNum"
                    value={comData.mbTypeNum}
                    {...register("mbTypeNum", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        onInputComHandler(e);
                      },
                      required: true,
                    })}
                    width={`800px`}
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
                <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                  <Wrapper dr={`row`}>
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
                      {...register("busType", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputComHandler(e);
                        },
                      })}
                      width={`330px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`}>
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
                      {...register("busItem", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onInputComHandler(e);
                        },
                      })}
                      width={`330px`}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                  <Wrapper dr={`row`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      업체 전화번호
                    </Text>
                    <TextInput2
                      value={comData.phoneNum}
                      type="text"
                      readOnly
                      width={`330px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      업체 팩스번호
                    </Text>
                    <TextInput2
                      value={comData.faxNum}
                      type="text"
                      readOnly
                      width={`330px`}
                    />
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
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <CommonButtonWrapper ju={`space-between`} padding={`0px 0px 30px`}>
            <CommonButton
              kindOf={`white`}
              onClick={() => {
                let comRegDocLink = `/api/admin/review/com-reg-doc/${comData._id}`;
                window.open(comRegDocLink);
              }}
            >
              사업자등록증 확인
              <IoIosArrowForward />
            </CommonButton>
            <CommonButton
              onClick={() => {
                let mainRegDocLink = `/api/admin/review/main-reg-doc/${comData._id}`;
                window.open(mainRegDocLink);
              }}
            >
              정비업등록증 확인
              <IoIosArrowForward />
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </RsWrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
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
              width: "500px",
              height: "800px",
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
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle />
            </CloseButton>
            <AdminReviewCompaniesModal {...ARCModalProps} />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesinfo;
