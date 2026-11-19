import type { ReactNode } from "react";
import Header from "@/src/components/header/Header";
import RecipeModifyHeader from "@/src/components/recipes/modify/Header";

export default function RecipeModifyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header>
        <RecipeModifyHeader />
      </Header>
      {children}
    </>
  );
}
