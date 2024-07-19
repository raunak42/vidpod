"use client";
import Image from "next/image";
import { ChartWidget } from "./ChartWidget";
import { useEffect, useRef, useState } from "react";
import { ChartCarousel } from "./ChartCarousel";

const navItemSrcs = [
  { text: "Dashboard", src: "home" },
  { text: "Analytics", src: "bar-chart-3" },
  { text: "Ads", src: "circle-dollar-sign" },
  { text: "Channels", src: "tv" },
  { text: "Import", src: "import" },
  { text: "Settings", src: "settings" },
];

const bottomMenuSrcs = [
  { text: "Demo mode", src: "play-circle" },
  { text: "Invite your team", src: "mail-plus" },
  { text: "Give feedback", src: "lightbulb" },
  { text: "Help & support", src: "help-circle" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className=" w-[320px] border-r-[1px] border-r-[#E4E4E7] p-[32px] flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col gap-[16px]">
          <button className="bg-[#18181B] flex flex-row items-center justify-center py-[12px] rounded-[6px]">
            <h1 className="text text-[#FAFAFA] font-[500] text-[14px] leading-[20px]">
              Create an episode
            </h1>
          </button>

          <button className="border-[1px] border-[#E4E4E7] rounded-[8px] px-[16px] py-[12px] flex flex-row items-center justify-between">
            <div className="size-[32px] rounded-[4px] overflow-hidden">
              <Image width={32} height={32} alt="img" src="/doac.jpeg" className="object-cover"></Image>
            </div>

            <h1 className="font-[700] text-[16px] leading-[24px] text-[#71717A]">
              The Diary Of A CEO
            </h1>

            <Image
              alt="chevron-down"
              src={"/chevron-down.svg"}
              height={16}
              width={16}
            ></Image>
          </button>
        </div>

        <div className="flex flex-col w-full gap-[32px] mt-[32px]">
          {navItemSrcs.map((item, index) => {
            return <NavItems key={index} src={item.src} text={item.text} />;
          })}
        </div>
      </div>

      <ChartCarousel />

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-[16px] ">
          {bottomMenuSrcs.map((item, index) => {
            return <MenuItems key={index} src={item.src} text={item.text} />;
          })}
        </div>
      </div>
    </div>
  );
};

const NavItems = ({ text, src }: { text: string; src: string }) => {
  return (
    <div className="flex flex-row items-center gap-[16px] ">
      <Image alt="home" src={`/${src}.svg`} height={20} width={20}></Image>

      <button className="font-[700] text-[24px] leading-[32px] text-[#71717A] hover:text-[#27272A]">
        {text}
      </button>
    </div>
  );
};

const MenuItems = ({ text, src }: { text: string; src: string }) => {
  const [toggle, setToggle] = useState(true);
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex flex-row items-center gap-[12px]">
      <Image alt="home" src={`/${src}.svg`} height={20} width={20}></Image>

      <button className="font-[700] text-[16px] leading-[24px] text-[#71717A] hover:text-[#27272A]">
        {text}
      </button>

      {text === "Demo mode" && (
        <div
          onClick={() => {
            setToggle(!toggle);
            setAnimate(!animate);
          }}
          className={` hover:cursor-pointer h-[20px] w-[36px] bg-[#E4E4E7] rounded-full flex flex-row items-center p-[2px] `}
        >
          <div
            className={`${
              toggle
                ? " translate-x-[100%] bg-[#71717A]"
                : "translate-x-[0%] bg-[#ffffff]"
            } transition-all duration-300  size-[16px] rounded-full`}
          ></div>
        </div>
      )}
    </div>
  );
};
