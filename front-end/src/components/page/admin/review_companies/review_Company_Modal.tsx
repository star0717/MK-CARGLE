import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import {
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import {
  approveCompany,
  rejectCompany,
} from "../../../../../store/action/user.action";
import { OptionalInfo } from "../../../../models/base.entity";
import { StepQuery, UseLink } from "../../../../configure/router.entity";

const AdminReviewCompaniesModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [approval, setApproval] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputreasonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(reason);
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  const RejectReason: OptionalInfo = {
    info1: reason,
  };

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          <Text>승인처리</Text>
        </Wrapper>
        <Wrapper>
          <Wrapper dr={`row`}>
            <Text>승인여부</Text>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              onClick={() => {
                setApproval(true);
                console.log("승인");
              }}
            >
              승인
            </SmallButton>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              onClick={() => {
                setApproval(false);
                console.log("반려");
              }}
            >
              반려
            </SmallButton>
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text width={`130px`}>반려사유</Text>
            <TextInput2
              width={`250px`}
              height={`150px`}
              placeholder="반려 사유를 입력하세요."
              type="text"
              readOnly={approval}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputreasonHandler(e);
              }}
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text width={`130px`}>E-Mail</Text>
            <TextInput2 value={props.data.user.email} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              onClick={() => {
                if (approval === true) {
                  dispatch(approveCompany(props.data.company._cID)).then(
                    (res: any) => {
                      alert("승인되었습니다.");
                    }
                  );
                  props.setModalOpen(false);
                  props.findDocHandler(props.findResult.currentPage); //리렌더링
                  router.push(`${UseLink.ADMIN_REVIEW_COMPANIES}`); //list page 전환
                } else if (approval == false) {
                  dispatch(
                    rejectCompany(props.data.company._cID, RejectReason)
                  ).then((res: any) => {
                    alert("반려처리 되었습니다.");
                  });
                  props.setModalOpen(false);
                  props.findDocHandler(props.findResult.currentPage); //리렌더링
                  router.push(`${UseLink.ADMIN_REVIEW_COMPANIES}`); //list page 전환
                }
              }}
            >
              저장
            </SmallButton>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </SmallButton>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesModal;