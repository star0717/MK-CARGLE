import {
  ColorSpan,
  Combo,
  Text,
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  TextArea,
  TextInput2,
  Wrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { NextPage } from "next";
import theme from "styles/theme";
import { _pBookingModalProps } from "src/configure/_pProps.entity";
import { useState } from "react";
import { Booking } from "src/models/booking.entity";
import {
  BookingState,
  bookingStateColor,
  bookingStateInput,
  bookingStateList,
  bookingStateName,
  RejectReason,
  rejectReasonName,
} from "src/constants/booking.const";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useDispatch } from "react-redux";
import { _aPatchBooking } from "store/action/user.action";
import { _iBookingOne } from "store/interfaces";
dayjs.locale("ko");

const EditBookingModal: NextPage<_pBookingModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /**
   * 예약 변경 handler
   * @param e
   */
  const onBookingChange = async (state: BookingState) => {
    if (state === BookingState.REJECT) return props.setModalOption("reject");

    const bookingData: Partial<Booking> = {
      ...props.clickDoc,
      bookingState: state,
    };
    delete bookingData.rejectOption;
    await dispatch(_aPatchBooking(props.clickDoc._id, bookingData)).then(
      (res: _iBookingOne) => {
        if (!res.payload) return alert("예약 변경 에러");
        props.setModalOpen(false);
        props.setReset(props.reset + 1);
      },
      (err) => {
        if (err) return alert("예약 변경 에러");
      }
    );
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper>
      <CommonSmallTitle>예약요청서</CommonSmallTitle>
      <Wrapper>
        <Wrapper
          borderBottom={`1px solid #c4c4c4`}
          dr={`row`}
          ju={`space-between`}
          padding={`10px 0px`}
          margin={`0px 0px 10px`}
        >
          <Wrapper width={`auto`}>
            <Text color={theme.basicTheme_C} fontSize={`18px`}>
              예약정보
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} dr={`row`}>
            <Text>
              예약상태 :
              <ColorSpan
                margin={`0px 0px 0px 5px`}
                color={bookingStateColor(props.clickDoc.bookingState)}
              >
                {bookingStateName(props.clickDoc.bookingState)}
              </ColorSpan>
            </Text>
            {/* <Combo
                name="bookingState"
                value={props.clickDoc.bookingState}
                onChange={onBookingHandler}
              >
                {bookingStateList.map((state) => {
                  {
                    return (
                      <option key={state} value={state}>
                        {bookingStateName(state)}
                      </option>
                    );
                  }
                })}
              </Combo> */}
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>
            <ColorSpan color={`#d6263b`}>*</ColorSpan>
            예약접수일자
          </Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2
              width={`400px`}
              type="text"
              name="bookingDate"
              value={dayjs(props.clickDoc.bookingDate).format("YYYY-MM-DD")}
              readOnly
            />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>
            <ColorSpan color={`#d6263b`}>*</ColorSpan>
            정비희망일자
          </Text>
          <Wrapper
            width={`400px`}
            height={`40px`}
            al={`flex-start`}
            dr={`row`}
            ju={`space-between`}
          >
            <TextInput2
              width={`212px`}
              type="text"
              name="mainHopeDate"
              value={dayjs(props.clickDoc.mainHopeDate).format("YYYY-MM-DD")}
              readOnly
            />
            <Wrapper
              width={`180px`}
              border={`1px solid #ccc`}
              background={`#f5f5f5`}
              radius={theme.radius}
              dr={`row`}
            >
              <TextInput2
                height={`39px`}
                width={`80px`}
                border={`none`}
                textAlign={`center`}
                type="text"
                name="hour"
                value={dayjs(props.clickDoc.mainHopeDate).format("HH")}
                readOnly
              />
              <Text margin={`0px 4px`}>:</Text>
              <TextInput2
                height={`39px`}
                width={`80px`}
                border={`none`}
                textAlign={`center`}
                type="text"
                name="minute"
                value={dayjs(props.clickDoc.mainHopeDate).format("mm")}
                readOnly
              />
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
              value={props.clickDoc.customer.phoneNumber}
              readOnly
            />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>차량번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
              <TextInput2
                width={`400px`}
                // margin={`0px 0px 10px 0px`}
                type="text"
                name="regNumber"
                value={props.clickDoc.car.regNumber}
                readOnly
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>정비요청내용</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextArea
              padding={`10px`}
              width={`400px`}
              height={`80px`}
              al={`flex-start`}
              type="text"
              name="mainReContents"
              value={props.clickDoc.mainReContents}
              readOnly
            />
          </Wrapper>
        </Wrapper>
        {props.clickDoc.bookingState === BookingState.REJECT && (
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>거절사유</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              {props.clickDoc.rejectOption.rejectReason ===
              RejectReason.text ? (
                <TextArea
                  padding={`10px`}
                  width={`400px`}
                  height={`80px`}
                  al={`flex-start`}
                  type="text"
                  name="rejectText"
                  value={props.clickDoc.rejectOption.rejectText}
                  readOnly
                />
              ) : (
                <TextInput2
                  width={`400px`}
                  type="text"
                  name="rejectReason"
                  value={rejectReasonName(
                    props.clickDoc.rejectOption.rejectReason
                  )}
                  readOnly
                />
              )}
            </Wrapper>
          </Wrapper>
        )}
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
          <Text>차량명</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2
              width={`400px`}
              type="text"
              name="name"
              value={props.clickDoc.car.name}
              readOnly
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
              value={props.clickDoc.car.model}
              readOnly
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
              value={props.clickDoc.car.age}
              readOnly
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
              value={props.clickDoc.car.idNumber}
              readOnly
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
              value={props.clickDoc.car.regDate}
              readOnly
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
              value={props.clickDoc.car.distance}
              readOnly
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
              value={props.clickDoc.customer.name}
              readOnly
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
          {(props.clickDoc.bookingState === BookingState.NEW ||
            props.clickDoc.bookingState === BookingState.APPROVAL) && (
            <CommonButton
              kindOf={`circleTheme`}
              type="button"
              onClick={() => {
                onBookingChange(BookingState.REJECT);
              }}
            >
              거절
            </CommonButton>
          )}
          {(props.clickDoc.bookingState === BookingState.NEW ||
            props.clickDoc.bookingState === BookingState.REJECT) && (
            <CommonButton
              kindOf={`circleTheme`}
              type="button"
              onClick={() => {
                onBookingChange(BookingState.APPROVAL);
              }}
            >
              승인
            </CommonButton>
          )}
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default EditBookingModal;
