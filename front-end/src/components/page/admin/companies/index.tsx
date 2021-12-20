import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanies } from "../../../../../store/action/user.action";
import { AdminCompaniesList } from "../../../../../store/interfaces";
import { FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import {
  TableBody,
  TableHead,
  TableHeadLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";

const AdminCompanies: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  const [companies, setCompanies] = useState<Company[]>();
  const [loadList, setLoadList] = useState(false);

  const getComListHandler = () => {
    dispatch(getCompanies()).then((res: any) => {
      console.log("hi");
      (res: AdminCompaniesList) => {
        const result: FindResult<Company> = res.payload;
        setCompanies(result.docs);
        console.log("저장완료");
      };
    });
  };

  // useEffect(() => {
  //   if (loadList == false) {
  //     // getComListHandler();
  //     setLoadList(true);
  //   }
  // }, [companies]);

  return (
    <WholeWrapper>
      <Wrapper width={"1200px"}>
        <Text>업체 관리</Text>
        <TableWrapper>
          <TableHead>
            <TableHeadLIST width={`300px`}>업체명</TableHeadLIST>
          </TableHead>
          {/* <TableBody>{companies.map((company) => {})}</TableBody> */}
        </TableWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminCompanies;
