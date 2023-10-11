import { View } from "react-native";

type Props = {
  children: JSX.Element | JSX.Element[] | null;
};

export default function Overlay({ children }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000E5",
      }}
    >
      {children}
    </View>
  );
}
