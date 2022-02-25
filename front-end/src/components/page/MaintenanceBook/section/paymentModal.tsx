import React, { useEffect, useState } from "react";
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
import { MainPrice, Maintenance } from "src/models/maintenance.entity";
import { basicRegEx } from "src/validation/regEx";
import { useDispatch } from "react-redux";
import { _aPatchMaintenancesPay } from "store/action/user.action";
import { _iMaintenancesOne } from "store/interfaces";
const PaymentModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  interface PayCheck {
    cashCheck: Boolean;
    creditCheck: Boolean;
    insuranceCheck: Boolean;
  }
  const payCheckInit: PayCheck = {
    cashCheck: false,
    creditCheck: false,
    insuranceCheck: false,
  };
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [price, setPrice] = useState<MainPrice>(props.mtInfo.price);
  const [payCheck, setPayCheck] = useState<PayCheck>(payCheckInit);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /**
   * 결제 input handler
   * @param e
   */
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replaceAll(",", "");
    switch (e.target.name) {
      case "discount":
        if (e.target.value === "" || !basicRegEx.NUM.test(e.target.value)) {
          return setPrice({
            ...price,
            discount: 0,
            sum: props.data.mtData.price.sum,
            vat: props.data.mtData.price.vat,
            total: props.data.mtData.price.total,
          });
        } else {
          return setPrice({
            ...price,
            discount: Number(e.target.value),
            sum: props.data.mtData.price.isIncluded
              ? Math.round(
                  (props.data.mtData.price.total - Number(e.target.value)) / 1.1
                )
              : Math.round(
                  props.data.mtData.price.sum - Number(e.target.value)
                ),
            vat: props.data.mtData.price.isIncluded
              ? Math.round(
                  ((props.data.mtData.price.total - Number(e.target.value)) /
                    1.1) *
                    0.1
                )
              : Math.round(
                  (props.data.mtData.price.sum - Number(e.target.value)) * 0.1
                ),
            total: props.data.mtData.price.isIncluded
              ? Math.round(
                  props.data.mtData.price.total - Number(e.target.value)
                )
              : Math.round(
                  props.data.mtData.price.sum -
                    Number(e.target.value) +
                    (props.data.mtData.price.sum - Number(e.target.value)) * 0.1
                ),
          });
        }

      default:
        if (e.target.value === "" || !basicRegEx.NUM.test(e.target.value)) {
          return setPrice({ ...price, [e.target.name]: 0 });
        } else {
          return setPrice({
            ...price,
            [e.target.name]: Number(e.target.value),
          });
        }
    }
  };

  /**
   * 결제수단 체크 handler
   * @param e
   */
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayCheck({ ...payCheck, [e.target.name]: e.target.checked });
  };

  /**결제 금액 계산 handler */
  useEffect(() => {
    setPrice({
      ...price,
      balance:
        price.total -
        (payCheck.cashCheck ? price.cash : 0) -
        (payCheck.creditCheck ? price.credit : 0) -
        (payCheck.insuranceCheck ? price.insurance : 0),
    });
  }, [payCheck, price.cash, price.credit, price.insurance]);

  const onPaymentHandler = async () => {
    const maintenanceData: Partial<Maintenance> = {
      ...props.data.mtData,
      price: price,
    };
    await dispatch(
      _aPatchMaintenancesPay(maintenanceData._id, maintenanceData)
    ).then(
      (res: _iMaintenancesOne) => {
        if (res.payload) {
          props.setMtInfo(res.payload);
          props.setModalOption("document");
        }
      },
      (err) => {
        return alert("결제내역 저장에 실패했습니다.");
      }
    );
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
                <Text>{price.partsSum.toLocaleString()}원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>기술료계</Text>
                <Text>{price.wageSum.toLocaleString()}원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text width={`60px`} textAlign={`left`}>
                  할인
                </Text>
                <Wrapper dr={`row`} width={`auto`}>
                  <TextInput2
                    width={`300px`}
                    al={`flex-end`}
                    type="text"
                    placeholder={"금액을 입력하세요."}
                    name="discount"
                    value={price.discount.toLocaleString()}
                    onChange={onChangePrice}
                  />
                  <Text width={`20px`} textAlign={`right`}>
                    원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>과세액</Text>
                <Text>{price.sum.toLocaleString()}원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>부가세</Text>
                <Text>{price.vat.toLocaleString()}원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text fontSize={`20px`}>총계</Text>
                <Text color={`#314af5`} fontSize={`20px`}>
                  {price.total.toLocaleString()}원
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
                      <CheckInput
                        type="checkbox"
                        name="cashCheck"
                        checked={payCheck.cashCheck}
                        onChange={onChangeCheck}
                      />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                      name="cash"
                      value={price.cash.toLocaleString()}
                      onChange={onChangePrice}
                      readOnly={!payCheck.cashCheck}
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
                      <CheckInput
                        type="checkbox"
                        name="creditCheck"
                        checked={payCheck.creditCheck}
                        onChange={onChangeCheck}
                      />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                      name="credit"
                      value={price.credit.toLocaleString()}
                      onChange={onChangePrice}
                      readOnly={!payCheck.creditCheck}
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
                      <CheckInput
                        type="checkbox"
                        name="insuranceCheck"
                        checked={payCheck.insuranceCheck}
                        onChange={onChangeCheck}
                      />
                      <CheckMark></CheckMark>
                    </Checkbox>
                  </Wrapper>
                  <Wrapper dr={`row`}>
                    <TextInput2
                      width={`300px`}
                      al={`flex-end`}
                      placeholder={"금액을 입력하세요."}
                      name="insurance"
                      value={price.insurance.toLocaleString()}
                      onChange={onChangePrice}
                      readOnly={!payCheck.insuranceCheck}
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
                    {price.balance.toLocaleString()}원
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
          <CommonButton type="button" onClick={onPaymentHandler}>
            다음
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default PaymentModal;
