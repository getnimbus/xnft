import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import numeral from "numeral";
import {
  formatBigBalance,
  formatPercent,
  formatCurrency,
  formatValue,
} from "../utils";

type Props = {
  type: "amount" | "balance" | "percent" | "value";
  number: number;
};

const convertMiniumNumber = (number: any) => {
  if (number.toString().includes("e-")) {
    const numStr = number.toString();
    const eIndex = numStr.indexOf("e");
    if (eIndex !== -1) {
      const exponent = parseInt(numStr.slice(eIndex + 2), 10);
      const significand = parseFloat(
        numStr
          .slice(0, 4)
          .split("")
          .filter((e: any) => e != ".")
          .join("")
      );

      return `0.0<sub>${exponent - 1}</sub>${significand}`;
    }
  } else {
    return number;
  }
};

export default function Number({ type, number }: Props) {
  const [numberFormat, setNumberFormat] = useState<any>(0);
  const [numberSize, setNumberSize] = useState<string>("");

  useEffect(() => {
    const { number_format, number_size } = formatBigBalance(number);
    setNumberFormat(number_format);
    setNumberSize(number_size);
  }, [number]);

  return (
    <View>
      {type === "percent" ? (
        <Text>
          {formatPercent(number) === "NaN" ? 0 : formatPercent(number)}
        </Text>
      ) : (
        <View>
          {(numberSize && numberSize !== "K") ||
          formatPercent(number) === "NaN" ? (
            <View style={tw`flex items-center`}>
              <View>
                {type === "value" ? "$" : ""}
                {numeral(numberFormat).format("0,0.00") === "NaN" ? (
                  <View>{convertMiniumNumber(numberFormat)}</View>
                ) : (
                  <View>{numeral(numberFormat).format("0,0.00")}</View>
                )}
              </View>
              <View>{numberSize}</View>
            </View>
          ) : (
            <View>
              {type === "value" ? (
                <View>
                  {number !== 0 && number > 0 && number < 0.01 ? (
                    <View>{formatValue(number)}</View>
                  ) : (
                    <View> {formatValue(number)}</View>
                  )}
                </View>
              ) : (
                <View> {formatCurrency(number)}</View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
