import { useMutation, useQueryClient } from "react-query";

import { creatMassDailyWork } from "../../api/firebaseAPI";
import ImportWorkTable from "./ImportWorkTable";

export default function ImportWorkModal({
  importData,
  isOpen,
  setIsOpen,
  setImportData,
  userUid,
}: {
  importData: [];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setImportData: (value: []) => void;
  userUid: string | null;
}) {
  const queryClient = useQueryClient();

  // 등록한 함수 변경 필요.
  const creatMassDailyWorkMutation = useMutation(creatMassDailyWork, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDailyWorkData");
    },
  });

  return (
    <dialog id="complete_modal" className="modal overflow-scroll" open={isOpen}>
      <div className="p-1 bg-white rounded-lg shadow-2xl modal-box max-w-max">
        <form
        // onSubmit={handleSubmit(handleSubmitData)}
        >
          {importData.length === 0 ? (
            <></>
          ) : (
            <ImportWorkTable importData={importData} />
          )}
          <div className="my-2 flex justify-end">
            <button
              className="btn text-white bg-light hover:bg-main border-0 mr-2 w-32"
              onClick={(e) => {
                e.preventDefault();
                creatMassDailyWork(importData);
                setIsOpen(false);
                setImportData([]);
              }}
            >
              변경
            </button>
            <button
              className="btn text-white bg-red-400 hover:bg-red-800 border-0 mr-2 w-32"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setImportData([]);
              }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
