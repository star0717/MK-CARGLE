import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  RsWrapper,
  CommonSmallTitle,
  CommonButtonWrapper,
  Label,
} from "../../../styles/CommonComponents";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _pTermProps } from "../../../../configure/_pProps.entity";
import { Checkbox, FormControlLabel } from "@material-ui/core";
/**
 * 회원가입: 이용약관 컴포넌트(화면)
 * @param props
 * @returns
 */
const TermPresenter: NextPage<_pTermProps> = (props) => {
  const dispatch = useDispatch();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper width={`1070px`}>
          <form onSubmit={props.handleSubmit(props.agreeTermHandler)}>
            <Wrapper al={`flex-start`}>
              <Wrapper>
                <CommonSmallTitle>
                  CARGLE 서비스 이용약관(필수)
                </CommonSmallTitle>
              </Wrapper>
              <Wrapper
                // width={
                //   width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                // }
                height={`150px`}
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
                  {props.errors.mkTerm && (
                    <Text width={`100%`} textAlign={`right`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
                <Wrapper dr={`row`} width={`auto`}>
                  <Label width={`auto`} ju={`flex-end`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.formCheck.mkTerm}
                          {...props.register("mkTerm", {
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
                        />
                      }
                      labelPlacement="start"
                      label="이용약관에 동의합니다."
                    />
                  </Label>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Wrapper>
                <CommonSmallTitle>
                  개인정보 수집 및 이용약관(필수)
                </CommonSmallTitle>
              </Wrapper>
              <Wrapper
                // width={
                //   width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                // }
                height={`150px`}
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
                  {props.errors.privacyTerm && (
                    <Text width={`auto`} al={`flex-start`} color={`#d6263b`}>
                      필수사항입니다.
                    </Text>
                  )}
                </Wrapper>
                {/* <Wrapper dr={`row`} width={`auto`}>
                  <Text>동의합니다.</Text>
                  <input
                    type="checkbox"
                    checked={props.formCheck.privacyTerm}
                    {...props.register("privacyTerm", {
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
                </Wrapper> */}
                <Label width={`auto`} ju={`flex-end`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.formCheck.privacyTerm}
                        {...props.register("privacyTerm", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
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
                    }
                    labelPlacement="start"
                    label="이용약관에 동의합니다."
                  />
                </Label>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Wrapper>
                <CommonSmallTitle>마케팅 정보 수신 동의(선택)</CommonSmallTitle>
              </Wrapper>
              <Wrapper
                height={`150px`}
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
              {/* <Wrapper ju={`flex-end`} dr={`row`} padding={`10px 0px`}>
                <Text>동의합니다.</Text>
                <input
                  type="checkbox"
                  checked={props.formCheck.marketTerm}
                  {...props.register("marketTerm", {
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
              </Wrapper> */}
              <Wrapper ju={`flex-end`} dr={`row`} padding={`10px 0px`}>
                <Label width={`auto`} ju={`flex-end`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.formCheck.marketTerm}
                        {...props.register("marketTerm", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
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
                    }
                    labelPlacement="start"
                    label="마케팅 정보 수신에 동의합니다."
                  />
                </Label>
              </Wrapper>
            </Wrapper>
            <CommonButtonWrapper textAlign={`center`}>
              <CommonButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  props.setStepNumber(props.stepNumber - 1);
                }}
                // width={
                //   width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                // }
                kindOf={`white`}
              >
                이전
              </CommonButton>
              <CommonButton
                type="submit"
                // width={
                //   width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                // }
              >
                다음
              </CommonButton>
            </CommonButtonWrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default TermPresenter;
