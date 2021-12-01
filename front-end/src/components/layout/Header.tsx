import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../store/action/user.action";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  Image,
} from "../styles/CommonComponents";

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

  const { width, height, ref } = useResizeDetector();
  console.log(width);

  return (
    <WholeWrapper ref={ref}
      shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
    >
      <Wrapper
        bgColor={`#fff`}
        ju={`space-between`}
        al={`flex-start`}
        padding={width < 1439 ? `10px 0px 10px 70px` : `15px 0px 15px 100px`}>
        <Wrapper
          width={`auto`}
        >
          <Link href="/view/main">
            <a>
              <Image
                src="/images/cargle.png"
                alt="Cargle Logo"
                width={width < 1440 ? `100px` : `153px`}
              />
            </a>
          </Link>
        </Wrapper>
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
      </Wrapper>
    </WholeWrapper>
  );
};

export default Header;
