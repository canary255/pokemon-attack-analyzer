import React from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex flex-col text-sm h-screen bg-gray-200 dark:bg-darkGray">
        <Header />
        {children}
      </div>
    </>
  );
};
