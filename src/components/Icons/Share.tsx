import Svg, { Path } from "react-native-svg";

type Props = {
  width: number;
  height: number;
  color: string;
};

export function ShareIcon({
  width = 24,
  height = 24,
  color = "#131313",
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 20" fill="none">
      <Path
        d="M12.0001 12.3333V13.3333C12.0001 13.5986 11.8947 13.8529 11.7072 14.0404C11.5197 14.228 11.2653 14.3333 11.0001 14.3333H5.66675C5.40153 14.3333 5.14718 14.228 4.95964 14.0404C4.7721 13.8529 4.66675 13.5986 4.66675 13.3333V8C4.66675 7.73478 4.7721 7.48043 4.95964 7.29289C5.14718 7.10536 5.40153 7 5.66675 7H6.66675"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.66675 7H12.0001V10.3333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 7L8 11"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
