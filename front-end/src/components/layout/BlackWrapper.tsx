import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";
import router from "next/router";
import { BsEmojiDizzyFill } from "react-icons/bs";
import { UseLink } from "src/configure/router.entity";

const BlackWrapper: NextPage = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper padding={`100px 50px 0px`} dr={`row`}>
          <Wrapper width={`auto`}>
            <Wrapper>
              <Text
                fontSize={`114px`}
                fontWeight={`800`}
                color={`#f0f0f0`}
                padding={`0px`}
              >
                <BsEmojiDizzyFill />
              </Text>
              <Text
                fontSize={`80px`}
                fontWeight={`800`}
                color={`#f0f0f0`}
                padding={`0px 0px 10px`}
                margin={`-30px 0px 0px`}
              >
                Oops!
              </Text>
              <Text
                fontSize={`26px`}
                fontWeight={`600`}
                color={`#314FA5`}
                padding={`50px 0px 10px`}
                margin={`-120px 0px 0px`}
              >
                죄송합니다. <br />
                현재 지원하지 않는 해상도입니다.
              </Text>
              <Text
                fontSize={`18px`}
                padding={`0px 0px 10px`}
                fontWeight={`300`}
              >
                더 큰 디스플레이 환경에서 접속해주세요!
              </Text>
              <Text
                fontSize={`18px`}
                fontWeight={`300`}
                padding={`0px 0px 10px`}
              >
                감사합니다.
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default BlackWrapper;
