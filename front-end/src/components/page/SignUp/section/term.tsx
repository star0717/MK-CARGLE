import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { _fTermData } from "../../../../configure/_fProps.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  RsWrapper,
  CommonSmallTitle,
  CommonButtonWrapper,
  CheckInput,
  Checkbox,
  CheckMark,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  JoinStepBarWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesUser, UserState } from "../../../../../store/interfaces";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";
import { RootStateInterface } from "store/interfaces/RootState";
import { UserAuthority } from "src/constants/model.const";

/**
 * 회원가입: 이용약관 컴포넌트(기능)
 * @param props
 * @returns
 */
const Term: NextPage<_pSignUpProps> = (props) => {
  const dispatch = useDispatch();

  // redux store에서 formCheck 정보 가져옴
  const { formCheck } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // 전체 체크 여부
  const [allCheck, setAllCheck] = useState<boolean>(false);

  // react-hook-form 사용을 위한 선언
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  useEffect(() => {
    if (formCheck.mkTerm && formCheck.privacyTerm && formCheck.marketTerm) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [formCheck]);

  const allCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue("mkTerm", true);
      setValue("privacyTerm", true);
      setValue("marketTerm", true);
      clearErrors("mkTerm");
      clearErrors("privacyTerm");
      dispatch({
        type: actionTypesUser.FORM_CHECK,
        payload: {
          ...props.formCheck,
          mkTerm: true,
          privacyTerm: true,
          marketTerm: true,
        },
      });
    } else {
      setValue("mkTerm", false);
      setValue("privacyTerm", false);
      setValue("marketTerm", false);
      dispatch({
        type: actionTypesUser.FORM_CHECK,
        payload: {
          ...props.formCheck,
          mkTerm: false,
          privacyTerm: false,
          marketTerm: false,
        },
      });
    }
  };

  /**
   * 이용약관 form submit handler
   * @param data
   */
  const agreeTermHandler: SubmitHandler<Partial<_fTermData>> = (data) => {
    props.setStepNumber(props.stepNumber + 1);
    window.scrollTo(0, 0);
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();
  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>회원가입</CommonTitle>
          <CommonSubTitle>
            서비스 이용을 위해 약관 동의가 필요해요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        {props.userAuth === UserAuthority.OWNER && (
          <JoinStepBarWrapper>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={props.stepNumber === 2 ? `progress` : `complete`}
              >
                {props.stepNumber === 2 ? <AiOutlineFileText /> : <GoCheck />}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                약관동의
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 2 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={
                  props.stepNumber < 3
                    ? `before`
                    : props.stepNumber === 3
                    ? `progress`
                    : `complete`
                }
              >
                {props.stepNumber > 3 ? <GoCheck /> : <AiOutlineUser />}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                계정정보
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 3 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={
                  props.stepNumber < 4
                    ? `before`
                    : props.stepNumber === 4
                    ? `progress`
                    : `complete`
                }
              >
                {props.stepNumber > 4 ? (
                  <GoCheck />
                ) : (
                  <MdOutlineBusinessCenter />
                )}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                사업자정보
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 4 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={props.stepNumber === 5 ? `progress` : `before`}
              >
                <MdOutlineUploadFile />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                서류제출
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        )}
        <Wrapper>
          <form onSubmit={handleSubmit(agreeTermHandler)}>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                <Text></Text>
                <Wrapper
                  dr={`row`}
                  width={`500px`}
                  ju={`flex-start`}
                  padding={`10px`}
                  borderBottom={`1px solid #ccc`}
                  radius={`5px`}
                  margin={`0px 0px 30px`}
                >
                  <Checkbox>
                    <CheckInput
                      type="checkbox"
                      checked={allCheck}
                      onChange={allCheckHandler}
                    />
                    CARGLE 약관에 전체 동의합니다.
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} padding={`10px 0px`}>
                <Text>CARGLE 서비스 이용약관(필수)</Text>
              </Wrapper>
              <Wrapper
                height={`200px`}
                width={`500px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
                shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              >
                <Text textAlign={`flex-start`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                  modi in exercitationem explicabo, at rem officia autem non
                  porro soluta dolorum officiis ipsa repellat, laudantium ea
                  unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eveniet eius totam quam pariatur
                  ratione, in voluptatem dignissimos laboriosam sint aut!
                  Repudiandae consectetur odit quo corrupti quidem perferendis
                  aut dolores quis?Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat nam optio dolore recusandae fuga
                  voluptatibus. Ea quam deserunt consectetur quo aut eligendi,
                  molestiae incidunt molestias ullam? Repellendus ratione
                  repellat
                </Text>
              </Wrapper>
              <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <Checkbox>
                    동의합니다.
                    <CheckInput
                      type="checkbox"
                      checked={formCheck.mkTerm}
                      {...register("mkTerm", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch({
                            type: actionTypesUser.FORM_CHECK,
                            payload: {
                              ...props.formCheck,
                              mkTerm: e.target.checked,
                            },
                          });
                        },
                        required: true,
                      })}
                    />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <Wrapper width={`auto`}>
                  {errors.mkTerm && (
                    <Text width={`100%`} textAlign={`right`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper al={`flex-start`} padding={`10px 0px`}>
                <Text>개인정보 수집 및 이용약관(필수)</Text>
              </Wrapper>
              <Wrapper
                height={`200px`}
                width={`500px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
                shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              >
                <Text textAlign={`flex-start`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                  modi in exercitationem explicabo, at rem officia autem non
                  porro soluta dolorum officiis ipsa repellat, laudantium ea
                  unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eveniet eius totam quam pariatur
                  ratione, in voluptatem dignissimos laboriosam sint aut!
                  Repudiandae consectetur odit quo corrupti quidem perferendis
                  aut dolores quis?Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat nam optio dolore recusandae fuga
                  voluptatibus. Ea quam deserunt consectetur quo aut eligendi,
                  molestiae incidunt molestias ullam? Repellendus ratione
                  repellat
                </Text>
              </Wrapper>
              <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                <Wrapper dr={`row`} width={`auto`}>
                  <Checkbox>
                    동의합니다.
                    <CheckInput
                      type="checkbox"
                      checked={formCheck.privacyTerm}
                      {...register("privacyTerm", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch({
                            type: actionTypesUser.FORM_CHECK,
                            payload: {
                              ...props.formCheck,
                              privacyTerm: e.target.checked,
                            },
                          });
                        },
                        required: true,
                      })}
                    />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
                <Wrapper width={`auto`}>
                  {errors.privacyTerm && (
                    <Text width={`auto`} al={`flex-start`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper al={`flex-start`} padding={`10px 0px`}>
                <Text>마케팅 정보 수신 동의(선택)</Text>
              </Wrapper>
              <Wrapper
                height={`200px`}
                width={`500px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
                shadow={`0px 10px 15px rgba(220, 220, 220, 1)`}
              >
                <Text textAlign={`flex-start`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                  modi in exercitationem explicabo, at rem officia autem non
                  porro soluta dolorum officiis ipsa repellat, laudantium ea
                  unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eveniet eius totam quam pariatur
                  ratione, in voluptatem dignissimos laboriosam sint aut!
                  Repudiandae consectetur odit quo corrupti quidem perferendis
                  aut dolores quis?Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat nam optio dolore recusandae fuga
                  voluptatibus. Ea quam deserunt consectetur quo aut eligendi,
                  molestiae incidunt molestias ullam? Repellendus ratione
                  repellat
                </Text>
              </Wrapper>
              <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                <Checkbox>
                  동의합니다.
                  <CheckInput
                    type="checkbox"
                    checked={formCheck.marketTerm}
                    {...register("marketTerm", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                          type: actionTypesUser.FORM_CHECK,
                          payload: {
                            ...props.formCheck,
                            marketTerm: e.target.checked,
                          },
                        });
                      },
                    })}
                  />
                  <CheckMark></CheckMark>
                </Checkbox>
              </Wrapper>
            </Wrapper>
            <CommonButtonWrapper kindOf={`column`}>
              <CommonButton
                onClick={(_e: React.MouseEvent<HTMLButtonElement>) => {
                  props.setStepNumber(props.stepNumber - 1);
                  window.scrollTo(0, 0);
                }}
                kindOf={`white`}
                margin={`0px 0px 10px 0px`}
              >
                이전
              </CommonButton>
              <CommonButton type="submit" margin={`10px 0px 0px 0px`}>
                다음
              </CommonButton>
            </CommonButtonWrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Term;
