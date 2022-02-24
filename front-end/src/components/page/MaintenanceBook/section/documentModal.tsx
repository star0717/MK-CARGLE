import React, { useState } from "react";
import { NextPage } from "next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonSubTitle,
  SmallButton,
  Checkbox,
  CheckInput,
  CheckMark,
  TextInput2,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  CommonButton,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonForm,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillCloseCircle, AiFillMinusSquare } from "react-icons/ai";
import { FaMinusSquare } from "react-icons/fa";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { trim } from "src/modules/commonModule";
import { formRegEx } from "src/validation/regEx";
const DocumentModal: NextPage<_pPartsSetProps> = (props) => {
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
  const [point, setPoint] = useState<number>(0); // 포인트
  //  const [docCheck, setDocCheck] = useState<>()
  const [phoneNum, setPhoneNum] = useState<string>(""); // 번호 input
  const [phoneList, setPhoneList] = useState<string[]>([]); // 번호 리스트

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 전화번호 추가 handler
   * @param data
   */
  const onAddPhoneHandler: SubmitHandler<FieldValues> = (data) => {
    setPhoneList((phoneList) => [...phoneList, phoneNum]);
  };

  const onDelPhoneHandler = (index: number) => {
    setPhoneList(phoneList.filter((num, idx) => idx !== index));
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#ccc`}>1</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#ccc`}>2</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#314af5`}>3</Text>
            <Text fontSize={`20px`} color={`#314af5`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`10px 0px 0px`}>
          <CommonSmallTitle margin={`0px 0px 30px 0px`}>
            서류발급
          </CommonSmallTitle>
        </Wrapper>
        <Wrapper
          width={`60%`}
          padding={`10px 80px`}
          border={`1px solid #ccc`}
          radius={`8px`}
          shadow={`0px 5px 10px rgba(220,220,220,0.6)`}
        >
          <Wrapper
            dr={`row`}
            borderBottom={`1px solid #ccc`}
            height={`50px`}
            ju={`space-between`}
          >
            <Text>보유포인트 : {point.toLocaleString()} P</Text>
            <SmallButton
              type="button"
              kindOf={`default`}
              onClick={() => {
                console.log("hi");
              }}
            >
              미리보기
            </SmallButton>
          </Wrapper>
          <Wrapper dr={`row`} height={`50px`} ju={`space-between`}>
            <Text>서류를 선택하세요.</Text>
            <Wrapper dr={`row`} width={`auto`}>
              <Checkbox width={`120px`}>
                견적서
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                정비명세서
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} height={`50px`} ju={`space-between`}>
            <Text>발급방식을 선택해주세요.</Text>
            <Wrapper dr={`row`} width={`auto`}>
              <Checkbox width={`120px`}>
                PC인쇄
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                모바일전송
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper
          dr={`row`}
          width={`60%`}
          ju={`space-between`}
          padding={`10px 0px 0px`}
        >
          <CommonForm onSubmit={handleSubmit(onAddPhoneHandler)}>
            <TextInput2
              width={`580px`}
              type="text"
              value={phoneNum}
              {...register("phoneNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhoneNum(trim(e.target.value));
                },
                required: {
                  value: true,
                  message: "전화번호를 입력하세요.",
                },
                pattern: {
                  value: formRegEx.HP_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            ></TextInput2>
            <SmallButton type="submit" kindOf={`default`}>
              추가하기
            </SmallButton>
          </CommonForm>
        </Wrapper>
        <Wrapper width={`60%`} ju={`flex-start`} padding={`0px 0px 10px`}>
          {(errors.phoneNum?.type === "required" ||
            errors.phoneNum?.type === "pattern") && (
            <Text
              margin={`0px`}
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
        <Wrapper width={`60%`}>
          <TableWrapper minHeight={`200px`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`} ju={`center`}>
                <TableHeadLIST fontSize={`18px`}>등록된 전화번호</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} ju={`flex-start`}>
              <TableBody minHeight={`200px`} margin={`10px 0px 0px 0px`}>
                <TableRow
                  height={`50px`}
                  kindOf={`noHover`}
                  ju={`space-around`}
                >
                  {phoneList.length !== 0 ? (
                    <>
                      {phoneList.map((num, idx) => {
                        return (
                          <TableRowLIST key={idx}>
                            <SmallButton
                              type="button"
                              kindOf={`default`}
                              width={`160px`}
                              radius={`100px`}
                              onClick={() => {
                                onDelPhoneHandler(idx);
                              }}
                            >
                              {num}
                              <FaMinusSquare />
                            </SmallButton>
                          </TableRowLIST>
                        );
                      })}
                    </>
                  ) : (
                    <Wrapper>
                      <Text>전송할 번호가 없습니다.</Text>
                    </Wrapper>
                  )}
                </TableRow>
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        <CommonButtonWrapper ju={`center`} padding={`20px 30px 30px`}>
          <CommonButton
            type="button"
            kindOf={`grey`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            kindOf={`white`}
            onClick={() => {
              props.setModalOption("payment");
            }}
          >
            이전으로
          </CommonButton>
          <CommonButton type="button">출고완료</CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default DocumentModal;