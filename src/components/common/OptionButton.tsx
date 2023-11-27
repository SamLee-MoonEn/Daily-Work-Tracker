import { useState } from "react";

export default function OptionButton({
  setValue,
  buttonValue,
  isTooltip,
  tooltipDescription,
}: {
  setValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonValue: string;
  isTooltip: boolean;
  tooltipDescription: string | null;
}) {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const openTooltip = () => {
    if (isTooltip) {
      setIsOpenTooltip(true);
    } else {
      setIsOpenTooltip(false);
    }
  };

  const closeTooltip = () => {
    if (isTooltip && isOpenTooltip) {
      setIsOpenTooltip(false);
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="btn join-item normal-case w-full"
        onClick={setValue}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
      >
        {buttonValue}
      </button>
      <div
        className={`absolute card  top-0 -right-[330px] w-[330px] ${
          isOpenTooltip ? "flex" : "hidden"
        }`}
      >
        <div className="card-body bg-light text-white shadow-xl">
          {tooltipDescription}
        </div>
      </div>
    </div>
  );
}
