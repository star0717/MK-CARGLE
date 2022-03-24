import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { BsEmojiFrownFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { UseLink } from "src/configure/router.entity";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { _MainProps } from "src/configure/_props.entity";
import { PagenationSection } from "src/components/common/sections";
import {
  getStrMainCustomerType,
  getStrMainStatus,
} from "src/constants/maintenance.const";
import { FindResult } from "src/models/base.entity";
import { Maintenance } from "src/models/maintenance.entity";
import theme from "styles/theme";
import { _aGetAuthSignout } from "../../../../store/action/user.action";
import Calendar from "../../common/calendar";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  ColorSpan,
  RsWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";

/**
 * 메인: index 컴포넌트(기능)
 * @returns
 */
const Main: NextPage<_MainProps> = (props) => {
  const [findResult, setFindResult] = useState<FindResult<Maintenance>>(
    props.data.mtData
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [schedule, setSchedule] = useState(
    `${new Date().toLocaleDateString()} 일정`
  );

  console.log(findResult);

  // calendar에 넘길 props 정의
  const calendarProps = {
    schedule,
    setSchedule,
  };

  // 파일 업로드
  const onStampUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <BodyWrapper>
      <WholeWrapper>
        <Wrapper bgColor={`#8DAFCE`} padding={`40px 0px`}>
          <Wrapper padding={`0px 0px 20px`} al={`flex-start`} width={`1200px`}>
            <Text color={`#fff`} fontSize={`32px`}>
              {/* 홍길동님, 반갑습니다! */}
              {props.tokenValue.uName}님, 반갑습니다!
            </Text>
          </Wrapper>
          <Wrapper dr={`row`} isRelative width={`1200px`} ju={`space-between`}>
            <Wrapper
              width={`410px`}
              border={theme.border}
              bgColor={`#fff`}
              height={`410px`}
              radius={theme.radius}
              shadow={theme.boxShadowDark}
            >
              <Calendar {...calendarProps} />
            </Wrapper>
            {/* <Wrapper width={`10%`}> */}
            {/* <SmallButton
                  type="button"
                  width={`40px`}
                  height={`40px`}
                  kindOf={`default`}
                  fontSize={`40px`}
                  radius={`40px`}
                  onClick={() => {
                    // setRegisterOpen(!registerOpen);
                  }}
                > */}
            {/* {registerOpen ? <MdArrowLeft /> : <MdArrowRight />} */}
            {/* </SmallButton>
              </Wrapper> */}
            {/* {registerOpen && ( */}
            <Wrapper
              width={`60%`}
              border={theme.border}
              bgColor={`#fff`}
              radius={theme.radius}
              height={`410px`}
              shadow={theme.boxShadowDark}
            >
              {schedule}
            </Wrapper>
            {/* )} */}
          </Wrapper>
        </Wrapper>
        <Wrapper width={`1200px`} padding={`40px 0px`}>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST
                width={`5%`}
                onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`15%`}>입고일자</TableHeadLIST>
              <TableHeadLIST width={`15%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`11%`}>구분</TableHeadLIST>
              <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
              <TableHeadLIST width={`13%`}>문서발급</TableHeadLIST>
              <TableHeadLIST width={`13%`}>국토부</TableHeadLIST>
              <TableHeadLIST width={`13%`}>정비상태</TableHeadLIST>
            </TableHead>
            <TableBody>
              {findResult.totalDocs > 0 ? (
                findResult.docs?.map((list: any) => (
                  <TableRow
                    key={list._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.MAINTENANCE_BOOK}?id=${list._id}&step=${list.status}`
                      );
                    }}
                  >
                    <TableRowLIST
                      width={`5%`}
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <Checkbox kindOf={`TableCheckBox`}>
                        <CheckInput type="checkbox" />
                        <CheckMark></CheckMark>
                      </Checkbox>
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {dayjs(list.createdAt).format("YYYY-MM-DD")}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {list.car.regNumber}
                    </TableRowLIST>
                    <TableRowLIST width={`11%`}>
                      {getStrMainCustomerType(list.costomerType)}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {list.works?.length > 1
                        ? `${list.works[0]?.name} 외 ${list.works.length - 1}건`
                        : list.works[0]?.name}
                    </TableRowLIST>
                    <TableRowLIST width={`13%`}>
                      {list?.estimate ? (
                        <Wrapper dr={`row`} width={`auto`}>
                          <ColorSpan color={`#51b351`} margin={`4px 0px 0px`}>
                            <GoPrimitiveDot />
                          </ColorSpan>
                          발급완료
                        </Wrapper>
                      ) : (
                        <Wrapper dr={`row`} width={`auto`}>
                          <ColorSpan color={`#d6263b`} margin={`4px 0px 0px`}>
                            <GoPrimitiveDot />
                          </ColorSpan>
                          미발급
                        </Wrapper>
                      )}
                    </TableRowLIST>
                    <TableRowLIST width={`13%`}>{"api준비중"}</TableRowLIST>
                    <TableRowLIST width={`13%`}>
                      {getStrMainStatus(list.status)}
                    </TableRowLIST>
                  </TableRow>
                ))
              ) : (
                <Wrapper minHeight={`445px`}>
                  <Text fontSize={`48px`} color={`#c4c4c4`}>
                    <BsEmojiFrownFill />
                  </Text>
                  <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                </Wrapper>
              )}
            </TableBody>
          </TableWrapper>
          {/* <PagenationSection {...props} /> */}
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default Main;
