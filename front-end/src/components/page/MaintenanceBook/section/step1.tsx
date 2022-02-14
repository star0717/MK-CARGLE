import React, { useState } from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  ColorSpan,
  Combo,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { StepQuery, UseLink } from "src/configure/router.entity";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";
import { BsChevronDoubleUp, BsPencilSquare, BsSearch } from "react-icons/bs";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FaCar } from "react-icons/fa";

const SelectCar: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [showCar, setShowCar] = useState<boolean>(false);
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onSearchCarHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          {/* <CommonTitle>
            차량선택 후 정비진행 버튼 클릭 시 정비가 진행됩니다.
          </CommonTitle> */}
          <CommonSubTitle>
            <ColorSpan color={`#314FA5`}>차량선택</ColorSpan> 후 정비진행 버튼
            클릭 시 정비가 진행됩니다.
          </CommonSubTitle>
          <JoinStepBarWrapper>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`progress`}>
                <AiOutlineFileText />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량선택
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <AiOutlineFileText />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량입고
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>{<AiOutlineUser />}</JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비중
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={"line2"}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <MdOutlineBusinessCenter />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비완료
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <MdOutlineUploadFile />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                출고완료
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        </CommonTitleWrapper>
        <Wrapper
          dr={`row`}
          padding={`40px 0px 0px`}
          ju={`space-between`}
          al={`flex-start`}
        >
          <Wrapper width={`30%`}>
            <SearchInputWrapper
              type="text"
              width={`30%`}
              padding={`0px 5px`}
              dr={`row`}
              borderBottom={`1px solid #000`}
            >
              <form onSubmit={onSearchCarHandler}>
                <Wrapper>
                  <SearchInput
                    width={`332px`}
                    padding={`0px 5px 0px 5px`}
                    placeholder="차량번호를 입력하세요."
                    type="text"
                    value={props.filterValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      props.setFilterValue(e.target.value);
                    }}
                  />
                </Wrapper>
                <Wrapper width={`36px`} height={`46px`}>
                  <IconButton type="submit" shadow={`none`}>
                    <BsSearch />
                  </IconButton>
                </Wrapper>
              </form>
            </SearchInputWrapper>
            <Wrapper width={`30%`}>
              <BsChevronDoubleUp />
              <Text>선택된 차량이 없습니다</Text>
              <Text>차량 선택 후 정비등록을 진행할 수 있습니다</Text>
              <FaCar />
            </Wrapper>
          </Wrapper>

          <Wrapper width={`70%`}>
            <Wrapper dr={`row`}>
              <SmallButton
                type="button"
                kindOf={`default`}
                onClick={() => {
                  router.back();
                }}
              >
                뒤로가기
              </SmallButton>
              <SmallButton
                type="button"
                kindOf={`default`}
                onClick={() => {
                  router.push(
                    `${UseLink.MAINTENANCE_BOOK}/${StepQuery.SECOND}`
                  );
                }}
              >
                정비진행
              </SmallButton>
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>정비기간</Text>
              <TextInput2 type="date" />
              <Text>~</Text>
              <TextInput2 type="date" />
              <Text>차량출고일</Text>
              <TextInput2 type="date" />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>정비책임자</Text>
              <TextInput2 type="text" />
            </Wrapper>
            <Wrapper dr={`row`}>
              <Wrapper dr={`row`}>
                <Text>정비구분</Text>
                <Combo>
                  <option value="1">일반</option>
                </Combo>
                <TextInput2 type="text" />
                <TextInput2 type="text" />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text>추가정비동의</Text>
                <Combo>
                  <option value="1">동의</option>
                </Combo>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`}>
              <Text>정비내역</Text>
              <Wrapper dr={`row`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  height={`40px`}
                  al={`center`}
                >
                  <Checkbox>
                    부품조회
                    <CheckInput type="checkbox" onChange={() => {}} />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {}}
                >
                  부품조회
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {}}
                >
                  세트부품
                </SmallButton>
              </Wrapper>
            </Wrapper>
            <Wrapper>
              <TableWrapper>
                <TableHead>
                  <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
                  <TableHeadLIST width={`15%`}>국토부</TableHeadLIST>
                  <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
                  <TableHeadLIST width={`15%`}>단가</TableHeadLIST>
                  <TableHeadLIST width={`14%`}>수량</TableHeadLIST>
                  <TableHeadLIST width={`14%`}>계</TableHeadLIST>
                  <TableHeadLIST width={`8%`}>기술료</TableHeadLIST>
                </TableHead>
                <TableBody>
                  <TableRowLIST>
                    <TableRow width={`15%`}>1</TableRow>
                    <TableRow width={`15%`}>2</TableRow>
                    <TableRow width={`14%`}>3</TableRow>
                    <TableRow width={`15%`}>4</TableRow>
                    <TableRow width={`14%`}>5</TableRow>
                    <TableRow width={`14%`}>6</TableRow>
                    <TableRow width={`8%`}>7</TableRow>
                  </TableRowLIST>
                </TableBody>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper></Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SelectCar;
