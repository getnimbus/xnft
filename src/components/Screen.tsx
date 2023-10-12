import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useRecoilValue } from "recoil";

import { openModalState } from "../recoil/openModal";

type Props = {
  active: string;
  style?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[] | null;
};

export function Screen({ active, style, children }: Props) {
  const openModal = useRecoilValue(openModalState);

  return (
    <View
      style={[
        styles.screen,
        style,
        {
          backgroundColor: openModal
            ? "#000000E5"
            : active === "reward"
            ? "#27326f"
            : "#fff",
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100vw",
    height: "100vh",
    overflow: "auto",
  },
});
