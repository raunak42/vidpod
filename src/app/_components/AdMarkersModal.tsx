"use client";
import {
  adTypeState,
  displayAdMarkersModalState,
  displayHazeState,
  displayPickTimeModalState,
  disPlayStaticAdModalState,
} from "@/store/adMarkerState";
import Image from "next/image";
import { useRecoilState } from "recoil";

export const AdMarkersModal: React.FC = () => {
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);

  const [adTypeData, setAdtypeData] = useRecoilState(adTypeState);
  const [displayAdMarkersModal, setDisplayAdMarkersModal] = useRecoilState(
    displayAdMarkersModalState
  );
  const [displayPickTimeModal, setDisplayPickTimeModal] = useRecoilState(
    displayPickTimeModalState
  );
  const [displayStaticAdModal, setDisplayStaticAdModal] = useRecoilState(
    disPlayStaticAdModalState
  );
  const handleClick = async () => {
    if (adTypeData === "") {
      return;
    }
    if (adTypeData === "Auto") {
      setDisplayAdMarkersModal(false);
      setDisplayPickTimeModal(true);
    }
    if (adTypeData === "Static") {
      setDisplayAdMarkersModal(false);
      setDisplayStaticAdModal(true);
    }
  };

  return (
    <div className="w-[480px] h-fit bg-[#ffffff] rounded-lg shadow-lg p-[32px] border border-[#E4E4E7] flex flex-col">
      <div className="w-full flex items-center justify-end">
        <button
        className="hover:bg-[#E4E4E7] rounded-full p-[2px]"
          onClick={() => {
            setDisplayAdMarkersModal(false);
            setDisplayHaze(false);
            setAdtypeData("")
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

      <div className="flex flex-col w-full space-y-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
            Create ad marker
          </h1>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            Insert a new ad marker into this episode
          </h1>
        </div>

        <div className="flex flex-col w-full space-y-[16px]">
          <AdOption
            image="/circle-dashed.svg"
            title="Auto"
            subtitle="Automatic ad insertions"
            adType="Auto"
            color="#62D71E"
          />
          <AdOption
            image="/locate-fixed.svg"
            title="Static"
            subtitle="A marker for a specific ad that you select"
            adType="Static"
            color="#E23B18"
          />
          <AdOption
            image="/test-tubes.svg"
            title="A/B test"
            subtitle="Compare the performance of multiple ads"
            adType="A/B test"
            color="#E23B18"
          />
        </div>

        <div className="flex flex-row items-center justify-end gap-[16px]">
          <button
            onClick={() => {
              setDisplayAdMarkersModal(false);
              setDisplayHaze(false);
              setAdtypeData("")
            }}
            className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md flex items-center justify-center "
          >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#18181B] px-[16px] py-[8px]">
              Cancel
            </h1>
          </button>
          <button
            onClick={handleClick}
            className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md  flex items-center justify-center bg-[#18181B]"
          >
            <h1 className="font-[600] text-[14px] leading-[20px] text-[#FAFAFA] px-[16px] py-[8px]">
              Select marker
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

interface AdOptionProps {
  image: string;
  title: string;
  subtitle: string;
  adType: "Auto" | "Static" | "A/B test";
  color: string;
}

const AdOption: React.FC<AdOptionProps> = ({
  image,
  title,
  subtitle,
  adType,
  color,
}) => {
  const [adTypeData, setAdtypeData] = useRecoilState(adTypeState);

  return (
    <div className="w-full flex flex-row items-start gap-[2px]">
      <div className="py-[12px] px-[16px] w-full rounded-[8px] shadow-sm border-[1px] border-[#E4E4E7] flex flex-row items-center space-x-[16px]">
        <Image draggable={false} alt="img" width={40} height={40} src={image} />
        <div className="w-[80%] flex flex-col justify-start gap-[4px]">
          <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
            {title}
          </h1>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A] ">
            {subtitle}
          </h1>
        </div>
        <div>
          <div
            onClick={() => {
              setAdtypeData(adType);
              console.log(adType);
            }}
            className="size-[16px] border border-[#18181B] rounded-full flex items-center justify-center cursor-pointer"
          >
            <input
              className=" appearance-none size-[10px] rounded-full  checked:bg-[#18181B] cursor-pointer "
              type="radio"
              name="option"
              value={adType}
            ></input>
          </div>
        </div>
      </div>

      <div
        className="rounded-full size-[6px]"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};
