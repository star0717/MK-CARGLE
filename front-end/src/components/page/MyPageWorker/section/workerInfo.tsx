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
} from "../../../styles/CommonComponents";
import { _pWorkerData } from "../../../../configure/_pProps.entity";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { User } from "../../../../models/user.entity";
import { useDispatch } from "react-redux";
import { getWorkersListAction } from "../../../../../store/action/user.action";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { GetWorkersList } from "../../../../../store/interfaces";

const workerInfo: NextPage<_pWorkerData> = (props) => {
  const dispatch = useDispatch();

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
                <TableRow key={doc._id}>
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
    </WholeWrapper>
  );
};

export default workerInfo;
