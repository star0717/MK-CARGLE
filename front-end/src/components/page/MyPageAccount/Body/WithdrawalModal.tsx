import { NextPage } from "next";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";

const WithdrawalModal: NextPage = () => {
  return (
    <WholeWrapper>
      <Wrapper>
        <Text>모든 데이터가 삭제됩니다.</Text>
        <Text>정말로 탈퇴 하시겠습니까?</Text>
        <Wrapper>
          <button>회원 탈퇴</button>
          <button>취소</button>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default WithdrawalModal;
