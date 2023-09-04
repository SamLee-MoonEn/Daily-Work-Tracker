import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { dailyWorkDataProps } from "../../interface/interface";

import Calendar from "./Calendar";

export default function ExportCSV({ data }: { data: dailyWorkDataProps[] }) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [onAfterDate, setOnAfterDate] = useState(new Date());
  const [exportData, setExportData] = useState([{}]);

  const headers = [
    { label: "요청지역", key: "region" },
    { label: "Customer", key: "customer" },
    { label: "요청사항", key: "content" },
    { label: "작업일자", key: "selectedDate" },
    { label: "HQ Owner", key: "owner" },
    { label: "유형", key: "type" },
    { label: "소요시간(min)", key: "timeTaken" },
    { label: "Remark", key: "remark" },
  ];

  useEffect(() => {
    if (isFiltered) {
      const filteredData = data.filter(
        (value) => new Date(value.selectedDate) >= onAfterDate
      );
      setExportData(filteredData);
    } else {
      setExportData(data);
    }
  }, [isFiltered, onAfterDate]);

  const setExportFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "true") {
      setIsFiltered(false);
    } else {
      setIsFiltered(true);
    }
  };

  return (
    <>
      <label
        htmlFor="work_export_modal"
        className="mr-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md p-2 transition-all"
      >
        Export
      </label>
      <input type="checkbox" id="work_export_modal" className="modal-toggle" />
      <div className="modal">
        <div className="p-5 bg-white rounded-lg shadow-2xl">
          <div className="flex justify-end">
            <label
              htmlFor="work_export_modal"
              className="cursor-pointer p-2 text-2xl"
            >
              X
            </label>
          </div>
          <div>
            <div className="mb-4">
              <label className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  className="radio mr-2"
                  name="filter"
                  value="true"
                  checked={!isFiltered}
                  onChange={setExportFilter}
                />
                <span>전체 데이터 출력</span>
              </label>
            </div>
            <div className="flex mb-4">
              <label className="cursor-pointer flex items-center w-36">
                <input
                  type="radio"
                  className="radio mr-2"
                  value="false"
                  name="filter"
                  checked={isFiltered}
                  onChange={setExportFilter}
                />
                <span>날짜 선택</span>
              </label>
              <Calendar
                disabled={!isFiltered}
                selectedDate={onAfterDate}
                handleDate={(date: Date) => setOnAfterDate(date)}
              ></Calendar>
            </div>
          </div>
          <div className="flex justify-end">
            <CSVLink
              headers={headers}
              data={exportData}
              onClick={() => {
                if (confirm("파일을 다운로드 받겠습니까?")) {
                  console.log(
                    `[Success] ExportData ${new Date()}: 데이터 출력 완료`
                  );
                  return true;
                } else {
                  return false;
                }
              }}
              filename="example"
              className="bg-light hover:bg-main text-white transition-all p-2 rounded-md "
            >
              Export
            </CSVLink>
          </div>
        </div>
      </div>
    </>
  );
}
