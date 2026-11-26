"use client";

import { useState } from "react";
import { ITEM_PLACEHOLDER_IMAGE, itemImageSrc } from "./itemImage";

export const useItemImage = (imageUrl?: string | null) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolved = itemImageSrc(imageUrl);
  const hasFailed = failedSrc === resolved;

  return {
    src: hasFailed ? ITEM_PLACEHOLDER_IMAGE : resolved,
    onError: () => setFailedSrc(resolved),
  };
};
