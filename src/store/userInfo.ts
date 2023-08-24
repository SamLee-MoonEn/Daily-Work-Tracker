import { atom } from "recoil";

export const userInfoState = atom({
  key: "user",
  default: { displayName: "", email: "", uid: "" },
  effects: [
    ({ onSet }) => {
      onSet((v) => localStorage.setItem("USER_UID", `${v.uid}`));
    },
  ],
});

export const userUidState = atom({
  key: "user_uid",
  default: "",
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem("USER_UID") &&
        setSelf(localStorage.getItem("USER_UID") as string);
      onSet((v) => localStorage.setItem("USER_UID", `${v}`));
    },
  ],
});
