import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  patchWorkerApproveAction,
  patchWorkerChangeAction,
  patchWorkerDeleteAction,
  patchWorkerRejectAction,
} from "../../../../../store/action/user.action";
import {
  PatchWorkersApprove,
  PatchWorkersChange,
  PatchWorkersDelete,
  PatchWorkersReject,
} from "../../../../../store/interfaces";
import { User } from "../../../../models/user.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  CommonSmallTitle,
  CommonButton,
  CommonButtonWrapper,
  Switch,
  SwitchInput,
  SwitchSlider,
} from "../../../styles/CommonComponents";
import { makeFullAddress } from "../../../../modules/commonModule";
import { _pWorkerDataProps } from "../../../../configure/_pProps.entity";
import { UserAuthority } from "src/constants/model.const";

const UsersModal: NextPage<_pWorkerDataProps> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [approval, setApproval] = useState<boolean>(props.clickDoc.approval); // 직원 승인여부
  const [docInfo, setDocInfo] = useState<User>(props.clickDoc); //해당 직원 정보

  /**
   * 직원(worker) 승인 handler
   * @param e
   */
  const onChangeApproval = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (approval) {
      dispatch(patchWorkerRejectAction(docInfo._id)).then(
        (res: PatchWorkersReject) => {
          setApproval(res.payload.approval);
        }
      );
    } else {
      dispatch(patchWorkerApproveAction(docInfo._id)).then(
        (res: PatchWorkersApprove) => {
          setApproval(res.payload.approval);
        }
      );
    }
  };

  /**
   * 직원(worker) 정보수정 handler
   * @param e
   */
  const onChangeWorkerInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changeInfo: Partial<User> = {
      joinDate: docInfo.joinDate,
    };
    if (window.confirm("저장하시겠습니까?")) {
      dispatch(patchWorkerChangeAction(docInfo._id, changeInfo)).then(
        (res: PatchWorkersChange) => {
          props.setModalOpen(false);
          props.findDocHandler(props.findResult.currentPage);
        }
      );
    } else {
      return false;
    }
  };

  /**
   * 직원(worker) 삭제 handler
   */
  const workerDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(patchWorkerDeleteAction(docInfo._id)).then(
        (res: PatchWorkersDelete) => {
          if (res.payload.deletedCount === 1) {
            props.setModalOpen(false);
            props.findDocHandler(props.findResult.currentPage);
          } else {
            alert("삭제 실패");
          }
        }
      );
    } else {
      return false;
    }
  };

  //기간 input typing 막는 이벤트
  const PreventDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref} padding={`0px 30px 30px`}>
      <CommonSmallTitle>직원 상세 정보</CommonSmallTitle>
      <Wrapper
        dr={`row`}
        ju={`flex-end`}
        padding={`0px 0px 20px`}
        width={`400px`}
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
              onChange={onChangeApproval}
            />
            <SwitchSlider />
          </Switch>
        </Wrapper>
      </Wrapper>
      <form onSubmit={onChangeWorkerInfo}>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`}>
          <Text>직원명</Text>
          <TextInput2
            width={`400px`}
            type="text"
            value={docInfo.name}
            readOnly
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`}>
          <Text>아이디</Text>
          <TextInput2
            width={`400px`}
            type="text"
            value={docInfo.email}
            readOnly
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`}>
          <Text>휴대폰번호</Text>
          <TextInput2
            width={`400px`}
            type="text"
            value={docInfo.hpNumber}
            readOnly
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`}>
          <Text>주소</Text>
          <TextInput2
            width={`400px`}
            value={makeFullAddress(
              docInfo.address1,
              docInfo.address2,
              docInfo.postcode
            )}
            type="text"
            readOnly
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`}>
          <Text>입사일자</Text>
          <TextInput2
            width={`400px`}
            type="date"
            name="joinDate"
            onKeyPress={(e: React.ChangeEvent<HTMLInputElement>) => {
              PreventDefault(e);
            }}
            value={dayjs(docInfo.joinDate).format("YYYY-MM-DD")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDocInfo({
                ...docInfo,
                joinDate: new Date(e.target.value),
              });
            }}
          />
        </Wrapper>

        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton type="submit" kindOf={`circleWhite`}>
            저장
          </CommonButton>
          {props.clickDoc.auth === UserAuthority.WORKER && (
            <CommonButton
              type="button"
              onClick={workerDelete}
              kindOf={`circleTheme`}
            >
              직원삭제
            </CommonButton>
          )}
        </CommonButtonWrapper>
      </form>
    </WholeWrapper>
  );
};

export default UsersModal;
