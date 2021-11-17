import axios from "axios";
import { NextPage } from "next"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { stepOption } from ".";
import { findEmailAction } from "../../../../store/action/user.action";

const StepOne: NextPage<stepOption> = (props) => {
    const dispatch = useDispatch();

    const setHeaderName = props.setHeaderName;
    const setStepNumber = props.setStepNumber;
    const setFindEamil = props.setFindEmail;

    const [name, setName] = useState(""); // 이름
    const [hpNumber, setHpNumber] = useState(""); // 휴대전화번호

    const findEamilHandler = async () => {
        dispatch(findEmailAction({ name, hpNumber })).then((req) => {
            if (req.payload) {
                setFindEamil(String(req.payload));
                setStepNumber(2);
            }
            else {
                alert('존재하는 이메일이 없습니다.')
            }
        })
    }

    return (
        <div>
            <div>
                이름
            </div>
            <input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
            }} />
            <div>
                휴대전화번호
            </div>
            <input
                value={hpNumber}
                onChange={(e) => {
                    setHpNumber(e.target.value);
                }}/>
            <div>
                <button
                    onClick={findEamilHandler}>
                    다음
                </button>
            </div>
            <div>
                <button
                    onClick={(e)=>{setHeaderName("PW"); setStepNumber(3);}}>
                    비밀번호찾기
                </button>
            </div>
        </div>
    )
}

export default StepOne