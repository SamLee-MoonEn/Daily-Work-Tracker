import { useCSVReader } from "react-papaparse";

export default function CsvReader({
  handleSetImportData,
}: {
  handleSetImportData: (result: any) => void;
}) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={handleSetImportData}>
      {({ getRootProps }: any) => (
        <>
          <div>
            <button
              type="button"
              {...getRootProps()}
              className="mr-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md p-2 transition-all"
            >
              Import
            </button>
          </div>
        </>
      )}
    </CSVReader>
  );
}
