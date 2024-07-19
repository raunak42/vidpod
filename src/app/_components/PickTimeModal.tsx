"use client";

import {
  adStartsState,
  adTypeState,
  displayHazeState,
  displayPickTimeModalState,
  markerIdState,
  unavailableStartState,
} from "@/store/adMarkerState";
import { videoLengthState } from "@/store/videoState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { MiniSlider } from "./MiniSlider";
import { trpc } from "../_trpc/client";
import { Toaster, toast } from "sonner";
import { formatSeconds } from "./Timescale";

export const PickTimeModal: React.FC = () => {
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);
  const [displayPickTimeModal, setDisplayPickTimeModal] = useRecoilState(
    displayPickTimeModalState
  );

  const [videoLengthSeconds, setVideoLengthSeconds] =
    useRecoilState(videoLengthState);
  const [adStarts, setAdStarts] = useRecoilState(adStartsState);
  const [adTypeData, setAdtypeData] = useRecoilState(adTypeState);
  const [isUnavailable, setIsUnavailable] = useRecoilState(
    unavailableStartState
  );
  const [markerId, setMarkerId] = useRecoilState(markerIdState);

  const newMarker = trpc.newMarker.useMutation();
  const editMarker = trpc.editMarker.useMutation();
  const handleClick = async () => {
    setDisplayHaze(false);
    if (!markerId) {
      const result = await newMarker.mutateAsync({
        adType: adTypeData,
        adStarts: adStarts,
      });
    } else {
      const result = await editMarker.mutateAsync({
        markerId: markerId,
        newStart: adStarts,
        adType: adTypeData,
      });
    }
    toast.success(`Successfully placed ad at ${formatSeconds(adStarts)}, reload page.`)
  };

  return (
    <div className="w-[480px] h-[300px] bg-[#ffffff] rounded-lg shadow-lg p-[32px] border border-[#E4E4E7] flex flex-col">
      <Toaster/>
      <div className="w-full flex items-center justify-end">
        <button
          className="hover:bg-[#E4E4E7] rounded-full p-[2px]"
          onClick={() => {
            setDisplayHaze(false);
            setDisplayPickTimeModal(false);
          }}
        >
          <Image
            draggable={false}
            alt="img"
            width={16}
            height={16}
            src={"/cross.svg"}
          />
        </button>
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
            Auto
          </h1>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            A random ad will play at your selected time
          </h1>
        </div>

        <div className="flex flex-row">
          <MiniSlider videoLength={videoLengthSeconds} />
        </div>

        <div className="flex flex-row items-center justify-end gap-[16px]">
          <button
            onClick={() => {
              setDisplayHaze(false);
              setDisplayPickTimeModal(false);
            }}
            className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md flex items-center justify-center "
          >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#18181B] px-[16px] py-[8px]">
              Cancel
            </h1>
          </button>
          <button
            disabled={isUnavailable}
            onClick={handleClick}
            className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md  flex items-center justify-center bg-[#18181B]"
          >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#FAFAFA] px-[16px] py-[8px]">
              Done
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};
