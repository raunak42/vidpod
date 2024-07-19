import { adStartsState, unavailableStartState } from "@/store/adMarkerState";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { trpc } from "../_trpc/client";

interface MiniSliderProps {
  videoLength: number; // in seconds
  onTimeChange?: (time: number) => void;
}

export const MiniSlider: React.FC<MiniSliderProps> = ({
  videoLength,
  onTimeChange,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [adStarts, setAdStarts] = useRecoilState(adStartsState);
  const [isUnavailable, setIsUnavailable] = useRecoilState(unavailableStartState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setAdStarts(newTime);
    setCurrentTime(newTime);
    if (onTimeChange) {
      onTimeChange(newTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getMarkers = trpc.getMarkers.useQuery();
  const markers = getMarkers.data;

  const unavailableStarts = markers?.map((marker) => marker.markerStart);

  useEffect(() => {
    if (unavailableStarts) {
      setIsUnavailable(unavailableStarts.includes(currentTime));
    }
  }, [currentTime, unavailableStarts, setIsUnavailable]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex flex-row items-center justify-between gap-2">
        <h1 className="text-[18181B] font-[600] leading-[20px] w-[60px] flex items-center justify-center">
          {formatTime(currentTime)}
        </h1>
        <input
          type="range"
          min="0"
          max={videoLength}
          value={currentTime}
          onChange={handleChange}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            isUnavailable ? " accent-red-500" : "bg-[#F4F4F5] accent-[#18181B]"
          } `}
          style={{
            background: `linear-gradient(to right, ${
              isUnavailable ? "#EF4444" : "#F4F4F5"
            } 0%, ${isUnavailable ? "#EF4444" : "#F4F4F5"} ${
              (currentTime / videoLength) * 100
            }%, #F4F4F5 ${(currentTime / videoLength) * 100}%, #F4F4F5 100%)`,
          }}
        />
        <h1 className="text-[18181B] font-[600] leading-[20px] w-[60px] flex items-center justify-center">
          {formatTime(videoLength)}
        </h1>
      </div>
      {
        <div className="w-full  h-[20px] flex justify-center">
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            {isUnavailable && "Unavailable"}
          </h1>
        </div>
      }
    </div>
  );
};
