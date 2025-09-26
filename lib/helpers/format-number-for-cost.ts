export const formatNumberForMoney = (num: number): string | undefined => {
  if (num === undefined) {
    return undefined;
  }

  let strNum: string | undefined = undefined;

  if (num % 1 === 0) {
    strNum = num.toFixed(0); // No decimals, return as an integer
  } else {
    strNum = num.toFixed(2); // Ensure two decimal places
  }

  return strNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
