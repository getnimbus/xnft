import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { useQuery } from "react-query";
import axios from "axios";
import { shorterAddress } from "../utils";

import DiamondShield from "../../assets/diamond-shield.svg";
import LeaderboardRank from "../../assets/leaderboard-rank.png";
import FirstPlace from "../../assets/first-place.svg";
import SecondPlace from "../../assets/second-place.svg";
import ThirdPlace from "../../assets/third-place.svg";
import Infor from "../../assets/infor.svg";

type Props = {
  publicKey: string;
};

const handleGetDataCheckin = async (address: string) => {
  const response = await axios.get(
    `https://api-staging.getnimbus.io/v2/checkin/${address}`
  );
  return response.data.data;
};

export function TrophyScreen({ publicKey }: Props) {
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

  if (loadingDataCheckin) {
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

  const formatDataLeaderboard = (dataCheckin?.checkinLeaderboard || []).map(
    (item: any, index: number) => {
      return {
        rank: index + 1,
        owner: item?.owner?.toLowerCase(),
        point: item?.["_sum"]?.point,
      };
    }
  );

  const currentUserRank = dataCheckin?.checkinLeaderboard
    .map((item: any) => item?.owner.toLowerCase())
    .findIndex((item: any) => {
      return item === publicKey.toLowerCase();
    });

  return (
    <View
      style={{
        minHeight: "100vh",
        paddingBottom: "40px",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "#27326F",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingBottom: 60,
          paddingTop: 50,
          paddingHorizontal: 8,
          gap: 16,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: DiamondShield }}
          style={{
            position: "absolute",
            top: 30,
            left: "50%",
            transform: "translateX(-50%)",
            width: "350px",
            height: "284.54px",
            opacity: 0.3,
          }}
        />
        <View>
          <Text style={tw`text-center text-2xl font-bold text-white`}>
            Leaderboard
          </Text>
          <View style={tw`flex-row justify-center`}>
            <View style={tw`w-[360px]`}>
              <View style={tw`flex-row`}>
                <View style={tw`w-[100px] justify-end h-[220px]`}>
                  <View style={tw`h-[95px]`}>
                    <Image
                      source={{ uri: SecondPlace }}
                      style={tw`w-full h-full object-contain`}
                    />
                  </View>
                  <View style={tw`justify-center items-center gap-1 -mt-1`}>
                    <Text style={tw`text-white text-sm font-bold`}>
                      {shorterAddress(formatDataLeaderboard[1]?.owner)}
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text style={tw`text-base text-[#FFCB59] font-bold`}>
                        {formatDataLeaderboard[1]?.point}
                      </Text>
                      <Text style={tw`text-[#FFFFFFCC] font-medium`}>GM</Text>
                    </View>
                  </View>
                </View>

                <View style={tw`flex-1`}>
                  <View style={tw`h-[145px]`}>
                    <Image
                      source={{ uri: FirstPlace }}
                      style={tw`w-full h-full object-contain`}
                    />
                  </View>
                  <View style={tw`justify-center items-center gap-1 -mt-1`}>
                    <Text style={tw`text-white text-sm font-bold`}>
                      {shorterAddress(formatDataLeaderboard[0]?.owner)}
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text style={tw`text-base text-[#FFCB59] font-bold`}>
                        {formatDataLeaderboard[0]?.point}
                      </Text>
                      <Text style={tw`text-[#FFFFFFCC] font-medium`}>GM</Text>
                    </View>
                  </View>
                </View>

                <View style={tw`w-[100px] justify-end h-[220px]`}>
                  <View style={tw`h-[95px]`}>
                    <Image
                      source={{ uri: ThirdPlace }}
                      style={tw`w-full h-full object-contain`}
                    />
                  </View>
                  <View style={tw`justify-center items-center gap-1 -mt-1`}>
                    <Text style={tw`text-white text-sm font-bold`}>
                      {shorterAddress(formatDataLeaderboard[2]?.owner)}
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text style={tw`text-base text-[#FFCB59] font-bold`}>
                        {formatDataLeaderboard[2]?.point}
                      </Text>
                      <Text style={tw`text-[#FFFFFFCC] font-medium`}>GM</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Image
                source={{ uri: LeaderboardRank }}
                style={tw`w-full h-full object-contain`}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={tw`mt-[70px] gap-2`}>
        <View
          style={{
            paddingHorizontal: 4,
            paddingVertical: 2,
            width: "max-content",

            marginHorizontal: "auto",
            boxShadow: "0px 4px 30px 0px #0000001A",
            borderRadius: 5,
            backgroundColor: "#FFFFFF66",

            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image source={{ uri: Infor }} style={tw`w-[16px] h-[16px]`} />
          <Text style={tw`font-medium`}>This rank will reset every month</Text>
        </View>
        <View
          style={{
            marginHorizontal: 8,
            boxShadow: "0px 4px 30px 0px #0000001A",
            borderRadius: 20,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={tw`bg-[#FFB800] rounded-tr-[20px] rounded-tl-[20px] py-[16px] px-[20px] gap-2`}
          >
            <Text style={tw`text-[#000000CC]`}>Your current rank</Text>
            <View style={tw`flex-row items-center`}>
              <View style={tw`flex-1 flex-row items-center gap-[20px]`}>
                <Text
                  style={tw`text-[#131313] text-2xl font-semibold w-[36px]`}
                >
                  {formatDataLeaderboard[currentUserRank]?.rank || "N/A"}
                </Text>
                <Text style={tw`text-[#131313] font-medium text-base`}>
                  {shorterAddress(
                    formatDataLeaderboard[currentUserRank]?.owner
                  )}
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-lg font-semibold`}>
                  {formatDataLeaderboard[currentUserRank]?.point || 0}
                </Text>
                <Text style={tw`text-[#131313CC] font-normal text-sm`}>
                  Point
                </Text>
              </View>
            </View>
          </View>
          <Text style={tw`pt-[16px] px-[20px] text-lg font-semibold`}>
            Runners up
          </Text>
          <FlatList
            data={formatDataLeaderboard.slice(0, 20)}
            keyExtractor={(item) => item.owner.toString()}
            renderItem={({ item }) => {
              return (
                <View style={tw`flex-row items-center px-[20px] py-[16px]`}>
                  <View style={tw`flex-1 flex-row items-center gap-[20px]`}>
                    <Text
                      style={tw`text-[#27326F] text-xl font-semibold w-[36px]`}
                    >
                      {item?.rank}
                    </Text>
                    <Text style={tw`text-[#131313] font-medium text-base`}>
                      {shorterAddress(item?.owner)}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`text-[#FFB800] text-lg font-semibold`}>
                      {item?.point}
                    </Text>
                    <Text style={tw`text-[#131313CC] font-normal text-sm`}>
                      Point
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
