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
} from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { BsEmojiFrownFill, BsSearch, BsWindowSidebar } from "react-icons/bs";
import { PagenationSection } from "src/components/common/sections";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { GoPrimitiveDot } from "react-icons/go";
import { Maintenance } from "src/models/maintenance.entity";
import {
  getStrMainCustomerType,
  getStrMainStatus,
  MainStatus,
} from "src/constants/maintenance.const";
import { useDispatch } from "react-redux";
import {
  _aDeleteMaintenancesDelete,
  _aPostMaintenancesDeleteMany,
} from "store/action/user.action";
import { _iDeleteByUser } from "store/interfaces";

const MaintenenanceList: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState(props.findResult.docs);
  const [carNumber, setCarNumber] = useState<string>("");
  const [searchList, setSearchList] = useState({
    sFrom: "",
    sTo: "",
    costomerType: "",
    status: "",
  });

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

  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "sFrom") {
      props.setSearchFrom(e.target.value);
    } else {
      props.setSearchTo(e.target.value);
    }
  };

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

  const onSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      // props.setSearchDetails
      delete props.searchDetails[e.target.name];
    } else {
      props.searchDetails[e.target.name] = e.target.value;
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (carNumber !== "") {
      props.searchDetails.regNumber = carNumber;
    } else {
      delete props.searchDetails.regNumber;
    }
    props.findDocHandler(1);
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
  };

  const onResetHandler = () => {
    setSearchList({ sFrom: "", sTo: "", costomerType: "", status: "" });
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  // state초기값으로 props를 넣게 되는경우 발생하는 오류방지용
  useEffect(() => {
    setMaintenanceList(props.findResult.docs);
  }, [props.findResult.docs]);

  useEffect(() => {
    setCheckedList([]);
    props.findDocHandler(props.findResult.currentPage);
  }, [reset]);
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // console.log(searchFrom, "~", searchTo);

  return (
    <WholeWrapper>
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
                    placeholder="차량번호를 입력하세요."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputHandler(e);
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
                  router.push(
                    `${UseLink.MAINTENANCE_BOOK}?step=${MainStatus.STORED}`
                  );
                }}
              >
                +신규정비등록
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* {searchMenu === true && (
          <Wrapper
            border={`1px solid #8DAFCE`}
            padding={`30px`}
            margin={`40px 0px`}
            radius={`8px`}
            shadow={`0px 5px 10px rgba(220,220,220,1)`}
          >
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <Text>기간</Text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <TextInput2
                  type="date"
                  name="sFrom"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputUserHandler(e);
                  }}
                  width={`300px`}
                  margin={`10px 0px 10px 30px`}
                />
                <Wrapper width={`auto`} margin={`10px 0px 10px 30px`}>
                  <Text> ~ </Text>
                </Wrapper>
                <TextInput2
                  type="date"
                  name="sTo"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputUserHandler(e);
                  }}
                  width={`300px`}
                  margin={`10px 0px 10px 30px`}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <Text>정비상태</Text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    onChange={() => {
                      setStatusThree(!statusThree);
                    }}
                  />
                  <CheckMark></CheckMark>
                  전체
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  입고
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  정비중
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  정비완료
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  결제완료
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  출고
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <Text>구분</Text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    onChange={() => {
                      setStatusThree(!statusThree);
                    }}
                  />
                  <CheckMark></CheckMark>
                  전체
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  일반
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  보험
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-end`}>
              <SmallButton type="button" kindOf={`default`} width={`150px`}>
                검색
              </SmallButton>
            </Wrapper>
          </Wrapper>
        )} */}
        {/* {searchMenu === true && (
          <Wrapper
            border={`1px solid #8DAFCE`}
            padding={`30px`}
            margin={`40px 0px`}
            radius={`8px`}
            shadow={`0px 5px 10px rgba(220,220,220,1)`}
          >
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <text>기간</text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <TextInput2
                  type="date"
                  name="sFrom"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputUserHandler(e);
                  }}
                  width={`300px`}
                  margin={`10px 0px 10px 30px`}
                />
                <Wrapper width={`auto`} margin={`10px 0px 10px 30px`}>
                  <text> ~ </text>
                </Wrapper>
                <TextInput2
                  type="date"
                  name="sTo"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputUserHandler(e);
                  }}
                  width={`300px`}
                  margin={`10px 0px 10px 30px`}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <text>차량번호</text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <TextInput2
                  placeholder={`예시) 000ㅁ0000`}
                  width={`300px`}
                  margin={`10px 0px 10px 30px`}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <text>구분</text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    onChange={() => {
                      setStatusThree(!statusThree);
                    }}
                  />
                  <CheckMark></CheckMark>
                  전체
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  일반
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusThree}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  보험
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <text>문서발급</text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    onChange={() => {
                      setStatusOne(!statusOne);
                    }}
                  />
                  <CheckMark></CheckMark>
                  전체
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusOne}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  발급
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusOne}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  미발급
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`100px`} al={`flex-end`}>
                <text>국토부</text>
              </Wrapper>
              <Wrapper
                ju={`flex-start`}
                dr={`row`}
                padding={`0px 0px 0px 50px`}
              >
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    onChange={() => {
                      setStatusTwo(!statusTwo);
                    }}
                  />
                  <CheckMark></CheckMark>
                  전체
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusTwo}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  해당없음
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusTwo}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  전송오류
                </Checkbox>
                <Checkbox margin={`10px 0px 10px 30px`} width={`100px`}>
                  <CheckInput
                    type="checkbox"
                    checked={statusTwo}
                    onChange={() => {}}
                  />
                  <CheckMark></CheckMark>
                  전송완료
                </Checkbox>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-end`}>
              <SmallButton type="button" kindOf={`default`} width={`150px`}>
                검색
              </SmallButton>
            </Wrapper>
          </Wrapper>
        )} */}
        <Wrapper dr={`row`} ju={`space-between`} padding={`50px 0px 0px`}>
          <Wrapper dr={`row`} width={`auto`}>
            <Wrapper al={`flex-end`} width={`80px`}>
              <Text>기간</Text>
            </Wrapper>
            <Wrapper ju={`flex-end`} dr={`row`}>
              <TextInput2
                type="date"
                name="sFrom"
                value={searchList.sFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchList({ ...searchList, sFrom: e.target.value });
                  onInputUserHandler(e);
                }}
                width={`220px`}
              />
              <Wrapper width={`auto`}>
                <Text> ~ </Text>
              </Wrapper>
              <TextInput2
                type="date"
                name="sTo"
                value={searchList.sTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchList({ ...searchList, sTo: e.target.value });
                  onInputUserHandler(e);
                }}
                width={`220px`}
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
                value={searchList.costomerType}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchList({
                    ...searchList,
                    costomerType: e.target.value,
                  });
                  onSelectHandler(e);
                }}
              >
                <option value="all" selected>
                  전체
                </option>
                <option value="normal">일반</option>
                <option value="insurance">보험</option>
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
                value={searchList.status}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchList({ ...searchList, status: e.target.value });
                  onSelectHandler(e);
                }}
              >
                <option value="all" selected>
                  전체
                </option>
                <option value="stored">입고</option>
                <option value="ing">정비중</option>
                <option value="done">정비완료</option>
                <option value="paid">결제완료</option>
                <option value="released">출고</option>
              </Combo>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper margin={`0px 0px 30px`}>
          <TableWrapper margin={`20px 0px 0px`}>
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
                        ? `${list.works[0]?.name}외 ${list.works.length - 1}건`
                        : list.works[0]?.name}
                    </TableRowLIST>
                    <TableRowLIST width={`13%`}>{"api준비중"}</TableRowLIST>
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
