"use client";

import RecipesList from "@/src/components/recipes/RecipesList";
import RecombModal from "@/src/components/submit/modal/RecombModal";
import type { Recipe } from "@/src/components/recipes/mock_recipes";
import { useState } from "react";

export default function Page() {
  const [selected, setSelected] = useState<Recipe | null>(null);

  return (
    <div>
      <RecipesList onSelect={setSelected} />

      {selected && (
        <RecombModal recipe={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
