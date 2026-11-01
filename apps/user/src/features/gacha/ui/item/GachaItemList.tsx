import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "@/src/shared/ui/modal/ModalParent";
import ItemModal from "@/src/entities/item/ui/ItemModal";
import GachaItem from "./GachaItem";
import type { GachaItem as GachaItemType } from "../../model/types";

interface GachaItemListProps {
  items: GachaItemType[];
}

export default function GachaItemList({ items }: GachaItemListProps) {
  const [selectedItem, setSelectedItem] = useState<GachaItemType | null>(null);

  return (
    <>
      <Scroller>
        <ListBox>
          {items.map((item) => (
            <GachaItem
              key={item.id}
              itemName={item.name}
              imageUrl={item.imageUrl}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </ListBox>
      </Scroller>

      <Modal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <ItemModal
            onClose={() => setSelectedItem(null)}
            onButtonClick={() => setSelectedItem(null)}
            ButtonText="닫기"
            img={selectedItem.imageUrl}
            itemName={selectedItem.name}
            itemDescription={selectedItem.description}
          />
        )}
      </Modal>
    </>
  );
}

const Scroller = styled.div`
  min-height: 0;
  padding: 0 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 32px;
  padding: 18px 12px;
  justify-items: center;
  border-radius: var(--radius-md, 12px);
  background: rgba(255, 255, 255, 0.55);
`;
