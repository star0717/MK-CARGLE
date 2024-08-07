import React, { useEffect, useState } from "react";
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
  TableBody,
  TableHead,
  TableHeadLIST,
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
import { FaCarAlt, FaFlagCheckered } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";
import { RiFileList2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { basicRegEx, formRegEx } from "src/validation/regEx";
import {
  _aGetBooking,
  _aGetMaintenancesCarInfo,
  _aPatchBooking,
  _aPostMaintenancesStore,
} from "store/action/user.action";
import {
  _iBooking,
  _iBookingOne,
  _iGetMaintenancesCarInfo,
  _iMaintenances,
  _iMaintenancesOne,
} from "store/interfaces";
import { MainStatus } from "src/constants/maintenance.const";
import {
  MainCar,
  MainCustomer,
  Maintenance,
} from "src/models/maintenance.entity";
import { deleteKeyJson, trim } from "src/modules/commonModule";
import { Booking, BookingFindOptions } from "src/models/booking.entity";
import { BookingState } from "src/constants/booking.const";
import { FindParameters } from "src/models/base.entity";
import dayjs from "dayjs";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { _pMainBookingModalProps } from "src/configure/_pProps.entity";
import BookingListModal from "./bookingListModal";
import { CarSearch } from "src/configure/_props.entity";

const MaintenanceCreate: NextPage = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // 차량 조회 초기값
  const carInit: MainCar = {
    name: "",
    model: "",
    age: "",
    regDate: "",
    idNumber: "",
    regNumber: "",
    distance: "",
  };
  const cusInit: MainCustomer = {
    name: "",
    phoneNumber: "",
  };
  const bookingInit: Partial<Booking> = {
    mainHopeDate: null,
    mainReContents: "",
    bookingState: BookingState.NEW,
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchCarText, setSearchCarText] = useState<string>("");
  const [carInfo, setCarInfo] = useState<MainCar>(carInit); // 차량정보
  const [cusInfo, setCusInfo] = useState<MainCustomer>(cusInit); // 고객정보
  const [showCar, setShowCar] = useState<boolean>(false); // 차량검색 후 정보표시
  const [bookingInfo, setBookingInfo] = useState<Partial<Booking>>(bookingInit); // 예약 정보
  const [bookingList, setBookingList] = useState<Booking[]>([]);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /** URL 쿼리에 차량번호가 있을 경우(예약관리에서 넘어온 경우) */
  useEffect(() => {
    if (router.query.regNumber) {
      const regNum = router.query.regNumber as string;
      setSearchCarText(regNum);
      onSearchCarHandler({ regNumQuery: regNum });
    }
  }, [router.query.regNumber]);

  /**
   * 차량정보 input
   * @param e
   */
  const onChangeCarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "distance") {
      if (!basicRegEx.NUM.test(e.target.value)) return false;
    }
    if (e.target.name === "idNumber") {
      if (
        e.target.value.length >= 18 ||
        !basicRegEx.ENGNUM.test(e.target.value)
      ) {
        return false;
      }
      var upper = e.target.value.toUpperCase();
      return setCarInfo({ ...carInfo, [e.target.name]: upper });
    }
    setCarInfo({ ...carInfo, [e.target.name]: trim(e.target.value) });
  };

  /**
   * 차량 정보 리셋 handler
   */
  const onResetCar = () => {
    setCarInfo(carInit);
    setCusInfo(cusInit);
    setBookingInfo(bookingInit);
    setBookingList([]);
    setShowCar(false);
    setSearchCarText("");
    reset();
  };

  /**
   * 차량 조회 handler
   * @param data
   */
  const onSearchCarHandler: SubmitHandler<Partial<CarSearch>> = async (
    data
  ) => {
    if (!data.regNumQuery) {
      const param: FindParameters = {
        filterKey: "bookingState",
        filterValue: BookingState.APPROVAL,
      };
      const option: BookingFindOptions = {
        regNumber: searchCarText,
        mainHopeDate: dayjs().toDate(),
      };
      await dispatch(_aGetBooking(param, option)).then(
        (res: _iBooking) => {
          if (!res.payload) return alert("차량 예약 조회 에러");
          if (res.payload.totalDocs === 0) return setBookingInfo(bookingInit);
          alert("오늘 정비예약한 차량입니다.");
          setBookingInfo(res.payload.docs[0]);
        },
        (err) => {
          return alert("차량 예약 조회 에러");
        }
      );
    }
    let searchText: string;
    data.regNumQuery
      ? (searchText = data.regNumQuery)
      : (searchText = searchCarText);

    await dispatch(_aGetMaintenancesCarInfo(searchText)).then(
      (res: _iGetMaintenancesCarInfo) => {
        if (res.payload) {
          setCarInfo(Object.assign(carInit, res.payload));
        } else {
          setCarInfo(carInit);
        }
        setShowCar(true);
      },
      (err) => {
        alert("차량번호 조회에 실패했습니다.");
        onResetCar();
      }
    );
  };

  /**
   * 차량 입고 handler
   * @param data
   */
  const onCarStoredHandler: SubmitHandler<Partial<Maintenance>> = async (
    data
  ) => {
    let maintenanceData: Partial<Maintenance> = {
      car: { ...carInfo, regNumber: searchCarText },
      customer: { ...cusInfo },
    };
    deleteKeyJson(maintenanceData.car);
    deleteKeyJson(maintenanceData.customer);

    await dispatch(_aPostMaintenancesStore(maintenanceData)).then(
      async (res: _iMaintenancesOne) => {
        if (!res.payload) return alert("차량 입고에 실패했습니다.");
        if (bookingInfo.car) {
          const bookingData: Partial<Booking> = {
            bookingState: BookingState.MAINTENANCE,
          };
          await dispatch(_aPatchBooking(bookingInfo._id, bookingData)).then(
            (res: _iBookingOne) => {
              if (!res.payload) return alert("예약 정비상태 에러");
            },
            (err) => {
              if (err) return alert("예약 정비상태 에러");
            }
          );
        }
        router.push(
          `${UseLink.MAINTENANCE_BOOK}?id=${res.payload._id}&step=${MainStatus.STORED}`
        );
      },
      (err) => {
        alert("차량 입고에 실패했습니다.");
      }
    );
  };

  /**
   * 당일 예약 목록 불러오기
   */
  const getTodayBooking = async () => {
    let params: FindParameters = {
      take: 10,
      sFrom: dayjs().startOf("day").toDate(),
      sTo: dayjs().endOf("day").toDate(),
    };
    let opt: any = {
      bookingState: BookingState.APPROVAL,
    };
    await dispatch(_aGetBooking(params, opt)).then(
      (res: _iBooking) => {
        setBookingList(res.payload.docs);
        setModalOpen(true);
      },
      (err) => {
        if (err) return alert("당일 예약 목록 에러");
      }
    );
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const bookingListModalProps: _pMainBookingModalProps = {
    setModalOpen,
    bookingList,
    onSearchCarHandler,
    setSearchCarText,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper>
          {/* <Wrapper
            padding={`20px`}
            margin={`0px 0px 10px 360px`}
            al={`flex-start`}
          >
            <SpeechBubbleLeft fontSize={`20px`}>
              "차량선택 후 차량입고를 해주세요"
            </SpeechBubbleLeft>
          </Wrapper> */}
          <JoinStepBarWrapper padding={`0px 0px 50px`}>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`progress`}>
                <RiFileList2Fill />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량선택
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <FaCarAlt />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량입고
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>{<TiSpanner />}</JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비중
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={"line2"}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <BsFillFileEarmarkCheckFill />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비완료
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <FaFlagCheckered />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                출고완료
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
          <Wrapper width={`27%`}>
            {showCar ? (
              <Wrapper height={`80px`} ju={`flex-end`}>
                <Wrapper
                  dr={`row`}
                  fontSize={`24px`}
                  border={`1px solid #ccc`}
                  padding={`10px 0px`}
                >
                  <Text fontSize={`24px`}>{searchCarText}</Text>
                  <IconButton
                    type="button"
                    shadow={`none`}
                    onClick={onResetCar}
                  >
                    <AiFillCloseCircle />
                  </IconButton>
                </Wrapper>
              </Wrapper>
            ) : (
              <Wrapper height={`80px`} al={`flex-end`}>
                <form onSubmit={handleSubmit(onSearchCarHandler)}>
                  <SearchInputWrapper
                    type="text"
                    width={`100%`}
                    dr={`row`}
                    borderBottom={`1px solid #000`}
                    al={`space-between`}
                  >
                    <Wrapper>
                      <SearchInput
                        width={`290px`}
                        placeholder="차량번호를 입력하세요."
                        type="text"
                        value={searchCarText}
                        {...register("searchCarText", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSearchCarText(e.target.value);
                          },
                          required: {
                            value: true,
                            message: "차량번호를 입력하세요.",
                          },
                          pattern: {
                            value: formRegEx.CAR_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper width={`36px`} height={`46px`}>
                      <IconButton type="submit" shadow={`none`}>
                        <BsSearch />
                      </IconButton>
                    </Wrapper>
                  </SearchInputWrapper>
                  {(errors.searchCarText?.type === "required" ||
                    errors.searchCarText?.type === "pattern") && (
                    <Text
                      margin={`0px`}
                      width={`100%`}
                      color={`#d6263b`}
                      al={`flex-start`}
                      fontSize={`14px`}
                      textAlign={`left`}
                    >
                      {errors.searchCarText.message}
                    </Text>
                  )}
                </form>
              </Wrapper>
            )}
            <Wrapper
              border={`1px solid #ccc`}
              margin={`10px 0px 0px 0px`}
              padding={`0px 10px`}
              height={`610px`}
            >
              {showCar ? (
                <form
                  id="carInfoForm"
                  onSubmit={handleSubmit(onCarStoredHandler)}
                >
                  <Wrapper height={`570px`} ju={`space-between`}>
                    <Wrapper>
                      <Wrapper dr={`row`} ju={`space-between`}>
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          <ColorSpan color={`#d6263b`}>*</ColorSpan>
                          주행거리
                        </Text>
                        <TextInput2
                          type="text"
                          value={carInfo.distance}
                          placeholder="주행거리(km)"
                          {...register("distance", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                            required: {
                              value: true,
                              message: "필수 입력사항입니다.",
                            },
                            pattern: {
                              value: basicRegEx.NUM,
                              message: "형식에 맞게 입력하세요.",
                            },
                          })}
                        />
                      </Wrapper>
                      {(errors.distance?.type === "required" ||
                        errors.distance?.type === "pattern") && (
                        <Text
                          margin={`0px -184px 0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.distance.message}
                        </Text>
                      )}
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          고객명
                        </Text>
                        <TextInput2
                          type="text"
                          value={cusInfo.name || ""}
                          {...register("cusName", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCusInfo({
                                ...cusInfo,
                                name: trim(e.target.value),
                              });
                            },
                          })}
                        />
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          <ColorSpan color={`#d6263b`}>*</ColorSpan>
                          전화번호
                        </Text>
                        <TextInput2
                          type="text"
                          value={cusInfo.phoneNumber}
                          {...register("phoneNumber", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (!basicRegEx.NUM.test(e.target.value))
                                return false;
                              setCusInfo({
                                ...cusInfo,
                                phoneNumber: trim(e.target.value).replaceAll(
                                  "-",
                                  ""
                                ),
                              });
                            },
                            required: {
                              value: true,
                              message: "필수 입력사항입니다.",
                            },
                            pattern: {
                              value: formRegEx.HP_NUM,
                              message: "형식에 맞게 입력하세요.",
                            },
                          })}
                        />
                      </Wrapper>
                      {(errors.phoneNumber?.type === "required" ||
                        errors.phoneNumber?.type === "pattern") && (
                        <Text
                          margin={`0px -184px 0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.phoneNumber.message}
                        </Text>
                      )}
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          <ColorSpan color={`#d6263b`}>*</ColorSpan>
                          차량명
                        </Text>
                        <TextInput2
                          type="text"
                          value={carInfo.name}
                          {...register("name", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                            required: {
                              value: true,
                              message: "필수 입력사항입니다.",
                            },
                          })}
                        />
                      </Wrapper>
                      {errors.name?.type === "required" && (
                        <Text
                          margin={`0px -184px 0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.name.message}
                        </Text>
                      )}
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          모델명
                        </Text>
                        <TextInput2
                          type="text"
                          value={carInfo.model || ""}
                          {...register("model", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                          })}
                        />
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          연식
                        </Text>
                        <TextInput2
                          type="text"
                          value={carInfo.age || ""}
                          {...register("age", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                          })}
                        />
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          차대번호
                        </Text>
                        <TextInput2
                          type="text"
                          value={carInfo.idNumber || ""}
                          {...register("idNumber", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                            pattern: {
                              value: formRegEx.CAR_ID_NUM,
                              message: "형식에 맞게 입력하세요.",
                            },
                          })}
                        />
                      </Wrapper>
                      {errors.idNumber?.type === "pattern" && (
                        <Text
                          margin={`0px -184px 0px 0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.idNumber.message}
                        </Text>
                      )}
                      <Wrapper
                        dr={`row`}
                        padding={`10px 0px 0px 0px`}
                        ju={`space-between`}
                      >
                        <Text
                          width={`80px`}
                          textAlign={`right`}
                          margin={`0px 10px 0px 0px`}
                        >
                          등록일자
                        </Text>
                        <TextInput2
                          width={`189px`}
                          type="date"
                          value={carInfo.regDate || ""}
                          {...register("regDate", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChangeCarInfo(e);
                            },
                          })}
                        />
                      </Wrapper>
                    </Wrapper>
                    <Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`space-between`}
                        padding={`10px 0px`}
                      >
                        <SmallButton
                          type="button"
                          width={`48%`}
                          kindOf={`ghost`}
                        >
                          정비요청사항
                        </SmallButton>
                        <SmallButton
                          type="button"
                          width={`48%`}
                          kindOf={`ghost`}
                        >
                          차량정보공유
                        </SmallButton>
                      </Wrapper>
                      <Wrapper>
                        <SmallButton
                          type="button"
                          width={`100%`}
                          kindOf={`ghost`}
                        >
                          정비사진확인
                        </SmallButton>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </form>
              ) : (
                <Wrapper padding={`50% 20px`}>
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    onClick={getTodayBooking}
                  >
                    오늘 예약목록 불러오기
                  </SmallButton>
                  <Text fontSize={`36px`} color={`#c4c4c4`}>
                    <BsPlusCircleFill />
                  </Text>
                  <Text>
                    선택된 차량이 없습니다 <br />
                    차량 선택 후 정비등록을 진행할 수 있습니다.
                  </Text>
                </Wrapper>
              )}
            </Wrapper>
          </Wrapper>

          <Wrapper width={`72%`}>
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
              </Wrapper>
            </Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              padding={`10px`}
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
                    value={"-"}
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
                    value={"-"}
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
                    value={"-"}
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
                    value={"-"}
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
                  <Combo width={`150px`} margin={`0px`} disabled>
                    <option value="n">일반</option>
                  </Combo>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`16px`}
                  ></Text>
                  <TextInput2
                    type="text"
                    width={`150px`}
                    placeholder={`보험사명`}
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
                    placeholder={`보험번호`}
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
                  <Checkbox cursor={`default`}>
                    부가세 포함
                    <CheckInput type="checkbox" cursor={`default`} disabled />
                    <CheckMark cursor={`default`}></CheckMark>
                  </Checkbox>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} width={`170px`}>
                  <SmallButton type="button" kindOf={`ghost`} disabled>
                    부품조회
                  </SmallButton>
                  <SmallButton type="button" kindOf={`ghost`} disabled>
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
              <TableBody minHeight={`289px`}></TableBody>
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
                총계{" "}
                <ColorSpan color={`#314FA5`} fontSize={`24px`}>
                  0
                </ColorSpan>
              </Text>
            </Wrapper>
            <Wrapper>
              <SmallButton
                form="carInfoForm"
                type="submit"
                kindOf={showCar ? `default` : `ghost`}
                disabled={showCar ? false : true}
                width={`100%`}
              >
                차량입고
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper></Wrapper>
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
            width: "500px",
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
        <BookingListModal {...bookingListModalProps} />
      </Modal>
    </WholeWrapper>
  );
};

export default MaintenanceCreate;
