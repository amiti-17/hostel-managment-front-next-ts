import { NotificationType } from "@/components/NotificationWrapper/NotificationProvider";
import {
  AllowedImageType,
  allowedImageTypes,
} from "@/config/system/types/allowedUploadsImage";
import { ImageType } from "@/config/system/types/generalImageType";
import displayArray from "@/functions/utils/displayArray";
import React, { ChangeEvent, SetStateAction } from "react";

type ImageUploadHandlerProps = {
  event: ChangeEvent<HTMLInputElement>;
  setDisplayedImage: React.Dispatch<SetStateAction<ImageType | undefined>>;
  setIsShown: React.Dispatch<SetStateAction<boolean>>;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setType: React.Dispatch<SetStateAction<NotificationType>>;
};

const imageUploadHandler = ({
  event,
  setDisplayedImage,
  setType,
  setMessage,
  setIsShown,
}: ImageUploadHandlerProps) => {
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
      setDisplayedImage(undefined);
      return;
    }
    const reader = new FileReader();
    const { type, name } = event.target.files[0];
    reader.addEventListener("load", (event) => {
      if (event.target && event.target.result) {
        console.log(event);
        setDisplayedImage({
          imageSrc: event.target.result as string,
          type,
          name,
        });
      }
    });
    reader.readAsDataURL(file);
  }
};

export default imageUploadHandler;
