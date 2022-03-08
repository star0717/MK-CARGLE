import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  IconButton,
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
import { BsEmojiFrownFill } from "react-icons/bs";
import { getPartByCode } from "src/constants/part.const";
import { Part } from "src/models/part.entity";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { _aGetPartssetsOne } from "store/action/user.action";
import { PartsSet } from "src/models/partsset.entity";
import { _iPartssetsOne } from "store/interfaces";
import { MainWork } from "src/models/maintenance.entity";
import { MainPartsType } from "src/constants/maintenance.const";

const MtSetModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [selectClass, setSelectClass] = useState<string>(
    props.partSetClass[0]?._id
  ); // 선택한 세트 항목
  const [checkedList, setCheckedList] = useState<string[]>([]); // 체크한 리스트

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 세트 항목에 따라 데이터 반환
   */
  useEffect(() => {
    if (!selectClass) {
      return props.setPartSetData(undefined);
    }
    dispatch(_aGetPartssetsOne(selectClass)).then((res: _iPartssetsOne) => {
      props.setPartSetData(res.payload);
    });
  }, [selectClass]);

  /**
   * 개별 선택 기능
   */
  const onCheckedElement = useCallback(
    (checked: boolean, id: string) => {
      if (checked) {
        setCheckedList([...checkedList, id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== id));
      }
    },
    [checkedList]
  );

  /**
   * 세트부품 추가 handler
   * @returns
   */
  const onAddListHandler = async () => {
    if (checkedList.length === 0) {
      return alert("추가하려는 세트항목을 선택해주세요.");
    }
    let codeList: string[] = [];
    let partList: Part[] = [];
    let newList: MainWork[] = [];
    let backUp: MainWork[] = [];
    let Check: boolean = true;
    for (let i = 0; i < checkedList.length; i++) {
      await dispatch(_aGetPartssetsOne(checkedList[i])).then(
        (res: _iPartssetsOne) => {
          codeList = codeList.concat(res.payload.partsCodes);
        },
        (err) => {
          alert("세트항목 추가에 실패했습니다.");
        }
      );
    }
    for (let i = 0; i < codeList.length; i++) {
      partList.push(getPartByCode(codeList[i], props.data.allParts.docs));
    }

    props.workList.forEach((item, index) => {
      for (let j = 0; j < partList.length; j++) {
        if (partList[j].code === item.code) {
          backUp.push({
            ...item,
            quantity: item.quantity + 1,
            sum: item.price * (item.quantity + 1),
          });
          partList = partList.slice(0, j).concat(partList.slice(j + 1));
          Check = false;
        }
      }
      if (Check) {
        backUp.push(props.workList[index]);
      }
      Check = true;
    });
    for (let k = 0; k < partList.length; k++) {
      newList.push({
        name: partList[k].name,
        code: partList[k].code,
        tsCode: partList[k].tsCode || "",
        type: MainPartsType.A,
        price: 0,
        quantity: 1,
        sum: 0,
        wage: 0,
      });
    }

    props.setWorkList(backUp.concat(newList));
    props.setModalOpen(false);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>세트부품</CommonSmallTitle>
      <Wrapper dr={`row`} padding={`40px 0px 0px`} ju={`space-between`}>
        {/* 부품분류 */}
        <Wrapper width={`24%`}>
          <TableWrapper>
            <Wrapper isSticky={true}>
              <TableHead>
                <TableHeadLIST
                  width={`15%`}
                  color={`#51b351`}
                  fontSize={`26px`}
                ></TableHeadLIST>
                <TableHeadLIST width={`85%`}>세트항목</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`400px`} ju={`flex-start`}>
              <TableBody minHeight={`350px`}>
                {props.partSetClass.length !== 0 ? (
                  props.partSetClass.map(
                    (set: Partial<PartsSet>, idx: number) => (
                      <TableRow
                        key={idx}
                        onClick={() => setSelectClass(set._id)}
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
                          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                            e.stopPropagation()
                          }
                        >
                          <Checkbox margin={`0px 0px 26px 0px`}>
                            <CheckInput
                              type="checkbox"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => onCheckedElement(e.target.checked, set._id)}
                            />
                            <CheckMark></CheckMark>
                          </Checkbox>
                        </TableRowLIST>
                        <TableRowLIST width={`85%`}>{set.name}</TableRowLIST>
                      </TableRow>
                    )
                  )
                ) : (
                  <Wrapper minHeight={`350px`} border={`1px solid #ccc`}>
                    <Text fontSize={`48px`} color={`#c4c4c4`}>
                      <BsEmojiFrownFill />
                    </Text>
                    <Text color={`#c4c4c4`}>세트가 없습니다.</Text>
                  </Wrapper>
                )}
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        {/* 상세정보 */}
        <Wrapper width={`74%`}>
          <TableWrapper>
            <Wrapper isSticky={true}>
              <TableHead>
                <TableHeadLIST width={`50%`}>부품명</TableHeadLIST>
                <TableHeadLIST width={`50%`}>국토부</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`400px`} ju={`flex-start`}>
              <TableBody minHeight={`350px`}>
                {props.partSetData &&
                props.partSetData.partsCodes.length !== 0 ? (
                  props.partSetData.partsCodes.map((code: string) => {
                    const part: Part = getPartByCode(
                      code,
                      props.data.allParts.docs
                    );
                    return (
                      <TableRow key={part?._id} kindOf={`noHover`}>
                        <TableRowLIST width={`50%`}>{part?.name}</TableRowLIST>
                        <TableRowLIST width={`50%`}>
                          {part?.tsCode ? part.tsCode : "-"}
                        </TableRowLIST>
                      </TableRow>
                    );
                  })
                ) : (
                  <Wrapper minHeight={`350px`}>
                    <Text fontSize={`48px`} color={`#c4c4c4`}>
                      <BsEmojiFrownFill />
                    </Text>
                    <Text color={`#c4c4c4`}>부품이 없습니다.</Text>
                  </Wrapper>
                )}
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
          <CommonButton
            type="button"
            kindOf={`white`}
            width={`300px`}
            height={`50px`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            width={`300px`}
            height={`50px`}
            onClick={onAddListHandler}
          >
            저장
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MtSetModal;
