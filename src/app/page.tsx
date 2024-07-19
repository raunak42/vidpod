"use client";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { AdMarkersCard } from "./_components/AdMarkersCard";
import { EpisodeDescription } from "./_components/EpisodeDescription";
import { VideoCard } from "./_components/VideoCard";
import { Footer } from "./_components/Footer";
import { Timeline } from "./_components/Timeline";
import { Haze } from "./_components/Haze";
import Image from "next/image";
import { TimelineButtons } from "./_components/TimelineButtons";

export default function Home() {
  return (
    <div className="relative">
      {/* <div className="h-[100vh] w-full z-20 opacity-45  bg-red-200 absolute"> */}
      <Haze />
      {/* </div> */}

      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />

          <div className="w-full flex flex-col p-[32px] gap-[32px]">
            <EpisodeDescription />
            <div className="flex flex-row justify-between gap-[32px]">
              <AdMarkersCard />
              <VideoCard />
            </div>

            <div className=" flex flex-col w-[1040px] h-[358px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm p-[32px] ">
              <TimelineButtons/>
              <Timeline />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
