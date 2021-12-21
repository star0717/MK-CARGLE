import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  CommonForm,
  SearchInput,
  IconButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { CHAR_DEL } from "../../../../validation/regEx";
import { BsSearch } from "react-icons/bs";
import { _pComFindModalProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 업체 검색 모달 컴포넌트(화면)
 * @param props
 * @returns
 */
const ComFindModalPresenter: NextPage<_pComFindModalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper height={`500px`} ju={`flex-start`}>
          <CommonForm ju={`flex-start`} onSubmit={props.findCompanyHandler}>
            <Wrapper
              width={`678px`}
              padding={`0px 5px`}
              dr={`row`}
              borderBottom={`1px solid #000`}
              margin={`10px 0px 0px`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`632px`}
                  padding={`0px 5px 0px 5px`}
                  placeholder="업체명 또는 사업자번호 입력"
                  type="text"
                  value={props.searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setSearchText(CHAR_DEL(e.target.value));
                  }}
                />
              </Wrapper>
              <Wrapper width={`36px`} height={`46px`}>
                <Text fontSize={`24px`}>
                  <IconButton type="submit">
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper fontSize={`18px`}>
              <TableWrapper margin={`0px`} padding={`0px`}>
                <TableHead margin={`0px`} borderTop={`0px`}>
                  <TableHeadLIST width={`226px`}>업체명</TableHeadLIST>
                  <TableHeadLIST width={`226px`}>대표자명</TableHeadLIST>
                  <TableHeadLIST width={`226px`}>사업자등록번호</TableHeadLIST>
                </TableHead>
                {props.companyList.length === 0 ? (
                  <Wrapper>소속 업체를 검색하세요.</Wrapper>
                ) : (
                  <TableBody margin={`0px`} overflow={`auto`}>
                    {props.companyList.map((item: any, index: number) => (
                      <TableRow
                        margin={`0px`}
                        id={item.comRegNum}
                        key={index}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          props.setInputForm({
                            ...props.inputForm,
                            companyNum: item.comRegNum,
                          });
                          props.setInputUser({
                            ...props.inputUser,
                            _cID: item._id,
                          });
                          props.setValue("companyNum", item.comRegNum, {
                            shouldValidate: true,
                          });
                          props.setModalOpen(false);
                        }}
                      >
                        <TableRowLIST width={`226px`}>{item.name}</TableRowLIST>
                        <TableRowLIST width={`226px`}>
                          {item.ownerName}
                        </TableRowLIST>
                        <TableRowLIST width={`226px`}>
                          {item.comRegNum}
                        </TableRowLIST>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </TableWrapper>
            </Wrapper>
          </CommonForm>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ComFindModalPresenter;
