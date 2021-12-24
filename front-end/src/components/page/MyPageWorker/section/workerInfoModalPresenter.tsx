import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { Switch } from "@material-ui/core";
import { makeFullAddress } from "../../../../modules/commonModule";
import dayjs from "dayjs";
import { _pWorkerInfoModalProps } from "../../../../configure/_pProps.entity";

const WorkerInfoModalPresenter: NextPage<_pWorkerInfoModalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Text>직원 상세 정보</Text>
        <Wrapper dr={`row`}>
          <Text>승인상태</Text>
          <Switch
            color="primary"
            checked={props.approval}
            onChange={props.onChangeApproval}
          />
          {props.approval ? <Text>승인</Text> : <Text>미승인</Text>}
        </Wrapper>
        <form onSubmit={props.onChangeWorkerInfo}>
          <Wrapper dr={`row`}>
            <Text>직원명</Text>
            <TextInput2 type="text" value={props.docInfo.name} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>아이디</Text>
            <TextInput2 type="text" value={props.docInfo.email} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>휴대폰번호</Text>
            <TextInput2 type="text" value={props.docInfo.hpNumber} readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>주소</Text>
            <TextInput2
              value={makeFullAddress(
                props.docInfo.address1,
                props.docInfo.address2,
                props.docInfo.postcode
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
              value={dayjs(props.docInfo.joinDate).format("YYYY-MM-DD")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setDocInfo({
                  ...props.docInfo,
                  joinDate: new Date(e.target.value),
                });
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
              onClick={props.workerDelete}
            >
              직원삭제
            </SmallButton>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModalPresenter;
