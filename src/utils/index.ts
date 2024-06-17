

const formatterNumber = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  });

const formatterDate = new Intl.DateTimeFormat("pt-AO", {
  dateStyle: "short",
  timeStyle: "short",
})

 export function convertAmountToCurrency(amount: number) {
    return formatterNumber.format(amount);
  }

  export function convertDate(date: Date) {
    return formatterDate.format(date);
  }