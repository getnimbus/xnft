import numeral from "numeral";

export const shorterAddress = (string: string) => {
  return string ? string.slice(0, 6) + "..." + string.substr(-4) : string;
};

export const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const formatNumberSmall = (scientificNotation: any) => {
  const num = parseFloat(scientificNotation);
  const eIndex = num.toString().indexOf("e");
  const exponent = parseInt(num.toString().slice(eIndex + 2), 10);
  const significand = parseFloat(
    num.toString()
      .slice(0, eIndex)
      .slice(0, 4)
      .split("")
      .filter((e) => {
        return e !== "."
      })
      .join("")
  );

  if (isNaN(num)) {
    return "NaN";
  }

  let formatarr = ["0", '.'];
  for (let i = 0; i < exponent - 1; i++) {
    formatarr.push("0")
  }
  const formatString = formatarr.join("").toString()
  const formattedNum = formatString + significand
  return formattedNum;
}

export const formatValue = (input: number) => {
  return numeral(input).format("0,0.00") === "NaN"
    ? formatNumberSmall(input)
    : input !== 0 && input > 0 && input < 0.01 ? "<$0.01" : numeral(input).format("$0,0.00");
};

export const formatCurrency = (input: number) => {
  return numeral(input).format("0,0.000000") === "NaN"
    ? formatNumberSmall(input)
    : input !== 0 && input > 0 && input < 0.01 ? numeral(input).format("0,0.000000") : numeral(input).format("0,0.0000");
};

export const formatPercent = (input: number) => {
  return numeral(input).format("0,0.00")
}

export const formatSmallBalance = (input: number) => {
  return numeral(input).format("0.000e+0");
};

export const formatBigBalance = (input: number) => {
  if (formatPercent(input) === "NaN") {
    return {
      number_format: formatSmallBalance(input),
      number_size: ""
    }
  } else {
    const regExp = /[a-zA-Z]/g;
    const numberFormat = numeral(input).format("0.00a")
    if (regExp.test(numberFormat)) {
      return {
        number_format: Number(numberFormat.slice(0, -1)),
        number_size: numberFormat.slice(-1).toUpperCase()
      }
    } else {
      return {
        number_format: Number(numberFormat),
        number_size: ""
      }
    }
  }
}

