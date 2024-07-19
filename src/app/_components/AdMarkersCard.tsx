"use client";
import {
  displayAdMarkersModalState,
  displayHazeState,
} from "@/store/adMarkerState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { MarkerHorizontal } from "./MarkerHorztl";
import { trpc } from "../_trpc/client";
import { videoLengthState } from "@/store/videoState";
import { Toaster, toast } from "sonner";

export const AdMarkersCard: React.FC = () => {
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);
  const [displayAdMarkersModal, setDisplayAdMarkersModal] = useRecoilState(
    displayAdMarkersModalState
  );
  const [videoLengthSeconds] = useRecoilState(videoLengthState);

  const getMarkers = trpc.getMarkers.useQuery();
  const markers = getMarkers.data;

  const newMarker = trpc.newMarker.useMutation();

  const unavailableStarts = markers?.map((marker) => marker.markerStart) || [];

  const getRandomAvailableTime = (
    videoLength: number,
    unavailableStarts: number[]
  ): number => {
    const availableTimes = Array.from(
      { length: videoLength + 1 },
      (_, i) => i
    ).filter((time) => !unavailableStarts.includes(time));

    if (availableTimes.length === 0) {
      throw new Error("No available times");
    }

    const randomIndex = Math.floor(Math.random() * availableTimes.length);
    return availableTimes[randomIndex];
  };

  const automaticallyPlace = async () => {
    try {
      const randomTime = getRandomAvailableTime(
        videoLengthSeconds,
        unavailableStarts
      );
      const newMarkerAuto = await newMarker.mutateAsync({
        adType: "Auto",
        adStarts: randomTime,
      });
      toast.success("New marker created automatically. Reload page.");
    } catch (error) {
      console.error("Error creating new marker:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between p-[32px] w-[512px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm space-y-[16px]">
      <Toaster />
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
          Ad markers
        </h1>
        <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
          {markers?.length} markers
        </h1>
      </div>

      <div className="flex flex-col w-full h-[280px] relative">
        <div className="flex flex-col space-y-[16px] overflow-y-scroll thin-scrollbar absolute inset-0 pr-[12px]">
          {markers ? (
            markers
              .sort((a, b) => a.markerStart - b.markerStart)
              .map((marker, index) => {
                return (
                  <MarkerHorizontal
                    id={marker.id}
                    listNo={index + 1}
                    startsAt={marker.markerStart}
                    type={marker.markerType}
                    key={index}
                  />
                );
              })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[16px]">
        <button
          onClick={() => {
            setDisplayHaze(true);
            setDisplayAdMarkersModal(true);
          }}
          className="w-full h-[40px] py-[8px] px-[16px] rounded-md bg-[#18181B] flex gap-2 items-center justify-center transition-all duration-300 hover:translate-y-[-4px]"
        >
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#FAFAFA]">
            Create ad marker
          </h1>
          <Image alt="plus" src={"/plus.svg"} height={16} width={16}></Image>
        </button>
        
        <button
          onClick={automaticallyPlace}
          className="w-full h-[40px] py-[8px] px-[16px] rounded-md bg-[#ffffff] flex gap-2 items-center justify-center border-[1px] border-[#E4E4E7]  transition-all duration-300 hover:translate-y-[-4px]"
        >
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#18181B]">
            Automatically place
          </h1>
          <Image
            alt="magic-wand"
            src={"/magic-wand.svg"}
            height={16}
            width={16}
          ></Image>
        </button>
      </div>
    </div>
  );
};
