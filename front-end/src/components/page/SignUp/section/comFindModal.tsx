import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  companyFindAction,
  companyFindbyNameAction,
} from "../../../../../store/action/user.action";
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
    dispatch(companyFindAction(searchText)).then(
      (res: any) => {
        if (res.payload === "") {
          // 결과가 없을 땐 사업자명으로 검색
          dispatch(companyFindbyNameAction(searchText)).then((res: any) => {
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
              <TableWrapper margin={`0px`} padding={`0px`}>
                <TableHead margin={`0px`} borderTop={`0px`}>
                  <TableHeadLIST width={`226px`}>업체명</TableHeadLIST>
                  <TableHeadLIST width={`226px`}>대표자명</TableHeadLIST>
                  <TableHeadLIST width={`226px`}>사업자등록번호</TableHeadLIST>
                </TableHead>
                {companyList.length === 0 ? (
                  <Wrapper>소속 업체를 검색하세요.</Wrapper>
                ) : (
                  <TableBody margin={`0px`} overflow={`auto`}>
                    {companyList.map((item: any, index: number) => (
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

export default ComFindModal;
