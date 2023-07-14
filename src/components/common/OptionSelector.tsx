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
