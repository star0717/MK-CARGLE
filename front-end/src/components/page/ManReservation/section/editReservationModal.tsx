import {
  ColorSpan,
  Combo,
  Text,
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  SmallButton,
  TextArea,
  TextInput2,
  Wrapper,
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { NextPage } from "next";
import theme from "styles/theme";

const EditReservation: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

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
      <CommonSmallTitle>예약요청서</CommonSmallTitle>
      <form>
        <Wrapper>
          <Wrapper
            borderBottom={`1px solid #c4c4c4`}
            dr={`row`}
            ju={`space-between`}
            padding={`10px 0px`}
            margin={`0px 0px 10px`}
          >
            <Wrapper width={`auto`}>
              <Text color={theme.basicTheme_C} fontSize={`18px`}>
                예약정보
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} dr={`row`}>
              <Text>예약상태</Text>
              <Combo>
                <option>대기</option>
                <option>승인</option>
                <option>정비</option>
                <option>거절</option>
              </Combo>
            </Wrapper>
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              예약접수일자
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} name="" type="text" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              정비희망일자
            </Text>
            <Wrapper
              width={`400px`}
              al={`flex-start`}
              dr={`row`}
              ju={`space-between`}
            >
              <TextInput2 width={`300px`} type="text" readOnly name="" />
              <Combo width={`80px`}>
                <option>?</option>
              </Combo>
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>
              <ColorSpan color={`#d6263b`}>*</ColorSpan>
              고객전화번호
            </Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" readOnly name="" />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>차량번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <Wrapper dr={`row`} margin={`0px 0px 10px 0px`}>
                <TextInput2
                  width={`400px`}
                  // margin={`0px 0px 10px 0px`}
                  type="text"
                  name=""
                  readOnly
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>정비요청내용</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextArea
                padding={`10px`}
                width={`400px`}
                height={`150px`}
                al={`flex-start`}
                type="text"
                name=""
                readOnly
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            borderBottom={`1px solid #c4c4c4`}
            al={`flex-start`}
            padding={`10px 0px`}
            margin={`0px 0px 10px`}
          >
            <Text color={theme.basicTheme_C} fontSize={`18px`}>
              차량정보
            </Text>
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>차량명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>모델명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>연식</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>차대번호</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>등록일자</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>주행거리</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
            <Text>고객명</Text>
            <Wrapper width={`400px`} ju={`flex-start`}>
              <TextInput2 width={`400px`} type="text" name="" readOnly />
            </Wrapper>
          </Wrapper>
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton kindOf={`circleWhite`} type="button">
              취소
            </CommonButton>
            <CommonButton kindOf={`circleTheme`} type="submit">
              저장
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default EditReservation;
