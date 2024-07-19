"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { currentTimeState, videoLengthState, videoRefState } from "@/store/videoState";

export const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const [overlayImage, setOverlayImage] = useState("");
  const [, setVideoLengthSeconds] =
    useRecoilState(videoLengthState);
  const [, setCurrentTime] = useRecoilState(currentTimeState);
  const [, setVideoRefAtom] = useRecoilState(videoRefState);

  useEffect(() => {
    if (videoRef) {
      setVideoRefAtom(videoRef);
    }
  }, [setVideoRefAtom]);

  useEffect(() => {
    const videoLength = Math.round(videoRef.current?.duration!);
    setVideoLengthSeconds(videoLength);
    console.log(videoLength);
  }, [setVideoLengthSeconds]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkPlayState = () => {
      setIsPlaying(!video.paused);
    };

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("play", checkPlayState);
    video.addEventListener("pause", checkPlayState);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("play", checkPlayState);
      video.removeEventListener("pause", checkPlayState);
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [setCurrentTime]);

  const togglePlay = () => {
    setDisplayOverlay(true);
    if (videoRef.current) {
      if (isPlaying) {
        setOverlayImage("/pauseWhite.svg");
        videoRef.current.pause();
      } else {
        setOverlayImage("/playWhite.svg");
        videoRef.current.play();
      }
    }
  };

  const jumpToStart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const jumpToEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration;
    }
  };

  const skip = (seconds: number) => {
    setDisplayOverlay(true);
    if (seconds > 0) {
      setOverlayImage("/clock-clockwise-white.svg");
    } else {
      setOverlayImage("/clock-anticlockwise-white.svg");
    }
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const increaseSpeed = () => {
    setDisplayOverlay(true);
    if (videoRef.current) {
      const newRate = Math.min(playbackRate + 0.5, 2);
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
      setOverlayImage(`/${newRate.toString()}.0x.svg`);
    }
  };

  const decreaseSpeed = () => {
    setDisplayOverlay(true);
    if (videoRef.current) {
      const newRate = Math.max(playbackRate - 0.5, 0.5);
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
      setOverlayImage(`/${newRate.toString()}.0x.svg`);
    }
  };

  useEffect(() => {
    if (displayOverlay) {
      setTimeout(() => {
        setDisplayOverlay(false);
      }, 1000);
    }
  }, [displayOverlay]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="relative flex items-center justify-center ">
        <video
          controls
          ref={videoRef}
          className="rounded-[8px]"
          src="/clip.mp4"
        ></video>

        {displayOverlay && (
          <div className="animate-ping absolute inset-0 left-[40%] top-[40%] flex items-center justify-center size-[20%] rounded-xl bg-black opacity-60">
            <Image width={40} height={40} src={overlayImage} alt="alt" />
          </div>
        )}
      </div>

      <div className="w-full h-fit p-[16px] border-[1px] border-[#E4E4E7] rounded-[16px] shadow-sm flex items-center justify-evenly">
        <div className="flex flex-row items-center gap-[8px]">
          <button
            onClick={jumpToStart}
            className="size-[32px] rounded-full border-[1px] border-[#D4D4D8] flex items-center justify-center"
          >
            <Image
              width={16}
              height={16}
              src={"/arrow-line-left.svg"}
              alt="Jump to start"
            />
          </button>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            Jump to start
          </h1>
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <button onClick={() => skip(-10)}>
            <Image
              width={20}
              height={20}
              src={"/clock-anticlockwise.svg"}
              alt="Skip backward 10s"
            />
          </button>
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            10s
          </h1>
        </div>
        <button onClick={decreaseSpeed}>
          <Image
            width={20}
            height={20}
            src={"/fast-backward.svg"}
            alt="Decrease speed"
          />
        </button>
        <button onClick={togglePlay}>
          <Image
            width={32}
            height={32}
            src={isPlaying ? "/pause.svg" : "/play.svg"}
            alt={isPlaying ? "Pause" : "Play"}
          />
        </button>
        <button onClick={increaseSpeed}>
          <Image
            width={20}
            height={20}
            src={"/fast-forward.svg"}
            alt="Increase speed"
          />
        </button>

        <div className="flex flex-row items-center gap-[8px]">
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            10s
          </h1>
          <button onClick={() => skip(10)}>
            <Image
              width={20}
              height={20}
              src={"/clock-clockwise.svg"}
              alt="Skip forward 10s"
            />
          </button>
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <h1 className="font-[600] text-[14px] leading-[20px] text-[#71717A]">
            Jump to end
          </h1>
          <button
            onClick={jumpToEnd}
            className="size-[32px] rounded-full border-[1px] border-[#D4D4D8] flex items-center justify-center"
          >
            <Image
              width={16}
              height={16}
              src={"/arrow-line-right.svg"}
              alt="Jump to end"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
