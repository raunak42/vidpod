import Image from "next/image";
import { formatSeconds } from "./Timescale";
import { trpc } from "../_trpc/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  adTypeState,
  displayHazeState,
  displayPickTimeModalState,
  markerIdState,
} from "@/store/adMarkerState";

interface MarkerHorizontalProps {
  id: number;
  listNo: number;
  startsAt: number;
  type: string;
}

export const MarkerHorizontal: React.FC<MarkerHorizontalProps> = ({
  listNo,
  startsAt,
  type,
  id,
}) => {
  const startsAtFormatted = formatSeconds(startsAt);

  const deleteMarker = trpc.deleteMarker.useMutation();
  const handleClick = async () => {
    const result = await deleteMarker.mutateAsync(id);
    setShowMarker(false);
  };
  const [showMarker, setShowMarker] = useState(true);
  const [displayPickTimeModal, setDisplayPickTimeModal] = useRecoilState(
    displayPickTimeModalState
  );
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);
  const [adTypeData, setAdtypeData] = useRecoilState(adTypeState);
  const [markerId, setMarkerId] = useRecoilState(markerIdState);

  return (
    showMarker && (
      <div className="flex flex-row justify-between items-center gap-[12px]">
        <h1 className="font-[600] text-[16px] leading-[24px] text-[#71717A]">
          {listNo}
        </h1>
        <div className="flex flex-row justify-between items-center border border-[#E4E4E7] rounded-[8px] shadow-sm py-[10px] px-[10px] w-full">
          <h1 className="font-[600] text-[14px] leading-[22px] text-[#27272A]">
            {startsAtFormatted}
          </h1>
          <div className="py-[4px] px-[8px] bg-[#BBF7D0] rounded-lg">
            <h1 className="font-[600] text-[10px] leading-[16px] text-[#166534]">
              {type}
            </h1>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[50px] h-[38px] flex items-center justify-center">
              <button
                onClick={() => {
                  ////////////////////////////////////////////
                  setMarkerId(id);
                  setDisplayHaze(true);
                  setDisplayPickTimeModal(true);
                  setAdtypeData("Auto");
                }}
                className="py-[6px] px-[10px] rounded-md border border-[#E4E4E7] size-[90%] hover:size-full"
              >
                <h1 className="font-[600] text-[12px] leading-[20px] text-[#18181B] ">
                  Edit
                </h1>
              </button>
            </div>

            <div className="size-[40px]  flex items-center justify-center">
              <button
                onClick={handleClick}
                className=" p-[6px] size-[34px] hover:size-full bg-[#FCA5A5] flex items-center justify-center rounded-md"
              >
                <Image alt="alt" src={"/trash-2.svg"} width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
