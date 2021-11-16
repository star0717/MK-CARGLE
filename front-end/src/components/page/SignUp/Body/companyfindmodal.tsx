import axios from "axios";
import { NextPage } from "next";
import React, { Component, CSSProperties, useState } from "react";
import { useDispatch } from "react-redux";
import {
  companyFindAction,
  companyFindbyNameAction,
} from "../../../../../store/action/user.action";

interface modalOption {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  setCompanyNum: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}

const CompanyFindModal: NextPage<modalOption> = (props) => {
  const dispatch = useDispatch();

  const setModalOpen = props.setModalOpen;
  const setCompanyNum = props.setCompanyNum;


  const [companyList, setCompanyList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const findCompanyHandler = async (e: any) => {
    e.preventDefault();
    dispatch(companyFindAction(searchText)).then(
      // 먼저 사업자번호로 검색
      (req: any) => {
        if (req.payload === "") {
          // 결과가 없을 땐 사업자명으로 검색
          dispatch(companyFindbyNameAction(searchText)).then((req: any) => {
            if (req.payload.length === 0) {
              setCompanyList([])
            } else {
              setCompanyList(req.payload)
            }
          });
        } else {
          // 사업자 번호 결과값 있을 때 (json으로 받아옴)
          setCompanyList([req.payload])
        }
      },
      (err) => {
        // 입력값이 없을 때
        alert("정보를 입력해주세요");
      }
    );
  };
  return (
    <div style={props.style}>
      <form onSubmit={findCompanyHandler}>
        <div>업체명 또는 사업자번호 입력</div>
        <div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button>검색</button>
        </div>
        {companyList.length > 0 ?
          companyList.map((item:any,index:number) => (
            <div
              id={item.comRegNum}
              key={index}
              onClick={(e) => {
              setCompanyNum(item.comRegNum)
              setModalOpen(false);
            }}>{item.name}</div>
          ))
          :
          <div> 데이터가 존재하지 않습니다. </div>
        }
        {/* {companyList.array.length > 0 ? (
          companyList.array.map((item: any, index: number) => (
            <div key={index}>{item}</div>
          ))
        ) : (
          <div>데이터가 존재하지 않습니다.</div>
        )} */}
      </form>
    </div>
  );
};
export default CompanyFindModal;
