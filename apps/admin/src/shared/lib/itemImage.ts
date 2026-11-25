const PLACEHOLDER_IMAGE = "/tempImg/itemImg/itemImg.svg";

export const itemImageSrc = (imageUrl?: string | null) =>
  imageUrl?.startsWith("https://") ? imageUrl : PLACEHOLDER_IMAGE;
