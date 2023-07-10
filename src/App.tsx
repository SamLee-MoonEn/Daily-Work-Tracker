import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import LoginPage from "./components/pages/LoginPage";
import WorkRegisterPage from "./components/pages/WorkRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<WorkRegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
