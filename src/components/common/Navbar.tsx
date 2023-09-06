import { NavLink } from "react-router-dom";

import kohyoungIcon from "../../assets/kohyoung_icon.png";

export default function Navbar() {
  return (
    <nav className="relative">
      <div className="h-screen w-1/12 min-w-max fixed top-0 left-0 bg-main">
        <div className="flex flex-col mt-10 text-sm md:text-lg">
          <NavLink
            to="/"
            className="flex justify-center mb-10 items-center mx-2"
          >
            <img src={kohyoungIcon} className="w-10" />
            <span className="text-white ml-1 text-sm">Daily Work Tracker</span>
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                isActive ? "text-black bg-gray-300" : "text-white"
              }`
            }
          >
            <span>업무 등록</span>
          </NavLink>
          {/* <NavLink
            to="/list"
            className={({ isActive }) =>
              `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                isActive ? "text-black bg-gray-300" : "text-white"
              }`
            }
          >
            <span>업무 리스트</span>
          </NavLink> */}
          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              `p-4 hover:bg-gray-300 hover:text-black transition-all text-center ${
                isActive ? "text-black bg-gray-300" : "text-white"
              }`
            }
          >
            <span>업무 분석</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
