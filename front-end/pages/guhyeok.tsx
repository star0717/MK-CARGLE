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

          {/* 차량소유자 정보 시작 */}
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
              width={`12%`}
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
              width={`28%`}
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
            <Wrapper height={`120px`} width={`60%`}>
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
          {/* 차량소유자 정보 끝 */}

          {/* 정비사업자 정보 시작 */}
          <Wrapper
            dr={`row`}
            border={`2px solid #000`}
            borderTop={`none`}
            height={`180px`}
          >
            <Wrapper
              width={`10%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                정비
                <br />
                사업자
              </Text>
            </Wrapper>
            <Wrapper height={`100%`}>
              <Wrapper height={`25%`} dr={`row`}>
                <Wrapper
                  width={`12%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    사업자
                    <br />
                    등록번호
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`28%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    111-11-1111
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`20%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    정비업 등록번호
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`40%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    111-111-11111-1111
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper height={`25%`} dr={`row`}>
                <Wrapper
                  width={`12%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    업체명 및
                    <br />
                    대표자
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`63%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    댕댕나라 윤초코
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`25%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                  al={`flex-start`}
                >
                  <Text
                    fontSize={`0.67em`}
                    fontWeight={`400`}
                    color={`#9d9d9d`}
                  >
                    서명 또는 (인)
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper height={`25%`} dr={`row`}>
                <Wrapper
                  width={`12%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    주소
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`63%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    댕댕나라 멍멍구 왈왈동
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`25%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                  al={`flex-end`}
                  ju={`flex-end`}
                  padding={`4px 6px`}
                  dr={`row`}
                >
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    (전화번호&nbsp;
                  </Text>
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    010-1111-1111
                  </Text>
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    )
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper height={`25%`} dr={`row`}>
                <Wrapper
                  width={`12%`}
                  height={`100%`}
                  borderRight={`1px solid #ccc`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    견적구분
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`63%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    댕댕나라 멍멍구 왈왈동
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`25%`}
                  height={`100%`}
                  borderBottom={`1px solid #ccc`}
                  al={`flex-end`}
                  ju={`flex-end`}
                  padding={`4px 6px`}
                  dr={`row`}
                >
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    (전화번호&nbsp;
                  </Text>
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    010-1111-1111
                  </Text>
                  <Text fontSize={`0.75em`} fontWeight={`400`}>
                    )
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {/* 정비사업자 정보 끝 */}
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default TestPage;
