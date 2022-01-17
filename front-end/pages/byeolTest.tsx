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
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRowLIST,
  CheckboxContainer,
  CheckBoxLine,
  HiddenCheckbox,
  CheckBoxIcon,
} from "../src/components/styles/CommonComponents";
import { AiFillCheckSquare } from "react-icons/ai";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  interface CheckboxProps {
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string | null;
  }

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
      {/* <CheckboxContainer>
        <CheckBoxLine checked={toggle}>
          <HiddenCheckbox type="checkbox" onChange={!toggle} checked={toggle} />
          <AiFillCheckSquare width="14px" height="14px" />
        </CheckBoxLine>
        {label ? <Label1>{label}</Label1> : null}
      </CheckboxContainer> */}
      <CheckboxContainer>
        <CheckBoxLine
          kindOf={`${toggle}`}
          onClick={() => {
            console.log(toggle);
          }}
        >
          <HiddenCheckbox
            kindOf={`${toggle}`}
            onChange={() => {
              setToggle(!toggle);
            }}
            type="checkbox"
          />
          <CheckBoxIcon fontSize={`16px`} color={`#fff`}>
            <BsCheckLg />
          </CheckBoxIcon>
        </CheckBoxLine>
      </CheckboxContainer>

      {/* <CheckBox
        kindOf={`${toggle}`}
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <BsCheckLg />
      </CheckBox> */}

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
      <TableWrapper width={`1200px`}>
        <TableHead>
          <TableHeadLIST width={`25%`}>가나다라</TableHeadLIST>
          <TableHeadLIST width={`25%`}>마바</TableHeadLIST>
          <TableHeadLIST width={`25%`}>사아자</TableHeadLIST>
          <TableHeadLIST width={`25%`}>차카타파하</TableHeadLIST>
        </TableHead>
        <TableBody>
          <TableRowLIST width={`25%`}>차카타파하</TableRowLIST>
          <TableRowLIST width={`25%`}>사아자</TableRowLIST>
          <TableRowLIST width={`25%`}>마바</TableRowLIST>
          <TableRowLIST width={`25%`}>가나다라</TableRowLIST>
        </TableBody>
      </TableWrapper>
      <Wrapper
        width={`60px`}
        height={`30px`}
        radius={`30px`}
        bgColor={`#ccc`}
        al={`flex-start`}
      >
        <Wrapper
          width={`24px`}
          height={`24px`}
          bgColor={`#000`}
          radius={`24px`}
          padding={`2px`}
        ></Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default ByeolTest;
