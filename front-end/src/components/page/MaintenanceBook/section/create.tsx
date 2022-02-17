import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  ColorSpan,
  Combo,
  IconButton,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  SpeechBubbleLeft,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableWrapper,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  BsFillFileEarmarkCheckFill,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { FaCarAlt, FaFlagCheckered } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";
import { RiFileList2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { basicRegEx, formRegEx } from "src/validation/regEx";
import {
  _aGetMaintenancesCarInfo,
  _aPostMaintenancesStore,
} from "store/action/user.action";
import {
  _iGetMaintenancesCarInfo,
  _iMaintenances,
  _iMaintenancesOne,
} from "store/interfaces";
import { MainStatus } from "src/constants/maintenance.const";
import { CarInfo, Customer, Maintenance } from "src/models/maintenance.entity";
import { deleteKeyJson, trim } from "src/modules/commonModule";

const MaintenanceCreate: NextPage = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // 차량 조회 초기값
  const carInit: CarInfo = {
    name: "",
    model: "",
    age: "",
    regDate: "",
    idNumber: "",
    regNumber: "",
    distance: "",
  };

  const cusInit: Customer = {
    name: "",
    phoneNumber: "",
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchCarText, setSearchCarText] = useState<string>("");
  const [carInfo, setCarInfo] = useState<CarInfo>(carInit); // 차량정보
  const [cusInfo, setCusInfo] = useState<Customer>(cusInit); // 고객정보
  const [showCar, setShowCar] = useState<boolean>(false); // 차량검색 후 정보표시
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 차량정보 input
   * @param e
   */
  const onChangeCarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarInfo({ ...carInfo, [e.target.name]: trim(e.target.value) });
  };

  /**
   * 차량 정보 리셋 handler
   */
  const onResetCar = () => {
    setCarInfo(carInit);
    setCusInfo(cusInit);
    setShowCar(false);
    setSearchCarText("");
    reset();
  };

  /**
   * 차량 조회 handler
   * @param data
   */
  const onSearchCarHandler: SubmitHandler<Partial<CarInfo>> = (data) => {
    dispatch(_aGetMaintenancesCarInfo(searchCarText)).then(
      (res: _iGetMaintenancesCarInfo) => {
        if (res.payload) {
          setCarInfo(Object.assign(carInit, res.payload));
        } else {
          setCarInfo(carInit);
        }
        setShowCar(true);
      },
      (err) => {
        alert("차량번호 조회에 실패했습니다.");
        onResetCar();
      }
    );
  };

  /**
   * 차량 입고 handler
   * @param data
   */
  const onCarStoredHandler: SubmitHandler<Partial<Maintenance>> = (data) => {
    const MaintenanceData: Partial<Maintenance> = {
      car: { ...carInfo, regNumber: searchCarText },
      customer: { ...cusInfo },
    };
    deleteKeyJson(MaintenanceData.car);
    deleteKeyJson(MaintenanceData.customer);

    dispatch(_aPostMaintenancesStore(MaintenanceData)).then(
      (res: _iMaintenancesOne) => {
        if (!res.payload) return alert("차량 입고에 실패했습니다.");
        router.push(
          `${UseLink.MAINTENANCE_BOOK}?id=${res.payload._id}&step=${MainStatus.STORED}`
        );
      },
      (err) => {
        alert("차량 입고에 실패했습니다.");
      }
    );
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
        <Wrapper>
          {/* <CommonTitle>
            차량선택 후 정비진행 버튼 클릭 시 정비가 진행됩니다.
          </CommonTitle> */}
          <Wrapper
            padding={`20px`}
            margin={`0px 0px 10px 360px`}
            al={`flex-start`}
          >
            <SpeechBubbleLeft fontSize={`20px`}>
              "차량선택 후 차량입고를 해주세요"
            </SpeechBubbleLeft>
          </Wrapper>
          <JoinStepBarWrapper padding={`0px 0px 50px`}>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`progress`}>
                <RiFileList2Fill />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량선택
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <FaCarAlt />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량입고
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>{<TiSpanner />}</JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비중
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={"line2"}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <BsFillFileEarmarkCheckFill />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비완료
              </Text>
            </Wrapper>
            <JoinStepBar kindOf={`line2`}></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar kindOf={`before`}>
                <FaFlagCheckered />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                출고완료
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        </Wrapper>
        <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
          <Wrapper width={`25%`}>
            {showCar ? (
              <Wrapper height={`80px`} ju={`flex-end`}>
                <Wrapper
                  dr={`row`}
                  fontSize={`24px`}
                  border={`1px solid #ccc`}
                  padding={`10px 0px`}
                >
                  <Text fontSize={`24px`}>{searchCarText}</Text>
                  <IconButton
                    type="button"
                    shadow={`none`}
                    onClick={onResetCar}
                  >
                    <AiFillCloseCircle />
                  </IconButton>
                </Wrapper>
              </Wrapper>
            ) : (
              <Wrapper height={`80px`} al={`flex-end`}>
                <form onSubmit={handleSubmit(onSearchCarHandler)}>
                  <SearchInputWrapper
                    type="text"
                    width={`100%`}
                    dr={`row`}
                    borderBottom={`1px solid #000`}
                    al={`space-between`}
                  >
                    <Wrapper>
                      <SearchInput
                        width={`264px`}
                        placeholder="차량번호를 입력하세요."
                        type="text"
                        value={searchCarText}
                        {...register("searchCarText", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSearchCarText(e.target.value);
                          },
                          required: {
                            value: true,
                            message: "차량번호를 입력하세요.",
                          },
                          pattern: {
                            value: formRegEx.CAR_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper width={`36px`} height={`46px`}>
                      <IconButton type="submit" shadow={`none`}>
                        <BsSearch />
                      </IconButton>
                    </Wrapper>
                  </SearchInputWrapper>
                  {(errors.searchCarText?.type === "required" ||
                    errors.searchCarText?.type === "pattern") && (
                    <Text
                      margin={`0px`}
                      width={`100%`}
                      color={`#d6263b`}
                      al={`flex-start`}
                      fontSize={`14px`}
                      textAlign={`left`}
                    >
                      {errors.searchCarText.message}
                    </Text>
                  )}
                </form>
              </Wrapper>
            )}
            <Wrapper
              border={`1px solid #ccc`}
              margin={`10px 0px 0px 0px`}
              padding={`10px 20px`}
            >
              {showCar ? (
                <form
                  id="carInfoForm"
                  onSubmit={handleSubmit(onCarStoredHandler)}
                >
                  <Wrapper>
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        주행거리
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.distance}
                        placeholder="주행거리를 입력하세요(km)"
                        {...register("distance", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                          pattern: {
                            value: basicRegEx.NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                      />
                    </Wrapper>
                    {(errors.distance?.type === "required" ||
                      errors.distance?.type === "pattern") && (
                      <Text
                        margin={`0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        {errors.distance.message}
                      </Text>
                    )}
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        고객명
                      </Text>
                      <TextInput2
                        type="text"
                        value={cusInfo.name}
                        {...register("cusName", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            // onChangeCusInfo(e);
                            setCusInfo({ ...cusInfo, name: e.target.value });
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        전화번호
                      </Text>
                      <TextInput2
                        type="text"
                        value={cusInfo.phoneNumber}
                        {...register("phoneNumber", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setCusInfo({
                              ...cusInfo,
                              phoneNumber: e.target.value,
                            });
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                          pattern: {
                            value: formRegEx.HP_NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                      />
                    </Wrapper>
                    {(errors.phoneNumber?.type === "required" ||
                      errors.phoneNumber?.type === "pattern") && (
                      <Text
                        margin={`0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        {errors.phoneNumber.message}
                      </Text>
                    )}
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        차량명
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.name}
                        {...register("name", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                          required: {
                            value: true,
                            message: "필수 입력사항입니다.",
                          },
                        })}
                      />
                    </Wrapper>
                    {errors.name?.type === "required" && (
                      <Text
                        margin={`0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        {errors.name.message}
                      </Text>
                    )}
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        모델명
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.model}
                        {...register("model", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        연식
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.age}
                        {...register("age", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        차대번호
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.idNumber}
                        {...register("idNumber", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                          pattern: {
                            value: basicRegEx.NUM,
                            message: "형식에 맞게 입력하세요.",
                          },
                        })}
                      />
                    </Wrapper>
                    {errors.idNumber?.type === "pattern" && (
                      <Text
                        margin={`0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        {errors.idNumber.message}
                      </Text>
                    )}
                    <Wrapper
                      dr={`row`}
                      padding={`10px 0px`}
                      ju={`space-between`}
                    >
                      <Text
                        width={`80px`}
                        textAlign={`right`}
                        margin={`0px 10px 0px 0px`}
                      >
                        등록일자
                      </Text>
                      <TextInput2
                        type="text"
                        value={carInfo.regDate}
                        {...register("regDate", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                        })}
                      />
                    </Wrapper>
                  </Wrapper>
                </form>
              ) : (
                <Wrapper padding={`50% 20px`}>
                  <Text fontSize={`36px`} color={`#c4c4c4`}>
                    <BsPlusCircleFill />
                  </Text>
                  <Text>
                    선택된 차량이 없습니다 <br />
                    차량 선택 후 정비등록을 진행할 수 있습니다.
                  </Text>
                </Wrapper>
              )}
            </Wrapper>
          </Wrapper>

          <Wrapper width={`74%`}>
            <Wrapper height={`80px`} al={`flex-end`} ju={`flex-end`}>
              <Wrapper dr={`row`} ju={`flex-end`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {
                    router.push(UseLink.MAINTENANCE_BOOK);
                  }}
                >
                  목록으로
                </SmallButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              border={`1px solid #ccc`}
              padding={`20px`}
              margin={`10px 0px 20px`}
            >
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                padding={`0px 0px 10px 0px`}
              >
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`80px`}
                  >
                    정비기간
                  </Text>
                  <TextInput2 width={`150px`} type="date" disabled />
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`16px`}
                  >
                    ~
                  </Text>
                  <TextInput2 width={`150px`} type="date" disabled />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    차량출고일
                  </Text>
                  <TextInput2 width={`150px`} type="date" disabled />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    정비책임자
                  </Text>
                  <TextInput2 width={`100px`} type="text" disabled />
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`}>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`80px`}
                  >
                    정비구분
                  </Text>
                  <Combo width={`150px`} margin={`0px`} disabled>
                    <option value="1">일반</option>
                  </Combo>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`16px`}
                  ></Text>
                  <TextInput2 type="text" width={`150px`} disabled />
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  padding={`0px 0px 0px 10px`}
                >
                  <TextInput2 type="text" width={`240px`} disabled />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Text
                    textAlign={`end`}
                    padding={`0px 5px 0px 0px`}
                    width={`100px`}
                  >
                    추가정비동의
                  </Text>
                  <Combo width={`100px`} margin={`0`} disabled>
                    <option value="1">동의</option>
                  </Combo>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`10px 0px`}>
              <Wrapper width={`auto`}>
                <Text fontSize={`20px`} color={`#314FA5`}>
                  정비내역
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  height={`40px`}
                  al={`center`}
                  margin={`0px 10px 0px 0px`}
                  width={`auto`}
                >
                  <Checkbox>
                    부가세 포함
                    <CheckInput type="checkbox" disabled />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} width={`170px`}>
                  <SmallButton type="button" kindOf={`ghost`} disabled>
                    부품조회
                  </SmallButton>
                  <SmallButton type="button" kindOf={`ghost`} disabled>
                    세트부품
                  </SmallButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <TableWrapper minHeight={`auto`}>
              <TableHead>
                <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
                <TableHeadLIST width={`15%`}>국토부</TableHeadLIST>
                <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
                <TableHeadLIST width={`15%`}>단가</TableHeadLIST>
                <TableHeadLIST width={`14%`}>수량</TableHeadLIST>
                <TableHeadLIST width={`14%`}>계</TableHeadLIST>
                <TableHeadLIST width={`8%`}>기술료</TableHeadLIST>
              </TableHead>
              <TableBody minHeight={`130px`}></TableBody>
            </TableWrapper>
            <Wrapper dr={`row`} ju={`flex-end`}>
              <Text>부품계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>기술료계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>합계 : 0 </Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text>부가세 : 0</Text>
              <Text fontSize={`12px`} fontWeight={`800`} margin={`0px 10px`}>
                |
              </Text>
              <Text fontSize={`24px`}>
                총계 <ColorSpan color={`#314FA5`}>0</ColorSpan>
              </Text>
            </Wrapper>
            <Wrapper>
              <SmallButton
                form="carInfoForm"
                type="submit"
                kindOf={showCar ? `default` : `ghost`}
                disabled={showCar ? false : true}
                width={`100%`}
              >
                차량입고
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper></Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MaintenanceCreate;
