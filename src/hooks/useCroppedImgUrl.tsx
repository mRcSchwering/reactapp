import React from "react";
import { getCroppedImg } from "../modules/images";

/**
 * Get image URL of cropped image from "react-image-crop"
 * @param img Image element of loaded original image
 */
export default function useCroppedImgUrl(
  img: HTMLImageElement
): [string | null, (crop: any) => void] {
  const [url, setUrl] = React.useState<string | null>(null);

  async function setCroppedImgUrl(crop: any) {
    if (crop.width && crop.height) {
      if (url) URL.revokeObjectURL(url);
      const blob = await getCroppedImg(img, crop);
      setUrl(URL.createObjectURL(blob));
    }
  }
  return [url, setCroppedImgUrl];
}
