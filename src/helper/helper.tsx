import { Navigate, Outlet } from "react-router-dom";

export const makeUniqueId = (uid: string) => {
  const random = Math.floor(Math.random() * 100000000);
  return `${uid}-${random}${new Date().getTime()}`;
};

export const makeFormattedDate = (date: Date) => {
  const tempDate = new Date(date);
  return `${tempDate.getFullYear()}년 ${
    tempDate.getMonth() + 1
  }월 ${tempDate.getDate()}일`;
};

export function ProtectedRoute() {
  const isLogin: boolean = localStorage.getItem("isLogin") === "true";
  return isLogin ? <Outlet /> : <Navigate to="/" />;
}
