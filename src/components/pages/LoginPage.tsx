import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import tw from "twin.macro";

import microsoftLoginIcon from "../../assets/ms-symbollockup_signin_light.png";
import { createNewAccount, handleMicrosoftLogin } from "../../api/firebaseAPI";
import { userInfoState } from "../../store/userInfo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfoState);

  const handleLogin = async () => {
    try {
      const userInfo = await handleMicrosoftLogin();
      setUser({
        displayName: userInfo?.displayName as string,
        email: userInfo?.email as string,
        uid: userInfo?.uid as string,
      });
      await createNewAccount(user);
      localStorage.setItem("isLogin", "true");
      navigate("/register");
      console.log(`[Success] handleLogin ${new Date()}: Login Successful`);
    } catch (error) {
      console.error(`[Error] handleLogin ${new Date()}: ${error}`);
    }
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem("isLogin") || "false";
    const loginUid = localStorage.getItem("USER_UID") || "";
    if (loginUid && JSON.parse(loginCheck)) {
      navigate("/register");
      console.log(`[Success] Login ${new Date()}: Already logged in`);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <MainContainer>
      <div className="mx-auto mt-96 w-fit">
        <button onClick={handleLogin}>
          <img src={microsoftLoginIcon} />
        </button>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  ${tw`w-11/12 ml-auto`}
`;
