import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanies } from "../../../../../store/action/user.action";
import { AdminCompaniesList } from "../../../../../store/interfaces";
import { FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";

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

  useEffect(() => {
    if (loadList == false) {
      getComListHandler();
      setLoadList(true);
    }
  }, [companies]);

  return <WholeWrapper>Hello</WholeWrapper>;
};

export default AdminCompanies;
