import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _pTermProps } from "../../../../configure/_pProps.entity";

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
        <Wrapper>
          <form onSubmit={props.handleSubmit(props.agreeTermHandler)}>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`18px`}
                fontWeight={`700`}
                padding={`10px 0px 10px 0px`}
              >
                CARGLE 서비스 이용 약관(필수)
              </Text>
              <Wrapper
                width={
                  width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                }
                height={`150px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
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
                  <Text>동의합니다.</Text>
                  <input
                    type="checkbox"
                    checked={props.formCheck.mkTerm}
                    {...props.register("mkTerm", {
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
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`18px`}
                fontWeight={`700`}
                padding={`10px 0px 10px 0px`}
              >
                개인정보 수집 및 이용 약관(필수)
              </Text>
              <Wrapper
                width={
                  width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                }
                height={`150px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
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
                <Wrapper dr={`row`} width={`auto`}>
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
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`18px`}
                fontWeight={`700`}
                padding={`10px 0px 10px 0px`}
              >
                마케팅 정보 수신 동의(선택)
              </Text>
              <Wrapper
                width={
                  width < 1439 ? (width < 500 ? `300px` : `1000px`) : `1200px`
                }
                height={`150px`}
                border={`1px solid #ccc`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`10px`}
                radius={`5px`}
                overflow={`auto`}
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
              </Wrapper>
            </Wrapper>
            <Wrapper
              textAlign={`center`}
              dr={`row`}
              ju={`space-around`}
              padding={`50px 0px 100px 0px`}
            >
              <CommonButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  props.setStepNumber(props.stepNumber - 1);
                }}
                width={
                  width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                }
                kindOf={`white`}
              >
                이전
              </CommonButton>
              <CommonButton
                type="submit"
                width={
                  width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                }
              >
                다음
              </CommonButton>
            </Wrapper>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default TermPresenter;
