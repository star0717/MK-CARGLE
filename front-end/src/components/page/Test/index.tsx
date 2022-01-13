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
import ReactModal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("all");
  const [partClass, setPartClass] = useState<any>(props.data.class);
  const [partList, setPartList] = useState<any>(props.data.part);

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
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    setCheckedList([]);
    if (selectClass === "all") {
      setPartList(props.data.part);
    } else {
      const newList: any[] = [];
      props.data.part.forEach((part: any) => {
        if (part.class === selectClass) {
          newList.push(part);
        }
      });
      setPartList(newList);
    }
  }, [selectClass]);

  /**
   * 검색 handler
   * @param e
   */
  const onSearchFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText) {
      console.log("없음");
    }
    const newList: any[] = [];
    props.data.part.forEach((part: any) => {
      if (
        part.code.includes(searchText) ||
        part.name.includes(searchText) ||
        part.molit.includes(searchText)
      ) {
        newList.push(part);
      }
    });
    setPartList(newList);
  };

  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: any[] = [];

        partList.forEach((list: any) => checkedListArray.push(list._id));

        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [partList]
  );

  console.log(checkedList);

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
          <Wrapper dr={`row`}>
            <Wrapper>
              <Wrapper
                dr={`row`}
                ju={`space-around`}
                color={selectClass === "all" ? `white` : `black`}
                bgColor={selectClass === "all" ? `black` : `white`}
                onClick={() => {
                  setCheckedList([]);
                  setSelectClass("all");
                }}
              >
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setModalOption("addClass");
                    setModalOpen(true);
                  }}
                >
                  +
                </button>
                <Text>전체보기</Text>
              </Wrapper>
              {partClass.map((item: any) => (
                <Wrapper
                  key={item._id}
                  dr={`row`}
                  ju={`space-around`}
                  color={selectClass === item.name ? `white` : `black`}
                  bgColor={selectClass === item.name ? `black` : `white`}
                  onClick={() => {
                    setSelectClass(item.name);
                  }}
                >
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                    }}
                  >
                    -
                  </button>
                  {item.name}
                </Wrapper>
              ))}
            </Wrapper>
            <Wrapper>
              <Wrapper dr={`row`}>
                <form onSubmit={onSearchFormHandler}>
                  <SearchInputWrapper
                    width={`478px`}
                    padding={`0px 5px`}
                    dr={`row`}
                    margin={`10px 0px 0px`}
                    borderBottom={`1px solid #000`}
                  >
                    <Wrapper width={`auto`}>
                      <SearchInput
                        type="text"
                        width={`432px`}
                        padding={`0px 5px 0px 5px`}
                        placeholder="찾고 싶은 부품을 입력하세요."
                        value={searchText}
                        onChange={onInputSearchHandler}
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
                <Wrapper width={`200px`} dr={`row`}>
                  <SmallButton
                    type="button"
                    kindOf={`default`}
                    onClick={() => {
                      setModalOption("addPart");
                      setModalOpen(true);
                    }}
                  >
                    추가
                  </SmallButton>
                  <SmallButton type="button" kindOf={`default`}>
                    삭제
                  </SmallButton>
                </Wrapper>
              </Wrapper>
              <Wrapper>
                <table>
                  <thead>
                    <tr>
                      <td width={`10%`}>
                        <input
                          type="checkbox"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onCheckedAll(e.target.checked)
                          }
                          checked={
                            checkedList.length === 0
                              ? false
                              : checkedList.length === partList.length
                              ? true
                              : false
                          }
                        />
                      </td>
                      <td width={`30%`}>부품코드</td>
                      <td width={`30%`}>부품명</td>
                      <td width={`30%`}>국토부</td>
                    </tr>
                  </thead>
                  <tbody>
                    {partList.map((list: any) => (
                      <tr
                        key={list._id}
                        onClick={() => {
                          setModalOption("patchPart");
                          setModalOpen(true);
                        }}
                      >
                        <td
                          width={`10%`}
                          onClick={(
                            e: React.MouseEvent<HTMLTableCellElement>
                          ) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onCheckedElement(e.target.checked, list)}
                            checked={
                              checkedList.includes(list._id) ? true : false
                            }
                          />
                        </td>
                        <td width={`30%`}>{list.code}</td>
                        <td width={`30%`}>{list.name}</td>
                        <td width={`30%`}>{list.molit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
        <Wrapper>
          <ReactModal
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
              {modalOption === "addClass"
                ? "클래스"
                : modalOption === "addPart"
                ? "부품"
                : "수정"}
            </Wrapper>
          </ReactModal>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
