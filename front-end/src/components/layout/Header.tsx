import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../store/action/user.action";

interface HeaderProps {
  cate: any;
  cApproval?: string;
}

const Header: NextPage<HeaderProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // props 재정의
  const cApproval = props?.cApproval;

  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push("/");
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "gray",
        display: "flex",
      }}
    >
      <div style={{ width: "30%", fontSize: "2em" }}>
        <Link href="/view/main">cargle</Link>
      </div>
      {cApproval === "done" && (
        <div style={{ width: "80%", display: "flex" }}>
          <div style={{ width: "75%", display: "flex" }}>
            <div style={{ width: "20%", height: "100%" }}>정비</div>
            <div style={{ width: "20%", height: "100%" }}>회계</div>
            <div style={{ width: "20%", height: "100%" }}>마이페이지</div>
            <div style={{ width: "20%", height: "100%" }}>커뮤니티</div>
            <div style={{ width: "20%", height: "100%" }}>도움말</div>
          </div>
          <div style={{ width: "25%", textAlign: "right" }}>
            <button>알림</button>
            <button onClick={onSignOutHandler}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
