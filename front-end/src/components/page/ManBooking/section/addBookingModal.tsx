import {
  ColorSpan,
  CommonButton,
  CommonButtonWrapper,
  Text,
  CommonSmallTitle,
  SmallButton,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Combo,
} from "src/components/styles/CommonComponents";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import theme from "styles/theme";
import { _pBookingModalProps } from "src/configure/_pProps.entity";
import { useState } from "react";
import { Booking, MainHopeTime } from "src/models/booking.entity";
import { MainCar, MainCustomer } from "src/models/maintenance.entity";
import { useDispatch } from "react-redux";
import {
  _aGetMaintenancesCarInfo,
  _aPostBooking,
} from "store/action/user.action";
import { _iBookingOne, _iGetMaintenancesCarInfo } from "store/interfaces";
import { BookingState, bookingTimeList } from "src/constants/booking.const";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { comma, deleteKeyJson, hourList, trim } from "src/modules/commonModule";
import { basicRegEx, formRegEx } from "src/validation/regEx";

const AddBookingModal: NextPage<_pBookingModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const bookingInit: Partial<Booking> = {
    bookingDate: null,
    mainHopeDate: null,
    mainReContents: "",
    bookingState: BookingState.NEW,
  };
  const cusInit: MainCustomer = {
    name: "",
    phoneNumber: "",
  };
  const carInit: MainCar = {
    name: "",
    model: "",
    age: "",
    regDate: "",
    idNumber: "",
    regNumber: "",
    distance: "",
  };
  const mainHopeTimeInit: MainHopeTime = {
    hour: "",
    minute: "",
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [bookingInfo, setBookingInfo] = useState<Partial<Booking>>(bookingInit); // 예약 정보
  const [cusInfo, setCusInfo] = useState<MainCustomer>(cusInit); // 고객 정보
  const [carInfo, setCarInfo] = useState<MainCar>(carInit); // 차량 정보
  const [carExist, setCarExist] = useState<boolean>(false); // 차량 데이터 존재여부
  const [mainHopeTime, setMainHopeTime] =
    useState<MainHopeTime>(mainHopeTimeInit); // 예약 희망 시분
  // const [officeHour, setOfficeHour] = useState<any>(); // 선택 날짜의 영업시간
  // const [bookingTime, setBookingTime] = useState<string>(""); // 정비희망시간
  const [typingCheck, setTypingCheck] = useState<number>(0); //글자 수 제한

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 예약 input handler
   * @param e
   */
  const onBookingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
  };
  /**
   * 고객 input handler
   * @param e
   * @returns
   */
  const onCusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "cname":
        return setCusInfo({ ...cusInfo, name: trim(e.target.value) });

      case "phoneNumber":
        if (!basicRegEx.NUM.test(e.target.value)) return false;
        return setCusInfo({
          ...cusInfo,
          [e.target.name]: trim(e.target.value),
        });
      default:
        return setCusInfo({
          ...cusInfo,
          [e.target.name]: trim(e.target.value),
        });
    }
  };
  /**
   * 차량 input handler
   * @param e
   * @returns
   */
  const onCarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "distance":
        if (e.target.value.includes(","))
          e.target.value = e.target.value.replaceAll(",", "");
        if (!basicRegEx.NUM.test(e.target.value)) return false;

        return setCarInfo({
          ...carInfo,
          [e.target.name]: trim(e.target.value),
        });
      case "idNumber":
        if (
          e.target.value.length >= 18 ||
          !basicRegEx.ENGNUM.test(e.target.value)
        ) {
          return false;
        }
        var upper = e.target.value.toUpperCase();
        return setCarInfo({ ...carInfo, [e.target.name]: upper });

      default:
        return setCarInfo({
          ...carInfo,
          [e.target.name]: trim(e.target.value),
        });
    }
  };

  /**
   * 예약 희망 시분 input handler
   * @param e
   */
  const onMainHopeTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainHopeTime({ ...mainHopeTime, [e.target.name]: e.target.value });
  };

  /**
   * 차량 검색 handler
   */
  const onCarSearch = async () => {
    if (carInfo.regNumber === "") return false;
    await dispatch(_aGetMaintenancesCarInfo(carInfo.regNumber)).then(
      (res: _iGetMaintenancesCarInfo) => {
        if (!res.payload) return alert("신규차량입니다. 직접 입력해주세요.");
        setCarExist(true);
        clearErrors("name");
        clearErrors("age");
        clearErrors("idNumber");
        setValue("name", res.payload.name);
        setValue("age", res.payload.age);
        setValue("idNumber", res.payload.idNumber);
        setCarInfo(Object.assign(carInit, res.payload));
      },
      (err) => {
        alert("차량 조회 에러");
      }
    );
  };

  /**
   * 예약 등록 handler
   * @param data
   */
  const onBookingSubmit: SubmitHandler<Partial<Booking>> = async (data) => {
    const hopeDate: Date = dayjs(bookingInfo.mainHopeDate)
      .hour(Number(mainHopeTime.hour))
      .minute(Number(mainHopeTime.minute))
      .toDate();

    const bookingData: Partial<Booking> = {
      ...bookingInfo,
      mainHopeDate: hopeDate,
      car: carInfo,
      customer: cusInfo,
    };

    deleteKeyJson(bookingData);
    deleteKeyJson(bookingData.car);
    deleteKeyJson(bookingData.customer);

    await dispatch(_aPostBooking(bookingData)).then(
      (res: _iBookingOne) => {
        if (!res.payload) return alert("예약 등록 에러");
        props.setModalOpen(false);
        props.setReset(props.reset + 1);
      },
      (err) => {
        if (err) return alert("예약 등록 에러");
      }
    );
  };

  // /** 테스트 시간 */
  // let date = new Date();
  // let date2 = new Date();
  // let rest = new Date();
  // let rest2 = new Date();
  // date2.setHours(date2.getHours() + 6);
  // rest2.setHours(rest2.getHours() + 1);

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>신규 예약 등록</CommonSmallTitle>
      <form onSubmit={handleSubmit(onBookingSubmit)}>
        <Wrapper>
          <Wrapper
            borderBottom={`1px solid #c4c4c4`}
            al={`flex-start`}
            padding={`10px 0px`}
            margin={`0px 0px 10px`}
          >
            <Text color={theme.basicTheme_C} fontSize={`18px`}>
              예약정보
            </Text>
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              예약접수일자
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="date"
                value={
                  bookingInfo.bookingDate
                    ? dayjs(bookingInfo.bookingDate).format("YYYY-MM-DD")
                    : ""
                }
                {...register("bookingDate", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onBookingHandler(e);
                  },
                  required: {
                    value: true,
                    message: "예약접수일자를 선택하세요",
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          {errors.bookingDate?.type === "required" && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.bookingDate.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              정비희망일시
            </Text>
            <Wrapper
              width={`400px`}
              al={`flex-start`}
              dr={`row`}
              ju={`space-between`}
            >
              <TextInput2
                width={`212px`}
                type="date"
                value={
                  bookingInfo.mainHopeDate
                    ? dayjs(bookingInfo.mainHopeDate).format("YYYY-MM-DD")
                    : ""
                }
                {...register("mainHopeDate", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onBookingHandler(e);
                  },
                  required: true,
                })}
              />
              <Wrapper
                width={`168px`}
                border={`1px solid #ccc`}
                radius={theme.radius}
                dr={`row`}
              >
                <Combo
                  width={`80px`}
                  border={"none"}
                  value={mainHopeTime.hour}
                  {...register("hour", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onMainHopeTimeHandler(e);
                    },
                    required: true,
                  })}
                >
                  <option value="">시간</option>
                  {/* {bookingTimeList(date, date2).map((time, idx) => {
                    return (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    );
                  })} */}
                  {hourList().map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </Combo>
                <Text margin={`0px 4px`}>:</Text>
                <Combo
                  width={`80px`}
                  border={"none"}
                  value={mainHopeTime.minute}
                  {...register("minute", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onMainHopeTimeHandler(e);
                    },
                    required: true,
                  })}
                >
                  <option value="">분</option>
                  <option value="00">00</option>
                  <option value="30">30</option>
                </Combo>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {(errors.mainHopeDate?.type === "required" ||
            errors.hour?.type === "required" ||
            errors.minute?.type === "required") && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              정비희망일시를 선택하세요
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              고객전화번호
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={cusInfo.phoneNumber}
                {...register("phoneNumber", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCusHandler(e);
                  },
                  required: {
                    value: true,
                    message: "고객전화번호를 입력하세요",
                  },
                  pattern: {
                    value: formRegEx.HP_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          {(errors.phoneNumber?.type === "required" ||
            errors.phoneNumber?.type === "pattern") && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.phoneNumber.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              차량번호
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
                <TextInput2
                  width={`300px`}
                  type="text"
                  value={carInfo.regNumber}
                  readOnly={carExist}
                  {...register("regNumber", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onCarHandler(e);
                    },
                    required: {
                      value: true,
                      message: "차량번호를 입력하세요",
                    },
                    pattern: {
                      value: formRegEx.CAR_NUM,
                      message: "형식에 맞게 입력하세요",
                    },
                  })}
                />
                {carExist ? (
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    margin={`0px 0px 0px 20px`}
                    onClick={() => {
                      setCarInfo(carInit);
                      setCusInfo({ ...cusInfo, name: "" });
                      setCarExist(false);
                    }}
                  >
                    번호변경
                  </SmallButton>
                ) : (
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    margin={`0px 0px 0px 20px`}
                    onClick={onCarSearch}
                  >
                    번호검색
                  </SmallButton>
                )}
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {(errors.regNumber?.type === "required" ||
            errors.regNumber?.type === "pattern") && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.regNumber.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>정비요청내용</Text>
            <Wrapper width={`400px`} ju={`flex-start`} height={`80px`}>
              <TextArea
                padding={`10px`}
                width={`400px`}
                height={`150px`}
                al={`flex-start`}
                type="text"
                placeholder="100자 이하로 입력하세요."
                value={bookingInfo.mainReContents || ""}
                {...register("mainReContents", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length <= 100) {
                      onBookingHandler(e);
                      setTypingCheck(e.target.value.length);
                    }
                  },
                })}
              />
            </Wrapper>
            <Wrapper al={`flex-end`}>
              <Text textAlign={`right`}>({typingCheck}/100)</Text>
            </Wrapper>
          </Wrapper>
          <Wrapper
            borderBottom={`1px solid #c4c4c4`}
            al={`flex-start`}
            padding={`10px 0px`}
            margin={`0px 0px 10px`}
          >
            <Text color={theme.basicTheme_C} fontSize={`18px`}>
              차량정보
            </Text>
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>차량명
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={carInfo.name}
                readOnly={carExist}
                {...register("name", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                  required: {
                    value: true,
                    message: "차량명을 입력하세요",
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          {errors.name?.type === "required" && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.name.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>모델명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={carInfo.model}
                readOnly={carExist}
                {...register("model", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                })}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>연식</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={carInfo.age}
                readOnly={carExist}
                {...register("age", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                  pattern: {
                    value: basicRegEx.NUM,
                    message: "숫자만 입력하세요",
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          {errors.age?.type === "pattern" && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.age.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>차대번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={carInfo.idNumber || ""}
                readOnly={carExist}
                {...register("idNumber", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                  pattern: {
                    value: formRegEx.CAR_ID_NUM,
                    message: "형식에 맞게 입력하세요",
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          {errors.idNumber?.type === "pattern" && (
            <Text
              margin={`0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.idNumber.message}
            </Text>
          )}

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>등록일자</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="date"
                value={
                  carInfo.regDate
                    ? dayjs(carInfo.regDate).format("YYYY-MM-DD")
                    : ""
                }
                readOnly={carExist}
                {...register("regDate", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                })}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>주행거리</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={comma(carInfo.distance) || ""}
                {...register("distance", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCarHandler(e);
                  },
                })}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>고객명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                value={cusInfo.name || ""}
                {...register("cname", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onCusHandler(e);
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton
              kindOf={`circleWhite`}
              type="button"
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton kindOf={`circleTheme`} type="submit">
              저장
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default AddBookingModal;
