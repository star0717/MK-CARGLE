import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { _MainProps } from "../../../../configure/_props.entity";
import { getQuery } from "../../../../modules/commonModule";
import ManCompanyList from "./manCompanyList";

const AdminManCompaniesPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Page configuration
   *********************************************************************/
  const router = useRouter();
  const routerQuery = getQuery(router.asPath);

  console.log(routerQuery);

  // switch (routerQuery) {
  //   case "value":

  //     break;

  //   default:
  //     break;
  // }

  return <ManCompanyList {...props} />;
};

export default AdminManCompaniesPage;
