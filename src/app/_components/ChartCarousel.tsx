"use client";
import Image from "next/image";
import { ChartWidget } from "./ChartWidget";
import { useEffect, useRef, useState } from "react";

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

export const ChartCarousel: React.FC = () => {
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
    <div>
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
              <button>
                <Image
                  alt="rectangle4"
                  src={"/rectangle4.svg"}
                  height={8}
                  width={24}
                ></Image>
              </button>
            ) : (
              <button>
                <Image
                  alt="ellipse6"
                  src={"/ellipse6.svg"}
                  height={8}
                  width={8}
                ></Image>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
