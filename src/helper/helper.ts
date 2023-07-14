export const makeUniqueId = (uid: string) => {
  const random = Math.floor(Math.random() * 100000000);
  return `${uid}-${random}${new Date().getTime()}`;
};
