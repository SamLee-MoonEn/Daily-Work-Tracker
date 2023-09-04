import styled from "styled-components";
import tw from "twin.macro";
import { getATicketInfo } from "../../api/freshDeskAPI";

export default function ListPage() {
  const handleTest = async () => {
    const response = await getATicketInfo();
    console.log(response.data);
  };

  return (
    <MainContainer>
      <div className="btn" onClick={handleTest}>
        리스트
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 192px;
  ${tw`w-11/12 text-black p-10`}
`;
