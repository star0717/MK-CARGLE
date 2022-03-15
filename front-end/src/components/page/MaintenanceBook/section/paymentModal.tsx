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
  SmallButton,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { MainPrice, Maintenance } from "src/models/maintenance.entity";
import { basicRegEx } from "src/validation/regEx";
import { useDispatch } from "react-redux";
import {
  _aPatchMaintenancesPay,
  _aPatchMaintenancesRelease,
} from "store/action/user.action";
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
  const [edit, setEdit] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(props.mtInfo.price.discount);

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
          return setDiscount(0);
        } else {
          if (price.isIncluded) {
            if (Number(e.target.value) > props.mtInfo.price.total)
              return setDiscount(props.mtInfo.price.total);
          } else {
            if (Number(e.target.value) > props.mtInfo.price.sum)
              return setDiscount(props.mtInfo.price.sum);
          }
          return setDiscount(Number(e.target.value));
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
    const partWage: number =
      props.mtInfo.price.partsSum + props.mtInfo.price.wageSum;
    let sum2: number = 0;
    let vat2: number = 0;
    let total2: number = 0;

    if (price.isIncluded) {
      total2 = partWage - discount;
      sum2 = Math.round(total2 / 1.1);
      vat2 = Math.round(total2 - sum2);
    } else {
      sum2 = partWage;
      vat2 = Math.round(sum2 * 0.1);
      total2 = Math.round(sum2 + vat2) - discount;
    }

    if (price.cash !== 0) {
      payCheck.cashCheck = true;
    } else {
      payCheck.cashCheck = false;
    }
    if (price.credit !== 0) {
      payCheck.creditCheck = true;
    } else {
      payCheck.creditCheck = false;
    }
    if (price.insurance) {
      payCheck.insuranceCheck = true;
    } else {
      payCheck.insuranceCheck = false;
    }
    setPrice({
      ...price,
      discount: discount,
      sum: sum2,
      vat: vat2,
      total: total2,
      balance:
        total2 -
        (payCheck.cashCheck ? price.cash : 0) -
        (payCheck.creditCheck ? price.credit : 0) -
        (payCheck.insuranceCheck ? price.insurance : 0),
    });
  }, [discount, payCheck, price.cash, price.credit, price.insurance]);

  /**결제 handler */
  const onPaymentHandler = async (edit: boolean) => {
    const maintenanceData: Maintenance = {
      ...props.mtInfo,
      price: price,
    };
    if (edit) {
      await dispatch(
        _aPatchMaintenancesRelease(maintenanceData._id, maintenanceData)
      ).then(
        (res: _iMaintenancesOne) => {
          if (res.payload) {
            props.setMtInfo(res.payload);
            setEdit(false);
          }
        },
        (err) => {
          return alert("결제내역 저장에 실패했습니다.");
        }
      );
    } else {
      await dispatch(
        _aPatchMaintenancesPay(maintenanceData._id, maintenanceData)
      ).then(
        (res: _iMaintenancesOne) => {
          if (!res.payload) {
            return alert("결제내역 저장에 실패했습니다.");
          }
          props.setMtInfo(res.payload);
          props.setModalOption("document2");
        },
        (err) => {
          return alert("결제내역 저장에 실패했습니다.");
        }
      );
    }
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
        {props.modalOption.indexOf("Bts") === -1 && (
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
        )}
        <Wrapper padding={`10px 0px 0px`}>
          {props.modalOption.indexOf("Bts") !== -1 ? (
            <CommonSmallTitle margin={`0px 0px 30px 0px`}>
              결제 정보
            </CommonSmallTitle>
          ) : (
            <CommonSmallTitle margin={`0px 0px 30px 0px`}>
              결제 정보 입력
            </CommonSmallTitle>
          )}
        </Wrapper>
        {props.modalOption.indexOf("Bts") !== -1 && (
          <Wrapper dr={`row`} ju={`flex-end`}>
            <SmallButton
              type="button"
              margin={`0px 30px 0px 0px`}
              width={`130px`}
              kindOf={`default`}
              onClick={() => {
                setEdit(true);
              }}
            >
              결제정보수정
            </SmallButton>
          </Wrapper>
        )}
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
                    value={discount.toLocaleString()}
                    onChange={onChangePrice}
                    readOnly={
                      props.modalOption.indexOf("Bts") === -1
                        ? false
                        : edit
                        ? false
                        : true
                    }
                  />
                  <Text width={`20px`} textAlign={`right`}>
                    원
                  </Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                <Text>공급가액</Text>
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
                    <Checkbox cursor={`default`}>
                      현금
                      <CheckInput
                        type="checkbox"
                        name="cashCheck"
                        checked={payCheck.cashCheck}
                        onChange={onChangeCheck}
                        disabled
                        cursor={`default`}
                      />
                      <CheckMark cursor={`default`}></CheckMark>
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
                      readOnly={
                        props.modalOption.indexOf("Bts") === -1
                          ? false
                          : edit
                          ? false
                          : true
                      }
                    />
                    <Text width={`20px`} textAlign={`right`}>
                      원
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Wrapper al={`flex-start`}>
                    <Checkbox cursor={`default`}>
                      카드
                      <CheckInput
                        type="checkbox"
                        name="creditCheck"
                        checked={payCheck.creditCheck}
                        onChange={onChangeCheck}
                        disabled
                        cursor={`default`}
                      />
                      <CheckMark cursor={`default`}></CheckMark>
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
                      readOnly={
                        props.modalOption.indexOf("Bts") === -1
                          ? false
                          : edit
                          ? false
                          : true
                      }
                    />
                    <Text width={`20px`} textAlign={`right`}>
                      원
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} height={`50px`}>
                  <Wrapper al={`flex-start`}>
                    <Checkbox cursor={`default`}>
                      보험
                      <CheckInput
                        type="checkbox"
                        name="insuranceCheck"
                        checked={payCheck.insuranceCheck}
                        onChange={onChangeCheck}
                        disabled
                        cursor={`default`}
                      />
                      <CheckMark cursor={`default`}></CheckMark>
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
                      readOnly={
                        props.modalOption.indexOf("Bts") === -1
                          ? false
                          : edit
                          ? false
                          : true
                      }
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
        {props.modalOption.indexOf("Bts") === -1 ? (
          <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                props.setModalOption("molit");
              }}
            >
              이전으로
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              onClick={() => {
                onPaymentHandler(false);
              }}
            >
              다음
            </CommonButton>
          </CommonButtonWrapper>
        ) : edit ? (
          <CommonButtonWrapper ju={`center`} padding={`60px 30px`}>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              kindOf={`white`}
              onClick={() => {
                setEdit(false);
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              onClick={() => {
                onPaymentHandler(true);
              }}
            >
              저장
            </CommonButton>
          </CommonButtonWrapper>
        ) : (
          <CommonButtonWrapper ju={`center`} padding={`60px 30px`}>
            <CommonButton
              width={`300px`}
              height={`50px`}
              type="button"
              onClick={() => {
                props.setModalOpen(false);
              }}
            >
              닫기
            </CommonButton>
          </CommonButtonWrapper>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default PaymentModal;
