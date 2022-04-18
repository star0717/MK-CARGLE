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

const MaintenanceInfo: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<SetBooking>(props.data);
  const [modify, setModify] = useState<boolean>(false);

  let price: Mprice[] = booking.mPrice;
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const onPriceHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.id);
    if (e.target.name === "mainItems") {
      setBooking({
        ...booking,
        mPrice: {
          ...booking.mPrice,
          [idx]: {
            mainItems: e.target.value,
            mainPrice: booking.mPrice[idx].mainPrice,
          },
        },
      });
      // setBooking({
      //   ...booking,
      //   mPrice: {
      //     ...price,
      //     [idx]: { mainItems: e.target.value, mainPrice: price[idx].mainPrice },
      //   },
      // });
    } else {
    }
    // setBooking({ ...booking, [e.target.name]: e.target.value });
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
                <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
                  <Wrapper al={`flex-start`} margin={`0px 10px 0px 0px`}>
                    <Text>정비항목</Text>
                    <TextInput2
                      id={idx}
                      name="mainItems"
                      value={item.mainItems}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onPriceHanlder(e);
                      }}
                    />
                  </Wrapper>
                  <Wrapper al={`flex-start`}>
                    <Text>가격</Text>
                    <TextInput2
                      id={idx}
                      name="mainPrice"
                      value={item.mainPrice}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onPriceHanlder(e);
                      }}
                    />
                  </Wrapper>
                  <Wrapper margin={`26px 0px 0px`}>
                    <CloseButton>
                      <IoIosCloseCircle />
                    </CloseButton>
                  </Wrapper>
                </Wrapper>
              );
            })}

            <Wrapper al={`flex-start`} margin={`10px`}>
              <SmallButton width={`392px`} kindOf={`default`}>
                정비항목 추가하기
              </SmallButton>
            </Wrapper>
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
                await dispatch(_aPostSetBooking(booking)).then((res: any) => {
                  setBooking(res.payload);
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
