import { Switch } from "@material-ui/core";
import type { NextPage } from "next";
import { useState } from "react";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput2,
} from "../../../styles/CommonComponents";

const WorkerInfoModal: NextPage<_cWorkerInfoModalProps> = (props) => {
  // state 관리
  const [approval, setApproval] = useState<boolean>(props.clickDoc.approval); // 직원 승인여부

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
        <Wrapper dr={`row`}>
          <Text>직원명</Text>
          <TextInput2 type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>아이디</Text>
          <TextInput2 type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>휴대폰번호</Text>
          <TextInput2 type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>주소</Text>
          <TextInput2 type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>주소</Text>
          <TextInput2 type="text" />
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>입사일자</Text>
          <TextInput2 type="date" />
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModal;
