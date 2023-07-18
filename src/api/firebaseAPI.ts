import { initializeApp } from "firebase/app";
import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  dailyWorkDataProps,
  dailyWorkUpdatesProps,
  userInfoProps,
  userInfoUpdatesProps,
} from "../interface/interface";
import { getDatabase, update, ref, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAQEwyj1V0rqEzlh_rQKEsfaHfd8jN_Eg",
  authDomain: "daily-work-tracker-c16a3.firebaseapp.com",
  databaseURL: "https://daily-work-tracker-c16a3-default-rtdb.firebaseio.com",
  projectId: "daily-work-tracker-c16a3",
  storageBucket: "daily-work-tracker-c16a3.appspot.com",
  messagingSenderId: "233521291208",
  appId: "1:233521291208:web:4ee2999740fc909e7e2afd",
  measurementId: "G-F2PLZ3X4NT",
};

const app = initializeApp(firebaseConfig);
const firebasedb = getDatabase(app);
const auth = getAuth();
// microsoft 로그인
export const handleMicrosoftLogin = async () => {
  try {
    const provider = new OAuthProvider("microsoft.com");
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(`[Error] handleMicrosoftLogin ${new Date()}: ${error}`);
  }
};
// 계정 데이터 등록
export const createNewAccount = async (userInfo: userInfoProps) => {
  try {
    const updates: userInfoUpdatesProps = {};
    updates[`${userInfo.uid}`] = {
      name: userInfo.displayName,
      email: userInfo.email,
    };
    update(ref(firebasedb), updates);
    console.log(`[Success] createNewAccount ${new Date()}: 계정등록 완료`);
  } catch (error) {
    console.error(`[Error] createNewAccount ${new Date()}: ${error}`);
  }
};
// 계정 데이터 불러오기
export const getUserName = async (uid: string) => {
  try {
    const data = await get(child(ref(firebasedb), `${uid}/`));
    return data.val();
  } catch (error) {
    console.error(`[Error] getAccount ${new Date()}: ${error}`);
  }
};

// Daily Work 등록
export const creatDailyWork = async (id: string, data: dailyWorkDataProps) => {
  try {
    const updates: dailyWorkUpdatesProps = {};
    updates[`work/${id}`] = {
      dataId: id,
      region: data.region,
      customer: data.customer,
      type: data.type,
      helpdesk: data.helpdesk,
      owner: data.owner,
      timeTaken: 0,
      selectedDate: data.selectedDate,
      content: data.content,
    };
    update(ref(firebasedb), updates);
    console.log(`[Success] creatDailyWork ${new Date()}: 업데이트 완료`);
  } catch (error) {
    console.error(`[Error] creatDailyWork ${new Date()}: ${error}`);
  }
};

// Daily Work 가져오기
export const getDailyWorkFromDB = async () => {
  try {
    const data = await get(child(ref(firebasedb), `/work`));
    if (!data.exists()) {
      console.warn(
        `Warning] getDailyWorkFromDB ${new Date()}: 데이터가 없습니다.`
      );
      return {};
    }
    return data.val();
  } catch (error) {
    console.error(`[Error] getDailyWorkFromDB ${new Date()}: ${error}`);
  }
};
