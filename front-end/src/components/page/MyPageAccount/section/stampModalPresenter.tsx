import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  LabelButton,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { _pStampModalProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 도장 업로드 모달 컴포넌트(화면)
 * @param props
 * @returns
 */
const StampModalPresenter: NextPage<_pStampModalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text fontSize={`18px`} fontWeight={`800`} padding={`0px 0px 20px`}>
          도장이미지
        </Text>
        <Wrapper>
          <TextInput2
            width={`500px`}
            height={`60px`}
            type="text"
            placeholder="이미지 파일을 선택해주세요 (png,jpg)"
            value={props.fileName}
            required
            readOnly
          />

          <LabelButton
            kindOf={`default`}
            margin={`20px 0px 0px 20px`}
            htmlFor="stamp"
          >
            파일선택
          </LabelButton>

          <TextInput2
            style={{ display: "none" }}
            id="stamp"
            type="file"
            onChange={props.onSelectFile}
            accept="image/*"
          />
        </Wrapper>
        <ReactCrop
          src={props.upImg}
          onImageLoaded={props.onLoad}
          crop={props.crop}
          onChange={(c) => props.setCrop(c)}
          onComplete={(c) => props.setCompletedCrop(c)}
          style={{
            width: "500px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Wrapper>
          <canvas
            ref={props.previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(props.completedCrop?.width ?? 0),
              height: Math.round(props.completedCrop?.height ?? 0),
            }}
          />
        </Wrapper>
        {props.completedCrop?.width && props.completedCrop?.height && (
          <Wrapper>
            <Text>선택한 영역이 업로드됩니다.</Text>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              disabled={
                !props.completedCrop?.width || !props.completedCrop?.height
              }
              onClick={() =>
                props.stampFileUpload(
                  props.previewCanvasRef.current,
                  props.completedCrop
                )
              }
            >
              업로드
            </SmallButton>
          </Wrapper>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default StampModalPresenter;
