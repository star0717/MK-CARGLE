import { NextPage } from "next"
import { useRouter } from "next/dist/client/router";
import { stepOption } from ".";

const StepFour: NextPage<stepOption> = (props) => {
    const router = useRouter()
    return (
        <div>
            <div>
                입력된 이메일 주소로 임시비밀번호가 전송되었습니다.
            </div>
            <div>
                <button
                    onClick={()=>{router.push('/')}}>
                    로그인
                </button>
            </div>
        </div>
    )
}

export default StepFour