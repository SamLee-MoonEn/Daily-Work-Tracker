import { makeFormattedDate } from "../../helper/helper";
import { dailyWorkDataProps } from "../../interface/interface";

export default function WorkTableRow({
  work,
  showModal,
}: {
  work: dailyWorkDataProps;
  showModal: (dataId: string) => void;
}) {
  const formattedDate = makeFormattedDate(work.selectedDate);

  return (
    <>
      <tr
        className={`cursor-pointer hover:bg-light hover:rounded-lg hover:text-white transition-all text-center ${
          work.timeTaken === 0 ? "text-red-400" : null
        }`}
        onClick={() => showModal(work.dataId as string)}
      >
        <td>{work.region}</td>
        <td>{work.customer}</td>
        <td>{work.type}</td>
        <td>{work.helpdesk}</td>
        <td>{work.owner}</td>
        <td>{formattedDate}</td>
        <td>{work.timeTaken}</td>
        <td>{work.content}</td>
      </tr>
    </>
  );
}
