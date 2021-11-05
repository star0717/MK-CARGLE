import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const router = useRouter();

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        backgroundImage: `url("../../images/background2.png")`,
        display: "flex",
        justifyContent: "center"
      }}
    >
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#E2E2E2",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            
          </div>
        </div>

    </div>
  );
};

export default SignUp;
