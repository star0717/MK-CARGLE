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
} from "../../../../constants/model.const";
import { _aGetAdminPartGenCode } from "../../../../../store/action/user.action";

const PartsModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  const [partClass, setPartClass] = useState<PartClass[]>(partClassList);
  const [partCode, setPartCode] = useState<String>("");
  const [tsClass, setTsClass] = useState<TsClass[]>(TsClassList);
  const [tsItem, setTsItem] = useState<TsItem[]>(tsItemListB);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onSaveFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("저장~");
    alert("정상적으로 등록 되었습니다.");
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
      <form onSubmit={onSaveFormHandler}>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>분류</Text>
          <Combo
            width={`400px`}
            margin={`0px`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(_aGetAdminPartGenCode(`${e.target.value}`)).then(
                (res: any) => {
                  setPartCode(res.payload);
                }
              );
            }}
          >
            {partClass.map((item: PartClass) => (
              <option value={item.label}>{item.description}</option>
            ))}
          </Combo>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품명</Text>
          <TextInput2 placeholder="부품명입니다~" width={`400px`}></TextInput2>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품코드</Text>
          <TextInput2 placeholder="부품코드" width={`400px`} value={partCode} />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>국토부</Text>
          <Wrapper dr={`row`} ju={`space-between`} width={`400px`}>
            <Combo
              width={`145px`}
              margin={`0px`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                switch (e.target.value) {
                  case "tsItemListB":
                    return setTsItem(tsItemListB);
                  case "tsItemListD":
                    return setTsItem(tsItemListD);
                  case "tsItemListE":
                    return setTsItem(tsItemListE);
                  case "tsItemListH":
                    return setTsItem(tsItemListH);
                  case "tsItemListS":
                    return setTsItem(tsItemListS);
                }
              }}
            >
              {tsClass.map((item: TsClass) => (
                <option value={`tsItemList${item.label}`}>
                  {item.description}
                </option>
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
          <TextInput2 placeholder="동의어입니다 4" width={`400px`}></TextInput2>
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
            <Wrapper
              height={`30px`}
              bgColor={`#fff`}
              border={`1px solid #c4c4c4`}
              dr={`row`}
              radius={`5px`}
              padding={`0px 20px`}
              margin={`0px 0px 5px`}
            >
              <Wrapper al={`flex-start`}>
                <Text>동의어 입니다. (01)</Text>
              </Wrapper>
              <Wrapper width={`22px`} fontSize={`22px`}>
                <IoIosCloseCircle />
              </Wrapper>
            </Wrapper>

            {/* focus */}
            <Wrapper
              height={`30px`}
              bgColor={`#eee`}
              border={`1px solid #c4c4c4`}
              dr={`row`}
              radius={`5px`}
              padding={`0px 20px`}
              margin={`0px 0px 5px`}
            >
              <Wrapper al={`flex-start`}>
                <Text>동의어 입니다. (02)</Text>
              </Wrapper>
              <Wrapper width={`22px`} fontSize={`22px`}>
                <IoIosCloseCircle />
              </Wrapper>
            </Wrapper>
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
          <CommonButton type={"submit"} kindOf={`circleTheme`}>
            저 장
          </CommonButton>
        </CommonButtonWrapper>
      </form>
    </WholeWrapper>
  );
};

export default PartsModal;
