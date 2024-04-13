const chooseTextOnEditingButton = ({
  displayedImageSrc,
  isImageEditing,
  imageSrc,
}: {
  displayedImageSrc: string | undefined;
  isImageEditing: boolean;
  imageSrc: string | undefined;
}) => {
  if (displayedImageSrc && !isImageEditing) {
    return "Change image";
  }
  if (displayedImageSrc && isImageEditing) {
    return "Save changes";
  }
  if (isImageEditing && !displayedImageSrc) {
    return "Discard changes";
  }
  if (!displayedImageSrc && !isImageEditing) {
    return imageSrc ? "Change image" : "Set image";
  }
};

export default chooseTextOnEditingButton;
