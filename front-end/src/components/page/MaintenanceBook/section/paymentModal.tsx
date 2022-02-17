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
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
const PaymentModal: NextPage<any> = (props) => {
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
    <BodyWrapper>
      <WholeWrapper>
        <Wrapper>
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
            <CommonSubTitle>서류발급</CommonSubTitle>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>보유포인트 : 10,300 P</Text>
            <SmallButton kindOf={`default`}>미리보기</SmallButton>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>서류를 선택하세요.</Text>
            <Checkbox kindOf={`TableCheckBox`}>
              <CheckInput type="checkbox" />
              <CheckMark></CheckMark>
            </Checkbox>
            <Text>견적서</Text>
            <Checkbox kindOf={`TableCheckBox`}>
              <CheckInput type="checkbox" />
              <CheckMark></CheckMark>
            </Checkbox>
            <Text>정비명세서</Text>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>발급방삭을 선택해주세요.</Text>
            <Checkbox kindOf={`TableCheckBox`}>
              <CheckInput type="checkbox" />
              <CheckMark></CheckMark>
            </Checkbox>
            <Text>모바일전송</Text>
            <Checkbox kindOf={`TableCheckBox`}>
              <CheckInput type="checkbox" />
              <CheckMark></CheckMark>
            </Checkbox>
            <Text>PC인쇄</Text>
          </Wrapper>
          <Wrapper dr={`row`}>
            <TextInput2></TextInput2>
            <SmallButton kindOf={`default`}>추가하기</SmallButton>
          </Wrapper>
          <TableWrapper>
            <Wrapper isSticky={true} width={`500px`}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST>등록된 전화번호</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} width={`500px`} ju={`flex-start`}>
              <TableBody min-height={`200px`}>
                <TableRow>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>{" "}
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>{" "}
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>{" "}
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>{" "}
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>{" "}
                  <TableRowLIST>
                    <SmallButton
                      kindOf={`default`}
                      height={`30px`}
                      width={`130px`}
                    >
                      010-111-1111
                      <IoIosCloseCircle />
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
              </TableBody>
            </Wrapper>
          </TableWrapper>
          <Wrapper dr={`row`} width={`600px`} ju={`space-between`}>
            <CommonButton>취소</CommonButton>
            <CommonButton>이전으로</CommonButton>
            <CommonButton>출고완료</CommonButton>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default PaymentModal;
