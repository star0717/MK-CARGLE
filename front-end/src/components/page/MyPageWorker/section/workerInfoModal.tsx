import { Switch } from "@material-ui/core";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");
import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import { SignUpInfo } from "../../../../models/auth.entity";
import { User } from "../../../../models/user.entity";
import {
  dateToString,
  makeFullAddress,
} from "../../../../modules/commonModule";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";

const WorkerInfoModal: NextPage<_cWorkerInfoModalProps> = (props) => {
  const dispatch = useDispatch();
  // state 관리
  const [approval, setApproval] = useState<boolean>(props.clickDoc.approval); // 직원 승인여부
  const [docInfo, setDocInfo] = useState<User>(props.clickDoc);

  const onChangeWorkerInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <WholeWrapper>
      <RsWrapper>
        <Text>직원 상세 정보</Text>
        <Wrapper dr={`row`}>
          <Text>승인상태</Text>
          <Switch
            color="primary"
            checked={approval}
            onChange={() => setApproval(!approval)}
          />
        </Wrapper>
        <form onSubmit={onChangeWorkerInfo}>
          <Wrapper dr={`row`}>
            <Text>직원명</Text>
            <TextInput2 type="text" value={docInfo.name} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput2 type="text" value={docInfo.email} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>휴대폰번호</Text>
            <TextInput2 type="text" value={docInfo.hpNumber} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>주소</Text>
            <TextInput2
              value={makeFullAddress(
                docInfo.address1,
                docInfo.address2,
                docInfo.postcode
              )}
              type="text"
              readOnly
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>입사일자</Text>
            <TextInput2
              type="date"
              name="joinDate"
              value={dayjs(docInfo.joinDate).format("YYYY-MM-DD")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDocInfo({ ...docInfo, joinDate: new Date(e.target.value) });
              }}
            />
          </Wrapper>
          <Wrapper>
            <SmallButton
              type="submit"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
            >
              저장
            </SmallButton>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
            >
              직원삭제
            </SmallButton>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModal;
