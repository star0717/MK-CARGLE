import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { BsEmojiFrownFill } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch } from "react-redux";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { UseLink } from "src/configure/router.entity";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { _MainProps } from "src/configure/_props.entity";
import {
  getStrMainCustomerType,
  getStrMainStatus,
} from "src/constants/maintenance.const";
import { FindParameters, FindResult } from "src/models/base.entity";
import { Maintenance } from "src/models/maintenance.entity";
import theme from "styles/theme";
import {
  _aGetAuthSignout,
  _aGetMaintenancesList,
} from "../../../../store/action/user.action";
import Calendar from "../../common/calendar";
import {
  ColorSpan,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
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
import { useResizeDetector } from "react-resize-detector";
import { RiArrowDownSLine } from "react-icons/ri";

const MainPage: NextPage<_pMaintenanceProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [schedule, setSchedule] = useState(`${dayjs().format("YYYY.MM.DD")}`);
  const [maintenanceList, setMaintenanceList] = useState(
    props.findResult.docs.filter(
      (item: { status: string }) => item.status !== "r"
    )
  );

  // state초기값으로 props를 넣게 되는경우 발생하는 오류방지용
  useEffect(() => {
    setMaintenanceList(
      props.findResult.docs.filter(
        (item: { status: string }) => item.status !== "r"
      )
    );
  }, [props.findResult.docs]);

  // calendar에 넘길 props 정의
  const calendarProps = {
    schedule,
    setSchedule,
  };

  // 파일 업로드
  const onStampUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollBy({
      // top: window.document.documentElement.scrollHeight,
      top: ref.current,
      behavior: "smooth",
    });
  };

  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper>
      <Wrapper
        padding={`40px 0px`}
        bgImg={`url(../../../../images/mainImage.png)`}
        attachment={`scroll`}
        shadow={theme.boxShadowDark}
      >
        <Wrapper
          padding={`20px 0px 20px`}
          ju={`flex-start`}
          al={`flex-end`}
          width={`1200px`}
          dr={`row`}
        >
          <Wrapper
            width={`auto`}
            padding={`4px 10px 8px`}
            bgColor={theme.basicTheme_C}
            margin={`0px 4px`}
          >
            <ColorSpan
              fontSize={`32px`}
              color={`#fff`}
              textShadow={`2px 2px 2px gray;`}
              fintWeight={`500`}
            >
              {props.tokenValue.uName}
            </ColorSpan>
          </Wrapper>
          <Text
            color={`#fff`}
            fontSize={`28px`}
            textShadow={`2px 2px 2px gray;`}
          >
            님, 반갑습니다!
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
            ju={`flex-start`}
          >
            <Text
              padding={`20px 0px 0px`}
              fontSize={`20px`}
              color={theme.basicTheme_C}
            >
              예약목록
            </Text>
            <Text
              padding={`4px 0px 0px`}
              fontSize={`14px`}
              color={theme.darkGrey_C}
            >
              {schedule}
            </Text>
            <TableWrapper minHeight={`300px`} padding={`20px 40px`}>
              <TableHead
                bgColor={`#f5f5f5`}
                radius={`0px`}
                borderTop={`1px solid #000`}
              >
                <TableHeadLIST color={theme.black_C}>일정표</TableHeadLIST>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableRowLIST color={theme.black_C}>내용</TableRowLIST>
                </TableRow>
              </TableBody>
            </TableWrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`50px 0px 30px`} ref={ref}>
          <SmallButton
            width={`160px`}
            height={`48px`}
            kindOf={`fillDefault`}
            shadow={theme.boxShadowDark}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleScroll(e);
            }}
          >
            정비장부
            <RiArrowDownSLine />
          </SmallButton>
        </Wrapper>
      </Wrapper>
      <CommonTitleWrapper padding={`60px 0px 0px`}>
        <CommonTitle>정비장부</CommonTitle>
        <CommonSubTitle></CommonSubTitle>
      </CommonTitleWrapper>
      <Wrapper width={`1200px`} padding={`40px 0px`}>
        <TableWrapper>
          <Wrapper isSticky={true}>
            <TableHead>
              <TableHeadLIST width={`15%`}>입고일자</TableHeadLIST>
              <TableHeadLIST width={`15%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`11%`}>구분</TableHeadLIST>
              <TableHeadLIST width={`20%`}>작업내용</TableHeadLIST>
              <TableHeadLIST width={`13%`}>문서발급</TableHeadLIST>
              <TableHeadLIST width={`13%`}>국토부</TableHeadLIST>
              <TableHeadLIST width={`13%`}>정비상태</TableHeadLIST>
            </TableHead>
          </Wrapper>
          <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
            <TableBody>
              {props.data.totalDocs > 0 ? (
                maintenanceList?.map((list: any) => (
                  <TableRow
                    key={list._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.MAINTENANCE_BOOK}?id=${list._id}&step=${list.status}`
                      );
                    }}
                  >
                    <TableRowLIST width={`15%`}>
                      {dayjs(list.createdAt).format("YYYY-MM-DD")}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {list.car.regNumber}
                    </TableRowLIST>
                    <TableRowLIST width={`11%`}>
                      {getStrMainCustomerType(list.costomerType)}
                    </TableRowLIST>
                    <TableRowLIST width={`20%`}>
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
          </Wrapper>
        </TableWrapper>
        {/* <PagenationSection {...props} /> */}
        <Wrapper padding={`50px 0px 30px`}>
          <SmallButton
            width={`160px`}
            height={`48px`}
            kindOf={`fillDefault`}
            shadow={theme.boxShadowDark}
            onClick={() => {
              router.push(`${UseLink.MAINTENANCE_BOOK}?step=c`);
            }}
          >
            신규정비등록
            <HiOutlinePlusSm />
          </SmallButton>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

/**
 * 메인: index 컴포넌트(기능)
 * @returns
 */
const Main: NextPage<_MainProps> = (props) => {
  const dispatch = useDispatch();

  const [findResult, setFindResult] = useState<FindResult<Maintenance>>(
    props.data
  );

  const [searchOption, setSearchOption] = useState<string>("name"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  const [searchList, setSearchList] = useState({
    sFrom: props.data.sFrom,
    sTo: props.data.sTo,
    regNumber: "",
    costomerType: "all",
    status: "all",
  });

  useEffect(() => {
    setFindResult(props.data);
  }, [props.data]);
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findCompanyHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 7,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    if (searchList.sFrom !== "") {
      var sFromDate: Date = dayjs(searchList.sFrom).toDate();
      param.sFrom = sFromDate;
    }
    if (searchList.sTo !== "") {
      var sToDate: Date = dayjs(searchList.sTo).toDate();
      param.sTo = sToDate;
    }
    //searchDetails 빈 json 생성
    const searchDetails: any = {};
    //차량번호
    if (searchList.regNumber !== "")
      searchDetails.regNumber = searchList.regNumber;
    else delete searchDetails.regNumber;
    //구분
    if (searchList.costomerType !== "all")
      searchDetails.costomerType = searchList.costomerType;
    else delete searchDetails.costomerType;
    //정비상태
    if (searchList.status !== "all") searchDetails.status = searchList.status;
    else delete searchDetails.status;

    dispatch(_aGetMaintenancesList(param, searchDetails)).then((res: any) => {
      setFindResult(res.payload);
    });
  };

  const maintenanceListProps: _pMaintenanceProps = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
    searchList,
    setSearchList,
  };

  return (
    <BodyWrapper>
      <MainPage {...maintenanceListProps} />
    </BodyWrapper>
  );
};

export default Main;
