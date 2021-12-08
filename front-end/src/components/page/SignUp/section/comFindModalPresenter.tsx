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
  TableBodyLIST,
  CommonForm,
  SearchInput,
  SearchWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { CHAR_DEL } from "../../../../validation/regEx";
import { BsSearch } from 'react-icons/bs';

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
      <Wrapper height={`500px`}>
        <CommonForm onSubmit={findCompanyHandler}>
          <Text>업체명 또는 사업자번호 입력</Text>
          <Wrapper
            al={`flex-start`}
            padding={`10px 5px`}
            dr={`row`}
            ju={`flex-start`}
          >

            <SearchWrapper width={`auto`} dr={`row`} border={`1px solid #000`}>
              <BsSearch />

              <SearchInput
                width={`200px`}
                padding={`0px 5px 0px 5px`}
                type="text"
                value={CHAR_DEL(searchText)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchText(e.target.value);
                }}
              />

            </SearchWrapper>
          </Wrapper>
          <button type="submit">검색</button>
          <Wrapper>
            {companyList.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>업체명</th>
                    <th>대표자명</th>
                    <th>사업자등록번호</th>
                  </tr>
                </thead>
                <tbody>
                  {companyList.map((item: any, index: number) => (
                    <tr
                      style={{ cursor: "pointer" }}
                      id={item.comRegNum}
                      key={index}
                      onClick={(e) => {
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
                      <td>{item.name}</td>
                      <td>{item.ownerName}</td>
                      <td>{item.comRegNum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "데이터가 존재하지 않습니다."
            )}
          </Wrapper>
        </CommonForm>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ComFindModalPresenter;
