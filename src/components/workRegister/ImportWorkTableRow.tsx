export default function ImportWorkTableRow({ data }: { data: string[] }) {
  return (
    <tr className="hover:bg-light hover:text-white transition-all w-full">
      <td className="truncate text-center">{data[0]}</td>
      <td className="truncate">{data[1]}</td>
      <td className="truncate">{data[2]}</td>
      <td className="truncate">{data[3]}</td>
      <td className="truncate">{data[4]}</td>
      <td className="truncate text-center">{data[5]}</td>
      <td className="truncate text-center">{data[6]}</td>
      <td className="truncate">{data[7]}</td>
      <td className="truncate">{data[8]}</td>
    </tr>
  );
}
