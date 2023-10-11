import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import RedeemCard from "../components/RedeemCard";

import Diamond from "../../assets/diamond.svg";
import Background from "../../assets/linear-background.svg";

const handleGetDataCheckin = async (address: string) => {
  const response = await axios.get(
    `https://api-staging.getnimbus.io/v2/checkin/${address}`
  );
  return response.data.data;
};

const handleGetDataRedeemReward = async (address: string) => {
  const response = await axios.post(
    `https://api-staging.getnimbus.io/v2/reward`,
    {
      address,
    }
  );
  return response.data.data;
};

type Props = {
  publicKey: string;
};

export function RewardScreen({ publicKey }: Props) {
  const [selectedType, setSelectedType] = useState<"redeem" | "your">("redeem");

  const {
    data: dataCheckin,
    error: errorDataCheckin,
    isLoading: loadingDataCheckin,
  } = useQuery<any>({
    queryFn: () => handleGetDataCheckin(publicKey),
    queryKey: ["check-in", publicKey],
    staleTime: Infinity,
    retry: false,
  });

  const {
    data: dataRedeemReward,
    error: errorDataRedeemReward,
    isLoading: loadingDataRedeemReward,
  } = useQuery<any>({
    queryFn: () => handleGetDataRedeemReward(publicKey),
    queryKey: ["redeem-reward", publicKey],
    staleTime: Infinity,
    retry: false,
  });

  if (loadingDataRedeemReward && loadingDataCheckin) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  const handleRedeem = async (data: any) => {
    try {
      await axios.post("https://api-staging.getnimbus.io/v2/reward/redeem", {
        address: publicKey,
        campaignName: data?.campaignName,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        minHeight: "100vh",
        paddingBottom: "40px",
        backgroundColor: "#27326F",
        paddingTop: "50px",
      }}
    >
      <View style={tw`px-[20px] gap-[20px]`}>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-center text-2xl font-bold text-white`}>
            Reward
          </Text>
          <View style={tw`relative rounded-[100px] overflow-hidden`}>
            <View
              style={tw`flex-row justify-center items-center gap-2 py-[4px] px-[12px] z-20`}
            >
              <Image source={{ uri: Diamond }} style={tw`w-[20px] h-[20px]`} />
              <Text style={tw`text-center text-xl font-bold text-white`}>
                {dataCheckin?.totalPoint || 0}
              </Text>
            </View>
            <Image
              source={{ uri: Background }}
              style={tw`absolute top-0 left-0 w-full h-full z-10`}
            />
          </View>
        </View>

        <View
          style={tw`flex-row justify-between p-2 bg-[#FFFFFF1A] rounded-[100px]`}
        >
          <TouchableOpacity
            style={tw`flex-1 rounded-[100px] py-[8px] justify-center items-center ${
              selectedType === "redeem"
                ? "bg-white text-[#131313]"
                : "text-white"
            }`}
            onPress={() => {
              setSelectedType("redeem");
            }}
          >
            <Text
              style={tw`text-base font-medium ${
                selectedType === "redeem" ? "text-[#131313]" : "text-white"
              }`}
            >
              Redeem Gift
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 rounded-[100px] py-[8px] justify-center items-center ${
              selectedType === "your" ? "bg-white" : ""
            }`}
            onPress={() => {
              setSelectedType("your");
            }}
          >
            <Text
              style={tw`text-base font-medium ${
                selectedType === "your" ? "text-[#131313]" : "text-white"
              }`}
            >
              Your Gift
            </Text>
          </TouchableOpacity>
        </View>

        {selectedType === "redeem" ? (
          <View>
            {dataRedeemReward?.redeemable.length > 0 ? (
              <FlatList
                data={dataRedeemReward?.redeemable}
                keyExtractor={(item) => item.campaignName.toString()}
                renderItem={({ item }) => {
                  return (
                    <RedeemCard
                      isRedeem
                      redeemData={item}
                      handleRedeem={handleRedeem}
                    />
                  );
                }}
              />
            ) : (
              <Text style={tw`text-base text-center text-white`}>
                There are no redeems
              </Text>
            )}
          </View>
        ) : (
          <></>
        )}

        {selectedType === "your" ? (
          <View>
            {dataRedeemReward?.ownRewards.length > 0 ? (
              <FlatList
                data={dataRedeemReward?.ownRewards}
                keyExtractor={(item) => item.campaignName.toString()}
                renderItem={({ item }) => {
                  return (
                    <RedeemCard redeemData={item} handleRedeem={() => {}} />
                  );
                }}
              />
            ) : (
              <Text style={tw`text-base text-center text-white`}>
                There are no gifts
              </Text>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
