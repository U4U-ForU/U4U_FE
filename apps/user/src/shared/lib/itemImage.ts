export const ITEM_PLACEHOLDER_IMAGE = "/tempImg/tempItemImg.png";

export const itemImageSrc = (imageUrl?: string | null) =>
  imageUrl?.startsWith("https://") ? imageUrl : ITEM_PLACEHOLDER_IMAGE;
