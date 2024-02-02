import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pokeball from "../../assets/const/Pokeball.png";

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
    <div className="pl-4 max-[540px]:pr-4 sticky z-10 top-0 grid grid-cols-4 content-center bg-gradient-to-r from-blue-600 to-cyan-900 h-16 w-full">
      <p className="flex font-bebas brondan items-center text-white md:text-4xl sm:text-2xl max-[315px]:text-md col-span-2 h-16">
        Pokémon Attack Analyzer
      </p>

      <div className="flex justify-end gap-x-6 col-span-2">
        <div className="flex justify-end w-1/8">
          <Switch checked={darkMode} onChange={handleDarkMode}>
            {({ checked }) => (
              <div
                className={`${
                  checked ? "bg-blue-900" : " bg-gray-200"
                } relative inline-flex min-[315px]:h-8 min-[315px]:w-12 sm:h-10 sm:w-16 items-center rounded-full`}
              >
                <span className="sr-only">Dark mode</span>
                <span
                  className={`${
                    checked
                      ? "min-[315px]:translate-x-6 sm:translate-x-8"
                      : "translate-x-1"
                  } inline-block min-[315px]:h-3 min-[315px]:w-3 sm:h-6 sm:w-6 transform rounded-full bg-white transition`}
                />
                <span
                  className={` sm:text-2xl min-[315px]:text-xl ${
                    checked
                      ? "sm:translate-x-[-19px] min-[315px]:translate-x-[-10px] text-white"
                      : "translate-x-2"
                  } material-symbols-outlined`}
                >
                  {checked ? "dark_mode" : "light_mode"}
                </span>
              </div>
            )}
          </Switch>
        </div>
        <div className="flex justify-end items-center w-1/8 h-full">
          <select
            value={i18n.language}
            onChange={(e) => changeLanguageHandler(e.target.value)}
            className="min-[315px]:w-15 min-[315px]:h-8 min-[315px]:text-xs sm:w-20 sm:h-10 sm:text-base border border-black rounded-md"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="flex justify-end place-items-end max-[540px]:hidden">
          <img className="h-16" src={pokeball} />
        </div>
      </div>
    </div>
  );
};
