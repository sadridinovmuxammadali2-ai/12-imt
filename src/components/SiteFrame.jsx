
"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
export default function SiteFrame({ children }) {
  const path = usePathname();
  const authPage =
    path === "/login" || path === "/signup";
  return (
    <>
      {!authPage && <Header />}
      <div className="page-shell">
        {children}
      </div>
      {!authPage && <Footer />}
    </>
  );
}