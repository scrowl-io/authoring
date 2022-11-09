export const addLeadZero = (val: number | string) => {
  return `0${val}`.slice(-2);
};

export const getTimestamp = () => {
  const now = new Date();
  const stampYear = now.getUTCFullYear();
  const stampMonth = addLeadZero(now.getUTCMonth() + 1);
  const stampDate = addLeadZero(now.getUTCDate());
  const stampHours = addLeadZero(now.getUTCHours());
  const stampMins = addLeadZero(now.getUTCMinutes());
  const stampSecs = addLeadZero(now.getUTCSeconds());

  return `${stampYear}-${stampMonth}-${stampDate} ${stampHours}:${stampMins}:${stampSecs}`;
};

export const getDateStamp = () => {
  const now = new Date();
  const stampYear = now.getUTCFullYear();
  const stampMonth = addLeadZero(now.getUTCMonth() + 1);
  const stampDate = addLeadZero(now.getUTCDate());

  return `${stampYear}-${stampMonth}-${stampDate}`;
};

export const getDateStampLocal = () => {
  const now = new Date();
  const stampYear = now.getFullYear();
  const stampMonth = addLeadZero(now.getMonth() + 1);
  const stampDate = addLeadZero(now.getDate());

  return `${stampYear}-${stampMonth}-${stampDate}`;
};

export default {
  getTimestamp,
  getDateStamp,
  getDateStampLocal,
  addLeadZero,
};