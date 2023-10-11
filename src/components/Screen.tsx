import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  active: string;
  style?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[] | null;
};

export function Screen({ active, style, children }: Props) {
  return (
    <View
      style={[
        styles.screen,
        style,
        {
          backgroundColor: active === "reward" ? "#27326f" : "#fff",
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
    overflow: "scroll",
  },
});
