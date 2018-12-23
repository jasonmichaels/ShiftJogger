export const returnDate = date => {
  const removeIndex = date.indexOf("T");
  const newDate = date.slice(0, removeIndex);
  return newDate;
};
