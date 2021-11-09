import type { NextPage } from "next";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <div style={{ width: "100%", height: "60px", backgroundColor: "gray" }}>
      <Link href="/view/Main">MK SOLUTION</Link>
    </div>
  );
};

export default Header;
