import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { Wrapper, Text, Image } from "../styles/CommonComponents";
import { FooterWrapper } from "../styles/LayoutComponents";

// import { useResizeDetector } from "react-resize-detector";
// import type { NextPage } from "next";
// import {
//   WholeWrapper,
//   Wrapper,
//   Text,
//   Image,
//   FooterWrapper,
// } from "../styles/CommonComponents";

// const Footer: NextPage = () => {
//   const { width, height, ref } = useResizeDetector();

//   return (
//     <WholeWrapper ref={ref}>
//       {/* //   <Wrapper
//     //     dr={`row`}
//     //     bgColor={`#292929`}
//     //     color={`#fff`}
//     //     padding={`10px 30px 40px`}
//     //   >
//     //     <Image
//     //       src="/images/logoWhite.png"
//     //       alt="Cargle Logo"
//     //       width={`173px`}
//     //       padding={`10px`}
//     //     />

//     //     <Wrapper
//     //       fontSize={`14px`}
//     //       lineHeignt={`22px`}
//     //       padding={`10px`}
//     //       width={`auto`}
//     //     >
//     //       <Wrapper dr={`row`} al={width < 956 ? `center` : `flex-start`}>
//     //         <Text>MK Co.,Ltd. 대전광역시 유성구 대학로 227 3층 &nbsp;</Text>
//     //         <Text>Tel 1644-3486&nbsp;</Text>
//     //         <Text>Fax +82-42-368-0224&nbsp;</Text>
//     //         <Text>사업자 등록번호 338-88-00960&nbsp;</Text>
//     //         <Text>대표자 변무영</Text>
//     //       </Wrapper>
//     //       <Wrapper al={width < 956 ? `center` : `flex-start`}>
//     //         <Text>&#169;COPYRIGHT 2018 MK CO.,LTD.. ALL RIGHTS RESERVED</Text>
//     //       </Wrapper>
//     //     </Wrapper>
//     //   </Wrapper> */}

//       <FooterWrapper bgColor={`#292929`}>
//         <Wrapper dr={`row`} color={`#fff`} padding={`10px 30px 40px`}>

//   </Wrapper>
// </Wrapper>
//       </FooterWrapper>
//     </WholeWrapper>
//   );
// };

// export default Footer;

const Footer: NextPage = () => {
  const { width, height, ref } = useResizeDetector();

  return (
    <FooterWrapper ref={ref}>
      <Wrapper
        isRelative={true}
        marginTop={`auto`}
        height={width < 1200 ? `auto` : `150px`}
        bgColor={`#343a40`}
        padding={width < 1200 ? `24px 0px` : ``}
      >
        <Wrapper ju={`center`} dr={width < 1200 ? `column` : `row`}>
          <Image
            src="/images/whiteLogo.png"
            alt="Cargle Logo"
            width={`140px`}
            padding={`10px`}
            opacity={`0.7`}
          />

          <Wrapper
            fontSize={`14px`}
            lineHeignt={`22px`}
            padding={width < 1200 ? `10px 0px` : `10px 0px 20px 0px`}
            width={`auto`}
            color={`#c4c4c4`}
          >
            <Wrapper
              dr={width < 1200 ? `column` : `row`}
              al={width < 1200 ? `center` : `flex-start`}
              display={width < 1200 ? `none` : ``}
            >
              <Text>MK Co.,Ltd. 대전광역시 유성구 대학로 227 3층 &nbsp;</Text>
              <Text>Tel 1644-3486&nbsp;</Text>
              <Text>Fax +82-42-368-0224&nbsp;</Text>
              <Text>사업자 등록번호 338-88-00960&nbsp;</Text>
              <Text>대표자 변무영</Text>
            </Wrapper>
            <Wrapper al={width < 956 ? `center` : `flex-start`}>
              <Text>&#169;COPYRIGHT 2018 MK CO.,LTD.. ALL RIGHTS RESERVED</Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </FooterWrapper>
  );
};

export default Footer;
