/* const formatterNumber = new Intl.NumberFormat("pt-AO", {
  style: "currency",
  currency: "AOA",
}); */

export function convertAmountToCurrency(amount: number) {
  return amount.toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA",
  });

  //return formatterNumber.format(amount);
}

export function convertDate(date: Date | string) {
  const _date_ = new Date(date);
  return _date_.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  //return formatterDate.format(date);
}
