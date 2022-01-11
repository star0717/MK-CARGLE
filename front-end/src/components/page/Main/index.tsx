import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { _aGetAuthSignout } from "../../../../store/action/user.action";
import Calendar from "../../common/calendar";
import MyPageAccount from "../MyPageAccount";
import Link from "next/link";
import { Text, Wrapper } from "../../styles/CommonComponents";
import { UseLink } from "../../../configure/router.entity";

/**
 * 메인: index 컴포넌트(기능)
 * @returns
 */
const Main: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [schedule, setSchedule] = useState(
    `${new Date().toLocaleDateString()} 일정`
  );

  // calendar에 넘길 props 정의
  const calendarProps = {
    schedule,
    setSchedule,
  };

  // 파일 업로드
  const onStampUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div style={{ display: "flex", height: "300px" }}>
        <div style={{ width: "40%", height: "100%" }}>
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
            <Link href={UseLink.MYPAGE_ACCOUNT}>
              <a>
                <button>마이페이지</button>
              </a>
            </Link>
            <Link href={UseLink.MYPAGE_WORKER}>
              <a>
                <button>직원관리</button>
              </a>
            </Link>
            <form id="stampform" onSubmit={onStampUploadHandler}>
              <Wrapper dr={`row`}>
                <Text>사업자 도장</Text>
                <input type="file" />
                <button type="submit" name="upload">
                  업 로 드
                </button>
              </Wrapper>
            </form>
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
          style={{
            width: "60%",
            height: "100%",
            backgroundColor: "lightgreen",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            {registerOpen && (
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: "lightpink",
                }}
              >
                {schedule}
                <button
                  onClick={() => {
                    setRegisterOpen(false);
                  }}
                >
                  {">"}
                </button>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "lightpink",
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
              <Calendar {...calendarProps} />
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
