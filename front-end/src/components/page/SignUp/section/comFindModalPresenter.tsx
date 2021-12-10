import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  TextInput,
  Text,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  CommonForm,
  SearchInput,
  SearchInputWrapper,
  Pagenation,
  PagenationWrapper,
  PagenationBtn,
} from "../../../styles/CommonComponents";
import React from "react";
import { CHAR_DEL } from "../../../../validation/regEx";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ComFindModalPresenter: NextPage<any> = (props) => {
  // props 재정의
  const setModalOpen = props.setModalOpen;
  const setInputForm = props.setInputForm;
  const setInputUser = props.setInputUser;
  const inputForm = props.inputForm;
  const inputUser = props.inputUser;
  const setValue = props.setValue;
  const findCompanyHandler = props.findCompanyHandler;
  const searchText = props.searchText;
  const setSearchText = props.setSearchText;
  const companyList = props.companyList;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper height={`500px`} ju={`flex-start`}>
        <CommonForm ju={`flex-start`} onSubmit={findCompanyHandler}>
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
                value={CHAR_DEL(searchText)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchText(e.target.value);
                }}
              />
            </Wrapper>
            <Wrapper width={`36px`} height={`46px`}>
              <Text fontSize={`24px`}>
                <button type="submit">
                  <BsSearch />
                </button>
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
              <TableBody>
                {companyList.map((item: any, index: number) => (
                  <TableRow
                    margin={`0px`}
                    id={item.comRegNum}
                    key={index}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setInputForm({
                        ...inputForm,
                        companyNum: item.comRegNum,
                      });
                      setInputUser({ ...inputUser, _cID: item._id });
                      setValue("companyNum", item.comRegNum, {
                        shouldValidate: true,
                      });
                      setModalOpen(false);
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
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
                <TableRow margin={`0px`}>
                  <TableRowLIST width={`226px`}>상호명</TableRowLIST>
                  <TableRowLIST width={`226px`}>변무영</TableRowLIST>
                  <TableRowLIST width={`226px`}>338800960</TableRowLIST>
                </TableRow>
              </TableBody>
            </TableWrapper>
          </Wrapper>
          <PagenationWrapper>
            <PagenationBtn>
              <IoIosArrowBack />
            </PagenationBtn>
            <Pagenation>1</Pagenation>
            <PagenationBtn>
              <IoIosArrowForward />
            </PagenationBtn>
          </PagenationWrapper>
        </CommonForm>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ComFindModalPresenter;
