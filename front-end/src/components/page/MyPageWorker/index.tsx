import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWorkersListAction } from "../../../../store/action/user.action";
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
} from "../../styles/CommonComponents";
import { FindResult } from "../../../models/base.entity";
import { Button } from "@material-ui/core";
import { DockSharp, LastPage } from "@material-ui/icons";
import { User } from "../../../models/user.entity";

const MyPageWorker: NextPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  const [docs, setDocs] = useState<User[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>();

  // const workerData:FindResult = {
  //   docs : [docs],
  //   totalDocs : totalDocs,
  //   currentPage : currentPage,
  //   lastPage : lastPage,
  // };

  const getDate = () => {
    dispatch(getWorkersListAction()).then((res: any) => {
      // const workerData: FindResult<any> = {
      //   docs: [docs],
      //   totalDocs: totalDocs,
      //   currentPage: currentPage,
      //   lastPage: lastPage,
      // };
      setDocs(res.payload.docs);
      setTotalDocs(res.payload.totalDocs);
      setCurrentPage(res.payload.currentPage);
      setLastPage(res.payload.lastPage);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const WorkerModalProps = {
    setModalOpen,
    setModalOption,
    style: { height: "500px" },
  };

  // const Tablerow = () => {
  //   const tablerow = docs.map((_id, name) => <li key={_id}>{name}</li>);
  //   console.log("함수 실행");
  // };

  // function Tablerow({docs}) {
  //   return(
  //     <TableRow>
  //        <TableRowLIST>{docs.name}</TableRowLIST>
  //        <TableRowLIST>{docs.hpNumber}</TableRowLIST>
  //        <TableRowLIST>{docs.joinDate}</TableRowLIST>
  //        <TableRowLIST>{docs.approval}</TableRowLIST>
  //      </TableRow>
  //   );
  // }

  // const Tablerow = docs.map((_id, name) => <li key={_id}>{name}</li>);

  // function render<User>({ doc:User}){
  //   return (
  //     <TableRow>
  //       <TableRowLIST>{doc.name}</TableRowLIST>
  //       <TableRowLIST>{doc.hpNumber}</TableRowLIST>
  //       <TableRowLIST>{doc.joinDate}</TableRowLIST>
  //       <TableRowLIST>{doc.approval}</TableRowLIST>
  //     </TableRow>
  //   );
  // };

  // const Tablerow = docs.map((docs) => <render docs={docs} key={docs._id} />);

  const ProfileLink = (doc: User) => <div>{doc.name}</div>;

  return (
    <WholeWrapper>
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
            {docs.map((doc) => (
              <TableRow>
                <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.joinDate}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.approval}</TableRowLIST>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </Wrapper>

      {/* {docs.map(doc => (<render doc = {doc} key={doc._id}/>))} */}
      {/* {docs.map(doc => (<Tablerow doc = {docs}/>))} */}

      {/* {totalDocs === 0 ? (<Text>관리할 직원이 없습니다.</Text>) : 
        docs.map((_id, name, ))} */}

      {/* <table>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      <Wrapper>
        <SmallButton
          type="button"
          onClick={() => {
            getDate();
            console.log("TotalDocs =>", totalDocs);
            console.log("CurrentPage =>", currentPage);
            console.log("LastPage => ", lastPage);
            console.log("Docs => ", docs);
          }}
        >
          ㅈㅓㅇ보
        </SmallButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MyPageWorker;
