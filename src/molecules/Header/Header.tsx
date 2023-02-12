import React from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky top-0 grid grid-cols content-center bg-[#009DFF] h-16 w-full">
      <div className="009DFF">
        <p className="ml-3 text-white sm:text-4xl xs:text-lg">
          Pokémon Report Generator
        </p>
      </div>
    </div>
  );
};
