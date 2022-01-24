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
      <RsWrapper>윤별이 쓰는 실험실</RsWrapper>
    </WholeWrapper>
  );
};

export default ByeolTest;
