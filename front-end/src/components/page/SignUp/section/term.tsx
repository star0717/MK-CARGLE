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
  CheckInput,
  Checkbox,
  CheckMark,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  JoinStepBarWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";

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
  const agreeTermHandler: SubmitHandler<Partial<_fTermData>> = (_data) => {
    props.setStepNumber(props.stepNumber + 1);
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
              {props.stepNumber > 4 ? <GoCheck /> : <MdOutlineBusinessCenter />}
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
        <Wrapper>
          <form onSubmit={handleSubmit(agreeTermHandler)}>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper ju={`space-between`} dr={`row`} padding={`10px 0px`}>
                <Wrapper width={`auto`}></Wrapper>
                <Wrapper dr={`row`} width={`auto`}>
                  <Checkbox>
                    전체동의
                    <CheckInput
                      type="checkbox"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                          type: actionTypesUser.FORM_CHECK,
                          payload: {
                            ...props.formCheck,
                            mkTerm: e.target.checked,
                            privacyTerm: e.target.checked,
                            marketTerm: e.target.checked,
                          },
                        });
                      }}
                    />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </Wrapper>
              </Wrapper>
              <Wrapper>
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
                <Wrapper width={`auto`}>
                  {errors.mkTerm && (
                    <Text width={`100%`} textAlign={`right`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
                <Wrapper dr={`row`} width={`auto`}>
                  <Checkbox>
                    동의합니다.
                    <CheckInput
                      type="checkbox"
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
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper>
                <CommonSmallTitle>
                  개인정보 수집 및 이용약관(필수)
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
                <Wrapper width={`auto`}>
                  {errors.privacyTerm && (
                    <Text width={`auto`} al={`flex-start`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
                <Wrapper dr={`row`} width={`auto`}>
                  <Checkbox>
                    동의합니다.
                    <CheckInput
                      type="checkbox"
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
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} width={`500px`} padding={`0px 0px 30px`}>
              <Wrapper>
                <CommonSmallTitle>마케팅 정보 수신 동의(선택)</CommonSmallTitle>
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
              <Wrapper ju={`flex-end`} dr={`row`} padding={`10px 0px`}>
                <Checkbox>
                  동의합니다.
                  <CheckInput
                    type="checkbox"
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
