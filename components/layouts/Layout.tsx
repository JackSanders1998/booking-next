import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/headers/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
