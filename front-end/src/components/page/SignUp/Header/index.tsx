import type { NextPage } from "next";
import { UserAuthority } from "../../../../models/user.entity";

const Header: NextPage<any> = (props) => {
  const stepNumber = props.stepNumber;
  const userAuth = props.userAuth;
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "#E2E2E2",
      }}
    >
      <div
        style={{
          height: "100%",
          textAlign: "center",
        }}
      >
        {userAuth === "owner" && stepNumber === (3 || 4 || 5) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ backgroundColor: stepNumber === 3 ? "red" : null }}>
              1
            </div>
            <div style={{ backgroundColor: stepNumber === 4 ? "red" : null }}>
              2
            </div>
            <div style={{ backgroundColor: stepNumber === 5 ? "red" : null }}>
              3
            </div>
          </div>
        )}
        <div>
          {stepNumber === 1 && <div>가입 유형을 선택해주세요.</div>}
          {stepNumber === 2 && (
            <div>서비스 이용을 위해 약관 동의가 필요해요.</div>
          )}
          {stepNumber === 3 && <div>계정 정보를 입력해주세요.</div>}
          {stepNumber === 4 && userAuth === UserAuthority.OWNER ? (
            <div>사업자 정보를 입력해주세요.</div>
          ) : null}
          {stepNumber === 5 && <div>가입 승인을 위해 서류를 제출해주세요.</div>}
        </div>
        {/* {stepNumber === 1 ? ( // 01 회원구분
          <div>가입 유형을 선택해주세요.</div>
        ) : stepNumber === 2 ? ( // 02 약관 동의
          `02 약관 동의`
        ) : stepNumber === 3 ? ( // 03 정보 입력
          `03 정보 입력`
        ) : stepNumber === 4 ? (
          userAuth === UserAuthority.OWNER ? (
            `04 서류 제출` // 04 서류 제출(사업자)
          ) : (
            `04 가입승인`
          ) // 04 가입 승인(직원)
        ) : stepNumber === 5 ? ( // 05 가입 승인(사업자)
          `05 가입승인`
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Header;
