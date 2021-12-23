import dayjs from "dayjs";
import { NextPage } from "next";
import { _pADMIN_REVIEW_COMPANIES } from "../../../../configure/_pProps.entity";
import { Company } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  RsWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";

const AdminReviewCompaniesPresenter: NextPage<_pADMIN_REVIEW_COMPANIES> = (
  props
) => {
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper width={`1200px`}>
          <Text>승인 관리</Text>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST width={`300px`}>가입일</TableHeadLIST>
              <TableHeadLIST width={`300px`}>상호명</TableHeadLIST>
              <TableHeadLIST width={`300px`}>사업자등록증</TableHeadLIST>
              <TableHeadLIST width={`300px`}>정비업등록증</TableHeadLIST>
              <TableHeadLIST width={`300px`}>대표자명</TableHeadLIST>
              <TableHeadLIST width={`300px`}>승인여부</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.findResult.docs.map((doc: Company) => (
                <TableRow
                  key={doc._id}
                  //   onClick={() => {
                  //     setModalOpen(!modalOpen);
                  //     setClickDoc(doc);
                  //   }}
                >
                  <TableRowLIST width={`300px`}>
                    {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.comRegNum}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.mbRegNum}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.ownerName}</TableRowLIST>
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
        <PagenationSection {...props} />
      </RsWrapper>
      <Wrapper>
        {/* <Modal
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
        </Modal> */}
      </Wrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesPresenter;
