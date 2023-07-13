import { useState } from "react";

export default function OptionSelector({
  labelId,
  options,
  handleGetRegion,
  selectedValue,
}: {
  labelId: string;
  selectedValue: string;
  options: string[];
  handleGetRegion: (value: string) => void;
}) {
  return (
    <select
      id={labelId}
      onChange={(e) => handleGetRegion(e.target.value)}
      className="select border-2 border-black w-full"
      value={selectedValue}
    >
      {options.map((v, idx) => (
        <option value={v} key={idx} className="">
          {v}
        </option>
      ))}
    </select>
  );
}

// export function CustomedOptionSelector({
//   options,
// }: // handleGetRegion,
// // selectedValue,
// {
//   // selectedValue: string;
//   options: string[];
//   // handleGetRegion: (value: string) => void;
// }) {
//   const [isOpened, setIsOpened] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(options[0]);

//   const handleOptionOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     {
//       isOpened ? setIsOpened(false) : setIsOpened(true);
//     }
//   };

//   return (
//     <div className="flex flex-col relative">
//       <button
//         className="select border-2 border-black w-full"
//         onClick={handleOptionOpen}
//       >
//         {selectedValue}
//       </button>
//       {isOpened ? (
//         <div className="absolute bg-white">
//           {options.map((v, idx) => (
//             <div
//               key={idx}
//               className="hover:bg-light cursor-pointer rounded-2xl text-center"
//             >
//               {v}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }
