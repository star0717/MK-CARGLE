import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CloseButton,
  Combo,
  CommonButton,
  CommonButtonWrapper,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import theme from "styles/theme";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Mprice, SetBooking } from "src/models/setbooking.entity";
import { _aPostSetBooking } from "store/action/user.action";
import { deleteKeyJson } from "src/modules/commonModule";

const MaintenanceInfo: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<Partial<SetBooking>>(props.booking);
  const [modify, setModify] = useState<boolean>(false);
  const [delNum, setDelNum] = useState<number>();

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 객체형 배열 수정 핸들러
   */
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.id);
    if (e.target.name === "lift") {
      setBooking({ ...booking, [e.target.name]: Number(e.target.value) });
    } else if (e.target.name === "mainItems") {
      setBooking({
        ...booking,
        mPrice: booking.mPrice.map((item, index) =>
          index === idx
            ? (item = { ...item, [e.target.name]: e.target.value })
            : item
        ),
      });
    } else {
      if (e.target.value.includes(","))
        e.target.value = e.target.value.replaceAll(",", "");
      setBooking({
        ...booking,
        mPrice: booking.mPrice.map((item, index) =>
          index === idx
            ? (item = { ...item, [e.target.name]: Number(e.target.value) })
            : item
        ),
      });
    }
  };
  /**
   * 객체형 배열 삭제 핸들러
   */
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const arr = booking.mPrice.filter((item, index) => index !== delNum);
    setBooking({ ...booking, mPrice: arr });
  };

  /**
   * 객체형 배열 추가 핸들러
   */
  const onButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const addArray: Mprice = {
      mainItems: "",
      mainPrice: 0,
    };
    setBooking({
      ...booking,
      mPrice: booking.mPrice.concat(addArray),
    });
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper notAnimate>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>예약설정</CommonTitle>
          <CommonSubTitle>
            얘약과 관련된 업체정보를 설정할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} ju={`flex-start`}>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            color={`#c4c4c4`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}`);
            }}
            cursor={`pointer`}
          >
            <Text>기본정보</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}?step=F`);
            }}
            cursor={`pointer`}
          >
            <Text color={`#c4c4c4`}>영업시간</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            borderBottom={`2px solid #314fa5`}
            cursor={`pointer`}
          >
            <Text>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>정비 가능 리프트 수량을 알려주세요.</Text>
          <Wrapper
            borderBottom={`1px solid #ccc`}
            padding={`20px 0px`}
            al={`flex-start`}
          >
            <Combo
              width={`191px`}
              value={booking.lift}
              disabled={!modify}
              name="lift"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputHandler(e);
              }}
            >
              <option value={1}>1대</option>
              <option value={2}>2대</option>
              <option value={3}>3대</option>
              <option value={4}>4대</option>
              <option value={5}>5대</option>
              <option value={6}>6대 이상</option>
            </Combo>
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} padding={`20px 0px 10px`} fontWeight={`800`}>
          <Text color={theme.basicTheme_C}>주요 정비 가격을 알려주세요.</Text>
          <Wrapper
            borderBottom={`1px solid #ccc`}
            padding={`20px 0px`}
            al={`flex-start`}
          >
            {booking.mPrice.map((item, idx) => {
              return (
                <Wrapper
                  key={idx}
                  width={`auto`}
                  margin={`0px 10px`}
                  dr={`row`}
                >
                  <Wrapper al={`flex-start`} margin={`0px 10px 0px 0px`}>
                    <Text>정비항목</Text>
                    <TextInput2
                      id={idx}
                      name="mainItems"
                      readOnly={!modify}
                      value={item.mainItems}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onInputHandler(e);
                      }}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text>가격</Text>
                    <TextInput2
                      type="text"
                      id={idx}
                      name="mainPrice"
                      readOnly={!modify}
                      value={item.mainPrice.toLocaleString()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onInputHandler(e);
                      }}
                    />
                  </Wrapper>
                  {modify === true ? (
                    <Wrapper margin={`26px 0px 0px`}>
                      <CloseButton
                        onMouseDown={() => {
                          setDelNum(idx);
                        }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          onClickHandler(e);
                        }}
                      >
                        <IoIosCloseCircle />
                      </CloseButton>
                    </Wrapper>
                  ) : (
                    <></>
                  )}
                </Wrapper>
              );
            })}
            {modify === true ? (
              <Wrapper al={`flex-start`} margin={`10px`}>
                <SmallButton
                  width={`392px`}
                  kindOf={`default`}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onButtonHandler(e);
                  }}
                >
                  정비항목 추가하기
                </SmallButton>
              </Wrapper>
            ) : (
              <></>
            )}
          </Wrapper>
        </Wrapper>
        {modify ? (
          <CommonButtonWrapper ju={`space-around`}>
            <CommonButton
              kindOf={`white`}
              onClick={() => {
                setBooking(props.data);
                setModify(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              onClick={async () => {
                let data: Partial<SetBooking> = booking;
                deleteKeyJson(data);
                await dispatch(_aPostSetBooking(data)).then((res: any) => {
                  setBooking(res.payload);
                  props.setBooking(res.payload);
                  alert("저장 되었습니다!");
                });

                setModify(false);
              }}
            >
              저장
            </CommonButton>
          </CommonButtonWrapper>
        ) : (
          <CommonButtonWrapper ju={`space-around`}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setModify(true);
                window.scroll({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              수정
            </CommonButton>
          </CommonButtonWrapper>
        )}
      </RsWrapper>
    </WholeWrapper>
  );
};
export default MaintenanceInfo;
