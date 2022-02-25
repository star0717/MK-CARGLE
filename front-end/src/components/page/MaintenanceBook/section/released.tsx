import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CloseButton,
  Combo,
  IconButton,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SmallButton,
  SpeechBubbleLeft,
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
import { AiFillCloseCircle, AiFillMinusSquare } from "react-icons/ai";
import {
  _pMaintenanceProps,
  _pPartsSetProps,
} from "src/configure/_pProps.entity";
import { FaFlagCheckered } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { basicRegEx } from "src/validation/regEx";
import { _aPatchMaintenancesRelease } from "store/action/user.action";
import {
  _iGetMaintenancesCarInfo,
  _iMaintenances,
  _iMaintenancesOne,
} from "store/interfaces";
import {
  getStrMainCustomerType,
  getStrMainPartsType,
  mainCustomerTypeList,
  MainPartsType,
  mainPartsTypeList,
} from "src/constants/maintenance.const";
import {
  Maintenance,
  MainPrice,
  MainWork,
} from "src/models/maintenance.entity";
import { maskingStr } from "src/modules/commonModule";
import { PartsSet } from "src/models/partsset.entity";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import MtPartsModal from "./partsModal";
import MtSetModal from "./setModal";
import { Part } from "src/models/part.entity";
import dayjs from "dayjs";
import { GoCheck } from "react-icons/go";
import DocumentModal from "./documentModal";
import MolitModal from "./molitModal";
import PaymentModal from "./paymentModal";

