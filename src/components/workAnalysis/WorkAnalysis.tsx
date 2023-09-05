import { styled } from "styled-components";
import tw from "twin.macro";

export default function WorkAnalysis() {
  return (
    <MainContainer>
      <iframe
        title="Non CRM 업무 정리_2022.04.01"
        className="w-full h-[93vh] mt-2"
        src="https://app.powerbi.com/reportEmbed?reportId=b21f8186-bc32-4d03-bafc-05435aaf0ff9&autoAuth=true&ctid=676ac0b7-276a-4e65-82ad-f13e2c55cf8c"
        allowFullScreen={true}
      ></iframe>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 192px;
  ${tw`w-11/12 text-black p-5`}
`;
