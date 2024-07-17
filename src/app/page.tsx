"use client";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { AdMarkersCard } from "./_components/AdMarkersCard";
import { EpisodeDescription } from "./_components/EpisodeDescription";
import { VideoCard } from "./_components/VideoCard";
import { Footer } from "./_components/Footer";
import { useRecoilState } from "recoil";
import { videoLengthState } from "@/store/videoLength";
import Image from "next/image";

export default function Home() {
  // const [videoLengthSeconds, setVideoLengthSeconds] =
  //   useRecoilState(videoLengthState);

  const videoLengthSeconds = 7200;

  const timeLineLength = videoLengthSeconds * 1.5;

  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />

          <div className="w-full flex flex-col p-[64px] gap-[32px]">
            <EpisodeDescription />
            <div className="flex flex-row justify-between gap-[32px]">
              <AdMarkersCard />
              <VideoCard />
            </div>

            <div className="w-[960px] h-[358px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm p-[32px] ">
              <div className="w-full h-[200px]  overflow-x-scroll flex flex-col">
                <div className="h-[128px] w-fit bg-[#18181B] rounded-[8px] p-[8px]">
                  <div
                    style={{ width: timeLineLength }}
                    className=" h-full rounded-[6px] bg-[#F0ABFC]"
                  ></div>
                </div>

                <div
                  style={{ width: timeLineLength }}
                  className="flex flex-row  mx-[8px] justify-between border-l-[1px] border-l-[#D4D4D8]"
                >
                  {Array.from(
                    { length: videoLengthSeconds / 60 },
                    (_, index) => {
                      return (
                        <div
                          className="flex flex-col  w-[90px] justify-between  h-[50px] border-r-[1px] border-r-[#D4D4D8]"
                          key={index}
                        >
                          <div className="flex flex-row ">
                            {Array.from({ length: 8 }, (_, index) => {
                              return (
                                <div
                                  className="w-[10px] h-[10px] border-r-[1px] border-r-[#D4D4D8]"
                                  key={index}
                                ></div>
                              );
                            })}
                          </div>
                          <div className="flex items-center justify-center font-[600] text-[14px] leading-[20px] text-[#71717A]">
                            {formatSeconds(index * 60)}{" "}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
