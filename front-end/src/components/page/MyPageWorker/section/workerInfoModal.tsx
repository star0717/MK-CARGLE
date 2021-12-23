import { Switch } from "@material-ui/core";
import type { NextPage } from "next";
import { useState } from "react";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import { makeFullAddress } from "../../../../modules/commonModule";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";

const WorkerInfoModal: NextPage<_cWorkerInfoModalProps> = (props) => {
  console.log(props.clickDoc);
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
          <TextInput2
            value={makeFullAddress(
              props.clickDoc.address1,
              props.clickDoc.address2,
              props.clickDoc.postcode
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
            value={
              props.clickDoc.joinDate
                ? props.clickDoc.joinDate.toString().slice(0, 10)
                : ""
            }
          />
        </Wrapper>
        <Wrapper>
          <SmallButton
            type="button"
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
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModal;
