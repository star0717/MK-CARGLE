import Modal from "react-modal";
import React, { useState } from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";

interface modalOption {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}

const ChangePassModal: NextPage<modalOption> = (props) => {
  const dispatch = useDispatch();

  const setModalOpen = props.setModalOpen;

  return (
    <WholeWrapper>
      <Wrapper>
        <Wrapper>
          <Text>비밀번호 변경</Text>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>현재 비밀번호</Text>
          <TextInput type="password" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>새로운 비밀번호</Text>
          <TextInput type="password" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>새로운 비밀번호 확인</Text>
          <TextInput type="password" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <button type="button">확인</button>
          <button type="button">취소</button>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ChangePassModal;
