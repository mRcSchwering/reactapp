import React from "react";
import { Button } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function UploadPage(): JSX.Element {
  const imgStyle = { maxWidth: 800, margin: 5 };
  const [src, setSrc] = React.useState("");
  const [crop, setCrop] = React.useState({ aspect: 16 / 9 });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSrc(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleRevoke() {
    URL.revokeObjectURL(src);
    setSrc("");
  }

  function handleCrop(newCrop: any) {
    setCrop(newCrop);
    console.log(newCrop);
  }

  return (
    <div>
      <h2>Upload Page</h2>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleRevoke}>Revoke</Button>
      <div>
        <ReactCrop
          src={src}
          crop={crop}
          onChange={handleCrop}
          style={imgStyle}
        />
      </div>
    </div>
  );
}
