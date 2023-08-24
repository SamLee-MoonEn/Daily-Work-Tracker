import { CSVLink } from "react-csv";

export default function CreateCSVButton() {
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
  const exampleData = [
    {
      region: "예시",
      customer: "예시",
      content: "",
      selectedDate: "",
      owner: "",
      type: "예시",
      timeTaken: "",
      remark: "",
    },
  ];
  return (
    <CSVLink
      data={exampleData}
      headers={headers}
      onClick={() => {
        if (confirm("파일을 다운로드 받겠습니까?")) {
          return true;
        } else {
          return false;
        }
      }}
      filename="example"
      className="bg-gray-500 hover:bg-gray-700 text-white transition-all p-2 rounded-md "
    >
      예시 파일 다운로드
    </CSVLink>
  );
}
