import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  FocusButton,
  Switch,
  SwitchInput,
  SwitchSlider,
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
import { _pComPageModalProps } from "src/configure/_pProps.entity";

const AdminReviewCompaniesModal: NextPage<_pComPageModalProps> = (props) => {
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
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper ref={ref} padding={`0px 30px 30px`}>
      <CommonSmallTitle>승인처리</CommonSmallTitle>
      <Wrapper>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          padding={`0px 0px 20px`}
          width={`400px`}
        >
          <Text textAlign={`left`} padding={`0px 0px 20px`}>
            승인여부
          </Text>
          <Wrapper
            dr={`row`}
            ju={`flex-end`}
            padding={`0px 0px 20px`}
            width={`auto`}
          >
            <Wrapper al={`flex-end`} margin={`0px 10px 0px 0px`}>
              {approval ? (
                <Text color={`#314FA5`} fontWeight={`400`}>
                  승인 완료되었습니다!
                </Text>
              ) : (
                <Text color={`#9d9d9d`} fontWeight={`400`}>
                  승인 하시겠습니까?
                </Text>
              )}
            </Wrapper>
            <Wrapper width={`60px`} al={`flex-end`}>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={approval}
                  onChange={() => {
                    setApproval(!approval);
                  }}
                />
                <SwitchSlider />
              </Switch>
            </Wrapper>
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
