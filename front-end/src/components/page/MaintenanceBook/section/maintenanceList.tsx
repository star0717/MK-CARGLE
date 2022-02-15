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
  CloseButton,
  CommonButton,
  TextInput2,
  TableRow,
  TableRowLIST,
} from "src/components/styles/CommonComponents";
import Modal from "react-modal";
import { _MainProps } from "src/configure/_props.entity";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
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

const MaintenenanceList: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState(props.findResult.docs);

  /** 상세검색 checkBox state 관리 */
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");
  const [statusOne, setStatusOne] = useState<boolean>(false);
  const [statusTwo, setStatusTwo] = useState<boolean>(false);
  const [statusThree, setStatusThree] = useState<boolean>(false);

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
      setSearchFrom(e.target.value);
    } else {
      setSearchTo(e.target.value);
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  // state초기값으로 props를 넣게 되는경우 발생하는 오류방지용
  useEffect(() => {
    setMaintenanceList(props.findResult.docs);
  }, [props.findResult.docs]);

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
        <Wrapper>
          <form>
            <Wrapper dr={`row`} al={`flex-end`}>
              <SearchInputWrapper
                type="text"
                placeholder="차량번호를 입력하세요."
                dr={`row`}
                width={`678px`}
                padding={`0px 5px`}
                margin={`10px 0px 0px`}
                borderBottom={`1px solid #000`}
              >
                <Wrapper width={`auto`}>
                  <SearchInput
                    width={`632px`}
                    type="text"
                    placeholder="차량번호를 입력하세요."
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
              <Text
                type="button"
                width={`150px`}
                fontSize={`16px`}
                kindOf={`default`}
                margin={`0px 10px`}
                onClick={() => {
                  setSearchMenu(!searchMenu);
                }}
              >
                api 준비중(상세검색)
              </Text>
            </Wrapper>
          </form>
        </Wrapper>
        {searchMenu === true && (
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
        )}
        <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
          <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
            <SmallButton
              type="button"
              kindOf={`cancle`}
              width={`150px`}
              fontSize={`16px`}
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

        <Wrapper margin={`10px 0px 30px`}>
          <TableWrapper>
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
                  <Text color={`#c4c4c4`}>
                    {" "}
                    <GoPrimitiveDot />
                    검색 결과가 없습니다.
                  </Text>
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
