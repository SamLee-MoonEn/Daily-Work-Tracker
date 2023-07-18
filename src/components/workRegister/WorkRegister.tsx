import { useState, useEffect } from "react";
import { styled } from "styled-components";
import tw from "twin.macro";
import { useForm, Controller } from "react-hook-form";

import OptionSelector from "../common/OptionSelector";
import Calendar from "../common/Calendar";
import { regionOptions, typeOptions } from "../constant/constant";
import { dailyWorkDataProps } from "../../interface/interface";
import { getUserName, creatDailyWork } from "../../api/firebaseAPI";
import { makeUniqueId } from "../../helper/helper";
import WorkTable from "../common/WorkTable";

export default function WorkRegister() {
  const [hqOwner, setHqOwner] = useState("");
  const [dataId, setDataId] = useState("");
  const userUid = localStorage.getItem("USER_UID");
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      dataId: "",
      region: "HQ",
      customer: "",
      type: "HQ System",
      helpdesk: "불필요",
      owner: hqOwner,
      timeTaken: 0,
      selectedDate: new Date(),
      content: "",
    },
  });

  const getHqOwner = async () => {
    if (!userUid) return;
    const response = await getUserName(userUid);
    setHqOwner(response.name);
    setValue("owner", response.name);
  };

  const handleSubmitData = (data: dailyWorkDataProps) => {
    if (!userUid) return;
    creatDailyWork(dataId, data);
    reset();
  };

  const handleResetData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  };
  useEffect(() => {
    if (userUid === null) return;
    getHqOwner();
    setDataId(makeUniqueId(userUid));
  }, [userUid]);

  return (
    <MainContainer>
      <div className="text-2xl ml-10 mt-10 text-black">업무 등록 페이지</div>
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
            defaultValue="HQ"
            render={({ field }) => (
              <OptionSelector
                labelId="selectRegion"
                selectedValue={field.value}
                handleGetRegion={(value) => field.onChange(value)}
                options={regionOptions}
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
                options={typeOptions}
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
        </div>
        <button className="btn text-white bg-light hover:bg-primary border-0 col-start-3">
          등록
        </button>
        <button
          className="btn text-white bg-red-400 hover:bg-red-800 border-0 col-start-4"
          onClick={handleResetData}
        >
          취소
        </button>
      </form>
      <WorkTable userName={hqOwner} />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 192px;
  ${tw`w-11/12 text-black p-10`}
`;
