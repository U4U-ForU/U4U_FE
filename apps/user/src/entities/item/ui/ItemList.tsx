import styled from "@emotion/styled";
import Item from "./Item";
import type { InventoryItem, ItemFilter } from "../model/types";
import { useState } from "react";
import Modal from "@/src/shared/ui/modal/ModalParent";
import ItemModal from "./ItemModal";
import { useRouter } from "next/navigation";

interface ItemListProps {
  items: InventoryItem[];
  filter: ItemFilter;
}

export default function ItemList({ items, filter }: ItemListProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const router = useRouter();

  const isReserved = selectedItem?.status === "예약";

  const goToTrade = () => {
    if (isReserved) {
      router.push("/trade/detail?from=inventory");
      return;
    }

    router.push(
      `/trade/list?from=inventory&filter=${encodeURIComponent(filter)}`,
    );
  };

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
          ButtonText={isReserved ? "거래 보러가기" : "거래하러 가기"}
          onButtonClick={goToTrade}
          maker={selectedItem?.maker}
          img="/tempImg/tempItemImg.png"
          itemName={selectedItem?.name ?? ""}
          itemCount={selectedItem?.count}
          itemDescription={selectedItem?.description ?? ""}
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
