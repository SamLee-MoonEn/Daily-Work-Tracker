import { styled } from "styled-components";
import tw from "twin.macro";

import OptionSelector from "../common/OptionSelector";
import Calendar from "../common/Calendar";

export default function WorkRegister() {
  return (
    <MainContainer>
      <div className="text-2xl ml-10 mt-10 text-black">업무 등록 페이지</div>
      <form className="grid grid-cols-4 gap-4 mt-10 border border-solid border-gray-500 rounded-lg p-10">
        <div className="w-full flex flex-col items-center">
          <label htmlFor="selectRegion" className="text-lg">
            요청 지역
          </label>
          <OptionSelector labelId="selectRegion" options={regionOptions} />
        </div>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="inputCustomer" className="text-lg">
            고객
          </label>
          <input
            type="text"
            id="inputCustomer"
            className="input border-2 border-black w-full"
            placeholder="고객명을 입력해 주세요."
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="selectType" className="text-lg">
            유형
          </label>
          <OptionSelector labelId="selectType" options={typeOptions} />
        </div>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="selectHelpdesk" className="text-lg">
            유형
          </label>
          <OptionSelector
            labelId="selectHelpdesk"
            options={["불필요", "필요"]}
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="inputOwner" className="text-lg">
            HQ Owner
          </label>
          <input
            type="text"
            id="inputOwner"
            className="h-12 rounded-lg border-2 border-black w-full pl-3 placeholder:text-black"
            placeholder="사용자명 표시"
            disabled
          />
        </div>
        <Calendar />
      </form>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  ${tw`w-11/12 ml-auto text-black p-10`}
`;
const regionOptions = ["HQ", "KYA", "KYC", "KYE", "KYSEA", "JKY", "Intel"];
const typeOptions = [
  "HQ System",
  "Cooperation",
  "Manual",
  "Setting",
  "Parts",
  "Remote",
  "Resolution",
  "Back up image",
  "Spec",
  "Sample Test",
  "ETC",
];
