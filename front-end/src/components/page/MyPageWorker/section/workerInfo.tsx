import type { NextPage } from "next";
import dayjs from "dayjs";
import { useState } from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRowLIST,
  TableRow,
  SmallButton,
  RsWrapper,
  PagenationWrapper,
  Pagenation,
  CloseButton,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";
import { _pWorkerData } from "../../../../configure/_pProps.entity";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCloseCircle,
} from "react-icons/io";
import { User } from "../../../../models/user.entity";
import { useDispatch } from "react-redux";
import { getWorkersListAction } from "../../../../../store/action/user.action";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { GetWorkersList } from "../../../../../store/interfaces";
import WorkerInfoModal from "./workerInfoModal";

const workerInfo: NextPage<_pWorkerData> = (props) => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<User>();

  const closeModal = () => {
    setModalOpen(false);
  };

  /** 핸들러 */
  const findWorksHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 15,
    };
    dispatch(getWorkersListAction(param)).then((res: GetWorkersList) => {
      console.log(res);
      props.setFindResult(res.payload);
    });
  };

  const Pagenationbtn = () => {
    const result = [];

    const cPage = props.findResult.currentPage;
    var sPage: number, lPage: number;
    sPage =
      cPage % 10 == 0
        ? Math.round(cPage / 10) * 10 - 9
        : Math.round(cPage / 10) * 10 + 1;
    lPage = sPage + 9;
    // console.log(`sPage: ${sPage}`, `cPage: ${cPage}`, `lPage: ${lPage}`);

    if (props.findResult) {
      for (
        let i = Math.ceil(props.findResult.currentPage / 10);
        i <= props.findResult.lastPage;
        i++
      ) {
        result.push(
          <Pagenation key={i} type="button" onClick={() => findWorksHandler(i)}>
            {i}
          </Pagenation>
        );
      }
      return result;
    }
  };

  /**
   * 화면구성에 넘길 props
   */
  const WorkerModalProps = {
    setModalOpen,
    clickDoc,
    style: { height: "500px" },
  };

  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper width={`1200px`}>
          <Text>직원관리</Text>

          <TableWrapper>
            <TableHead>
              <TableHeadLIST width={`300px`}>직원명</TableHeadLIST>
              <TableHeadLIST width={`300px`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`300px`}>입사일자</TableHeadLIST>
              <TableHeadLIST width={`300px`}>승인여부</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.findResult.docs.map((doc: User) => (
                <TableRow
                  key={doc._id}
                  onClick={() => {
                    setModalOpen(!modalOpen);
                    setClickDoc(doc);
                  }}
                >
                  <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                  <TableRowLIST width={`300px`}>
                    {dayjs(doc.joinDate).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  {doc.approval ? (
                    <TableRowLIST width={`300px`}>승인</TableRowLIST>
                  ) : (
                    <TableRowLIST width={`300px`}>미승인</TableRowLIST>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </Wrapper>
        <Wrapper>
          <SmallButton
            type="button"
            onClick={() => {
              console.log("TotalDocs =>", props.findResult.totalDocs);
              console.log("CurrentPage =>", props.findResult.currentPage);
              console.log("LastPage => ", props.findResult.lastPage);
              console.log("Docs => ", props.findResult.docs);
            }}
          >
            정보
          </SmallButton>
        </Wrapper>
        <PagenationWrapper>
          <Pagenation>
            <IoIosArrowBack />
          </Pagenation>

          {Pagenationbtn()}

          <Pagenation>
            <IoIosArrowForward />
          </Pagenation>
        </PagenationWrapper>
      </RsWrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              height: "575px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              boxShadow: "0px 10px 15px rgba(220,220,220,1)",
              inset: 0,
            },
          }}
        >
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle />
            </CloseButton>
            <WorkerInfoModal {...WorkerModalProps} />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default workerInfo;
