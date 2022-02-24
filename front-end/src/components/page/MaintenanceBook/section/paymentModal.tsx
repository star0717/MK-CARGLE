import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonSubTitle,
  SmallButton,
  Checkbox,
  CheckInput,
  CheckMark,
  TextInput2,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  CommonButton,
  CommonSmallTitle,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillMinusSquare } from "react-icons/ai";
import { FaMinusSquare } from "react-icons/fa";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
const PaymentModal: NextPage<_pPartsSetProps> = (props) => {
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
    <WholeWrapper>
      <Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#ccc`}>1</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#ccc`}>2</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#314af5`}>3</Text>
            <Text fontSize={`20px`} color={`#314af5`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`10px 0px 0px`}>
          <CommonSmallTitle margin={`0px 0px 30px 0px`}>
            서류발급
          </CommonSmallTitle>
        </Wrapper>
        <Wrapper
          width={`60%`}
          padding={`10px 80px`}
          border={`1px solid #ccc`}
          radius={`8px`}
          shadow={`0px 5px 10px rgba(220,220,220,0.6)`}
        >
          <Wrapper
            dr={`row`}
            borderBottom={`1px solid #ccc`}
            height={`50px`}
            ju={`space-between`}
          >
            <Text>보유포인트 : 10,300 P</Text>
            <SmallButton kindOf={`default`}>미리보기</SmallButton>
          </Wrapper>
          <Wrapper dr={`row`} height={`50px`} ju={`space-between`}>
            <Text>서류를 선택하세요.</Text>
            <Wrapper dr={`row`} width={`auto`}>
              <Checkbox width={`120px`}>
                견적서
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                정비명세서
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} height={`50px`} ju={`space-between`}>
            <Text>발급방삭을 선택해주세요.</Text>
            <Wrapper dr={`row`} width={`auto`}>
              <Checkbox width={`120px`}>
                PC인쇄
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
              <Checkbox width={`120px`}>
                모바일전송
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
              </Checkbox>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper
          dr={`row`}
          width={`60%`}
          ju={`space-between`}
          padding={`10px 0px`}
        >
          <TextInput2 width={`580px`}></TextInput2>
          <SmallButton kindOf={`default`}>추가하기</SmallButton>
        </Wrapper>
        <Wrapper width={`60%`}>
          <TableWrapper minHeight={`200px`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`} ju={`center`}>
                <TableHeadLIST fontSize={`18px`}>등록된 전화번호</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} ju={`flex-start`}>
              <TableBody minHeight={`200px`} margin={`10px 0px 0px 0px`}>
                <TableRow
                  height={`50px`}
                  kindOf={`noHover`}
                  ju={`space-around`}
                >
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
                <TableRow
                  height={`50px`}
                  kindOf={`noHover`}
                  ju={`space-around`}
                >
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
                <TableRow
                  height={`50px`}
                  kindOf={`noHover`}
                  ju={`space-around`}
                >
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      width={`160px`}
                      radius={`100px`}
                    >
                      010-111-1111
                      <FaMinusSquare />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        <CommonButtonWrapper ju={`center`} padding={`20px 30px 30px`}>
          <CommonButton
            type="button"
            kindOf={`grey`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
          <CommonButton type="button" kindOf={`white`}>
            이전으로
          </CommonButton>
          <CommonButton type="button">출고완료</CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default PaymentModal;
