import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// verticalAlign: "middle",
// alignItems: "center",
// textAlign: "center"

const Find: NextPage = () => {
  const router = useRouter();

  const[headerName, setHeaderName] = useState('email');
  const[stepNumber, setStepNumber] = useState(1);


  return (
    <div
      style={{
        width: "100%",
        height: "900px",
        backgroundImage: `url("../../images/background2.png")`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {/* 헤더 부분 (ex.01 회원구분) */}
        <div
            style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#E2E2E2",
            }}
        >
          {headerName === "email" ? // 이메일 찾기 헤더
          <div>이메일 찾기</div> :
          <div>비밀번호 찾기</div> // 비밀번호 찾기 헤더
          }
        </div>

        {/* 바디 부분 ( 전체 틀 ) 나중에 컨텐츠 크기에 맞게끔 반응형으로 만들어야 함 */} 
        <div
            style={{
            width: "100%",
            height: "800px",
            backgroundColor: "lightblue",
            display: "flex",
            justifyContent: "center",
        }}
        >
            {/* 바디 부분 ( 가운데 전체 영역 ) */}
            <div
            style={{
                width: "30%",
                height: "100%",
                backgroundColor: "lightgreen",
                textAlign: "center",
                verticalAlign: "middle",
            }}
            >

            {(stepNumber === 1) ? // step 1, (사업자번호, 휴대전화번호 입력)
                <div>
                    <div>
                        사업자등록번호
                    </div>
                    <input />
                    <div>
                        휴대전화번호
                    </div>
                    <input />
                    <div>
                        <button
                            onClick={(e)=>{setStepNumber(2);}}>
                            다음
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e)=>{setHeaderName("PW"); setStepNumber(2);}}>
                            비밀번호찾기
                        </button>
                    </div>
                </div>
            :
            (stepNumber === 2) ?
                (headerName === "email") ? // email step2, 아이디 알려주고 로그인 패스워드
                <div>
                    <div>
                        회원님의 이메일은 다음과 같습니다.
                    </div>
                    <div>
                        <button
                            onClick={()=>{router.push('/')}}>
                            로그인
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e)=>{setHeaderName("PW"); setStepNumber(2);}}>
                            비밀번호찾기
                        </button>
                    </div>
                    
                </div>

                : // PW Step 1, 이메일 쓰고 다음버튼 클릭
                <div>
                    <div>
                        이메일 입력
                    </div>
                    <input />
                    <div>
                        <button
                            onClick={(e)=>{setHeaderName("PW"); setStepNumber(3);}}>
                            다음
                        </button>
                    </div>
                    
                </div>
            
            :
            (stepNumber === 3) ?
                <div>
                    <div>
                        이메일 입력
                    </div>
                    <input />
                    <div>
                        이메일로 전송된 6자리 코드를 입력해주세요.
                    </div>
                    <input />
                    <div style={{display:"flex", justifyContent: "center",}}>
                        <div>
                        코드를 받지 못하셨나요? 
                        </div>
                        <div>
                            다시 전송하기
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={(e)=>{setHeaderName("PW"); setStepNumber(4);}}>
                            다음
                        </button>
                    </div>
                </div>
            
            :
            (stepNumber === 4) ?
                <div>
                    <div>
                        새 비밀번호
                    </div>
                    <input />
                    <div>
                        8~16자 영문, 숫자, 특수문자를 사용하세요 
                    </div>
                    <div>
                        새 비밀번호 확인
                    </div>
                    <input />
                    <div>
                        비밀번호가 일치합니다.
                    </div>
                    <div>
                        <button
                            onClick={(e)=>{setHeaderName("PW"); setStepNumber(5);}}>
                            완료
                        </button>
                    </div>
                </div>

            :
            (stepNumber === 5) ?
                <div>
                    <div>
                        비밀번호 재설정이 완료되었습니다. 로그인해주세요
                    </div>
                    <div>
                        <button
                            onClick={()=>{router.push('/')}}>
                            로그인
                        </button>
                    </div>
                </div>
                
                 
            : ""}
                
            </div>
        </div>
    </div>
  );
};

export default Find;
