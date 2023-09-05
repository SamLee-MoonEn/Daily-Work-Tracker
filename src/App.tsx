import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import LoginPage from "./components/pages/LoginPage";
import WorkRegisterPage from "./components/pages/WorkRegisterPage";
import { RecoilRoot } from "recoil";
// import ListPage from "./components/pages/ListPage";
import WorkAnalysisPage from "./components/pages/WorkAnalysisPage";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<WorkRegisterPage />}></Route>
          {/* <Route path="/list" element={<ListPage />}></Route> */}
          <Route path="/analysis" element={<WorkAnalysisPage />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}
export default App;
