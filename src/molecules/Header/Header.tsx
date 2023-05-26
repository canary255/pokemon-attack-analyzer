import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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
    <div className="p-4 sticky z-10 top-0 grid grid-cols-4 content-center bg-[#009DFF] dark:bg-blue-600 h-16 w-full">
      <p className="text-white md:text-3xl sm:text-2xl max-[315px]:text-md col-span-2 p-4">
        Pokémon Report Generator
      </p>

      <div className="grid grid-cols-2 col-span-2">
        <div className="flex flex-row justify-center w-full h-full p-4">
          <select
            value={i18n.language}
            onChange={(e) => changeLanguageHandler(e.target.value)}
            className="w-16"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
        <Switch checked={darkMode} onChange={handleDarkMode}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <div
              className={`${
                checked ? "bg-blue-900" : "bg-gray-200"
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
            </div>
          )}
        </Switch>
      </div>
    </div>
  );
};
