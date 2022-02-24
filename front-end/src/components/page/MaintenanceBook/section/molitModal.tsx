import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonTitle,
  CommonSmallTitle,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  SmallButton,
  CommonButton,
  ColorSpan,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineFileExcel } from "react-icons/ai";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { MainWork } from "src/models/maintenance.entity";
import { getTsItem } from "src/constants/part.const";
const MolitModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //국토부 전송내역 여부
  const [molitList, setMolitList] = useState<MainWork[]>(
    props.workList.filter((item) => item.tsCode.length !== 0)
  );
  const [molitCheck, setMolitCheck] = useState<Boolean>(
    props.workList.filter((item) => item.tsCode.length !== 0).length !== 0
      ? true
      : false
  );

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  useEffect(() => {
    setMolitList(props.workList.filter((item) => item.tsCode.length !== 0));
    setMolitCheck(
      props.workList.filter((item) => item.tsCode.length !== 0).length !== 0
        ? true
        : false
    );
  }, [props]);

  // console.log(
  //   "##",
  //   molitList.map((item) => {
  //     item.tsCode;
  //     getTsItem(item.tsCode);
  //   })
  // );
  molitList.map((item) => {
    console.log(item);
    console.log(getTsItem(item.tsCode));
  });
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper>
      {molitCheck ? (
        //국토부 내용이 있다면
        <Wrapper>
          <Wrapper dr={`row`}>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text>1</Text>
              <Text fontSize={`20px`} color={`#314af5`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text>2</Text>
              <Text fontSize={`20px`} color={`#ccc`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text>3</Text>
              <Text fontSize={`20px`} color={`#ccc`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper padding={`10px 0px 0px`}>
            <CommonSmallTitle margin={`0px 0px 30px 0px`}>
              국토부 전송 여부 확인
            </CommonSmallTitle>
          </Wrapper>
          <Wrapper>
            <Text fontSize={`20px`}>
              "
              <ColorSpan fontSize={`20px`} color={`#314af5`}>
                {molitList.length}
              </ColorSpan>
              건의 정비 내역을 국토부로 전송하시겠습니까?? "
            </Text>
          </Wrapper>
          <TableWrapper minHeight={`350px`} padding={`40px 0px 0px`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST>정비내역</TableHeadLIST>
                <TableHeadLIST>국토부정비항목</TableHeadLIST>
                <TableHeadLIST>코드</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`300px`} ju={`flex-start`}>
              <TableBody>
                {molitList.map((item) => {
                  return (
                    <TableRow key={item.code}>
                      <TableRowLIST>{item.name}</TableRowLIST>
                      <TableRowLIST>{item.name}</TableRowLIST>
                      <TableRowLIST>{item.tsCode}</TableRowLIST>
                    </TableRow>
                  );
                })}
                {/* <TableRow>
                  <TableRowLIST>정비내역명칭입니다.</TableRowLIST>
                  <TableRowLIST>국토부정비항목입니다.</TableRowLIST>
                  <TableRowLIST>B01</TableRowLIST>
                </TableRow> */}
              </TableBody>
            </Wrapper>
          </TableWrapper>
          <Wrapper al={`flex-end`} padding={`10px 0px`}>
            <Text color={`#d6263b`}>
              *국토부 정비 항목 취소는 정비 내역 수정에서 가능합니다.
            </Text>
          </Wrapper>
          <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
            <CommonButton
              type="button"
              kindOf={`white`}
              width={`300px`}
              height={`50px`}
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton type="button" width={`300px`} height={`50px`}>
              다음
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      ) : (
        //국토부 내용이 없다면
        <Wrapper>
          <Wrapper dr={`row`}>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text color={`#314af5`}>1</Text>
              <Text fontSize={`20px`} color={`#314af5`}>
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
              <Text color={`#ccc`}>3</Text>
              <Text fontSize={`20px`} color={`#ccc`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper padding={`10px 0px 0px`}>
            <CommonSmallTitle margin={`0px 0px 30px 0px`}>
              국토부 전송 여부 확인
            </CommonSmallTitle>
          </Wrapper>
          <Wrapper>
            <Text fontSize={`20px`}>{`"국토부 전송 항목이 없습니다."`}</Text>
          </Wrapper>
          <Text fontSize={`200px`} color={`#ccc`}>
            <AiOutlineFileExcel />
          </Text>
          <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
            <CommonButton
              type="button"
              kindOf={`white`}
              width={`300px`}
              height={`50px`}
            >
              취소
            </CommonButton>
            <CommonButton type="button" width={`300px`} height={`50px`}>
              다음
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};

export default MolitModal;
