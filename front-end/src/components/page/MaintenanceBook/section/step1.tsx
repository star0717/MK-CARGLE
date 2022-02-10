import React from "react";
import { NextPage } from "next";
import {
  ColorSpan,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  JoinStepBar,
  JoinStepBarWrapper,
  RsWrapper,
  SmallButton,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { StepQuery, UseLink } from "src/configure/router.entity";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";

const SelectCar: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          {/* <CommonTitle>
            차량선택 후 정비진행 버튼 클릭 시 정비가 진행됩니다.
          </CommonTitle> */}
          <CommonSubTitle>
            <ColorSpan color={`#314FA5`}>차량선택</ColorSpan> 후 정비진행 버튼
            클릭 시 정비가 진행됩니다.
          </CommonSubTitle>
          <JoinStepBarWrapper>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={props.stepNumber === 2 ? `progress` : `complete`}
              >
                {props.stepNumber === 2 ? <AiOutlineFileText /> : <GoCheck />}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                차량선택
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 2 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={
                  props.stepNumber < 3
                    ? `before`
                    : props.stepNumber === 3
                    ? `progress`
                    : `before`
                }
              >
                {props.stepNumber > 3 ? <GoCheck /> : <AiOutlineUser />}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비중
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 3 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={
                  props.stepNumber < 4
                    ? `before`
                    : props.stepNumber === 4
                    ? `progress`
                    : `before`
                }
              >
                {props.stepNumber > 4 ? (
                  <GoCheck />
                ) : (
                  <MdOutlineBusinessCenter />
                )}
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                정비완료
              </Text>
            </Wrapper>
            <JoinStepBar
              kindOf={props.stepNumber > 4 ? `line` : `line2`}
            ></JoinStepBar>
            <Wrapper width={`auto`}>
              <JoinStepBar
                kindOf={props.stepNumber === 5 ? `progress` : `before`}
              >
                <MdOutlineUploadFile />
              </JoinStepBar>
              <Text height={`0px`} padding={`10px 0px 0px`}>
                출고완료
              </Text>
            </Wrapper>
          </JoinStepBarWrapper>
        </CommonTitleWrapper>

        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={() => {
            router.push(`${UseLink.MAINTENANCE_BOOK}/${StepQuery.SECOND}`);
          }}
        >
          정비진행
        </SmallButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SelectCar;
