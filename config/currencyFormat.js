export const currencyFormat = (num) => {
  const options = {
    style: "currency",
    currency: "IDR",
  };
  return num.toLocaleString("id-ID", options);
};
