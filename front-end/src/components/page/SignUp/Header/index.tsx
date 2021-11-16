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
        {stepNumber === 1 ? ( // 01 회원구분
          <div>123</div>
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
        )}
      </div>
    </div>
  );
};

export default Header;
