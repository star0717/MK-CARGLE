import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  Image,
} from "../styles/CommonComponents";

const Footer: NextPage = () => {
  const { width, height, ref } = useResizeDetector();
  console.log(width);

  return (
    <WholeWrapper ref={ref}>
      <Wrapper
        dr={`row`}
        bgColor={`#292929`}
        color={`#fff`}
        padding={`10px 30px 40px`}
      >

        <Image
          src="/images/logoWhite.png"
          alt="Cargle Logo"
          width={`173px`}
          padding={`10px`}
        />

        <Wrapper
          fontSize={`14px`}
          lineHeignt={`22px`}
          padding={`10px`}
          width={`auto`}
        >
          <Wrapper
            dr={`row`}
            al={width < 956 ? `center` : `flex-start`}
          >
            <Text>
              MK Co.,Ltd. 대전광역시 유성구 대학로 227 3층 &nbsp;
            </Text>
            <Text>
              Tel 1644-3486&nbsp;
            </Text>
            <Text>
              Fax +82-42-368-0224&nbsp;
            </Text>
            <Text>
              사업자 등록번호 338-88-00960&nbsp;
            </Text>
            <Text>
              대표자 변무영
            </Text>
          </Wrapper>
          <Wrapper
            al={width < 956 ? `center` : `flex-start`}
          >
            <Text>
              &#169;COPYRIGHT 2018 MK CO.,LTD.. ALL RIGHTS RESERVED</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Footer;
