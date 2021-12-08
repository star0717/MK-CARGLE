import { NextPage } from "next";
import React from "react";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";

interface modalOption {
  accountInfo: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

const WithdrawalModal: NextPage<modalOption> = (props) => {
  return (
    <WholeWrapper>
      <Wrapper>
        <Text>모든 데이터가 삭제됩니다.</Text>
        <Text>정말로 탈퇴 하시겠습니까?</Text>
        <Wrapper dr={`row`}>
          <button>회원 탈퇴</button>
          <button>취소</button>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default WithdrawalModal;
