import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Part } from "../../../../models/part.entity";
import { _pAdminManParts } from "../../../../configure/_pProps.entity";

const PartsModal: NextPage<_pAdminManParts> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  const [partClass, setPartClass] = useState<PartClass[]>(partClassList);
  const [tsClass, setTsClass] = useState<TsClass[]>(TsClassList);
  const [tsItemList, setTsItemList] = useState<TsItem[]>([]);
  const [partNickName, setPartNickName] = useState<string>("");
  const [partInfo, setPartInfo] = useState<Partial<Part>>({
    label: "",
    name: "",
    nickName: [],
    code: "",
    tsCode: "",
  });

  //partInfo.tsCode (B10)에서 B는 tsItem 으로 , 10은 tsIndex로...
  const [tsItem, setTsItem] = useState<string>(partInfo.tsCode.substring(0, 1));
  const [tsIndex, setTsIndex] = useState<string>(partInfo.tsCode.substring(1));

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onSaveFormHandler: SubmitHandler<Partial<Part>> = (data) => {
    const plusPartInfo = {
      label: partInfo.label,
      name: partInfo.name,
      nickName: partInfo.nickName,
      code: partInfo.code,
      tsCode: `${tsItem}${tsIndex}`,
    };

    dispatch(_aPostAdminPart(plusPartInfo)).then((res: any) => {
      alert("정상적으로 등록 되었습니다.");
      props.setModalOpen(false);
    });
  };
  const onInputNickNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartNickName(e.target.value);
  };
  //nickName 추가
  const onInputPlusHandler = () => {
    if (partNickName === "") {
      return;
    }
    const newArr: string[] = [...partInfo.nickName];
    newArr.push(partNickName);
    setPartInfo({ ...partInfo, nickName: newArr });
    setPartNickName("");
  };
  //nickName 삭제
  const onInputDelHandler = (item: string) => {
    const newArr: string[] = partInfo.nickName.filter((exItem: string) => {
      return exItem !== item;
    });
    setPartInfo({ ...partInfo, nickName: newArr });
  };
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartInfo({
      ...partInfo,
      name: e.target.value.replace(" ", ""),
    });
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
      <form id="savePartForm" onSubmit={handleSubmit(onSaveFormHandler)}>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>분류</Text>
          <Combo
            width={`400px`}
            margin={`0px`}
            {...register("label", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value === "") {
                  return setPartInfo({ ...partInfo, code: "" });
                }
                let label: string = e.target.value;
                dispatch(_aGetAdminPartGenCode(e.target.value)).then(
                  (res: any) => {
                    setPartInfo({
                      ...partInfo,
                      label: label,
                      code: res.payload,
                    });
                  }
                );
              },
              required: {
                value: true,
                message: "필수 입력사항입니다.",
              },
            })}
          >
            <option value="">선택</option>
            {partClass.map((item: PartClass) => (
              <option key={item.label} value={item.label}>
                {item.description}
              </option>
            ))}
          </Combo>
          {errors.label?.type === "required" && (
            <Text
              margin={`0px 0px 10px 0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.label.message}
            </Text>
          )}
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품명</Text>
          <TextInput2
            placeholder="부품명을 입력해주세요."
            width={`400px`}
            value={partInfo.name}
            {...register("name", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onInputHandler(e);
              },
              required: {
                value: true,
                message: "필수 입력사항입니다.",
              },
            })}
          />
          {errors.name?.type === "required" && (
            <Text
              margin={`0px 0px 10px 0px`}
              width={`100%`}
              color={`#d6263b`}
              al={`flex-start`}
              fontSize={`14px`}
              textAlign={`left`}
            >
              {errors.name.message}
            </Text>
          )}
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>부품코드</Text>
          <TextInput2
            placeholder="부품코드"
            width={`400px`}
            value={partInfo.code}
            readOnly
          />
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
          <Text>국토부</Text>
          <Wrapper dr={`row`} ju={`space-between`} width={`400px`}>
            <Combo
              width={`145px`}
              margin={`0px`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTsItem(e.target.value);
                switch (e.target.value) {
                  case "B":
                    return setTsItemList(tsItemListB);
                  case "D":
                    return setTsItemList(tsItemListD);
                  case "E":
                    return setTsItemList(tsItemListE);
                  case "H":
                    return setTsItemList(tsItemListH);
                  case "S":
                    return setTsItemList(tsItemListS);
                  default:
                    return setTsItemList([]);
                }
              }}
            >
              <option value="">선택</option>
              {tsClass.map((item: TsClass) => (
                <option key={item.label} value={item.label}>
                  {item.description}
                </option>
              ))}
            </Combo>
            <Combo
              width={`245px`}
              margin={`0px`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTsIndex(`${e.target.value}`);
              }}
            >
              <option value="">선택</option>
              {tsItemList.map((item: TsItem) => (
                <option key={item.index} value={item.index}>
                  {item.name}
                </option>
              ))}
            </Combo>
          </Wrapper>
        </Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 20px 0px`}>
          <Text>동의어 설정</Text>
          <Wrapper dr={`row`} ju={`space-between`} width={`400px`}>
            <TextInput2
              placeholder="동의어 추가"
              width={`350px`}
              value={partNickName}
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

export default PartsModal;
