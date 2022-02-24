import React, { useState } from "react";
import { NextPage } from "next";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonSubTitle,
  CommonSmallTitle,
  TextInput2,
  Checkbox,
  CheckInput,
  CheckMark,
  CommonButton,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { MainPrice } from "src/models/maintenance.entity";
const DocumentsModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  interface PayCheck {
    cash: Boolean;
    credit: Boolean;
    insurance: Boolean;
  }
  const payCheckInit: PayCheck = {
    cash: false,
    credit: false,
    insurance: false,
  };
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [price, setPrice] = useState<MainPrice>(props.data.mtData.price);
  const [payCheck, setPayCheck] = useState<PayCheck>(payCheckInit);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({ ...price, [e.target.name]: e.target.value });
  };
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayCheck({ ...payCheck, [e.target.name]: e.target.value });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <Wrapper>
        <Wrapper dr={`row`}>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#ccc`}>1</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text color={`#314af5`}>2</Text>
            <Text fontSize={`20px`} color={`#314af5`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
          <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
            <Text>3</Text>
            <Text fontSize={`20px`} color={`#ccc`}>
              <GoPrimitiveDot />
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`10px 0px 0px`}>
          <CommonSmallTitle margin={`0px 0px 30px 0px`}>
            결제 정보 입력
          </CommonSmallTitle>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-around`}>
          <Wrapper width={`45%`}>
            <Wrapper
              al={`flex-start`}
              margin={`0px 0px 20px 0px`}
              fontSize={`18px`}
              fontWeight={`500`}
            >
              정비 금액
            </Wrapper>
            <Wrapper
              padding={`30px`}
              border={`1px solid #ccc`}
              radius={`8px`}
              shadow={`0px 5px 10px rgba(220,220,220,0.6)`}
            >
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>부품계</Text>
                <Text>120,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>기술료계</Text>
                <Text>70,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text width={`60px`} textAlign={`left`}>
                  할인
                </Text>
                <Wrapper dr={`row`} width={`auto`}>
                  <TextInput2
                    width={`300px`}
                    al={`flex-end`}
                    placeholder={"금액을 입력하세요."}
                  ></TextInput2>
                  <Text width={`20px`} textAlign={`right`}>
                    원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>합계</Text>
                <Text>190,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>부가세</Text>
                <Text>19,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text fontSize={`20px`}>총계</Text>
                <Text color={`#314af5`} fontSize={`20px`}>
                  209,000원
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper width={`45%`}>
            <Wrapper
              al={`flex-start`}
              margin={`0px 0px 20px 0px`}
              fontSize={`18px`}
              fontWeight={`500`}
            >
              결제 금액
            </Wrapper>
            <Wrapper
              padding={`30px`}
              border={`1px solid #ccc`}
              radius={`8px`}
              height={`362px`}
              ju={`space-between`}
              shadow={`0px 5px 10px rgba(220,220,220,0.6)`}
            >
              <Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Wrapper al={`flex-start`} height={`30px`}>
                    <Checkbox>
                      현금
                      <CheckInput type="checkbox" />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                    />
                    <Text width={`20px`} textAlign={`right`}>
                      원
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Wrapper al={`flex-start`}>
                    <Checkbox>
                      카드
                      <CheckInput type="checkbox" />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                    />
                    <Text width={`20px`} textAlign={`right`}>
                      원
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Wrapper al={`flex-start`}>
                    <Checkbox>
                      보험
                      <CheckInput type="checkbox" />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                    />
                    <Text width={`20px`} textAlign={`right`}>
                      원
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Text fontSize={`20px`}>잔액(외상)</Text>
                  <Text color={`#d6263b`} fontSize={`20px`}>
                    9,000원
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper ju={`space-between`} padding={`30px 30px`}>
          <CommonButton
            type="button"
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            kindOf={`white`}
            onClick={() => {
              props.setModalOption("molit");
            }}
          >
            이전으로
          </CommonButton>
          <CommonButton
            type="button"
            onClick={() => {
              props.setModalOption("payment");
            }}
          >
            다음
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default DocumentsModal;
