import { useState } from "react";
import { View, Image, Text, TouchableOpacity, Clipboard } from "react-native";
import tw from "twrnc";
import { wait } from "../utils";

import Logo from "../../assets/logo.svg";
import Premium from "../../assets/premium.svg";
import Diamond from "../../assets/diamond.svg";
import Copy from "../../assets/copy.svg";
import Check from "../../assets/check.svg";

type Props = {
  isRedeem?: boolean;
  redeemData?: any;
  handleRedeem: (data: any) => void;
};

export default function RedeemCard({
  isRedeem = false,
  redeemData,
  handleRedeem,
}: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    Clipboard.setString(`${redeemData?.code}`);
    setIsCopied(true);
    await wait(1000);
    setIsCopied(false);
  };

  return (
    <View
      style={tw`py-[16px] max-w-[335px] bg-white rounded-[16px] gap-[20px]`}
    >
      <View style={tw`px-[16px] flex-row items-center gap-[47px]`}>
        <Image
          source={{ uri: redeemData?.logo || Logo }}
          style={tw`w-[55px] h-[50px]`}
        />
        <View style={tw`flex-1 gap-1`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image source={{ uri: Premium }} style={tw`w-[16px] h-[16px]`} />
            <Text style={tw`text-[#FFB800] text-base font-medium`}>
              Premium
            </Text>
          </View>
          <Text style={tw`text-[#131313] text-4xl font-normal`}>
            {redeemData?.title}
          </Text>
          <Text style={tw`text-[#131313] text-sm font-normal`}>
            {redeemData?.description}
          </Text>
        </View>
      </View>
      <View style={tw`relative bg-white border border-dashed border-[#27326F]`}>
        <View
          style={tw`absolute rounded-full w-[30px] h-[30px] bg-[#27326F] -top-[14px] -left-4`}
        ></View>
        <View
          style={tw`absolute rounded-full w-[30px] h-[30px] bg-[#27326F] -top-[14px] -right-4`}
        ></View>
      </View>
      <View style={tw`px-[16px]`}>
        {isRedeem ? (
          <View style={tw`flex-row items-center gap-[47px]`}>
            <Text style={tw`w-[55px] text-[#131313CC] text-sm font-normal`}>
              {redeemData?.remains} left
            </Text>

            {redeemData?.remains === 0 ? (
              <View
                style={tw`flex-row items-center gap-[46px] py-[12px] px-[16px] bg-[#9ca3af] rounded-[12px]`}
              >
                <View style={tw`flex-row items-center gap-[4px]`}>
                  <Image
                    source={{ uri: Diamond }}
                    style={tw`w-[20px] h-[20px]`}
                  />
                  <Text style={tw`text-white text-lg font-semibold`}>
                    {redeemData?.cost}
                  </Text>
                </View>
                <Text style={tw`text-white text-base font-semibold`}>
                  Redeem
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={tw`flex-row items-center gap-[46px] py-[12px] px-[16px] bg-[#1E96FC] rounded-[12px]`}
                onPress={() => {
                  handleRedeem(redeemData);
                }}
              >
                <View style={tw`flex-row items-center gap-[4px]`}>
                  <Image
                    source={{ uri: Diamond }}
                    style={tw`w-[20px] h-[20px]`}
                  />
                  <Text style={tw`text-white text-lg font-semibold`}>
                    {redeemData?.cost}
                  </Text>
                </View>
                <Text style={tw`text-white text-base font-semibold`}>
                  Redeem
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={tw`flex-row items-center justify-between p-[12px] bg-[#EEEEEE] rounded-[12px]`}
          >
            <Text style={tw`text-[#131313] text-sm`}>Your gift code</Text>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-[#131313] text-lg font-semibold`}>
                {redeemData?.code}
              </Text>
              <View
                style={tw`w-[22px] h-[22px] flex justify-center items-center`}
              >
                <TouchableOpacity onPress={handleCopy}>
                  {isCopied ? (
                    <Image
                      source={{ uri: Check }}
                      style={tw`w-[20px] h-[20px]`}
                    />
                  ) : (
                    <Image
                      source={{ uri: Copy }}
                      style={tw`w-[22px] h-[22px]`}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
