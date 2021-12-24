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
import { _pWorkerInfoModalProps } from "../../../../configure/_pProps.entity";
import { User } from "../../../../models/user.entity";
import WorkerInfoModalPresenter from "./workerInfoModalPresenter";

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
          // const newList: User[] = [];
          // props.findResult.docs.forEach((item) => {
          //   if (item._id === res.payload._id) {
          //     item.approval = res.payload.approval;
          //     newList.push(item);
          //   } else {
          //     newList.push(item);
          //   }
          // });
          // props.setFindResult({ ...props.findResult, docs: newList });
        }
      );
    } else {
      dispatch(patchWorkerApproveAction(docInfo._id)).then(
        (res: PatchWorkersApprove) => {
          setApproval(res.payload.approval);
          // const newList: User[] = [];
          // props.findResult.docs.forEach((item) => {
          //   if (item._id === res.payload._id) {
          //     item.approval = res.payload.approval;
          //     newList.push(item);
          //   } else {
          //     newList.push(item);
          //   }
          // });
          // props.setFindResult({ ...props.findResult, docs: newList });
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

  /**
   * 화면구성에 넘길 props
   */
  const fProps: _pWorkerInfoModalProps = {
    approval,
    onChangeApproval,
    onChangeWorkerInfo,
    docInfo,
    setDocInfo,
    workerDelete,
  };

  return <WorkerInfoModalPresenter {...fProps} />;
};

export default WorkerInfoModal;
