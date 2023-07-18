import { Link } from "react-router-dom";

import kohyoungIcon from "../../assets/kohyoung_icon.png";

export default function Navbar() {
  return (
    <nav className="relative">
      <div className="h-screen w-1/12 min-w-max fixed top-0 left-0 bg-primary">
        <div className="flex flex-col mt-10 text-sm md:text-lg">
          <Link to="/" className="flex justify-center mb-10 items-center mx-2">
            <img src={kohyoungIcon} className="w-10" />
            <span className="text-white ml-1 text-sm">Daily Work Tracker</span>
          </Link>
          <Link
            to="/register"
            className="p-4 text-white hover:bg-gray-300 hover:text-black transition-all text-center"
          >
            <span>업무 등록</span>
          </Link>
          <button className="p-4 text-white hover:bg-gray-300 hover:text-black transition-all">
            업무 리스트
          </button>
          <button className="p-4 text-white hover:bg-gray-300 hover:text-black transition-all">
            업무 통계
          </button>
        </div>
      </div>
    </nav>
  );
}
