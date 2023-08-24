import ImportWorkTableRow from "./ImportWorkTableRow";

export default function ImportWorkTable({
  importData,
}: {
  importData: string[][];
}) {
  return (
    <div className="overflow-x-auto mt-10 rounded-lg overflow-hidden">
      <table className="table table-pin-rows -z-0">
        <thead className="text-black bg-gray-300 text-center text-xs">
          <tr>
            <th>{importData[0][0]}</th>
            <th>{importData[0][1]}</th>
            <th>{importData[0][2]}</th>
            <th>{importData[0][3]}</th>
            <th>{importData[0][4]}</th>
            <th>{importData[0][5]}</th>
            <th>{importData[0][6]}</th>
            <th>{importData[0][7]}</th>
            <th>{importData[0][8]}</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {importData.map((v, idx) => {
            if (idx === 0 || v.length === 1) return;
            return <ImportWorkTableRow key={idx} data={v}></ImportWorkTableRow>;
          })}
        </tbody>
      </table>
    </div>
  );
}
