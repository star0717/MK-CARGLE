import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Text,
  SmallButton,
  CloseButton,
} from "src/components/styles/CommonComponents";
import { useDispatch } from "react-redux";
import { Agency } from "src/models/agency.entity";
import { IoIosCloseCircle } from "react-icons/io";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { _aPatchAgency, _aPostAgency } from "store/action/user.action";
import { _iAgency } from "store/interfaces";
import { AxiosError } from "axios";

const EditBusinessModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [editAgency, setEditAgency] = useState<Partial<Agency>>({
    name: props.clickDoc.name,
    comRegNum: props.clickDoc.comRegNum,
    manager: props.clickDoc.manager,
    email: props.clickDoc.email,
    phoneNum: props.clickDoc.phoneNum,
    hpNum: props.clickDoc.hpNum,
    faxNum: props.clickDoc.faxNum,
    postcode: props.clickDoc.postcode,
    address1: props.clickDoc.address1,
    address2: props.clickDoc.address2,
    memo: props.clickDoc.memo,
  });
  const [addressModal, setAddressModal] = useState<boolean>(false);
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAgency({ ...editAgency, [e.target.name]: e.target.value });
  };

  /**
   * 주소검색 api handler
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

    setEditAgency({ ...editAgency, address1: fullAddress, postcode: zonecode });
    setValue("address1", fullAddress, { shouldValidate: true });
    setAddressModal(false);
  };

  const saveData: SubmitHandler<Partial<Agency>> = (data) => {
    dispatch(_aPatchAgency(props.clickDoc._id, editAgency))
      .then((res: _iAgency) => {
        alert("수정 되었습니다.");
        props.setModalOpen(false);
      })
      .catch((err: AxiosError<any, any>) => {
        if (err.response.data.key === "name") {
          alert("상호명을 입력해 주세요.");
        } else {
          alert("예기치 못한 이유로 등록에 실패하였습니다.");
        }
      });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const closeModal = () => {
    setAddressModal(false);
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>거래처 상세정보</CommonSmallTitle>
      <form onSubmit={handleSubmit(saveData)}>
        <Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text color={`#314FA5`}>*상호명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="name"
                value={editAgency.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>전화번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="phoneNum"
                value={editAgency.phoneNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>휴대전화번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="hpNum"
                value={editAgency.hpNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>담당자명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="manager"
                value={editAgency.manager}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>사업자등록번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="comRegNum"
                value={editAgency.comRegNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>팩스번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="faxNum"
                value={editAgency.faxNum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>이메일</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="email"
                value={editAgency.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>주소</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
                <TextInput2
                  width={`300px`}
                  // margin={`0px 0px 10px 0px`}
                  type="text"
                  name="address1"
                  value={editAgency.address1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputHandler(e);
                  }}
                />
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setAddressModal(!addressModal);
                  }}
                >
                  주소검색
                </SmallButton>
              </Wrapper>

              <TextInput2
                width={`400px`}
                type="text"
                name="address2"
                value={editAgency.address2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>메모</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextArea
                padding={`10px`}
                width={`400px`}
                height={`150px`}
                placeholder="메모를 입력하세요."
                al={`flex-start`}
                type="text"
                name="memo"
                value={editAgency.memo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputHandler(e);
                }}
              />
            </Wrapper>
          </Wrapper>
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton
              kindOf={`circleWhite`}
              type="button"
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton kindOf={`circleTheme`} type="submit">
              저장
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </form>
      <Wrapper>
        <Modal
          isOpen={addressModal}
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
            <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default EditBusinessModal;
