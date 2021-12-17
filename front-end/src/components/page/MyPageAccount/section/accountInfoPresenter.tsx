import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  TextInput2,
  SmallButton,
  Combo,
} from "../../../styles/CommonComponents";
import React from "react";
import Image from "next/image";
import { formRegEx } from "../../../../validation/regEx";
import { mbType } from "../../../../configure/company.entity";

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
      <Wrapper>
        <form id="saveform" onSubmit={handleSubmit(onChangeInfoHandler)}>
          <Text>계정정보</Text>
          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput value={userData.email} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>비밀번호</Text>
            <SmallButton
              type="button"
              kindOf={`default`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setModalOpen(!modalOpen);
                setModalOption("password");
              }}
            >
              비밀번호변경
            </SmallButton>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>이름</Text>
            <TextInput
              value={userData.name}
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
          <Wrapper dr={`row`}>
            <Text>전화번호</Text>
            <TextInput
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
          <Wrapper dr={`row`}>
            <Text>주소</Text>
            <TextInput
              type="text"
              placeholder="주소를 입력해주세요."
              value={userData.address1}
              readOnly
              {...register("address1")}
            />
            <SmallButton
              type="button"
              kindOf={`default`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setModalOpen(!modalOpen);
                setModalOption("address");
              }}
            >
              주소 검색
            </SmallButton>
          </Wrapper>
          <Wrapper dr={`row`}>
            <TextInput
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
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>입사일자</Text>
            <TextInput2
              type="date"
              value={userData.joinDate ? userData.joinDate.slice(0, 10) : ""}
              {...register("joinDate", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
                },
              })}
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
            <Combo
              width={`400px`}
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
              {/* <option value="1급">1급 자동차 공업사(자동차 종합 정비소)</option>
              <option value="2급">2급 자동차 공업사(소형 자동차 정비소)</option>
              <option value="3급">3급 자동차 공업사(자동차 전문 정비소)</option> */}
              {/* mbType.map(item => ) */}
            </Combo>
            {errors.mbTypeNum?.type === "required" && (
              <Text>필수 선택사항입니다.</Text>
            )}
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업태</Text>
            <TextInput
              value={comData.busType}
              type="text"
              readOnly={readOnly}
              {...register("busType", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputComHandler(e);
                },
              })}
            />
            <Text>업종</Text>
            <TextInput
              value={comData.busItem}
              type="text"
              readOnly={readOnly}
              {...register("busItem", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputComHandler(e);
                },
              })}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업체 전화번호</Text>
            <TextInput
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
            <Text>업체 팩스번호(선택)</Text>
            <TextInput
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

          <SmallButton
            type="button"
            kindOf={`default`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setModalOpen(!modalOpen);
              setModalOption("stamp");
            }}
          >
            파일선택
          </SmallButton>
        </Wrapper>
        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={() => setStep(3)}
        >
          회원탈퇴
        </SmallButton>
        <SmallButton form="saveform" kindOf={`default`} type="submit">
          저 장
        </SmallButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountInfoPresenter;
