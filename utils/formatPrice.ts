interface IFormatPrice {
  currency: "USD" | "EUR";
  amount: number;
}

export const formatPrice = ({ amount, currency }: IFormatPrice) => {
  const formatedPrice = new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
  }).format(amount);

  return formatedPrice;
};
