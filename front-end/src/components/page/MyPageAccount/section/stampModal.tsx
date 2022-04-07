import { NextPage } from "next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { _pStampModalProps } from "src/configure/_pProps.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
  StampWrapper,
} from "../../../styles/CommonComponents";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  s3FileUploadV1,
  s3GetFileData,
  s3GetFileUrl,
  s3ToUrl,
} from "src/modules/commonModule";
import { s3Folder } from "src/configure/s3.entity";
import { S3 } from "aws-sdk";

/**
 * 마이 페이지: 계정관리 도장 업로드 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const StampModal: NextPage<_pStampModalProps> = (props) => {
  class ImgStyle {
    margin: string;
    maxWidth?: string;
    maxHeight?: string;
  }

  const dispatch = useDispatch();

  // state 관리
  const [fileName, setFileName] = useState<string>(props.selectedFile.name); // 도장 이미지 파일명
  const [upImg, setUpImg] = useState<any>(); // React-crop
  const imgRef = useRef<any>(null); // React-crop
  const previewCanvasRef = useRef<any>(null); // React-crop
  const [crop, setCrop] = useState<any>({
    // React-crop
    unit: "%",
    width: 30,
    aspect: 1,
    zoom: 1,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null); // React-crop
  const [imgStyle, setImgStyle] = useState<ImgStyle>();
  /**
   * 도장 파일 업로드 handler
   * @param canvas
   * @param crop
   * @returns
   */
  const stampFileUpload = (canvas: any, crop: any) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      async (blob: Blob) => {
        await s3FileUploadV1(blob, props.comData.comRegNum, s3Folder.stamp);
        const newUrl: string = await s3GetFileUrl(
          props.comData.comRegNum,
          s3Folder.stamp
        );
        // const data: S3.Types.GetObjectOutput = await s3GetFileData(
        //   props.comData.comRegNum,
        //   s3Folder.stamp
        // );
        // const newUrl: string = s3ToUrl(data);
        props.setStampImgSrc(newUrl);
        props.setModalOpen(false);
      },
      "image/png",
      1
    );
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setUpImg(reader.result));
    reader.readAsDataURL(props.selectedFile);
  }, [props.selectedFile]);

  /**
   * React-crop 기능(이미지 반환)
   */
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // React-crop 기능(이미지 자르기)
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    if (imgRef.current.height > imgRef.current.width) {
      setImgStyle({
        margin: `0 auto`,
        maxWidth: `${Math.round(
          (imgRef.current.width / imgRef.current.height) * 100
        )}%`,
      });
    } else {
      setImgStyle({
        margin: `0 auto`,
        maxWidth: `100%`,
      });
    }
  }, [completedCrop]);

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref} padding={`0px 30px 30px`}>
      <CommonSmallTitle>사업자 도장</CommonSmallTitle>
      <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
        <Text>파일 선택</Text>
        <Wrapper dr={`row`} ju={`center`}>
          <TextInput2
            width={`400px`}
            type="text"
            placeholder="이미지 파일을 선택해주세요 (png,jpg)"
            value={fileName}
            required
            readOnly
          />
        </Wrapper>
        {upImg && (
          <StampWrapper
            width={`400px`}
            height={`300px`}
            margin={`20px 0px 0px`}
          >
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              ruleOfThirds
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              style={imgStyle}
              imageStyle={{ border: `1px solid black` }}
            />
          </StampWrapper>
        )}
        {!completedCrop ? null : completedCrop?.width &&
          completedCrop?.height ? (
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              // width: Math.round(completedCrop?.width ?? 0),
              // height: Math.round(completedCrop?.height ?? 0),
              width: `150px`,
              height: `150px`,
              margin: `20px auto`,
              border: `1px solid black`,
            }}
          />
        ) : (
          <Text margin={`20px auto`}>영역을 선택해주세요.</Text>
        )}
        {completedCrop?.width && completedCrop?.height ? (
          <Wrapper>
            <Text margin={`10px 0px 0px`}>선택한 영역이 업로드됩니다.</Text>
            <CommonButtonWrapper kindOf={`column`}>
              <CommonButton
                type="button"
                kindOf={`circleTheme`}
                margin={`0px 0px 0px 20px`}
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  stampFileUpload(previewCanvasRef.current, completedCrop)
                }
              >
                업로드
              </CommonButton>
            </CommonButtonWrapper>
          </Wrapper>
        ) : null}
      </Wrapper>
    </WholeWrapper>
  );
};

export default StampModal;
