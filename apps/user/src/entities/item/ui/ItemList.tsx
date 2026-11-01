import styled from "@emotion/styled";
import Item from "./Item";
import type { InventoryItem } from "../model/types";
import { useState } from "react";
import Modal from "@/src/shared/ui/modal/ModalParent";
import ItemModal from "./ItemModal";

interface ItemListProps {
  items: InventoryItem[];
}

export default function ItemList({ items }: ItemListProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <>
      <Scroller>
        <ListBox>
          {items.map((item) => (
            <Item
              key={item.id}
              itemName={item.name}
              itemCount={item.count}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </ListBox>
      </Scroller>

      <Modal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      >
        <ItemModal
          onClose={() => setSelectedItem(null)}
          ButtonText="거래하러 가기"
          maker="maremare"
          img="/tempImg/tempItemImg.png"
          itemName={selectedItem?.name ?? ""}
          itemCount={selectedItem?.count}
          itemDescription="푹신한 핑크빛 젤리가 콕 박힌 귀여운 냥이 장갑! 착용하면 냥냥 펀치의 파워가 업! 심쿵 주의 귀여움으로 적의 마음을 스르륵 녹여 공격력을 살짝 낮춰버려요.푹신한 핑크빛 젤리가 콕 박힌 귀여운 냥이 장갑! 착용하면 냥냥 펀치의 파워가 업! 심쿵 주의 귀여움으로 적의 마음을 스르륵 녹여 공격력을 살짝 낮춰버려요.ㄴ"
        />
      </Modal>
    </>
  );
}

const Scroller = styled.div`
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 12px;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  padding: 12px 6px;
  gap: 4px;
  justify-items: center;
  border-radius: var(--radius-md, 12px);
  background: rgba(255, 255, 255, 0.7);
`;
