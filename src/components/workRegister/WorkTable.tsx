import { useState } from "react";

import { dailyWorkDataProps } from "../../interface/interface";
import WorkTableRow from "./WorkTableRow";
import CompleteModal from "./CompleteModal";

export default function WorkTable({
  filteredData,
}: {
  filteredData: dailyWorkDataProps[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState("");

  const showModal = (dataId: string) => {
    setIsOpen(true);
    setSelectedDataId(dataId);
  };

  return (
    <>
      <div className="overflow-x-auto mt-10 rounded-lg overflow-hidden">
        <table className="table table-pin-rows -z-0">
          <thead>
            <tr className="text-black bg-gray-200 text-center text-sm">
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
      </div>
      {filteredData.map((data, idx) =>
        data.dataId === selectedDataId ? (
          <CompleteModal
            key={idx}
            selectedData={data}
            isOpen={isOpen}
            selectedDataId={selectedDataId}
            setIsOpen={setIsOpen}
          />
        ) : (
          <div key={idx}></div>
        )
      )}
    </>
  );
}
