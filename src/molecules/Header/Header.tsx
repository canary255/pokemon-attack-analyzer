import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  const handleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("darkMode", "false");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("darkMode", "true");
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="sticky z-10 top-0 grid grid-cols-2 content-center bg-[#009DFF] h-16 w-full">
      <div className="009DFF">
        <p className="ml-3 text-white sm:text-4xl xs:text-lg">
          Pokémon Report Generator
        </p>
      </div>
      <div className="grid place-items-end">
        <Switch checked={darkMode} onChange={handleDarkMode}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <button
              className={`${
                checked ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-10 w-16 items-center rounded-full`}
            >
              <span className="sr-only">Dark mode</span>
              <span
                className={`${
                  checked ? "translate-x-8" : "translate-x-1"
                } inline-block h-6 w-6 transform rounded-full bg-white transition`}
              />
              <span
                className={` ${
                  checked ? "translate-x-[-19px] text-white" : "translate-x-2"
                } material-symbols-outlined`}
              >
                {checked ? "dark_mode" : "light_mode"}
              </span>
            </button>
          )}
        </Switch>
      </div>
    </div>
  );
};
