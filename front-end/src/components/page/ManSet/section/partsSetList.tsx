import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonButton,
  CommonButtonWrapper,
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
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { BsEmojiFrownFill, BsPencilSquare } from "react-icons/bs";
import { getPartByCode } from "src/constants/part.const";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { PartsSet } from "src/models/partsset.entity";
import { Part } from "src/models/part.entity";
import { useDispatch } from "react-redux";
import {
  _aDeletePartssetsOne,
  _aGetPartssets,
  _aGetPartssetsOne,
  _aPatchPartssetsOne,
  _aPostPartssetsOne,
} from "store/action/user.action";
import { _iDeleteByUser, _iPartssets, _iPartssetsOne } from "store/interfaces";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { dataSort } from "src/modules/commonModule";

const PartsSetList: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [selectClass, setSelectClass] = useState<string>(
    dataSort(props.partSetClass, "date", 1, "createdAt")[0]?._id
  ); // 선택한 세트 항목

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 세트 항목에 따라 데이터 반환
   */
  useEffect(() => {
    if (!selectClass) {
      if (props.partSetClass.length === 0)
        return props.setPartSetData(undefined);
      return setSelectClass(props.partSetClass[0]._id);
    }
    dispatch(_aGetPartssetsOne(selectClass)).then((res: _iPartssetsOne) => {
      props.setPartSetData(res.payload);
    });
  }, [selectClass]);

  /**
   * 세트 클래스 변경
   * @param select
   * @returns
   */
  const onSelectPartSet = (select: Partial<PartsSet>) => {
    const existSet: Partial<PartsSet>[] = props.partSetClass.filter(
      (set: Partial<PartsSet>) => set._id === selectClass
    );
    if (
      existSet[0].partsCodes?.length !== props.partSetData.partsCodes?.length
    ) {
      if (
        window.confirm("추가된 부품이 저장되지 않았습니다. 계속하시겠습니까?")
      ) {
        return setSelectClass(select._id);
      } else {
        return false;
      }
    }
    setSelectClass(select._id);
  };

  /**
   * 세트 추가
   */
  const onAddPartSetClass = () => {
    let name: string = `세트명${props.partSetClass.length + 1}`;
    for (let i = 0; i < props.partSetClass.length; i++) {
      if (name === props.partSetClass[i].name) {
        name = `세트명${Number(name.substring(3)) + 1}`;
      }
    }
    const basePartSet: Partial<PartsSet> = {
      name: name,
    };
    dispatch(_aPostPartssetsOne(basePartSet)).then(
      (res: _iPartssetsOne) => {
        props.setPartSetClass((partSetClass) => [...partSetClass, res.payload]);
        setSelectClass(res.payload._id);
      },
      (err) => {
        alert("세트 항목 추가에 실패했습니다.");
      }
    );
  };

  /**
   * 세트 삭제
   * @param id
   * @returns
   */
  const onDeletePartSetClass = (id: string) => {
    if (window.confirm("세트를 삭제하시겠습니까?")) {
      dispatch(_aDeletePartssetsOne(id)).then(
        (res: _iDeleteByUser) => {
          props.setPartSetClass(
            props.partSetClass.filter((partSet) => partSet._id !== id)
          );
          setSelectClass(null);
        },
        (err) => {
          alert("세트 항목 삭제에 실패했습니다.");
        }
      );
    } else {
      return false;
    }
  };

  /** 세트 저장(실제타는 api는 수정) */
  const onSavePartsSet = () => {
    for (let i = 0; i < props.partSetClass.length; i++) {
      if (props.partSetData.name === props.partSetClass[i].name)
        return alert("중복된 세트명입니다.");
    }
    dispatch(
      _aPatchPartssetsOne(props.partSetData._id, props.partSetData)
    ).then(
      (res: _iPartssetsOne) => {
        dispatch(_aGetPartssets()).then(
          (res: _iPartssets) => {
            props.setPartSetClass(res.payload.docs);
            console.log(res.payload.docs[0].name);
            alert("저장되었습니다.");
          },
          (err) => {
            alert("세트 리스트를 불러오는데 실패했습니다.");
          }
        );
      },
      (err) => {
        alert("세트 저장에 실패했습니다.");
      }
    );
  };

  /**
   * 부품 삭제
   * @param code
   */
  const onDeletePart = (code: string) => {
    props.setPartSetData({
      ...props.partSetData,
      partsCodes: props.partSetData.partsCodes.filter(
        (partCode) => partCode !== code
      ),
    });
  };

  /**
   * 세트부품 리스트 초기화
   */
  const onResetPartCodeList = () => {
    const existSet: Partial<PartsSet>[] = props.partSetClass.filter(
      (set: Partial<PartsSet>) => set._id === selectClass
    );
    if (
      existSet[0].partsCodes?.length !== props.partSetData.partsCodes?.length
    ) {
      props.setPartSetData({
        ...props.partSetData,
        partsCodes: existSet[0].partsCodes,
      });
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>세트관리</CommonTitle>
          <CommonSubTitle>
            자주 사용하는 부품을 묶어서 관리할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper
          dr={`row`}
          padding={`40px 0px 0px`}
          ju={`space-between`}
          al={`flex-start`}
        >
          {/* 부품분류 */}
          <Wrapper width={`24%`}>
            <TableWrapper>
              <Wrapper isSticky={true}>
                <TableHead radius={`8px 8px 0px 0px`}>
                  {/* <TableHeadLIST
                    width={`15%`}
                    color={`#51b351`}
                    fontSize={`26px`}
                  >
                    <IconButton
                      type="button"
                      color={`inherit`}
                      bgColor={`inherit`}
                      shadow={`none`}
                      padding={`0px`}
                      ju={`flex-start`}
                      al={`center`}
                      onClick={onAddPartSetClass}
                    >
                      <AiFillPlusSquare />
                    </IconButton>
                  </TableHeadLIST> */}
                  <TableHeadLIST width={`100%`}>세트항목</TableHeadLIST>
                </TableHead>
              </Wrapper>
              <Wrapper overflow={`auto`} height={`500px`} ju={`flex-start`}>
                <TableBody>
                  {props.partSetClass.length > 0 ? (
                    props.partSetClass.map(
                      (set: Partial<PartsSet>, idx: number) => (
                        <TableRow
                          key={idx}
                          onClick={() => onSelectPartSet(set)}
                          kindOf={
                            selectClass === set._id
                              ? `selectClass`
                              : `noSelectClass`
                          }
                        >
                          <TableRowLIST
                            width={`15%`}
                            color={`#d6263b`}
                            fontSize={`26px`}
                          >
                            <IconButton
                              type="button"
                              color={`inherit`}
                              bgColor={`inherit`}
                              shadow={`none`}
                              padding={`0px`}
                              ju={`flex-start`}
                              al={`center`}
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                e.stopPropagation();
                                onDeletePartSetClass(set._id);
                              }}
                            >
                              <AiFillMinusSquare />
                            </IconButton>
                          </TableRowLIST>
                          <TableRowLIST width={`85%`}>{set.name}</TableRowLIST>
                        </TableRow>
                      )
                    )
                  ) : (
                    <Wrapper minHeight={`450px`}>
                      <Text fontSize={`48px`} color={`#c4c4c4`}>
                        <BsEmojiFrownFill />
                      </Text>
                      <Text color={`#c4c4c4`}>부품이 없습니다.</Text>
                    </Wrapper>
                  )}
                  <Wrapper padding={`10px 0px 0px`}>
                    <SmallButton
                      width={`100%`}
                      kindOf={`default`}
                      onClick={onAddPartSetClass}
                    >
                      세트항목추가
                    </SmallButton>
                  </Wrapper>
                </TableBody>
              </Wrapper>
            </TableWrapper>
          </Wrapper>
          {/* 상세정보 */}
          <Wrapper width={`74%`} border={`1px solid #ccc`}>
            <Wrapper
              bgColor={`#343a40`}
              height={`50px`}
              radius={`8px 8px 0px 0px`}
              al={`flex-start`}
              padding={`0px 20px`}
            >
              <Text color={`#fff`}>상세정보</Text>
            </Wrapper>
            {props.partSetData ? (
              <Wrapper>
                <Wrapper height={`100px`} al={`flex-start`}>
                  <Wrapper dr={`row`} padding={`0px 20px`} ju={`flex-start`}>
                    <Wrapper width={`auto`}>
                      <Text padding={`0px 10px 0px 0px`}>세트명</Text>
                    </Wrapper>
                    <SearchInputWrapper
                      type="text"
                      width={`378px`}
                      padding={`0px 5px`}
                      dr={`row`}
                      borderBottom={`1px solid #000`}
                    >
                      <Wrapper width={`auto`}>
                        <SearchInput
                          width={`332px`}
                          padding={`0px 5px 0px 5px`}
                          placeholder="세트명을 지정해주세요."
                          type="text"
                          value={props.partSetData.name}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            props.setPartSetData({
                              ...props.partSetData,
                              name: e.target.value,
                            });
                          }}
                        />
                      </Wrapper>
                      <Wrapper width={`36px`} height={`46px`}>
                        <Text fontSize={`24px`} lineHeight={`1`}>
                          <BsPencilSquare />
                        </Text>
                      </Wrapper>
                    </SearchInputWrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  padding={`0px 20px`}
                  margin={`10px 0px`}
                >
                  <Text>세트부품항목</Text>
                  <SmallButton
                    kindOf={`default`}
                    width={`150px`}
                    onClick={() => {
                      props.setModalOpen(true);
                    }}
                  >
                    부품추가하기
                  </SmallButton>
                </Wrapper>
                <TableWrapper>
                  <Wrapper isSticky={true}>
                    <TableHead radius={`0px`}>
                      <TableHeadLIST width={`20%`}>삭제</TableHeadLIST>
                      <TableHeadLIST width={`40%`}>부품명</TableHeadLIST>
                      <TableHeadLIST width={`40%`}>국토부</TableHeadLIST>
                    </TableHead>
                  </Wrapper>
                  <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                    <TableBody>
                      {props.partSetData.partsCodes.length !== 0 ? (
                        props.partSetData.partsCodes.map((code: string) => {
                          const part: Part = getPartByCode(
                            code,
                            props.data.allParts.docs
                          );
                          return (
                            <TableRow key={part?._id} kindOf={`noHover`}>
                              <TableRowLIST
                                width={`20%`}
                                color={`#d6263b`}
                                fontSize={`26px`}
                              >
                                <IconButton
                                  type="button"
                                  color={`inherit`}
                                  bgColor={`inherit`}
                                  shadow={`none`}
                                  padding={`0px`}
                                  ju={`flex-start`}
                                  al={`center`}
                                  onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                  ) => {
                                    e.stopPropagation();
                                    onDeletePart(part.code);
                                  }}
                                >
                                  <AiFillMinusSquare />
                                </IconButton>
                              </TableRowLIST>
                              <TableRowLIST width={`40%`}>
                                {part?.name}
                              </TableRowLIST>
                              <TableRowLIST width={`40%`}>
                                {part?.tsCode ? part.tsCode : "-"}
                              </TableRowLIST>
                            </TableRow>
                          );
                        })
                      ) : (
                        <Wrapper minHeight={`445px`}>
                          <Text fontSize={`48px`} color={`#c4c4c4`}>
                            <BsEmojiFrownFill />
                          </Text>
                          <Text color={`#c4c4c4`}>부품이 없습니다.</Text>
                        </Wrapper>
                      )}
                    </TableBody>
                  </Wrapper>
                </TableWrapper>
                <CommonButtonWrapper
                  ju={`space-between`}
                  padding={`0px 30px 30px`}
                >
                  <CommonButton
                    type="button"
                    kindOf={`white`}
                    width={`400px`}
                    onClick={onResetPartCodeList}
                  >
                    취소
                  </CommonButton>
                  <CommonButton
                    type="button"
                    width={`400px`}
                    onClick={onSavePartsSet}
                  >
                    저장
                  </CommonButton>
                </CommonButtonWrapper>
              </Wrapper>
            ) : (
              <Wrapper height={`500px`}>
                <Text fontSize={`48px`} color={`#c4c4c4`}>
                  <BsEmojiFrownFill />
                </Text>
                <Text color={`#c4c4c4`}>세트가 없습니다.</Text>
              </Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default PartsSetList;
