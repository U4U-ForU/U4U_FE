"use client";

import SerchBar from "@/src/components/items/SerchBar";
import ItemList from "@/src/components/items/ItemList";
import { useState } from "react";
import ApprovedModal from "@/src/components/submit/modal/ApprovedModal";

export default function ItemsPage() {
  const [input, setInput] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <SerchBar input={input} onChange={setInput} />
      <ItemList input={input} onItemClick={() => setModalIsOpen(true)} />

      {modalIsOpen && (
        <ApprovedModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
}
