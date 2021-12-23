import type { NextPage } from "next";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "../../../styles/CommonComponents";

const WorkerInfoModal: NextPage<_cWorkerInfoModalProps> = (props) => {
  return (
    <WholeWrapper>
      <RsWrapper>{JSON.stringify(props.clickDoc)}</RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoModal;
