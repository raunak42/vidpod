"use client"

import { videoLengthState } from "@/store/videoState";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRecoilState } from "recoil";

interface SliderProps {
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  currentTime,
  duration,
  onTimeChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [videoLengthSeconds, setVideoLengthSeconds] =
    useRecoilState(videoLengthState);
  const timeLineLength = videoLengthSeconds * 1.5;

  const updateTimeFromMouse = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      const newTime = Math.max(0, Math.min(duration, position * duration));
      onTimeChange(newTime);
    }
  }, [duration, onTimeChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updateTimeFromMouse(e);
  }, [updateTimeFromMouse]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateTimeFromMouse(e);
    }
  }, [isDragging, updateTimeFromMouse]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div
      ref={timelineRef}
      style={{ width: timeLineLength }}
      className="h-[40px]"
      onMouseDown={handleMouseDown}
    >
      <div
        style={{ marginLeft: `calc(${progressPercentage}% - 8px)` }}
        className="h-[200px] w-fit rounded-[6px]"
      >
        <div className="bg-[#EF4444] p-[8px] rounded-[6px] size-[32px] cursor-pointer">
          <Image
            draggable={false}
            alt="img"
            width={16}
            height={16}
            src={"/grip-vertical.svg"}
          />
        </div>

        <div
          style={{ width: `calc(${50}% + 1.5px)` }}
          className="h-[136px] border-r-[3px] border-r-[#EF4444]"
        ></div>
      </div>
    </div>
  );
};