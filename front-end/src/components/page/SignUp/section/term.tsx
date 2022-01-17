import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
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
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  Label,
  CheckBox,
  CheckboxContainer,
  HiddenCheckbox,
} from "../../../styles/CommonComponents";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import { BsCheckLg } from "react-icons/bs";

/**
 * 회원가입: 이용약관 컴포넌트(기능)
 * @param props
 * @returns
 */
const Term: NextPage<_pSignUpProps> = (props) => {
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  /**
   * 이용약관 form submit handler
   * @param _data
   */
  const agreeTermHandler: SubmitHandler<_fTermData> = (_data) => {
    props.setStepNumber(props.stepNumber + 1);
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();
  console.log(props.formCheck.mkTerm);
  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper>
            <form onSubmit={handleSubmit(agreeTermHandler)}>
              <Wrapper al={`flex-start`} width={`500px`}>
                <Wrapper padding={`0px 0px 30px`}>
                  <CommonSmallTitle>
                    CARGLE 서비스 이용약관(필수)
                  </CommonSmallTitle>
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Enim modi in exercitationem explicabo, at rem officia autem
                    non porro soluta dolorum officiis ipsa repellat, laudantium
                    ea unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Eveniet eius totam quam
                    pariatur ratione, in voluptatem dignissimos laboriosam sint
                    aut! Repudiandae consectetur odit quo corrupti quidem
                    perferendis aut dolores quis?Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Placeat nam optio dolore
                    recusandae fuga voluptatibus. Ea quam deserunt consectetur
                    quo aut eligendi, molestiae incidunt molestias ullam?
                    Repellendus ratione repellat
                  </Text>
                </Wrapper>
                <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                  <Wrapper width={`auto`}>
                    {errors.mkTerm && (
                      <Text
                        width={`100%`}
                        textAlign={`right`}
                        color={`#d6263b`}
                      >
                        필수사항입니다.
                      </Text>
                    )}
                  </Wrapper>
                  <Wrapper dr={`row`} width={`auto`}>
                    <Text>이용약관에 동의합니다.</Text>

                    {/* <CheckboxContainer>
                      <CheckBox1
                        bgColor={
                          props.formCheck.mkTerm === true ? `#fff` : `#fff`
                        }
                      >
                        <HiddenCheckbox
                          checked={props.formCheck.mkTerm}
                          {...register("mkTerm", {
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                          type="checkbox"
                        />
                        <Text fontSize={`24px`}>
                          <BsCheckLg />
                        </Text>
                      </CheckBox1>
                    </CheckboxContainer> */}

                    {/* <CheckBox
                      type="button"
                      kindOf={`${props.formCheck.mkTerm}`}
                      onClick={() => {
                        dispatch({
                          type: actionTypesUser.FORM_CHECK,
                          payload: {
                            ...props.formCheck,
                            mkTerm: !props.formCheck.mkTerm,
                          },
                        });
                      }}
                    >
                      <BsCheckLg />
                    </CheckBox> */}

                    {/* <input
                      // style={{ opacity: `0` }}
                      type="checkbox"
                      checked={props.formCheck.mkTerm}
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
                    /> */}
                    {/* <input
                      type="checkbox"
                      checked={props.formCheck.mkTerm}
                      {...(register("mkTerm"),
                      {
                        onChange: (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {},
                        required: true,
                      })}
                    /> */}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`500px`}
                padding={`0px 0px 30px`}
              >
                <Wrapper>
                  <CommonSmallTitle>
                    개인정보 수집 및 이용약관(필수)
                  </CommonSmallTitle>
                </Wrapper>
                <Wrapper
                  // width={
                  //   width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                  // }
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Enim modi in exercitationem explicabo, at rem officia autem
                    non porro soluta dolorum officiis ipsa repellat, laudantium
                    ea unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Eveniet eius totam quam
                    pariatur ratione, in voluptatem dignissimos laboriosam sint
                    aut! Repudiandae consectetur odit quo corrupti quidem
                    perferendis aut dolores quis?Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Placeat nam optio dolore
                    recusandae fuga voluptatibus. Ea quam deserunt consectetur
                    quo aut eligendi, molestiae incidunt molestias ullam?
                    Repellendus ratione repellat
                  </Text>
                </Wrapper>
                <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                  <Wrapper width={`auto`}>
                    {errors.privacyTerm && (
                      <Text width={`auto`} al={`flex-start`} color={`#d6263b`}>
                        필수사항입니다.
                      </Text>
                    )}
                  </Wrapper>
                  <Wrapper dr={`row`} width={`auto`}>
                    <Text>이용약관에 동의합니다.</Text>
                    <input
                      type="checkbox"
                      checked={props.formCheck.privacyTerm}
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
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`500px`}
                padding={`0px 0px 30px`}
              >
                <Wrapper>
                  <CommonSmallTitle>
                    마케팅 정보 수신 동의(선택)
                  </CommonSmallTitle>
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Enim modi in exercitationem explicabo, at rem officia autem
                    non porro soluta dolorum officiis ipsa repellat, laudantium
                    ea unde labore, temporibus quas?Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Eveniet eius totam quam
                    pariatur ratione, in voluptatem dignissimos laboriosam sint
                    aut! Repudiandae consectetur odit quo corrupti quidem
                    perferendis aut dolores quis?Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Placeat nam optio dolore
                    recusandae fuga voluptatibus. Ea quam deserunt consectetur
                    quo aut eligendi, molestiae incidunt molestias ullam?
                    Repellendus ratione repellat
                  </Text>
                </Wrapper>
                <Wrapper ju={`flex-end`} dr={`row`} padding={`10px 0px`}>
                  <Text>마케팅 정보 수신에 동의합니다.</Text>
                  <input
                    type="checkbox"
                    checked={props.formCheck.marketTerm}
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
                </Wrapper>
              </Wrapper>
              <CommonButtonWrapper kindOf={`column`}>
                <CommonButton
                  onClick={(_e: React.MouseEvent<HTMLButtonElement>) => {
                    props.setStepNumber(props.stepNumber - 1);
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
    </BodyWrapper>
  );
};

export default Term;
