import { useEffect, useRef, useState } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { MotiView, MotiText } from "@motify/components";
import tw from "twrnc";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Buffer } from "buffer";
import bs58 from "bs58";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { wait } from "../utils";
import { useRecoilState } from "recoil";

import { openModalState } from "../recoil/openModal";

import { ShareIcon } from "../components/Icons/Share";
import Number from "../components/Number";
import Overlay from "../components/Overlay";

import Avatar from "../../assets/avatar.svg";
import DiamondShield from "../../assets/diamond-shield.svg";
import Diamond from "../../assets/diamond.svg";
import OtherRank from "../../assets/other-rank.svg";
import Background from "../../assets/linear-background.svg";
import FirstPlace from "../../assets/first-place.svg";
import SecondPlace from "../../assets/second-place.svg";
import ThirdPlace from "../../assets/third-place.svg";
import FirstReward from "../../assets/first-reward.svg";
import SecondReward from "../../assets/second-reward.svg";
import ThirdReward from "../../assets/third-reward.svg";
import Received from "../../assets/received-icon.svg";

import FirstRewardBG from "../../assets/1.svg";
import SecondRewardBG from "../../assets/2.svg";
import ThirdRewardBG from "../../assets/3.svg";

const bgImgs = [FirstRewardBG, SecondRewardBG, ThirdRewardBG];

type Props = {
  publicKey: string;
};

const NimbusAppLink = ({ url }: { url: string }) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center mb-1`}
      onPress={() => {
        window.open(url, "_blank");
      }}
    >
      <Text style={tw`text-base text-[#1E96FC] font-medium`}>Nimbus</Text>
      <ShareIcon width={25} height={25} color="#1E96FC" />
    </TouchableOpacity>
  );
};

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <View
        style={{
          padding: 8,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: Background }}
          style={tw`absolute top-0 left-0 w-full h-full`}
        />
        <Image source={{ uri: FirstPlace }} style={tw`w-[20px] h-[20px]`} />
      </View>
    );
  } else if (rank === 2) {
    return (
      <View
        style={{
          padding: 8,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: Background }}
          style={tw`absolute top-0 left-0 w-full h-full`}
        />
        <Image source={{ uri: SecondPlace }} style={tw`w-[20px] h-[20px]`} />
      </View>
    );
  } else if (rank === 3) {
    return (
      <View
        style={{
          padding: 8,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: Background }}
          style={tw`absolute top-0 left-0 w-full h-full`}
        />
        <Image source={{ uri: ThirdPlace }} style={tw`w-[20px] h-[20px]`} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          padding: 8,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: Background }}
          style={tw`absolute top-0 left-0 w-full h-full`}
        />
        <Image source={{ uri: OtherRank }} style={tw`w-[20px] h-[20px]`} />
      </View>
    );
  }
};

const RewardIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <View style={tw`w-[61px] h-[47px]`}>
        <Image
          source={{ uri: FirstReward }}
          style={tw`w-full h-full object-contain`}
        />
      </View>
    );
  } else if (rank === 2) {
    return (
      <View style={tw`w-[61px] h-[47px]`}>
        <Image
          source={{ uri: SecondReward }}
          style={tw`w-full h-full object-contain`}
        />
      </View>
    );
  } else if (rank === 3) {
    return (
      <View style={tw`w-[61px] h-[47px]`}>
        <Image
          source={{ uri: ThirdReward }}
          style={tw`w-full h-full object-contain`}
        />
      </View>
    );
  } else {
    return <View></View>;
  }
};

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

const handleGetDataOverview = async (address: string) => {
  const response = await axios.get(
    `https://api-staging.getnimbus.io/v2/app-overview/${address}`
  );
  return response.data.data;
};

const _colors = {
  active: "#000000",
  inactive: "#EEEEEE",
};
const _spacing = 10;

