import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Modal from "react-modal";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  ToolTipWrapper,
  ToolTip,
  ToolTipText,
  CloseButton,
} from "src/components/styles/CommonComponents";
import { BsSearch, BsEmojiFrownFill } from "react-icons/bs";
import { Agency } from "src/models/agency.entity";
import { PagenationSection } from "src/components/common/sections";
import { IoIosCloseCircle } from "react-icons/io";
import EditBusinessModal from "./editBusinessModal";
import AddBusinessModal from "./addBusinessModal";

const ManBusinessList: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 내용
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const BusinessModalProps: any = {
    ...props,
    setModalOpen,
    style: { height: "800px", width: "500px" },
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <BodyWrapper>
      <WholeWrapper>
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>거래처관리</CommonTitle>
            <CommonSubTitle>
              거래처 정보를 저장하고 관리할 수 있어요.
            </CommonSubTitle>
          </CommonTitleWrapper>
          <Wrapper>
            <form>
              <SearchInputWrapper
                type="text"
                placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
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
                    <IconButton type="submit" shadow={`none`}>
                      <BsSearch />
                    </IconButton>
                  </Text>
                </Wrapper>
              </SearchInputWrapper>
            </form>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton
                width={`150px`}
                fontSize={`16px`}
                kindOf={`default`}
                type="button"
                onClick={() => {
                  setModalOption("add");
                  setModalOpen(true);
                }}
              >
                신규등록
              </SmallButton>
              <SmallButton width={`150px`} fontSize={`16px`} kindOf={`cancle`}>
                삭제하기
              </SmallButton>
            </Wrapper>
          </Wrapper>
          <TableWrapper margin={`50px 0px 0px`}>
            <TableHead>
              <TableHeadLIST width={`10%`}>
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`15%`}>상호명</TableHeadLIST>
              <TableHeadLIST width={`15%`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`22%`}>주소</TableHeadLIST>
              <TableHeadLIST width={`15%`}>담당자명</TableHeadLIST>
              <TableHeadLIST width={`23%`}>메모</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.data.totalDocs > 0 ? (
                props.data.docs.map((doc: Agency) => (
                  <TableRow
                    key={doc._id}
                    onClick={() => {
                      setModalOption("edit");
                      setModalOpen(true);
                    }}
                  >
                    <TableRowLIST width={`10%`}>
                      <Checkbox kindOf={`TableCheckBox`}>
                        <CheckInput type="checkbox" />
                        <CheckMark></CheckMark>
                      </Checkbox>
                    </TableRowLIST>
                    <TableRowLIST width={`15%`} zIndex={`1`}>
                      {doc.name}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`} zIndex={`1`}>
                      {doc.hpNum}
                    </TableRowLIST>
                    <TableRowLIST width={`22%`} zIndex={`1`}>
                      {doc.address1}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`} zIndex={`1`}>
                      {doc.manager}
                    </TableRowLIST>
                    <TableRowLIST width={`23%`} zIndex={`1`}>
                      <ToolTipWrapper isRelative={`true`} zIndex={`100`}>
                        <ToolTip>
                          {doc.memo}
                          <ToolTipText>{doc.memo}</ToolTipText>
                        </ToolTip>
                      </ToolTipWrapper>
                    </TableRowLIST>
                  </TableRow>
                ))
              ) : (
                <Wrapper minHeight={`445x`}>
                  <Text fontSize={`48px`} color={`#c4c4c4`}>
                    <BsEmojiFrownFill />
                  </Text>
                  <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                </Wrapper>
              )}
              {/* <TableRow>
                <TableRowLIST width={`10%`}>
                  <Checkbox kindOf={`TableCheckBox`}>
                    <CheckInput type="checkbox" />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </TableRowLIST>
                <TableRowLIST width={`15%`}>상호명</TableRowLIST>
                <TableRowLIST width={`15%`}>전화번호</TableRowLIST>
                <TableRowLIST width={`22%`}>주소</TableRowLIST>
                <TableRowLIST width={`15%`}>담당자명</TableRowLIST>
                <TableRowLIST width={`23%`}>
                  <ToolTipWrapper>
                    <ToolTip>
                      메모
                      <ToolTipText>
                        와 나 진짜 이거 만드느라 죽을뻔 했는데 다행히 잘
                        만들어진 것 같은 느낌이 드는게 이제 이게 글자 수가
                        길어져도 알아서 줄바꿈도 될거고 그쵸? 그리고 이제 이게
                        스크롤도 기가 막히게 되니까 별 문제가 없길 바라는 마음
                        뿐이네요.아 근데 이게 너무 빡빡하게 보이니까 패딩을
                        추가해야겠네 그러네
                      </ToolTipText>
                    </ToolTip>
                  </ToolTipWrapper>
                </TableRowLIST>
              </TableRow>
              <Wrapper minHeight={`445px`}>
                <Text fontSize={`48px`} color={`#c4c4c4`}>
                  <BsEmojiFrownFill />
                </Text>
                <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
              </Wrapper> */}
            </TableBody>
          </TableWrapper>
          {/* <PagenationSection {...props} /> */}
        </RsWrapper>
      </WholeWrapper>
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
        </Wrapper>
        {modalOption === "edit" ? (
          <EditBusinessModal {...BusinessModalProps} />
        ) : (
          <AddBusinessModal {...BusinessModalProps} />
        )}
      </Modal>
    </BodyWrapper>
  );
};

export default ManBusinessList;
