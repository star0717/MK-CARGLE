import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import dayjs from "dayjs";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  SearchInputWrapper,
  WholeWrapper,
  Wrapper,
  SearchInput,
  IconButton,
  Text,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  Checkbox,
  CheckInput,
  CheckMark,
  TableBody,
  TextInput2,
  TableRow,
  TableRowLIST,
  Combo,
  ColorSpan,
} from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { PagenationSection } from "src/components/common/sections";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { Maintenance } from "src/models/maintenance.entity";
import {
  getStrMainCustomerType,
  getStrMainStatus,
} from "src/constants/maintenance.const";
import { useDispatch } from "react-redux";
import {
  _aDeleteMaintenancesDelete,
  _aPostMaintenancesDeleteMany,
} from "store/action/user.action";
import { _iDeleteByUser } from "store/interfaces";
import { GoPrimitiveDot } from "react-icons/go";

const MaintenenanceList: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [checkedList, setCheckedList] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState(props.findResult.docs);
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: string[] = [];
        maintenanceList.forEach((list: Maintenance) =>
          checkedListArray.push(list._id)
        );
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [maintenanceList]
  );

  /**
   * 개별 선택 기능
   */
  const onCheckedElement = useCallback(
    (checked: boolean, list: Maintenance) => {
      if (checked) {
        setCheckedList([...checkedList, list._id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list._id));
      }
    },
    [checkedList]
  );

  //삭제 기능
  const onDeleteMaintenances = () => {
    if (checkedList.length > 0) {
      if (
        window.confirm(
          `${checkedList.length} 건 의 정비리스트를 삭제하시겠습니까?`
        )
      ) {
        if (checkedList.length > 1) {
          dispatch(_aPostMaintenancesDeleteMany(checkedList)).then(
            (res: _iDeleteByUser) => {
              alert(
                `${res.payload.deletedCount} 건 의 정비리스트를 삭제하였습니다.`
              );
              setReset(reset + 1);
            }
          );
        } else {
          dispatch(_aDeleteMaintenancesDelete(checkedList[0])).then(
            (res: _iDeleteByUser) => {
              alert(
                `${res.payload.deletedCount} 건 의 정비리스트를 삭제하였습니다.`
              );
              setReset(reset + 1);
            }
          );
        }
      } else {
        alert("삭제를 취소했습니다.");
      }
    } else {
      alert("삭제할 항목이 없습니다.");
    }
  };

  //리셋 기능
  const onResetHandler = () => {
    props.setSearchList({
      sFrom: props.data.sFrom,
      sTo: props.data.sTo,
      regNumber: "",
      costomerType: "all",
      status: "all",
    });
  };

  //검색 핸들러
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.findDocHandler(1);
  };

  //검색 조건 설정 핸들러
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchList({
      ...props.searchList,
      [e.target.name]: e.target.value,
    });
  };
  const onKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      props.findDocHandler(1);
    }
  };
  //기간 input typing 막는 이벤트
  const PreventDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  // state초기값으로 props를 넣게 되는경우 발생하는 오류방지용
  useEffect(() => {
    setMaintenanceList(props.findResult.docs);
  }, [props.findResult.docs]);

  //리스트 삭제시 화면 리셋용
  useEffect(() => {
    setCheckedList([]);
    props.findDocHandler(1);
  }, [reset]);

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper
      tabIndex="0"
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyHandler(e);
      }}
    >
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>정비장부</CommonTitle>
          <CommonSubTitle>정비내역을 관리할 수 있어요.</CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper al={`flex-end`} dr={`row`} ju={`space-between`}>
          <form onSubmit={onSubmitHandler}>
            <Wrapper dr={`row`} al={`flex-end`}>
              <SearchInputWrapper
                type="text"
                placeholder="차량번호를 입력하세요."
                dr={`row`}
                width={`578px`}
                padding={`0px 5px`}
                margin={`10px 0px 0px`}
                borderBottom={`1px solid #000`}
              >
                <Wrapper width={`auto`}>
                  <SearchInput
                    width={`532px`}
                    type="text"
                    name="regNumber"
                    value={props.searchList.regNumber}
                    placeholder="차량번호를 입력하세요."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onSearchHandler(e);
                    }}
                  />
                </Wrapper>
                <Wrapper>
                  <Text>
                    <IconButton type="submit" shadow={`none`}>
                      <BsSearch />
                    </IconButton>
                  </Text>
                </Wrapper>
              </SearchInputWrapper>
              <SmallButton
                type="button"
                width={`150px`}
                fontSize={`16px`}
                kindOf={`default`}
                margin={`0px 10px`}
                onClick={() => {
                  onResetHandler();
                  setReset(reset + 1);
                }}
              >
                검색 조건 초기화
              </SmallButton>
            </Wrapper>
          </form>
          <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton
                type="button"
                kindOf={`cancle`}
                width={`150px`}
                fontSize={`16px`}
                onClick={onDeleteMaintenances}
              >
                선택삭제
              </SmallButton>
              <SmallButton
                type="button"
                width={`150px`}
                fontSize={`16px`}
                kindOf={`fillDefault`}
                onClick={() => {
                  router.push(`${UseLink.MAINTENANCE_BOOK}?step=c`);
                }}
              >
                +신규정비등록
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-between`} padding={`50px 0px 0px`}>
          <Wrapper dr={`row`} width={`auto`}>
            <Wrapper al={`flex-end`} width={`80px`}>
              <Text>기간</Text>
            </Wrapper>
            <Wrapper ju={`flex-end`} dr={`row`}>
              <TextInput2
                type="date"
                name="sFrom"
                width={`220px`}
                onKeyPress={(e: React.ChangeEvent<HTMLInputElement>) => {
                  PreventDefault(e);
                }}
                value={dayjs(props.searchList.sFrom).format("YYYY-MM-DD")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setSearchList({
                    ...props.searchList,
                    sFrom: e.target.value,
                  });
                  onSearchHandler(e);
                  setReset(reset + 1);
                }}
              />
              <Wrapper width={`auto`}>
                <Text> ~ </Text>
              </Wrapper>
              <TextInput2
                type="date"
                name="sTo"
                width={`220px`}
                onKeyPress={(e: React.ChangeEvent<HTMLInputElement>) => {
                  PreventDefault(e);
                }}
                value={dayjs(props.searchList.sTo).format("YYYY-MM-DD")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setSearchList({
                    ...props.searchList,
                    sTo: e.target.value,
                  });
                  onSearchHandler(e);
                  setReset(reset + 1);
                }}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} width={`auto`}>
            <Wrapper al={`flex-end`} width={`80px`}>
              <Text>구분</Text>
            </Wrapper>
            <Wrapper al={`flex-end`} width={`auto`}>
              <Combo
                width={`220px`}
                name="costomerType"
                value={props.searchList.costomerType}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setSearchList({
                    ...props.searchList,
                    costomerType: e.target.value,
                  });
                  onSearchHandler(e);
                  setReset(reset + 1);
                }}
              >
                <option value="all">전체</option>
                <option value="n">일반</option>
                <option value="i">보험</option>
              </Combo>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} width={`auto`}>
            <Wrapper al={`flex-end`} width={`80px`}>
              <Text>정비상태</Text>
            </Wrapper>
            <Wrapper al={`flex-end`} width={`auto`}>
              <Combo
                width={`220px`}
                name="status"
                value={props.searchList.status}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setSearchList({
                    ...props.searchList,
                    status: e.target.value,
                  });
                  onSearchHandler(e);
                  setReset(reset + 1);
                }}
              >
                <option value="all">전체</option>
                <option value="s">입고</option>
                <option value="i">정비중</option>
                <option value="d">정비완료</option>
                <option value="p">결제완료</option>
                <option value="r">출고</option>
              </Combo>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper margin={`0px 0px 30px`}>
          <TableWrapper margin={`20px 0px 0px`} kindOf={`list`}>
            <TableHead>
              <TableHeadLIST
                width={`5%`}
                onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput
                    type="checkbox"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onCheckedAll(e.target.checked)
                    }
                    checked={
                      checkedList.length === 0
                        ? false
                        : checkedList.length === maintenanceList.length
                        ? true
                        : false
                    }
                  />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`15%`}>입고일자</TableHeadLIST>
              <TableHeadLIST width={`15%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`11%`}>구분</TableHeadLIST>
              <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
              <TableHeadLIST width={`13%`}>문서발급</TableHeadLIST>
              <TableHeadLIST width={`13%`}>국토부</TableHeadLIST>
              <TableHeadLIST width={`13%`}>정비상태</TableHeadLIST>
            </TableHead>
            <TableBody>
              {/* <TableRow>
                <TableRowLIST width={`5%`}>
                  <Checkbox kindOf={`TableCheckBox`}>
                    <CheckInput type="checkbox" />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </TableRowLIST>
                <TableRowLIST width={`15%`}>2022-02-09</TableRowLIST>
                <TableRowLIST width={`15%`}>11가1111</TableRowLIST>
                <TableRowLIST width={`11%`}>일반</TableRowLIST>
                <TableRowLIST width={`15%`}>엔진오일 외 1건</TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#51b351`}>
                    <GoPrimitiveDot />
                  </Text>
                  발급완료
                </TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#51b351`}>
                    <GoPrimitiveDot />
                  </Text>
                  전송완료
                </TableRowLIST>
                <TableRowLIST width={`13%`}>정비중</TableRowLIST>
              </TableRow>
              <TableRow>
                <TableRowLIST width={`5%`}>
                  <Checkbox kindOf={`TableCheckBox`}>
                    <CheckInput type="checkbox" />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </TableRowLIST>
                <TableRowLIST width={`15%`}>2022-02-09</TableRowLIST>
                <TableRowLIST width={`15%`}>11가1111</TableRowLIST>
                <TableRowLIST width={`11%`}>일반</TableRowLIST>
                <TableRowLIST width={`15%`}>엔진오일 외 1건</TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#d6263b`}>
                    <GoPrimitiveDot />
                  </Text>
                  미발급
                </TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#d6263b`}>
                    <GoPrimitiveDot />
                  </Text>
                  미전송
                </TableRowLIST>
                <TableRowLIST width={`13%`}>정비중</TableRowLIST>
              </TableRow>
              <TableRow>
                <TableRowLIST width={`5%`}>
                  <Checkbox kindOf={`TableCheckBox`}>
                    <CheckInput type="checkbox" />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </TableRowLIST>
                <TableRowLIST width={`15%`}>2022-02-09</TableRowLIST>
                <TableRowLIST width={`15%`}>11가1111</TableRowLIST>
                <TableRowLIST width={`11%`}>일반</TableRowLIST>
                <TableRowLIST width={`15%`}>엔진오일 외 1건</TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#d6263b`}>
                    <GoPrimitiveDot />
                  </Text>
                  미발급
                </TableRowLIST>
                <TableRowLIST width={`13%`}>
                  <Text color={`#c4c4c4`}>
                    <GoPrimitiveDot />
                  </Text>
                  해당없음
                </TableRowLIST>
                <TableRowLIST width={`13%`}>정비중</TableRowLIST>
              </TableRow> */}

              {props.findResult.totalDocs > 0 ? (
                maintenanceList?.map((list: any) => (
                  <TableRow
                    key={list._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.MAINTENANCE_BOOK}?id=${list._id}&step=${list.status}`
                      );
                    }}
                  >
                    <TableRowLIST
                      width={`5%`}
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <Checkbox kindOf={`TableCheckBox`}>
                        <CheckInput
                          type="checkbox"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onCheckedElement(e.target.checked, list)
                          }
                          checked={
                            checkedList.includes(list._id) ? true : false
                          }
                        />
                        <CheckMark></CheckMark>
                      </Checkbox>
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {dayjs(list.createdAt).format("YYYY-MM-DD")}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {list.car.regNumber}
                    </TableRowLIST>
                    <TableRowLIST width={`11%`}>
                      {getStrMainCustomerType(list.costomerType)}
                    </TableRowLIST>
                    <TableRowLIST width={`15%`}>
                      {list.works?.length > 1
                        ? `${list.works[0]?.name} 외 ${list.works.length - 1}건`
                        : list.works[0]?.name}
                    </TableRowLIST>
                    <TableRowLIST width={`13%`}>
                      {list?.estimate ? (
                        <Wrapper dr={`row`} width={`auto`}>
                          <ColorSpan color={`#51b351`} margin={`4px 0px 0px`}>
                            <GoPrimitiveDot />
                          </ColorSpan>
                          발급완료
                        </Wrapper>
                      ) : (
                        <Wrapper dr={`row`} width={`auto`}>
                          <ColorSpan color={`#d6263b`} margin={`4px 0px 0px`}>
                            <GoPrimitiveDot />
                          </ColorSpan>
                          미발급
                        </Wrapper>
                      )}
                    </TableRowLIST>
                    <TableRowLIST width={`13%`}>{"api준비중"}</TableRowLIST>
                    <TableRowLIST width={`13%`}>
                      {getStrMainStatus(list.status)}
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
          <Wrapper dr={`row`}></Wrapper>
          <PagenationSection {...props} />
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MaintenenanceList;
