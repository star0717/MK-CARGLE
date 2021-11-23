import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../store/action/user.action";
import Calendar from "../../common/calendar";

const Main: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", height: "300px" }}>
        <div style={{ width: "35%", height: "100%" }}>
          <div
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "lightcoral",
            }}
          >
            홍길동님, 반갑습니다!
          </div>
          <div
            style={{ width: "100%", height: "40%", backgroundColor: "maroon" }}
          >
            <button>마이페이지</button>
          </div>
          <div
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "red",
              display: "flex",
            }}
          >
            <button>정비장부</button>
            <button>정비요청서</button>
            <button>CEO리포트</button>
          </div>
        </div>
        <div
          style={{ width: "25%", height: "100%", backgroundColor: "lightblue" }}
        ></div>
        <div
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: "lightgreen",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "lightpink",
              display: "flex",
              justifyContent: "right",
            }}
          >
            {registerOpen ? (
              <div style={{ width: "50%", height: "100%" }}>
                10월 8일 예약 현황
                <button
                  onClick={() => {
                    setRegisterOpen(false);
                  }}
                >
                  {">"}
                </button>
              </div>
            ) : (
              ""
            )}

            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!registerOpen && (
                <button
                  onClick={() => {
                    setRegisterOpen(true);
                  }}
                >
                  {"<"}
                </button>
              )}
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "70px",
          backgroundColor: "orange",
          display: "flex",
          justifyContent: "center",
        }}
      >
        정비진행현황
      </div>
      <div
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "lawngreen",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input type="text" /> <button> 돋보기 </button>
      </div>
      <div
        style={{
          width: "100%",
          height: "350px",
          backgroundColor: "lightgoldenrodyellow",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%", height: "350px" }}>
          <div style={{ width: "100%", height: "30%" }}>
            <table style={{ width: "100%", height: "100%", border: "1px" }}>
              <tr>
                <td>차량 번호</td>
                <td>전화번호</td>
                <td>정비내용</td>
                <td>접수 일자</td>
                <td>진행 상태</td>
              </tr>
              <tr>
                <td>12가1234</td>
                <td>010-1234-1234</td>
                <td>엔진오일 교체</td>
                <td>2021.10.08</td>
                <td>대기</td>
              </tr>
            </table>
          </div>
          <div style={{ width: "100%", height: "30%" }}>
            <button>prev</button>
            <button>1</button>
            <button>2</button>
            <button>next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
