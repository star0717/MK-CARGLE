import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  FocusButton,
  Text,
  TextArea,
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
import { UseLink } from "../../../../configure/router.entity";

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
  const [reason, setReason] = useState<OptionalInfo>({
    info1: "",
    info2: "",
    info3: "",
  });

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputreasonHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason({ ...reason, info1: e.target.value });
    console.log(reason);
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper ref={ref} padding={`0px 50px 50px`}>
      <CommonSmallTitle>승인처리</CommonSmallTitle>
      <Wrapper>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          padding={`0px 0px 20px`}
          width={`400px`}
        >
          <Text textAlign={`left`} margin={`0px 10px 0px 0px`}>
            승인여부
          </Text>
          <Wrapper width={`180px`} dr={`row`}>
            <FocusButton
              type="button"
              kindOf={approval === true ? `true` : `default`}
              onClick={() => {
                setApproval(true);
                console.log("승인");
              }}
            >
              승인
            </FocusButton>
            <FocusButton
              type="button"
              kindOf={approval === false ? `true` : `default`}
              margin={`0px 0px 0px 20px`}
              onClick={() => {
                setApproval(false);
                console.log("반려");
              }}
            >
              반려
            </FocusButton>
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>반려사유</Text>
          <Wrapper width={`400px`}>
            <TextArea
              padding={`10px`}
              width={`400px`}
              height={`150px`}
              placeholder="반려 사유를 입력하세요."
              al={`flex-start`}
              type="text"
              readOnly={approval}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputreasonHandler(e);
              }}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>E-Mail</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2
              width={`400px`}
              value={props.data.user.email}
              type="text"
              readOnly
            />
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton
            kindOf={`circleWhite`}
            type="button"
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
                console.log(reason);
                dispatch(rejectCompany(props.data.company._cID, reason)).then(
                  (res: any) => {
                    alert("반려처리 되었습니다.");
                  }
                );
                props.setModalOpen(false);
                props.findDocHandler(props.findResult.currentPage); //리렌더링
                router.push(`${UseLink.ADMIN_REVIEW_COMPANIES}`); //list page 전환
              }
            }}
          >
            저장
          </CommonButton>
          <CommonButton
            kindOf={`circleTheme`}
            type="button"
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesModal;
