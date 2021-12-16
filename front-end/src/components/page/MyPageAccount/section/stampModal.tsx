import { NextPage } from "next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadStampAction } from "../../../../../store/action/user.action";
import { WholeWrapper } from "../../../styles/CommonComponents";
import StampModalPresenter from "./stampModalPresenter";

interface modalOption {
  stampNum: number;
  setStampNum: React.Dispatch<React.SetStateAction<number>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}

/**
 * 마이 페이지: 계정관리 도장 업로드 모달 컴포넌트(기능)
 * @param props
 * @returns
 */
const StampModal: NextPage<modalOption> = (props) => {
  const dispatch = useDispatch();

  //필요한 props 재정의
  const setModalOpen = props.setModalOpen;
  const stampNum = props.stampNum;
  const setStampNum = props.setStampNum;

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
        const formData = new FormData();
        formData.append("file", blob);
        dispatch(uploadStampAction(formData)).then((res: any) => {
          if (res.payload.length !== 0) {
            alert("도장이 업로드되었습니다.");
            setStampNum(stampNum + 1);
            setModalOpen(false);
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

  // 화면 구성에 넘길 props
  const fProps = {
    fileName,
    onSelectFile,
    upImg,
    onLoad,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    previewCanvasRef,
    stampFileUpload,
  };

  return (
    <WholeWrapper>
      <StampModalPresenter {...fProps} />
    </WholeWrapper>
  );
};

export default StampModal;
