import { NextPage } from "next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadStampAction } from "../../../../../store/action/user.action";
import { _pStampModalProps } from "../../../../configure/_pProps.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  LabelButton,
  SmallButton,
} from "../../../styles/CommonComponents";
import ReactCrop from "react-image-crop";

/**
 * 마이 페이지: 계정관리 도장 업로드 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const StampModal: NextPage<_pStampModalProps> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [fileName, setFileName] = useState<string>(""); // 도장 이미지 파일명
  const [upImg, setUpImg] = useState<any>(); // React-crop
  const imgRef = useRef<any>(null); // React-crop
  const previewCanvasRef = useRef<any>(null); // React-crop
  const [crop, setCrop] = useState<any>({
    // React-crop
    unit: "%",
    width: 30,
    aspect: 9 / 9,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null); // React-crop

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
      (blob: any) => {
        const formData: FormData = new FormData();
        formData.append("file", blob);
        dispatch(uploadStampAction(formData)).then((res: any) => {
          if (res.payload.length !== 0) {
            alert("도장이 업로드되었습니다.");
            props.setStampNum(props.stampNum + 1);
            props.setStampImgSrc(`${props.stampImgSrc}?num=${props.stampNum}`);
            props.setModalOpen(false);
          } else {
            alert("업로드에 실패했습니다.");
          }
        });
      },
      "image/png",
      1
    );
  };

  /**
   * 이미지 파일 선택 handler
   * @param e
   */
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
  }, [completedCrop]);

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
          ruleOfThirds
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

export default StampModal;
