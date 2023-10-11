import Svg, { Path } from "react-native-svg";

type Props = {
  width: number;
  height: number;
  color: string;
};

export function HomeIcon({
  width = 24,
  height = 24,
  color = "#131313",
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M2.83325 8.94887L10.3333 2.8125L17.8333 8.94887"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.96973 17.13V13.0391H11.697V17.13"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.87866 10.3125V15.7671C4.87866 16.5205 5.48889 17.1307 6.2423 17.1307H14.4241C15.1775 17.1307 15.7878 16.5205 15.7878 15.7671V10.3125"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
