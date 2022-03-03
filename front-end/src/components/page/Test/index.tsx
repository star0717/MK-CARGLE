import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useCallback, useEffect, useState } from "react";
import { BodyWrapper } from "../../styles/LayoutComponents";
import {
  CloseButton,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { Agency } from "src/models/agency.entity";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>("");
  const [businessList, setBusinessList] = useState<Agency[]>(props.data.docs);
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부

  const [checkedList, setCheckedList] = useState([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 검색 input handler
   * @param e
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  /**
   * 검색 handler
   * @param e
   */
  const onSearchFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText) {
      return setReset(reset + 1);
    }
  };

  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: any[] = [];

        businessList.forEach((list: any) => checkedListArray.push(list._id));

        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [businessList]
  );

  /**
   * 개별 선택 기능
   */
  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedList([...checkedList, list._id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list._id));
      }
    },
    [checkedList]
  );

  /**
   * modal 창 닫기
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * modal 창 팝업 시 뒤에 배경 scroll 막기
   */
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper>
            <button
              type="button"
              onClick={() => {
                setModalOption("addBusiness");
                setModalOpen(true);
              }}
            >
              신규등록
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOption("editBusiness");
                setModalOpen(true);
              }}
            >
              테이블셀(수정)
            </button>
          </Wrapper>
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
              {modalOption === "addBusiness" ? "추가" : "수정"}
            </Wrapper>
          </Modal>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
