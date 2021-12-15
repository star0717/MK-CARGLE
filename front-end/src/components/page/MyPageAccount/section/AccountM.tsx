import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  TextInput2,
  CloseButton,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import ChangePassModal from "./ChangePassModal";
import { useForm } from "react-hook-form";
import { setMyInfo } from "../../../../../store/action/user.action";
import { useDispatch } from "react-redux";
import { SignUpInfo } from "../../../../models/auth.entity";
import StampModal from "./StampModal";
import { IoIosCloseCircle } from "react-icons/io";

Modal.setAppElement("body");

const AccountM: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //모달 관련
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState("");

  //owner 와 worker 구분용 state
  const [readOnly, setReadOnly] = useState(true);

  //user, company데이터
  const accountInfo = props.accountInfo;
  const setAccountInfo = props.setAccountInfo;

  // //도장 이미지, 파일명 관련 데이터
  const [stampNum, setStampNum] = useState(0);

  //accountinfo.user 데이터
  const [userData, setUserData] = useState(accountInfo.user);

  //accountinfo.company 데이터
  const [comData, setComData] = useState(accountInfo.company);

  //page전환용 setstate
  const setpages = props.setPages;

  useEffect(() => {
    if (accountInfo.user.auth === "worker") {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [accountInfo]);

  const myLoader = () => {
    return `/api/settings/myinfo/stamp?num=${stampNum}`;
  };

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

  const StampModalProps = {
    stampNum,
    setStampNum,
    setModalOpen,
    setModalOption,
    setValue,
    style: { height: "500px" },
  };

  // 모달창 밖 클릭시 닫기 옵션
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

  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
      alert("저장되었습니다.");
      setAccountInfo({
        ...accountInfo,
        company: comData,
        user: userData,
      });
      router.push("/v/main");
    });
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <form id="saveform" onSubmit={saveData}>
          <Text>계정정보</Text>
          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput value={userData.email} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>비밀번호</Text>
            <TextInput value={userData.password} type="password" disabled />
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
              name="name"
              onChange={(e: any) => {
                onInputUserHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>전화번호</Text>
            <TextInput
              value={userData.hpNumber}
              type="tel"
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
              value={userData.address1}
              readOnly
              name="address1"
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
            <Text>상세주소</Text>
            <TextInput
              type="text"
              name="address2"
              placeholder="상세주소를 입력해 주세요."
              value={userData.address2}
              onChange={(e: any) => {
                onInputUserHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>입사일자</Text>
            <TextInput2
              type="date"
              value={userData.joinDate.slice(0, 10)}
              name="joinDate"
              onChange={(e: any) => {
                onInputUserHandler(e);
              }}
            />
          </Wrapper>

          <Text>사업자 정보</Text>
          <Wrapper dr={`row`}>
            <Text>상호명</Text>
            <TextInput value={comData.name} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자등록번호</Text>
            <TextInput value={comData.comRegNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>정비업 등록번호</Text>
            <TextInput value={comData.mbRegNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>대표자명</Text>
            <TextInput value={comData.ownerName} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>정비업종</Text>
            <select
              name="mbTypeNum"
              value={comData.mbTypeNum}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            >
              <option value="1급">1급 자동차 공업사(자동차 종합 정비소)</option>
              <option value="2급">2급 자동차 공업사(소형 자동차 정비소)</option>
              <option value="3급">3급 자동차 공업사(자동차 전문 정비소)</option>
            </select>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업태</Text>
            <TextInput
              value={comData.busType}
              type="text"
              name="busType"
              readOnly={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
            <Text>업종</Text>
            <TextInput
              value={comData.busItem}
              type="text"
              name="busItem"
              readOnly={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 전화번호</Text>
            <TextInput
              value={comData.phoneNum}
              type="tel"
              name="phoneNum"
              readOnly={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
            <Text>사업자팩스번호</Text>
            <TextInput
              value={comData.faxNum}
              type="tel"
              name="faxNum"
              readOnly={readOnly}
              onChange={(e: any) => {
                onInputComHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 주소</Text>
            <TextInput
              value={`${comData.address1} ${comData.address2}, (${comData.postcode})`}
              type="text"
              readOnly
            />
          </Wrapper>
        </form>
        <Wrapper dr={`row`}>
          <Text>사업자 도장</Text>
          <Image
            loader={myLoader}
            alt="도장 사진"
            width={300}
            height={300}
            src="/api/settings/myinfo/stamp"
          />

          <button
            name="upload"
            type="button"
            onClick={(e) => {
              setModalOpen(!modalOpen);
              setModalOption("stamp");
            }}
          >
            파일선택
          </button>
        </Wrapper>
        <button type="button" onClick={() => setpages(3)}>
          회원탈퇴
        </button>
        <button form="saveform" type="submit" name="save">
          저 장
        </button>
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
            <ChangePassModal {...AccountModalProps} />
          ) : (
            <StampModal {...StampModalProps} />
          )}
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountM;