const MaintenanceReleased: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /**작업내용 초기값 */
  const workInit: MainWork[] = [
    {
      name: "",
      code: "",
      tsCode: "",
      type: MainPartsType.A,
      price: 0,
      quantity: 0,
      sum: 0,
      wage: 0,
    },
  ];
  /**input태그연결 */
  let inputRef = useRef<HTMLInputElement[]>([]);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 창 옵션
  const [mtInfo, setMtInfo] = useState<Maintenance>(props.data.mtData); // 해당 정비내역 정보
  const [partSetClass, setPartSetClass] = useState<Partial<PartsSet>[]>(
    props.data.setList.docs
  ); // 전체 세트 항목
  const [partSetData, setPartSetData] = useState<Partial<PartsSet>>(
    partSetClass[0]
  ); // 선택한 세트 데이터
  const [cellCount, setCellCount] = useState<number>(7); // 행 갯수
  const [workList, setWorkList] = useState<MainWork[]>(props.data.mtData.works); // 부품 리스트
  const [price, setPrice] = useState<MainPrice>(props.data.mtData.price); // 가격정보
  const [modify, setModify] = useState<boolean>(true);
  const [mCancel, setMCancle] = useState<boolean>(false);

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

  /**
   * 수정 취소시 Re Rendering
   */
  useEffect(() => {
    setWorkList(props.data.mtData.works);
    setPrice(props.data.mtData.price);
    setMtInfo(props.data.mtData);
  }, [mCancel]);

  /**
   * 정비내역 변경 시 일어나는 event handler
   * cell 증가, 합계 계산
   */
  useEffect(() => {
    setCellCount(workList.length * 7);

    let partsSum = 0;
    let wageSum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let vat = 0;

    for (let i = 0; i < workList.length; i++) {
      partsSum += workList[i].price * workList[i].quantity;
      wageSum += workList[i].wage;
      sum1 += workList[i].price * workList[i].quantity + workList[i].wage;
    }
    sum2 = price.isIncluded ? sum1 / 1.1 : sum1;
    vat = price.isIncluded ? sum2 * 0.1 : sum1 * 0.1;

    setPrice({
      ...price,
      partsSum: partsSum,
      wageSum: wageSum,
      sum: Math.round(Number(sum2.toString())),
      vat: Math.round(Number(vat.toString())),
      total: Number((sum2 + vat).toString()),
    });
  }, [workList, price.isIncluded]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * keyup event handler
   * @param e
   * @param idx
   */
  const onKeyUpHandler = (e: KeyboardEvent, idx: number) => {
    if (e.key === "Enter") {
      if (idx % 7 === 0) return inputRef.current[idx + 2].focus();
      if (idx % 7 === 4) return inputRef.current[idx + 2].focus();
      return inputRef.current[idx + 1].focus();
    }
  };

  /**
   * keydown event handler
   * @param e
   * @param idx
   */
  const onKeyDownhandler = (e: KeyboardEvent, idx: number) => {
    if (e.key === "Enter") {
      if (idx === cellCount - 1) {
        setWorkList(workList.concat(workInit));
      }
    }
  };

  /**
   * 정비내용 handler
   * @param e
   */
  const onChangeMaintenance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMtInfo({ ...mtInfo, [e.target.name]: e.target.value });
  };

  /**
   * 정비내역 input handler
   * @param e
   * @param idx
   */
  const onChangeInputArr = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIdx: number,
    cellIdx?: number
  ) => {
    switch (e.target.name) {
      case "name":
        const partOne: Part[] = props.data.allParts.docs.filter(
          (item: Part) =>
            e.target.value === item.name ||
            item.nickName.includes(e.target.value)
        );
        return setWorkList(
          workList.map((item, index) =>
            index === rowIdx
              ? {
                  ...item,
                  name: e.target.value,
                  code: partOne[0]?.code,
                  tsCode: partOne[0]?.tsCode || "",
                }
              : item
          )
        );
      case "price":
      case "quantity":
      case "wage":
        e.target.value = e.target.value.replaceAll(",", "");
        if (e.target.value === "" || !basicRegEx.NUM.test(e.target.value)) {
          return setWorkList(
            workList.map((item, index) =>
              index === rowIdx
                ? {
                    ...item,
                    [e.target.name]: 0,
                    sum:
                      e.target.name === "price"
                        ? Number(e.target.value) * item.quantity
                        : e.target.name === "quantity"
                        ? item.price * Number(e.target.value)
                        : item.price * item.quantity,
                  }
                : item
            )
          );
        } else {
          return setWorkList(
            workList.map((item, index) =>
              index === rowIdx
                ? {
                    ...item,
                    [e.target.name]: Number(e.target.value),
                    sum:
                      e.target.name === "price"
                        ? Number(e.target.value) * item.quantity
                        : e.target.name === "quantity"
                        ? item.price * Number(e.target.value)
                        : item.price * item.quantity,
                  }
                : item
            )
          );
        }
      default:
        setWorkList(
          workList.map((item, index) =>
            index === rowIdx
              ? { ...item, [e.target.name]: e.target.value }
              : item
          )
        );
        return inputRef.current[cellIdx + 1].focus();
    }
  };

  /**
   * 열 삭제 handler
   * @param idx
   */
  const onDeleteRowHandler = (idx: number) => {
    if (workList.length > 1) {
      setWorkList(workList.filter((data, index) => idx !== index));
    }
  };

  /**
   * 정비내역 수정
   */
  const onModifyWorkInfo = async () => {
    let mainWorkList: MainWork[] = workList.filter((item) => item.name !== "");
    mainWorkList = mainWorkList.map((item) => {
      for (let i = 0; i < props.data.allParts.docs.length; i++) {
        if (props.data.allParts.docs[i].nickName.includes(item.name))
          return { ...item, name: props.data.allParts.docs[i].name };
      }
      return item;
    });
    const maintenanceData: Partial<Maintenance> = {
      ...mtInfo,
      workerName: props.tokenValue.uName,
      works: mainWorkList,
      price: price,
    };
    if (maintenanceData.works.length === 0)
      return alert("정비내역을 추가해주세요.");
    await dispatch(
      _aPatchMaintenancesRelease(maintenanceData._id, maintenanceData)
    ).then(
      (res: _iMaintenancesOne) => {
        alert("정비내역을 저장했습니다.");
        setModify(!modify);
      },
      (err) => {
        alert("정비내역 저장에 실패했습니다.");
      }
    );
  };

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
  console.log(props);
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper>
          {/* <Wrapper
            padding={`20px`}
            width={`400px`}
            margin={`0px 0px 10px 600px`}
            al={`flex-start`}
          >
            <SpeechBubbleRight fontSize={`20px`}>
              "현재 정비 단계는 출고완료입니다."
            </SpeechBubbleRight>
          </Wrapper> */}
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
                {/* <IconButton
                  type="button"
                  shadow={`none`}
                  onClick={() => {
                    router.push(`${UseLink.MAINTENANCE_BOOK}?step=c`);
                  }}
                >
                  <AiFillCloseCircle />
                </IconButton> */}
              </Wrapper>
            </Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              margin={`10px 0px 0px 0px`}
              padding={`10px 20px`}
            >
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  주행거리
                </Text>
                <TextInput2
                  type="text"
                  width={`180px`}
                  value={mtInfo.car.distance}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  고객명
                </Text>
                <TextInput2
                  width={`180px`}
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
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  전화번호
                </Text>
                <TextInput2
                  width={`180px`}
                  type="text"
                  value={mtInfo.customer.phoneNumber}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  차량명
                </Text>
                <TextInput2
                  type="text"
                  width={`180px`}
                  value={mtInfo.car.name}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  모델명
                </Text>
                <TextInput2
                  width={`180px`}
                  type="text"
                  value={mtInfo.car.model || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  연식
                </Text>
                <TextInput2
                  width={`180px`}
                  type="text"
                  value={mtInfo.car.age || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  차대번호
                </Text>
                <TextInput2
                  width={`180px`}
                  type="text"
                  value={mtInfo.car.idNumber || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} padding={`10px 0px`} ju={`space-between`}>
                <Text
                  width={`100px`}
                  textAlign={`right`}
                  margin={`0px 10px 0px 0px`}
                >
                  등록일자
                </Text>
                <TextInput2
                  width={`180px`}
                  type="text"
                  value={mtInfo.car.regDate || "-"}
                  readOnly
                />
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0px`}>
                <SmallButton type="button" width={`48%`} kindOf={`default`}>
                  정비요청사항
                </SmallButton>
                <SmallButton type="button" width={`48%`} kindOf={`default`}>
                  차량정보공유
                </SmallButton>
              </Wrapper>
              <Wrapper>
                <SmallButton type="button" width={`100%`} kindOf={`default`}>
                  정비사진확인
                </SmallButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper width={`74%`}>
            <Wrapper height={`80px`} al={`flex-end`} ju={`flex-end`}>
              <Wrapper dr={`row`} ju={`space-between`} width={`350px`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    router.push(UseLink.MAINTENANCE_BOOK);
                  }}
                >
                  목록으로🖕🏿
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    setModalOption("Btdocument");
                    setModalOpen(!modalOpen);
                  }}
                >
                  서류발급
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    setModalOption("Btmolit");
                    setModalOpen(!modalOpen);
                  }}
                >
                  국토부
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    setModalOption("Btpayment");
                    setModalOpen(!modalOpen);
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
                      mtInfo.dates.startMa
                        ? dayjs(mtInfo.dates.startMa).format("YYYY-MM-DD")
                        : "-"
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
                      mtInfo.dates.endMa
                        ? dayjs(mtInfo.dates.endMa).format("YYYY-MM-DD")
                        : "-"
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
                      mtInfo.dates.released
                        ? dayjs(mtInfo.dates.released).format("YYYY-MM-DD")
                        : "-"
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
                    name="costomerType"
                    onChange={onChangeMaintenance}
                    disabled={modify}
                  >
                    {mainCustomerTypeList.map((type) => {
                      return (
                        <option key={type} value={type}>
                          {getStrMainCustomerType(type)}
                        </option>
                      );
                    })}
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
                    readOnly
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
                    readOnly
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
                  <Checkbox cursor={modify ? `default` : `pointer`}>
                    부가세 포함
                    <CheckInput
                      type="checkbox"
                      checked={price.isIncluded}
                      cursor={modify ? `default` : `pointer`}
                      disabled={modify}
                      onChange={() => {
                        setPrice({ ...price, isIncluded: !price.isIncluded });
                      }}
                    />
                    <CheckMark
                      cursor={modify ? `default` : `pointer`}
                    ></CheckMark>
                  </Checkbox>
                </Wrapper>
                {modify ? (
                  <Wrapper dr={`row`} ju={`space-between`} width={`170px`}>
                    <SmallButton type="button" kindOf={`ghost`}>
                      부품조회
                    </SmallButton>
                    <SmallButton type="button" kindOf={`ghost`}>
                      세트부품
                    </SmallButton>
                  </Wrapper>
                ) : (
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
                )}
              </Wrapper>
            </Wrapper>
            <TableWrapper minHeight={`auto`}>
              <TableHead padding={`0px 0px 0px 10px`}>
                <TableHeadLIST width={`3%`}></TableHeadLIST>
                <TableHeadLIST width={`14%`}>작업내용</TableHeadLIST>
                <TableHeadLIST width={`12%`}>국토부</TableHeadLIST>
                <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
                <TableHeadLIST width={`14%`}>단가</TableHeadLIST>
                <TableHeadLIST width={`10%`}>수량</TableHeadLIST>
                <TableHeadLIST width={`14%`}>계</TableHeadLIST>
                <TableHeadLIST width={`14%`}>기술료</TableHeadLIST>
              </TableHead>
              <Wrapper overflow={`auto`} height={`262px`}>
                <TableBody minHeight={`262px`}>
                  {workList.map((data, idx) => {
                    return (
                      <TableRow
                        key={idx}
                        kindOf={`noHover`}
                        padding={`0px 0px 0px 10px`}
                      >
                        <TableRowLIST width={`3%`}>
                          <IconButton
                            type="button"
                            shadow={`none`}
                            bgColor={`inherit`}
                            color={`#d6263b`}
                            padding={`0px`}
                            isDisplayNone={modify}
                            onClick={() => {
                              onDeleteRowHandler(idx);
                            }}
                          >
                            <AiFillMinusSquare />
                          </IconButton>
                        </TableRowLIST>
                        <TableRowLIST width={`14%`}>
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
                            readOnly={modify}
                            name="name"
                            list="workList"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeInputArr(e, idx);
                            }}
                          />
                          <datalist id="workList">
                            {props.data.allParts.docs.map(
                              (item: Part, idx: number) => {
                                return (
                                  <Wrapper key={idx}>
                                    {item.nickName.length >= 1 ? (
                                      item.nickName.map(
                                        (nickname: string, iidx: number) => {
                                          return (
                                            <option
                                              key={`${idx}.${iidx}`}
                                              label={nickname}
                                              value={item.name}
                                            />
                                          );
                                        }
                                      )
                                    ) : (
                                      <option
                                        key={idx}
                                        label={item.nickName[0]}
                                        value={item.name}
                                      />
                                    )}
                                  </Wrapper>
                                );
                              }
                            )}
                          </datalist>
                        </TableRowLIST>
                        <TableRowLIST width={`12%`}>
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
                            name="tsCode"
                            readOnly
                          />
                        </TableRowLIST>
                        <TableRowLIST width={`14%`}>
                          <Combo
                            width={`100%`}
                            value={data.type}
                            disabled={modify}
                            ref={(elem: HTMLInputElement) =>
                              (inputRef.current[(idx + 1) * 7 - 5] = elem)
                            }
                            name="type"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeInputArr(e, idx, (idx + 1) * 7 - 5);
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
                        <TableRowLIST width={`14%`}>
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
                            value={data.price.toLocaleString()}
                            readOnly={modify}
                            name="price"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeInputArr(e, idx);
                            }}
                          />
                        </TableRowLIST>
                        <TableRowLIST width={`10%`}>
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
                            value={data.quantity.toLocaleString()}
                            readOnly={modify}
                            name="quantity"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeInputArr(e, idx);
                            }}
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
                            value={data.sum.toLocaleString()}
                            name="inputSum"
                            readOnly
                          />
                        </TableRowLIST>
                        <TableRowLIST width={`14%`}>
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
                            value={data.wage.toLocaleString()}
                            readOnly={modify}
                            name="wage"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeInputArr(e, idx);
                            }}
                          />
                        </TableRowLIST>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Wrapper>
            </TableWrapper>
            <Wrapper dr={`row`} ju={`flex-end`}>
              <Text>부품계 : {price.partsSum.toLocaleString()}</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>기술료계 : {price.wageSum.toLocaleString()}</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>과세액 : {price.sum.toLocaleString()}</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>부가세 : {price.vat.toLocaleString()}</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text fontSize={`24px`}>총계</Text>
              <Text
                fontSize={`24px`}
                fontWeight={`800`}
                color={`#314FA5`}
                margin={`0px 10px`}
              >
                {price.total.toLocaleString()}
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              {modify ? (
                <SmallButton
                  form="carInfoForm"
                  type="button"
                  kindOf={`default`}
                  width={`100%`}
                  onClick={() => {
                    setModify(!modify);
                  }}
                >
                  정비내역 수정
                </SmallButton>
              ) : (
                <Wrapper dr={`row`} ju={`space-between`} width={`888px`}>
                  <SmallButton
                    type="button"
                    width={`439px`}
                    kindOf={`default`}
                    onClick={() => {
                      setModify(!modify);
                      setMCancle(!mCancel);
                    }}
                  >
                    수정 취소
                  </SmallButton>
                  <SmallButton
                    type="button"
                    width={`439px`}
                    kindOf={`default`}
                    onClick={() => {
                      onModifyWorkInfo();
                    }}
                  >
                    수정 완료
                  </SmallButton>
                </Wrapper>
              )}
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
        {console.log(modalOption)}
        {modalOption.indexOf("document") ? (
          <DocumentModal {...partsSetProps} />
        ) : modalOption.indexOf("molit") ? (
          <MolitModal {...partsSetProps} />
        ) : (
          <PaymentModal {...partsSetProps} />
        )}
      </Modal>
    </WholeWrapper>
  );
};

export default MaintenanceReleased;
