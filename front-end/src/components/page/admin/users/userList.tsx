import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { _aGetAdminUsers } from "../../../../../store/action/user.action";
import { _iGetAdminUsers } from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import {
  _pAdminUsers,
  _pWorkerDataProps,
} from "../../../../configure/_pProps.entity";
import { FindParameters } from "../../../../models/base.entity";
import { User, UserAuthority } from "../../../../models/user.entity";
import { PagenationSection } from "../../../common/sections";
import {
  CloseButton,
  Combo,
  IconButton,
  RsWrapper,
  SearchButton,
  SearchInput,
  SearchInputWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { IoIosCloseCircle } from "react-icons/io";
import UsersModal from "./user_Modal";

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
   * 키보드 이벤트 발생
   * @param e
   */
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      props.findDocHandler(1);
    }
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
        <Wrapper dr={`row`} al={`flex-end`}>
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
          >
            <option value="name">이름 검색</option>
            <option value="hpNumber">전화번호 검색</option>
            <option value="approval">승인여부 검색</option>
          </Combo>
          {/* <TextInput
              type="text"
              value={props.filterValue}
              placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputSearchHandler(e);
              }}
              onKeyUp={handleKeyUp}
            />
            <IconButton
              type="submit"
              onClick={() => {
                props.findDocHandler(1);
              }}
            >
              <BsSearch />
            </IconButton> */}
          <SearchInputWrapper
            type="text"
            value={props.filterValue}
            placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputSearchHandler(e);
            }}
            onKeyUp={handleKeyUp}
            width={`678px`}
            padding={`0px 5px`}
            dr={`row`}
            margin={`10px 0px 0px`}
            borderBottom={`1px solid #000`}
          >
            <Wrapper width={`auto`}>
              <SearchInput
                width={`632px`}
                padding={`0px 5px 0px 5px`}
                placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
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
        </Wrapper>
        <Wrapper al={`flex-end`} margin={`50px 0px 0px`}>
          <Text>
            직원 수 :{" "}
            <span style={{ color: "#314FA5" }}>
              {props.findResult.totalDocs}
            </span>
          </Text>
        </Wrapper>
        <TableWrapper margin={`10px 0px 30px`}>
          <TableHead>
            <TableHeadLIST width={`200px`}>직위</TableHeadLIST>
            <TableHeadLIST width={`200px`}>직원명</TableHeadLIST>
            <TableHeadLIST width={`200px`}>전화번호</TableHeadLIST>
            <TableHeadLIST width={`200px`}>입사일자</TableHeadLIST>
            <TableHeadLIST width={`200px`}>승인여부</TableHeadLIST>
          </TableHead>
          <TableBody>
            {props.findResult.docs.map((doc: User) => (
              <TableRow
                key={doc._id}
                onClick={() => {
                  setClickDoc(doc);
                  setModalOpen(!modalOpen);
                }}
              >
                <TableRowLIST width={`200px`}>
                  {doc.auth === UserAuthority.OWNER ? "사업주" : "직원"}
                </TableRowLIST>
                <TableRowLIST width={`200px`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`200px`}>{doc.hpNumber}</TableRowLIST>
                <TableRowLIST width={`200px`}>
                  {doc.joinDate
                    ? dayjs(doc.joinDate).format("YYYY-MM-DD")
                    : "-"}
                </TableRowLIST>
                <TableRowLIST width={`200px`}>
                  {doc.approval ? "승인" : "미승인"}
                </TableRowLIST>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>

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
              background: "rgba(255, 255, 255, 0.75)",
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
              boxShadow: "0px 10px 15px rgba(220,220,220,1)",
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
