import React, { forwardRef, useEffect, useState } from "react";
import { NextPage } from "next";
import { Wrapper, Text } from "src/components/styles/CommonComponents";
import { _pPreviewModalProps } from "src/configure/_pProps.entity";
import dayjs from "dayjs";
import { BsSquare } from "react-icons/bs";
import Image from "next/image";

const StatementFile: NextPage<any> = forwardRef<
  HTMLDivElement,
  _pPreviewModalProps
>((props, ref) => {
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
    <Wrapper
      id="statement"
      ref={ref}
      margin={`10px 0 0`}
      padding={`0px`}
      pageBreakAfter={`always`}
    >
      <Wrapper
        width={`49.58333em`}
        height={`auto`}
        minHeight={`70.08334em`}
        margin={`0 auto`}
        padding={`0px`}
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
            자동차점검 &#183; 정비명세서
          </Text>
        </Wrapper>

        {/* 차량소유자 정보 시작 */}
        <Wrapper
          dr={`row`}
          border={`1px solid #000`}
          height={`120px`}
          margin={`0px 0px 2px 0px`}
        >
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
            width={`23%`}
          >
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.sInfo && props.sInfo.car.regNumber}
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.sInfo && props.sInfo.car.regDate}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper height={`120px`} width={`65%`}>
            <Wrapper dr={`row`} height={`50%`} borderBottom={`1px solid #ccc`}>
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
                width={`35%`}
                borderRight={` 1px solid #ccc`}
                height={`100%`}
                dr={`row`}
                // ju={`space-between`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo && props.sInfo.car.name}
                </Text>
                {/* <Text>({props.sInfo.car.model})</Text> */}
              </Wrapper>
              <Wrapper
                width={`15%`}
                borderRight={` 1px solid #ccc`}
                height={`100%`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  주행거리
                </Text>
              </Wrapper>
              <Wrapper
                width={`30%`}
                ju={`flex-end`}
                dr={`row`}
                padding={`0px 10px`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo &&
                    Number(props.sInfo.car.distance).toLocaleString()}
                </Text>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  &nbsp;km
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
                  점검ㆍ정비 <br />
                  의뢰일자
                </Text>
              </Wrapper>
              <Wrapper width={`80%`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo &&
                    dayjs(props.sInfo.dates.stored).format("YYYY-MM-DD")}
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* 차량소유자 정보 끝 */}

        {/* 정비사업자 정보 시작 */}
        <Wrapper dr={`row`} border={`1px solid #000`} height={`180px`}>
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
            <Wrapper height={`30%`} dr={`row`}>
              <Wrapper
                width={`12%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  사업자등록
                  <br />
                  번호
                </Text>
              </Wrapper>
              <Wrapper
                width={`28%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo && props.sInfo.company.comRegNum}
                </Text>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  정비업등록
                  <br />
                  번호
                </Text>
              </Wrapper>
              <Wrapper
                width={`45%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo && props.sInfo.company.mbRegNum}
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper height={`40%`} dr={`row`} borderBottom={`1px solid #ccc`}>
              <Wrapper
                width={`12%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  업체명
                  <br />
                  (대표자)
                </Text>
              </Wrapper>
              <Wrapper
                width={`28%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
              >
                <Wrapper>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    {props.sInfo && props.sInfo.company.name}
                  </Text>
                </Wrapper>
                <Wrapper padding={`0px 8px`} height={`50%`} ju={`flex-end`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    ({props.sInfo && props.sInfo.company.ownerName})
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  주소
                </Text>
              </Wrapper>
              <Wrapper width={`45%`} height={`100%`}>
                <Wrapper>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    {props.sInfo && props.sInfo.company.address}
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-end`}
                  padding={`0px 8px`}
                  height={`50%`}
                  ju={`flex-end`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    (전화번호 : {props.sInfo && props.sInfo.company.phoneNum})
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper height={`30%`} dr={`row`}>
              <Wrapper
                width={`12%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  점검ㆍ정비
                  <br />
                  완료일자
                </Text>
              </Wrapper>
              <Wrapper
                width={`28%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo &&
                    dayjs(props.sInfo.dates.endMa).format("YYYY-MM-DD")}
                </Text>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  출고일자
                </Text>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.sInfo &&
                    dayjs(props.sInfo.dates.released).format("YYYY-MM-DD")}
                </Text>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  정비책임자
                </Text>
              </Wrapper>
              <Wrapper
                width={`15%`}
                height={`100%`}
                borderRight={`1px solid #ccc`}
                borderBottom={`1px solid #ccc`}
              >
                <Wrapper isRelative>
                  <Wrapper isAbsolute left={`14px`} top={`-5px`}>
                    <Image
                      alt="도장 사진"
                      width={40}
                      height={40}
                      src="/api/settings/myinfo/stamp"
                    />
                  </Wrapper>
                  <Wrapper isAbsolute>
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {props.sInfo && props.propToken.uName}
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  isRelative
                  al={`flex-end`}
                  padding={`0px 8px`}
                  height={`50%`}
                  ju={`flex-end`}
                >
                  <Text
                    fontSize={`0.67em`}
                    fontWeight={`400`}
                    color={`#9d9d9d`}
                  >
                    (서명 또는 인)
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* 정비사업자 정보 끝 */}

        {/* 작업내용 시작 */}
        <Wrapper
          border={`1px solid #000`}
          height={`auto`}
          margin={`2px 0px 0px 0px`}
        >
          <Wrapper dr={`row`} height={`30px`} borderBottom={`1px solid #ccc`}>
            <Wrapper
              width={`48%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`600`}>
                점검ㆍ정비내역
              </Text>
            </Wrapper>
            <Wrapper
              width={`22%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                추가정비동의여부
              </Text>
            </Wrapper>
            <Wrapper
              width={`30%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
              dr={`row`}
              ju={`space-around`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                <BsSquare />
                &nbsp;동의
              </Text>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                <BsSquare />
                &nbsp;부동의
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} height={`45px`} borderBottom={`1px solid #ccc`}>
            <Wrapper
              width={`48%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                작업내용
              </Text>
            </Wrapper>
            <Wrapper
              width={`36%`}
              height={`100%`}
              borderRight={` 1px solid #ccc`}
            >
              <Wrapper
                borderBottom={`1px solid #ccc`}
                width={`100%`}
                height={`50%`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  부품
                </Text>
              </Wrapper>
              <Wrapper height={`50%`} width={`100%`} dr={`row`}>
                <Wrapper
                  width={`25%`}
                  borderRight={`1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    구분
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`25%`}
                  borderRight={`1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    수량
                  </Text>
                </Wrapper>
                <Wrapper
                  width={`25%`}
                  borderRight={`1px solid #ccc`}
                  height={`100%`}
                >
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    단가
                  </Text>
                </Wrapper>
                <Wrapper width={`25%`} height={`100%`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    계
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={`16%`}
              borderRight={` 1px solid #ccc`}
              height={`100%`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                공임
              </Text>
            </Wrapper>
          </Wrapper>
          {props.sInfo &&
            props.sInfo.works.map((item, idx) => {
              return (
                <Wrapper
                  key={idx}
                  dr={`row`}
                  height={`30px`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Wrapper
                    width={`48%`}
                    borderRight={` 1px solid #ccc`}
                    height={`100%`}
                    padding={`0px 4px`}
                  >
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {item.name}
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={`36%`}
                    height={`100%`}
                    borderRight={` 1px solid #ccc`}
                  >
                    <Wrapper height={`100%`} width={`100%`} dr={`row`}>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                        al={`flex-start`}
                        padding={`0px 4px`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.type}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                        al={`flex-start`}
                        padding={`0px 4px`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.quantity.toLocaleString()}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                        al={`flex-start`}
                        padding={`0px 4px`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.price.toLocaleString()}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        width={`25%`}
                        height={`100%`}
                        al={`flex-start`}
                        padding={`0px 4px`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {(item.quantity * item.price).toLocaleString()}
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    width={`16%`}
                    borderRight={` 1px solid #ccc`}
                    height={`100%`}
                  >
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {item.wage}
                    </Text>
                  </Wrapper>
                </Wrapper>
              );
            })}
        </Wrapper>
        {/* 총계 입력란 시작 */}
        <Wrapper
          border={`1px solid #000`}
          borderTop={`none`}
          height={`60px`}
          dr={`row`}
        >
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              부품계
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              {props.sInfo && props.sInfo.price.partsSum.toLocaleString()}
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              공임계
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              {props.sInfo && props.sInfo.price.wageSum.toLocaleString()}
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              소계
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              {props.sInfo && props.sInfo.price.sum.toLocaleString()}
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              부가가치세
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              {props.sInfo && props.sInfo.price.vat.toLocaleString()}
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              총계
            </Text>
          </Wrapper>
          <Wrapper
            width={`10%`}
            borderRight={` 1px solid #ccc`}
            height={`100%`}
          >
            <Text fontSize={`0.83em`} fontWeight={`400`}>
              {props.sInfo && props.sInfo.price.total.toLocaleString()}
            </Text>
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} padding={`2px`}>
          <Text fontSize={`0.92em`} fontWeight={`400`}>
            「자동차관리법」 제58조제4항 및 같은 법 시행규칙 제134조제2항에 따라
            위와 같이 발급합니다.
          </Text>
        </Wrapper>

        {/* 서명란 시작 */}
        <Wrapper ju={`flex-end`} padding={`14px 0px`} dr={`row`}>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`80px`}
          >
            {dayjs(new Date()).format("YYYY")}
          </Text>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`20px`}
          >
            년
          </Text>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`40px`}
          >
            {dayjs(new Date()).format("MM")}
          </Text>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`20px`}
          >
            월
          </Text>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`40px`}
          >
            {dayjs(new Date()).format("DD")}
          </Text>
          <Text
            fontSize={`0.75em`}
            textAlign={`right`}
            fontWeight={`400`}
            width={`20px`}
          >
            일
          </Text>
        </Wrapper>
        <Wrapper al={`flex-end`}>
          <Wrapper
            width={`40%`}
            ju={`space-between`}
            padding={`0px 20px`}
            al={`flex-end`}
            dr={`row`}
          >
            <Wrapper width={`20%`} al={`flex-end`}>
              <Text textAlign={`right`} fontSize={`0.83em`} fontWeight={`400`}>
                작성자
              </Text>
            </Wrapper>
            <Wrapper
              isRelative
              dr={`row`}
              width={`80%`}
              ju={`flex-end`}
              al={`center`}
            >
              <Text
                textAlign={`right`}
                fontSize={`0.83em`}
                fontWeight={`400`}
                padding={`0px 16px`}
              >
                {props.eInfo && props.propToken.uName}
              </Text>
              <Text
                fontSize={`0.67em`}
                fontWeight={`400`}
                color={`#9d9d9d`}
                textAlign={`right`}
              >
                (서명 또는 인)
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper
            width={`40%`}
            ju={`space-between`}
            margin={`10px 0px 0px`}
            padding={`0px 20px`}
            al={`flex-end`}
            dr={`row`}
          >
            <Wrapper width={`20%`} al={`flex-end`}>
              <Text textAlign={`right`} fontSize={`0.83em`} fontWeight={`400`}>
                대표이사
              </Text>
            </Wrapper>
            <Wrapper
              isRelative
              dr={`row`}
              width={`80%`}
              ju={`flex-end`}
              al={`center`}
            >
              <Text
                textAlign={`right`}
                fontSize={`0.83em`}
                fontWeight={`400`}
                padding={`0px 16px`}
              >
                {props.eInfo && props.eInfo.company.ownerName}
              </Text>
              <Wrapper isAbsolute left={`82px`}>
                <Image
                  alt="도장 사진"
                  width={40}
                  height={40}
                  src="/api/settings/myinfo/stamp"
                />
              </Wrapper>
              <Text
                fontSize={`0.67em`}
                fontWeight={`400`}
                color={`#9d9d9d`}
                textAlign={`right`}
              >
                (서명 또는 인)
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        {/* 안내사항 시작 */}
        <Wrapper
          bgColor={`#c4c4c4`}
          padding={`2px`}
          margin={`20px 0px 0px`}
          borderTop={`2px solid #575757`}
        >
          <Text fontSize={`0.83em`} fontWeight={`400`}>
            안내사항
          </Text>
        </Wrapper>
        <Wrapper
          borderBottom={`1px solid #ccc`}
          padding={`2px 8px`}
          al={`flex-start`}
        >
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            1. 정비업자가 점검ㆍ정비의 잘못으로 다음 구분에 따른 기간중 발생하는
            고장 등에 대하여는 무상점검ㆍ정비를 합<br />
            &nbsp;&nbsp;&nbsp; 니다(「자동차관리법 시행규칙」
            제134조제1항제2호).
            <br />
            &nbsp;&nbsp;&nbsp; 가. 차령 1년 미만 또는 주행거리 2만킬로미터
            이내의 자동차: 점검ㆍ정비일부터 90일 이내.
            <br />
            &nbsp;&nbsp;&nbsp; 나. 차령 3년 미만 또는 주행거리 6만킬로미터
            이내의 자동차: 점검ㆍ정비일부터 60일 이내
            <br />
            &nbsp;&nbsp;&nbsp; 다. 차령 3년 이상 또는 주행거리 6만킬로미터
            이상의 자동차: 점검ㆍ정비일부터 30일 이내
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            2. 이 내역서는 2부를 작성, 정비의뢰자에게 1부를 교부하고,
            정비사업자는 1부를 1년간 문서 또는 전산자료로 보관하여야 합니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            3. 부품란의 구분란에는 다음에 따라 기재하여야 합니다
            <br />
            &nbsp;&nbsp;&nbsp; 가. 자동차 제작사 및 부품업체가 공급하는
            신품(자동차 제작사의 경우에는 사후관리용 보증부품을 포함합니다): A
            <br />
            &nbsp;&nbsp;&nbsp; 나. 재제조품: B
            <br />
            &nbsp;&nbsp;&nbsp; 다. 중고품(재생품을 포함합니다): C
            <br />
            &nbsp;&nbsp;&nbsp; 라. 수입부품: F
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            ※ 재생정비한 원동기를 부품으로 사용한 경우에는 별지 제92호서식의
            원동기재생정비사실확인서를 첨부하여야 합니다.
          </Text>
        </Wrapper>
        {/* 안내사항 끝 */}
        <Wrapper al={`flex-end`} padding={`2px`}>
          <Text fontSize={`0.67em`} fontWeight={`400`}>
            210mm×297mm[백상지 80g/㎡]
          </Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
});

export default StatementFile;
