"use client";
import {
  adTypeState,
  displayAdMarkersModalState,
  displayHazeState,
  displayPickTimeModalState,
  disPlayStaticAdModalState,
  selectMarkerClickedState,
} from "@/store/adMarkerState";
import { useRecoilState } from "recoil";
import { AdMarkersModal } from "./AdMarkersModal";
import { PickTimeModal } from "./PickTimeModal";
import Image from "next/image";
import { StaticAdModal } from "./StaticAdModal";

export const Haze: React.FC = () => {
  const [adType, setAdtype] = useRecoilState(adTypeState);
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);
  const [selectMarkerClicked, setSelectMarkerClicked] = useRecoilState(
    selectMarkerClickedState
  );

  const [displayAdMarkersModal, setDisplayAdMarkersModal] = useRecoilState(
    displayAdMarkersModalState
  );
  const [displayPickTimeModal, setDisplayPickTimeModal] = useRecoilState(
    displayPickTimeModalState
  );
  const [displayStaticAdModal, setDisplayStaticAdModal] = useRecoilState(
    disPlayStaticAdModalState
  );

  return (
    displayHaze && (
      <div className="fixed z-40  ">
        <div className="z-20 fixed w-full h-[100vh] bg-black opacity-10 flex flex-col items-center justify-center "></div>
        <div className="z-30 fixed w-full h-[100vh] flex items-center justify-center ">
          {displayAdMarkersModal && <AdMarkersModal />}
          {displayPickTimeModal && <PickTimeModal />}
          {displayStaticAdModal && <StaticAdModal/>}
        </div>
      </div>
    )
  );
};
