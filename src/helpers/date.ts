export const pDate = (date = new Date()) => date.toISOString().slice(0, 10);
export const pDateTime = (date = new Date()) => date.toLocaleString();

export const toBegin = (date = new Date()) => {
  const tmpDate = new Date(date);
  tmpDate.setUTCHours(0, 0, 0, 0);
  return tmpDate;
};

export const toEnd = (date = new Date()) => {
  const tmpDate = new Date(date);
  tmpDate.setUTCHours(23, 59, 60, 0);
  return tmpDate;
};
