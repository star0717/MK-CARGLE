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
import { basicRegEx } from "src/validation/regEx";

const AddBookingModal: NextPage<_pBookingModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

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
  const [officeHour, setOfficeHour] = useState<any>(); // 선택 날짜의 영업시간
  const [bookingTime, setBookingTime] = useState<string>(""); // 정비희망시간

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 예약 input handler
   * @param e
   */
  const onBookingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "mainReContents" && e.target.value.length > 100)
      return false;
    setBookingInfo({ ...bookingInfo, [e.target.name]: e.target.value });
  };
  /**
   * 고객 input handler
   * @param e
   * @returns
   */
  const onCusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phoneNumber" && !basicRegEx.NUM.test(e.target.value))
      return false;
    setCusInfo({ ...cusInfo, [e.target.name]: trim(e.target.value) });
  };
  /**
   * 차량 input handler
   * @param e
   * @returns
   */
  const onCarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "distance") {
      e.target.value = e.target.value.replaceAll(",", "");
      if (!basicRegEx.NUM.test(e.target.value)) return false;
    }
    // return false;
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
        setCarInfo(Object.assign(carInit, res.payload));
      },
      (err) => {
        alert("차량 조회 에러");
      }
    );
  };

  /**
   * 예약 등록 handler
   * @param e
   */
  const onBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteKeyJson(bookingInfo);
    deleteKeyJson(carInfo);
    deleteKeyJson(cusInfo);

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
      <form onSubmit={onBookingSubmit}>
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
                name="bookingDate"
                type="date"
                value={
                  bookingInfo.bookingDate
                    ? dayjs(bookingInfo.bookingDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={onBookingHandler}
                required
              />
            </Wrapper>
          </Wrapper>

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
                name="mainHopeDate"
                value={
                  bookingInfo.mainHopeDate
                    ? dayjs(bookingInfo.mainHopeDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={onBookingHandler}
                required
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
                  name="hour"
                  value={mainHopeTime.hour}
                  onChange={onMainHopeTimeHandler}
                  required
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
                  name="minute"
                  value={mainHopeTime.minute}
                  onChange={onMainHopeTimeHandler}
                  required
                >
                  <option value="">분</option>
                  <option value="00">00</option>
                  <option value="30">30</option>
                </Combo>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              고객전화번호
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="phoneNumber"
                value={cusInfo.phoneNumber}
                onChange={onCusHandler}
                required
              />
            </Wrapper>
          </Wrapper>

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
                  name="regNumber"
                  value={carInfo.regNumber}
                  readOnly={carExist}
                  onChange={onCarHandler}
                  required
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

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>정비요청내용</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextArea
                padding={`10px`}
                width={`400px`}
                height={`150px`}
                al={`flex-start`}
                type="text"
                name="mainReContents"
                placeholder="100자 이하로 입력하세요."
                value={bookingInfo.mainReContents}
                onChange={onBookingHandler}
              />
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
                name="name"
                value={carInfo.name}
                readOnly={carExist}
                onChange={onCarHandler}
                required
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>모델명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="model"
                value={carInfo.model}
                readOnly={carExist}
                onChange={onCarHandler}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>연식</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="age"
                value={carInfo.age}
                readOnly={carExist}
                onChange={onCarHandler}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>차대번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="idNumber"
                value={carInfo.idNumber}
                readOnly={carExist}
                onChange={onCarHandler}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>등록일자</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="regDate"
                value={carInfo.regDate}
                readOnly={carExist}
                onChange={onCarHandler}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>주행거리</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="distance"
                value={comma(carInfo.distance)}
                onChange={onCarHandler}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>고객명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2
                width={`400px`}
                type="text"
                name="name"
                value={cusInfo.name}
                onChange={onCusHandler}
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
