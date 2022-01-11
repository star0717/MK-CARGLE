import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  RsWrapper,
  Text,
  SmallButton,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Image,
  Combo,
  CommonTitleWrapper,
  CommonTitle,
  IconButton,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { _pAdminManCompanies } from "../../../../configure/_pProps.entity";
import {
  makeFullAddress,
  mbTypeToString,
} from "../../../../modules/commonModule";
import { Company } from "../../../../models/company.entity";
import { User } from "../../../../models/user.entity";
import { mbTypeOption } from "../../../../configure/list.entity";
import { formRegEx } from "../../../../validation/regEx";
import { SignUpInfo } from "../../../../models/auth.entity";
import { useDispatch } from "react-redux";
import {
  _aDeleteAdminCompanies,
  _aPatchAdminSignUpInfo,
} from "../../../../../store/action/user.action";
import {
  _iDeleteAdminCompanies,
  _iPatchAdminSignUpInfo,
} from "../../../../../store/interfaces";
import { useRouter } from "next/router";
import { UseLink } from "../../../../configure/router.entity";

const ManCompanyInfo: NextPage<_pAdminManCompanies> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [comData, setComData] = useState<Company>(props.data.company); // 클릭한 업체 정보
  const [userData, setUserData] = useState<User>(props.data.user); // 클릭한 유저 정보

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 업체 input 변경 handler
   * @param e
   */
  const onComChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComData({ ...comData, [e.target.name]: e.target.value });
  };

  /**
   * 대표자 input 변경 handler
   * @param e
   */
  const onUserChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  /**
   * 업체와 대표자 정보 변경
   * @param data
   */
  const onChangeCompany: SubmitHandler<SignUpInfo> = (data) => {
    const changeData: SignUpInfo = {
      company: comData,
      user: userData,
    };
    if (window.confirm("정보를 수정하시겠습니까?")) {
      dispatch(_aPatchAdminSignUpInfo(comData._id, changeData)).then(
        (res: _iPatchAdminSignUpInfo) => {
          alert("정보가 수정되었습니다.");
          setComData(res.payload.company);
          setUserData(res.payload.user);
        },
        (err) => {
          alert("정보 변경에 실패했습니다.");
        }
      );
    } else {
      return false;
    }
  };

  const onDeleteCompany = () => {
    if (
      window.confirm(
        "삭제할 경우 업체, 소속 직원 정보가 모두 삭제됩니다.\n삭제하시겠습니까?"
      )
    ) {
      dispatch(_aDeleteAdminCompanies(comData._id)).then(
        (res: _iDeleteAdminCompanies) => {
          alert("삭제되었습니다.");
          props.findDocHandler(props.findResult.currentPage);
          router.push(UseLink.ADMIN_MAN_COMPANIES);
        },
        (err) => {
          alert("삭제에 실패했습니다.");
        }
      );
    } else {
      return false;
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <CommonTitleWrapper>
        <CommonTitle>업체관리</CommonTitle>
      </CommonTitleWrapper>
      <RsWrapper wrap={`no-wrap`} margin={`100px 0px 0px 0px`}>
        <form onSubmit={handleSubmit(onChangeCompany)}>
          <Wrapper width={`1070px`}>
            <Wrapper dr={`row`} ju={`space-between`} padding={`0px 0px 30px`}>
              <Wrapper width={`auto`} dr={`row`}>
                <SmallButton type="submit" kindOf={`default`}>
                  정보 저장
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  onClick={onDeleteCompany}
                  margin={`0px 0px 0px 10px`}
                >
                  회원 삭제
                </SmallButton>
              </Wrapper>
              <Wrapper width={`auto`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 10px`}
                  onClick={() => {
                    router.back();
                  }}
                >
                  뒤로가기
                </SmallButton>
              </Wrapper>
            </Wrapper>

            {/* ----------------------------------------사용자-------------------------------------- */}
            <Wrapper
              border={`1px solid #ccc`}
              radius={`5px`}
              shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              margin={`0px 0px 50px`}
            >
              <Wrapper dr={`row`} radius={`5px`} margin={`0px 0px 5px 0px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <CommonSmallTitle
                    fontSize={`18px`}
                    fontWeight={`800`}
                    padding={`10px 0px`}
                  >
                    계정 정보
                  </CommonSmallTitle>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} al={`center`} margin={`0px 0px 50px`}>
                <Wrapper dr={`column`} width={`auto`} padding={`10px 0px`}>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      아이디
                    </Text>
                    <TextInput2
                      type="text"
                      readOnly
                      value={userData.email}
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      이름
                    </Text>
                    <TextInput2
                      type="text"
                      readOnly
                      value={userData.name}
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={
                        errors.hpNumber?.type === "required" ||
                        errors.hpNumber?.type === "pattern"
                          ? `0px 10px 20px 0px`
                          : `0px 10px 0px 0px`
                      }
                    >
                      전화번호
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        width={`800px`}
                        type="tel"
                        value={userData.hpNumber}
                        placeholder="(- 제외)"
                        {...register("hpNumber", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onUserChangeHandler(e);
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
                      {(errors.hpNumber?.type === "required" ||
                        errors.hpNumber?.type === "pattern") && (
                        <Text
                          margin={`0px`}
                          width={`100%`}
                          color={`#d6263b`}
                          al={`flex-start`}
                          fontSize={`14px`}
                          textAlign={`left`}
                        >
                          {errors.hpNumber.message}
                        </Text>
                      )}
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            {/* -------------------------------------업체정보----------------------------------------- */}
            <Wrapper
              border={`1px solid #ccc`}
              radius={`5px`}
              shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              margin={`0px 0px 50px`}
            >
              <Wrapper dr={`row`} radius={`5px`} margin={`0px 0px 5px 0px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <CommonSmallTitle
                    fontSize={`18px`}
                    fontWeight={`800`}
                    padding={`10px 0px`}
                  >
                    사업자 정보
                  </CommonSmallTitle>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} al={`center`} margin={`0px 0px 50px`}>
                <Wrapper dr={`column`} width={`auto`} padding={`10px 0px`}>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      상호명
                    </Text>
                    <TextInput2
                      value={comData.name}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      사업자등록번호
                    </Text>
                    <TextInput2
                      value={comData.comRegNum}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      정비업등록번호
                    </Text>
                    <Wrapper width={`auto`}>
                      <TextInput2
                        value={comData.mbRegNum}
                        type="text"
                        readOnly
                        width={`800px`}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      대표자명
                    </Text>
                    <TextInput2
                      value={comData.ownerName}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      정비업종
                    </Text>
                    <Combo
                      width={`800px`}
                      value={comData.mbTypeNum}
                      {...register("mbTypeNum", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onComChangeHandler(e);
                        },
                        required: true,
                      })}
                    >
                      {mbTypeOption.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.text}
                          </option>
                        );
                      })}
                    </Combo>
                    {errors.mbTypeNum?.type === "required" && (
                      <Text
                        margin={`0px 0px 10px 0px`}
                        width={`100%`}
                        color={`#d6263b`}
                        al={`flex-start`}
                        fontSize={`14px`}
                        textAlign={`left`}
                      >
                        필수 선택사항입니다.
                      </Text>
                    )}
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Wrapper dr={`row`}>
                      <Text
                        width={`130px`}
                        textAlign={`end`}
                        padding={`0px 10px 0px 0px`}
                      >
                        업태
                      </Text>
                      <TextInput2
                        type="text"
                        value={comData.busType}
                        {...register("busType", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onComChangeHandler(e);
                          },
                        })}
                        width={`330px`}
                      />
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Text
                        width={`130px`}
                        textAlign={`end`}
                        padding={`0px 10px 0px 0px`}
                      >
                        업종
                      </Text>
                      <TextInput2
                        type="text"
                        value={comData.busItem}
                        {...register("busItem", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            onComChangeHandler(e);
                          },
                        })}
                        width={`330px`}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`} al={`flex-start`}>
                    <Wrapper dr={`row`}>
                      <Text
                        width={`130px`}
                        textAlign={`end`}
                        padding={
                          errors.phoneNum?.type === "required" ||
                          errors.phoneNum?.type === "pattern"
                            ? `0px 10px 20px 0px`
                            : `0px 10px 0px 0px`
                        }
                      >
                        업체 전화번호
                      </Text>
                      <Wrapper dr={`column`} width={`330px`}>
                        <TextInput2
                          width={`330px`}
                          type="tel"
                          value={comData.phoneNum}
                          placeholder="(- 제외, 지역번호 포함)"
                          {...register("phoneNum", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onComChangeHandler(e);
                            },
                            required: {
                              value: true,
                              message: "필수 입력사항입니다.",
                            },
                            pattern: {
                              value: formRegEx.PH_NUM,
                              message: "형식에 맞게 입력하세요.",
                            },
                          })}
                        />
                        {(errors.phoneNum?.type === "required" ||
                          errors.phoneNum?.type === "pattern") && (
                          <Text
                            margin={`0px`}
                            width={`330px`}
                            color={`#d6263b`}
                            al={`flex-start`}
                            fontSize={`14px`}
                            textAlign={`left`}
                          >
                            {errors.phoneNum.message}
                          </Text>
                        )}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Text
                        width={`130px`}
                        textAlign={`end`}
                        padding={
                          errors.faxNum?.type === "pattern"
                            ? `0px 10px 20px 0px`
                            : `0px 10px 0px 0px`
                        }
                      >
                        업체 팩스번호
                      </Text>
                      <Wrapper dr={`column`} width={`330px`} al={`flex-end`}>
                        <TextInput2
                          width={`330px`}
                          type="tel"
                          value={comData.faxNum}
                          placeholder="(- 제외)"
                          {...register("faxNum", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onComChangeHandler(e);
                            },
                            pattern: {
                              value: formRegEx.FAX_NUM,
                              message: "형식에 맞게 입력하세요.",
                            },
                          })}
                        />
                        {errors.faxNum?.type === "pattern" && (
                          <Text
                            margin={`0px`}
                            width={`330px`}
                            color={`#d6263b`}
                            al={`flex-start`}
                            fontSize={`14px`}
                            textAlign={`left`}
                          >
                            {errors.faxNum.message}
                          </Text>
                        )}
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper dr={`row`} margin={`0px 0px 10px`}>
                    <Text
                      width={`130px`}
                      textAlign={`end`}
                      padding={`0px 10px 0px 0px`}
                    >
                      사업자 주소
                    </Text>
                    <TextInput2
                      value={makeFullAddress(
                        comData.address1,
                        comData.address2,
                        comData.postcode
                      )}
                      type="text"
                      readOnly
                      width={`800px`}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManCompanyInfo;
