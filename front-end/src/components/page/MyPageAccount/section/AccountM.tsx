import type { NextPage } from "next";
import React, { ReactPropTypes, useEffect, useState } from "react";
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
import { setMyInfo } from "../../../../../store/action/user.action";
import { useDispatch } from "react-redux";
import { SignUpInfo } from "../../../../models/auth.entity";

Modal.setAppElement("body");

const AccountM: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState("");
  const [addressMain, setAddressMain] = useState(""); // 주소(메인)
  const [addressDetail, setAddressDetail] = useState(""); // 주소(상세)
  const [readOnly, setReadOnly] = useState(true);

  const accountInfo = props.accountInfo;
  const setAccountInfo = props.setAccountInfo;
  const [userData, setUserData] = useState(accountInfo.user);
  const [comData, setComData] = useState(accountInfo.company);

  //setAccountInfo({user: userData, company: comData})

  const setpages = props.setPages;

  useEffect(() => {
    if (accountInfo.user.auth === "worker") {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [accountInfo]);

  const {
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const AccountModalProps = {
    accountInfo,
    setModalOpen,
    setModalOption,
    setValue,
    style: { height: "500px" },
  };

  {
    /* 모달창 밖 클릭시 닫기 옵션 */
  }
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
      console.log("fullAddress => " + fullAddress);
    }

    setAddressMain(fullAddress);
    console.log(fullAddress);
    setValue("address", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setAccountInfo({ company: comData, user: userData });
  };
  const onInputComHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComData({ ...comData, [e.target.name]: e.target.value });
  };

  const saveData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ai: SignUpInfo = {
      company: comData,
      user: userData,
    };
    dispatch(setMyInfo(ai)).then((res: any) => {
      const info: SignUpInfo = res.payload;
      setAccountInfo({ company: info.company, user: info.user });
      alert("저장되었습니다.");
    });
  };

  return (
    <WholeWrapper>
      <form onSubmit={saveData}>
        <Wrapper>
          <Text>계정정보</Text>

          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput
              value={accountInfo.user.email}
              type="text"
              readOnly={true}
              disabled={true}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>비밀번호</Text>
            <TextInput
              value={accountInfo.user.password}
              type="password"
              readOnly={true}
              disabled={true}
            />
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
            <TextInput
              value={userData.name}
              type="text"
              readOnly={false}
              name="name"
              onChange={(e: any) => {
                console.log("=> " + e.target.value);
                onInputUserHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>전화번호</Text>
            <TextInput
              value={userData.hpNumber}
              type="tel"
              readOnly={false}
              name="hpNumber"
              onChange={(e: any) => {
                onInputUserHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>주소</Text>
            <TextInput
              type="text"
              placeholder="주소를 입력해주세요."
              value={userData.address}
              name="address"
              onChange={(e: any) => {
                onInputUserHandler(e);
              }}
            />
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
            <TextInput
              disabled={true}
              value={accountInfo.company.name}
              type="text"
              readonly={true}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자등록번호</Text>
            <TextInput
              disabled={true}
              value={accountInfo.company.comRegNum}
              type="text"
              readonly={true}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>정비업 등록번호</Text>
            <TextInput
              disabled={true}
              value={accountInfo.company.mbRegNum}
              type="text"
              readonly={true}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>대표자명</Text>
            <TextInput
              disabled={true}
              value={accountInfo.company.ownerName}
              type="text"
              readonly={true}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>정비업종</Text>
            <select name="mbTypeNum">
              <option>1급 자동차 공업사(자동차 종합 정비소)</option>
              <option>2급 자동차 공업사(소형 자동차 정비소)</option>
              <option>3급 자동차 공업사(자동차 전문 정비소)</option>
            </select>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업태</Text>
            <TextInput
              value={accountInfo.company.busType}
              type="text"
              name="busType"
              readOnly={readOnly}
              disabled={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
            <Text>업종</Text>
            <TextInput
              value={accountInfo.company.busItem}
              type="text"
              name="busItem"
              readOnly={readOnly}
              disabled={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 전화번호</Text>
            <TextInput
              value={accountInfo.company.phoneNum}
              type="tel"
              name="phoneNum"
              readOnly={readOnly}
              disabled={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
            <Text>사업자팩스번호</Text>
            <TextInput
              value={accountInfo.company.faxNum}
              type="tel"
              name="faxNum"
              readOnly={readOnly}
              disabled={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 주소</Text>
            <TextInput
              value={accountInfo.company.address}
              type="text"
              readOnly={true}
              disabled={true}
            ></TextInput>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 도장</Text>
            <input type="image"></input>
            <button type="button" name="upload">
              업 로 드
            </button>
          </Wrapper>
          <button type="submit" name="save">
            저 장
          </button>
        </Wrapper>
      </form>
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
