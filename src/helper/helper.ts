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
