interface TimescaleProps {
  timeLineLength: number;
  videoLengthSeconds:number;
}

export const Timescale: React.FC<TimescaleProps> = ({timeLineLength, videoLengthSeconds}) => {
  return (
    <div
      style={{ width: timeLineLength }}
      className=" flex flex-row  mx-[8px] justify-between border-l-[1px] border-l-[#D4D4D8]"
    >
      {Array.from({ length: videoLengthSeconds / 60 }, (_, index) => {
        return (
          <div
            className="flex flex-col  w-[90px] justify-between  h-[50px] border-r-[1px] border-r-[#D4D4D8]"
            key={index}
          >
            <div className="flex flex-row ">
              {Array.from({ length: 8 }, (_, index) => {
                return (
                  <div
                    className="w-[10px] h-[10px] border-r-[1px] border-r-[#D4D4D8]"
                    key={index}
                  ></div>
                );
              })}
            </div>
            <div className="flex items-center justify-center font-[600] text-[14px] leading-[20px] text-[#71717A]">
              {formatSeconds(index * 60)}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
