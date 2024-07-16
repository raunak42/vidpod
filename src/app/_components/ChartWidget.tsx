import Image from "next/image";
import { Chart } from "./Graph";

interface ChartWidgetProps {
  header: string;
  playCount: number;
  dataPoints: number[];
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  header,
  dataPoints,
  playCount,
}) => {
  const netDiff = Math.round(
    ((dataPoints[dataPoints.length - 1] - dataPoints[0]) / dataPoints[0]) * 100
  );

  let arrowSrc;
  if (netDiff > 0) {
    arrowSrc = "/arrow-up-green.svg";
  } else if (netDiff < 0) {
    arrowSrc = "/arrow-down-red.svg";
  } else {
    arrowSrc = "/arrow-up-gray.svg"; 
  }

  return (
    <div className="w-full h-[201px] border-[1px] border-[#E4E4E7] rounded-[16px] flex flex-col justify-between mt-[176px] p-[16px]">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-[600] text-[16px] leading-[24px] text-[#27272A] border-b-[1px] border-dashed border-b-[#D4D4D8]">
            {header}
          </h1>
          <h1 className="font-[800] text-[24px] leading-[32px] text-[#27272A]">
            {playCount}
          </h1>
        </div>
        <div className="flex flex-row gap-[8px]">
          <Image
            alt="arrow"
            src={arrowSrc}
            height={16}
            width={16}
          ></Image>
          <h1 className="font-[700] text-[16px] leading-[24px] text-[#71717A]">
            {netDiff}%
          </h1>
        </div>
      </div>

      <div className="">
        <Chart netDiff={netDiff} dataPoints={dataPoints} />
      </div>
    </div>
  );
};
