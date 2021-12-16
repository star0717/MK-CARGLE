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

/**
 * 마이 페이지: 계정관리 도장 업로드 모달 컴포넌트(화면)
 * @param props
 * @returns
 */
const StampModalPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const fileName = props.fileName;
  const onSelectFile = props.onSelectFile;
  const upImg = props.upImg;
  const onLoad = props.onLoad;
  const crop = props.crop;
  const setCrop = props.setCrop;
  const completedCrop = props.completedCrop;
  const setCompletedCrop = props.setCompletedCrop;
  const previewCanvasRef = props.previewCanvasRef;
  const stampFileUpload = props.stampFileUpload;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text margin={`0px 0px 10px`}>도장이미지</Text>
        <Wrapper>
          <TextInput2
            width={`300px`}
            type="text"
            placeholder="이미지 파일"
            value={fileName}
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
            onChange={onSelectFile}
            accept="image/*"
          />
        </Wrapper>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <Wrapper>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </Wrapper>
        {completedCrop?.width && completedCrop?.height && (
          <Wrapper>
            <Text>선택한 영역이 업로드됩니다.</Text>
            <SmallButton
              type="button"
              kindOf={`default`}
              margin={`0px 0px 0px 20px`}
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() =>
                stampFileUpload(previewCanvasRef.current, completedCrop)
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
