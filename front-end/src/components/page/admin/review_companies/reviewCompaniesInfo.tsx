import Modal from "react-modal";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
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
} from "../../../styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";
import { makeFullAddress } from "../../../../modules/commonModule";
import { mbTypeOption } from "../../../../configure/list.entity";
import { useForm } from "react-hook-form";
import { User } from "../../../../models/user.entity";

const AdminReviewCompaniesinfo: NextPage<_pAdminReviewCompanies> = (props) => {
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
      <RsWrapper>
        <Wrapper dr={`row`}>
          <SmallButton
            type="button"
            kindOf={`default`}
            margin={`0px 0px 0px 20px`}
            onClick={() => {}}
          >
            수정
          </SmallButton>
          <SmallButton
            type="button"
            kindOf={`default`}
            margin={`0px 0px 0px 20px`}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            승인처리
          </SmallButton>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Image alt="사업자, 정비업 등록증 이미지"></Image>
          <Wrapper>
            <Text>계정정보</Text>
            <Wrapper dr={`row`}>
              <Text>아이디</Text>
              <TextInput2 tpye="text" readOnly value={userData.email} />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>이름</Text>
              <TextInput2 tpye="text" readOnly value={userData.name} />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>전화번호</Text>
              <TextInput2 tpye="text" readOnly value={userData.hpNumber} />
            </Wrapper>
            <Text>사업자정보</Text>
            <Wrapper dr={`row`}>
              <Text>상호명</Text>
              <TextInput2 value={comData.name} type="text" readOnly />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text width={`130px`}>사업자등록번호</Text>
              <TextInput2 value={comData.comRegNum} type="text" readOnly />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text width={`130px`}>정비업등록번호</Text>
              <TextInput2 value={comData.mbRegNum} type="text" readOnly />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>대표자명</Text>
              <TextInput2 value={comData.ownerName} type="text" readOnly />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>정비업종</Text>
              <Combo
                width={`300px`}
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
            <Wrapper dr={`row`} margin={`0px 0px 10px`}>
              <Text
                width={`80px`}
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
                width={`200px`}
              />

              <Text
                width={`80px`}
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
                width={`200px`}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>업체 전화번호</Text>
              <TextInput2 value={comData.phoneNum} type="text" readOnly />
              <Text>업체 팩스번호</Text>
              <TextInput2 value={comData.faxNum} type="text" readOnly />
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
