export const priceFormatter = (num: number) =>
  new Intl.NumberFormat("th", {
    style: "currency",
    currency: "THB",
  }).format(num);
