import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { withdrawalAction } from "../../../../../store/action/user.action";
import { UseLink } from "../../../../configure/router.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  SmallButton,
} from "../../../styles/CommonComponents";
import { _pWithdrawalModalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 회원탈퇴 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const WithdrawalModal: NextPage<_pWithdrawalModalProps> = (props) => {
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
              withdrawalHandler();
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

export default WithdrawalModal;
