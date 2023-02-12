import { Avatar } from "../../atom/Avatar/Avatar";
import { Button } from "../../atom/Button/Button";
import { ComboBoxUI } from "../../atom/ComboBox/ComboBox";
import { SelectorUI } from "../../atom/Selector/Selector";
import { SwitchUI } from "../../atom/Switch/Switch";
import { Stats } from "../../molecules/Stats/Stats";

export const Attacker = () => {
  return (
    <>
      <div className="flex flex-col">
        <Avatar className="flex flex-row justify-center mt-5" />
        <div className=" mt-3 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 gap-x-2">
          <ComboBoxUI name="name" label="Select a Pokémon" />
          <SelectorUI name="teraType" label="Select Tera Type" />
        </div>
        <div className="mt-3 grid place-items-center sm:grid-cols-2  xs:grid-cols-1 gap-x-2">
          <ComboBoxUI name="ability" label="Ability" />
          <ComboBoxUI name="item" label="Item" />
        </div>
        <div className="mt-3 grid place-items-center sm:grid-cols-4 xs:grid-cols-1">
          <div className="flex col-span-3 flex-row gap-x-2">
            <ComboBoxUI name="move" width="L" label="Select a Move" />
            <SelectorUI width="XS" name="category" label="Category" />
          </div>
          <SwitchUI
            circleBorder="all"
            label="Crit"
            className="mt-7 w-[48px] h-[48px]"
            name="crit"
          />
        </div>
        <div className="mt-3 grid grid-cols-2 place-items-center  gap-x-2">
          <ComboBoxUI name="nature" label="Nature" />
          <div>
            <Button
              circleBorder="left"
              label="Z-Move"
              className="mt-6 w-20"
              name="zMove"
            />
            <Button
              circleBorder="none"
              label="Dynamax"
              className="mt-6 w-20"
              name="dynamax"
            />
            <Button
              circleBorder="right"
              label="Tera"
              className="mt-6 w-20"
              name="tera"
            />
          </div>
        </div>
        <div className="mt-3 grid place-items-center  gap-x-2">
          <Stats />
        </div>
      </div>
    </>
  );
};
