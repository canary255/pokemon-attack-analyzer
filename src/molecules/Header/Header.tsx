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
    <div className="sticky z-10 top-0 grid grid-cols-5 content-center bg-[#009DFF] h-16 w-full">
      <p className="ml-3 text-white sm:text-4xl xs:text-2xl col-span-3">
        Pokémon Report Generator
      </p>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguageHandler(e.target.value)}
        className="mr-3 w-16"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
      <div className="grid place-items-end">
        <Switch checked={darkMode} onChange={handleDarkMode}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <div
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
            </div>
          )}
        </Switch>
      </div>
    </div>
  );
};
