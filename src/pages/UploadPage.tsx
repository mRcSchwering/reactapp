import React from "react";
import ReactCrop from "react-image-crop";
import useCroppedImgUrl from "../hooks/useCroppedImgUrl";
import "react-image-crop/dist/ReactCrop.css";

export default function UploadPage(): JSX.Element {
  const contStyle = { display: "flex", flexDirection: "row" as "row" };
  const imgStyle = { maxWidth: 800, margin: 5 };
  const croppedImgStyle = { maxWidth: "100%", margin: 5 };

  const [src, setSrc] = React.useState("");
  const [img, setImg] = React.useState(new Image());
  const [crop, setCrop] = React.useState({ aspect: 16 / 9 });
  const [croppedImgUrl, setCroppedImgUrl] = useCroppedImgUrl(img);

  function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      URL.revokeObjectURL(src);
      setSrc(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleImageLoaded(image) {
    setImg(image);
  }

  function handleChangeCrop(newCrop: any) {
    setCrop(newCrop);
  }

  async function handleCompleteCrop(crop) {
    setCroppedImgUrl(crop);
  }

  return (
    <div>
      <h2>Upload Page</h2>
      <input type="file" accept="image/*" onChange={handleSelectFile} />
      <div style={contStyle}>
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={handleImageLoaded}
          onChange={handleChangeCrop}
          onComplete={handleCompleteCrop}
          style={imgStyle}
        />
        <div>
          {croppedImgUrl && (
            <img alt="cropped" style={croppedImgStyle} src={croppedImgUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
