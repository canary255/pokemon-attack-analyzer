import React from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="grid grid-cols-7 ">
        <main className="col-span-7 ">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};
