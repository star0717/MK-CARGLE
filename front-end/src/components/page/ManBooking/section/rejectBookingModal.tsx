import React, { useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonForm,
  CommonSmallTitle,
  Hr,
  Label,
  SmallButton,
  Text,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { _pBookingModalProps } from "src/configure/_pProps.entity";
import { AiFillCar, AiFillMessage, AiOutlineFieldTime } from "react-icons/ai";
import { Booking, RejectOption } from "src/models/booking.entity";
import { RejectReason } from "src/constants/booking.const";
import { basicRegEx } from "src/validation/regEx";
import { deleteKeyJson, trim } from "src/modules/commonModule";
import { useDispatch } from "react-redux";
import { _aPatchBooking } from "store/action/user.action";
import { _iBookingOne } from "store/interfaces";

const RejectBookingModal: NextPage<_pBookingModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  const rejectOptionInit: RejectOption = {
    phoneNumber: props.clickDoc.customer.phoneNumber,
    rejectReason: RejectReason.hard,
    rejectText: "",
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [rejectOption, setRejectOption] =
    useState<RejectOption>(rejectOptionInit);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phoneNumber") {
      if (!basicRegEx.NUM.test(e.target.value)) return false;
      return setRejectOption({
        ...rejectOption,
        [e.target.name]: trim(e.target.value),
      });
    }
    if (e.target.name === "rejectText" && e.target.value.length > 100)
      return false;
    setRejectOption({ ...rejectOption, [e.target.name]: e.target.value });
  };

  const onBookingReject = async (send: boolean) => {
    if (send) {
    }
    deleteKeyJson(rejectOption);
    const bookingData: Booking = {
      ...props.clickDoc,
      rejectOption: rejectOption,
    };
    await dispatch(_aPatchBooking(props.clickDoc._id, bookingData)).then(
      (res: _iBookingOne) => {
        if (!res.payload) return alert("예약 거절 에러");
        props.setModalOpen(false);
        props.setReset(props.reset + 1);
      },
      (err) => {
        if (err) return alert("예약 거절 에러");
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
      <CommonSmallTitle>예약 거절 사유를 선택하세요</CommonSmallTitle>
      <Wrapper>
        <Wrapper dr={`row`}>
          <Text>휴대전화번호</Text>
          <TextInput2
            type="text"
            name="phoneNumber"
            value={rejectOption.phoneNumber}
            onChange={onInputHandler}
          />
          <Text fontSize={`12px`}>
            * 예약 거절 안내를 위한 고객님의 전화번호입니다.
          </Text>
        </Wrapper>
        <Hr style={{ width: "100%" }} />
        <CommonForm>
          <Wrapper dr={`row`} ju={`space-between`} al={`center`}>
            <Wrapper>
              <TextInput2
                display={`none`}
                type="radio"
                name="rejectReason"
                id={RejectReason.hard}
                value={RejectReason.hard}
                onChange={onInputHandler}
              />
              <Text
                fontSize={`12px`}
                color={
                  rejectOption.rejectReason === RejectReason.hard
                    ? "#314FA5"
                    : "#000000"
                }
              >
                "정비가 어려운 차량이에요"
              </Text>
              <Label htmlFor={RejectReason.hard}>
                <AiFillCar
                  size="100px"
                  color={
                    rejectOption.rejectReason === RejectReason.hard
                      ? "#314FA5"
                      : "#000000"
                  }
                />
              </Label>
            </Wrapper>
            <Wrapper>
              <TextInput2
                display={`none`}
                type="radio"
                name="rejectReason"
                id={RejectReason.many}
                value={RejectReason.many}
                onChange={onInputHandler}
              />
              <Text
                fontSize={`12px`}
                color={
                  rejectOption.rejectReason === RejectReason.many
                    ? "#314FA5"
                    : "#000000"
                }
              >
                "수리할 차량이 밀려있어요"
              </Text>
              <Label htmlFor={RejectReason.many}>
                <AiOutlineFieldTime
                  size="100px"
                  color={
                    rejectOption.rejectReason === RejectReason.many
                      ? "#314FA5"
                      : "#000000"
                  }
                />
              </Label>
            </Wrapper>
            <Wrapper>
              <TextInput2
                display={`none`}
                type="radio"
                name="rejectReason"
                id={RejectReason.text}
                value={RejectReason.text}
                onChange={onInputHandler}
              />
              <Text
                fontSize={`12px`}
                color={
                  rejectOption.rejectReason === RejectReason.text
                    ? "#314FA5"
                    : "#000000"
                }
              >
                직접 입력
              </Text>
              <Label htmlFor={RejectReason.text}>
                <AiFillMessage
                  size="100px"
                  color={
                    rejectOption.rejectReason === RejectReason.text
                      ? "#314FA5"
                      : "#000000"
                  }
                />
              </Label>
            </Wrapper>
          </Wrapper>
          <Wrapper
            display={
              rejectOption.rejectReason === RejectReason.text ? `block` : `none`
            }
          >
            <TextArea
              padding={`10px`}
              width={`400px`}
              height={`150px`}
              al={`flex-start`}
              type="text"
              name="rejectText"
              placeholder="100자 이하로 입력하세요."
              value={rejectOption.rejectText}
              onChange={onInputHandler}
            />
          </Wrapper>
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton
              kindOf={`circleWhite`}
              type="button"
              onClick={() => {
                props.setModalOption("edit");
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              kindOf={`circleWhite`}
              type="button"
              onClick={() => {
                onBookingReject(false);
              }}
            >
              문자미발송 및 저장
            </CommonButton>
            <CommonButton
              kindOf={`circleTheme`}
              type="button"
              onClick={() => {
                onBookingReject(true);
              }}
            >
              문자발송 및 저장
            </CommonButton>
          </CommonButtonWrapper>
        </CommonForm>
      </Wrapper>
    </WholeWrapper>
  );
};

export default RejectBookingModal;
