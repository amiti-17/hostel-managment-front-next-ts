type ImageBaseProps = {
  imageStr: string;
  imageType: string;
};

export type AllowedImageType =
  | "image/png"
  | "image/gif"
  | "image/jpeg"
  | "image/svg+xml";

export const allowedImageTypes: AllowedImageType[] = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/svg+xml",
];
