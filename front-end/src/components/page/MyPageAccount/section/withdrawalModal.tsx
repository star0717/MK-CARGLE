import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { withdrawalAction } from "../../../../../store/action/user.action";
import { WholeWrapper } from "../../../styles/CommonComponents";
import WithdrawalModalPresenter from "./withdrawalModalPresenter";

interface modalOption {
  password: any;
  accountInfo: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

/**
 * 마이 페이지: 계정관리 회원탈퇴 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const WithdrawalModal: NextPage<modalOption> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 필요한 props 재정의
  const accountInfo = props.accountInfo;
  const password = props.password;

  /**
   * 회원탈퇴 handler
   */
  const withdrawalHandler = () => {
    const ConfirmPWD = {
      _id: accountInfo.user._uID,
      PWD: password,
    };
    dispatch(withdrawalAction(ConfirmPWD)).then(
      (res: any) => {
        alert("정상적으로 탈퇴 되었습니다.");
        router.push("/");
      },
      (err) => {
        alert("예상치 못한 오류로 인해 회원 탈퇴에 실패했습니다.");
      }
    );
  };

  // 화면구성에 넘길 props
  const fProps = {
    ...props,
    withdrawalHandler,
  };

  return (
    <WholeWrapper>
      <WithdrawalModalPresenter {...fProps} />
    </WholeWrapper>
  );
};

export default WithdrawalModal;