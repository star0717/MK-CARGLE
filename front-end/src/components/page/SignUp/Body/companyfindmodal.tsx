import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  companyFindAction,
  companyFindbyNameAction,
} from "../../../../../store/action/user.action";
import { CHAR_DEL } from "../../../../validation/regEx";

interface modalOption {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  setInputForm: React.Dispatch<React.SetStateAction<string>>;
  setInputUser: React.Dispatch<React.SetStateAction<any>>;
  inputForm: any;
  inputUser: any;
  setValue: any;
  style?: React.CSSProperties;
}

const CompanyFindModal: NextPage<modalOption> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const setModalOpen = props.setModalOpen;
  const setInputForm = props.setInputForm;
  const setInputUser = props.setInputUser;
  const inputForm = props.inputForm;
  const inputUser = props.inputUser;
  const setValue = props.setValue;

  const [companyList, setCompanyList] = useState<any>([]); // 검색해서 받아온 업체 리스트 state
  const [searchText, setSearchText] = useState<string>(""); // 검색 input state(업체명 or 사업자번호)

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

  return (
    <div style={props.style}>
      <form onSubmit={findCompanyHandler}>
        <div>
          <div style={{ textAlign: "center" }}>업체명 또는 사업자번호 입력</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="text"
              value={CHAR_DEL(searchText)}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button type="submit">검색</button>
          </div>
          <div style={{ textAlign: "center" }}>
            {companyList.length > 0 ? (
              <table style={{ width: "90%", margin: "0 auto" }}>
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
                      style={{ textAlign: "center", cursor: "pointer" }}
                      id={item.comRegNum}
                      key={index}
                      onClick={(e) => {
                        console.log("ㅇㅇㅇㅇ");
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyFindModal;
