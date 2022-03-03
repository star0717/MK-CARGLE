import React from "react";
import { NextPage } from "next";
import {
  Wrapper,
  Text,
  ColorSpan,
} from "src/components/styles/CommonComponents";

const TestPage: NextPage<any> = (props) => {
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
  return (
    <>
      <Wrapper padding={`100px`}>
        <Wrapper
          width={`49.58333em`}
          height={`70.08334em`}
          margin={`0 auto`}
          padding={`60px`}
          border={`1px solid #c4c4c4`}
          ju={`flex-start`}
          al={`flex-start`}
        >
          <Wrapper ju={`flex-start`} al={`flex-start`} dr={`row`}>
            <Text fontSize={`0.67em`} fontWeight={`400`}>
              ■ 자동차관리법 시행규칙 [별지 제89호의2 서식]&nbsp;
            </Text>
            <Text fontSize={`0.67em`} color={`blue`} fontWeight={`400`}>
              &lt;개정 2014.10.6.&gt;
            </Text>
          </Wrapper>
          <Wrapper padding={`10px 0px`}>
            <Text fontSize={`24px`} fontWeight={`600`}>
              자동차점검 &#183; 정비견적서
            </Text>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`}>
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              일련번호:
            </Text>
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              1234567890
            </Text>
          </Wrapper>
          <Wrapper dr={`row`} border={`2px solid #000`} height={`120px`}>
            <Wrapper
              width={`10%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                차량
                <br />
                소유자
              </Text>
            </Wrapper>
            <Wrapper
              borderRight={` 1px solid #ccc`}
              height={`100%`}
              width={`16%`}
            >
              <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  등록번호
                </Text>
              </Wrapper>
              <Wrapper height={`50%`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  등록년월일
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper
              borderRight={` 1px solid #ccc`}
              height={`100%`}
              width={`24%`}
            >
              <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  1234567890
                </Text>
              </Wrapper>
              <Wrapper height={`50%`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  2022.03.03
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper height={`120px`} width={`100%`}>
              <Wrapper
                dr={`row`}
                height={`50%`}
                borderBottom={`1px solid #ccc`}
              >
                <Wrapper
                  width={`20%`}
                  borderRight={` 1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    차명
                    <br />
                    (차종)
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`30%`}
                  borderRight={` 1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    차종입력칸
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`20%`}
                  borderRight={` 1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    주행거리
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`30%`}
                  ju={`space-between`}
                  dr={`row`}
                  padding={`0px 10px`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    4000
                  </Text>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    km
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} height={`50%`}>
                <Wrapper
                  width={`20%`}
                  borderRight={` 1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    차대번호
                  </Text>
                </Wrapper>
                <Wrapper width={`80%`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    32904889023509
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default TestPage;
