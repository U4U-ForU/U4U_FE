export type ItemStatus = "보유" | "예약";

export type ItemFilter = "전체" | ItemStatus;

export const ITEM_FILTERS: ItemFilter[] = ["전체", "보유", "예약"];

export interface InventoryItem {
  id: number;
  name: string;
  count?: number;
  status: ItemStatus;
  maker?: string;
  description?: string;
}

export interface ItemModalProps {
  maker?: string;
  img: string;
  ButtonText: string;
  itemName: string;
  itemCount?: number;
  itemDescription: string;
  onClose: () => void;
  onButtonClick?: () => void;
  showCloseButton?: boolean;
}
