import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { _aGetAdminUsers } from "../../../../../store/action/user.action";
import { _iGetAdminUsers } from "../../../../../store/interfaces";
import {
  _pAdminUsers,
  _pWorkerDataProps,
} from "../../../../configure/_pProps.entity";
import { User } from "../../../../models/user.entity";
import { PagenationSection } from "../../../common/sections";
import {
  CloseButton,
  Combo,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
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
import { IoIosCloseCircle } from "react-icons/io";
import UsersModal from "./user_Modal";
import { UserAuthority } from "../../../../constants/model.const";

const UsersList: NextPage<_pAdminUsers> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<User>();

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 모달 창 닫기
   */
  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 검색 옵션 handler
   * @param e
   */
  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchOption(e.target.value);
  };

  /**
   *
   * @param e 검색 내용 handler
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value);
  };

  /**
   * 검색 기능 handler
   * @param e
   */
  const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.findDocHandler(1);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const usersModalProps: _pWorkerDataProps = {
    ...props,
    clickDoc,
    setClickDoc,
    setModalOpen,
    style: { height: "500px" },
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>직원관리</CommonTitle>
          <CommonSubTitle></CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper
          dr={`row`}
          al={`flex-end`}
          padding={`50px 0px 0px`}
          ju={`flex-start`}
        >
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            width={`150px`}
            height={`46px`}
          >
            <option value="name">이름 검색</option>
            <option value="hpNumber">전화번호 검색</option>
          </Combo>
          <form onSubmit={onSearchHandler}>
            <SearchInputWrapper
              type="text"
              value={props.filterValue}
              placeholder="검색할 직원의 이름 또는, 전화번호를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputSearchHandler(e);
              }}
              width={`578px`}
              padding={`0px 5px`}
              dr={`row`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`532px`}
                  padding={`0px 5px 0px 5px`}
                  placeholder="검색할 직원의 이름 또는, 전화번호를 입력하세요"
                  type="text"
                />
              </Wrapper>
              <Wrapper width={`36px`} height={`46px`}>
                <Text fontSize={`24px`}>
                  <IconButton
                    type="submit"
                    onClick={() => {
                      props.findDocHandler(1);
                    }}
                    shadow={`none`}
                  >
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </form>
        </Wrapper>
        <Wrapper al={`flex-end`} margin={`50px 0px 0px`}>
          <Text>
            직원 수 :{" "}
            <span style={{ color: "#314FA5" }}>
              {props.findResult.totalDocs}
            </span>
          </Text>
        </Wrapper>
        <Wrapper margin={`10px 0px 30px`}>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST width={`20%`}>직위</TableHeadLIST>
              <TableHeadLIST width={`20%`}>직원명</TableHeadLIST>
              <TableHeadLIST width={`20%`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`20%`}>입사일자</TableHeadLIST>
              <TableHeadLIST width={`20%`}>승인여부</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.findResult.totalDocs > 0 ? (
                props.findResult.docs.map((doc: User) => (
                  <TableRow
                    key={doc._id}
                    onClick={() => {
                      setClickDoc(doc);
                      setModalOpen(!modalOpen);
                    }}
                  >
                    <TableRowLIST width={`20%`}>
                      {doc.auth === UserAuthority.OWNER ? "사업주" : "직원"}
                    </TableRowLIST>
                    <TableRowLIST width={`20%`}>{doc.name}</TableRowLIST>
                    <TableRowLIST width={`20%`}>{doc.hpNumber}</TableRowLIST>
                    <TableRowLIST width={`20%`}>
                      {doc.joinDate
                        ? dayjs(doc.joinDate).format("YYYY-MM-DD")
                        : "-"}
                    </TableRowLIST>
                    <TableRowLIST width={`20%`}>
                      {doc.approval ? "승인" : "미승인"}
                    </TableRowLIST>
                  </TableRow>
                ))
              ) : (
                <Wrapper minHeight={`445px`}>
                  <Text fontSize={`48px`} color={`#c4c4c4`}>
                    <BsEmojiFrownFill />
                  </Text>
                  <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                </Wrapper>
              )}
            </TableBody>
          </TableWrapper>
        </Wrapper>
        <PagenationSection {...props} />
      </RsWrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 9999,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(71, 71, 71, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "500px",
              height: "800px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              boxShadow: "0px 10px 15px rgba(61,61,61,1)",
              inset: 0,
            },
          }}
        >
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle />
            </CloseButton>
            <UsersModal {...usersModalProps} />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default UsersList;
