import React, { useState } from "react";
import { NextPage } from "next";
import { BsCheckLg } from "react-icons/bs";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
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
  CheckBox,
  Switch,
} from "../src/components/styles/CommonComponents";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Wrapper width={`100%`} padding={`100px 0px 0px`}>
      {/* {check === true ? (
        <CheckBox
          kindOf={`Checked`}
          onClick={() => {
            setCheck(!check);
          }}
        >
          <BsCheckLg />
        </CheckBox>
      ) : (
        <CheckBox
          kindOf={`unChecked`}
          onClick={() => {
            setCheck(!check);
          }}
        >
          <BsCheckLg />
        </CheckBox>
      )} */}

      <CheckBox
        kindOf={`${toggle}`}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <BsCheckLg />
      </CheckBox>

      {/* {toggle === true ? (
        <Switch
          kindOf={`on`}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <MdToggleOff />
        </Switch>
      ) : (
        <Switch
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <MdToggleOn />
        </Switch>
      )} */}

      {/* <Switch>
        <MdToggleOff />
      </Switch>
      <Switch kindOf={`on`}>
        <MdToggleOff />
      </Switch> */}
    </Wrapper>
  );
};

export default ByeolTest;
