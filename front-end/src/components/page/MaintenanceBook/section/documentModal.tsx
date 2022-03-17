import React, { useCallback, useEffect, useRef, useState } from "react";
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
  CloseButton,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { FaMinusSquare } from "react-icons/fa";
import {
  _pPartsSetProps,
  _pPreviewModalProps,
} from "src/configure/_pProps.entity";
import { create2dArray, trim } from "src/modules/commonModule";
import { formRegEx } from "src/validation/regEx";
import { useDispatch } from "react-redux";
import {
  _aGetEstimates,
  _aGetMaintenancesGenEstimate,
  _aGetMaintenancesGenStatement,
  _aGetStatement,
  _aPatchMaintenancesPubEsitmate,
  _aPatchMaintenancesPubStatement,
  _aPatchMaintenancesRelease,
  _aPatchMaintenancesSaveWorks,
} from "store/action/user.action";
import { _iEstimate, _iMaintenancesOne } from "store/interfaces";
import { useReactToPrint } from "react-to-print";
import EstimateFile from "src/components/page/FileHTML/estimateFile";
import StatementFile from "src/components/page/FileHTML/statementFile";
import { UseLink } from "src/configure/router.entity";
import { MainDocPubType, MainStatus } from "src/constants/maintenance.const";
import { useRouter } from "next/router";
import { MainPubDocInfo, Maintenance } from "src/models/maintenance.entity";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import PreviewModal from "./previewModal";
import { _fFileCheck, _fPublish } from "src/configure/_fProps.entity";
import { Estimate } from "src/models/estimate.entity";
import { Statement } from "src/models/statement.entity";

const DocumentModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
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
  const [phoneNum, setPhoneNum] = useState<string>(
    props.mtInfo.customer.phoneNumber
  ); // 번호 input
  // const [phoneList, setPhoneList] = useState<string[][]>([[]]); // 번호 리스트 all
  const [fileCheck, setFileCheck] = useState<_fFileCheck>({
    eCheck: true,
    sCheck: true,
  }); // 서류 선택 여부
  const [pubCheck, setPubCheck] = useState<_fPublish>({
    print: true,
    online: false,
  }); // 발급 선택 여부
  const [reOption, setReOption] = useState<boolean>(true); // 모달창 옵션(서류발급: false, 출고완료: true)
  const [printDone, setPrintDone] = useState<boolean>(false); // 프린트 완료여부
  const [onlineDone, setOnlineDone] = useState<boolean>(false); // SMS 완료여부
  const [modal2Open, setModal2Open] = useState<boolean>(false); // 미리보기 modal open
  const [eInfo, setEInfo] = useState<Estimate>(); // 견적서 정보
  const [sInfo, setSInfo] = useState<Statement>(); // 명세서 정보

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  // /**
  //  * 전화번호 추가 handler
  //  * @param data
  //  */
  // const onAddPhoneHandler: SubmitHandler<FieldValues> = (data) => {
  //   for (let i = 0; i < phoneList.length; i++) {
  //     for (let j = 0; j < phoneList[i].length; j++) {
  //       if (phoneNum === phoneList[i][j])
  //         return alert("이미 추가된 전화번호입니다");
  //     }
  //   }

  //   if (phoneList.length === 1) {
  //     if (phoneList[0].length < 3) {
  //       setPhoneList((phoneList) => [[...phoneList[0], phoneNum]]);
  //     } else {
  //       setPhoneList((phoneList) => [...phoneList, [phoneNum]]);
  //     }
  //   } else {
  //     if (phoneList[phoneList.length - 1].length < 3) {
  //       setPhoneList((phoneList) => [
  //         ...phoneList.filter((item, idx) => idx !== phoneList.length - 1),
  //         [...phoneList[phoneList.length - 1], phoneNum],
  //       ]);
  //     } else {
  //       setPhoneList((phoneList) => [...phoneList, [phoneNum]]);
  //     }
  //   }

  //   setPhoneNum("");
  // };

  // /**
  //  * 전화번호 삭제 handler
  //  * @param rowIdx
  //  * @param cellIdx
  //  */
  // const onDelPhoneHandler = (rowIdx: number, cellIdx: number) => {
  //   let odArr: string[] = [];
  //   for (let i = 0; i < phoneList.length; i++) {
  //     for (let j = 0; j < phoneList[i].length; j++) {
  //       if (i !== rowIdx || j !== cellIdx) odArr.push(phoneList[i][j]);
  //     }
  //   }

  //   const resultArr = create2dArray(Math.ceil(odArr.length / 3), 3, odArr);
  //   setPhoneList(resultArr);
  // };

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
   * 출고완료 handler
   * @param opt
   * @returns
   */
  const onReleasedHandler = async (opt: boolean) => {
    // 서류는 체크하고 발급방식을 선택안한 경우
    if (
      (fileCheck.eCheck || fileCheck.sCheck) &&
      !pubCheck.print &&
      !pubCheck.online
    )
      return alert("발급방식을 선택하세요.");
    // 서류를 체크안하고 발급방식만 선택한 경우
    if (
      (pubCheck.print || pubCheck.online) &&
      !fileCheck.eCheck &&
      !fileCheck.sCheck
    )
      return alert("발급서류를 선택하세요");
    // sms하는데 번호없음
    // if (pubCheck.online && phoneList.length === 0)
    if (pubCheck.online && errors.phoneNum) return false;

    await onFileApiHandler(mainPubDataHandler());

    // 옵션(출고완료or단순서류발급)에 따른 실제 기능
    // 출고완료 : 출고완료 api 및 실제 프린트
    // 단순서류발급 : 실제 프린트
    if (opt) {
      await dispatch(
        props.modalOption === "document2"
          ? // 수정일 경우
            _aPatchMaintenancesSaveWorks(props.mtInfo._id, props.mtInfo)
          : // 정상 단계 진행일 경우
            _aPatchMaintenancesRelease(props.mtInfo._id, props.mtInfo)
      ).then(
        (res: _iMaintenancesOne) => {
          if (!res.payload) {
            return alert("출고에 실패했습니다.");
          }
          alert("정비내역을 저장했습니다.");
          props.setInitMtInfo && props.setInitMtInfo(res.payload);
          props.setMtInfo(res.payload);
          props.setModify && props.setModify(!props.modify);
          onPubHandler(opt);
        },
        (err) => {
          return alert("출고에 실패했습니다.");
        }
      );
    } else {
      onPubHandler(opt);
    }
  };

  /**서류 발급 handler */
  const onPubHandler = (opt: boolean) => {
    if (!pubCheck.print && !pubCheck.online) {
      if (opt) {
        return props.setModalOpen(false);
      } else {
        return alert("발급방식을 선택하세요.");
      }
    }

    if (pubCheck.print) onPrintHandler();
    if (pubCheck.online && !errors.phoneNum) setOnlineDone(true);
  };

  /** 프린트 handler */
  const onPrintHandler = useReactToPrint({
    content: () => {
      const printElem = document.createElement("div");
      if (fileCheck.eCheck) {
        const eNode = estimateRef.current.cloneNode(true);
        printElem.appendChild(eNode);
      }
      if (fileCheck.sCheck) {
        const sNode = statementRef.current.cloneNode(true);
        printElem.appendChild(sNode);
      }
      return printElem;
    },
    onAfterPrint: () => {
      setPrintDone(true);
    },
  });

  /**프린트 및 SMS 완료 이후 handler */
  useEffect(() => {
    if (pubCheck.print === printDone && pubCheck.online === onlineDone) {
      if (reOption) {
        props.setModalOpen(false);
        router.push(
          `${UseLink.MAINTENANCE_BOOK}?id=${props.mtInfo._id}&step=${MainStatus.RELEASED}`
        );
      } else {
        props.setModalOpen(false);
      }
    }
  }, [printDone, onlineDone]);

  /**서류 api에 넘길 데이터 생성 */
  const mainPubDataHandler = () => {
    // 발급 api에 넘길 데이터 초기값
    let mainDocPubData: MainPubDocInfo = {
      type: MainDocPubType.NOT_ISSUED,
      phoneNumber: phoneNum,
    };

    // 체크 여부에 따른 문서 발급 타입 설정
    // 둘 다
    if (pubCheck.print && pubCheck.online)
      mainDocPubData.type = MainDocPubType.BOTH;
    // 프린트만
    if (pubCheck.print && !pubCheck.online)
      mainDocPubData.type = MainDocPubType.PRINT;
    // sms만
    if (!pubCheck.print && pubCheck.online)
      mainDocPubData.type = MainDocPubType.ONLINE;
    // sms 안함
    if (!pubCheck.online) delete mainDocPubData.phoneNumber;

    return mainDocPubData;
  };

  /**미리보기 handler */
  const onPreviewHandler = async () => {
    await onFileApiHandler(mainPubDataHandler());
    return setModal2Open(true);
  };

  /**
   * 서류 api handler
   * @param data
   */
  const onFileApiHandler = async (data: MainPubDocInfo) => {
    // 견적서 체크할 경우 api
    if (fileCheck.eCheck) {
      await dispatch(_aGetMaintenancesGenEstimate(props.mtInfo._id)).then(
        async (res: _iMaintenancesOne) => {
          await dispatch(
            _aPatchMaintenancesPubEsitmate(res.payload._id, data)
          ).then(
            async (res: _iMaintenancesOne) => {
              props.setMtInfo(res.payload);
              await onEstimateInfo(res.payload);
            },
            (err) => {
              return alert("견적서 발급 DB 에러");
            }
          );
        },
        (err) => {
          return alert("견적서 생성 DB 에러");
        }
      );
    }
    // 명세서 체크할 경우 api
    if (fileCheck.sCheck) {
      await dispatch(_aGetMaintenancesGenStatement(props.mtInfo._id)).then(
        async (res: _iMaintenancesOne) => {
          await dispatch(
            _aPatchMaintenancesPubStatement(res.payload._id, data)
          ).then(
            async (res: _iMaintenancesOne) => {
              props.setMtInfo(res.payload);
              await onStatementInfo(res.payload);
            },
            (err) => {
              return alert("명세서 발급 DB 에러");
            }
          );
        },
        (err) => {
          return alert("명세서 생성 DB 에러");
        }
      );
    }
  };

  /**견적서 정보 불러오기 handler */
  const onEstimateInfo = async (data: Maintenance) => {
    await dispatch(_aGetEstimates(data.estimate._oID)).then(
      (res: _iEstimate) => {
        if (res.payload) {
          setEInfo(res.payload);
        }
      },
      (err) => {
        return alert("견적서 생성에 실패했습니다.");
      }
    );
  };

  /**명세서 정보 불러오기 handler */
  const onStatementInfo = async (data: Maintenance) => {
    await dispatch(_aGetStatement(data.statement._oID)).then(
      (res: _iEstimate) => {
        if (res.payload) {
          setSInfo(res.payload);
        }
      },
      (err) => {
        return alert("견적서 생성에 실패했습니다.");
      }
    );
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const propMtInfo = props.mtInfo;
  const propToken = props.tokenValue;
  /**미리보기 props */
  const previewModalProps: _pPreviewModalProps = {
    propToken,
    modal2Open,
    setModal2Open,
    fileCheck,
    propMtInfo,
    eInfo,
    sInfo,
  };

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
              kindOf={
                fileCheck.eCheck || fileCheck.sCheck ? `default` : `ghost`
              }
              disabled={fileCheck.eCheck || fileCheck.sCheck ? false : true}
              onClick={onPreviewHandler}
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
          width={`60%`}
          dr={`row`}
          ju={`space-between`}
          padding={`10px 0px 0px`}
        >
          <CommonForm>
            <Text>휴대폰 번호 : </Text>
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
            />
          </CommonForm>
        </Wrapper>
        <Wrapper width={`60%`} ju={`flex-start`} padding={`0px`}>
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
        {/* <Wrapper
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
            <Wrapper overflow={`auto`} ju={`center`}>
              <TableBody minHeight={`200px`} ju={`center`}>
                {phoneList.length !== 0 ? (
                  <>
                    {phoneList.map((row, rowIdx) => {
                      return (
                        <TableRow
                          key={rowIdx}
                          height={`50px`}
                          kindOf={`noHover`}
                          ju={`flex-start`}
                        >
                          {phoneList[rowIdx].map((num, cellIdx) => {
                            return (
                              <TableRowLIST key={cellIdx}>
                                <SmallButton
                                  type="button"
                                  kindOf={`default`}
                                  width={`208px`}
                                  radius={`100px`}
                                  margin={`0px 5px`}
                                  onClick={() => {
                                    onDelPhoneHandler(rowIdx, cellIdx);
                                  }}
                                >
                                  {num}

                                  <FaMinusSquare />
                                </SmallButton>
                              </TableRowLIST>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  <TableRow
                    height={`50px`}
                    kindOf={`noHover`}
                    ju={`space-around`}
                  >
                    <Wrapper>
                      <Text>전송할 번호가 없습니다.</Text>
                    </Wrapper>
                  </TableRow>
                )}
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper> */}
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
                setReOption(false);
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
                setReOption(true);
                onReleasedHandler(true);
              }}
            >
              출고완료
            </CommonButton>
          </CommonButtonWrapper>
        )}
      </Wrapper>
      <Wrapper display={`none`}>
        <EstimateFile {...previewModalProps} ref={estimateRef} />
        <StatementFile {...previewModalProps} ref={statementRef} />
      </Wrapper>
      <Modal
        isOpen={modal2Open}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 10000,
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
            width: "1200px",
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
          <CloseButton
            onClick={() => {
              setModal2Open(false);
            }}
          >
            <IoIosCloseCircle />
          </CloseButton>
        </Wrapper>
        <PreviewModal {...previewModalProps} />
      </Modal>
    </WholeWrapper>
  );
};

export default DocumentModal;
