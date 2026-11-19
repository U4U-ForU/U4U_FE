"use client";

import RecipesList from "@/src/components/recipes/RecipesList";
import RecombModal from "@/src/components/submit/modal/RecombModal";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <RecipesList setIsOpen={setIsOpen} />

      {isOpen && <RecombModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
