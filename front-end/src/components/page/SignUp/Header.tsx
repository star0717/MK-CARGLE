import type { NextPage } from "next";

const Header: NextPage = () => {
    return (
        <div
            style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#E2E2E2"
            }}
        >
            <div
                style={{
                height: "100%",
                textAlign: "center"
                }}>
                    01<br />
                    회원 구분
            </div>
        </div>
    )
}

export default Header