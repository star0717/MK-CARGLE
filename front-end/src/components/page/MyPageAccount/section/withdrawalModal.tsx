import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { withdrawalAction } from "../../../../../store/action/user.action";
import { UseLink } from "../../../../configure/router.entity";
import { _cWithdrawalModalProps } from "../../../../configure/_cProps.entity";
import { _pWithdrawalModalProps } from "../../../../configure/_pProps.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";
import WithdrawalModalPresenter from "./withdrawalModalPresenter";

/**
 * 마이 페이지: 계정관리 회원탈퇴 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const WithdrawalModal: NextPage<_cWithdrawalModalProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 회원탈퇴 handler
   */
  const withdrawalHandler = () => {
    const ConfirmPWD = {
      _id: props.accountInfo.user._uID,
      PWD: props.password,
    };
    dispatch(withdrawalAction(ConfirmPWD)).then(
      (res: any) => {
        alert("정상적으로 탈퇴 되었습니다.");
        router.push(UseLink.INDEX);
      },
      (err) => {
        alert("예상치 못한 오류로 인해 회원 탈퇴에 실패했습니다.");
      }
    );
  };

  // 화면구성에 넘길 props
  const fProps: _pWithdrawalModalProps = {
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
