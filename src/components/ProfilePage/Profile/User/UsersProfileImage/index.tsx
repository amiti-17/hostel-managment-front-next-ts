import Image from "next/image";
import { CiUser } from "react-icons/ci";
import {
  AllowedImageType,
  allowedImageTypes,
} from "@/config/system/types/allowedUploadsImage";
import { ChangeEventHandler, useContext, useState } from "react";
import displayArray from "@/functions/utils/displayArray";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import style from "./style.module.css";

type UsersProfileImageProps = {
  imageSrc: string | undefined;
};

// TODO: Create a single method which store src for image and display only from that.
const UsersProfileImage = ({ imageSrc }: UsersProfileImageProps) => {
  const [editingImage, setEditingImage] = useState<boolean>(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>(
    imageSrc ?? ""
  );
  const { setType, setMessage, setIsShown } = useContext(NotificationContext);
  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
      const fileType = file.type as AllowedImageType;
      if (!allowedImageTypes.includes(fileType)) {
        setType("error");
        setMessage(
          "You can only upload images of the following types: " +
            displayArray(allowedImageTypes)
        );
        setIsShown(true);
        event.stopPropagation();
        event.preventDefault();
        event.target.value = "";
        setUploadedImageSrc("");
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        if (event.target && event.target.result) {
          console.log(event);
          setUploadedImageSrc(event.target.result as string);
        }
      });
      reader.readAsDataURL(file);
    }
  };
  const chooseTextOnEditingButton = ({
    uploadedImageSrc,
    editingImage,
    imageSrc,
  }: {
    uploadedImageSrc: string;
    editingImage: boolean;
    imageSrc: string | undefined;
  }) => {
    if (uploadedImageSrc && !editingImage) {
      return "Change image";
    }
    if (uploadedImageSrc && editingImage) {
      return "Save changes";
    }
    if (editingImage && !uploadedImageSrc) {
      return "Discard changes";
    }
    if (!uploadedImageSrc && !editingImage) {
      return imageSrc ? "Change image" : "Set image";
    }
  };
  return (
    <>
      <div className={style.profilePictureWrapper}>
        {uploadedImageSrc && (
          <Image
            src={uploadedImageSrc}
            alt="Uploaded Image"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <CiUser className={style.profilePicture} />
      </div>
      {editingImage && (
        <input
          type="file"
          onChange={handleImageUpload}
          className={style.uploadImageInput}
        />
      )}
      <button onClick={() => setEditingImage((prev) => !prev)}>
        {chooseTextOnEditingButton({
          editingImage,
          imageSrc,
          uploadedImageSrc,
        })}
      </button>
    </>
  );
};

export default UsersProfileImage;
