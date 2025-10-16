"use client";

import { useRef, useState } from "react";

import "cropperjs/dist/cropper.css";
//cropper
import Cropper from "react-cropper";

// import CropperPreviewResponsive from "./CropperPreviewResponsive";
// TODO: This should be provided by the consuming application
// import { useHeader } from "./common/ResponsiveContext";

import IconComponent from "../IconComponent/IconComponent";
import style from "./CropperResponsive.module.scss";
import "./cropper_az.css";

/**
 * @typedef {import('./cropper.d.ts').CropperResponsiveProps} CropperResponsiveProps
 */

/**
 * A responsive image cropper component designed for mobile and full-screen experiences with overlay interface.
 * Features a full-screen overlay with zoom controls, circle cropping support, and preview functionality.
 * @param {CropperResponsiveProps} props - Component props.
 * @returns {React.ReactElement}
 */
export default function CropperResponsive({
  imageSource = "",
  result,
  isOpen,
  setIsOpen,
  onClose,
  isCircle = false,
  previewTitle,
  // 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066
  previewDescription,
  uploadOptions,
  isShowPreview,
  setIsShowPreview,
  fileType,
}) {
  const cropperRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const defaultRatioRef = useRef(null);
  // const { setAppBar } = useHeader();

  const getCropData = () => {
    if (typeof cropperRef.current.cropper !== "undefined") {
      setPreviewImage(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL(fileType, 1.0)
      );
    }
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    setIsShowPreview(true);
  };

  const cancelCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.reset();
    // setAppBar({
    //   title: "Daftar Menjadi Toko",
    //   appBarType: "header_title",
    // });
    setIsOpen(false);
    onClose(true);
  };

  const handleConfirm = () => {
    //  setAppBar({
    //    title: "Daftar Menjadi Toko",
    //    appBarType: "header_title",
    //  });
    result(previewImage);
    setIsShowPreview(false);
    setIsOpen(false);
  };

  const handleZoom = (event) => {
    const oldRatio = event.detail.oldRatio;
    const newDefaultRatio =
      defaultRatioRef.current !== null ? defaultRatioRef.current : oldRatio;
    const ratio = event.detail.ratio;
    const isZoomingIn = ratio > oldRatio;
    defaultRatioRef.current = newDefaultRatio;
    // Only prevent zooming in beyond 2x the default ratio
    if (isZoomingIn && ratio > newDefaultRatio * 2) {
      event.preventDefault();
    }
    // Allow zooming out until minimum ratio (usually around 0.1 or lower)
    // You can adjust this minimum value based on your needs
    if (!isZoomingIn && ratio < newDefaultRatio / 2) {
      event.preventDefault();
    }
  };

  if (!isOpen) {
    return null;
  }

  // if (isShowPreview) {
  //   return (
  //     // 24. THP 2 - MOD001 - MP - 015 - QC Plan - Web - MuatParts - Seller - Paket 039 A - Profil Seller - LB - 0066
  //     // syntax fix CropperPreviewResponsive -> CropperReviewResponsive by fariz (tidak bisa build - biar cepat. kalau salah bisa direvert)
  //     <CropperPreviewResponsive
  //       title={previewTitle}
  //       description={previewDescription}
  //       src={previewImage}
  //       setIsShowPreview={setIsShowPreview}
  //       onConfirm={handleConfirm}
  //       uploadOptions={uploadOptions}
  //       onCancelCrop={cancelCrop}
  //     />
  //   );
  // }

  return (
    <>
      <div className={"fixed left-0 top-0 z-50 h-screen w-full bg-[#20242F]"}>
        <div className="flex flex-row items-center justify-between p-4 pt-3">
          <div className="flex flex-row items-center gap-x-3">
            {/* <button
                            onClick={() => setIsOpen(false)}
                        > */}
            <IconComponent
              className={style.close_btn_icon}
              src="/icons/silang.svg"
              size="medium"
              onClick={cancelCrop}
            />
            {/* </button> */}
            <span className="text-base font-medium leading-[19.2px] text-white">
              Cropper
            </span>
          </div>
          <IconComponent
            // className={style.close_btn_icon}
            src="/icons/check_white.svg"
            size="medium"
            onClick={getCropData}
          />
        </div>
        <div className="flex min-h-[600px]">
          <div
            className={`m-auto aspect-square w-full ${isCircle ? "modal-cropper-circle" : ""} `}
          >
            {/* <div className="absolute bottom-[7.5px] right-[8px] z-50 flex h-[80px] flex-col rounded-[12px] border-[1px] border-[#E2E2E2] bg-[white]">
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center text-2xl text-[black]"
                onClick={zoomIn}
              >
                +
              </div>
              <div
                className="flex h-1/2 cursor-pointer items-center justify-center p-[15px] text-2xl text-[black]"
                onClick={zoomOut}
              >
                <div className="w-[12px] border-[1.25px] border-[#1B1B1B]"></div>
              </div>
            </div> */}
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              src={imageSource}
              aspectRatio={1}
              preview={".img-preview"}
              viewMode={0}
              background={true}
              responsive={true}
              autoCropArea={1}
              cropBoxResizable={true}
              minCropBoxHeight={isCircle ? 386 : 0}
              minCropBoxWidth={isCircle ? 300 : 0}
              zoom={handleZoom}
            />
          </div>
        </div>
      </div>
    </>
  );
}

CropperResponsive.displayName = "CropperResponsive";
