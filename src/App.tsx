import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import LoginPage from "./components/pages/LoginPage";
import WorkRegisterPage from "./components/pages/WorkRegisterPage";
import { RecoilRoot } from "recoil";
import WorkAnalysisPage from "./components/pages/WorkAnalysisPage";
import { ProtectedRoute } from "./helper/helper";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/register" element={<WorkRegisterPage />}></Route>
            <Route path="/analysis" element={<WorkAnalysisPage />}></Route>
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}
export default App;
