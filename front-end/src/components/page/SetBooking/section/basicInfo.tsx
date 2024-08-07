import React, { useEffect, useState } from "react";
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
  Label,
  TextInput2,
} from "src/components/styles/CommonComponents";
import theme from "styles/theme";
import { BsDownload } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { _aPostSetBooking } from "store/action/user.action";
import { OfficeHours, SetBooking } from "src/models/setbooking.entity";
import { deleteKeyJson } from "src/modules/commonModule";
import Image from "next/image";

const BasicInfo: NextPage<_pSetBookingDataProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  interface ImgSrc {
    img_1: string;
    img_2: string;
    img_3: string;
    img_4: string;
  }

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<Partial<SetBooking>>(props.booking);
  const [modify, setModify] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<ImgSrc>({
    img_1: props.data.imgJson[0] ? props.data.imgJson[0] : "",
    img_2: props.data.imgJson[1] ? props.data.imgJson[1] : "",
    img_3: props.data.imgJson[2] ? props.data.imgJson[2] : "",
    img_4: props.data.imgJson[3] ? props.data.imgJson[3] : "",
  });

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    let src: any;
    if (e.target.files[0]) {
      const reader: FileReader = new FileReader();
      reader.onload = async () => {
        // setImgSrc({ ...imgSrc, [name]: reader.result });
        src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log("$$$", src);
      setImgSrc({ ...imgSrc, [name]: src });
    }
    console.log("@@", src);
  };

  console.log(imgSrc);

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
            readOnly={!modify}
            placeholder="고객님께 노출되는 소개글입니다."
            width={`1200px`}
            name="intro"
            value={booking.intro}
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
            <Label htmlFor="img_1">
              {imgSrc.img_1 ? (
                <Image
                  id="img_1_src"
                  width={285}
                  height={214}
                  src={imgSrc.img_1}
                />
              ) : (
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
              )}
            </Label>
            <TextInput2
              type="file"
              id="img_1"
              name="img_1"
              accept="image/*"
              display={`none`}
              value={imgSrc.img_1}
              onChange={imgHandler}
            />
            <Label htmlFor="img_2">
              {imgSrc.img_2 ? (
                <Image
                  id="img_2_src"
                  width={285}
                  height={214}
                  src={imgSrc.img_2}
                />
              ) : (
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
              )}
            </Label>
            <TextInput2
              type="file"
              id="img_2"
              name="img_2"
              accept="image/*"
              display={`none`}
              value={imgSrc.img_2}
              onChange={imgHandler}
            />
            <Label htmlFor="img_3">
              {imgSrc.img_3 ? (
                <Image
                  id="img_3_src"
                  width={285}
                  height={214}
                  src={imgSrc.img_3}
                />
              ) : (
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
              )}
            </Label>
            <TextInput2
              type="file"
              id="img_3"
              name="img_3"
              accept="image/*"
              display={`none`}
              value={imgSrc.img_3}
              onChange={imgHandler}
            />
            <Label htmlFor="img_4">
              {imgSrc.img_4 ? (
                <Image
                  id="img_4_src"
                  width={285}
                  height={214}
                  src={imgSrc.img_4}
                />
              ) : (
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
              )}
            </Label>
            <TextInput2
              type="file"
              id="img_4"
              name="img_4"
              accept="image/*"
              display={`none`}
              value={imgSrc.img_4}
              onChange={imgHandler}
            />
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
          {modify ? (
            <CommonButtonWrapper ju={`space-around`}>
              <CommonButton
                kindOf={`white`}
                onClick={() => {
                  setBooking(props.data.setBooking);
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
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BasicInfo;
