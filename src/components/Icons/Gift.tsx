import Svg, { Path } from "react-native-svg";

type Props = {
  width: number;
  height: number;
  color: string;
};

export function GiftIcon({
  width = 24,
  height = 24,
  color = "#131313",
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M5 4.49414C4.97884 3.98611 5.15985 3.49039 5.50341 3.11554C5.84696 2.74069 6.32505 2.51725 6.833 2.49414C9.545 2.49414 10.5 6.49414 10.5 6.49414H6.833C6.32496 6.4713 5.84671 6.24793 5.5031 5.87302C5.15949 5.49811 4.97857 5.00224 5 4.49414Z"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 4.49414C16.0212 3.98611 15.8401 3.49039 15.4966 3.11554C15.153 2.74069 14.6749 2.51725 14.167 2.49414C11.455 2.49414 10.5 6.49414 10.5 6.49414H14.167C14.675 6.4713 15.1533 6.24793 15.4969 5.87302C15.8405 5.49811 16.0214 5.00224 16 4.49414Z"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.25 17.4004V9.90039"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.75 17.4004V9.90039"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 9.90039V17.4004H4.5V9.90039"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 6.49414H3V9.49414H18V6.49414Z"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
