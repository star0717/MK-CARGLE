import { NextPage } from "next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch } from "react-redux";
import { uploadStamp } from "../../../../store/action/user.action";
import {
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";

const Test: NextPage = () => {
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState("");
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const generateDownload = (canvas: any, crop: any) => {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob: any) => {
        console.log("블랍 : ", blob);
        const formData = new FormData();
        formData.append("file", blob);
        dispatch(uploadStamp(formData)).then((res: any) => {
          if (res.payload.length !== 0) {
            alert("도장이 업로드되었습니다.");
          } else {
            alert("업로드에 실패했습니다.");
          }
        });
      },
      "image/png",
      1
    );
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

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

  return (
    <WholeWrapper>
      <Wrapper>
        <Text margin={`0px 0px 10px`}>정비업등록증</Text>
        <Wrapper>
          <TextInput2
            width={`300px`}
            type="text"
            placeholder="이미지 파일"
            value={fileName}
            required
            readOnly
          />
          <SmallButton
            type="button"
            kindOf={`default`}
            margin={`0px 0px 0px 20px`}
          >
            <label htmlFor="stamp">파일선택</label>
            <TextInput2
              style={{ display: "none" }}
              id="stamp"
              type="file"
              onChange={onSelectFile}
              accept="image/*"
            />
          </SmallButton>
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
                generateDownload(previewCanvasRef.current, completedCrop)
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

export default Test;
