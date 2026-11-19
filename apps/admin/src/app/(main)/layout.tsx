import type { ReactNode } from "react";
import Header from "@/src/components/header/Header";
import Menu from "@/src/components/header/Menu";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <Menu />
      </Header>
      {children}
    </>
  );
}
