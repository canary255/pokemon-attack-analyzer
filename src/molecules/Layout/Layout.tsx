import React from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="grid grid-cols-7">
        <main className="col-span-7 ">
          <Header />
          {children}
        </main>

        {/*<aside className="grid grid-rows-6 self-start sticky top-0 col-span-1 h-[100vh] bg-red-200">
          <div className=" bg-yellow-200 grid grid-rows-2">
            <div className="bg-slate-100">Logo</div>
            <p>Ruben Gracia</p>
          </div>
          // Fixed Sidebar
  </aside>*/}
      </div>
    </>
  );
};
