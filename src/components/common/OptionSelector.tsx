export default function OptionSelector({
  labelId,
  options,
}: {
  labelId: string;
  options: string[];
}) {
  return (
    <select id={labelId} className="select border-2 border-black w-full">
      {options.map((v, idx) => (
        <option value={v} key={idx}>
          {v}
        </option>
      ))}
    </select>
  );
}
