import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { dailyWorkDataProps } from "../../interface/interface";
import OptionSelector from "../common/OptionSelector";
import { REGIONS_OPTION, TYPE_OPTION } from "../constant/constant";
import { modifyDailyWork, deleteDailyWork } from "../../api/firebaseAPI";
import Calendar from "../common/Calendar";

const schema = yup.object({
  dataId: yup.string(),
  region: yup.string().required(),
  customer: yup.string().required(),
  type: yup.string().required(),
  helpdesk: yup.string().required(),
  owner: yup.string().required(),
  timeTaken: yup.number().min(1, "필수 입력 값입니다."),
  selectedDate: yup.date().required(),
  content: yup.string().required(),
  remark: yup.string().required("필수 입력 값입니다."),
});

export default function CompleteModal({
  selectedData,
  isOpen,
  selectedDataId,
  setIsOpen,
}: {
  selectedData: dailyWorkDataProps;
  isOpen: boolean;
  selectedDataId: string;
  setIsOpen: (value: boolean) => void;
}) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      dataId: selectedDataId,
      region: selectedData.region,
      customer: selectedData.customer,
      type: selectedData.type,
      helpdesk: selectedData.helpdesk,
      owner: selectedData.owner,
      timeTaken: selectedData.timeTaken,
      selectedDate: new Date(selectedData.selectedDate),
      content: selectedData.content,
      remark: selectedData.remark ? selectedData.remark : "",
    },
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();

  const modifyDailyWorkMutation = useMutation(modifyDailyWork, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDailyWorkData");
    },
  });
  const deleteDailyWorkMutation = useMutation(deleteDailyWork, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDailyWorkData");
    },
  });

  const handleSubmitData = (data: dailyWorkDataProps) => {
    modifyDailyWorkMutation.mutate({ id: selectedDataId, data });
    setIsOpen(false);
  };

  return (
    <dialog id="complete_modal" className="modal" open={isOpen}>
      <div className="p-1 bg-white rounded-lg shadow-2xl">
        <div className="flex justify-end">
          <button
            className="btn m-2 bg-transparent hover:bg-transparent border-0 text-2xl"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="grid grid-cols-5 grid-rows-4 gap-4 rounded-lg p-10"
        >
          <div className="w-full flex flex-col items-center">
            <label htmlFor="selectRegion" className="text-lg">
              요청 지역
            </label>
            <Controller
              name="region"
              control={control}
              defaultValue="HQ"
              render={({ field }) => (
                <OptionSelector
                  labelId="selectRegion"
                  selectedValue={field.value}
                  handleGetRegion={(value) => field.onChange(value)}
                  options={REGIONS_OPTION}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="inputCustomer" className="text-lg">
              고객
            </label>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="inputCustomer"
                  className="input border-2 border-black w-full"
                  placeholder="고객명을 입력해 주세요."
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="selectType" className="text-lg">
              유형
            </label>
            <Controller
              name="type"
              control={control}
              defaultValue="HQ"
              render={({ field }) => (
                <OptionSelector
                  labelId="selectType"
                  selectedValue={field.value}
                  handleGetRegion={(value) => field.onChange(value)}
                  options={TYPE_OPTION}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="selectHelpdesk" className="text-lg">
              헬프데스크
            </label>
            <Controller
              name="helpdesk"
              control={control}
              render={({ field }) => (
                <OptionSelector
                  labelId="selectHelpdesk"
                  selectedValue={field.value}
                  handleGetRegion={(value) => field.onChange(value)}
                  options={["불필요", "필요"]}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="inputOwner" className="text-lg">
              HQ Owner
            </label>
            <Controller
              name="owner"
              control={control}
              render={() => (
                <input
                  type="text"
                  id="inputOwner"
                  readOnly
                  className="input border-2 border-black w-full"
                  placeholder="사용자명 표시"
                  value={selectedData.owner}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label className="text-lg">요청 날짜</label>
            <Controller
              name="selectedDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  disabled={false}
                  selectedDate={field.value}
                  handleDate={(date: Date) => field.onChange(date)}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center col-span-4">
            <label htmlFor="inputContent" className="text-lg">
              요청 내용
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="inputContent"
                  className="h-12 rounded-lg border-2 border-black w-full pl-3"
                  placeholder="요청 내용을 입력해 주세요."
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="inputTimeTaken" className="text-lg">
              소요시간
            </label>
            <Controller
              name="timeTaken"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="inputTimeTaken"
                  className="input border-2 border-black w-full"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <div className="text-red-500 text-sm">
              {formState.errors.timeTaken?.message}
            </div>
          </div>
          <div className="w-full flex flex-col items-center col-span-4">
            <label htmlFor="inputRemark" className="text-lg">
              업무 진행 내용
            </label>
            <Controller
              name="remark"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="inputRemark"
                  className="h-12 rounded-lg border-2 border-black w-full pl-3"
                  placeholder="업무 진행한 내용을 입력해 주세요."
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <div className="text-red-500 text-sm">
              {formState.errors.remark?.message}
            </div>
          </div>
          <button className="btn text-white bg-light hover:bg-main border-0 col-start-4">
            변경
          </button>
          <button
            className="btn text-white bg-red-400 hover:bg-red-800 border-0 col-start-5"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              deleteDailyWorkMutation.mutate(selectedDataId);
            }}
          >
            삭제
          </button>
        </form>
      </div>
    </dialog>
  );
}
