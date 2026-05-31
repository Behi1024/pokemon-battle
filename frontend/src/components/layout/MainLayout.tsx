import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
