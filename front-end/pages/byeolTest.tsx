import React, { useState } from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonButton,
  Switch,
  SwitchInput,
  SwitchSlider,
  Wrapper,
  Image,
  Text,
  RsWrapper,
  WholeWrapper,
} from "../src/components/styles/CommonComponents";
import styled from "styled-components";
import router from "next/router";
import { UseLink } from "../src/configure/router.entity";
import { BsEmojiDizzyFill } from "react-icons/bs";
import { AiFillHome, AiOutlineArrowLeft } from "react-icons/ai";

/**
 * 테스트 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  // const Switch = styled.label<any>`
  //   position: relative;
  //   display: inline-block;
  //   width: 60px;
  //   height: 34px;
  // `;

  // const SwitchSlider = styled.span<any>`
  //   position: absolute;
  //   cursor: pointer;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: #ccc;
  //   -webkit-transition: 0.4s;
  //   transition: 0.4s;
  //   border-radius: 34px;

  //   &:before {
  //     position: absolute;
  //     content: "";
  //     height: 26px;
  //     width: 26px;
  //     left: 4px;
  //     bottom: 4px;
  //     background-color: white;
  //     -webkit-transition: 0.4s;
  //     transition: 0.4s;
  //     border-radius: 50%;
  //   }
  // `;

  // const SwitchInput = styled.input<any>`
  //   opacity: 0;
  //   width: 0;
  //   height: 0;

  //   &:checked + ${SwitchSlider} {
  //     background-color: #2196f3;
  //   }

  //   &:focus + ${SwitchSlider} {
  //     box-shadow: 0 0 1px #2196f3;
  //   }

  //   &:checked + ${SwitchSlider}:before {
  //     -webkit-transform: translateX(26px);
  //     -ms-transform: translateX(26px);
  //     transform: translateX(26px);
  //   }
  // `;

  // //---------------------------------------//
  // const CheckMark = styled.span<any>`
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   height: 25px;
  //   width: 25px;
  //   background-color: #eee;
  //   transition: 0.2s;

  //   &:after {
  //     content: "";
  //     position: absolute;
  //     display: none;
  //     left: 9px;
  //     top: 5px;
  //     width: 5px;
  //     height: 10px;
  //     border: solid white;
  //     border-width: 0 3px 3px 0;
  //     -webkit-transform: rotate(45deg);
  //     -ms-transform: rotate(45deg);
  //     transform: rotate(45deg);
  //   }
  // `;

  // const CheckInput = styled.input<any>`
  //   position: absolute;
  //   opacity: 0;
  //   cursor: pointer;
  //   height: 0;
  //   width: 0;
  // `;

  // const Checkbox = styled.label<any>`
  //   display: block;
  //   position: relative;
  //   padding-left: 35px;
  //   margin-bottom: 12px;
  //   cursor: pointer;
  //   font-size: 22px;
  //   -webkit-user-select: none;
  //   -moz-user-select: none;
  //   -ms-user-select: none;
  //   user-select: none;

  //   &:hover ${CheckInput} ~ ${CheckMark} {
  //     background-color: #ccc;
  //   }

  //   ${CheckInput}:checked ~ ${CheckMark} {
  //     background-color: #2196f3;
  //   }

  //   ${CheckInput}:checked ~ ${CheckMark}:after {
  //     display: block;
  //   }
  // `;

  /* Style the checkmark/indicator */

  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper padding={`50px 0px 0px`} dr={`row`} ju={`space-between`}>
          <Wrapper width={`auto`}>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`72px`}
                fontWeight={`800`}
                color={`#c4c4c4`}
                padding={`0px`}
              >
                <BsEmojiDizzyFill />
              </Text>
              <Text
                fontSize={`48px`}
                fontWeight={`800`}
                color={`#c4c4c4`}
                padding={`0px 0px 10px`}
                textAlign={`start`}
                margin={`-30px 0px 0px`}
              >
                404 ERROR!
              </Text>
              <Text
                fontSize={`24px`}
                fontWeight={`400`}
                color={`#314FA5`}
                padding={`50px 0px 10px`}
                textAlign={`start`}
              >
                죄송합니다. <br />
                현재 찾을 수 없는 페이지를 요청 하셨습니다.
              </Text>
              <Text
                fontSize={`18px`}
                padding={`0px 0px 10px`}
                fontWeight={`300`}
                textAlign={`start`}
              >
                존재하지 않는 주소를 입력하셨거나,
                <br />
                요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.
                <br />
                입력하신 주소가 정확한지 다시 확인해주시기 바랍니다.
              </Text>
              <Text
                fontSize={`18px`}
                fontWeight={`300`}
                padding={`0px 0px 10px`}
                textAlign={`start`}
              >
                감사합니다.
              </Text>
              <Wrapper width={`auto`}>
                <Text
                  fontSize={`18px`}
                  fontWeight={`400`}
                  padding={`0px 0px 10px`}
                  textAlign={`start`}
                >
                  <AiOutlineArrowLeft />
                  &nbsp;이전페이지
                </Text>
              </Wrapper>
              <Wrapper width={`auto`}>
                <Text
                  fontSize={`18px`}
                  fontWeight={`400`}
                  padding={`0px 0px 10px`}
                  textAlign={`start`}
                >
                  <AiFillHome />
                  홈으로 돌아가기
                </Text>
              </Wrapper>
            </Wrapper>
            {/* <Wrapper padding={`50px 0px 0px`}>
              <CommonButton
                type="button"
                margin={`10px`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  router.back();
                }}
                kindOf={`white`}
              >
                이전페이지
              </CommonButton>
              <CommonButton
                type="button"
                margin={` 10px`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  router.push(UseLink.MAIN);
                }}
              >
                홈으로 돌아가기
              </CommonButton>
            </Wrapper>
          </Wrapper> */}
            {/* <Wrapper width={`500px`}>
            <Image src="/images/404.png" alt="404 에러" />
          </Wrapper> */}
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ByeolTest;
