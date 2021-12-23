import { Switch } from "@material-ui/core";
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
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import { User } from "../../../../models/user.entity";
import { makeFullAddress } from "../../../../modules/commonModule";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";

const WorkerInfoModal: NextPage<_cWorkerInfoModalProps> = (props) => {
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
          const newList: User[] = [];
          props.findResult.docs.forEach((item) => {
            if (item._id === res.payload._id) {
              item.approval = res.payload.approval;
              newList.push(item);
            } else {
              newList.push(item);
            }
          });
          props.setFindResult({ ...props.findResult, docs: newList });
        }
      );
    } else {
      dispatch(patchWorkerApproveAction(docInfo._id)).then(
        (res: PatchWorkersApprove) => {
          setApproval(res.payload.approval);
          const newList: User[] = [];
          props.findResult.docs.forEach((item) => {
            if (item._id === res.payload._id) {
              item.approval = res.payload.approval;
              newList.push(item);
            } else {
              newList.push(item);
            }
          });
          props.setFindResult({ ...props.findResult, docs: newList });
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
          const newList: User[] = [];
          props.findResult.docs.forEach((item) => {
            if (item._id === res.payload._id) {
              item.joinDate = res.payload.joinDate;
              newList.push(item);
            } else {
              newList.push(item);
            }
          });
          props.setFindResult({ ...props.findResult, docs: newList });
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
          } else {
            alert("삭제 실패");
          }
        }
      );
    } else {
      return false;
    }
  };

  return (
    <WholeWrapper>
      <RsWrapper>
        <Text>직원 상세 정보</Text>
        <Wrapper dr={`row`}>
          <Text>승인상태</Text>
          <Switch
            color="primary"
            checked={approval}
            onChange={onChangeApproval}
          />
          {approval ? <Text>승인</Text> : <Text>미승인</Text>}
        </Wrapper>
        <form onSubmit={onChangeWorkerInfo}>
          <Wrapper dr={`row`}>
            <Text>직원명</Text>
            <TextInput2 type="text" value={docInfo.name} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput2 type="text" value={docInfo.email} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>휴대폰번호</Text>
            <TextInput2 type="text" value={docInfo.hpNumber} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>주소</Text>
            <TextInput2
              value={makeFullAddress(
                docInfo.address1,
                docInfo.address2,
                docInfo.postcode
              )}
              type="text"
              readOnly
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>입사일자</Text>
            <TextInput2
              type="date"
              name="joinDate"
              value={dayjs(docInfo.joinDate).format("YYYY-MM-DD")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDocInfo({ ...docInfo, joinDate: new Date(e.target.value) });
              }}
            />
          </Wrapper>
          <Wrapper>
            <SmallButton
              type="submit"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
            >
              저장
            </SmallButton>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              onClick={workerDelete}
            >
              직원삭제
            </SmallButton>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModal;
