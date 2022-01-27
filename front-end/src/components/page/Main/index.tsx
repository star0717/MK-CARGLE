import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { _aGetAuthSignout } from "../../../../store/action/user.action";
import Calendar from "../../common/calendar";
import {
  RsWrapper,
  SmallButton,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";

/**
 * 메인: index 컴포넌트(기능)
 * @returns
 */
const Main: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [schedule, setSchedule] = useState(
    `${new Date().toLocaleDateString()} 일정`
  );

  // calendar에 넘길 props 정의
  const calendarProps = {
    schedule,
    setSchedule,
  };

  // 파일 업로드
  const onStampUploadHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <BodyWrapper>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper>
            <Wrapper>
              <Text fontSize={`20px`}>홍길동님, 반갑습니다!</Text>
            </Wrapper>
            <Wrapper dr={`row`} bgColor={`#8DAFCE`} isRelative>
              <Wrapper width={`33%`}>
                <Calendar {...calendarProps} />
              </Wrapper>
              <Wrapper width={`33%`}>
                <SmallButton
                  type="button"
                  kindOf={`ghost`}
                  onClick={() => {
                    setRegisterOpen(!registerOpen);
                  }}
                >
                  {registerOpen ? <MdArrowLeft /> : <MdArrowRight />}
                </SmallButton>
              </Wrapper>
              {registerOpen && <Wrapper width={`33%`}>{schedule}</Wrapper>}
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default Main;
