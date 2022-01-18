import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  _aGetAuthCompany,
  _aGetAuthCompanies,
} from "../../../../../store/action/user.action";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  SearchInput,
  IconButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { CHAR_DEL } from "../../../../validation/regEx";
import { BsSearch } from "react-icons/bs";
import { _pComFindModalProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 업체 검색 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const ComFindModal: NextPage<_pComFindModalProps> = (props) => {
  const dispatch = useDispatch();

  const [companyList, setCompanyList] = useState<any>([]); // 검색해서 받아온 업체 리스트 state
  const [searchText, setSearchText] = useState<string>(""); // 검색 input state(업체명 or 사업자번호)

  /**
   * 업체 조회 handler
   * @param e
   */
  const findCompanyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 먼저 사업자번호로 검색
    dispatch(_aGetAuthCompany(searchText)).then(
      (res: any) => {
        if (res.payload === "") {
          // 결과가 없을 땐 사업자명으로 검색
          dispatch(_aGetAuthCompanies(searchText)).then((res: any) => {
            if (res.payload.length === 0) {
              setCompanyList([]);
            } else {
              setCompanyList(res.payload);
            }
          });
        } else {
          // 사업자 번호 결과값 있을 때 (json으로 받아옴)
          setCompanyList([res.payload]);
        }
      },
      (err) => {
        // 입력값이 없을 때
        alert("업체명 또는 사업자번호를 입력해주세요.");
        setCompanyList([]);
      }
    );
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper height={`500px`} ju={`flex-start`}>
          <form onSubmit={findCompanyHandler}>
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
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchText(CHAR_DEL(e.target.value));
                  }}
                />
              </Wrapper>
              <Wrapper width={`36px`} height={`46px`}>
                <Text fontSize={`24px`}>
                  <IconButton type="submit" shadow={`none`}>
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper fontSize={`18px`}>
              <Wrapper margin={`0px`} padding={`0px`}>
                <table>
                  <thead>
                    <tr>
                      <th>업체명</th>
                      <th>대표자명</th>
                      <th>사업자등록번호</th>
                    </tr>
                  </thead>
                  {companyList.length === 0 ? (
                    <Wrapper>소속 업체를 검색하세요.</Wrapper>
                  ) : (
                    <tbody>
                      {companyList.map((item: any, index: number) => (
                        <tr
                          id={item.comRegNum}
                          key={index}
                          onClick={(
                            e: React.MouseEvent<HTMLTableRowElement>
                          ) => {
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
                          <td width={`226px`}>{item.name}</td>
                          <td width={`226px`}>{item.ownerName}</td>
                          <td width={`226px`}>{item.comRegNum}</td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </Wrapper>
            </Wrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ComFindModal;
