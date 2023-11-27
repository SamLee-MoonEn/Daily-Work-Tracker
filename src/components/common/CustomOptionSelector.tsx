import { useEffect, useState } from "react";

import OptionButton from "../common/OptionButton";

export default function CustomOptionSelector({
  defaultValue,
  labelId,
  options,
  handleGetValue,
  isTooltip,
  tooltipDescription,
}: {
  defaultValue: string;
  labelId: string;
  options: string[];
  handleGetValue: (value: string) => void;
  isTooltip: boolean;
  tooltipDescription: string[] | null;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const selectorOpenClose = () => {
    if (!isClicked) {
      setIsClicked(true);
      return;
    }
    setIsClicked(false);
  };
  const selectorClose = () => {
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };
  const setValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedValue(e.currentTarget.innerText);
    handleGetValue(e.currentTarget.innerText);
    setIsClicked(false);
  };

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="w-full relative">
      <input
        id={labelId}
        type="text"
        value={selectedValue}
        className="select border-black border-2 w-full"
        onClick={selectorOpenClose}
        onBlur={selectorClose}
        readOnly
      />
      <div
        className={`join join-vertical w-full ${
          isClicked ? "flex" : "hidden"
        } absolute z-50`}
      >
        {options.map((v, i) => (
          <OptionButton
            setValue={setValue}
            buttonValue={v}
            isTooltip={isTooltip}
            tooltipDescription={
              tooltipDescription != null ? tooltipDescription[i] : null
            }
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
