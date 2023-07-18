import { useCallback, useEffect, useState } from "react";

import { getDailyWorkFromDB } from "../../api/firebaseAPI";
import {
  dailyWorkDataProps,
  dailyWorkWithKeyDataProps,
} from "../../interface/interface";
import WorkTableRow from "./WorkTableRow";

export default function WorkTable({ userName }: { userName: string }) {
  const [filteredData, setFilteredData] = useState<dailyWorkDataProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState("");

  const getDailyWorkData = useCallback(async () => {
    const response: dailyWorkWithKeyDataProps = await getDailyWorkFromDB();
    const dailyWork: dailyWorkDataProps[] = Object.values(response);
    const ownerFilteredData = dailyWork.filter((v) => v.owner === userName);
    const sortedData = ownerFilteredData.sort(
      (a, b) =>
        new Date(b.selectedDate).getTime() - new Date(a.selectedDate).getTime()
    );
    setFilteredData(sortedData);
  }, [userName]);

  const showModal = (dataId: string) => {
    setIsOpen(true);
    setSelectedDataId(dataId);
  };

  useEffect(() => {
    getDailyWorkData();
  }, [getDailyWorkData]);

  return (
    <div className="overflow-x-auto mt-10 rounded-lg overflow-hidden">
      <table className="table table-pin-rows -z-0">
        <thead className="text-black bg-gray-300 text-center text-sm">
          <tr>
            <th>요청 지역</th>
            <th>고객</th>
            <th>유형</th>
            <th>헬프데스크</th>
            <th>HQ Owner</th>
            <th>요청 날짜</th>
            <th>소요시간</th>
            <th>요청 내용</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredData.map((v, idx) => (
            <WorkTableRow key={idx} work={v} showModal={showModal} />
          ))}
        </tbody>
      </table>
      <dialog id="complete_modal" className="modal" open={isOpen}>
        <form method="dialog" className="modal-box bg-white">
          <label>test</label>
          {filteredData.map((v) =>
            v.dataId === selectedDataId ? <div>{v.content}</div> : <></>
          )}
          <button onClick={() => setIsOpen(false)} className="btn">
            close
          </button>
        </form>
      </dialog>
    </div>
  );
}
