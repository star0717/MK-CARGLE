import React from "react";
import { NextPage } from "next";
import EstimateFile from "src/components/page/FileHTML/estimateFile";
import { CommonButton, Wrapper } from "src/components/styles/CommonComponents";
import Script from "next/script";
import { nanoid } from "nanoid";
import hmacSHA512 from "crypto-js/hmac-sha512";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { HmacSHA256 } from "crypto-js";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  _aGetPaymentData,
  _aPostPaymentComplete,
  _aPostSms,
} from "store/action/user.action";
import { _iPayment, _iSms } from "store/interfaces";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
dayjs.locale("ko");

const HeoTest: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  const impCode: string = process.env.NEXT_PUBLIC_IMP_CODE;
  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onPaymentHandler = () => {
    const { IMP } = window;
    IMP.init(impCode);

    const data: RequestPayParams = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 10, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: "01012341234", // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
      // m_redirect_url: "",  // 리다이렉트 url(필요함)
    };

    const callback = async (rsp: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } = rsp;
      // 결제가 완료되면 반환되는 응답 객체(rsp)의 결제 성공 여부에 따라 처리 로직 필요
      if (success) {
        const rspData = {
          imp_uid: rsp.imp_uid,
          merchant_uid: rsp.merchant_uid,
        };
        // 요청이 성공ㅎㅆ을 경우, 결제번호(imp_uid)와 주문번호(merchant_uid) 등 을 서버에 전달
        // 제이쿼리와 ajax 사용(아임포트에서 제공해주는 로직)
        // ex)
        // $.ajax({
        //   url: "/api/payment/complete",
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   data: {
        //     imp_uid: rsp.imp_uid,
        //     merchant_uid: rsp.merchant_uid,
        //   },
        // }).done(function (data) {
        //   switch (data.result) {
        //     case "success":
        //       break;
        //     case "cancelled":
        //       break;
        //     case "failed":
        //       break;
        //     case "forgery":
        //       break;
        //   }
        //   // 가맹점 서버 결제 API 성공시 로직
        // });
        // alert("결제 성공");
        await dispatch(_aPostPaymentComplete(rspData)).then(
          (res: _iPayment) => {
            switch (res.payload.result) {
              case "success":
                break;
              case "cancelled":
                break;
              case "failed":
                break;
              case "forgery":
                break;
            }
            alert(res.payload.message);
          }
        );

        // 이 후, DB 저장 및 페이지/State 처리 필요
      } else {
        alert("결제 실패 : " + error_msg);
      }
    };

    IMP.request_pay(data, callback);
  };

  const onSmsHandler = async () => {
    dispatch(_aPostSms()).then((res: _iSms) => {
      alert("메시지를 전송했습니다.");
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // return <EstimateFile />;
  return (
    <>
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      ></Script>
      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
      ></Script>
      <Wrapper>
        <CommonButton type="button" onClick={onPaymentHandler}>
          결제하기
        </CommonButton>
        <CommonButton type="button" onClick={onSmsHandler}>
          SMS전송
        </CommonButton>
        <CommonButton
          type="button"
          onClick={() => {
            dispatch(_aGetPaymentData("imp_916671932697")).then(
              (res: _iPayment) => {
                console.log(res.payload);
              }
            );
          }}
        >
          조회
        </CommonButton>
      </Wrapper>
    </>
  );
};

export default HeoTest;
