import type { NextPage } from "next";
import { useState } from "react";
import { SignUpInfo } from "../../../models/auth.entity";
import {
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
} from "../../styles/CommonComponents";
import Account from "./section/AccountM";
import MyPage from "./section/MyPage";
import Withdrawal from "./section/Withdrawal";

const MyPageAccount: NextPage<any> = (props) => {
  const [pages, setPages] = useState(1);
  const [accountInfo, setAccountInfo] = useState<SignUpInfo>();

  console.log(props);

  const MyPageProps = {
    ...props,
    setPages,
    accountInfo,
    setAccountInfo,
  };

  return (
    <div>
      {pages === 1 ? (
        <MyPage {...MyPageProps} />
      ) : pages === 2 ? (
        <Account {...MyPageProps} />
      ) : pages === 3 ? (
        <Withdrawal {...MyPageProps} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyPageAccount;
