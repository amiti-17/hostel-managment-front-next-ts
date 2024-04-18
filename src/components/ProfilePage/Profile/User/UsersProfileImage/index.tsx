import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { useMutation } from "@apollo/client";
import { CSSTransition } from "react-transition-group";
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { USERS } from "@/Apollo/queries/users";
import { ImageType } from "@/config/system/types/generalImageType";
import processGraphqlErrors from "@/CustomError/processGraphqlErrors";
import {
  Maybe,
  ProfileImage,
  StatusOutput,
} from "@/config/system/types/generated/types";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import style from "./style.module.css";
import imageUploadHandler from "./imageUploadHandler";
import chooseTextOnEditingButton from "./chooseTextOnEditingButton";

type UsersProfileImageProps = {
  image: Maybe<ProfileImage> | undefined;
  usersId: string;
};

// TODO: Maybe rewrite to something like this: https://codesandbox.io/p/sandbox/react-image-crop-demo-with-react-hooks-y831o?file=%2Fsrc%2FApp.tsx%3A243%2C2
const UsersProfileImage = ({ image, usersId }: UsersProfileImageProps) => {
  const [isEditProfileImageButtonShown, setIsEditProfileImageButtonShown] =
    useState(false);
  const [updateProfileImage] = useMutation(USERS.updateProfileImage);
  const [isImageEditing, setIsImageEditing] = useState<boolean>(false);
  const [displayedImage, setDisplayedImage] = useState<ImageType>();
  const [isImageWasUploaded, setIsImageWasUploaded] = useState<boolean>(false);
  const buttonChangeImageRef = useRef(null);

  useEffect(() => {
    if (image && image.id) {
      const { name, type, imageSrc } = image;
      setDisplayedImage({ name, type, imageSrc });
    }
  }, []);
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
          const myData: StatusOutput | undefined = data?.updateProfileImage;
          if (myData?.status) {
            setMessage("your image was uploaded successfully");
            setType("success");
          } else {
            setMessage(
              "your image was not uploaded successfully, try again later"
            );
            setType("warning");
          }
          setIsImageWasUploaded(false);
          setIsShown(true);
        },
        onError(error) {
          processGraphqlErrors({ error, setIsShown, setMessage, setType });
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
    <div
      onMouseEnter={() => setIsEditProfileImageButtonShown(true)} // TODO: think about mobile device support
      onMouseLeave={() => setIsEditProfileImageButtonShown(false)}
      className={style.userProfilePictureWrapper}
    >
      <div className={style.profilePictureWrapper}>
        {displayedImage?.imageSrc && (
          <Image
            src={displayedImage?.imageSrc}
            alt="Uploaded Image"
            fill
            className={style.profilePicture}
          />
        )}
        {!displayedImage && <CiUser className={style.profileIcon} />}
      </div>
      {isImageEditing && (
        <input
          type="file"
          onChange={handleImageUpload}
          className={style.uploadImageInput}
        />
      )}

      <CSSTransition
        in={isEditProfileImageButtonShown}
        nodeRef={buttonChangeImageRef}
        timeout={300}
        classNames="fade-css-transition"
        unmountOnExit
      >
        <button
          ref={buttonChangeImageRef}
          onClick={() => setIsImageEditing((prev) => !prev)}
        >
          {chooseTextOnEditingButton({
            isImageEditing,
            imageSrc: image?.imageSrc,
            displayedImageSrc: displayedImage?.imageSrc,
          })}
        </button>
      </CSSTransition>
    </div>
  );
};

export default UsersProfileImage;
