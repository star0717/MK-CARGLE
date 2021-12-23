import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCompanies,
  getComRegFile,
} from "../../../../../store/action/user.action";
import { AdminCompaniesList } from "../../../../../store/interfaces";
import { FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import {
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";

const AdminCompanies: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState<Company[]>();
  const [loadList, setLoadList] = useState<boolean>(false);

  const getComListHandler = () => {
    dispatch(getCompanies()).then((res: AdminCompaniesList) => {
      const result: FindResult<Company> = res.payload;
      setCompanies(result.docs);
    });
  };

  const downloadComRegFileHandler = (id: string) => {
    dispatch(getComRegFile(id));
  };

  // 페이지가 로드될 때 한번만 호출되도록 설정
  useEffect(() => {
    if (loadList == false) {
      getComListHandler();
      setLoadList(true);
    }
  }, [companies]);

  return (
    <WholeWrapper>
      <Wrapper width={"1200px"}>
        <Text>업체 관리</Text>
        <TableWrapper>
          <TableHead>
            <TableHeadLIST width={`300px`}>가입일</TableHeadLIST>
            <TableHeadLIST width={`300px`}>업체명</TableHeadLIST>
            <TableHeadLIST width={`300px`}>사업자등록증</TableHeadLIST>
            <TableHeadLIST width={`300px`}>정비업등록증</TableHeadLIST>
            <TableHeadLIST width={`300px`}>대표자명</TableHeadLIST>
          </TableHead>
          <TableBody>
            {companies?.map((doc) => (
              <TableRow key={doc._id}>
                <TableRowLIST width={`300px`}>{doc.createdAt}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`300px`}>
                  <a
                    href="/api/admin/review/com-reg-doc/${id}"
                    target={"_blank"}
                  >
                    다운로드
                  </a>
                </TableRowLIST>
                <TableRowLIST width={`300px`}>
                  {" "}
                  <a
                    href="/api/admin/review/main-reg-doc/${id}"
                    target={"_blank"}
                  >
                    다운로드
                  </a>
                </TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.ownerName}</TableRowLIST>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminCompanies;