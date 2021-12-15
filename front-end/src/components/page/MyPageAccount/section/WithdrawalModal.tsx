import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { withdrawal } from "../../../../../store/action/user.action";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";

interface modalOption {
  password: any;
  accountInfo: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

const WithdrawalModal: NextPage<modalOption> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const setModalOpen = props.setModalOpen;

  const accountInfo = props.accountInfo;
  const password = props.password;

  const ConfirmPWD = {
    _id: accountInfo.user._uID,
    PWD: password,
  };

  const Withdrawal = () => {
    console.log(ConfirmPWD);
    dispatch(withdrawal(ConfirmPWD)).then(
      (res: any) => {
        alert("정상적으로 탈퇴 되었습니다.");
        router.push("/");
      },
      (err) => {
        alert("예상치 못한 오류로 인해 회원 탈퇴에 실패했습니다.");
      }
    );
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>모든 데이터가 삭제됩니다.</Text>
        <Text>정말로 탈퇴 하시겠습니까?</Text>
        <Wrapper dr={`row`}>
          <button
            onClick={() => {
              Withdrawal();
            }}
          >
            회원 탈퇴
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            취소
          </button>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default WithdrawalModal;
