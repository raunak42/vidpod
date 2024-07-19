"use client";
import {
  displayHazeState,
  disPlayStaticAdModalState,
} from "@/store/adMarkerState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { trpc } from "../_trpc/client";

export const StaticAdModal: React.FC = () => {
  const [displayHaze, setDisplayHaze] = useRecoilState(displayHazeState);
  const [displayStaticAdModal, setDisplayStaticAdModal] = useRecoilState(
    disPlayStaticAdModalState
  );

  const getAds = trpc.getAds.useQuery();
  const ads = getAds.data;

  return (
    <div className="h-[740px] w-[900px] bg-[#FFFFFF] rounded-[16px] border border-[#E4E4E7] flex flex-col p-[32px] space-y-[24px]">
      <div className="w-full flex items-center justify-between ">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
            Static
          </h1>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            Select which ad you would like to show
          </h1>
        </div>
        <button
          className="hover:bg-[#E4E4E7] rounded-full p-[2px]"
          onClick={() => {
            setDisplayStaticAdModal(false);
            setDisplayHaze(false);
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

      <div className="w-full h-[80%] flex border-t border-b border-[#E4E4E7] py-[24px]">
        <div className="flex flex-col w-[244px] rounded-[8px] p-[16px] bg-[#F4F4F5] shadow-sm space-y-[24px]">
          <div className="h-[44] w-full rounded-[6px] overflow-hidden flex items-center gap-[12px] px-[12px] py-[14px] bg-[#ffffff]">
            <Image
              draggable={false}
              alt="img"
              width={16}
              height={16}
              src={"/search-icon.svg"}
            />
            <input
              className="outline-none font-[600] text-[16px] leading-[20px] text-[#71717A]"
              placeholder="Search library..."
            ></input>
          </div>
          <div className="flex flex-row items-center gap-[12px]">
            <Image
              draggable={false}
              alt="img"
              width={24}
              height={24}
              src={"/library.svg"}
            />
            <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
              Ad library
            </h1>
          </div>
          <div className="font-[600] text-[14px] leading-[20px]">
            <div className="flex items-center justify-between px-[16px] py-[8px]">
              <h1>All folders</h1>
            </div>
            <div className="flex items-center justify-between px-[16px] py-[8px]">
              <h1>Grammarly</h1>
              <Image
                draggable={false}
                alt="img"
                width={16}
                height={16}
                src={"/chevron-down.svg"}
              />
            </div>
            <div className="flex items-center justify-between px-[16px] py-[8px]">
              <h1>Samsung</h1>
              <Image
                draggable={false}
                alt="img"
                width={16}
                height={16}
                src={"/chevron-down.svg"}
              />
            </div>
            <div className="flex items-center justify-between px-[16px] py-[8px]">
              <h1>Skillshare</h1>
              <Image
                draggable={false}
                alt="img"
                width={16}
                height={16}
                src={"/chevron-down.svg"}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-end">
            <div className="border border-[#E4E4E7] h-[44] w-[200px] rounded-[6px] overflow-hidden flex items-center gap-[12px] px-[12px] py-[14px] bg-[#ffffff]">
              <Image
                draggable={false}
                alt="img"
                width={16}
                height={16}
                src={"/search-icon.svg"}
              />
              <input
                className="outline-none font-[600] text-[16px] leading-[20px] text-[#71717A]"
                placeholder="Search ads..."
              ></input>
            </div>
          </div>
          <div className="w-full overflow-y-scroll thin-scrollbar px-[24px] mt-[24px]">
            <div className="space-y-[10px]">
              {ads?.map((ad, index) => {
                return (
                  <div
                    className=" py-[16px] px-[12px] w-full rounded-[8px] border border-[#E4E4E7] flex items-center justify-between"
                    key={index}
                  >
                    <img
                      className="rounded-[4px] w-[140px] h-[100px]"
                      alt="img"
                      src={ad.coverImage}
                    />
                    <div className="w-full pl-[24px] flex flex-col justify-between space-y-[8px]">
                      <h1 className="font-[700] text-[16px] leading-[24px] text-[#27272A]">
                        {ad.name}
                      </h1>
                      <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
                        {ad.publishedDate} • {ad.length}
                      </h1>
                      <div className="flex">
                        <div className="px-[10px] py-[2px] rounded-lg border border-[#D4D4D8]">
                          <h1 className="font-[600] text-[12px] leading-[16px] text-[#27272A]">
                            {ad.company}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <input type="checkbox" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex items-center justify-between">
        <button
          onClick={() => {
            setDisplayStaticAdModal(false);
            setDisplayHaze(false);
          }}
          className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md flex items-center justify-center "
        >
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#18181B] px-[16px] py-[8px]">
            Cancel
          </h1>
        </button>
        <button className="h-[36px] border-[1px] border-[#E4E4E7] rounded-md  flex items-center justify-center bg-[#18181B]">
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#FAFAFA] px-[16px] py-[8px]">
            Done
          </h1>
        </button>
      </div>
    </div>
  );
};
