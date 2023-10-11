import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import { useEffect, useState } from "react";
import tw from "twrnc";
import { QueryClient, QueryClientProvider } from "react-query";

import { Screen } from "./components/Screen";
import { HomeScreen } from "./screens/HomeScreen";
import { TrophyScreen } from "./screens/TrophyScreen";
import { RewardScreen } from "./screens/RewardScreen";

import { HomeIcon } from "./components/Icons/Home";
import { TrophyIcon } from "./components/Icons/Trophy";
import { GiftIcon } from "./components/Icons/Gift";

const queryClient = new QueryClient();

function Main() {
  const [active, setActive] = useState<"home" | "trophy" | "reward">("home");
  const [publicKey, setPublicKey] = useState<string>("");

  useEffect(() => {
    if (window.xnft.publicKeys.solana) {
      setPublicKey(window.xnft.publicKeys.solana);
    }
  }, []);

  return (
    <Screen active={active}>
      {active === "home" ? <HomeScreen publicKey={publicKey} /> : <></>}
      {active === "trophy" ? <TrophyScreen publicKey={publicKey} /> : <></>}
      {active === "reward" ? <RewardScreen publicKey={publicKey} /> : <></>}

      <View
        style={{
          position: "sticky",
          bottom: 20,
          left: "50%",
          transform: "translateX(-40%)",

          width: "max-content",

          flexDirection: "row",
          gap: 40,
          paddingHorizontal: "16px",
          paddingVertical: "12px",

          boxShadow:
            "-11.33333px 11.33333px 11.33333px 0px rgba(255, 255, 255, 0.10) inset, 19px -11.33333px 11.33333px 0px rgba(194, 194, 194, 0.10) inset, 0px 10px 20px 0px rgba(0, 0, 0, 0.10)",
          backdropFilter: "blur(15px)",
          backgroundColor: "#fff",

          borderRadius: "20px",
        }}
      >
        <TouchableOpacity
          style={tw`p-1 rounded-[10px] flex justify-center items-center ${
            active === "home" ? "bg-[#27326f]" : ""
          }`}
          onPress={() => setActive("home")}
        >
          <HomeIcon
            width={24}
            height={24}
            color={active === "home" ? "#fff" : "#ccc"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`p-1 rounded-[10px] flex justify-center items-center ${
            active === "trophy" ? "bg-[#27326f]" : ""
          }`}
          onPress={() => setActive("trophy")}
        >
          <TrophyIcon
            width={24}
            height={24}
            color={active === "trophy" ? "#fff" : "#ccc"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`p-1 rounded-[10px] flex justify-center items-center ${
            active === "reward" ? "bg-[#27326f]" : ""
          }`}
          onPress={() => setActive("reward")}
        >
          <GiftIcon
            width={24}
            height={24}
            color={active === "reward" ? "#fff" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
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
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
