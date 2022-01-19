import { NextPage } from "next";
import { useDispatch } from "react-redux";
import {
  CommonButton,
  CommonButtonWrapper,
  Text,
  Combo,
  TextInput2,
  WholeWrapper,
  Wrapper,
  CommonSmallTitle,
  SmallButton,
  IconButton,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  PartClass,
  partClassList,
  TsClass,
  TsClassList,
  TsItem,
  tsItemListB,
  tsItemListD,
  tsItemListE,
  tsItemListH,
  tsItemListS,
} from "../../../../constants/part.const";
import {
  _aGetAdminPartGenCode,
  _aPostAdminPart,
} from "../../../../../store/action/user.action";
import { BsPlus } from "react-icons/bs";
// import Part from "../../../../models/part.entity"
import { Part } from "../../../../models/part.entity";

const PartsInfo_Modal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  const [partClass, setPartClass] = useState<PartClass[]>(partClassList);
  const [tsClass, setTsClass] = useState<TsClass[]>(TsClassList);
  const [tsItem, setTsItem] = useState<TsItem[]>(tsItemListB);

  const [partNickName, setPartNickName] = useState<string>("");
  const [partInfo, setPartInfo] = useState<Partial<Part>>({
    label: props.clickDoc.label,
    name: props.clickDoc.name,
    nickName: props.clickDoc.nickName,
    code: props.clickDoc.code,
    tsCode: props.clickDoc.tsCode,
  });

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onSaveFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(_aPostAdminPart(partInfo)).then((res: any) => {
      alert("정상적으로 등록 되었습니다.");
      props.setModalOpen(false);
    });
  };
  const onInputNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartNickName(e.target.value);
  };

  const onInputPlusHandler = () => {
    const newArr: string[] = [...partInfo.nickName];
    newArr.push(partNickName);
    setPartInfo({ ...partInfo, nickName: newArr });
  };
  const onInputDelHandler = (item: string) => {
    const newArr: string[] = partInfo.nickName.filter((exItem: string) => {
      return exItem !== item;
    });
    setPartInfo({ ...partInfo, nickName: newArr });
  };
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartInfo({ ...partInfo, name: e.target.value });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>부품등록</CommonSmallTitle>
      <form id="savePartForm" onSubmit={onSaveFormHandler}>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>분류</Text>
          <Combo
            width={`400px`}
            margin={`0px`}
            value={partInfo.label}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log("target", e.target.value);
              setPartInfo({ ...partInfo, label: e.target.value });
              dispatch(_aGetAdminPartGenCode(e.target.value)).then(
                (res: any) => {
                  setPartInfo({ ...partInfo, code: res.payload });
                }
              );
              console.log("~", partInfo.label);
            }}
          >
            {partClass.map((item: PartClass) => (
              <option value={item.label}>{item.description}</option>
            ))}
          </Combo>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품명</Text>
          <TextInput2
            placeholder="부품명입니다~"
            width={`400px`}
            value={partInfo.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputHandler(e);
            }}
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품코드</Text>
          <TextInput2
            placeholder="부품코드"
            width={`400px`}
            readOnly
            value={partInfo.code}
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>국토부</Text>
          <Wrapper dr={`row`} ju={`space-between`} width={`400px`}>
            <Combo
              width={`145px`}
              margin={`0px`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPartInfo({ ...partInfo, tsCode: e.target.value });
                switch (e.target.value) {
                  case "B":
                    return setTsItem(tsItemListB);
                  case "D":
                    return setTsItem(tsItemListD);
                  case "E":
                    return setTsItem(tsItemListE);
                  case "H":
                    return setTsItem(tsItemListH);
                  case "S":
                    return setTsItem(tsItemListS);
                }
              }}
            >
              {tsClass.map((item: TsClass) => (
                <option value={`${item.label}`}>{item.description}</option>
              ))}
            </Combo>
            <Combo width={`245px`} margin={`0px`}>
              {tsItem.map((item: TsItem) => (
                <option>{item.name}</option>
              ))}
            </Combo>
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 20px 0px`}>
          <Text>동의어 설정</Text>
          <Wrapper dr={`row`} ju={`space-between`} width={`400px`}>
            <TextInput2
              placeholder="동의어입니다 4"
              width={`350px`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputNickNameHandler(e);
              }}
            />
            <IconButton
              type="button"
              kindOf={`hover`}
              shadow={`none`}
              radius={`4px`}
              width={`40px`}
              height={`40px`}
              al={`center`}
              fontSize={`24px`}
              onClick={onInputPlusHandler}
            >
              <BsPlus />
            </IconButton>
          </Wrapper>
        </Wrapper>
        <Wrapper
          width={`400px`}
          ju={`flex-start`}
          bgColor={`#fff`}
          overflow={`auto`}
          radius={`5px 5px 0px 0px`}
          border={`1px solid #c4c4c4`}
        >
          <Wrapper
            bgColor={`#343a40`}
            color={`#fff`}
            height={`45px`}
            radius={`5px 5px 0px 0px`}
          >
            <Text>부품분류</Text>
          </Wrapper>

          {/* default */}
          <Wrapper
            padding={`10px`}
            height={`150px`}
            overflow={`auto`}
            ju={`flex-start`}
          >
            {partInfo.nickName.map((item: string, idx: number) => (
              <Wrapper
                key={idx}
                height={`30px`}
                bgColor={`#fff`}
                border={`1px solid #c4c4c4`}
                dr={`row`}
                radius={`5px`}
                padding={`0px 20px`}
                margin={`0px 0px 5px`}
              >
                <Wrapper al={`flex-start`}>
                  <Text>{item}</Text>
                </Wrapper>
                <Wrapper width={`22px`} fontSize={`22px`}>
                  <IconButton
                    type="button"
                    bgColor={`inherit`}
                    shadow={`none`}
                    width={`30px`}
                    height={`30px`}
                    onClick={() => {
                      onInputDelHandler(item);
                    }}
                  >
                    <IoIosCloseCircle />
                  </IconButton>
                </Wrapper>
              </Wrapper>
            ))}
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton
            type={"button"}
            kindOf={`circleWhite`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            닫 기
          </CommonButton>
          <CommonButton
            type={"submit"}
            kindOf={`circleTheme`}
            form="savePartForm"
          >
            저 장
          </CommonButton>
        </CommonButtonWrapper>
      </form>
    </WholeWrapper>
  );
};

export default PartsInfo_Modal;
