import { useState, useEffect } from "react";
import { styled } from "styled-components";
import tw from "twin.macro";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Calendar from "../common/Calendar";
import {
  REGIONS_OPTION,
  TYPE_DESCRIPTION,
  TYPE_OPTION,
} from "../constant/constant";
import { dailyWorkDataProps } from "../../interface/interface";
import {
  getUserName,
  creatDailyWork,
  getDailyWorkFromDB,
} from "../../api/firebaseAPI";
import { makeUniqueId } from "../../helper/helper";
import WorkTable from "./WorkTable";
import CreateCSVButton from "../common/CreateCSV";
import CsvReader from "../common/CsvReader";
import Loading from "../common/Loading";
import ImportWorkModal from "./ImportWorkModal";
import ExportCSV from "../common/ExportCSV";
import CustomOptionSelector from "../common/CustomOptionSelector";

export default function WorkRegister() {
  const [hqOwner, setHqOwner] = useState("");
  const [userUid, setUserUid] = useState("");
  const [filteredData, setFilteredData] = useState<dailyWorkDataProps[]>([]);
  const [importData, setImportData] = useState<[]>([]);
  const [importModalIsOpen, setImportModalIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const schema = yup.object({
    dataId: yup.string(),
    region: yup.string().required(),
    customer: yup.string().required("필수 입력 값입니다."),
    type: yup.string().required(),
    helpdesk: yup.string().required(),
    owner: yup.string().required(),
    timeTaken: yup.number(),
    selectedDate: yup.date().required(),
    content: yup.string().required("필수 입력 값입니다."),
    remark: yup.string(),
  });

  const { control, handleSubmit, reset, setValue, formState, getValues } =
    useForm({
      defaultValues: {
        dataId: "",
        region: "HQ",
        customer: "",
        type: "Parts",
        helpdesk: "불필요",
        owner: hqOwner,
        timeTaken: 0,
        selectedDate: new Date(),
        content: "",
        remark: "",
      },
      resolver: yupResolver(schema),
    });

  const getHqOwner = async (uid: string) => {
    if (!uid) return;
    setTimeout(() => {
      const response = getUserName(uid);
      response.then((result) => {
        setHqOwner(result.name);
        setValue("owner", result.name);
      });
    }, 1000);
  };

  const {} = useQuery("getDailyWorkData", getDailyWorkFromDB, {
    enabled: hqOwner !== "",
    onSuccess: (data) => {
      const dailyWork: dailyWorkDataProps[] = Object.values(data);
      const ownerFilteredData = dailyWork.filter((v) => v.owner === hqOwner);
      const sortedData = ownerFilteredData.sort(
        (a, b) =>
          new Date(b.selectedDate).getTime() -
          new Date(a.selectedDate).getTime()
      );
      setFilteredData(sortedData);
    },
  });

  const handleCreatDailyWork = useMutation(creatDailyWork, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDailyWorkData");
    },
  });

  const handleSubmitData = (data: dailyWorkDataProps) => {
    if (!userUid) return;
    handleCreatDailyWork.mutate({ id: makeUniqueId(userUid), data });
    reset();

    getHqOwner(userUid);
  };

  const handleResetData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    getHqOwner(userUid);
  };

  const handleSetImportData = (result: any) => {
    setImportData(result.data);
    setImportModalIsOpen(true);
  };

  useEffect(() => {
    setUserUid(localStorage.getItem("USER_UID") as string);
    getHqOwner(userUid);
  }, [userUid]);

  return (
    <MainContainer>
      <Loading loadingTime={1500} />
      <div className="text-2xl ml-10 mt-10 text-black flex justify-between items-center">
        <div>업무 등록 페이지</div>
        <div className="text-sm flex justify-center items-center">
          <CsvReader handleSetImportData={handleSetImportData} />
          <ExportCSV data={filteredData} />
          <CreateCSVButton />
          <ImportWorkModal
            isOpen={importModalIsOpen}
            setIsOpen={setImportModalIsOpen}
            importData={importData}
            setImportData={setImportData}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className="grid grid-cols-4 grid-rows-2 gap-4 mt-10 border border-solid border-gray-500 rounded-lg p-10"
      >
        <div className="w-full flex flex-col items-center">
          <label htmlFor="selectRegion" className="text-lg">
            요청 지역
          </label>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <CustomOptionSelector
                defaultValue={getValues().region}
                labelId="selectRegion"
                options={REGIONS_OPTION}
                isTooltip={false}
                tooltipDescription={null}
                handleGetValue={(value) => field.onChange(value)}
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
          <div className="text-red-500 text-sm">
            {formState.errors.customer?.message}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="selectType" className="text-lg">
            유형
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <CustomOptionSelector
                defaultValue={getValues().type}
                labelId="selectType"
                options={TYPE_OPTION}
                isTooltip={true}
                tooltipDescription={TYPE_DESCRIPTION}
                handleGetValue={(value) => field.onChange(value)}
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
              <CustomOptionSelector
                defaultValue={getValues().helpdesk}
                labelId="selectHelpdesk"
                options={["불필요", "필요"]}
                isTooltip={false}
                tooltipDescription={null}
                handleGetValue={(value) => field.onChange(value)}
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
                value={hqOwner}
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
        <div className="w-full flex flex-col items-center col-span-2">
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
          <div className="text-red-500 text-sm">
            {formState.errors.content?.message}
          </div>
        </div>
        <button className="btn text-white bg-light hover:bg-main border-0 col-start-3">
          등록
        </button>
        <button
          className="btn text-white bg-red-400 hover:bg-red-800 border-0 col-start-4"
          onClick={handleResetData}
        >
          취소
        </button>
      </form>
      <WorkTable filteredData={filteredData} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 192px;
  ${tw`w-11/12 text-black p-10`}
`;
