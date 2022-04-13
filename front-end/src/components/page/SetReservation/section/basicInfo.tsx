import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  TextArea,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButtonWrapper,
  CommonButton,
} from "src/components/styles/CommonComponents";
import theme from "styles/theme";
import { BsDownload } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { _aPostBooking } from "store/action/user.action";

const BasicInfo: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setBooking({ ...props.booking, [e.target.name]: e.target.value });
  };

  const onSaveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {};
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
            borderBottom={`2px solid #314fa5`}
            padding={`10px`}
            width={`120px`}
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
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}?step=S`);
            }}
            cursor={`pointer`}
          >
            <Text color={`#c4c4c4`}>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>소개글을 작성해주세요</Text>
        </Wrapper>
        <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
          <TextArea
            padding={`10px`}
            height={`140px`}
            readOnly={!props.modify}
            placeholder="고객님께 노출되는 소개글입니다."
            width={`1200px`}
            name="intro"
            value={props.booking.intro}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputHandler(e);
            }}
            shadow={theme.boxShadow}
          ></TextArea>
        </Wrapper>
        <Wrapper al={`flex-start`} padding={`20px 0px 10px`} fontWeight={`800`}>
          <Text color={theme.basicTheme_C}>사진을 올려주세요</Text>
          <Text>
            업로드할 파일을 드래그하거나 클릭하여 선택하세요. (jpg, jpeg, png
            확장자의 파일만 업로드 가능합니다.)
          </Text>
          <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0px 20px`}>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진1
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진2
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진3
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진4
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
            <Wrapper
              height={`900px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <AiFillPicture />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                대표사진
              </Text>
            </Wrapper>
          </Wrapper>
          {props.modify ? (
            <CommonButtonWrapper ju={`space-around`}>
              <CommonButton
                kindOf={`white`}
                onClick={() => {
                  props.setBooking(props.data);
                  props.setModify(false);
                }}
              >
                취소
              </CommonButton>
              <CommonButton
                onClick={async () => {
                  await dispatch(_aPostBooking(props.booking)).then(
                    (res: any) => {
                      props.setBooking(res.payload);
                      alert("저장 되었습니다!");
                    }
                  );

                  props.setModify(false);
                }}
              >
                저장
              </CommonButton>
            </CommonButtonWrapper>
          ) : (
            <CommonButtonWrapper ju={`space-around`}>
              <CommonButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  props.setModify(true);
                  window.scroll({ top: 0, left: 0, behavior: "smooth" });
                }}
              >
                수정
              </CommonButton>
            </CommonButtonWrapper>
          )}
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BasicInfo;
