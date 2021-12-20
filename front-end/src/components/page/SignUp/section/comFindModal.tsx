import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  companyFindAction,
  companyFindbyNameAction,
} from "../../../../../store/action/user.action";
import { _cComFindModalProps } from "../../../../configure/_cProps.entity";
import { _pComFindModalProps } from "../../../../configure/_pProps.entity";
import ComFindModalPresenter from "./comFindModalPresenter";

/**
 * 회원가입: 업체 검색 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const ComFindModal: NextPage<_cComFindModalProps> = (props) => {
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

  // 화면구성에 넘길 props
  const fProps: _pComFindModalProps = {
    ...props,
    findCompanyHandler,
    searchText,
    setSearchText,
    companyList,
  };

  return <ComFindModalPresenter {...fProps} />;
};

export default ComFindModal;
