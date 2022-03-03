import React, { useRef, useState } from "react";
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
import { FaMinusSquare } from "react-icons/fa";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { trim } from "src/modules/commonModule";
import { formRegEx } from "src/validation/regEx";
import { useDispatch } from "react-redux";
import { _aPatchMaintenancesRelease } from "store/action/user.action";
import { _iMaintenancesOne } from "store/interfaces";
import { useReactToPrint } from "react-to-print";
import EstimateFile from "src/components/page/FileHTML/estimateFile";
import StatementFile from "src/components/page/FileHTML/statementFile";
import { UseLink } from "src/configure/router.entity";
import { MainStatus } from "src/constants/maintenance.const";
import { useRouter } from "next/router";

const DocumentModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  interface FileCheck {
    eCheck: boolean;
    sCheck: boolean;
  }

  interface Publish {
    print: boolean;
    online: boolean;
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const estimateRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

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
  const [phoneNum, setPhoneNum] = useState<string>(""); // 번호 input
  const [phoneList, setPhoneList] = useState<string[]>([]); // 번호 리스트
  const [fileCheck, setFileCheck] = useState<FileCheck>({
    eCheck: true,
    sCheck: true,
  }); // 서류 선택 여부
  const [pubCheck, setPubCheck] = useState<Publish>({
    print: true,
    online: false,
  }); // 발급 선택 여부

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 전화번호 추가 handler
   * @param data
   */
  const onAddPhoneHandler: SubmitHandler<FieldValues> = (data) => {
    setPhoneList((phoneList) => [...phoneList, phoneNum]);
    setPhoneNum("");
  };

  /**
   * 전화번호 삭제 handler
   * @param index
   */
  const onDelPhoneHandler = (index: number) => {
    setPhoneList(phoneList.filter((num, idx) => idx !== index));
  };

  /**
   * 체크박스 handler
   * @param e
   */
  const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "eCheck":
      case "sCheck":
        return setFileCheck({
          ...fileCheck,
          [e.target.name]: e.target.checked,
        });
      case "print":
      case "online":
        return setPubCheck({ ...pubCheck, [e.target.name]: e.target.checked });
    }
  };

  /**
   * 출고완료
   */
  const onReleasedHandler = async (opt: boolean) => {
    if (
      (fileCheck.eCheck || fileCheck.sCheck) &&
      !pubCheck.print &&
      !pubCheck.online
    )
      return alert("발급방식을 선택하세요.");
    if (
      (pubCheck.print || pubCheck.online) &&
      !fileCheck.eCheck &&
      !fileCheck.sCheck
    )
      return alert("발급서류를 선택하세요");

    if (opt) {
      await dispatch(
        _aPatchMaintenancesRelease(props.mtInfo._id, props.mtInfo)
      ).then(
        (res: _iMaintenancesOne) => {
          if (!res.payload) {
            return alert("출고에 실패했습니다.");
          }
          props.setMtInfo(res.payload);
          props.setModalOpen(false);
          alert("정비내역을 저장했습니다.");
        },
        (err) => {
          return alert("출고에 실패했습니다.");
        }
      );
    }

    if (pubCheck.print) {
      onPrintHandler(opt);
    }
  };

  // /**
  //  * 전송 및 출력 handler
  //  */
  // const onPublishHandler = () => {
  //   if (
  //     (fileCheck.eCheck || fileCheck.sCheck) &&
  //     !pubCheck.print &&
  //     !pubCheck.online
  //   )
  //     return alert("발급방식을 선택하세요.");
  //   if (
  //     (pubCheck.print || pubCheck.online) &&
  //     !fileCheck.eCheck &&
  //     !fileCheck.sCheck
  //   )
  //     return alert("발급서류를 선택하세요");
  //   if (pubCheck.print) {
  //     onPrintHandler();
  //   }
  // };

  /** 프린트 handler */
  const onPrintHandler = (opt: boolean) =>
    useReactToPrint({
      content: () => {
        const PrintElem = document.createElement("div");
        if (fileCheck.eCheck) PrintElem.appendChild(estimateRef.current);
        if (fileCheck.sCheck) PrintElem.appendChild(statementRef.current);
        return PrintElem;
      },
      // onAfterPrint: () => {
      //   if (opt) {
      //     return router.push(
      //       `${UseLink.MAINTENANCE_BOOK}?id=${props.mtInfo._id}&step=${MainStatus.RELEASED}`
      //     );
      //   } else {
      //     return props.setModalOpen(false);
      //   }
      // },
    });

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <Wrapper>
        {props.modalOption.indexOf("Bts") === -1 && (
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
        )}
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
                console.log("미리보기");
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
                <CheckInput
                  type="checkbox"
                  name="eCheck"
                  checked={fileCheck.eCheck}
                  onChange={onCheckHandler}
                />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                정비명세서
                <CheckInput
                  type="checkbox"
                  name="sCheck"
                  checked={fileCheck.sCheck}
                  onChange={onCheckHandler}
                />
                <CheckMark></CheckMark>
              </Checkbox>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} height={`50px`} ju={`space-between`}>
            <Text>발급방식을 선택해주세요.</Text>
            <Wrapper dr={`row`} width={`auto`}>
              <Checkbox width={`120px`}>
                PC인쇄
                <CheckInput
                  type="checkbox"
                  name="print"
                  checked={pubCheck.print}
                  onChange={onCheckHandler}
                />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                모바일전송
                <CheckInput
                  type="checkbox"
                  name="online"
                  checked={pubCheck.online}
                  onChange={onCheckHandler}
                />
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
              <TableBody minHeight={`200px`}>
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
        {props.modalOption.indexOf("Bts") !== -1 ? (
          <CommonButtonWrapper ju={`center`} padding={`20px 30px 30px`}>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              onClick={() => {
                onReleasedHandler(false);
              }}
            >
              전송 및 출력
            </CommonButton>
          </CommonButtonWrapper>
        ) : (
          <CommonButtonWrapper ju={`center`} padding={`20px 30px 30px`}>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setModalOption("payment");
              }}
            >
              이전으로
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              onClick={() => {
                onReleasedHandler(true);
              }}
            >
              출고완료
            </CommonButton>
          </CommonButtonWrapper>
        )}
        <Wrapper display={`none`}>
          <EstimateFile ref={estimateRef} />
          <StatementFile ref={statementRef} />
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default DocumentModal;
