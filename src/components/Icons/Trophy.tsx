import Svg, { Path } from "react-native-svg";

type Props = {
  width: number;
  height: number;
  color: string;
};

export function TrophyIcon({
  width = 24,
  height = 24,
  color = "#131313",
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
      <Path
        d="M6.40916 7.95455H5.72734C5.18485 7.95455 4.66458 7.73904 4.28098 7.35545C3.89739 6.97185 3.68188 6.45158 3.68188 5.90909V2.5H6.40916"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.5911 7.95455H15.2729C15.8154 7.95455 16.3356 7.73904 16.7192 7.35545C17.1028 6.97185 17.3183 6.45158 17.3183 5.90909V2.5H14.5911"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 14.7722V12.0449"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5001 12.0455C9.41511 12.0455 8.37457 11.6144 7.60738 10.8473C6.84019 10.0801 6.40918 9.03952 6.40918 7.95455V2.5H14.591V7.95455C14.591 9.03952 14.16 10.0801 13.3928 10.8473C12.6256 11.6144 11.5851 12.0455 10.5001 12.0455Z"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.591 17.5007H6.40918C6.40918 16.7774 6.69652 16.0837 7.20798 15.5722C7.71944 15.0608 8.41314 14.7734 9.13645 14.7734H11.8637C12.587 14.7734 13.2807 15.0608 13.7922 15.5722C14.3037 16.0837 14.591 16.7774 14.591 17.5007Z"
        strokeWidth="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