export function HomeScreen({ publicKey }: Props) {
  const queryClient = useQueryClient();
  const ref = useRef<FlatList>(null);
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [selectedCheckIn, setSelectedCheckIn] = useState<number>(0);

  useEffect(() => {
    if (listCheckin && listCheckin.length !== 0) {
      ref?.current?.scrollToIndex({
        index: selectedCheckIn,
        animated: true,
        viewPosition: 0.5,
        viewOffset: _spacing,
      });
    }
  }, [selectedCheckIn]);

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

  const {
    data: dataOverview,
    error: errorDataOverview,
    isLoading: loadingDataOverview,
  } = useQuery<any>({
    queryFn: () => handleGetDataOverview(publicKey),
    queryKey: ["overview", publicKey],
    staleTime: Infinity,
    retry: false,
  });

  const overviewLineChart = dataOverview?.performance.map((item: any) => {
    return item?.networth;
  });

  const listCheckin = dataCheckin?.pointStreak.map(
    (item: any, index: number) => {
      return {
        key: index,
        value: item,
      };
    }
  );

  const rank = dataCheckin?.checkinLeaderboard
    .map((item: any) => item?.owner.toLowerCase())
    .findIndex((item: any) => {
      return item === publicKey.toLowerCase();
    });

  useEffect(() => {
    if (dataCheckin && dataCheckin?.steak) {
      setSelectedCheckIn(dataCheckin.steak);
    }
  }, [dataCheckin]);

  const handleCheckin = async () => {
    try {
      const nonce = await axios.post(
        "https://api-staging.getnimbus.io/v2/checkin-app/nonce",
        {
          address: publicKey,
        }
      );

      if (nonce?.data?.data) {
        const signature = await window.xnft.solana
          .signMessage(
            Buffer.from(`Nimbus user check in. Nonce ${nonce?.data?.data}`)
          )
          .then((signature: Uint8Array) => {
            return bs58.encode(signature);
          })
          .catch(() => {
            console.error("Error get signature");
          });

        if (signature) {
          await axios.post("https://api-staging.getnimbus.io/v2/checkin-app", {
            address: publicKey,
            signature,
          });

          queryClient.invalidateQueries(["check-in"]);
          setSelectedCheckIn(selectedCheckIn + 1);
          setOpenModal(true);
          await wait(1000);
          setOpenModal(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loadingDataCheckin && loadingDataRedeemReward && loadingDataOverview) {
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

  return (
    <View
      style={{
        minHeight: "100vh",
        paddingBottom: "40px",
        backgroundColor: "white",
        position: "relative",
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
            opacity: 0.9,
          }}
        />
        <View style={tw`flex-row items-center justify-start gap-[28px]`}>
          {window.xnft?.metadata?.avatarUrl ? (
            <Image
              source={{ uri: window.xnft?.metadata?.avatarUrl }}
              style={tw`w-[72px] h-[72px]`}
            />
          ) : (
            <Image source={{ uri: Avatar }} style={tw`w-[72px] h-[100px]`} />
          )}
          <View
            style={{
              flex: 1,
              gap: 10,
            }}
          >
            <Text style={tw`text-lg font-bold text-white`}>
              {window.xnft?.metadata?.username || "-"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 32,
              }}
            >
              <View style={tw`flex-[0.8] flex-row items-center gap-[12px]`}>
                <RankIcon rank={rank + 1} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base font-bold text-white`}>
                    #{rank + 1 || "N/A"}
                  </Text>
                  <Text style={tw`text-sm font-medium  text-[#FFFFFFCC]`}>
                    Rank
                  </Text>
                </View>
              </View>
              <View style={tw`flex-1 flex-row items-center gap-[12px]`}>
                <View
                  style={{
                    padding: 8,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 12,
                  }}
                >
                  <Image
                    source={{ uri: Background }}
                    style={tw`absolute top-0 left-0 w-full h-full`}
                  />
                  <Image
                    source={{ uri: Diamond }}
                    style={tw`w-[20px] h-[20px]`}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base font-bold text-white`}>
                    {dataCheckin?.totalPoint || 0}
                  </Text>
                  <Text style={tw`text-sm font-medium text-[#FFFFFFCC]`}>
                    GM Point
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`py-[16px] rounded-[20px] bg-white gap-[8px]`}>
          <View
            style={tw`px-[20px] flex-row items-center gap-[4px] justify-center`}
          >
            <Text style={tw`font-medium`}>There are</Text>
            <Text style={tw`text-xl text-[#1E96FC] font-bold`}>
              {dataCheckin?.todayGM || 0}
            </Text>
            <Text style={tw`font-medium`}>people send GM today</Text>
          </View>
          <View style={tw`relative`}>
            <FlatList
              ref={ref}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve) => setTimeout(resolve, 500));
                wait.then(() => {
                  ref.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              data={listCheckin}
              keyExtractor={(item) => item.key.toString()}
              contentContainerStyle={{ paddingLeft: _spacing }}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index: fIndex }) => {
                return (
                  <MotiView
                    animate={{
                      backgroundColor:
                        fIndex === selectedCheckIn
                          ? _colors.active
                          : _colors.inactive,
                      borderColor:
                        fIndex === selectedCheckIn
                          ? _colors.active
                          : _colors.inactive,
                      opacity: fIndex >= selectedCheckIn ? 1 : 0.4,
                      transform: [
                        { scale: fIndex === selectedCheckIn ? 1 : 0.9 },
                      ],
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    style={{
                      marginRight: _spacing,
                      padding: _spacing,
                      borderWidth: 2,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 18,
                    }}
                  >
                    <View style={tw`flex-row items-center gap-1`}>
                      {fIndex === selectedCheckIn &&
                      !dataCheckin?.checkinable ? (
                        <Image
                          source={{ uri: Received }}
                          style={tw`w-[12px] h-[12px]`}
                        />
                      ) : (
                        <></>
                      )}
                      <MotiText
                        animate={{
                          color: fIndex === selectedCheckIn ? "#fff" : "#000",
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        style={{
                          fontWeight: "medium",
                          flex: 1,
                        }}
                      >
                        Day {item.key + 1}
                      </MotiText>
                    </View>

                    <View
                      style={{
                        borderRadius: 12,
                        flex: 1,
                      }}
                    >
                      <Image
                        source={{ uri: Diamond }}
                        style={{
                          width: "20px",
                          height: "20px",
                          filter:
                            fIndex < selectedCheckIn ? "grayscale(100%)" : "",
                        }}
                      />
                    </View>
                    <MotiText
                      animate={{
                        color: fIndex === selectedCheckIn ? "#fff" : "#000",
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      style={{
                        fontWeight: "bold",
                        flex: 1,
                      }}
                    >
                      +{item.value}
                    </MotiText>
                  </MotiView>
                );
              }}
            />
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "35px",
                height: "100%",
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(0,255,255,0) 100%)",
              }}
            ></View>

            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "35px",
                height: "100%",
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,212,255,0) 0%, rgba(255,255,255,0.5) 100%)",
              }}
            ></View>
          </View>
          <View style={tw`px-[20px]`}>
            {dataCheckin?.checkinable ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#1E96FC",
                  paddingVertical: 10,
                  borderRadius: 12,
                  cursor: "pointer",
                }}
                onPress={handleCheckin}
              >
                <Text style={tw`text-center text-white font-bold`}>👋 GM</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  backgroundColor: "#9ca3af",
                  paddingVertical: 10,
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                <Text style={tw`text-center text-white font-bold`}>👋 GM</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={tw`px-[8px] -mt-[40px] gap-4`}>
        <View
          style={{
            paddingVertical: 16,
            boxShadow: "0px 4px 30px 0px #0000001A",
            borderRadius: 20,
            backgroundColor: "#fff",
            gap: 6,
          }}
        >
          <Text style={tw`text-lg font-semibold px-[20px]`}>
            This month reward
          </Text>

          {dataRedeemReward?.monthRewards !== undefined ? (
            <View style={tw`relative`}>
              <FlatList
                data={dataRedeemReward?.monthRewards.map(
                  (item: any, index: number) => {
                    return {
                      ...item,
                      rank: index + 1,
                    };
                  }
                )}
                keyExtractor={(item) => item.rank.toString()}
                contentContainerStyle={{ paddingLeft: _spacing }}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item, index }) => {
                  return (
                    <ImageBackground source={bgImgs[index]} resizeMode="contain" style={{ borderRadius: 20}}>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 10,
                          paddingVertical: 16,
                          paddingHorizontal: 32,
                          // backgroundColor: "#232B5C",
                        }}
                      >
                          <RewardIcon rank={item.rank} />
                          {item?.type === "TOKEN" ? (
                            <View style={tw`flex-row items-center gap-1 py-4`}>
                              <Text style={tw`text-xl font-semibold text-white`}>
                                {item?.amount}
                              </Text>
                              <Text style={tw`text-xl font-semibold text-white`}>
                                {item?.symbol}
                              </Text>
                            </View>
                          ) : (
                            <View style={tw`gap-1 justify-center items-center`}>
                              <View
                                style={{
                                  borderRadius: 5,
                                  overflow: "hidden",
                                  width: "38px",
                                  height: "38px",
                                  backgroundColor: "#fff",
                                }}
                              >
                                <Image
                                  source={{
                                    uri:
                                      item?.url ||
                                      "https://i.seadn.io/gae/TLlpInyXo6n9rzaWHeuXxM6SDoFr0cFA0TWNpFQpv5-oNpXlYKzxsVUynd0XUIYBW2G8eso4-4DSQuDR3LC_2pmzfHCCrLBPcBdU?auto=format&dpr=1&w=384",
                                  }}
                                  style={tw`w-full h-full object-contain`}
                                />
                              </View>
                              <Text style={tw`text-white text-sm font-medium`}>
                                {item?.name}
                              </Text>
                            </View>
                          )}
                          <Text style={tw`text-white text-base font-medium`}>
                            {item.rank}st Rank
                          </Text>
                      </View>
                    </ImageBackground>
                  );
                }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "35px",
                  height: "100%",
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(0,255,255,0) 100%)",
                }}
              ></View>

              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "35px",
                  height: "100%",
                  backgroundImage:
                    "linear-gradient(90deg, rgba(0,212,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                }}
              ></View>
            </View>
          ) : (
            <Text style={tw`font-medium text-base px-[20px]`}>Empty</Text>
          )}
        </View>

        <View
          style={{
            paddingVertical: 16,
            boxShadow: "0px 4px 30px 0px #0000001A",
            borderRadius: 20,
            backgroundColor: "#fff",
            gap: 6,
          }}
        >
          <View style={tw`flex-row justify-between items-center px-[20px]`}>
            <Text style={tw`text-sm text-[#00000099] font-semibold`}>
              Last 24h gain
            </Text>
            <NimbusAppLink url="https://app.getnimbus.io" />
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex-1 gap-1 pl-[20px]`}>
              <Text style={tw`text-2xl font-semibold`}>
                <Number
                  number={dataOverview?.overview?.networth}
                  type="value"
                />
              </Text>
              <View style={tw`flex-row gap-2`}>
                <Text
                  style={tw`text-xl font-semibold ${
                    dataOverview?.overview?.networthChange >= 0
                      ? "text-[#00A878]"
                      : "text-red-500"
                  }`}
                >
                  <Text>
                    {dataOverview?.overview?.networthChange >= 0 ? "↑" : "↓"}
                  </Text>
                  <Number
                    number={Math.abs(dataOverview?.overview?.networthChange)}
                    type="percent"
                  />
                  %
                </Text>
                <Text style={tw`text-lg text-[#00000066] font-semibold`}>
                  24h
                </Text>
              </View>
            </View>
            <View style={tw`flex-1`}>
              <Sparklines data={overviewLineChart} height={86}>
                <SparklinesLine color="#089981" />
              </Sparklines>
            </View>
          </View>
        </View>
      </View>

      {openModal ? (
        <Overlay>
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 22,
              marginTop: "-100px",
            }}
          >
            <Text style={tw`text-xl text-white font-bold`}>
              Received successfully
            </Text>
            <Image source={{ uri: Diamond }} style={tw`w-[96px] h-[96px]`} />
            <Text style={tw`text-2xl text-white font-bold`}>
              +{dataCheckin?.pointStreak[selectedCheckIn]} Points
            </Text>
          </View>
        </Overlay>
      ) : (
        <></>
      )}
    </View>
  );
}
