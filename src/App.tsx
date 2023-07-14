import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import LoginPage from "./components/pages/LoginPage";
import WorkRegisterPage from "./components/pages/WorkRegisterPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<WorkRegisterPage />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}
export default App;
