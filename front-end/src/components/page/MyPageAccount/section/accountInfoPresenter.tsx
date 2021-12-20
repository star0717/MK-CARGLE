import { NextPage } from "next";
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
} from "../../../styles/CommonComponents";
import React from "react";
// import Image from "next/image";
import { formRegEx } from "../../../../validation/regEx";
import { mbType } from "../../../../configure/company.entity";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";
import { AiTwotoneCopyrightCircle } from "react-icons/ai";
import { BusinessCenter, Person } from "@material-ui/icons";

/**
 * 마이 페이지: 계정관리 확인 컴포넌트(화면)
 * @param props
 * @returns
 */
const AccountInfoPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const setStep = props.setStep;
  const handleSubmit = props.handleSubmit;
  const register = props.register;
  const errors = props.errors;
  const onChangeInfoHandler = props.onChangeInfoHandler;
  const userData = props.userData;
  const onInputUserHandler = props.onInputUserHandler;
  const comData = props.comData;
  const onInputComHandler = props.onInputComHandler;
  const readOnly = props.readOnly;
  const myLoader = props.myLoader;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const setModalOption = props.setModalOption;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <form id="saveform" onSubmit={handleSubmit(onChangeInfoHandler)}>
          <CommonTitle>계정정보</CommonTitle>
          <CommonSubTitle>
            이곳에서 계정정보를 확인 및 수정할 수 있습니다.
          </CommonSubTitle>
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            radius={`5px`}
            margin={`0px 0px 5px 0px`}
          >
            <Wrapper dr={`row`} width={`auto`}>
              <Text fontSize={`8px`} padding={`0px 5px 0px`}>
                <AiTwotoneCopyrightCircle />
              </Text>
              <Text
                textAlign={`start`}
                fontSize={`18px`}
                fontWeight={`800`}
                padding={`10px 0px`}
              >
                사용자 정보
              </Text>
            </Wrapper>
            <Text
              fontSize={`28px`}
              lineHeight={`28px`}
              margin={`8px 0px 0px`}
            ></Text>
          </Wrapper>
          <Wrapper
            dr={`row`}
            borderTop={`2px solid #000`}
            borderBottom={`2px solid #000`}
            width={`1200px`}
            ju={`space-between`}
            al={`flex-start`}
            margin={`0px 0px 50px`}
          >
            <Wrapper
              width={`270px`}
              height={`380px`}
              bgColor={`#f5f5f5`}
              padding={`30px 0px`}
            >
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
                padding={`20px 0px`}
                fontSize={`18px`}
                fontWeight={`800`}
                letterSpacing={`4px`}
              >
                {userData.name}님
              </Text>
            </Wrapper>
            <Wrapper dr={`column`} width={`auto`} padding={`30px 0px 0px`}>
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
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
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  비밀번호
                </Text>
                <TextInput2
                  value={userData.email}
                  type="password"
                  readOnly
                  width={`700px`}
                />
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
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  이름
                </Text>
                <TextInput2
                  value={userData.name}
                  readOnly
                  type="text"
                  {...register("name", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    margin={`0px 0px 10px`}
                    width={`100%`}
                    color={`#d6263b`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    {errors.name.message}
                  </Text>
                )}
              </Wrapper>
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  전화번호
                </Text>
                <TextInput2
                  value={userData.hpNumber}
                  type="tel"
                  {...register("hpNumber", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputUserHandler(e);
                    },
                    required: { value: true, message: "필수 입력사항입니다." },
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
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
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
                  width={`110px`}
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
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  입사일자
                </Text>
                <TextInput2
                  type="date"
                  value={
                    userData.joinDate ? userData.joinDate.slice(0, 10) : ""
                  }
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
          {/* 사업자정보  */}
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            radius={`5px`}
            margin={`0px 0px 5px 0px`}
          >
            <Wrapper dr={`row`} width={`auto`}>
              <Text fontSize={`8px`} padding={`0px 5px 0px`}>
                <AiTwotoneCopyrightCircle />
              </Text>
              <Text
                textAlign={`start`}
                fontSize={`18px`}
                fontWeight={`800`}
                padding={`10px 0px`}
              >
                사업자 정보
              </Text>
            </Wrapper>
            <Text
              fontSize={`28px`}
              lineHeight={`28px`}
              margin={`8px 0px 0px`}
            ></Text>
          </Wrapper>
          <Wrapper
            dr={`row`}
            borderTop={`2px solid #000`}
            borderBottom={`2px solid #000`}
            width={`1200px`}
            ju={`space-between`}
            al={`flex-start`}
            margin={`0px 0px 10px`}
          >
            <Wrapper
              width={`270px`}
              height={`690px`}
              bgColor={`#f5f5f5`}
              padding={`30px 0px`}
            >
              <Wrapper
                width={`80px`}
                height={`80px`}
                bgColor={`#ccc`}
                radius={`100px`}
              >
                <Text fontSize={`60px`} lineHeight={`36px`} color={`#fff`}>
                  <BusinessCenter />
                </Text>
              </Wrapper>
              <Text
                padding={`20px 0px`}
                fontSize={`18px`}
                fontWeight={`800`}
                letterSpacing={`4px`}
              >
                {comData.name}
              </Text>
            </Wrapper>
            <Wrapper dr={`column`} width={`auto`} padding={`30px 0px 0px`}>
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
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
                  width={`110px`}
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
                  width={`110px`}
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
                  width={`110px`}
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
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  정비업종
                </Text>
                <Combo
                  width={`800px`}
                  margin={`0px`}
                  value={comData.mbTypeNum}
                  disabled={readOnly}
                  {...register("mbTypeNum", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputComHandler(e);
                    },
                    required: true,
                  })}
                >
                  <option value="1급">
                    1급 자동차 공업사(자동차 종합 정비소)
                  </option>
                  <option value="2급">
                    2급 자동차 공업사(소형 자동차 정비소)
                  </option>
                  <option value="3급">
                    3급 자동차 공업사(자동차 전문 정비소)
                  </option>
                  {/* mbType.map(item => ) */}
                </Combo>
                {errors.mbTypeNum?.type === "required" && (
                  <Text>필수 선택사항입니다.</Text>
                )}
              </Wrapper>
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
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
                  width={`110px`}
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
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  업체 전화번호
                </Text>
                <TextInput2
                  value={comData.phoneNum}
                  type="text"
                  placeholder="(- 제외, 지역번호 포함)"
                  readOnly={readOnly}
                  {...register("phoneNum", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputComHandler(e);
                    },
                    required: { value: true, message: "필수 입력사항입니다." },
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
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  업체 팩스번호
                </Text>
                <TextInput2
                  value={comData.faxNum}
                  type="text"
                  readOnly={readOnly}
                  placeholder="(- 제외)"
                  {...register("faxNum", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
                  textAlign={`end`}
                  padding={`0px 10px 0px 0px`}
                >
                  사업자 주소
                </Text>
                <TextInput2
                  value={`${comData.address1} ${comData.address2}, (${comData.postcode})`}
                  type="text"
                  readOnly
                  width={`800px`}
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                <Text
                  width={`110px`}
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
                      loader={myLoader}
                      alt="도장 사진"
                      width={`100 px`}
                      // height={200}
                      src="/api/settings/myinfo/stamp"
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
        </form>
        <Wrapper al={`flex-end`} margin={`0px 0px 30px`}>
          <SmallButton type="button" kindOf={`default`}>
            회원탈퇴
          </SmallButton>
        </Wrapper>
        <CommonButton form="saveform" type="submit">
          저 장
        </CommonButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AccountInfoPresenter;
