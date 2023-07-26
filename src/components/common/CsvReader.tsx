import { useCSVReader } from "react-papaparse";

export default function CsvReader() {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={(result: any) => console.log(result)}>
      {({ getRootProps, getRemoveFileProps }: any) => (
        <>
          <div>
            <button type="button" {...getRootProps()}>
              Browse file
            </button>
            <button {...getRemoveFileProps()}>Remove</button>
          </div>
        </>
      )}
    </CSVReader>
  );
}
