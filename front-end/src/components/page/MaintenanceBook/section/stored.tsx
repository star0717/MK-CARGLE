import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  ColorSpan,
  Combo,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  SpeechBubble,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import {
  AiFillCloseCircle,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";
import {
  BsChevronDoubleUp,
  BsFillFileEarmarkCheckFill,
  BsPencilSquare,
  BsPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FaCar, FaCarAlt, FaFlagCheckered, FaRegListAlt } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";
import { RiFileList2Fill } from "react-icons/ri";
import { Car } from "src/models/car.entity";
import { useDispatch } from "react-redux";
import { basicRegEx, formRegEx } from "src/validation/regEx";
import { _aGetMaintenancesCarInfo } from "store/action/user.action";
import { _iGetMaintenancesCarInfo } from "store/interfaces";
import { MainStatus } from "src/constants/maintenance.const";

const MaintenanceStored: NextPage<_pMaintenanceProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchCarText, setSearchCarText] = useState<string>("");
  const [carInfo, setCarInfo] = useState<Partial<Car>>({
    name: "",
    regNumber: "",
    distance: "",
  }); // 차량정보
  const [cusInfo, setCusInfo] = useState<any>({
    customerName: "",
    phoneNumber: "",
  });
  const [showCar, setShowCar] = useState<boolean>(false); // 차량검색 후 정보표시
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 차량정보 input
   * @param e
   */
  const onChangeCarInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarInfo({ ...carInfo, [e.target.name]: e.target.value });
  };

  /**
   * 차량 조회 handler
   * @param data
   */
  const onSearchCarHandler: SubmitHandler<Partial<Car>> = (data) => {
    dispatch(_aGetMaintenancesCarInfo(searchCarText)).then(
      (res: _iGetMaintenancesCarInfo) => {
        console.log(res);
        setCarInfo(res.payload);
        setShowCar(true);
      },
      (err) => {
        alert("차량번호 조회에 실패했습니다.");
      }
    );
  };

  /**
   * 차량 정보 리셋 handler
   */
  const onResetCar = () => {
    setCarInfo({ name: "", regNumber: "" });
    setShowCar(false);
    setSearchCarText("");
    setValue("searchCarText", "");
  };

  const onCarStoredHandler: SubmitHandler<Partial<Car>> = (data) => {
    console.log("안뇽");
    // router.push(`${UseLink.MAINTENANCE_BOOK}?step=${MainStatus.ING}`);
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
          <Wrapper padding={`20px`} margin={`0px 0px 20px`}>
            <SpeechBubble fontSize={`20px`}>
              "차량선택 후 차량입고를 해주세요"
            </SpeechBubble>
          </Wrapper>
          <JoinStepBarWrapper>
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
              <Wrapper dr={`row`} fontSize={`24px`}>
                <Text fontSize={`24px`}>{searchCarText}</Text>
                <IconButton type="button" shadow={`none`} onClick={onResetCar}>
                  <AiFillCloseCircle />
                </IconButton>
              </Wrapper>
            ) : (
              <form onSubmit={handleSubmit(onSearchCarHandler)}>
                <SearchInputWrapper
                  type="text"
                  width={`100%`}
                  padding={`0px 5px`}
                  dr={`row`}
                  borderBottom={`1px solid #000`}
                  al={`space-between`}
                >
                  <Wrapper>
                    <SearchInput
                      width={`332px`}
                      padding={`0px 5px 0px 5px`}
                      placeholder="차량번호를 입력하세요."
                      type="text"
                      value={searchCarText}
                      {...register("searchCarText", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
            )}
            <Wrapper>
              {showCar ? (
                <form
                  id="carInfoForm"
                  onSubmit={handleSubmit(onCarStoredHandler)}
                >
                  <Wrapper>
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>주행거리</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
                        value={carInfo.distance}
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
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>고객명</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
                        value={cusInfo.customerName}
                        {...register("customerName", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setCusInfo({
                              ...cusInfo,
                              customerName: e.target.value,
                            });
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>전화번호</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
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
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>차량명</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
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
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>모델명</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
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
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>연식</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
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
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>차대번호</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
                        value={carInfo.idNumber}
                        {...register("idNumber", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onChangeCarInfo(e);
                          },
                        })}
                      />
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Text fontSize={`14px`}>등록일자</Text>
                      <TextInput2
                        type="text"
                        width={`100px`}
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
                // <Wrapper>
                //   <BsChevronDoubleUp />
                //   <Text>선택된 차량이 없습니다</Text>
                //   <Text>차량 선택 후 정비등록을 진행할 수 있습니다</Text>
                //   <FaCar />
                // </Wrapper>
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

          <Wrapper width={`70%`}>
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
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text width={`80px`} textAlign={`start`}>
                정비기간
              </Text>
              <TextInput2 width={`140px`} type="date" />
              <Text textAlign={`start`}>~</Text>
              <TextInput2 width={`140px`} type="date" />
              <Text width={`80px`} textAlign={`start`}>
                차량출고일
              </Text>
              <TextInput2 width={`140px`} type="date" />
              <Text width={`80px`} textAlign={`start`}>
                정비책임자
              </Text>
              <TextInput2 width={`140px`} type="text" />
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Text width={`80px`} textAlign={`start`}>
                  정비구분
                </Text>
                <Combo width={`140px`} margin={`0px`}>
                  <option value="1">일반</option>
                </Combo>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-end`}>
                <Text width={`80px`} textAlign={`start`}>
                  보험사명
                </Text>
                <TextInput2 width={`140px`} type="text" />
                <Text width={`80px`} textAlign={`start`}>
                  보험번호
                </Text>
                <TextInput2 width={`140px`} type="text" />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text width={`80px`} textAlign={`start`}>
                  추가정비동의
                </Text>
                <Combo>
                  <option value="1">동의</option>
                </Combo>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`}>
              <Text>정비내역</Text>
              <Wrapper dr={`row`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-end`}
                  height={`40px`}
                  al={`center`}
                >
                  <Checkbox>
                    부품조회
                    <CheckInput type="checkbox" onChange={() => {}} />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {}}
                >
                  부품조회
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={() => {}}
                >
                  세트부품
                </SmallButton>
              </Wrapper>
            </Wrapper>
            <TableWrapper>
              <TableHead>
                <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
                <TableHeadLIST width={`15%`}>국토부</TableHeadLIST>
                <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
                <TableHeadLIST width={`15%`}>단가</TableHeadLIST>
                <TableHeadLIST width={`14%`}>수량</TableHeadLIST>
                <TableHeadLIST width={`14%`}>계</TableHeadLIST>
                <TableHeadLIST width={`8%`}>기술료</TableHeadLIST>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableRowLIST width={`15%`}>1</TableRowLIST>
                  <TableRowLIST width={`15%`}>2</TableRowLIST>
                  <TableRowLIST width={`14%`}>3</TableRowLIST>
                  <TableRowLIST width={`15%`}>4</TableRowLIST>
                  <TableRowLIST width={`14%`}>5</TableRowLIST>
                  <TableRowLIST width={`14%`}>6</TableRowLIST>
                  <TableRowLIST width={`8%`}>7</TableRowLIST>
                </TableRow>
              </TableBody>
            </TableWrapper>
            <Wrapper>
              <SmallButton
                form="carInfoForm"
                type="submit"
                kindOf={showCar ? `default` : `ghost`}
                disabled={showCar ? false : true}
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

export default MaintenanceStored;