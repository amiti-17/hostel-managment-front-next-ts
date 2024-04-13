import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { useMutation } from "@apollo/client";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { USERS } from "@/Apollo/queries/users";
import { ImageType } from "@/config/system/types/generalImageType";
import { Maybe, ProfileImage } from "@/config/system/types/generated/types";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import style from "./style.module.css";
import imageUploadHandler from "./imageUploadHandler";
import chooseTextOnEditingButton from "./chooseTextOnEditingButton";

type UsersProfileImageProps = {
  image: Maybe<ProfileImage> | undefined;
  usersId: string;
};

// TODO: Create a single method which store src for image and display only from that.
const UsersProfileImage = ({ image, usersId }: UsersProfileImageProps) => {
  const [updateProfileImage] = useMutation(USERS.updateProfileImage);
  const [isImageEditing, setIsImageEditing] = useState<boolean>(false);
  const [displayedImage, setDisplayedImage] = useState<ImageType>();
  const [isImageWasUploaded, setIsImageWasUploaded] = useState<boolean>(false);
  useEffect(() => {
    if (image && image.id) {
      const { name, type, imageSrc } = image;
      setDisplayedImage({ name, type, imageSrc });
    }
  });
  useEffect(() => {
    if (displayedImage?.imageSrc) {
      setIsImageWasUploaded(true);
    }
  }, [displayedImage]);
  useEffect(() => {
    if (!isImageEditing && isImageWasUploaded && displayedImage?.imageSrc) {
      updateProfileImage({
        variables: {
          input: {
            usersId,
            type: displayedImage.type,
            name: displayedImage.name,
            newProfileImage: displayedImage.imageSrc,
          },
        },
        onCompleted(data) {
          console.log(data);
          setIsImageWasUploaded(false);
          setMessage("your image was uploaded successfully");
          setType("success");
          setIsShown(true);
        },
      });
    }
  }, [isImageEditing]);
  const { setType, setMessage, setIsShown } = useContext(NotificationContext);
  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    imageUploadHandler({
      event,
      setDisplayedImage,
      setType,
      setMessage,
      setIsShown,
    });
  };
  return (
    <>
      <div className={style.profilePictureWrapper}>
        {displayedImage?.imageSrc && (
          <Image
            src={displayedImage?.imageSrc}
            alt="Uploaded Image"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <CiUser className={style.profilePicture} />
      </div>
      {isImageEditing && (
        <input
          type="file"
          onChange={handleImageUpload}
          className={style.uploadImageInput}
        />
      )}
      <button onClick={() => setIsImageEditing((prev) => !prev)}>
        {chooseTextOnEditingButton({
          isImageEditing,
          imageSrc: image?.imageSrc,
          displayedImageSrc: displayedImage?.imageSrc,
        })}
      </button>
    </>
  );
};

export default UsersProfileImage;
