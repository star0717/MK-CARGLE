import Cookies from "js-cookie";
import { NextPage } from "next"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useInterval } from "react-use";
import { stepOption } from ".";
import { authNumCheckAction, emailSendAction, findPWAction } from "../../../../store/action/user.action";
import { formRegEx } from "../../../validation/regEx";

const StepThree: NextPage<stepOption> = (props) => {
    const dispatch = useDispatch();
    const setHeaderName = props.setHeaderName;
    const setStepNumber = props.setStepNumber;
    const headerName = props.headerName;

      // react-hook-form 사용을 위한 선언
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const [email, setEmail] = useState(""); // 이메일 주소
    const [name, setName] = useState("");
    const [hpNumber, setHpNumber] = useState("");

    const onEmailSendHandler = (e:any) => {
        e.preventDefault();
        dispatch(findPWAction({
            name,
            hpNumber,
            email
        })).then((req: any) => {
            if (req.payload) {
                setHeaderName("PW");
                setStepNumber(4);
            } else {
                alert("존재하지 않는 사용자입니다.")
            }
        },
        (err) => {
            alert("존재하지 않는 사용자입니다.")
        })
    }

    console.log(name,hpNumber,email)


    
    return (
        <div>
            <form onSubmit={onEmailSendHandler}>
                <div>
                    이름 입력
                </div>
                <input
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    type="text"
                />

                <div>
                    핸드폰 번호 입력
                </div>
                <input
                    value={hpNumber}
                    onChange={(e)=>{setHpNumber(e.target.value)}}
                    type="text"
                />

                <div>
                    이메일 입력
                </div>
                <input
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email"
                />
                
                <div>
                <button>
                    다 음
                </button>
                </div>
            </form>
        </div>
    )
}

export default StepThree;