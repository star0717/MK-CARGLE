import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonTitle,
  CommonSubTitle,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  SmallButton,
  CommonButton,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { IoMdDocument } from "react-icons/io";
const MolitModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //국토부 전송내역 여부
  const [molit, setMolit] = useState<Boolean>(false);

  //정비내역수
  const [asd, setAsd] = useState<number>(1);
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
    <BodyWrapper>
      <WholeWrapper>
        {molit === true ? (
          //국토부 내용이 있다면
          <Wrapper>
            <CommonButton
              onClick={() => {
                setMolit(!molit);
              }}
            >
              화면전환
            </CommonButton>
            <Wrapper dr={`row`}>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>1</Text>
                <GoPrimitiveDot />
              </Wrapper>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>2</Text>
                <GoPrimitiveDot />
              </Wrapper>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>3</Text>
                <GoPrimitiveDot />
              </Wrapper>
            </Wrapper>
            <Wrapper width={`300px`}>
              <CommonSubTitle>국토부 전송 여부 확인</CommonSubTitle>
            </Wrapper>
            <Wrapper>
              <Text>{`"국토부 전송 항목이 없습니다."`}</Text>
            </Wrapper>
            <Text fontSize={`200px`}>
              <IoMdDocument />
            </Text>
            <Wrapper dr={`row`} width={`250px`} ju={`space-between`}>
              <SmallButton kindOf={`default`} width={`100px`}>
                취소
              </SmallButton>
              <SmallButton kindOf={`default`} width={`100px`}>
                다음
              </SmallButton>
            </Wrapper>
          </Wrapper>
        ) : (
          //국토부 내용이 없다면
          <Wrapper>
            <CommonButton
              onClick={() => {
                setMolit(!molit);
              }}
            >
              화면전환
            </CommonButton>
            <Wrapper dr={`row`}>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>1</Text>
                <GoPrimitiveDot />
              </Wrapper>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>2</Text>
                <GoPrimitiveDot />
              </Wrapper>
              <Wrapper width={`100px`} ju={`space-between`}>
                <Text>3</Text>
                <GoPrimitiveDot />
              </Wrapper>
            </Wrapper>
            <Wrapper width={`300px`}>
              <CommonSubTitle>국토부 전송 여부 확인</CommonSubTitle>
            </Wrapper>
            <Wrapper>
              <Text>{`"${asd}건의 정비 내역을 국토부로 전송하시겠습니까??"`}</Text>
            </Wrapper>
            <TableWrapper>
              <Wrapper isSticky={true}>
                <TableHead radius={`8px 8px 0px 0px`}>
                  <TableHeadLIST>정비내역</TableHeadLIST>
                  <TableHeadLIST>국토부정비항목</TableHeadLIST>
                  <TableHeadLIST>코드</TableHeadLIST>
                </TableHead>
              </Wrapper>
              <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                <TableBody>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                  <TableRow>
                    <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                    <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                    <TableRowLIST>B01</TableRowLIST>
                  </TableRow>
                </TableBody>
              </Wrapper>
            </TableWrapper>
            <Text color={`red`}>
              *국토부 정비 항목 취소는 정비 내역 수정에서 가능합니다.
            </Text>
            <Wrapper dr={`row`} width={`250px`} ju={`space-between`}>
              <SmallButton kindOf={`default`} width={`100px`}>
                취소
              </SmallButton>
              <SmallButton kindOf={`default`} width={`100px`}>
                다음
              </SmallButton>
            </Wrapper>
          </Wrapper>
        )}
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default MolitModal;
