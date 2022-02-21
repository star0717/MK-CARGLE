import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CloseButton,
  ColorSpan,
  Combo,
  IconButton,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  SpeechBubbleLeft,
  SpeechBubbleRight,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  BsFillFileEarmarkCheckFill,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import {
  _pMaintenanceProps,
  _pPartsSetProps,
} from "src/configure/_pProps.entity";
import { FaCarAlt, FaFlagCheckered } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";
import { RiFileList2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { basicRegEx, formRegEx } from "src/validation/regEx";
import {
  _aGetMaintenancesCarInfo,
  _aPostMaintenancesStore,
} from "store/action/user.action";
import { _iGetMaintenancesCarInfo, _iMaintenances } from "store/interfaces";
import {
  getStrMainPartsType,
  MainPartsType,
  mainPartsTypeList,
  MainStatus,
} from "src/constants/maintenance.const";
import {
  MainCar,
  MainCustomer,
  Maintenance,
  MainWork,
} from "src/models/maintenance.entity";
import { deleteKeyJson, maskingStr, trim } from "src/modules/commonModule";
import { PartsSet } from "src/models/partsset.entity";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import MtPartsModal from "./partsModal";
import { Part } from "src/models/part.entity";
import MtSetModal from "./setModal";
import { GoCheck } from "react-icons/go";
import dayjs from "dayjs";

const MaintenanceStored: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const workInit: MainWork[] = [
    {
      name: "",
      code: "",
      tsCode: "",
      type: MainPartsType.A,
      price: 0,
      quantity: 0,
      wage: 0,
    },
  ];

  let inputRef = useRef<HTMLInputElement[]>([]);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 창 옵션
  const [mtInfo, setMtInfo] = useState<Maintenance>(props.data.mtData); // 해당 정비내역 정보
  const [taxCheck, setTaxCheck] = useState<boolean>(false); // 부가세 체크여부
  const [cellCount, setCellCount] = useState<number>(7); // 행 갯수
  const [inputWork, setInputWork] = useState<MainWork>(workInit[0]); // 부품 input
  const [workList, setWorkList] = useState<MainWork[]>(workInit); // 부품 리스트
  const [partSetClass, setPartSetClass] = useState<Partial<PartsSet>[]>(
    props.data.setList.docs
  ); // 전체 세트 항목
  const [partSetData, setPartSetData] = useState<Partial<PartsSet>>(
    partSetClass[0]
  ); // 선택한 세트 데이터

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  useEffect(() => {
    setMtInfo(props.data.mtData);
    setPartSetClass(props.data.setList.docs);
  }, [props]);

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  useEffect(() => {
    setCellCount(workList.length * 7);
  }, [workList]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * 키 이벤트 handler
   * @param e
   * @param idx
   */
  const onKeyUpHandler = (e: KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      inputRef.current[idx + 1].focus();
    }
    if (e.key === "ArrowLeft") {
      if (idx !== 0) inputRef.current[idx - 1].focus();
    }
    if (e.key === "ArrowUp") {
      if (idx >= 7) inputRef.current[idx - 7].focus();
    }
    if (e.key === "ArrowDown") {
      inputRef.current[idx + 7].focus();
    }

    if (e.key === "Enter" || e.key === "ArrowRight") {
    }
  };

  /**
   * 키 이벤트 handler
   * @param e
   * @param idx
   */
  const onKeyDownhandler = (e: KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      if (idx === cellCount - 1) {
        setWorkList(workList.concat(workInit));
      }
    }
    if (e.key === "ArrowDown") {
      if (idx >= cellCount - 7) {
        setWorkList(workList.concat(workInit));
      }
    }
  };

  const onChangeInputArr = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    setInputWork({ ...inputWork, [e.target.name]: e.target.value });
    setWorkList(workList.splice(idx, 1, inputWork));
  };

  // console.log(inputWork);
  console.log(props);
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const partsSetProps: _pPartsSetProps = {
    ...props,
    setModalOpen,
    partSetClass,
    setPartSetClass,
    partSetData,
    setPartSetData,
    workList,
    setWorkList,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper>
          <Wrapper
            padding={`20px`}
            width={`400px`}
            margin={`0px 0px 10px 600px`}
            al={`flex-start`}
          >
            <SpeechBubbleRight fontSize={`20px`}>
              "현재 정비 단계는 출고완료입니다."
            </SpeechBubbleRight>
          </Wrapper>
          <JoinStepBarWrapper padding={`0px 0px 50px`}>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`complete`}>
                <GoCheck />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량선택
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`complete`}>
                <GoCheck />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량입고
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`complete`}>{<GoCheck />}</JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비중
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={"line2"}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`complete`}>
                <GoCheck />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비완료
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`progress`}>
                <FaFlagCheckered />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                출고완료
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
          <Wrapper width={`25%`}>
            <Wrapper height={`80px`} ju={`flex-end`}>
              <Wrapper
                dr={`row`}
                fontSize={`24px`}
                border={`1px solid #ccc`}
                padding={`10px 0px`}
              >
                <Text fontSize={`24px`}>{mtInfo.car.regNumber}</Text>
                <IconButton
                  type="button"
                  shadow={`none`}
                  onClick={() => {
                    router.push(
                      `${UseLink.MAINTENANCE_BOOK}?step=${MainStatus.STORED}`
                    );
                  }}
                >
                  <AiFillCloseCircle />
                </IconButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              margin={`10px 0px 0px 0px`}
              padding={`10px 20px`}
            >
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  주행거리
                </Text>
                <TextInput2 type="text" value={mtInfo.car.distance} readOnly />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  고객명
                </Text>
                <TextInput2
                  type="text"
                  value={
                    mtInfo.customer.name
                      ? maskingStr(mtInfo.customer.name)
                      : "-"
                  }
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  전화번호
                </Text>
                <TextInput2
                  type="text"
                  value={mtInfo.customer.phoneNumber}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  차량명
                </Text>
                <TextInput2 type="text" value={mtInfo.car.name} readOnly />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  모델명
                </Text>
                <TextInput2
                  type="text"
                  value={mtInfo.car.model || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  연식
                </Text>
                <TextInput2
                  type="text"
                  value={mtInfo.car.age || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  차대번호
                </Text>
                <TextInput2
                  type="text"
                  value={mtInfo.car.idNumber || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`80px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  등록일자
                </Text>
                <TextInput2
                  type="text"
                  value={mtInfo.car.regDate || "-"}
                  readOnly
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper width={`74%`}>
            <Wrapper height={`80px`} al={`flex-end`} ju={`flex-end`}>
              <Wrapper dr={`row`} ju={`flex-end`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    router.push(UseLink.MAINTENANCE_BOOK);
                  }}
                >
                  목록으로
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    console.log("서류");
                  }}
                >
                  서류발급
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    console.log("서류");
                  }}
                >
                  국토부
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    console.log("서류");
                  }}
                >
                  결재정보
                </SmallButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              padding={`20px`}
              margin={`10px 0px 20px`}
            >
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                padding={`0px 0px 10px 0px`}
              >
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`80px`}
                  >
                    정비기간
                  </Text>
                  <TextInput2
                    width={`150px`}
                    type="text"
                    value={
                      dayjs(mtInfo.dates.startMa).format("YYYY-MM-DD") || "-"
                    }
                    disabled
                  />
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`16px`}
                  >
                    ~
                  </Text>
                  <TextInput2
                    width={`150px`}
                    type="text"
                    value={
                      dayjs(mtInfo.dates.endMa).format("YYYY-MM-DD") || "-"
                    }
                    disabled
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    차량출고일
                  </Text>
                  <TextInput2
                    width={`150px`}
                    type="text"
                    value={
                      dayjs(mtInfo.dates.released).format("YYYY-MM-DD") || "-"
                    }
                    disabled
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    정비책임자
                  </Text>
                  <TextInput2
                    width={`100px`}
                    type="text"
                    value={props.tokenValue.uName}
                    readOnly
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`80px`}
                  >
                    정비구분
                  </Text>
                  <Combo
                    width={`150px`}
                    margin={`0px`}
                    value={mtInfo.costomerType}
                    disabled
                  >
                    <option value="n">일반</option>
                    <option value="i">보험</option>
                  </Combo>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`16px`}
                  ></Text>
                  <TextInput2
                    type="text"
                    width={`150px`}
                    placeholder={`보험사명 입력란`}
                    disabled
                  />
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  padding={`0px 0px 0px 10px`}
                >
                  <TextInput2
                    type="text"
                    width={`240px`}
                    placeholder={`보험번호 입력란`}
                    disabled
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    추가정비동의
                  </Text>
                  <Combo width={`100px`} margin={`0`} disabled>
                    <option value="1">동의</option>
                  </Combo>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`10px 0px`}>
              <Wrapper width={`auto`}>
                <Text fontSize={`20px`} color={`#314FA5`}>
                  정비내역
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  height={`40px`}
                  al={`center`}
                  margin={`0px 10px 0px 0px`}
                  width={`auto`}
                >
                  <Checkbox>
                    부가세 포함
                    <CheckInput
                      type="checkbox"
                      onChange={() => {
                        setTaxCheck(!taxCheck);
                      }}
                    />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} width={`170px`}>
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    onClick={() => {
                      setModalOption("part");
                      setModalOpen(true);
                    }}
                  >
                    부품조회
                  </SmallButton>
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    onClick={() => {
                      setModalOption("set");
                      setModalOpen(true);
                    }}
                  >
                    세트부품
                  </SmallButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <TableWrapper minHeight={`auto`}>
              <TableHead>
                <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
                <TableHeadLIST width={`15%`}>국토부</TableHeadLIST>
                <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
                <TableHeadLIST width={`15%`}>단가</TableHeadLIST>
                <TableHeadLIST width={`14%`}>수량</TableHeadLIST>
                <TableHeadLIST width={`14%`}>계</TableHeadLIST>
                <TableHeadLIST width={`8%`}>기술료</TableHeadLIST>
              </TableHead>
              <TableBody minHeight={`130px`}>
                {workList.map((data, idx) => {
                  return (
                    <TableRow key={idx} kindOf={`noHover`}>
                      <TableRowLIST width={`15%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 7] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 7)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 7)
                          }
                          value={data.name}
                        />
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 6] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 6)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 6)
                          }
                          value={data.tsCode}
                        />
                      </TableRowLIST>
                      <TableRowLIST width={`14%`}>
                        {/* <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 5] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 5)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 5)
                          }
                          value={data.type}
                        /> */}
                        <Combo
                          width={`800px`}
                          value={data.type}
                          name="type"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeInputArr(e, idx);
                          }}
                        >
                          {mainPartsTypeList.map((item: MainPartsType) => {
                            return (
                              <option key={item} value={item}>
                                {getStrMainPartsType(item)}
                              </option>
                            );
                          })}
                        </Combo>
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 4] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 4)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 4)
                          }
                          value={data.price}
                        />
                      </TableRowLIST>
                      <TableRowLIST width={`14%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 3] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 3)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 3)
                          }
                          value={data.quantity}
                        />
                      </TableRowLIST>
                      <TableRowLIST width={`14%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 2] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 2)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 2)
                          }
                          value={data.price * data.quantity}
                        />
                      </TableRowLIST>
                      <TableRowLIST width={`8%`}>
                        <TextInput2
                          type="text"
                          ref={(elem: HTMLInputElement) =>
                            (inputRef.current[(idx + 1) * 7 - 1] = elem)
                          }
                          width={`100%`}
                          onKeyDown={(e: KeyboardEvent) =>
                            onKeyDownhandler(e, (idx + 1) * 7 - 1)
                          }
                          onKeyUp={(e: KeyboardEvent) =>
                            onKeyUpHandler(e, (idx + 1) * 7 - 1)
                          }
                          value={data.wage}
                        />
                      </TableRowLIST>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableWrapper>
            <Wrapper dr={`row`} ju={`flex-end`}>
              <Text>부품계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>기술료계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>합계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>부가세 : 0</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text fontSize={`24px`}>
                총계 <ColorSpan color={`#314FA5`}>0</ColorSpan>
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <SmallButton
                form="carInfoForm"
                type="submit"
                kindOf={`default`}
                width={`100%`}
              >
                정비내역 수정
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
      <Modal
        isOpen={modalOpen}
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
          <CloseButton onClick={closeModal}>
            <IoIosCloseCircle />
          </CloseButton>
        </Wrapper>
        {modalOption === "part" ? (
          <MtPartsModal {...partsSetProps} />
        ) : (
          <MtSetModal {...partsSetProps} />
        )}
      </Modal>
    </WholeWrapper>
  );
};

export default MaintenanceStored;
