import Modal from "react-modal";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosCloseCircle,
} from "react-icons/io";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
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
  Image,
  Combo,
  CommonTitleWrapper,
  CommonTitle,
  IconButton,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
} from "../../../styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";
import { makeFullAddress } from "../../../../modules/commonModule";
import { mbTypeOption } from "../../../../configure/list.entity";
import { useForm } from "react-hook-form";
import { User } from "../../../../models/user.entity";
import { useRouter } from "next/router";

const AdminReviewCompaniesinfo: NextPage<_pAdminReviewCompanies> = (props) => {
  const router = useRouter();

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

  const ARCModalProps: any = {
    ...props,
    setModalOpen,
    style: { height: "500px" },
  };

  return (
    <WholeWrapper ref={ref}>
      <CommonTitleWrapper>
        <CommonTitle>승인관리</CommonTitle>
      </CommonTitleWrapper>
      <RsWrapper wrap={`no-wrap`} margin={`100px 0px 0px 0px`}>
        <Wrapper width={`1070px`}>
          <Wrapper dr={`row`} ju={`space-between`} padding={`0px 0px 30px`}>
            <Wrapper width={`auto`} dr={`row`}>
              <SmallButton type="button" kindOf={`default`} onClick={() => {}}>
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
          {/* <Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              radius={`5px`}
              shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              margin={`0px 0px 50px`}
            >
              <CommonSmallTitle
                fontSize={`18px`}
                fontWeight={`800`}
                padding={`10px 0px`}
              >
                사용자 정보
              </CommonSmallTitle>
              <Wrapper al={`flex-start`}>
                <Text margin={`0px 0px 10px`}>아이디</Text>
                <TextInput2
                  margin={`0px 0px 10px`}
                  width={`400px`}
                  type="text"
                  readOnly
                  value={userData.email}
                />
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text margin={`0px 0px 10px`}>이름</Text>
                <TextInput2
                  margin={`0px 0px 10px`}
                  width={`400px`}
                  type="text"
                  readOnly
                  value={userData.name}
                />
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text margin={`0px 0px 10px`}>전화번호</Text>
                <TextInput2
                  margin={`0px 0px 10px`}
                  width={`400px`}
                  type="text"
                  readOnly
                  value={userData.hpNumber}
                />
              </Wrapper>
            </Wrapper>
            <CommonSmallTitle
              fontSize={`18px`}
              fontWeight={`800`}
              padding={`10px 0px`}
            >
              사업자 정보
            </CommonSmallTitle>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>상호명</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.name}
                type="text"
                readOnly
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>사업자등록번호</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.comRegNum}
                type="text"
                readOnly
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>정비업등록번호</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.mbRegNum}
                type="text"
                readOnly
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>대표자명</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.ownerName}
                type="text"
                readOnly
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>정비업종</Text>
              <Combo
                width={`400px`}
                margin={`0px`}
                name="mbTypeNum"
                value={comData.mbTypeNum}
                {...register("mbTypeNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>업태</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.busType}
                type="text"
                {...register("busType", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputComHandler(e);
                  },
                })}
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>업종</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.busItem}
                type="text"
                {...register("busItem", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputComHandler(e);
                  },
                })}
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>업체 전화번호</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.phoneNum}
                type="text"
                readOnly
              />
              <Text margin={`0px 0px 10px`}>업체 팩스번호</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={comData.faxNum}
                type="text"
                readOnly
              />
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>사업자 주소</Text>
              <TextInput2
                margin={`0px 0px 10px`}
                width={`400px`}
                value={makeFullAddress(
                  comData.address1,
                  comData.address2,
                  comData.postcode
                )}
                type="text"
                readOnly
              />
            </Wrapper>
          </Wrapper> */}
          {/* ----------------------------------------사용자-------------------------------------- */}
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
                {/* <Wrapper dr={`row`} margin={`0px 0px 10px`}>
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
                  width={`320px`}
                  margin={`0px 10px 0px`}
                />
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
                  width={`320px`}
                  margin={`0px 0px 0px 0px`}
                />
              </Wrapper> */}
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
            <CommonButton kindOf={`white`}>사업자등록증 확인</CommonButton>
            <CommonButton>정비업등록증 확인</CommonButton>
          </CommonButtonWrapper>
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
            <AdminReviewCompaniesModal {...ARCModalProps} />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesinfo;
