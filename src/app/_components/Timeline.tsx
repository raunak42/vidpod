"use client";
import {
  currentTimeState,
  videoLengthState,
  videoRefState,
} from "@/store/videoState";
import { useRecoilState } from "recoil";
import { WaveComponent } from "./WaveComponent";
import { Slider } from "./Slider";
import { Timescale } from "./Timescale";
import { useEffect, useRef, useState } from "react";
import { Marker } from "./Marker";
import { trpc } from "../_trpc/client";

interface MarkerType {
  id: number;
  left: number;
}

export const Timeline: React.FC = () => {
  const [videoLengthSeconds] = useRecoilState(videoLengthState);
  const timeLineLength = videoLengthSeconds * 1.5;
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const [videoRef] = useRecoilState(videoRefState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const response = trpc.getMarkers.useQuery();
  const adMarkers = response.data;

  useEffect(() => {
    if (adMarkers) {
      const data = adMarkers.map((marker) => ({
        id: marker.id,
        left: marker.markerStart * 1.5,
      }));
      setMarkers(data);
    }
  }, [adMarkers]);

  const handleDrag = (id: number, newLeft: number) => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const markerWidth = 50;

    newLeft = Math.max(0, Math.min(newLeft, containerWidth - markerWidth));

    setMarkers((prevMarkers) => {
      const sortedMarkers = [...prevMarkers].sort((a, b) => a.left - b.left);

      const draggedIndex = sortedMarkers.findIndex(
        (marker) => marker.id === id
      );

      if (draggedIndex > 0) {
        const prevMarker = sortedMarkers[draggedIndex - 1];
        newLeft = Math.max(newLeft, prevMarker.left + markerWidth);
      }

      if (draggedIndex < sortedMarkers.length - 1) {
        const nextMarker = sortedMarkers[draggedIndex + 1];
        newLeft = Math.min(newLeft, nextMarker.left - markerWidth);
      }

      return prevMarkers.map((marker) =>
        marker.id === id ? { ...marker, left: newLeft } : marker
      );
    });
  };

  const handleTimelineChange = (newTime: number) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="w-full h-[300px] overflow-x-scroll thin-scrollbar flex flex-col px-[8px]">
      <div className="z-10">
        <Slider
          currentTime={currentTime}
          duration={videoLengthSeconds}
          onTimeChange={handleTimelineChange}
        />
      </div>

      <div className="z-0 h-[128px] w-fit bg-[#18181B] rounded-[8px] p-[8px] overflow-hidden">
        <div
          ref={containerRef}
          style={{ width: timeLineLength }}
          className="relative h-full rounded-[6px] bg-[#F0ABFC] flex items-center overflow-hidden"
        >
          <div className="w-full  mt-[110px] opacity-60" >
            <WaveComponent audioFile="/audio.mp3" />
          </div>

          {markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                id={marker.id}
                left={marker.left}
                onDrag={handleDrag}
              />
            );
          })}
        </div>
      </div>

      <Timescale
        timeLineLength={timeLineLength}
        videoLengthSeconds={videoLengthSeconds}
      />
    </div>
  );
};
