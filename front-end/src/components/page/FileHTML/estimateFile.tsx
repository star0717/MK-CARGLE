import React, { forwardRef, useEffect, useState } from "react";
import { NextPage } from "next";
import { Text, Wrapper } from "src/components/styles/CommonComponents";
import { _aGetEstimates } from "store/action/user.action";
import { _iEstimate } from "store/interfaces";
import dayjs from "dayjs";
import { _pPreviewModalProps } from "src/configure/_pProps.entity";
import { getStrMainCustomerType } from "src/constants/maintenance.const";
import { BsSquare, BsSquareFill } from "react-icons/bs";
import Image from "next/image";

const EstimateFile: NextPage<any> = forwardRef<
  HTMLDivElement,
  _pPreviewModalProps
>((props, ref) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  // const [imgIdx, setImgIdx] = useState<number>(Math.floor(Math.random() * 100));
  // const [stampImgSrc, setStampImgSrc] = useState<string>(
  //   `/api/settings/myinfo/stamp?num=${imgIdx}`
  // ); // url src 설정

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
      id="estimate"
      ref={ref}
      margin={`0px`}
      padding={`0px`}
      pageBreakAfter={`always`}
    >
      <Wrapper
        width={`49.58333em`}
        height={`auto`}
        minHeight={`70.08334em`}
        margin={`10px auto 0`}
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
            자동차점검 &#183; 정비견적서
          </Text>
        </Wrapper>
        <Wrapper dr={`row`} ju={`flex-end`}>
          <Text fontSize={`0.83em`} fontWeight={`400`}>
            일련번호:
          </Text>
          <Text
            fontSize={`0.83em`}
            fontWeight={`400`}
            width={`160px`}
            textAlign={`right`}
          >
            {props.eInfo && props.eInfo.mainNum}
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
                {props.eInfo && props.eInfo.car.regNumber}
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.car.regDate}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper height={`120px`} width={`60%`}>
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
                width={`30%`}
                borderRight={` 1px solid #ccc`}
                height={`100%`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.eInfo && props.eInfo.car.model}
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
                ju={`flex-end`}
                dr={`row`}
                padding={`0px 10px`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.eInfo &&
                    Number(props.eInfo.car.distance).toLocaleString()}
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
                  차대번호
                </Text>
              </Wrapper>
              <Wrapper width={`80%`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.eInfo && props.eInfo.car.idNumber}
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
                  {props.eInfo && props.eInfo.company.comRegNum}
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
                  {props.eInfo && props.eInfo.company.mbRegNum}
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
                  {props.eInfo && props.eInfo.company.name}/
                  {props.eInfo && props.eInfo.company.ownerName}
                </Text>
              </Wrapper>
              <Wrapper
                isRelative
                width={`25%`}
                height={`100%`}
                borderBottom={`1px solid #ccc`}
                al={`flex-start`}
              >
                <Wrapper isAbsolute left={`-55px`}>
                  <Image
                    className="stamp"
                    alt="도장 사진"
                    width={40}
                    height={40}
                    src={props.stampImgSrc}
                  />
                </Wrapper>
                <Text fontSize={`0.67em`} fontWeight={`400`} color={`#9d9d9d`}>
                  (서명 또는 인)
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
                  {props.eInfo && props.eInfo.company.address}
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
                <Text fontSize={`0.75em`} fontWeight={`400`} width={`100px`}>
                  (전화번호:&nbsp;
                </Text>
                <Text fontSize={`0.75em`} fontWeight={`400`} width={`120px`}>
                  {props.eInfo && props.eInfo.company.phoneNum}
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
                width={`18%`}
                height={`100%`}
                borderBottom={`1px solid #ccc`}
                al={`flex-start`}
                padding={`0px 0px 0px 10px`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.eInfo && props.eInfo.costomerType === "n" ? (
                    <BsSquare />
                  ) : (
                    <BsSquareFill />
                  )}
                  &nbsp;보험
                </Text>
              </Wrapper>
              <Wrapper
                width={`70%`}
                height={`100%`}
                borderBottom={`1px solid #ccc`}
                al={`flex-start`}
                padding={`0px 0px 0px 10px`}
              >
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  {props.eInfo && props.eInfo.costomerType === "i" ? (
                    <BsSquare />
                  ) : (
                    <BsSquareFill />
                  )}
                  &nbsp;일반
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* 정비사업자 정보 끝 */}
        <Wrapper al={`flex-start`} padding={`2px`}>
          <Text fontSize={`0.92em`} fontWeight={`400`}>
            아래와 같이 견적합니다
          </Text>
        </Wrapper>

        {/* 견적내용 시작 */}
        <Wrapper border={`2px solid #000`} height={`auto`}>
          <Wrapper dr={`row`} height={`20%`} borderBottom={`1px solid #ccc`}>
            <Wrapper
              width={`30%`}
              borderRight={`1px solid #ccc`}
              height={`44px`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                견적내용
              </Text>
            </Wrapper>
            <Wrapper width={`40%`} borderRight={`1px solid #ccc`}>
              <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
                <Text fontSize={`0.83em`} fontWeight={`400`}>
                  부품내역
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} height={`50%`}>
                <Wrapper width={`25%`} borderRight={`1px solid #ccc`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    코드
                  </Text>
                </Wrapper>
                <Wrapper width={`25%`} borderRight={`1px solid #ccc`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    수량
                  </Text>
                </Wrapper>
                <Wrapper width={`25%`} borderRight={`1px solid #ccc`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    단가
                  </Text>
                </Wrapper>
                <Wrapper width={`25%`}>
                  <Text fontSize={`0.83em`} fontWeight={`400`}>
                    계
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={`15%`}
              height={`44px`}
              borderRight={`1px solid #ccc`}
            >
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                공임
              </Text>
            </Wrapper>
            <Wrapper width={`15%`} height={`44px`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                합계
              </Text>
            </Wrapper>
          </Wrapper>
          {props.eInfo &&
            props.eInfo.works.map((item, idx) => {
              return (
                <Wrapper
                  key={idx}
                  dr={`row`}
                  height={`16%`}
                  borderBottom={`1px solid #ccc`}
                >
                  <Wrapper
                    width={`30%`}
                    borderRight={`1px solid #ccc`}
                    height={`100%`}
                  >
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {item.name}
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={`40%`}
                    borderRight={`1px solid #ccc`}
                    height={`100%`}
                  >
                    <Wrapper dr={`row`} height={`100%`}>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.type}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.quantity.toLocaleString()}
                        </Text>
                      </Wrapper>
                      <Wrapper
                        width={`25%`}
                        borderRight={`1px solid #ccc`}
                        height={`100%`}
                      >
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {item.price.toLocaleString()}
                        </Text>
                      </Wrapper>
                      <Wrapper width={`25%`} height={`100%`}>
                        <Text fontSize={`0.83em`} fontWeight={`400`}>
                          {(item.price * item.quantity).toLocaleString()}
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    width={`15%`}
                    height={`100%`}
                    borderRight={`1px solid #ccc`}
                  >
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {item.wage.toLocaleString()}
                    </Text>
                  </Wrapper>
                  <Wrapper width={`15%`} height={`100%`}>
                    <Text fontSize={`0.83em`} fontWeight={`400`}>
                      {(
                        item.price * item.quantity +
                        item.wage
                      ).toLocaleString()}
                    </Text>
                  </Wrapper>
                </Wrapper>
              );
            })}
        </Wrapper>
        {/* 견적내용 끝 */}

        {/* 보험/일반 구분 시작 */}
        <Wrapper
          dr={`row`}
          border={`2px solid #000`}
          borderTop={`none`}
          height={`54px`}
        >
          <Wrapper width={`17%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                구분(보험&#183;일반)
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {getStrMainCustomerType(
                  props.eInfo && props.eInfo.costomerType
                )}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`16%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                부품
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.price.partsSum.toLocaleString()}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`16%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                공임
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.price.wageSum.toLocaleString()}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`17%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                계
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.price.sum.toLocaleString()}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`17%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                부가가치세
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.price.vat.toLocaleString()}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper width={`17%`} height={`100%`} borderRight={`1px solid #ccc`}>
            <Wrapper height={`50%`} borderBottom={`1px solid #ccc`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                총액
              </Text>
            </Wrapper>
            <Wrapper height={`50%`}>
              <Text fontSize={`0.83em`} fontWeight={`400`}>
                {props.eInfo && props.eInfo.price.total.toLocaleString()}
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* 보험/일반 구분 끝 */}
        <Wrapper al={`flex-start`} padding={`2px`}>
          <Text fontSize={`0.92em`} fontWeight={`400`}>
            「자동차관리법」 제58조제4항 및 같은 법 시행규칙 제134조제2항에 따라
            위와 같이 발급합니다
          </Text>
        </Wrapper>
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
                  className="stamp"
                  alt="도장 사진"
                  width={40}
                  height={40}
                  src={props.stampImgSrc}
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
            1.견적요금은 교통사고 등의 처리를 목적으로 견적서를 발행한 경우에
            청구가 가능합니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            2.본 견적서는 교부일로부터 1개월간 유효합니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            3.본 견적서에 포함되지 아니한 부품을 추가 시에는 소비자의 동의를
            받아야 하며, 정비의뢰자는 동의한 부품 및 <br />
            &nbsp;&nbsp;&nbsp;작업부분만 금액을 지불합니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            4.공급자의 직인이 없는 것은 무효로 합니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            5.부품가는 견적일자 기준입니다.
          </Text>
          <Text fontSize={`0.75em`} textAlign={`left`} fontWeight={`400`}>
            6.본 견적서는 2부를 작성, 정비의뢰자에게 1부를 교부하고, 정비업자는
            1부를 1년간 문서 또는 전산자료로 <br />
            &nbsp;&nbsp;&nbsp;보관하여야 합니다.
          </Text>
        </Wrapper>
        <Wrapper al={`flex-end`} padding={`2px`}>
          <Text fontSize={`0.67em`} fontWeight={`400`}>
            210mm×297mm[백상지 80g/㎡]
          </Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
});

export default EstimateFile;
