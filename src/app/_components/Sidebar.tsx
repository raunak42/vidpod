"use client";
import Image from "next/image";
import { ChartWidget } from "./ChartWidget";
import { useEffect, useRef, useState } from "react";

const navItemSrcs = [
  { text: "Dashboard", src: "home" },
  { text: "Analytics", src: "bar-chart-3" },
  { text: "Ads", src: "circle-dollar-sign" },
  { text: "Channels", src: "tv" },
  { text: "Import", src: "import" },
  { text: "Settings", src: "settings" },
];

const stats = [
  {
    title: "Weekly plays",
    datapoints: [150, 420, 350, 180, 450, 480, 540],
    playCount: 92347,
  },
  {
    title: "Daily plays",
    datapoints: [540, 420, 350, 180, 450, 480, 150],
    playCount: 1378,
  },
  {
    title: "Hourly plays",
    datapoints: [150, 210, 230, 180, 200, 210, 150],
    playCount: 22,
  },
];

export const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle scroll event and update active index
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const chartWidth =
          (carouselRef.current.children[0] as HTMLElement).offsetWidth +
          parseInt(
            getComputedStyle(carouselRef.current.children[0]).marginRight
          );
        const newIndex = Math.floor(scrollLeft / chartWidth);
        setActiveIndex(newIndex);
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className=" w-[320px] h-full border-r-[1px] border-r-[#E4E4E7] p-[32px]">
      <div className="flex flex-col gap-[16px]">
        <div className="bg-[#18181B] flex flex-row items-center justify-center py-[12px] rounded-[6px]">
          <h1 className="text text-[#FAFAFA] font-[500] text-[14px] leading-[20px]">
            Create an episode
          </h1>
        </div>

        <div className="border-[1px] border-[#E4E4E7] rounded-[8px] px-[16px] py-[12px] flex flex-row items-center justify-between">
          <div className="size-[32px] rounded-[4px] overflow-hidden">
            <img src="/doac.jpeg" className="object-cover"></img>
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
        </div>
      </div>

      <div className="flex flex-col w-full gap-[32px] mt-[32px]">
        {navItemSrcs.map((item, index) => {
          return <NavItems key={index} src={item.src} text={item.text} />;
        })}
      </div>

      <div
        className="flex overflow-x-scroll scrollbar-hidden snap-x snap-mandatory max-w-6xl space-x-6 "
        ref={carouselRef}
      >
        {stats.map((stat, index) => {
          return (
            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
              <ChartWidget
                header={stat.title}
                dataPoints={stat.datapoints}
                playCount={stat.playCount}
              />
            </section>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex flex-row items-center justify-center mt-[16px] space-x-[12px] ">
        {stats.map((_, index) => (
          <div
            key={index}
            className={""}
            onClick={() => {
              carouselRef.current &&
                (carouselRef.current.scrollLeft =
                  index *
                  ((carouselRef.current.children[0] as HTMLElement)
                    .offsetWidth +
                    parseInt(
                      getComputedStyle(carouselRef.current.children[0])
                        .marginRight
                    )));
              setActiveIndex(index);
            }}
          >
            {activeIndex === index ? (
              <div>
                <Image
                  alt="rectangle4"
                  src={"/rectangle4.svg"}
                  height={8}
                  width={24}
                ></Image>
              </div>
            ) : (
              <div>
                <Image
                  alt="ellipse6"
                  src={"/ellipse6.svg"}
                  height={8}
                  width={8}
                ></Image>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const NavItems = ({ text, src }: { text: string; src: string }) => {
  return (
    <div className="flex flex-row items-center gap-[16px]">
      <Image alt="home" src={`/${src}.svg`} height={20} width={20}></Image>

      <h1 className="font-[700] text-[24px] leading-[32px] text-[#71717A]">
        {text}
      </h1>
    </div>
  );
};
