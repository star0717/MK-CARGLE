import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";

import DaumPostcode from "react-daum-postcode";
import ChangePassModal from "./ChangePassModal";
import { useForm } from "react-hook-form";
import { SignUpInfo } from "../../../../models/auth.entity";

Modal.setAppElement("body");

const AccountM: NextPage<any> = (props) => {
  console.log("아이구", props);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState("");
  const [addressMain, setAddressMain] = useState(""); // 주소(메인)
  const [addressDetail, setAddressDetail] = useState(""); // 주소(상세)
  const accountInfo = props.accountInfo;
  const setAccountInfo = props.setAccountInfo;

  const setpages = props.setPages;

  const {
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const AccountModalProps = {
    setModalOpen,
    setModalOption,
    setValue,
    style: { height: "500px" },
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // 주소 검색 api handler
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
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

    setAddressMain(fullAddress);
    setValue("addressMain", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>마이페이지{">"}계정관리</Text>

        <Text>계정정보</Text>

        <Wrapper dr={`row`}>
          <Text>아이디</Text>
          <TextInput value={accountInfo.user.email} type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>비밀번호</Text>
          <TextInput type="password" />
          <button
            type="button"
            onClick={(e) => {
              setModalOpen(!modalOpen);
              setModalOption("password");
            }}
          >
            비밀번호변경
          </button>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>이름</Text>
          <TextInput value={accountInfo.user.name} />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>전화번호</Text>
          <TextInput value={accountInfo.user.hpNumber} />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>주소</Text>
          <TextInput value={accountInfo.user.address} />
          <button
            type="button"
            onClick={(e) => {
              setModalOpen(!modalOpen);
              setModalOption("address");
            }}
          >
            주소 검색
          </button>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>입사일자</Text>
          <input type="date" value={accountInfo.user.joinDate}></input>
        </Wrapper>
        <button type="submit" onClick={() => setpages(3)}>
          회원탈퇴
        </button>

        <Text>사업자 정보</Text>
        <Wrapper dr={`row`}>
          <Text>상호명</Text>
          <TextInput value={accountInfo.company.name} type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>사업자등록번호</Text>
          <TextInput value={accountInfo.company.comRegNum} type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>정비업 등록번호</Text>
          <TextInput value={accountInfo.company.mbRegNum} type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>대표자명</Text>
          <TextInput value={accountInfo.company.ownerName} type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>정비업종</Text>
          <select>
            <option>1번</option>
            <option>2번</option>
            <option>3번</option>
          </select>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>업태</Text>
          <TextInput value={accountInfo.company.busType} />
          <Text>업종</Text>
          <TextInput value={accountInfo.company.busItem} />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>사업자 전화번호</Text>
          <TextInput value={accountInfo.company.phoneNum} />
          <Text>사업자팩스번호</Text>
          <TextInput value={accountInfo.company.faxNum} />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>사업자 주소</Text>
          <TextInput
            value={accountInfo.company.address}
            type="text"
          ></TextInput>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>사업자 도장</Text>
          <input type="image"></input>
          <button type="submit">업 로 드</button>
        </Wrapper>
        <button type="submit">저 장</button>
      </Wrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
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
          {modalOption === "address" ? (
            <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            />
          ) : (
            <ChangePassModal {...AccountModalProps} />
          )}
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountM;
