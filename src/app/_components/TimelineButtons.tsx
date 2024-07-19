import { currentTimeState } from "@/store/videoState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { formatSeconds } from "./Timescale";

export const TimelineButtons: React.FC = () => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const displayTime = formatSeconds(currentTime);

  return (
    <div className=" w-full justify-between flex flex-row">
      <div className="flex gap-[48px] items-center">
        <div className="gap-[12px] flex flex-row items-center">
          <button>
            <Image alt="image" width={32} height={32} src={"/undo.svg"} />
          </button>
          <div className="flex items-center gap-[6px]" >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
              Undo
            </h1>
            <div className="size-[6px] rounded-full bg-red-600" ></div>
          </div>
        </div>
        <div className="gap-[12px] flex flex-row items-center">
          <button>
            <Image alt="image" width={32} height={32} src={"/redo.svg"} />
          </button>
          <div className="flex items-center gap-[6px]" >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
              Redo
            </h1>
            <div className="size-[6px] rounded-full bg-red-600" ></div>
          </div>
        </div>
      </div>

      <div className="px-[12px] py-[8px] w-[94px] border border-[# E4E4E7] rounded-md">
        <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
          {displayTime}
        </h1>
      </div>
    </div>
  );
};
