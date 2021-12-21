import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { _pWithdrawalModalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 회원탈퇴 모달 컴포넌트(화면)
 * @param props
 * @returns
 */
const WithdrawalModalPresenter: NextPage<_pWithdrawalModalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text>모든 데이터가 삭제됩니다.</Text>
        <Text>정말로 탈퇴 하시겠습니까?</Text>
        <Wrapper dr={`row`}>
          <SmallButton
            type="button"
            kindOf={`default`}
            onClick={() => {
              props.withdrawalHandler();
            }}
          >
            회원 탈퇴
          </SmallButton>
          <SmallButton
            type="button"
            kindOf={`default`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </SmallButton>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default WithdrawalModalPresenter;
