import type { NextPage } from "next";
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
} from "../../../styles/CommonComponents";
import { _pWorkerData } from "../../../../configure/_pProps.entity";

const workerInfo: NextPage<_pWorkerData> = (props) => {
  // const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const WorkerModalProps = {
    setModalOpen,
    setModalOption,
    style: { height: "500px" },
  };

  const toggleComment = () => {
    // setDocs(prevDocs => ({
    //   ...docs,
    //   [docs.approval] :
    // }));
    // setDocs(prevDocs => ({
    //   ...docs,
    //   [approval] : !prevDocs[approval]
    // }));
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
              {props.docs.map((doc: any) => (
                <TableRow>
                  <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.joinDate}</TableRowLIST>
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
              console.log("TotalDocs =>", props.totalDocs);
              console.log("CurrentPage =>", props.currentPage);
              console.log("LastPage => ", props.lastPage);
              console.log("Docs => ", props.docs);
            }}
          >
            ㅈㅓㅇ보
          </SmallButton>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default workerInfo;
