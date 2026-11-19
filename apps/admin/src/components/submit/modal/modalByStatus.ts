import type { ComponentType } from "react";
import type { Status } from "../Item/ItemType";
import type { Recipe } from "../../recipes/mock_recipes";
import PendingModal from "./PendingModal";
import ApprovedModal from "./ApprovedModal";
import RecombModal from "./RecombModal";

export interface StatusModalProps {
  status: Status;
  recipe: Recipe;
  onClose: () => void;
}

export const MODAL_BY_STATUS = {
  "심사 중": PendingModal,
  "승인 완료": ApprovedModal,
  거절됨: ApprovedModal,
  취소됨: ApprovedModal,
  "조합 처리 완료": RecombModal,
} satisfies Record<Status, ComponentType<StatusModalProps>>;
