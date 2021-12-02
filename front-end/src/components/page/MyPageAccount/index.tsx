import type { NextPage } from "next";
import { useState } from "react";
import {
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
} from "../../styles/CommonComponents";
import Account from "./Body/AccountM";
import MyPage from "./Body/MyPage";
import Withdrawal from "./Body/Withdrawal";

const MyPageAccount: NextPage<any> = (props) => {
  const [pages, setPages] = useState(1);

  console.log(props);

  const MyPageProps = {
    ...props,
    setPages,
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
